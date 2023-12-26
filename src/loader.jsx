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
if (!renderer) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  var pos = document.getRootNode().getElementById('cv');
  if (pos){
    sceneRef.current= pos.appendChild(renderer.domElement);

  }
  else{
    sceneRef.current= document.body.appendChild(renderer.domElement);

  }
}

if (!sceneRef.current && renderer) {

}

if (!scene) {
  scene = new THREE.Scene();
}

if (!camera) {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
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
function changeCanvas(newCanvasId, containerId) {
  // Get the old canvas
  const oldCanvas = document.getElementById('bg');
  
  // If the old canvas exists, remove it
  if (oldCanvas) {
    oldCanvas.parentNode.removeChild(oldCanvas);
  }
  

  
  // Get the container element
  const container = document.getElementById(containerId);
  
  // If the container exists, append the new canvas to it
  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    // If the container doesn't exist, append the new canvas to the body
    document.body.appendChild(renderer.domElement);
  }
  
  // Update the renderer to use the new canvas
  
  // Resize the renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export { changeCanvas };
