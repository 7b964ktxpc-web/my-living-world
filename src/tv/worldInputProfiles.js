import {inputForWorld,clamp} from './worldController';

export const WORLD_INPUT_PROFILES={
 space:{left:'←',right:'→',up:'Тяга',down:'Тормоз',primary:'🚀 Запуск',secondary:'↗ Корректировка'},
 cars:{left:'Руль ←',right:'Руль →',up:'Газ',down:'Тормоз',primary:'🏁 Турбо',secondary:'↪ Ручник'},
 trains:{left:'Влево',right:'Вправо',up:'Ускорить',down:'Замедлить',primary:'🚂 Отправить',secondary:'⏸ Стоп'},
 dinos:{left:'← Шаг',right:'Шаг →',up:'Вперёд',down:'Назад',primary:'🦖 Рык',secondary:'👋 Поздороваться'}
};

export function profileForWorld(world){return WORLD_INPUT_PROFILES[world]||WORLD_INPUT_PROFILES.space}
export function labelForInput(world){return inputForWorld(world).title}
export function normalizeWorldInput(world,payload={}){
 const p=payload||{};
 const spec=inputForWorld(world);
 if(spec.input==='steer') return {mode:'drive',steer:clamp(Number(p.steer??p.x??0),-1,1),throttle:clamp(Number(p.throttle??p.z??0),-1,1)};
 if(spec.input==='rail') return {mode:'rail',throttle:clamp(Number(p.throttle??p.z??0),-1,1)};
 if(spec.input==='thrust') return {mode:'flight',thrust:clamp(Number(p.thrust??p.z??0),-1,1),x:clamp(Number(p.x??0),-1,1),z:clamp(Number(p.z??0),-1,1)};
 return {mode:'walk',x:clamp(Number(p.x??0),-1,1),z:clamp(Number(p.z??0),-1,1)};
}
