import assert from 'node:assert/strict';
import {createCoOpState,applyCoOpEvent,coOpEventForObjective,coOpEventForSuccess} from '../src/game/coOpRuntime.js';

for(const world of ['space','cars','trains','dinos']){
  const initial=createCoOpState(world);
  assert.equal(initial.world,world);
  const near=applyCoOpEvent(initial,'near',100);
  assert.ok(near.team.action);
  const objective=coOpEventForObjective(world);
  assert.equal(objective.team.event,'objective');
  assert.ok(objective.scene?.kind);
  const success=coOpEventForSuccess(world);
  assert.equal(success.team.event,'success');
  assert.equal(success.scene?.kind,'celebrate');
}
console.log('co-op runtime tests: ok');
