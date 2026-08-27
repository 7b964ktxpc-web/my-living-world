import assert from 'node:assert/strict';
import {rewardKey,hasRewarded,grantReward,pruneRewards} from '../src/game/minigameRewardLedger.js';

const run={id:'city-race',startedAt:123,reward:4,status:'success'};
const key=rewardKey(run);
assert.equal(typeof key,'string');
assert.equal(hasRewarded({},key),false);
const first=grantReward({},run);
assert.equal(first.granted,4);
assert.equal(hasRewarded(first.storage,key),true);
const second=grantReward(first.storage,run);
assert.equal(second.granted,0);
assert.equal(Object.keys(second.storage).length,1);

const failed=grantReward({}, {...run,status:'failed'});
assert.equal(failed.granted,0);

const many={};
for(let i=0;i<105;i++)many[`k${i}`]=true;
const pruned=pruneRewards(many,100);
assert.equal(Object.keys(pruned).length,100);
assert.equal(pruned.k0,undefined);
assert.equal(pruned.k104,true);

console.log('minigame reward tests: ok');
