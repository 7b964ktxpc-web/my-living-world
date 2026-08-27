import assert from 'node:assert/strict';
import {guidanceForNpc} from '../src/game/npcGuidance.js';
import {nextGuidanceIndex,guidanceComplete,guidanceText} from '../src/game/npcGuidanceState.js';

const base={objectiveIndex:0,objectPosition:{x:0,z:0},npcPosition:{x:2,z:0}};
assert.equal(guidanceForNpc('cars',base).state,'pointing');
assert.equal(guidanceForNpc('cars',{...base,objectPosition:{x:2.1,z:0}}).state,'greeting');
assert.equal(guidanceForNpc('unknown',base),null);
assert.equal(nextGuidanceIndex(['a'],3),1);
assert.equal(guidanceComplete(['a','b','c'],3),true);
assert.match(guidanceText('dinos',1,3),/2 из 3/);

console.log('npc guidance tests: ok');
