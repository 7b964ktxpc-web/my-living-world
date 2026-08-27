import {teamStateFor} from './teamPlayRuntime.js';
import {sceneTeamEvent} from './teamPlayScene.js';

export function createCoOpState(world){return {world,event:null,team:teamStateFor(world,'near'),scene:null,updatedAt:0}}
export function applyCoOpEvent(state,event,now=Date.now()){
 if(!state)return state;
 const team=teamStateFor(state.world,event,now);
 const scene=sceneTeamEvent(state.world,event);
 return team.action?{...state,event,team,scene,updatedAt:now}:state;
}
export function coOpEventForObjective(world){return {type:'objective',team:teamStateFor(world,'objective'),scene:sceneTeamEvent(world,'objective')};}
export function coOpEventForSuccess(world){return {type:'success',team:teamStateFor(world,'success'),scene:sceneTeamEvent(world,'success')};}
