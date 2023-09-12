import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
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

    renderer.render(scene, camera);
  }, []);
  return <div ref={sceneRef}></div>;
}
