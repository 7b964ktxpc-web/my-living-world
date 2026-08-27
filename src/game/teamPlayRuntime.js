import {teamActionFor,teamPromptFor} from './teamPlay.js';

export function createTeamState(world){return {world,event:null,action:null,prompt:null,updatedAt:0}}
export function updateTeamState(state,event,now=Date.now()){
 if(!state)return state;
 const action=teamActionFor(state.world,event);
 if(!action)return state;
 return {...state,event,action,prompt:teamPromptFor(state.world,event),updatedAt:now};
}
export function teamStateFor(world,event,now=Date.now()){return updateTeamState(createTeamState(world),event,now)}
