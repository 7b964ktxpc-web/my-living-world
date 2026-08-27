import {levelForStars,nextLevel} from './rewardEngine';
import {nextUnlock} from './unlocks';
export function progressionView(world,stars=0){const level=levelForStars(stars);const next=nextLevel(stars);const unlock=nextUnlock(world,stars);return {level,nextLevel:next,nextUnlock:unlock,progressToNext:next?Math.min(1,stars/next.stars):1}}
