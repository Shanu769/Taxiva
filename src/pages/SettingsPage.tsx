/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import SettingsView from "../components/SettingsView";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function SettingsPage() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("client@taxiva.co");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setCurrentUserEmail(user.email);
      } else {
        const demo = localStorage.getItem("taxiva_demo_user");
        if (demo) {
          try {
            const parsed = JSON.parse(demo);
            if (parsed.email) setCurrentUserEmail(parsed.email);
          } catch (e) {
            console.error(e);
          }
        }
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="w-full bg-[#F8F9FA] flex flex-col font-sans">
      <main className="flex-1 py-10 px-4 sm:px-6">
        <SettingsView currentUserEmail={currentUserEmail} />
      </main>
    </div>
  );
}

