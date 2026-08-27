import assert from 'node:assert/strict';
import {minigameForWorld,startMinigame,minigameProgress} from '../src/game/minigameEngine.js';
import {presentationForWorld} from '../src/game/minigamePresentation.js';
import {inputForWorld,normalizeInput} from '../src/tv/worldController.js';
import {detectObjectContacts} from '../src/scene/collisionEngine.js';

for(const world of ['space','cars','trains','dinos']){
 const game=minigameForWorld(world);assert.ok(game,`missing minigame: ${world}`);
 const object={id:`${world}-1`,world,type:game.objectType,label:'test'};
 const run=startMinigame(game,object);assert.equal(run.status,'running');assert.equal(minigameProgress(run,run.startedAt),0);
 const presentation=presentationForWorld(world);assert.ok(presentation.objective);
 const controller=inputForWorld(world);assert.ok(controller.input);
 const normalized=normalizeInput(world,{x:2,z:-2,throttle:2,steer:-2});assert.ok(Math.abs(normalized.x)<=1&&Math.abs(normalized.z)<=1);
}
const objects=[{id:'a',type:'car',label:'A'},{id:'b',type:'dino',label:'B'}];
const contacts=detectObjectContacts(objects,{a:{x:0,z:0},b:{x:.5,z:0}});
assert.equal(contacts.length,1);
console.log('gameLogic smoke tests: ok');
