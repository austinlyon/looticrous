import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavItem from './components/navItem.js';
import Home from './components/home.js';
import RPongG from './components/r-pong-g.js';
import CollisionTest from './components/collisionTest.js';
import CanvasCraziness from './components/canvasCraziness.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li id="ltc_logo">
              <Link to="/">
                <NavItem text="LTC" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <NavItem text="Home" />
              </Link>
            </li>
            <li>
              <Link to="/rpongg">
                <NavItem text='R-Pong-G' />
              </Link>
            </li>
            <li>
              <Link to="/collision">
                <NavItem text='Collision Test' />
              </Link>
            </li>
            <li>
              <Link to="/craziness">
                <NavItem text='Canvas Craziness' />
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/rpongg">
            <RPongG />
          </Route>
          <Route path="/collision">
            <CollisionTest />
          </Route>
          <Route path="/craziness">
            <CanvasCraziness />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
