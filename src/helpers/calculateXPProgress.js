import { getRank, ranks } from "./Ranks";

export const calculateXPProgress = (stats) => {
  if (!stats) return 0;
  const userRank = getRank(stats.xp);
  const currentRankIndex = ranks.findIndex((rank) => rank.name === userRank);
  const nextRank =
    currentRankIndex + 1 < ranks.length
      ? ranks[currentRankIndex + 1]
      : ranks[currentRankIndex];
  const nextBadgeXP = nextRank.minXP;
  const previousRankXP = ranks[currentRankIndex]?.minXP || 0;
  return ((stats.xp - previousRankXP) / (nextBadgeXP - previousRankXP)) * 100;
};
