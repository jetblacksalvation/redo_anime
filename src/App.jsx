import React, { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as loader from './loader'
const SetCanvas = () =>{
  
}

const PrintArray = () =>{
  console.log( loader.animationList)
  return 
}
const ChangeAnimation = (index) => {
  // Ensure that the index is within bounds
  if (index >= 0 && index < loader.animationList.length) {
    loader.animationMixer.stopAllAction(); // Stop any ongoing animations
    loader.animationMixer.clipAction(loader.animationList[index]).play(); // Play the selected animation
  }
}
const App = ()=>{

  useEffect(() =>{

    const animate = () => {
      // console.log(loader.animationList, 'is list')

      requestAnimationFrame(animate);

      if (loader.animationMixer) {
        const delta = loader.clock.getDelta();
        loader.animationMixer.update(delta);
      }

      loader.renderer.render(loader.scene, loader.camera);
    };
    animate();

    }
  );
  return (
    <>
    
    </>
  )
}

export default App
export {PrintArray, App, ChangeAnimation};