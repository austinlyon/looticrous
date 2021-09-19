import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavItem from './components/navItem.js';
import Home from './components/home.js';
import Tanks from './components/tanks.js';
import RPongG from './components/r-pong-g.js';
import OldPongG from './components/old-pong-g.js';
import CollisionTest from './components/collisionTest.js';
import CanvasCraziness from './components/canvasCraziness.js';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('homeTab');

  function selectTab(e) {
    setSelectedTab(e.target.id);
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li id="ltc_logo">
              <Link to="/">
                <NavItem
                  text="LTC"
                  id = 'ltcTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <NavItem
                  text = "Home"
                  id = 'homeTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
            <li className = {selectedTab === 'tanks' ? 'selectedTab' : ''}>
              <Link to="/tanks">
                <NavItem
                  text='ADA Tanks'
                  id = 'tanksTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
            <li className = {selectedTab === 'rponggTab' ? 'selectedTab' : ''}>
              <Link to="/rpongg">
                <NavItem
                  text='RPonG'
                  id = 'rponggTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
            <li className = {selectedTab === 'oldponggTab' ? 'selectedTab' : ''}>
              <Link to="/oldpongg">
                <NavItem
                  text='OldPonG'
                  id = 'oldponggTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
            <li className = {selectedTab === 'collisionTab' ? 'selectedTab' : ''}>
              <Link to="/collision">
                <NavItem
                  text='Collision Test'
                  id = 'collisionTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
            <li className = {selectedTab === 'crazinessTab' ? 'selectedTab' : ''}>
              <Link to="/craziness">
                <NavItem
                  text = 'Canvas Craziness'
                  id = 'crazinessTab'
                  clickHandler = {selectTab} />
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/tanks">
            <Tanks />
          </Route>
          <Route path="/rpongg">
            <RPongG />
          </Route>
          <Route path="/oldpongg">
            <OldPongG />
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
