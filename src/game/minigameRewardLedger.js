const PREFIX='mlw-minigame-rewards-v1';
export function rewardKey(run){return run?.id&&run?.startedAt?`${PREFIX}:${run.id}:${run.startedAt}`:null}
export function hasRewarded(storage,key){return Boolean(key&&storage?.[key])}
export function grantReward(storage,run){const key=rewardKey(run);if(!key||hasRewarded(storage,key)||run?.status!=='success')return {storage:storage||{},granted:0};return {storage:{...(storage||{}),[key]:true},granted:run.reward||0}}
export function pruneRewards(storage,maxEntries=100){const entries=Object.entries(storage||{});if(entries.length<=maxEntries)return storage||{};return Object.fromEntries(entries.slice(-maxEntries));}
