import assert from 'node:assert/strict';
import {resultForMinigame,isFinishedResult} from '../src/game/minigameResult.js';

const running={id:'city-race',status:'running',reward:4};
const success={...running,status:'success'};
const failed={...running,status:'failed'};
const timeout={...running,status:'timeout'};

assert.equal(resultForMinigame(null).status,'idle');
assert.equal(resultForMinigame(running).status,'running');
assert.equal(resultForMinigame(success).reward,4);
assert.equal(resultForMinigame(success).emoji,'🏆');
assert.equal(resultForMinigame(failed).status,'failed');
assert.equal(resultForMinigame(timeout).status,'failed');
assert.equal(isFinishedResult(success),true);
assert.equal(isFinishedResult(failed),true);
assert.equal(isFinishedResult(timeout),true);
assert.equal(isFinishedResult(running),false);

console.log('minigame result tests: ok');
