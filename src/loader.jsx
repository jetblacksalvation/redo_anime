import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

function getHost() {
  return window.location.protocol + '//' + window.location.host;
}
console.log("loading stuff")

const currentHost = getHost();
let sceneRef = { current: null };
let scene = null;
let camera = null;
let renderer = null;
let loader = null;
let clock = null;
let mixer = null;
let model = null;
let animationMixer = null;
// Check if the elements already exist, if not, create them
let animationList = null
if (!sceneRef.current) {
  sceneRef.current = document.createElement('div');
  document.body.appendChild(sceneRef.current);
}

if (!scene) {
  scene = new THREE.Scene();
}

if (!camera) {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
}

if (!renderer) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneRef.current.appendChild(renderer.domElement);
}

if (!loader) {
  loader = new GLTFLoader();
}

if (!clock) {
  clock = new THREE.Clock();
}

if (!mixer) {
  mixer = new THREE.AnimationMixer();
}

if (!model){
    loader.load(currentHost + '/modelassets/cali/scene.gltf', (gltf) => {
        if(!animationMixer){
            animationMixer = new THREE.AnimationMixer(gltf.scene);
        }
        console.log('Model loaded:', gltf);
        scene.add(gltf.scene);
        camera.position.set(0, 0, 10);

        const animations = gltf.animations.map((clip) => animationMixer.clipAction(clip));

        // Play the first animation
        if (!animationList){
            animationList = []
            gltf.animations.forEach((elem)=>{
                animationList.push(elem)
            })
        }

        if (animations.length > 0) {
          const firstAction = animations[0];
          firstAction.play();
        }
      }, undefined, (error) => {
        console.error('Error loading model:', error);
      });
      renderer.domElement.id = 'bg';

}
camera.position.set(0, 0, 10);
export {
  sceneRef,
  scene,
  camera,
  renderer,
  loader,
  clock,
  mixer,
  model,
  animationMixer,
  animationList
};
