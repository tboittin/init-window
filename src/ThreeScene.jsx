import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ThreeScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    const loader = new GLTFLoader();
    loader.load(
      'bun.gltf',
      (gltf) => {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
      },
      undefined,
      (error) => console.error('Erreur lors du chargement du modèle', error)
    );
  }, []);
  return <div ref={sceneRef}></div>;
}
