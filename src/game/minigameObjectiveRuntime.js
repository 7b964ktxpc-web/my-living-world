import {collectObjectives,objectiveProgress,objectivesForWorld} from './minigameObjectives.js';

export function createObjectiveState(world){return {world,collected:[],progress:0,total:objectivesForWorld(world).length}}
export function collectAtPosition(state,position){
  if(!state)return state;
  const safePosition=position&&Number.isFinite(position.x)&&Number.isFinite(position.z)?position:{x:0,z:0};
  const hits=collectObjectives(state.world,safePosition,state.collected);
  if(!hits.length)return state;
  const collected=[...state.collected,...hits.map(item=>item.id)];
  return {...state,collected,progress:objectiveProgress(state.world,collected)};
}
export function isObjectiveRunComplete(state){return Boolean(state&&state.total>0&&state.collected.length>=state.total)}
