export function resultForMinigame(run){
  if(!run)return {status:'idle',title:'Готовы к приключению!',emoji:'🎮',reward:0};
  if(run.status==='success')return {status:'success',title:'Приключение завершено!',emoji:'🏆',reward:Number(run.reward||0),message:'Все цели собраны. Отличная работа!'};
  if(run.status==='failed'||run.status==='timeout')return {status:'failed',title:'Попробуем ещё раз?',emoji:'💪',reward:0,message:'Ничего страшного — можно начать заново.'};
  return {status:'running',title:'Приключение продолжается!',emoji:'✨',reward:Number(run.reward||0),message:'Собери все цели.'};
}

export function isFinishedResult(run){return run?.status==='success'||run?.status==='failed'||run?.status==='timeout'}
