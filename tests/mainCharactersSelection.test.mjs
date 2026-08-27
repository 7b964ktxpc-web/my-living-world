import assert from 'node:assert/strict';
import {DEFAULT_ACTIVE_HERO,isMainCharacter,normalizeActiveHero,characterPair} from '../src/game/mainCharacters.js';

assert.equal(DEFAULT_ACTIVE_HERO,'slava');
assert.equal(normalizeActiveHero('slava'),'slava');
assert.equal(normalizeActiveHero('denis'),'denis');
assert.equal(normalizeActiveHero('unknown'),'slava');
assert.equal(isMainCharacter('slava'),true);
assert.equal(isMainCharacter('denis'),true);
assert.equal(isMainCharacter('unknown'),false);
assert.equal(characterPair().leader.id,'slava');
assert.equal(characterPair().partner.id,'denis');
console.log('main character selection tests: ok');
