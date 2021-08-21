import { useState } from 'react';
import CrazinessCanvas from './crazinessCanvas.js';
import CrazinessControls from './crazinessControls.js';

export default function CanvasCraziness() {
  const [options, setOptions] = useState({
    clear: 'clearCanvas',
    effect: 'particleTrail',
    burstRate: 'unlimited',
    number: 4,
    sizeMin: 1,
    sizeMax: 16,
    speed: 150,
    shrinkRate: 10,
    hue: 240,
    lightness: 50,
    cycleHue: false,
    cycleRate: 1,
  });

  function handleOptionsUpdate(newValues) {
    setOptions({...options, ...newValues});
  }

  return (
    <div className="content">
      <header className="App-header">
        <h1>CaNvAs CrAzInEsS!</h1>
      </header>

      <CrazinessControls
        options = {options}
        setOptions = {handleOptionsUpdate} />

      <div className="demoContainer">
        <CrazinessCanvas
          options = {options} />
      </div>
    </div>
  );
}
