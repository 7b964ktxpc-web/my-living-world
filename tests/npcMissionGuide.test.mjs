import assert from 'node:assert/strict';
import {guideState,nextObjective,followTargetFor} from '../src/game/npcMissionGuide.js';

const first=nextObjective('dinos',[]);
assert.ok(first);
assert.equal(first.id,'egg-1');

const guide=guideState('dinos',[]);
assert.equal(guide.state,'pointing');
assert.equal(guide.objective.id,'egg-1');
assert.match(guide.message,/Яйцо/i);

const target=followTargetFor('dinos',{x:1,z:2},[]);
assert.deepEqual(target,{x:1,z:2});

const done=guideState('dinos',['egg-1','egg-2','egg-3']);
assert.equal(done.state,'celebrate');
assert.equal(done.objective,null);

console.log('npc mission guide tests: ok');
