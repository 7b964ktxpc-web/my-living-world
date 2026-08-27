export const inputModes={space:{label:'Управление ракетой',actions:['thrust','left','right','boost']},cars:{label:'Управление машинкой',actions:['accelerate','brake','left','right']},trains:{label:'Управление поездом',actions:['forward','brake','switch']},dinos:{label:'Управление динозавром',actions:['forward','back','left','right']}};
export function modeForWorld(world){return inputModes[world]||inputModes.space}
export function controlPayload(world,control,pressed){return {kind:'input',world,control,pressed:Boolean(pressed),ts:Date.now()}}
