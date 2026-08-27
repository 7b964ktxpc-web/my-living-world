import assert from 'node:assert/strict';
import {createNpcState} from '../src/game/npcRuntime.js';
import {npcFollowTarget,npcReturnHome} from '../src/game/npcFollow.js';

for(const world of ['space','cars','trains','dinos']){
 const npc=createNpcState(world)[0];
 const followed=npcFollowTarget(npc,{x:2,z:1},world);
 assert.equal(followed.state,'following');
 assert.notEqual(followed.x,npc.x);
 const home=npcReturnHome({...followed,x:7,z:7},world);
 assert.equal(home.state,'returning');
}
console.log('npc follow tests: ok');
