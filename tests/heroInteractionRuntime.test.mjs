import assert from 'node:assert/strict';
import {createHeroInteraction,advanceHeroInteraction,heroInteractionComplete} from '../src/game/heroInteractionRuntime.js';

for(const world of ['space','cars','trains','dinos']){
  const run=createHeroInteraction(world,'slava','objective',{x:1,z:2});
  assert.equal(run.phase,'approach');
  assert.equal(advanceHeroInteraction(run,.5).phase,'approach');
  assert.equal(advanceHeroInteraction(run,.8).phase,'interact');
  const done=advanceHeroInteraction(run,1);
  assert.equal(done.phase,'complete');
  assert.equal(heroInteractionComplete(done),true);
}
console.log('hero interaction runtime ok');
