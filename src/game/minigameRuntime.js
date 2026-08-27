import {minigameForWorld,startMinigame,minigameProgress,finishMinigame} from './minigameEngine';
import {createObjectiveState,collectAtPosition,isObjectiveRunComplete} from './minigameObjectiveRuntime';

export function createMinigameRuntime(world,object){
 const game=minigameForWorld(world); const run=startMinigame(game,object); if(!run)return null;
 return {...run,progress:0,objectives:createObjectiveState(world)};
}
export function updateMinigameRuntime(run,now=Date.now()){
 if(!run||run.status!=='running')return run;
 const progress=minigameProgress(run,now);
 return progress>=1?{...finishMinigame(run,'timeout'),progress:1}:{...run,progress};
}
export function collectMinigameObjective(run,position){
 if(!run||run.status!=='running')return run;
 const objectives=collectAtPosition(run.objectives,position);
 return {...run,objectives,progress:Math.max(run.progress||0,objectives.progress||0)};
}
export function isMinigameTarget(run,point){return Boolean(run&&run.status==='running'&&point?.id===run.targetPoint)}
export function isMinigameComplete(run){return Boolean(run&&run.status==='running'&&isObjectiveRunComplete(run.objectives))}
export function completeMinigameRuntime(run){return run?{...finishMinigame(run,'success'),progress:1}:run}
export function resolveMinigameRun(run,now=Date.now()){
 const next=updateMinigameRuntime(run,now);
 if(!next||next.status!=='running')return next;
 return isMinigameComplete(next)?completeMinigameRuntime(next):next;
}
