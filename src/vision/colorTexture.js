const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

export function buildColorTexture(dataUrl,{size=512}={}){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>{
      const canvas=document.createElement('canvas'); canvas.width=size; canvas.height=size;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(img,0,0,size,size);
      const image=ctx.getImageData(0,0,size,size); const d=image.data;
      let colored=0, dark=0;
      for(let i=0;i<d.length;i+=4){
        const r=d[i],g=d[i+1],b=d[i+2],a=d[i+3];
        if(a<20) continue;
        const max=Math.max(r,g,b), min=Math.min(r,g,b);
        if(max-min>24 && max>65) colored++;
        if(max<100) dark++;
      }
      ctx.putImageData(image,0,0);
      const total=size*size;
      resolve({textureDataUrl:canvas.toDataURL('image/png'),colorRatio:clamp(colored/total,0,1),lineRatio:clamp(dark/total,0,1),size});
    };
    img.onerror=()=>reject(new Error('Не удалось подготовить текстуру рисунка'));
    img.src=dataUrl;
  });
}
