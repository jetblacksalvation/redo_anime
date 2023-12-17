import React, { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as loader from './loader'


const App = ()=>{

  useEffect(() =>{

    const animate = () => {
      console.log(loader.animationList, 'is list')

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
