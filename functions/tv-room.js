const rooms=new Map();

function cleanId(value){return String(value||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,16)}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}})}

export default async function handler(req,res){
 const url=new URL(req.url,'https://example.invalid');
 const room=cleanId(url.searchParams.get('room'));
 if(req.method==='GET') return res.status(200).json(rooms.get(room)||{room,connected:false});
 if(req.method==='POST'){
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  if(!room)return res.status(400).json({error:'room required'});
  const existing=rooms.get(room)||{room,connected:false,updatedAt:0};
  const next={...existing,...body,connected:true,updatedAt:Date.now()};rooms.set(room,next);return res.status(200).json(next)
 }
 return res.status(405).json({error:'method not allowed'});
}
