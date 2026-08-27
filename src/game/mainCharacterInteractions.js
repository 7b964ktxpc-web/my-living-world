import {normalizeActiveHero} from './mainCharacters';

const INTERACTIONS={
  space:{hero:'Слава готовит запуск вместе с Денисом 🚀',action:'launch'},
  cars:{hero:'Слава проверяет машинку, Денис готовит финиш 🏁',action:'race'},
  trains:{hero:'Слава подаёт сигнал, Денис проверяет груз 🚂',action:'train'},
  dinos:{hero:'Денис ищет следы, Слава помогает рядом 🦖',action:'search'}
};

export function heroInteractionFor(world,heroId,event='near'){
  const hero=normalizeActiveHero(heroId);
  const item=INTERACTIONS[world]||INTERACTIONS.space;
  if(event==='success')return {world,heroId:hero,action:'celebrate',message:`${hero==='slava'?'Слава':'Денис'} и напарник справились! 🎉`};
  if(event==='objective')return {world,heroId:hero,action:item.action,message:item.hero};
  return {world,heroId:hero,action:'observe',message:`${hero==='slava'?'Слава':'Денис'} смотрит на следующую цель`};
}
