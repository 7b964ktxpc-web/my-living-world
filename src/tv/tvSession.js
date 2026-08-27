const SESSION_PREFIX='mlw-tv-session-';
function randomId(){return Math.random().toString(36).slice(2,8).toUpperCase()}
function cleanSession(value){return typeof value==='string'?value.replace(/[^A-Z0-9]/gi,'').slice(0,8).toUpperCase():''}
export function createTvSession(){const id=`${randomId()}${Date.now().toString(36).slice(-2).toUpperCase()}`.slice(0,8);const createdAt=Date.now();const session={id,createdAt,expiresAt:createdAt+3600000,status:'waiting'};try{localStorage.setItem(SESSION_PREFIX+id,JSON.stringify(session))}catch{}return session}
export function getTvSession(id){const key=SESSION_PREFIX+cleanSession(id);if(!key)return null;try{const session=JSON.parse(localStorage.getItem(key)||'null');if(!session)return null;if(session.expiresAt<Date.now()){localStorage.removeItem(key);return null}return session}catch{return null}}
export function buildPairingPayload(session,origin=window.location.origin){return JSON.stringify({app:'my-living-world',v:1,session:session.id,join:`${origin}/?remote=${encodeURIComponent(session.id)}`})}
export function parsePairingPayload(raw){try{const value=JSON.parse(raw);return value?.app==='my-living-world'&&value?.v===1?value:null}catch{return null}}
export function sessionStorageKey(id){return SESSION_PREFIX+cleanSession(id)}
