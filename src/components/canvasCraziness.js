import CrazinessCanvas from './crazinessCanvas.js';

export default function CanvasCraziness() {
  return (
    <div className='content'>
      <header className="App-header">
        <h1>CaNvAs CrAzInEsS!</h1>
      </header>

      <div className="gameContainer">
        <CrazinessCanvas />
      </div>
    </div>
  );
}
