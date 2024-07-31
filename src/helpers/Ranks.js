const ranks = [
    { name: "Rookie Detective", minXP: 0 },
    { name: "Junior Investigator", minXP: 1000 },
    { name: "Gumshoe", minXP: 2000 },
    { name: "Chief Detective", minXP: 3000 },
    { name: "Master Sleuth", minXP: 4000 },
  ];
  
  const getRank = (xp) => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (xp >= ranks[i].minXP) {
        return ranks[i].name;
      }
    }
    return 'Unranked';
  };

  const getNextRankXP = (xp) => {
    for (let i = 0; i < ranks.length; i++) {
      if (xp < ranks[i].minXP) {
        return ranks[i].minXP;
      }
    }
    return ranks[ranks.length - 1].minXP; 
  };
  
  export { ranks, getRank, getNextRankXP };