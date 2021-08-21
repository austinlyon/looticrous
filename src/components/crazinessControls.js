import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './../theme.js';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';

export default function CrazinessControls(props) {
  const { options, setOptions } = props;

  // State
  const [hueDisabled, setHueDisabled] = useState(false);
  const [cycleRateDisabled, setCycleRateDisabled] = useState(true);

  // Input Handlers
  function handleCanvasClearOpts(e) {
    setOptions({ clear: e.currentTarget.value });
  }

  function handleEffectStyleOpts(e) {
    setOptions({ effect: e.currentTarget.value });
  }

  function handleParticleBurstRate(e, value) {
    if (value === 65) value = 'unlimited';
    setOptions({ burstRate: value });
  }

  function handleParticleNumberSlider(e, value) {
    setOptions({ number: value });
  }

  function handleParticleSizeSlider(e, value) {
    setOptions({ sizeMin: value[0], sizeMax: value[1] });
  }

  function handleParticleSpeedSlider(e, value) {
    setOptions({ speed: value });
  }

  function handleParticleShrinkRateSlider(e, value) {
    setOptions({shrinkRate: value});
  }

  function handleParticleHueSlider(e, value) {
    setOptions({hue: value});
  }

  function handleParticleLightnessSlider(e, value) {
    setOptions({lightness: value});
  }

  function handleParticleCycleHueSwitch(e, value) {
    setOptions({ cycleHue: value });
    setHueDisabled(value);
    setCycleRateDisabled(!value);
  }

  function handleParticleCycleRateSlider(e, value) {
    setOptions({ cycleRate: value });
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
          <div className="effectBlock">
            <div>
              <div>Burst Rate (WIP): {options.burstRate + ' bursts/sec'}</div>
              <Slider
                value = {options.burstRate === 'unlimited' ? 65 : options.burstRate}
                min = {5}
                max = {65}
                step = {5}
                marks
                disabled
                valueLabelDisplay = "auto"
                onChange = {handleParticleBurstRate}
              />
            </div>
            <div>
              <div>Number: {options.number}</div>
              <Slider
                value = {options.number}
                min = {1}
                max = {10}
                step = {1}
                marks
                valueLabelDisplay = "auto"
                onChange = {handleParticleNumberSlider}
              />
            </div>
            <div>
              <div>Size: {options.sizeMin + ' - ' + options.sizeMax}</div>
              <Slider
                value = {[options.sizeMin, options.sizeMax]}
                min = {1}
                max = {30}
                step = {1}
                marks
                valueLabelDisplay = "auto"
                onChange = {handleParticleSizeSlider}
              />
            </div>
            <div>
              <div>Speed: {options.speed}</div>
              <Slider
                defaultValue = {options.speed}
                min = {0}
                max = {500}
                step = {25}
                marks
                valueLabelDisplay = "auto"
                onChange = {handleParticleSpeedSlider}
              />
            </div>
          </div>
          <div className="effectBlock">
            <div>
              <div>Shrink Rate: {options.shrinkRate + ' px/sec'}</div>
              <Slider
                value = {options.shrinkRate}
                min = {0}
                max = {60}
                step = {2}
                marks
                valueLabelDisplay = "auto"
                onChange = {handleParticleShrinkRateSlider}
              />
            </div>
            <div>
              <div>Color: {hueDisabled ? 'Cycling' : options.hue}</div>
              <Slider
                value = {options.hue}
                min = {0}
                max = {360}
                step = {1}
                disabled = {hueDisabled}
                valueLabelDisplay = "auto"
                onChange = {handleParticleHueSlider}
              />
            </div>
            <div>
              <div>Lightness: {options.lightness}</div>
              <Slider
                value = {options.lightness}
                min = {0}
                max = {100}
                step = {1}
                marks = {[{value: 50}]}
                valueLabelDisplay = "auto"
                onChange = {handleParticleLightnessSlider}
              />
            </div>
            <div id="cycleColors">
              <div id="cycleColorsLabel">
                Cycle Colors:
              </div>
              <Switch
                checked = {options.cycleHue}
                onChange = {handleParticleCycleHueSwitch}
                name = "cycleHue"
                color = "primary"
                size = "small"
              />
              <div id="cycleRateLabel">
                Color Cycle Rate: {cycleRateDisabled ? 'Not Cycling' : options.cycleRate}
              </div>
            </div>
            <div>
              <Slider
                value = {options.cycleRate}
                min = {1}
                max = {10}
                step = {1}
                marks
                disabled = {cycleRateDisabled}
                valueLabelDisplay = "auto"
                onChange = {handleParticleCycleRateSlider}
              />
            </div>
          </div>
        </div>

      </ThemeProvider>
    </div>
  );

}
