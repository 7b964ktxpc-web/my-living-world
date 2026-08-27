export function nextGuidanceIndex(collected=[],total=0){return Math.min(total,Math.max(0,collected.length))}
export function guidanceComplete(collected=[],total=0){return total>0&&collected.length>=total}
export function guidanceText(world,index,total){if(guidanceComplete(Array(index).fill('x'),total))return 'Все цели найдены! Возвращаемся!';const labels={space:'Звезда маяка',cars:'Чекпоинт',trains:'Груз или станция',dinos:'Яйцо динозавра'};return `${labels[world]||'Цель'} ${Math.min(index+1,total)} из ${total}`}
