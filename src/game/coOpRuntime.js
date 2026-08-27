import {teamStateFor} from './teamPlayRuntime.js';
import {sceneTeamEvent} from './teamPlayScene.js';

export function createCoOpState(world){return {world,event:null,team:teamStateFor(world,'near'),scene:null,updatedAt:0}}
export function applyCoOpEvent(state,event,now=Date.now()){
 if(!state)return state;
 const team=teamStateFor(state.world,event,now);
 const scene=sceneTeamEvent(state.world,event);
 if(!team.action)return state;
 if(event==='success')return {...state,event,team,scene:{world:state.world,event,action:'celebrate',kind:'celebrate',emoji:'🎉',worldAction:scene?.action||null},updatedAt:now};
 return {...state,event,team,scene,updatedAt:now};
}
export function coOpEventForObjective(world){return {type:'objective',team:teamStateFor(world,'objective'),scene:sceneTeamEvent(world,'objective')};}
export function coOpEventForSuccess(world){const scene=sceneTeamEvent(world,'success');return {type:'success',team:teamStateFor(world,'success'),scene:{world,event:'success',action:'celebrate',kind:'celebrate',emoji:'🎉',worldAction:scene?.action||null}};}
