/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Camera,
  Layers,
  Sparkles,
  RotateCcw,
  ShieldCheck
} from "lucide-react";

// Pre-allocated module-scope math scratch objects (Zero GC in render loop)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _dummyMatrix = new THREE.Matrix4();
const _dummyPos = new THREE.Vector3();
const _dummyQuat = new THREE.Quaternion();
const _dummyScale = new THREE.Vector3();
const _dummyEuler = new THREE.Euler();
const _tempColor = new THREE.Color();

export type CameraPresetKey = "overview" | "form1040" | "business1120s" | "fbarNri" | "topLedger";
export type FinishThemeKey = "executiveGold" | "titaniumEmerald" | "platinumSapphire";

interface CameraPreset {
  label: string;
  subtitle: string;
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: Record<CameraPresetKey, CameraPreset> = {
  overview: {
    label: "360° Architecture",
    subtitle: "Complete Taxiva Compliance & Refund Vault",
    position: [0, 4.6, 9.8],
    target: [0, 1.6, 0]
  },
  form1040: {
    label: "Form 1040 & RSU",
    subtitle: "Individual Multi-State & Cost-Basis Folio",
    position: [-4.4, 2.9, 5.4],
    target: [-1.8, 1.9, 1.2]
  },
  business1120s: {
    label: "S-Corp & LLC (1120-S)",
    subtitle: "Corporate Tax Shield & Schedule K-1",
    position: [4.5, 3.0, 5.4],
    target: [1.8, 1.9, 1.2]
  },
  fbarNri: {
    label: "FBAR & NRI DTAA",
    subtitle: "FinCEN Form 114 & Form 1116 Cross-Border Ring",
    position: [0, 3.4, -7.8],
    target: [0, 2.0, 0]
  },
  topLedger: {
    label: "IRS E-File Crest",
    subtitle: "Top-Down Audit & Encryption Seal",
    position: [0, 9.2, 2.2],
    target: [0, 1.5, 0]
  }
};

const FINISH_PALETTES: Record<
  FinishThemeKey,
  {
    label: string;
    primaryMetal: number;
    secondaryMetal: number;
    accentGlow: number;
    plinthColor: number;
  }
> = {
  executiveGold: {
    label: "Executive Gold & Navy",
    primaryMetal: 0xd4af37,
    secondaryMetal: 0x1e3a8a,
    accentGlow: 0xf59e0b,
    plinthColor: 0x0f172a
  },
  titaniumEmerald: {
    label: "Titanium & IRS Emerald",
    primaryMetal: 0x10b981,
    secondaryMetal: 0x334155,
    accentGlow: 0x34d399,
    plinthColor: 0x091510
  },
  platinumSapphire: {
    label: "Platinum & Royal Sapphire",
    primaryMetal: 0x60a5fa,
    secondaryMetal: 0x94a3b8,
    accentGlow: 0x38bdf8,
    plinthColor: 0x0a1124
  }
};

/**
 * Generates a high-DPI procedural CanvasTexture for 3D Tax Document Folios
 */
function createTaxFolioTexture(
  renderer: THREE.WebGLRenderer,
  formCode: string,
  title: string,
  subtitle: string,
  metricLabel: string,
  metricValue: string,
  accentHex: string
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext("2d")!;

  // Warm archival parchment / dark slate card background
  const grad = ctx.createLinearGradient(0, 0, 512, 680);
  grad.addColorStop(0, "#0f172a");
  grad.addColorStop(1, "#1e293b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 680);

  // Outer gold border
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, 476, 644);

  // Top Header Band
  ctx.fillStyle = accentHex;
  ctx.fillRect(36, 36, 440, 86);

  ctx.fillStyle = "#090d16";
  ctx.font = "900 38px sans-serif";
  ctx.fillText(formCode, 56, 92);

  ctx.font = "700 16px monospace";
  ctx.fillText("TAXIVA LLC CPA VERIFIED", 255, 86);

  // Title & Subtitle
  ctx.fillStyle = "#f8fafc";
  ctx.font = "800 28px sans-serif";
  ctx.fillText(title, 44, 175);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 18px sans-serif";
  ctx.fillText(subtitle, 44, 208);

  // Simulated Tax Schedule Ledger Lines & Bars
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) {
    const y = 255 + i * 48;
    ctx.beginPath();
    ctx.moveTo(44, y);
    ctx.lineTo(468, y);
    ctx.stroke();

    // Simulated data bar
    ctx.fillStyle = i % 2 === 0 ? "#38bdf8" : accentHex;
    const barW = 140 + ((i * 53) % 180);
    ctx.fillRect(44, y - 24, barW, 14);

    // Simulated dollar figure on right
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "700 16px monospace";
    ctx.fillText(`$${(12400 + i * 6350).toLocaleString()}`, 375, y - 11);
  }

  // Bottom Verified Metric Box
  ctx.fillStyle = "#090d16";
  ctx.fillRect(44, 515, 424, 112);
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 515, 424, 112);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "700 16px uppercase sans-serif";
  ctx.fillText(metricLabel, 64, 552);

  ctx.fillStyle = accentHex;
  ctx.font = "900 34px monospace";
  ctx.fillText(metricValue, 64, 602);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a procedural radial contact shadow texture
 */
function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
  grad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
  grad.addColorStop(0.55, "rgba(0, 0, 0, 0.32)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates a procedural chapter ring dial texture for the monument base
 */
function createChapterDialTexture(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0b1324";
  ctx.fillRect(0, 0, 1024, 1024);

  const cx = 512;
  const cy = 512;

  // Concentric rings
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 460, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 380, 0, Math.PI * 2);
  ctx.stroke();

  // Radial tick marks (72 precision ticks)
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2;
    const isMajor = i % 6 === 0;
    const rInner = isMajor ? 415 : 435;
    const rOuter = 455;
    ctx.strokeStyle = isMajor ? "#f59e0b" : "#475569";
    ctx.lineWidth = isMajor ? 5 : 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
    ctx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

export default function Taxiva3DShowcase() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);

  // UI Control states
  const [activePreset, setActivePreset] = useState<CameraPresetKey>("overview");
  const [activeFinish, setActiveFinish] = useState<FinishThemeKey>("executiveGold");
  const [explodedRatio, setExplodedRatio] = useState<number>(0.15);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Mutable refs for animation loop access without re-mounting WebGL
  const stateRef = useRef({
    explodedTarget: 0.15,
    explodedCurrent: 0.15,
    autoRotate: true,
    cameraTransitionActive: false,
    camTargetPos: new THREE.Vector3(...CAMERA_PRESETS.overview.position),
    camTargetLook: new THREE.Vector3(...CAMERA_PRESETS.overview.target)
  });

  const materialsRef = useRef<{
    primaryMetalMat?: THREE.MeshPhysicalMaterial;
    secondaryMetalMat?: THREE.MeshStandardMaterial;
    accentMat?: THREE.MeshStandardMaterial;
    plinthMat?: THREE.MeshStandardMaterial;
  }>({});

  // Sync React controls to mutable ref
  useEffect(() => {
    stateRef.current.explodedTarget = explodedRatio;
  }, [explodedRatio]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  const handleSelectPreset = (key: CameraPresetKey) => {
    setActivePreset(key);
    const preset = CAMERA_PRESETS[key];
    stateRef.current.camTargetPos.set(...preset.position);
    stateRef.current.camTargetLook.set(...preset.target);
    stateRef.current.cameraTransitionActive = true;
  };

  const handleSelectFinish = (key: FinishThemeKey) => {
    setActiveFinish(key);
    const palette = FINISH_PALETTES[key];
    if (materialsRef.current.primaryMetalMat) {
      materialsRef.current.primaryMetalMat.color.setHex(palette.primaryMetal);
    }
    if (materialsRef.current.secondaryMetalMat) {
      materialsRef.current.secondaryMetalMat.color.setHex(palette.secondaryMetal);
    }
    if (materialsRef.current.accentMat) {
      materialsRef.current.accentMat.color.setHex(palette.accentGlow);
      materialsRef.current.accentMat.emissive.setHex(palette.accentGlow);
    }
    if (materialsRef.current.plinthMat) {
      materialsRef.current.plinthMat.color.setHex(palette.plinthColor);
    }
  };

  // Keyboard shortcut 'H' to collapse/expand bottom HUD
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          setDockCollapsed((prev) => !prev);
        }
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullscreen]);

  // Trigger resize when toggling fullscreen
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isFullscreen]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Software WebGL detection from GPU renderer string (never user-agent)
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement("canvas");
      const gl = probeCanvas.getContext("webgl2");
      if (!gl) return true;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 600;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: "high-performance"
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Scene, Environment & Horizon Fog
    const scene = new THREE.Scene();
    const bgHex = 0x060b16;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.032);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 4. Camera & OrbitControls
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(...CAMERA_PRESETS.overview.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.overview.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 4.2;
    controls.maxDistance = 18;

    controls.addEventListener("start", () => {
      stateRef.current.cameraTransitionActive = false;
    });

    // 5. Studio 3-Point Lighting Rig (Warm Key + Cool Hemisphere Fill + Rim)
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.8);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.6);
    keyLight.position.set(7, 12, 8);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    const d = 7.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(-8, 6, -7);
    scene.add(rimLight);

    // 6. Shared PBR Material Library (varied roughness >= 0.25 across adjacent parts)
    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const primaryMetalMat = track(
      new THREE.MeshPhysicalMaterial({
        color: FINISH_PALETTES.executiveGold.primaryMetal,
        metalness: 0.92,
        roughness: 0.16,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15
      })
    );

    const secondaryMetalMat = track(
      new THREE.MeshStandardMaterial({
        color: FINISH_PALETTES.executiveGold.secondaryMetal,
        metalness: 0.65,
        roughness: 0.45
      })
    );

    const brushedTitaniumMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.85,
        roughness: 0.22
      })
    );

    const plinthMat = track(
      new THREE.MeshStandardMaterial({
        color: FINISH_PALETTES.executiveGold.plinthColor,
        metalness: 0.25,
        roughness: 0.72
      })
    );

    const accentMat = track(
      new THREE.MeshStandardMaterial({
        color: FINISH_PALETTES.executiveGold.accentGlow,
        emissive: FINISH_PALETTES.executiveGold.accentGlow,
        emissiveIntensity: 0.35,
        metalness: 0.8,
        roughness: 0.2
      })
    );

    const glassDomeMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xdbeafe,
        transmission: isSoftwareGl ? 0 : 0.92,
        transparent: true,
        opacity: isSoftwareGl ? 0.28 : 1.0,
        roughness: 0.08,
        ior: 1.52,
        thickness: 0.6,
        clearcoat: 1.0,
        depthWrite: false
      })
    );

    materialsRef.current = {
      primaryMetalMat,
      secondaryMetalMat,
      accentMat,
      plinthMat
    };

    // 7. Ground Floor & Contact Shadow Plane (Coplanar Z-fighting prevented)
    const floorGeo = track(new THREE.CylinderGeometry(18, 18, 0.2, 64));
    const floorMesh = new THREE.Mesh(floorGeo, plinthMat);
    floorMesh.position.y = -0.1;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const shadowTex = track(createContactShadowTexture());
    const shadowPlaneGeo = track(new THREE.PlaneGeometry(11, 11));
    const shadowPlaneMat = track(
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      })
    );
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.015;
    scene.add(shadowPlane);

    // 8. Composite 10-Part Hero Procedural Monument (`THREE.Group` grounded at y = 0)
    const monumentGroup = new THREE.Group();
    monumentGroup.position.set(0, 0, 0);
    scene.add(monumentGroup);

    // Part 1: Stepped Octagonal Base Plinth (Primary silhouette)
    const basePlinthGeo = track(new THREE.CylinderGeometry(3.4, 3.8, 0.42, 8));
    const basePlinth = new THREE.Mesh(basePlinthGeo, plinthMat);
    basePlinth.position.y = 0.21;
    basePlinth.castShadow = true;
    basePlinth.receiveShadow = true;
    monumentGroup.add(basePlinth);

    // Part 2: Chapter Ring Dial Plate with Procedural Texture
    const dialTex = track(createChapterDialTexture(renderer));
    const dialMat = track(
      new THREE.MeshStandardMaterial({
        map: dialTex,
        roughness: 0.35,
        metalness: 0.5
      })
    );
    const dialPlateGeo = track(new THREE.CylinderGeometry(3.1, 3.25, 0.18, 48));
    const dialPlate = new THREE.Mesh(dialPlateGeo, dialMat);
    dialPlate.position.y = 0.51;
    dialPlate.receiveShadow = true;
    monumentGroup.add(dialPlate);

    // Part 3: Brushed Gold Bevel Trim Ring
    const trimRingGeo = track(new THREE.TorusGeometry(3.12, 0.07, 16, 64));
    const trimRing = new THREE.Mesh(trimRingGeo, primaryMetalMat);
    trimRing.rotation.x = Math.PI / 2;
    trimRing.position.y = 0.6;
    monumentGroup.add(trimRing);

    // Part 4: 6 Architectural Fluted Support Columns (Secondary read)
    const columnsGroup = new THREE.Group();
    monumentGroup.add(columnsGroup);
    const colGeo = track(new THREE.CylinderGeometry(0.14, 0.17, 1.85, 16));
    const capGeo = track(new THREE.BoxGeometry(0.42, 0.12, 0.42));
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 2.35;
      const colWrapper = new THREE.Group();
      colWrapper.position.set(Math.cos(angle) * radius, 0.6, Math.sin(angle) * radius);

      const shaft = new THREE.Mesh(colGeo, brushedTitaniumMat);
      shaft.position.y = 0.925;
      shaft.castShadow = true;
      colWrapper.add(shaft);

      const baseCap = new THREE.Mesh(capGeo, primaryMetalMat);
      baseCap.position.y = 0.06;
      colWrapper.add(baseCap);

      const topCap = new THREE.Mesh(capGeo, primaryMetalMat);
      topCap.position.y = 1.85;
      colWrapper.add(topCap);

      columnsGroup.add(colWrapper);
    }

    // Part 5: Lathe-Turned Central Tax Vault Pedestal (`LatheGeometry`)
    const lathePoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.15, 0.0),
      new THREE.Vector2(1.05, 0.25),
      new THREE.Vector2(0.72, 0.55),
      new THREE.Vector2(0.88, 1.05),
      new THREE.Vector2(1.22, 1.35),
      new THREE.Vector2(0.0, 1.35)
    ];
    const pedestalGeo = track(new THREE.LatheGeometry(lathePoints, 32));
    const pedestalMesh = new THREE.Mesh(pedestalGeo, secondaryMetalMat);
    pedestalMesh.position.y = 0.6;
    pedestalMesh.castShadow = true;
    monumentGroup.add(pedestalMesh);

    // Part 6: Beveled Extruded Hexagonal Tax Core (`ExtrudeGeometry`)
    const hexShape = new THREE.Shape();
    const hexRadius = 0.85;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const x = Math.cos(a) * hexRadius;
      const y = Math.sin(a) * hexRadius;
      if (i === 0) hexShape.moveTo(x, y);
      else hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    const coreExtrudeGeo = track(
      new THREE.ExtrudeGeometry(hexShape, {
        depth: 0.75,
        bevelEnabled: true,
        bevelThickness: 0.12,
        bevelSize: 0.1,
        bevelSegments: 4
      })
    );
    coreExtrudeGeo.center();
    const vaultCoreMesh = new THREE.Mesh(coreExtrudeGeo, primaryMetalMat);
    vaultCoreMesh.rotation.x = Math.PI / 2;
    vaultCoreMesh.position.y = 2.35;
    vaultCoreMesh.castShadow = true;
    monumentGroup.add(vaultCoreMesh);

    // Part 7 & 8: Dual Orbital Compliance Gyroscope Rings (Inner & Outer)
    const innerGyroGeo = track(new THREE.TorusGeometry(1.42, 0.045, 16, 64));
    const innerGyroRing = new THREE.Mesh(innerGyroGeo, accentMat);
    innerGyroRing.position.y = 2.35;
    monumentGroup.add(innerGyroRing);

    const outerGyroGeo = track(new THREE.TorusGeometry(1.72, 0.055, 16, 64));
    const outerGyroRing = new THREE.Mesh(outerGyroGeo, brushedTitaniumMat);
    outerGyroRing.position.y = 2.35;
    monumentGroup.add(outerGyroRing);

    // Part 9: Upper Crown Arch & Protective Optical Glass Dome
    const crownRingGeo = track(new THREE.CylinderGeometry(2.55, 2.55, 0.18, 32, 1, true));
    const crownRingMesh = new THREE.Mesh(crownRingGeo, primaryMetalMat);
    crownRingMesh.position.y = 2.55;
    monumentGroup.add(crownRingMesh);

    const glassDomeGeo = track(
      new THREE.SphereGeometry(2.45, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.48)
    );
    const glassDomeMesh = new THREE.Mesh(glassDomeGeo, glassDomeMat);
    glassDomeMesh.position.y = 2.52;
    glassDomeMesh.renderOrder = 10;
    monumentGroup.add(glassDomeMesh);

    // Part 10: 4 Composite 3D Tax Filing Folios (Form 1040, Form 1120-S, FinCEN 114, Form 1116)
    const foliosData = [
      {
        code: "FORM 1040",
        title: "Individual & Multi-State",
        subtitle: "W-2 • 1099 • RSU Basis • Sch E",
        metricLabel: "AVG CLIENT REFUND OPTIMIZATION",
        metricValue: "+$6,840 VERIFIED",
        accent: "#fbbf24",
        angle: Math.PI * 0.75
      },
      {
        code: "FORM 1120-S",
        title: "Business & S-Corp Tax",
        subtitle: "LLC • Form 1065 • QBI • Sch K-1",
        metricLabel: "ANNUAL S-CORP TAX SAVINGS",
        metricValue: "$19,650 / YR",
        accent: "#38bdf8",
        angle: Math.PI * 0.25
      },
      {
        code: "FinCEN 114",
        title: "FBAR & FATCA 8938",
        subtitle: "Foreign Bank & NRE/NRO Accounts",
        metricLabel: "TREASURY COMPLIANCE STATUS",
        metricValue: "100% PENALTY-FREE",
        accent: "#34d399",
        angle: -Math.PI * 0.25
      },
      {
        code: "FORM 1116",
        title: "Indian Tax & NRI DTAA",
        subtitle: "Foreign Tax Credit & Indian ITR",
        metricLabel: "DOUBLE TAXATION RELIEF",
        metricValue: "DTAA VERIFIED",
        accent: "#f59e0b",
        angle: -Math.PI * 0.75
      }
    ];

    const folioGroups: Array<{
      group: THREE.Group;
      basePos: THREE.Vector3;
      dirVec: THREE.Vector3;
    }> = [];

    const folioFrameGeo = track(new THREE.BoxGeometry(1.42, 1.88, 0.08));
    const folioFaceGeo = track(new THREE.PlaneGeometry(1.3, 1.74));
    const sealBadgeGeo = track(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 24));

    foliosData.forEach((f) => {
      const fGroup = new THREE.Group();
      const radius = 3.35;
      const bx = Math.cos(f.angle) * radius;
      const bz = Math.sin(f.angle) * radius;
      const basePos = new THREE.Vector3(bx, 1.85, bz);
      const dirVec = new THREE.Vector3(Math.cos(f.angle), 0.25, Math.sin(f.angle)).normalize();

      fGroup.position.copy(basePos);
      fGroup.lookAt(bx * 2, 1.95, bz * 2);

      // Metallic Folio Frame
      const frameMesh = new THREE.Mesh(folioFrameGeo, secondaryMetalMat);
      frameMesh.castShadow = true;
      fGroup.add(frameMesh);

      // Front Procedural High-DPI Tax Return Texture
      const faceTex = track(
        createTaxFolioTexture(
          renderer,
          f.code,
          f.title,
          f.subtitle,
          f.metricLabel,
          f.metricValue,
          f.accent
        )
      );
      const faceMat = track(
        new THREE.MeshStandardMaterial({
          map: faceTex,
          roughness: 0.28,
          metalness: 0.1
        })
      );
      const faceMesh = new THREE.Mesh(folioFaceGeo, faceMat);
      faceMesh.position.z = 0.045;
      fGroup.add(faceMesh);

      // Gold IRS E-File Seal Badge on Corner
      const sealMesh = new THREE.Mesh(sealBadgeGeo, primaryMetalMat);
      sealMesh.rotation.x = Math.PI / 2;
      sealMesh.position.set(0.46, -0.68, 0.055);
      fGroup.add(sealMesh);

      monumentGroup.add(fGroup);
      folioGroups.push({ group: fGroup, basePos, dirVec });
    });

    // 9. InstancedMesh Orbital Tax Data Nodes (48 instances with varied scale & tint)
    const INSTANCE_COUNT = 48;
    const nodeGeo = track(new THREE.OctahedronGeometry(0.085, 0));
    const nodeMat = track(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.85,
        roughness: 0.2
      })
    );
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, INSTANCE_COUNT);
    const paletteColors = [0xfbbf24, 0x38bdf8, 0x34d399, 0x93c5fd];

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const t = i / INSTANCE_COUNT;
      const angle = t * Math.PI * 4;
      const r = 4.35 + (i % 2 === 0 ? 0.35 : -0.25);
      const y = 0.65 + Math.sin(t * Math.PI * 6) * 0.55 + t * 2.4;

      _dummyPos.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
      _dummyEuler.set(i * 0.3, angle, i * 0.2);
      _dummyQuat.setFromEuler(_dummyEuler);
      const s = 0.85 + ((i * 17) % 30) / 100; // ±15% scale variation
      _dummyScale.set(s, s, s);
      _dummyMatrix.compose(_dummyPos, _dummyQuat, _dummyScale);
      instancedNodes.setMatrixAt(i, _dummyMatrix);

      _tempColor.setHex(paletteColors[i % paletteColors.length]);
      instancedNodes.setColorAt(i, _tempColor);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    scene.add(instancedNodes);

    // Pre-warm shaders on hardware WebGL
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 10. Animation & Software-WebGL Paced Loop (`afterDraw`)
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const poll = () => {
        if (isDisposed) return;
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smoothly damp Exploded View separation
      stateRef.current.explodedCurrent = THREE.MathUtils.damp(
        stateRef.current.explodedCurrent,
        stateRef.current.explodedTarget,
        6,
        dt
      );
      const exp = stateRef.current.explodedCurrent;

      // Apply exploded offsets to composite parts
      vaultCoreMesh.position.y = 2.35 + exp * 0.95;
      vaultCoreMesh.rotation.z = elapsed * 0.35;

      innerGyroRing.position.y = 2.35 + exp * 0.95;
      innerGyroRing.rotation.x = elapsed * 0.65;
      innerGyroRing.rotation.y = elapsed * 0.45;

      outerGyroRing.position.y = 2.35 + exp * 0.95;
      outerGyroRing.rotation.y = -elapsed * 0.5;
      outerGyroRing.rotation.z = Math.sin(elapsed * 0.5) * 0.4;

      glassDomeMesh.position.y = 2.52 + exp * 1.85;
      crownRingMesh.position.y = 2.55 + exp * 1.4;

      // Update 4 Tax Filing Folios with exploded radial offset + gentle float
      for (let i = 0; i < folioGroups.length; i++) {
        const fg = folioGroups[i];
        const floatY = Math.sin(elapsed * 1.6 + i * 1.5) * 0.06;
        fg.group.position
          .copy(fg.basePos)
          .addScaledVector(fg.dirVec, exp * 1.35);
        fg.group.position.y += floatY;
      }

      // Rotate orbital instanced tax nodes
      instancedNodes.rotation.y = elapsed * 0.12;

      // Auto-rotate monument gently if enabled
      if (stateRef.current.autoRotate && !stateRef.current.cameraTransitionActive) {
        monumentGroup.rotation.y += dt * 0.18;
      }

      // Smoothly damp camera preset transitions
      if (stateRef.current.cameraTransitionActive) {
        const alpha = 1 - Math.exp(-5.5 * dt);
        _targetCamPos.copy(stateRef.current.camTargetPos);
        _targetLookAt.copy(stateRef.current.camTargetLook);
        camera.position.lerp(_targetCamPos, alpha);
        controls.target.lerp(_targetLookAt, alpha);

        if (
          camera.position.distanceToSquared(_targetCamPos) < 0.002 &&
          controls.target.distanceToSquared(_targetLookAt) < 0.002
        ) {
          stateRef.current.cameraTransitionActive = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Responsive resize handler
    const handleResize = () => {
      if (!container || isDisposed) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      envTexture.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <section
      className={
        isFullscreen
          ? "fixed inset-0 z-50 w-screen h-screen bg-slate-950 overflow-hidden"
          : "relative w-full h-[680px] sm:h-[740px] bg-slate-950 overflow-hidden border-y border-slate-800"
      }
      id="taxiva-3d-scene"
    >
      {/* Dedicated WebGL Mount Container (Outside React HUD overlays) */}
      <div ref={canvasMountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top-Left Minimal Spec & Title Badge (Zero Center Occlusion) */}
      <div className="absolute top-5 left-5 right-5 flex flex-wrap items-start justify-between gap-4 pointer-events-none z-10">
        <div className="bg-slate-950/95 border border-slate-800 rounded-2xl px-5 py-3.5 shadow-2xl pointer-events-auto max-w-md">
          <div className="flex items-center gap-2 text-amber-400 text-[11px] font-extrabold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Interactive 3D Tax Compliance Vault</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-display">
            {CAMERA_PRESETS[activePreset].label}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {CAMERA_PRESETS[activePreset].subtitle} • Drag to orbit, scroll to zoom
          </p>
        </div>

        {/* Fullscreen 100vw x 100vh Spatial Toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              handleSelectPreset("overview");
              setExplodedRatio(0.15);
              setAutoRotate(true);
            }}
            className="bg-slate-950/95 hover:bg-slate-900 text-slate-200 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xl cursor-pointer transition-colors"
            title="Reset 3D View"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Reset View</span>
          </button>

          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xl cursor-pointer transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span>Exit Fullscreen (Esc)</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>Fullscreen 3D (100vh)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unified Collapsible Bottom Control Dock (<= 15% Viewport Footprint, Solid Surface) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-5 z-10 w-[94vw] max-w-[920px] transition-transform duration-300 ${
          dockCollapsed ? "translate-y-[calc(100%-36px)]" : "translate-y-0"
        }`}
      >
        {/* Collapse / Expand Toggle Handle */}
        <div className="flex justify-center mb-1.5">
          <button
            onClick={() => setDockCollapsed((prev) => !prev)}
            className="bg-slate-950/95 hover:bg-slate-900 text-slate-300 border border-slate-800 px-4 py-1.5 rounded-t-xl text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            {dockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                <span>▴ Show 3D Controls (H)</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                <span>▾ Hide Controls (H)</span>
              </>
            )}
          </button>
        </div>

        {/* Main Horizontal Control Dock */}
        <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Camera View Presets (5 columns) */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>Inspect 3D Tax Folios & Pillars</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(CAMERA_PRESETS) as CameraPresetKey[]).map((key) => {
                  const isActive = activePreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectPreset(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      {CAMERA_PRESETS[key].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exploded View Slider & Rotation Toggle (3 columns) */}
            <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-3 lg:pt-0 lg:pl-4">
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Exploded View
                </span>
                <span className="font-mono text-amber-400">{Math.round(explodedRatio * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={explodedRatio}
                  onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <button
                  onClick={() => setAutoRotate((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border shrink-0 cursor-pointer ${
                    autoRotate
                      ? "bg-blue-950 text-blue-300 border-blue-700"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  {autoRotate ? "Orbit: ON" : "Orbit: OFF"}
                </button>
              </div>
            </div>

            {/* PBR Material Finish Swatches (3 columns) */}
            <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-3 lg:pt-0 lg:pl-4">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>PBR Vault Finish</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(FINISH_PALETTES) as FinishThemeKey[]).map((key) => {
                  const isActive = activeFinish === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectFinish(key)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-white text-slate-950"
                          : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {FINISH_PALETTES[key].label.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
