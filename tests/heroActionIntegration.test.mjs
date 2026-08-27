import assert from 'node:assert/strict';
import {heroInteractionFor} from '../src/game/mainCharacterInteractions.js';
import {choreographyFor} from '../src/game/heroActionChoreography.js';

const cases=[['space','launch'],['cars','race'],['trains','train'],['dinos','search']];
for(const [world,expected] of cases){
  const interaction=heroInteractionFor(world,'slava','objective');
  const choreography=choreographyFor(interaction.action,'slava');
  assert.equal(interaction.action,expected);
  assert.equal(choreography.action,expected);
  assert.equal(choreography.primaryHero,'slava');
  assert.equal(choreography.secondaryHero,'denis');
}

const success=heroInteractionFor('dinos','denis','success');
const celebration=choreographyFor(success.action,'denis');
assert.equal(success.action,'celebrate');
assert.equal(celebration.primaryHero,'denis');
assert.equal(celebration.secondaryHero,'slava');

console.log('hero action integration contract ok');
