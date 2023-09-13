import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new GLTFLoader();
    loader.load(
      'bun.gltf',
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, -10);
      },
      undefined,
      (error) => console.error('Erreur lors du chargement du modèle', error)
    );

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Si tu souhaites que les controls se mettent à jour à chaque frame
      renderer.render(scene, camera);
    };
    animate();
    sceneRef.current.appendChild(renderer.domElement);
    return () => {
      controls.dispose();
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={sceneRef}></div>;
}
