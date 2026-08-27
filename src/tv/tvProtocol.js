export const TV_MESSAGE_TYPES={HELLO:'hello',STATE:'state',CONTROL:'control',PING:'ping',PONG:'pong'};
export const TV_VERSION=1;
export function makeHello(device='tv'){return {v:TV_VERSION,type:TV_MESSAGE_TYPES.HELLO,device,ts:Date.now()}}
export function makeState({world,objects,selectedId,action,stars=0}){return {v:TV_VERSION,type:TV_MESSAGE_TYPES.STATE,ts:Date.now(),payload:{world,objects,selectedId:selectedId||null,action:action||null,stars}}}
export function makeControl(action,payload={}){return {v:TV_VERSION,type:TV_MESSAGE_TYPES.CONTROL,ts:Date.now(),payload:{action,...payload}}}
export function isValidMessage(msg){return Boolean(msg&&msg.v===TV_VERSION&&Object.values(TV_MESSAGE_TYPES).includes(msg.type))}
export function safeParseMessage(raw){try{const msg=typeof raw==='string'?JSON.parse(raw):raw;return isValidMessage(msg)?msg:null}catch{return null}}
