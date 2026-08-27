const solve=(A,b)=>{
  const n=A.length; const M=A.map((r,i)=>[...r,b[i]]);
  for(let c=0;c<n;c++){
    let pivot=c; for(let r=c+1;r<n;r++) if(Math.abs(M[r][c])>Math.abs(M[pivot][c]))pivot=r;
    if(Math.abs(M[pivot][c])<1e-10) return null;
    [M[c],M[pivot]]=[M[pivot],M[c]];
    const d=M[c][c]; for(let j=c;j<=n;j++)M[c][j]/=d;
    for(let r=0;r<n;r++)if(r!==c){const f=M[r][c];for(let j=c;j<=n;j++)M[r][j]-=f*M[c][j]}
  }
  return M.map(r=>r[n]);
};

export function homographyFromCorners(src,dst){
  if(src.length!==4||dst.length!==4)return null;
  const A=[],b=[];
  for(let i=0;i<4;i++){
    const [x,y]=[src[i].x,src[i].y], [u,v]=[dst[i].x,dst[i].y];
    A.push([x,y,1,0,0,0,-u*x,-u*y]);b.push(u);
    A.push([0,0,0,x,y,1,-v*x,-v*y]);b.push(v);
  }
  const h=solve(A,b); if(!h)return null;
  return [...h,1];
}

export function warpImage(sourceCanvas,corners,outWidth=1000,outHeight=1000){
  const src=[corners.topLeft,corners.topRight,corners.bottomRight,corners.bottomLeft];
  const dst=[{x:0,y:0},{x:outWidth,y:0},{x:outWidth,y:outHeight},{x:0,y:outHeight}];
  const H=homographyFromCorners(src,dst);
  if(!H)return null;
  const out=document.createElement('canvas');out.width=outWidth;out.height=outHeight;
  const ctx=out.getContext('2d',{willReadFrequently:true});
  const sctx=sourceCanvas.getContext('2d',{willReadFrequently:true});
  const srcData=sctx.getImageData(0,0,sourceCanvas.width,sourceCanvas.height);
  const outData=ctx.createImageData(outWidth,outHeight);
  const [a,b,c,d,e,f,g,h]=H;
  for(let y=0;y<outHeight;y++)for(let x=0;x<outWidth;x++){
    const den=g*x+h*y+1;
    const sx=(a*x+b*y+c)/den,sy=(d*x+e*y+f)/den;
    const ix=Math.round(sx),iy=Math.round(sy),di=(y*outWidth+x)*4;
    if(ix>=0&&ix<srcData.width&&iy>=0&&iy<srcData.height){
      const si=(iy*srcData.width+ix)*4;
      outData.data[di]=srcData.data[si];outData.data[di+1]=srcData.data[si+1];outData.data[di+2]=srcData.data[si+2];outData.data[di+3]=255;
    }else outData.data[di+3]=0;
  }
  ctx.putImageData(outData,0,0);return out;
}
