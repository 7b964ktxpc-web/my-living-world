import assert from 'node:assert/strict';
import {behaviorForWorld,nextNpcBehavior,followTargetStep} from '../src/game/npcBehavior.js';
import {createNpcState,npcReaction} from '../src/game/npcRuntime.js';

for (const world of ['space','cars','trains','dinos']) {
  const cfg=behaviorForWorld(world);
  assert.ok(cfg.followDistance>0);
  const npc=createNpcState(world)[0];
  assert.ok(npc.id);
  assert.equal(nextNpcBehavior(npc,{event:'success'}).state,'celebrate');
  assert.equal(nextNpcBehavior(npc,{event:'objective'}).state,'pointing');
  assert.equal(npcReaction(npc,'near').state,'greeting');
  const moved=followTargetStep({...npc,state:'following'},{id:'player',x:npc.x+3,z:npc.z+1},1);
  assert.notEqual(moved.x,npc.x);
}
console.log('npc behavior tests: ok');
