import assert from 'node:assert/strict';
import {navigationTarget,navigationState,companionTarget} from '../src/game/mainCharacterNavigation.js';

assert.deepEqual(navigationTarget('slava',{x:2,z:-1}),{x:2,z:-1,heroId:'slava'});
assert.equal(navigationState('slava',{x:1,z:0},{x:0,z:0}).state,'walking');
assert.equal(navigationState('slava',{x:.05,z:.05},{x:0,z:0}).state,'arrived');
assert.deepEqual(navigationTarget('unknown',null),{x:-.72,z:0,heroId:'slava'});
assert.deepEqual(companionTarget('slava',{x:2,z:1}),{x:2.55,z:1,heroId:'denis'});
assert.deepEqual(companionTarget('denis',{x:2,z:1}),{x:1.45,z:1,heroId:'slava'});

console.log('mainCharacterNavigation smoke tests passed');
