const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

// Marker layouts identify the printed template before we attach a 3D model.
// This is deliberately deterministic and offline-first; an ML classifier can
// replace it later without changing the scanner contract.
const TEMPLATES={
  rocket:{id:'rocket',world:'space',name:'Ракета',keywords:['rocket','space']},
  car:{id:'car',world:'cars',name:'Машинка',keywords:['car','cars']},
  train:{id:'train',world:'trains',name:'Поезд',keywords:['train','trains']},
  trex:{id:'trex',world:'dinosaurs',name:'Ти-рекс',keywords:['trex','dinosaur','dinosaurs']}
};

export function templateFromHint(hint){
  if(!hint)return null;
  const value=String(hint).toLowerCase();
  return Object.values(TEMPLATES).find(t=>t.keywords.some(k=>value.includes(k)))||null;
}

export function classifyDrawing({templateHint='',markerCount=0,inkRatio=0,confidence=0}={}){
  const hinted=templateFromHint(templateHint);
  if(hinted){return {...hinted,confidence:clamp(.7+confidence*.25,0,.98),source:'template-hint'};}
  // Without a printed-template identity we do not pretend AI knows the object.
  // The scanner returns an explicit unknown state for a safe UX.
  return {id:'unknown',world:'unknown',name:'Новый рисунок',confidence:clamp(confidence*.55+Math.min(markerCount,4)*.05+Math.min(inkRatio,.3),0,.7),source:'visual-pipeline'};
}

export function getTemplate(id){return TEMPLATES[id]||null;}
export const templates=Object.values(TEMPLATES);
