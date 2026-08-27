import assert from 'node:assert/strict';
import {createHeroInteraction,advanceHeroInteraction,heroInteractionComplete} from '../src/game/heroInteractionRuntime.js';

const run=createHeroInteraction('cars','slava','objective',{x:2,z:0});
assert.equal(run.phase,'approach');
const interact=advanceHeroInteraction(run,.75);
assert.equal(interact.phase,'interact');
assert.equal(interact.progress,.75);
const done=advanceHeroInteraction(interact,1);
assert.equal(heroInteractionComplete(done),true);
assert.equal(done.phase,'complete');
assert.equal(advanceHeroInteraction(done,1).phase,'complete');
console.log('hero interaction phases ok');
