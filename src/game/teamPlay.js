export const TEAM_ACTIONS={space:{near:'prepare-launch',objective:'scan-beacon',success:'celebrate-launch'},cars:{near:'open-garage',objective:'unlock-checkpoint',success:'wave-finish-flag'},trains:{near:'load-cargo',objective:'open-next-station',success:'signal-arrival'},dinos:{near:'prepare-search',objective:'mark-next-egg',success:'celebrate-find'}};
export function teamActionFor(world,event){const map=TEAM_ACTIONS[world]||TEAM_ACTIONS.space;return map[event]||null}
export function teamPromptFor(world,event){const action=teamActionFor(world,event);if(!action)return null;const labels={
'prepare-launch':'Робот готовит ракету 🚀','scan-beacon':'Робот показывает следующий маяк ⭐','celebrate-launch':'Робот празднует запуск 🎉',
'open-garage':'Механик открывает гараж 🔧','unlock-checkpoint':'Механик открывает следующий чекпоинт 🏁','wave-finish-flag':'Механик машет финишным флагом 🏁',
'load-cargo':'Машинист помогает загрузить груз 📦','open-next-station':'Машинист открывает следующую станцию 🚉','signal-arrival':'Машинист даёт сигнал прибытия 🚦',
'prepare-search':'Смотритель готовит поиск 🦖','mark-next-egg':'Смотритель отмечает следующее яйцо 🥚','celebrate-find':'Смотритель празднует находку 🎉'};return labels[action]||action}
