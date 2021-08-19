import { useState } from 'react';
import CrazinessCanvas from './crazinessCanvas.js';
import CrazinessControls from './crazinessControls.js';

export default function CanvasCraziness() {
  const [options, setOptions] = useState({
    clear: 'clearCanvas',
    effect: 'particleTrail',
    number: 4,
    sizeMin: 1,
    sizeMax: 16,
    speed: 100,
    color: 0,
  });

  function handleOptionsUpdate(option, value) {
    const mergeObject = {};
    mergeObject[option] = value;
    setOptions({...options, ...mergeObject})
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
