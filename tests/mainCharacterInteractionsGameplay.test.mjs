import assert from 'node:assert/strict';
import {heroInteractionFor} from '../src/game/mainCharacterInteractions.js';

const expectations={space:'launch',cars:'race',trains:'train',dinos:'search'};
for(const [world,action] of Object.entries(expectations)){
  const slava=heroInteractionFor(world,'slava','objective');
  const denis=heroInteractionFor(world,'denis','objective');
  assert.equal(slava.action,action);
  assert.equal(denis.action,action);
  assert.notEqual(slava.heroId,denis.heroId);
  assert.ok(slava.message&&denis.message);
}
assert.equal(heroInteractionFor('space','slava','success').action,'celebrate');
console.log('mainCharacterInteractionsGameplay ok');
