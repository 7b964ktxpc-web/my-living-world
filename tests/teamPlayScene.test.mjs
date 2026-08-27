import assert from 'node:assert/strict';
import {sceneTeamEvent} from '../src/game/teamPlayScene.js';

for (const world of ['space','cars','trains','dinos']) {
  for (const event of ['near','objective','success']) {
    const result=sceneTeamEvent(world,event);
    assert.ok(result);
    assert.equal(result.world,world);
    assert.ok(result.action);
    assert.ok(result.kind);
    assert.ok(result.emoji);
  }
}
assert.equal(sceneTeamEvent('unknown','success'),null);
assert.equal(sceneTeamEvent('space','unknown'),null);
console.log('team play scene tests: ok');
