export const WORLD_CONTROLLERS={
  space:{title:'Управление ракетой',hint:'Тяга и направление',input:'thrust',primary:'Запуск'},
  cars:{title:'Управление машиной',hint:'Руль и газ',input:'steer',primary:'Газ'},
  trains:{title:'Управление поездом',hint:'Путь и скорость',input:'rail',primary:'В путь'},
  dinos:{title:'Управление динозавром',hint:'Шаг и направление',input:'walk',primary:'Идти'}
};
export const inputForWorld=world=>WORLD_CONTROLLERS[world]||WORLD_CONTROLLERS.space;
export const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
export function normalizeInput(world,{x=0,z=0,throttle=0,steer=0}={}){
  const spec=inputForWorld(world);
  if(spec.input==='steer')return {x:clamp(Number(steer||x),-1,1),z:clamp(Number(throttle||z),-1,1),mode:'drive'};
  if(spec.input==='thrust')return {x:clamp(Number(x),-1,1),z:clamp(Number(z),-1,1),mode:'flight'};
  if(spec.input==='rail')return {x:0,z:clamp(Number(throttle||z),-1,1),mode:'rail'};
  return {x:clamp(Number(x),-1,1),z:clamp(Number(z),-1,1),mode:'walk'};
}
