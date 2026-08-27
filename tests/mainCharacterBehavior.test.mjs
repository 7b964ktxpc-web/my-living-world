import assert from 'node:assert/strict';
import {heroPairBehavior,behaviorForHero} from '../src/game/mainCharacterBehavior.js';

const walking=behaviorForHero('slava','walking');
assert.equal(walking.heroId,'slava');
assert.ok(walking.bounce>0);

const excited=heroPairBehavior('denis','excited');
assert.equal(excited.active.heroId,'denis');
assert.equal(excited.companion.heroId,'slava');
assert.equal(excited.companion.state,'idle');

const celebrate=heroPairBehavior('denis','celebrate');
assert.equal(celebrate.active.state,'celebrate');
assert.equal(celebrate.companion.state,'celebrate');

console.log('main character behavior tests: ok');
