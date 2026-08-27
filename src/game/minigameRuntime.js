import {minigameForWorld,startMinigame,minigameProgress,finishMinigame} from './minigameEngine';

export function createMinigameRuntime(world,object){
 const game=minigameForWorld(world); const run=startMinigame(game,object); return run?{...run,progress:0}:null;
}
export function updateMinigameRuntime(run,now=Date.now()){
 if(!run||run.status!=='running')return run;
 const progress=minigameProgress(run,now);
 return progress>=1?{...finishMinigame(run,'timeout'),progress:1}:{...run,progress};
}
export function isMinigameTarget(run,point){return Boolean(run&&run.status==='running'&&point?.id===run.targetPoint)}
export function completeMinigameRuntime(run){return run?{...finishMinigame(run,'success'),progress:1}:run}
