import assert from 'node:assert/strict';
import {mainCharacter,mainCharacters,characterPair} from '../src/game/mainCharacters.js';

const slava=mainCharacter('slava');
const denis=mainCharacter('denis');
assert.equal(slava.name,'Слава');
assert.equal(denis.name,'Денис');
assert.ok(slava.heightScale>denis.heightScale);
assert.equal(slava.outfit.top,'light-hoodie');
assert.equal(slava.outfit.bottom,'light-pants');
assert.equal(denis.outfit.top,'light-hoodie');
assert.equal(denis.outfit.bottom,'light-pants');
assert.equal(characterPair().leader.id,'slava');
assert.equal(characterPair().partner.id,'denis');
assert.equal(mainCharacters().length,2);
console.log('main character tests: ok');
