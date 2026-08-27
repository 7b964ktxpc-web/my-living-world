import {npcForWorld} from './npcEngine';

export const NPC_QUESTS={
 space:{id:'npc-space-guide',objective:'Подлети к маяку',hint:'Робот-пилот покажет дорогу к звёздам маяка.'},
 cars:{id:'npc-cars-guide',objective:'Проедь через все чекпоинты',hint:'Механик ждёт тебя у трассы.'},
 trains:{id:'npc-trains-guide',objective:'Доставь груз на станцию',hint:'Машинист поможет найти нужный путь.'},
 dinos:{id:'npc-dinos-guide',objective:'Собери яйца у гнезда',hint:'Смотритель знает, где спрятались яйца.'}
};
export function npcQuestForWorld(world){const npc=npcForWorld(world);const quest=NPC_QUESTS[world]||null;return quest?{...quest,npc}:null}
export function npcQuestMessage(world,event='idle'){const quest=npcQuestForWorld(world);if(!quest)return '';if(event==='progress')return `${quest.npc.emoji} ${quest.npc.label}: Отлично! ${quest.objective}.`;if(event==='success')return `${quest.npc.emoji} ${quest.npc.label}: Молодец! Задание выполнено!`;return `${quest.npc.emoji} ${quest.npc.label}: ${quest.hint}`}
