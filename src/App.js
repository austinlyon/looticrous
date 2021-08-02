import GameCanvas from './components/gameCanvas.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>R-Pong-G</h1>
      </header>
      <div className="gameContainer">
        <GameCanvas />
      </div>
    </div>
  );
}

export default App;
