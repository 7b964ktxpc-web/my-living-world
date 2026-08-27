import assert from 'node:assert/strict';
import {choreographyFor,choreographyProgress,choreographyPhase} from '../src/game/heroActionChoreography.js';

const cases=[
 ['launch','press','assist'],
 ['race','drive','signal'],
 ['train','signal','load'],
 ['search','inspect','discover']
];
for(const [action,primary,secondary] of cases){
 const c=choreographyFor(action,'slava');
 assert.equal(c.primary,primary);
 assert.equal(c.secondary,secondary);
 assert.equal(c.primaryHero,'slava');
 assert.equal(c.secondaryHero,'denis');
 assert.ok(c.duration>0);
}
const denis=choreographyFor('search','denis');
assert.equal(denis.primaryHero,'denis');
assert.equal(denis.secondaryHero,'slava');
assert.equal(choreographyProgress(-10,100),0);
assert.equal(choreographyProgress(50,100),.5);
assert.equal(choreographyProgress(200,100),1);
assert.equal(choreographyPhase(0),'approach');
assert.equal(choreographyPhase(.5),'action');
assert.equal(choreographyPhase(1),'complete');
assert.equal(choreographyFor('unknown','slava').action,'observe');
console.log('hero action choreography ok');
