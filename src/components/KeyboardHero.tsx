import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/** Shared, render-free channel: the Typed line writes the last key here, keys read it every frame. */
export type KeyStore = { key: string; t: number }

const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
const U = 0.62 // key pitch

function Key({ label, x, z, w = 0.54, store }: { label: string; x: number; z: number; w?: number; store: KeyStore }) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((_, dt) => {
    const on = store.key === label && performance.now() - store.t < 180
    const g = group.current!, m = mat.current!
    g.position.y = THREE.MathUtils.damp(g.position.y, on ? -0.09 : 0, 18, dt)
    m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, on ? 1.6 : 0.05, on ? 30 : 4, dt)
  })

  return (
    <group ref={group} position={[x, 0, z]}>
      <RoundedBox args={[w, 0.22, 0.54]} radius={0.07} smoothness={3} castShadow>
        <meshStandardMaterial ref={mat} color="#3b1424" emissive="#ff5c8a" emissiveIntensity={0.05} roughness={0.45} />
      </RoundedBox>
      <Text position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.2} color="#ffd6e2" anchorX="center" anchorY="middle">
        {label === ' ' ? '' : label}
      </Text>
    </group>
  )
}

function Board({ store }: { store: KeyStore }) {
  const tilt = useRef<THREE.Group>(null)
  useFrame((state, dt) => {
    const g = tilt.current!
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.75 - state.pointer.y * 0.15, 4, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.3, 4, dt)
  })

  return (
    <group ref={tilt}>
      <RoundedBox args={[6.7, 0.2, 2.75]} radius={0.12} position={[0, -0.18, 0.05]} receiveShadow>
        <meshStandardMaterial color="#b0234f" roughness={0.35} metalness={0.2} />
      </RoundedBox>
      {rows.map((row, r) =>
        [...row].map((k, i) => (
          <Key key={k} label={k} store={store} x={(i - (row.length - 1) / 2) * U + r * 0.16} z={(r - 1.5) * U} />
        )),
      )}
      <Key label=" " store={store} x={0.1} z={1.5 * U} w={3.2} />
    </group>
  )
}

export default function KeyboardHero({ store }: { store: KeyStore }) {
  return (
    <div className="keyboard-3d" aria-hidden="true">
      <Canvas camera={{ position: [0, 3.2, 4.6], fov: 38 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={1.6} castShadow />
        <pointLight position={[-3, 2, -2]} intensity={6} color="#ff5c8a" />
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.35}>
          <Board store={store} />
        </Float>
        <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={10} blur={2.4} far={3} />
      </Canvas>
    </div>
  )
}
