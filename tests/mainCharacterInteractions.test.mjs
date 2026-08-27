import assert from 'node:assert/strict';
import {heroInteractionFor} from '../src/game/mainCharacterInteractions.js';

for (const world of ['space','cars','trains','dinos']) {
  const next=heroInteractionFor(world,'slava','objective');
  assert.equal(next.world,world);
  assert.equal(next.heroId,'slava');
  assert.ok(next.message);
}
assert.equal(heroInteractionFor('dinos','denis','success').action,'celebrate');
assert.equal(heroInteractionFor('cars','denis','near').action,'observe');
console.log('mainCharacterInteractions ok');
