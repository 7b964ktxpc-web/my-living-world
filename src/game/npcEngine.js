export const NPC_TYPES={space:{id:'bot-pilot',emoji:'🤖',label:'Робот-пилот'},cars:{id:'mechanic',emoji:'🧑‍🔧',label:'Механик'},trains:{id:'conductor',emoji:'🧑‍✈️',label:'Машинист'},dinos:{id:'ranger',emoji:'🧑‍🌾',label:'Смотритель'}};
export function npcForWorld(world){return NPC_TYPES[world]||NPC_TYPES.space}
export function npcMessage(world,event='idle'){const npc=npcForWorld(world);if(event==='success')return `${npc.emoji} ${npc.label}: Отлично! Продолжаем приключение!`;if(event==='contact')return `${npc.emoji} ${npc.label}: Осторожно!`;return `${npc.emoji} ${npc.label}: Куда отправимся?`}
