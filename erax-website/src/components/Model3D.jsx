import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Center } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Package } from 'lucide-react'
import * as THREE from 'three'

// A-Frame Model Component
function AFrameModel() {
  const groupRef = useRef()
  const obj = useLoader(OBJLoader, '/models/A_Frame.obj')

  useEffect(() => {
    if (obj) {
      // Center the geometry
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.center()
        }
      })
    }
  }, [obj])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Center>
      <group ref={groupRef} position={[-3, 1.5, 0]}>
        <primitive
          object={obj}
          scale={0.4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#005bb3"
            metalness={0.8}
            roughness={0.2}
            attach="material"
          />
        </primitive>
      </group>
    </Center>
  )
}

// Loading placeholder
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <Package className="w-16 h-16 text-primary-600 animate-pulse mx-auto mb-4" />
        <p className="text-gray-600">Loading 3D Preview...</p>
      </div>
    </div>
  )
}

// Main 3D Model Container
const Model3D = () => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#f9fafb', 1)
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            castShadow
          />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.5} />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[5, 3, 8]}
            fov={50}
          />

          {/* A-Frame Model */}
          <AFrameModel />

          {/* Ground plane for shadow */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
          <Package className="w-4 h-4 inline-block mr-2" />
          A-Frame Structure - 3D Model Preview
        </p>
      </div>
    </div>
  )
}

export default Model3D