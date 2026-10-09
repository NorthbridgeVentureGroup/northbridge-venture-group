"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type ShowcaseObjectId = "cube" | "sphere" | "ring";

type VisualEngineViewportProps = {
  readonly selected: ShowcaseObjectId;
  readonly autoRotate: boolean;
  readonly resetToken: number;
  readonly onSelect: (id: ShowcaseObjectId) => void;
};

const SKY = "#87b8e3";
const CAMERA_POS = new THREE.Vector3(0, 1.35, 4.2);
const TARGET = new THREE.Vector3(0, 0.7, 0);

/**
 * Thin public adapter of NVE SceneHost (orbit, lighting, horizon, primitives).
 * Canonical implementation remains `@northbridge/visual-engine`.
 */
export default function VisualEngineViewport({
  selected,
  autoRotate,
  resetToken,
  onSelect,
}: VisualEngineViewportProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef(selected);
  const autoRotateRef = useRef(autoRotate);
  const onSelectRef = useRef(onSelect);
  const resetViewRef = useRef<(() => void) | null>(null);

  selectedRef.current = selected;
  autoRotateRef.current = autoRotate;
  onSelectRef.current = onSelect;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SKY);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 800);
    camera.position.copy(CAMERA_POS);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight("#c8e0ff", "#3d4a32", 0.85);
    const key = new THREE.DirectionalLight("#ffffff", 1.15);
    key.position.set(8, 18, 6);
    const ambient = new THREE.AmbientLight("#ffffff", 0.22);
    scene.add(hemi, key, ambient);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ color: "#4a6741" }),
    );
    ground.rotation.x = -Math.PI / 2;
    const ridge = new THREE.Mesh(
      new THREE.BoxGeometry(80, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: "#6b7a5e" }),
    );
    ridge.position.set(0, 0.02, -40);
    scene.add(ground, ridge);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.95, 0.95),
      new THREE.MeshStandardMaterial({ color: "#d8dde6", metalness: 0.15, roughness: 0.4 }),
    );
    cube.position.set(-1.55, 0.85, 0);
    cube.userData.id = "cube";

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshStandardMaterial({ color: "#b11226", metalness: 0.2, roughness: 0.35 }),
    );
    sphere.position.set(0, 0.85, 0);
    sphere.userData.id = "sphere";

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.16, 16, 48),
      new THREE.MeshStandardMaterial({ color: "#2b313c", metalness: 0.35, roughness: 0.3 }),
    );
    ring.position.set(1.55, 0.85, 0);
    ring.rotation.set(0.4, 0.3, 0);
    ring.userData.id = "ring";

    const marker = new THREE.Mesh(
      new THREE.RingGeometry(0.42, 0.5, 32),
      new THREE.MeshBasicMaterial({ color: "#b11226", side: THREE.DoubleSide }),
    );
    marker.rotation.x = -Math.PI / 2;
    marker.position.y = 0.13;

    scene.add(cube, sphere, ring, marker);
    const pickables = [cube, sphere, ring];

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.copy(TARGET);
    controls.update();

    resetViewRef.current = () => {
      camera.position.copy(CAMERA_POS);
      controls.target.copy(TARGET);
      controls.update();
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const onPointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      const id = hit?.object.userData.id as ShowcaseObjectId | undefined;
      if (id) {
        onSelectRef.current(id);
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      if (document.hidden) {
        return;
      }
      if (now - last < 1000 / 60) {
        return;
      }
      last = now;
      controls.autoRotate = autoRotateRef.current;
      const current = selectedRef.current;
      const active = pickables.find((mesh) => mesh.userData.id === current) ?? sphere;
      marker.position.x = active.position.x;
      marker.position.z = active.position.z;
      controls.update();
      renderer.render(scene, camera);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      resetViewRef.current = null;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      controls.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    if (resetToken === 0) {
      return;
    }
    resetViewRef.current?.();
  }, [resetToken]);

  return <div ref={hostRef} className="h-full w-full" data-nve-public-viewport="" />;
}
