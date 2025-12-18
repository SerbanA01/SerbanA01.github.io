import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Box } from 'lucide-react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

// Component for GLB/GLTF files
function GLTFModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

// Component for OBJ files
function OBJModel({ url }) {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj} scale={1.5} />;
}

const Model3DViewer = ({ model3D }) => {
  if (!model3D || model3D.type === 'none') {
    return null;
  }

  // Sketchfab Embed
  if (model3D.type === 'sketchfab' && model3D.sketchfabUrl) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Box className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Model 3D Interactiv</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Sketchfab</span>
        </div>
        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={model3D.sketchfabUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            title="3D Model"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Rotește cu mouse-ul • Zoom cu scroll • Fullscreen disponibil
        </p>
      </div>
    );
  }

  // Uploaded GLB/GLTF/OBJ File
  if (model3D.type === 'upload' && model3D.fileUrl) {
    // Determine file type from URL or fileName
    const fileExtension = (model3D.fileName || model3D.fileUrl).toLowerCase().split('.').pop();
    const isOBJ = fileExtension === 'obj';
    const ModelComponent = isOBJ ? OBJModel : GLTFModel;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Box className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">Model 3D Interactiv</h3>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
            {isOBJ ? 'OBJ' : 'GLB/GLTF'}
          </span>
        </div>
        <div className="w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <ModelComponent url={model3D.fileUrl} />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Rotește cu mouse-ul • Zoom cu scroll • Drag pentru a muta
        </p>
      </div>
    );
  }

  return null;
};

export default Model3DViewer;
