import assert from 'node:assert/strict';
import {teamActionFor,teamPromptFor} from '../src/game/teamPlay.js';
import {teamStateFor} from '../src/game/teamPlayRuntime.js';

for (const world of ['space','cars','trains','dinos']) {
  for (const event of ['near','objective','success']) {
    assert.ok(teamActionFor(world,event));
    assert.match(teamPromptFor(world,event),/./);
    const state=teamStateFor(world,event,123);
    assert.equal(state.world,world);
    assert.equal(state.action,teamActionFor(world,event));
    assert.equal(state.updatedAt,123);
  }
}
assert.equal(teamActionFor('unknown','success'),teamActionFor('space','success'));
console.log('team play tests: ok');
