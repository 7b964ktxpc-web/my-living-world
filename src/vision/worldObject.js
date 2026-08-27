export const WORLD_OBJECTS={
 space:{id:'rocket',label:'Ракета',emoji:'🚀',color:'#ff6b5f'},
 cars:{id:'car',label:'Машинка',emoji:'🚗',color:'#ff9f43'},
 trains:{id:'train',label:'Поезд',emoji:'🚂',color:'#8b5cf6'},
 dinos:{id:'trex',label:'Ти-рекс',emoji:'🦖',color:'#6fcf97'}
};

export function createLivingObject({world,scan}){
 const preset=WORLD_OBJECTS[world]||WORLD_OBJECTS.space;
 return {
  id:`${preset.id}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
  type:preset.id,world,label:`Мой ${preset.label}`,emoji:preset.emoji,
  textureDataUrl:scan?.texture?.textureDataUrl||scan?.drawingDataUrl||scan?.dataUrl||null,
  drawingDataUrl:scan?.drawingDataUrl||null,
  scanConfidence:scan?.confidence??0,
  colorRatio:scan?.texture?.colorRatio??0,
  createdAt:new Date().toISOString(),
  state:'alive'
 };
}
