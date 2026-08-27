const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

function gray(data,i){return (data[i]+data[i+1]+data[i+2])/3}

/**
 * Lightweight, dependency-free marker candidate detector.
 * It intentionally returns candidates rather than pretending to perform a
 * full CV solve. A future worker can replace this implementation while the
 * scanner contract remains stable.
 */
export function detectMarkerCandidates(imageData,{grid=7,darkThreshold=78}={}){
  const {data,width,height}=imageData;
  const candidates=[];
  const cellW=width/grid,cellH=height/grid;
  for(let gy=0;gy<grid;gy++) for(let gx=0;gx<grid;gx++){
    const x0=Math.floor(gx*cellW),y0=Math.floor(gy*cellH);
    const x1=Math.min(width,Math.floor((gx+1)*cellW));
    const y1=Math.min(height,Math.floor((gy+1)*cellH));
    let dark=0,total=0;
    for(let y=y0;y<y1;y+=Math.max(1,Math.floor(cellH/10))) for(let x=x0;x<x1;x+=Math.max(1,Math.floor(cellW/10))){
      if(gray(data,(y*width+x)*4)<darkThreshold) dark++;
      total++;
    }
    const density=total?dark/total:0;
    if(density>.55) candidates.push({x:(x0+x1)/2,y:(y0+y1)/2,density,area:(x1-x0)*(y1-y0)});
  }
  return candidates.sort((a,b)=>b.density*b.area-a.density*a.area);
}

export function estimateMarkerCorners(imageData){
  const {width,height}=imageData;
  const candidates=detectMarkerCandidates(imageData);
  if(candidates.length<4)return {corners:null,candidates};
  const zones=[
    [0,0,width/2,height/2],
    [width/2,0,width,height/2],
    [0,height/2,width/2,height],
    [width/2,height/2,width,height]
  ];
  const corners=zones.map(([x0,y0,x1,y1])=>candidates.find(c=>c.x>=x0&&c.x<x1&&c.y>=y0&&c.y<y1)||null);
  return {corners:corners.every(Boolean)?corners:null,candidates};
}

export function orderCorners(corners){
  if(!corners||corners.length!==4)return null;
  const sorted=[...corners];
  const sum=p=>p.x+p.y;
  const diff=p=>p.x-p.y;
  return {
    topLeft:sorted.reduce((a,b)=>sum(a)<sum(b)?a:b),
    topRight:sorted.reduce((a,b)=>diff(a)>diff(b)?a:b),
    bottomLeft:sorted.reduce((a,b)=>diff(a)<diff(b)?a:b),
    bottomRight:sorted.reduce((a,b)=>sum(a)>sum(b)?a:b)
  };
}

export function markerQuality(corners,width,height){
  if(!corners)return 0;
  const pts=Object.values(corners);
  const margin=pts.reduce((s,p)=>s+Math.min(p.x,width-p.x,p.y,height-p.y),0)/4;
  const spread=Math.min(width,height)*.2;
  return clamp(.55+.35*clamp(margin/(Math.min(width,height)*.08),0,1)+.1*clamp((Math.max(...pts.map(p=>p.x))-Math.min(...pts.map(p=>p.x)))/spread,0,1),0,1);
}
