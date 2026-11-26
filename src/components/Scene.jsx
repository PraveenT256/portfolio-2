import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../scrollStore'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Where the "MERN core" sits as you scroll (x is a fraction of half the viewport width).
const KEYS = [
  { p: 0.0, x: 0.5, y: 0.05, s: 1.0, c: '#c6ff3d' },
  { p: 0.14, x: 0.72, y: 0.22, s: 0.55, c: '#8a5cff' },
  { p: 0.36, x: 0.75, y: -0.2, s: 0.5, c: '#00e0ff' },
  { p: 0.58, x: 0.72, y: 0.22, s: 0.5, c: '#ff4fd8' },
  { p: 0.8, x: 0.75, y: -0.15, s: 0.5, c: '#8a5cff' },
  { p: 1.0, x: 0.0, y: 0.12, s: 0.9, c: '#c6ff3d' },
]

const tmpA = new THREE.Color()
const tmpB = new THREE.Color()

function sample(p) {
  let i = 0
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const t = THREE.MathUtils.smoothstep(p, a.p, b.p)
  tmpA.set(a.c)
  tmpB.set(b.c)
  return {
    x: THREE.MathUtils.lerp(a.x, b.x, t),
    y: THREE.MathUtils.lerp(a.y, b.y, t),
    s: THREE.MathUtils.lerp(a.s, b.s, t),
    color: tmpA.clone().lerp(tmpB, t),
  }
}

function Orbit({ radius, tilt, speed, label, color, offset }) {
  const dot = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    dot.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius)
  })
  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <group ref={dot}>
        <mesh>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

function Core() {
  const group = useRef()
  const blob = useRef()
  const mat = useRef()
  const wire = useRef()
  const { viewport } = useThree()

  useFrame((state, dt) => {
    const mobile = viewport.width < 7
    const k = sample(scrollStore.progress)
    const targetX = mobile ? 0 : k.x * (viewport.width / 2)
    const targetY = (mobile ? 1.4 : k.y * viewport.height) - scrollStore.progress * 2 + scrollStore.mouseY * 0.15
    const targetS = (mobile ? 0.62 : k.s) * Math.min(1, viewport.width / 9 + 0.2)
    const ease = 1 - Math.pow(0.001, dt)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX + scrollStore.mouseX * 0.2, ease)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, ease)
    const s = THREE.MathUtils.lerp(group.current.scale.x, targetS, ease)
    group.current.scale.setScalar(s)

    const spin = reduceMotion ? 0.02 : 0.15 + Math.min(Math.abs(scrollStore.velocity) * 0.02, 1.5)
    blob.current.rotation.y += dt * spin
    blob.current.rotation.x += dt * spin * 0.4
    wire.current.rotation.y -= dt * spin * 0.6
    wire.current.rotation.z += dt * 0.05

    mat.current.color.lerp(k.color, 0.05)
    mat.current.distort = THREE.MathUtils.lerp(mat.current.distort, 0.32 + Math.min(Math.abs(scrollStore.velocity) * 0.01, 0.25), 0.08)
    wire.current.material.color.lerp(k.color, 0.05)
  })

  return (
    <group ref={group}>
      <mesh ref={blob}>
        <icosahedronGeometry args={[1.25, 48]} />
        <MeshDistortMaterial
          ref={mat}
          color="#c6ff3d"
          emissive="#1a0f3a"
          roughness={0.12}
          metalness={0.55}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[100, 900]}
          distort={0.32}
          speed={reduceMotion ? 0.4 : 2.2}
          envMapIntensity={2.2}
        />
      </mesh>
      <mesh ref={wire} scale={1.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#c6ff3d" wireframe transparent opacity={0.16} />
      </mesh>
      <Orbit radius={2.2} tilt={[0.35, 0, 0.2]} speed={0.7} offset={0} color="#19d38a" label="M" />
      <Orbit radius={2.55} tilt={[-0.5, 0.2, -0.3]} speed={0.5} offset={1.6} color="#e6e6e6" label="E" />
      <Orbit radius={2.9} tilt={[1.1, 0.1, 0.5]} speed={0.42} offset={3.1} color="#00e0ff" label="R" />
      <Orbit radius={3.25} tilt={[-1.0, -0.3, 0.1]} speed={0.33} offset={4.4} color="#8cc84b" label="N" />
    </group>
  )
}

function Particles({ count = 1600 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 18
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th)
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      arr[i * 3 + 2] = r * Math.cos(ph) - 6
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * (0.015 + Math.min(Math.abs(scrollStore.velocity) * 0.002, 0.2))
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, scrollStore.progress * 0.8, 0.05)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#b9b4ff" transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Debris() {
  const shapes = useMemo(
    () => [
      { pos: [-9, 5, -10], geo: 'oct', c: '#8a5cff' },
      { pos: [9, -4, -9], geo: 'knot', c: '#c6ff3d' },
      { pos: [-10, -6, -11], geo: 'box', c: '#00e0ff' },
      { pos: [8, 6, -12], geo: 'tet', c: '#ff4fd8' },
      { pos: [2, -10, -12], geo: 'oct', c: '#19d38a' },
    ],
    []
  )
  return shapes.map((s, i) => (
    <Float key={i} speed={reduceMotion ? 0 : 1.4} rotationIntensity={2} floatIntensity={2}>
      <mesh position={s.pos}>
        {s.geo === 'oct' && <octahedronGeometry args={[0.6]} />}
        {s.geo === 'knot' && <torusKnotGeometry args={[0.45, 0.14, 120, 16]} />}
        {s.geo === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
        {s.geo === 'tet' && <tetrahedronGeometry args={[0.7]} />}
        <meshStandardMaterial color={s.c} metalness={0.9} roughness={0.15} />
      </mesh>
    </Float>
  ))
}

function CameraRig() {
  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, scrollStore.mouseX * 0.6, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollStore.mouseY * 0.4 - scrollStore.progress * 2, 0.04)
    camera.lookAt(0, -scrollStore.progress * 2, 0)
  })
  return null
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <fog attach="fog" args={['#06060b', 9, 26]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#c6ff3d" />
        <pointLight position={[-6, -3, 2]} intensity={40} color="#8a5cff" />
        <Core />
        <Particles />
        <Debris />
        <CameraRig />
        <Environment resolution={256} frames={1}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} color="#8a5cff" />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} color="#00e0ff" />
            <Lightformer form="ring" color="#c6ff3d" intensity={6} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            <Lightformer form="rect" color="#ffffff" intensity={1.5} position={[0, 0, 10]} scale={[12, 6, 1]} />
            <Lightformer form="rect" color="#8a5cff" intensity={3} position={[0, -6, 2]} rotation-x={-Math.PI / 2} scale={[14, 4, 1]} />
          </group>
        </Environment>
      </Canvas>
    </div>
  )
}
