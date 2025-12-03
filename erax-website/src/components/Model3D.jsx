import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Package } from 'lucide-react'

// Simple Cube as placeholder (no model loading to avoid errors)
function PlaceholderCube() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#005bb3" 
        metalness={0.8} 
        roughness={0.2} 
      />
    </mesh>
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
          
          {/* Placeholder Cube */}
          <PlaceholderCube />
          
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
          3D Model Preview - Add your .glb file to public/models/
        </p>
      </div>
    </div>
  )
}

export default Model3D