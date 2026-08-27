import {objectiveProgress,objectivesForWorld} from './minigameObjectives';

export function minigameProgressView(run){
 const total=run?.objectives?.total??objectivesForWorld(run?.world).length;
 const collected=run?.objectives?.collected?.length??0;
 const progress=total?Math.min(1,collected/total):0;
 return {collected,total,progress,label:`${collected}/${total}`,percent:Math.round(progress*100)};
}

export function minigameCompletionMessage(run){
 const view=minigameProgressView(run);
 if(run?.status==='success')return `🏆 Отлично! ${view.label} целей собрано`;
 if(run?.status==='failed'||run?.status==='timeout')return `⏱️ Попробуем ещё раз: ${view.label}`;
 return `${view.label} · осталось ${Math.max(0,view.total-view.collected)}`;
}
