import assert from 'node:assert/strict';
import {environmentForAction,environmentState} from '../src/game/worldEnvironment.js';

for (const [world,action] of [['space','prepare-launch'],['cars','open-garage'],['trains','open-next-station'],['dinos','mark-next-egg']]) {
  const item=environmentForAction(world,action);
  assert.ok(item?.id);
  assert.ok(item?.label);
  assert.equal(environmentState(world,action,true).active,true);
}
assert.equal(environmentForAction('space','unknown'),null);
console.log('world environment tests: ok');
