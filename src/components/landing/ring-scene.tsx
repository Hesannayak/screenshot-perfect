import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Color, DataTexture, Group, Mesh, MathUtils, RedFormat, SRGBColorSpace } from "three";

type Palette = { violet: Color; cyan: Color; ink: Color };
type Pointer = { x: number; y: number };

function themeColor(token: string) {
  const surface = document.createElement("canvas");
  surface.width = 1;
  surface.height = 1;
  const context = surface.getContext("2d");
  if (!context) return new Color();
  context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  context.fillRect(0, 0, 1, 1);
  const pixel = context.getImageData(0, 0, 1, 1).data;
  return new Color().setRGB((pixel[0] ?? 0) / 255, (pixel[1] ?? 0) / 255, (pixel[2] ?? 0) / 255, SRGBColorSpace);
}

function Sculpture({ palette, pointer, reduced, onReady, progress }: {
  palette: Palette; pointer: RefObject<Pointer>; reduced: boolean; onReady: () => void; progress?: RefObject<number>;
}) {
  const assembly = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const leftRing = useRef<Group>(null);
  const rightRing = useRef<Group>(null);
  const payment = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const ready = useRef(false);
  const brushed = useMemo(() => {
    const pixels = new Uint8Array(128 * 128);
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        pixels[y * 128 + x] = 160 + Math.round(28 * Math.sin(y * 1.7) + 8 * Math.sin(x * 0.4 + y));
      }
    }
    const texture = new DataTexture(pixels, 128, 128, RedFormat);
    texture.needsUpdate = true;
    return texture;
  }, []);
  useEffect(() => () => brushed.dispose(), [brushed]);

  useFrame((_, delta) => {
    if (!ready.current) {
      ready.current = true;
      // Signal only after the first rendered frame.
      requestAnimationFrame(onReady);
    }
    const dt = Math.min(delta, 0.05);
    if (!reduced) elapsed.current += dt;
    const t = elapsed.current;
    const p = MathUtils.clamp(progress?.current ?? 0, 0, 1);
    const opening = Math.sin(p * Math.PI);
    if (assembly.current) {
      assembly.current.rotation.x = MathUtils.damp(assembly.current.rotation.x, 0.2 + Math.sin(t * 0.3) * 0.12 + pointer.current.y * 0.18, 3, dt);
      assembly.current.rotation.y = MathUtils.damp(assembly.current.rotation.y, Math.sin(t * 0.24) * 0.5 + pointer.current.x * 0.35 + p * 0.9, 4, dt);
      assembly.current.rotation.z = -0.22 + Math.sin(t * 0.2) * 0.1;
      assembly.current.position.y = Math.sin(t * 0.75) * 0.09;
    }
    if (leftRing.current) leftRing.current.position.x = -0.67 - opening * 0.25;
    if (rightRing.current) {
      rightRing.current.position.x = 0.67 + opening * 0.25;
      rightRing.current.rotation.y = 1.03 - opening * 0.55;
    }
    if (payment.current) {
      payment.current.position.set(-2.3 + p * 4.6, Math.sin(p * Math.PI * 2) * 0.3, Math.sin(p * Math.PI) * 0.65);
      payment.current.rotation.set(t * 0.5, t * 0.8, Math.PI / 4);
    }
    if (orbit.current) orbit.current.rotation.z = t * 0.12 + p * Math.PI;
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 5]} intensity={3} color={palette.ink} />
      <directionalLight position={[-4, 1, 2]} intensity={3} color={palette.violet} />
      <directionalLight position={[4, -2, 1]} intensity={2.5} color={palette.cyan} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={4} position={[0, 4, 3]} scale={[7, 2, 1]} color={palette.ink} />
        <Lightformer intensity={5} position={[-4, 0, 2]} rotation-y={Math.PI / 3} scale={[2, 6, 1]} color={palette.violet} />
        <Lightformer intensity={5} position={[4, 1, 2]} rotation-y={-Math.PI / 3} scale={[2, 6, 1]} color={palette.cyan} />
        <Lightformer intensity={2} position={[0, -3, 2]} scale={[6, 1, 1]} color={palette.ink} />
      </Environment>
      <group ref={assembly} rotation={[0.2, 0, -0.22]} scale={1.16}>
        <group ref={leftRing} position={[-0.67, 0, 0]} rotation={[0.12, -0.35, 0]}>
          <mesh>
            <torusGeometry args={[1.06, 0.22, 32, 128]} />
            <meshPhysicalMaterial color={palette.violet} metalness={0.78} roughness={0.24} roughnessMap={brushed} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.4} />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <torusGeometry args={[1.065, 0.012, 8, 128]} />
            <meshStandardMaterial color={palette.ink} metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
        <group ref={rightRing} position={[0.67, 0, 0]} rotation={[0, 1.03, 0.12]}>
          <mesh>
            <torusGeometry args={[1.06, 0.22, 32, 128]} />
            <meshPhysicalMaterial color={palette.cyan} metalness={0.72} roughness={0.22} roughnessMap={brushed} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.4} />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <torusGeometry args={[1.065, 0.012, 8, 128]} />
            <meshStandardMaterial color={palette.ink} metalness={0.5} roughness={0.2} />
          </mesh>
        </group>
        {progress && <mesh ref={payment} position={[-2.3, 0, 0]}>
          <octahedronGeometry args={[0.14]} />
          <meshStandardMaterial color={palette.ink} metalness={0.35} roughness={0.16} />
        </mesh>}
        <group rotation={[0.85, 0.2, 0]}>
          <group ref={orbit}>
            <mesh rotation={[0, 0, 0.3]}>
              <torusGeometry args={[2.05, 0.008, 6, 128, Math.PI * 1.35]} />
              <meshBasicMaterial color={palette.cyan} transparent opacity={0.32} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI * 1.65]}>
              <torusGeometry args={[2.05, 0.008, 6, 32, Math.PI * 0.25]} />
              <meshBasicMaterial color={palette.violet} transparent opacity={0.55} />
            </mesh>
            <mesh position={[2.05, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <octahedronGeometry args={[0.055]} />
              <meshStandardMaterial color={palette.cyan} metalness={0.6} roughness={0.2} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

export default function RingScene({ progress }: { progress?: RefObject<number> }) {
  const container = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [palette, setPalette] = useState<Palette | null>(null);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPalette({ violet: themeColor("--violet"), cyan: themeColor("--cyan"), ink: themeColor("--foreground") });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (container.current) observer.observe(container.current);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  return (
    <div ref={container} className="h-full w-full" role="img" aria-label="Animated, interlocking violet and cyan Ringfence rings" data-scene-ready={ready || undefined}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current = { x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2, y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2 };
      }}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
      {palette && <Canvas camera={{ position: [0, 0, progress ? 8.2 : 6.9], fov: 36 }} dpr={[1, 1.5]} frameloop={!reduced && visible ? "always" : "demand"} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
        <Sculpture palette={palette} pointer={pointer} reduced={reduced} onReady={() => setReady(true)} {...(progress ? { progress } : {})} />
      </Canvas>}
    </div>
  );
}