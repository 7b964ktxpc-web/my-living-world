const claimed=new Set();
export function rewardKey(run){return run?.id&&run?.startedAt?`${run.id}:${run.startedAt}`:null}
export function claimMinigameReward(run){const key=rewardKey(run);if(!key||run.status!=='success'||claimed.has(key))return 0;claimed.add(key);return Number(run.reward)||0}
export function resetMinigameClaims(){claimed.clear()}
