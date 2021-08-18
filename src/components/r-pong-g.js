import GameCanvas from './gameCanvas.js';

export default function RPongG() {
  return (
    <div className='content'>
      <header className="App-header">
        <h1>R-Pong-G</h1>
      </header>

      <div className="gameContainer">
        <GameCanvas />
      </div>
    </div>
  );
}
