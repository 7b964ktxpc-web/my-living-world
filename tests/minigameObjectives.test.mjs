import assert from 'node:assert/strict';
import {objectivesForWorld,objectiveProgress} from '../src/game/minigameObjectives.js';
import {createObjectiveState,collectAtPosition,isObjectiveRunComplete} from '../src/game/minigameObjectiveRuntime.js';
for(const world of ['space','cars','trains','dinos']){const items=objectivesForWorld(world);assert.equal(items.length,3);let state=createObjectiveState(world);assert.equal(state.progress,0);state=collectAtPosition(state,{x:items[0].x,z:items[0].z});assert.equal(state.collected.length,1);assert.equal(state.progress,objectiveProgress(world,state.collected));assert.equal(isObjectiveRunComplete(state),false)}
let state=createObjectiveState('space');for(const item of objectivesForWorld('space'))state=collectAtPosition(state,{x:item.x,z:item.z});assert.equal(isObjectiveRunComplete(state),true);assert.equal(state.progress,1);
console.log('minigame objective tests: ok');
