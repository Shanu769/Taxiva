/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GmailMessageHeader {
  name: string;
  value: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  unread: boolean;
  labels: string[];
  bodyPlain?: string;
  hasAttachments?: boolean;
}

// Helper to base64url encode string for Gmail API
function encodeRFC2822(to: string, subject: string, body: string): string {
  const emailLines = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body
  ];
  const email = emailLines.join('\r\n');
  
  // Convert to Base64-URL safe format
  const base64 = btoa(unescape(encodeURIComponent(email)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function fetchGmailProfile(accessToken: string) {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errorText}`);
  }
  return await res.json();
}

export async function fetchGmailMessages(accessToken: string, query = '', maxResults = 15): Promise<GmailMessageSummary[]> {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  url.searchParams.append('maxResults', maxResults.toString());
  if (query) {
    url.searchParams.append('q', query);
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list Gmail messages (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }

  // Fetch details for each message in parallel
  const detailPromises = data.messages.map(async (msgItem: { id: string }) => {
    try {
      const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgItem.id}?format=full`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!msgRes.ok) return null;
      const msgData = await msgRes.json();

      const headers: GmailMessageHeader[] = msgData.payload?.headers || [];
      const getHeader = (name: string) => headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || '';

      const subject = getHeader('Subject') || '(No Subject)';
      const from = getHeader('From') || 'Unknown Sender';
      const to = getHeader('To') || '';
      const dateRaw = getHeader('Date');
      const formattedDate = dateRaw ? new Date(dateRaw).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Unknown Date';
      const unread = (msgData.labelIds || []).includes('UNREAD');

      // Decode body snippet or parts
      let bodyPlain = msgData.snippet || '';
      if (msgData.payload?.parts) {
        const textPart = msgData.payload.parts.find((p: any) => p.mimeType === 'text/plain');
        if (textPart?.body?.data) {
          try {
            bodyPlain = decodeURIComponent(escape(atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
          } catch {
            // fallback
          }
        }
      }

      const hasAttachments = msgData.payload?.parts?.some((p: any) => p.filename && p.filename.length > 0) || false;

      return {
        id: msgData.id,
        threadId: msgData.threadId,
        snippet: msgData.snippet || '',
        subject,
        from,
        to,
        date: formattedDate,
        unread,
        labels: msgData.labelIds || [],
        bodyPlain,
        hasAttachments
      };
    } catch {
      return null;
    }
  });

  const results = await Promise.all(detailPromises);
  return results.filter((m): m is GmailMessageSummary => m !== null);
}

export async function sendGmailEmail(accessToken: string, to: string, subject: string, body: string) {
  const raw = encodeRFC2822(to, subject, body);
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to send email via Gmail (${res.status}): ${errText}`);
  }

  return await res.json();
}

export async function createGmailDraft(accessToken: string, to: string, subject: string, body: string) {
  const raw = encodeRFC2822(to, subject, body);
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: { raw } })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to create Gmail draft (${res.status}): ${errText}`);
  }

  return await res.json();
}

export async function trashGmailMessage(accessToken: string, messageId: string) {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to move Gmail message to trash (${res.status}): ${errText}`);
  }

  return await res.json();
}
