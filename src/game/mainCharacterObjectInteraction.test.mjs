import assert from 'node:assert/strict';
import {heroObjectInteraction,interactionState,interactionNextPhase} from './mainCharacterObjectInteraction.js';

for (const world of ['space','cars','trains','dinos']) {
  assert.ok(heroObjectInteraction(world,'car'));
  const item=world==='space'?heroObjectInteraction(world,'rocket'):world==='cars'?heroObjectInteraction(world,'car'):world==='trains'?heroObjectInteraction(world,'steam'):heroObjectInteraction(world,'trex');
  assert.ok(item.hero&&item.companion);
  const ready=interactionState(world,world==='space'?'rocket':world==='cars'?'car':world==='trains'?'steam':'trex');
  assert.equal(ready.phase,'ready');
  assert.equal(interactionNextPhase(ready).phase,'approach');
}
console.log('main hero object interaction smoke: ok');
