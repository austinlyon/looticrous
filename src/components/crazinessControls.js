import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './../theme.js';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

export default function CrazinessControls(props) {
  const { options, setOptions } = props;

  function handleCanvasClearOpts(e) {
    setOptions('clear', e.currentTarget.value);
  }

  function handleEffectStyleOpts(e) {
    setOptions('effect', e.currentTarget.value);
  }

  function handleParticleNumberSlider(e, value) {
    setOptions('number', value);
  }

  return (
    <div className="controls">
      <ThemeProvider theme={darkTheme}>

        <div id="canvasClearOpts">
          <ButtonGroup color="primary" orientation="vertical">
            <Button
              value = "clearCanvas"
              onClick = {handleCanvasClearOpts}
              variant = {options.clear === "clearCanvas" ? "contained" : "outlined"}
            >Clear Canvas</Button>
            <Button
              value = "leaveTrails"
              onClick = {handleCanvasClearOpts}
              variant = {options.clear === "leaveTrails" ? "contained" : "outlined"}
            >Leave Trails</Button>
            <Button
              value = "paint"
              onClick = {handleCanvasClearOpts}
              variant = {options.clear === "paint" ? "contained" : "outlined"}
            >Paint</Button>
          </ButtonGroup>
        </div>

        <div id="effectStyle">
          <ButtonGroup color="secondary" orientation="vertical">
            <Button
              value = "particleTrail"
              onClick = {handleEffectStyleOpts}
              variant = {options.effect === "particleTrail" ? "contained" : "outlined"}
            >Particle Trail</Button>
            <Button
              value = "fireworks"
              disabled
              variant = "outlined"
            >Fierworks (Coming Soon!)</Button>
          </ButtonGroup>
        </div>

        <div id="effectOpts">
          <ul>
            <li>Rate:</li>
            <li>Number: {options.number}
              <Slider
                defaultValue = {4}
                min = {1}
                max = {10}
                step = {1}
                marks
                onChangeCommitted = {handleParticleNumberSlider}
              />
            </li>
            <li>Size:</li>
            <li>Speed:</li>
            <li>Shrink:</li>
          </ul>
        </div>

      </ThemeProvider>
    </div>
  );

}
