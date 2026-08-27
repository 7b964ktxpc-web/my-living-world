import assert from 'node:assert/strict';
import {createCoOpState,applyCoOpEvent} from '../src/game/coOpRuntime.js';

for(const world of ['space','cars','trains','dinos']){
  const state=createCoOpState(world);
  const objective=applyCoOpEvent(state,'objective',100);
  assert.equal(objective.team.event,'objective');
  assert.ok(objective.scene?.kind);
  const success=applyCoOpEvent(objective,'success',200);
  assert.equal(success.team.event,'success');
  assert.equal(success.scene?.kind,'celebrate');
}
console.log('co-op gameplay tests: ok');
