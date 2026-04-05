export const greatCollapse2008 = {
  id: 'great-collapse-2008',
  name: 'The Great Collapse',
  year: 2008,
  threatLevel: 'EXTREME' as const,
  hook: 'Lehman filed. The world froze. Every bank was lying. What did you do?',
  legendaryInvestor: 'Warren Buffett',
  legendaryAction: 'Buffett deployed $26 billion during the crisis, including $5 billion into Goldman Sachs at terms that only he could demand. His famous line: "Be fearful when others are greedy, and greedy when others are fearful."',
  briefing: {
    date: 'September 15, 2008',
    context: 'Lehman Brothers has just filed for bankruptcy \u2014 the largest in American history. AIG is hours from collapse. Merrill Lynch sold itself to Bank of America over a weekend. The entire global banking system is frozen. Nobody trusts anybody. Credit default swaps worth trillions are about to blow up. The world economy is staring into the abyss.',
    fearGreed: 5,
    sectors: [
      { name: 'Banking', momentum: 5 },
      { name: 'Real Estate', momentum: 8 },
      { name: 'Insurance', momentum: 10 },
      { name: 'Technology', momentum: 35 },
      { name: 'Healthcare', momentum: 45 },
      { name: 'Energy', momentum: 25 },
      { name: 'Consumer Staples', momentum: 50 },
      { name: 'Utilities', momentum: 42 },
    ],
    headlines: [
      'LEHMAN BROTHERS FILES CHAPTER 11 \u2014 158 YEARS OF HISTORY ENDS',
      'AIG DEMANDS $85 BILLION EMERGENCY BAILOUT FROM FEDERAL RESERVE',
      'MERRILL LYNCH SOLD TO BANK OF AMERICA IN EMERGENCY WEEKEND DEAL',
      'GLOBAL INTERBANK LENDING FREEZES \u2014 LIBOR SPREADS HIT RECORD',
      'HANK PAULSON ON BENDED KNEE BEGS CONGRESS FOR $700B TARP',
      'MONEY MARKET FUND BREAKS THE BUCK \u2014 FIRST TIME IN HISTORY',
    ],
  },
  companies: [
    { name: 'Goldman Sachs', sector: 'Banking', price: 120, sparkline: [230,225,220,210,200,190,185,180,175,170,165,160,155,150,148,145,142,140,138,136,134,132,130,128,126,124,122,121,120,120], sentiment: 'EXTREME FEAR' },
    { name: 'Apple Inc', sector: 'Technology', price: 97, sparkline: [180,175,170,165,160,155,150,145,140,135,130,125,120,118,115,112,110,108,106,104,102,101,100,99,98,97,97,97,97,97], sentiment: 'OVERSOLD' },
    { name: 'JPMorgan Chase', sector: 'Banking', price: 35, sparkline: [50,49,48,47,46,45,44,43,42,41,40,39,38,38,37,37,36,36,36,35,35,35,35,35,35,35,35,35,35,35], sentiment: 'DISTRESSED' },
    { name: 'General Electric', sector: 'Conglomerate', price: 22, sparkline: [40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,26,25,25,24,24,23,23,23,22,22,22,22,22,22,22], sentiment: 'CRISIS' },
    { name: 'Walmart', sector: 'Consumer Staples', price: 56, sparkline: [48,49,50,50,51,51,52,52,53,53,53,54,54,54,55,55,55,55,55,55,56,56,56,56,56,56,56,56,56,56], sentiment: 'SAFE HAVEN' },
  ],
  events: [
    {
      title: 'LEHMAN BROTHERS COLLAPSES \u2014 NO BAILOUT',
      brief: 'The US government lets Lehman die. Hank Paulson decides not to intervene. The message is clear: nobody is too big to fail. Except everyone is. The dominos start falling.',
      choices: [
        { id: 'sell-all-2008-1', text: 'SELL EVERYTHING \u2014 If Lehman can die, anyone can die. Cash is the only asset.', portfolioImpact: -0.05, riskAppetite: -20, innovationBias: 0, lossTolerance: -15, contrarianScore: -10, decisionSpeed: 15, indiaInstinct: 0, annotation: 'Panic selling at the worst moment \u2014 but in 2008, even panic had logic behind it.' },
        { id: 'hold-quality-2008-1', text: 'HOLD QUALITY \u2014 Apple and Walmart will survive this. Keep the best, sell the rest.', portfolioImpact: 0.05, riskAppetite: 5, innovationBias: 5, lossTolerance: 15, contrarianScore: 10, decisionSpeed: 0, indiaInstinct: 0, annotation: 'Quality-focused crisis strategy \u2014 separated systemic risk from company-specific risk.' },
      ],
    },
    {
      title: 'AIG BAILOUT \u2014 $85 BILLION FROM THE FED',
      brief: 'The Federal Reserve bails out AIG with $85 billion in emergency lending. The insurance giant had sold credit default swaps on trillions of dollars of mortgage-backed securities. If AIG falls, every bank falls.',
      choices: [
        { id: 'buy-banks-2008-2', text: 'BUY BANKS \u2014 The Fed will not let the system collapse. Goldman and JPM will survive.', portfolioImpact: 0.15, riskAppetite: 20, innovationBias: 0, lossTolerance: 15, contrarianScore: 20, decisionSpeed: 10, indiaInstinct: 0, annotation: 'Buffett-level conviction \u2014 bet on the system surviving when everyone bet on collapse.' },
        { id: 'stay-cash-2008-2', text: 'STAY IN CASH \u2014 The AIG bailout means things are worse than anyone thought.', portfolioImpact: 0, riskAppetite: -10, innovationBias: 0, lossTolerance: 0, contrarianScore: -5, decisionSpeed: -5, indiaInstinct: 0, annotation: 'Read the bailout as a signal of severity rather than support \u2014 valid fear.' },
      ],
    },
    {
      title: 'CONGRESS REJECTS TARP \u2014 DOW DROPS 778 POINTS',
      brief: 'The House of Representatives votes down the $700 billion Troubled Asset Relief Program. The Dow falls 778 points in a single day \u2014 the largest point drop in history. Markets worldwide crash.',
      choices: [
        { id: 'buy-crash-2008-3', text: 'BUY THE CRASH \u2014 Congress will pass it on the second try. This is maximum fear.', portfolioImpact: 0.20, riskAppetite: 20, innovationBias: 0, lossTolerance: 20, contrarianScore: 25, decisionSpeed: 15, indiaInstinct: 0, annotation: 'Correctly predicted political mechanics \u2014 TARP passed 4 days later. Maximum conviction.' },
        { id: 'short-more-2008-3', text: 'SHORT THE MARKET \u2014 Democracy has failed. The system cannot save itself.', portfolioImpact: -0.10, riskAppetite: 15, innovationBias: 0, lossTolerance: 10, contrarianScore: 10, decisionSpeed: 10, indiaInstinct: 0, annotation: 'Bet against political resolution \u2014 underestimated the survival instinct of institutions.' },
      ],
    },
    {
      title: 'BUFFETT INVESTS $5 BILLION IN GOLDMAN SACHS',
      brief: 'Warren Buffett deploys $5 billion into Goldman Sachs preferred stock with a 10% annual dividend and warrants. He tells the world: this is a good deal. The Oracle of Omaha is buying.',
      choices: [
        { id: 'follow-buffett-2008-4', text: 'FOLLOW BUFFETT \u2014 If the Oracle is buying, the bottom is near. Buy Goldman.', portfolioImpact: 0.15, riskAppetite: 10, innovationBias: 0, lossTolerance: 10, contrarianScore: 5, decisionSpeed: 5, indiaInstinct: 0, annotation: 'Followed the greatest investor of the era \u2014 but at terms you could not get.' },
        { id: 'buffett-wrong-2008-4', text: 'BUFFETT GETS DIFFERENT TERMS \u2014 His deal is not available to you. Stay cautious.', portfolioImpact: 0.02, riskAppetite: -5, innovationBias: 5, lossTolerance: 5, contrarianScore: 10, decisionSpeed: -5, indiaInstinct: 0, annotation: 'Recognized that institutional investors get different deals than retail \u2014 intelligent skepticism.' },
      ],
    },
    {
      title: 'GLOBAL COORDINATED RATE CUTS \u2014 CENTRAL BANKS ACT TOGETHER',
      brief: 'The Fed, ECB, Bank of England, and Bank of Japan simultaneously cut interest rates. Quantitative easing begins. Trillions of dollars of liquidity are being pumped into the system.',
      choices: [
        { id: 'go-long-2008-5', text: 'GO LONG \u2014 When central banks print money, asset prices go up. Buy equities now.', portfolioImpact: 0.25, riskAppetite: 15, innovationBias: 5, lossTolerance: 15, contrarianScore: 15, decisionSpeed: 10, indiaInstinct: 0, annotation: 'Understood the mechanics of QE before most \u2014 money printing inflates assets.' },
        { id: 'gold-2008-5', text: 'BUY GOLD \u2014 Money printing means inflation. Gold is the only real money.', portfolioImpact: 0.12, riskAppetite: 5, innovationBias: -5, lossTolerance: 5, contrarianScore: 5, decisionSpeed: 0, indiaInstinct: 0, annotation: 'Inflation hedge thinking \u2014 gold did well, but equities did better in the recovery.' },
      ],
    },
    {
      title: 'MARCH 2009 \u2014 THE GENERATIONAL BOTTOM',
      brief: 'The S&P 500 hits 666. Unemployment is at 10%. Everyone says the financial system is permanently broken. This is the exact bottom. From here, the longest bull market in history begins.',
      choices: [
        { id: 'back-up-truck-2008-6', text: 'BACK UP THE TRUCK \u2014 666 on the S&P. Buy everything. Apple, Goldman, JPM. All of it.', portfolioImpact: 0.40, riskAppetite: 25, innovationBias: 10, lossTolerance: 25, contrarianScore: 25, decisionSpeed: 10, indiaInstinct: 0, annotation: 'Generational call \u2014 buying at the exact bottom required maximum conviction against maximum fear.' },
        { id: 'too-scared-2008-6', text: 'TOO SCARED \u2014 This could be 1929 all over again. What if markets never recover?', portfolioImpact: -0.02, riskAppetite: -20, innovationBias: -10, lossTolerance: -20, contrarianScore: -15, decisionSpeed: -10, indiaInstinct: 0, annotation: 'Fear paralysis at the bottom \u2014 the most expensive emotion in investing.' },
      ],
    },
  ],
  optimalPath: [1, 0, 0, 0, 0, 0],
  biases: {
    'Loss Aversion': 'You sold at the bottom because the pain of losing felt twice as bad as the joy of gaining \u2014 the most common bias in crisis markets.',
    'Recency Bias': 'You assumed the crash would continue forever because it had been crashing for months \u2014 ignoring that recoveries are equally violent.',
    'Herding': 'You followed the crowd into panic selling when the crowd was the most wrong it had ever been.',
    'Anchoring': 'You anchored to pre-crisis prices and saw every bounce as a dead cat \u2014 missing that the bottom was forming.',
    'Overconfidence': 'You shorted the market thinking you could time the bottom \u2014 getting the direction right but the timing catastrophically wrong.',
  },
};
