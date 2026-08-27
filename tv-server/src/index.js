import {DurableObject} from 'cloudflare:workers';

function roomId(value){return String(value||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,32)}

export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==='/health')return new Response('ok');
  const match=url.pathname.match(/^\/room\/([^/]+)$/);
  if(!match)return new Response('Not found',{status:404});
  const id=env.TV_ROOM.idFromName(roomId(match[1]));
  return env.TV_ROOM.get(id).fetch(new Request(new URL('/websocket',url),request));
 }
};

export class TVRoom extends DurableObject{
 constructor(ctx,env){super(ctx,env);this.ctx=ctx;this.env=env}
 async fetch(request){
  if(request.url.endsWith('/websocket')){
   if(request.headers.get('Upgrade')?.toLowerCase()!=='websocket')return new Response('Expected WebSocket',{status:400});
   const [client,server]=Object.values(new WebSocketPair());
   this.ctx.acceptWebSocket(server);
   server.serializeAttachment({joinedAt:Date.now()});
   return new Response(null,{status:101,webSocket:client});
  }
  return new Response('Not found',{status:404});
 }
 webSocketMessage(ws,message){
  for(const peer of this.ctx.getWebSockets()){
   if(peer!==ws&&peer.readyState===WebSocket.OPEN)peer.send(typeof message==='string'?message:new TextDecoder().decode(message));
  }
 }
 webSocketClose(ws,code,reason){try{ws.close(code,reason)}catch{}}
}
