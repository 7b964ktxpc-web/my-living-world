const KEY='mlw-progression';
const DEFAULT={stars:0,completed:{}};
export function loadProgress(){try{return {...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...DEFAULT}}}
export function saveProgress(progress){localStorage.setItem(KEY,JSON.stringify(progress));return progress}
export function addStars(progress,count){return saveProgress({...progress,stars:Math.max(0,(progress.stars||0)+count)})}
export function completeMissionOnce(progress,missionId,reward=0){if(!missionId||progress.completed?.[missionId])return progress;return saveProgress({stars:(progress.stars||0)+reward,completed:{...(progress.completed||{}),[missionId]:true}})}
