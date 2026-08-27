import {loadProgress,saveProgress,completeMissionOnce} from './progression';
import {progressionView} from './progressionView';

export function missionProgress(world){
 const progress=loadProgress();
 return progressionView(world,progress.stars);
}

export function completeMissionAndReward(mission){
 const progress=loadProgress();
 const next=completeMissionOnce(progress,mission?.id,mission?.reward||0);
 return next;
}

export function resetProgress(){
 const empty={stars:0,completed:{}};
 return saveProgress(empty);
}
