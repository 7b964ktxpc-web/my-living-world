export const REWARD_LEVELS=[
 {stars:0,label:'Новичок',emoji:'🌱'},
 {stars:3,label:'Исследователь',emoji:'🔭'},
 {stars:6,label:'Создатель',emoji:'🎨'},
 {stars:10,label:'Капитан мира',emoji:'🌎'},
 {stars:15,label:'Повелитель приключений',emoji:'🏆'}
];
export function levelForStars(stars=0){return [...REWARD_LEVELS].reverse().find(x=>stars>=x.stars)||REWARD_LEVELS[0]}
export function nextLevel(stars=0){return REWARD_LEVELS.find(x=>x.stars>stars)||null}
export function rewardSummary(progress){const stars=progress?.stars||0;const level=levelForStars(stars);const next=nextLevel(stars);return {stars,level,next,remaining:next?Math.max(0,next.stars-stars):0}}
