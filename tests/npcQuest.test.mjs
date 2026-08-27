import assert from 'node:assert/strict';
import {npcQuestForWorld,npcQuestMessage} from '../src/game/npcQuest.js';

for (const world of ['space','cars','trains','dinos']) {
  const quest=npcQuestForWorld(world);
  assert.equal(quest.world, undefined);
  assert.ok(quest.id);
  assert.ok(quest.npc?.label);
  assert.match(npcQuestMessage(world,'progress'),/./);
  assert.match(npcQuestMessage(world,'success'),/./);
}

assert.equal(npcQuestForWorld('unknown'),null);
console.log('npc quest tests: ok');
