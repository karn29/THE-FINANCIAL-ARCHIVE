export const blackTuesday1929 = {
  id: 'black-tuesday-1929',
  name: 'Black Tuesday',
  year: 1929,
  threatLevel: 'EXTREME' as const,
  hook: 'The day the roaring twenties died. Were you long?',
  legendaryInvestor: 'Jesse Livermore',
  legendaryAction: 'Livermore shorted the market and made $100 million in a single day. He read the tape, saw the panic, and bet against the crowd.',
  briefing: {
    date: 'October 24, 1929',
    context: 'The Dow Jones has surged 500% in eight years. Margin lending is at an all-time high. Investors are borrowing 90% of their stock value. The Federal Reserve has been raising rates to cool speculation, but nobody is listening. Shoe-shine boys are giving stock tips. The smart money has already started selling.',
    fearGreed: 85,
    sectors: [
      { name: 'Industrials', momentum: 72 },
      { name: 'Railroads', momentum: 45 },
      { name: 'Utilities', momentum: 68 },
      { name: 'Banking', momentum: 30 },
      { name: 'Steel', momentum: 55 },
      { name: 'Oil', momentum: 60 },
      { name: 'Real Estate', momentum: 40 },
      { name: 'Agriculture', momentum: 25 },
    ],
    headlines: [
      'MARGIN CALLS SURGE AS BROKERS DEMAND MORE COLLATERAL',
      'FEDERAL RESERVE WARNS OF IRRATIONAL EXUBERANCE IN MARKETS',
      'RECORD TRADING VOLUME ON NYSE \u2014 12.9 MILLION SHARES',
      'INVESTMENT TRUSTS REPORT RECORD INFLOWS FROM RETAIL INVESTORS',
      'BANK OF ENGLAND RAISES RATES TO STEM GOLD OUTFLOWS',
      'PROMINENT BANKER J.P. MORGAN JR. CALLS FOR CALM',
    ],
  },
  companies: [
    { name: 'U.S. Steel', sector: 'Steel', price: 262, sparkline: [220,235,248,255,262,258,270,265,262,250,245,255,260,262,258,250,245,240,248,255,262,260,255,250,258,262,265,260,255,262], sentiment: 'BULLISH' },
    { name: 'General Electric', sector: 'Industrials', price: 396, sparkline: [340,350,360,370,375,380,385,378,382,388,390,385,388,392,395,390,388,392,395,396,394,390,388,392,395,396,394,392,395,396], sentiment: 'STRONG BUY' },
    { name: 'Radio Corporation', sector: 'Technology', price: 505, sparkline: [100,150,200,250,280,320,350,380,400,420,430,440,450,460,470,475,480,485,490,492,495,498,500,502,504,505,503,500,502,505], sentiment: 'EUPHORIC' },
    { name: 'American Telephone', sector: 'Utilities', price: 304, sparkline: [260,265,270,275,278,280,282,285,288,290,292,295,297,298,300,301,302,300,298,300,302,303,304,303,302,303,304,303,302,304], sentiment: 'STABLE' },
    { name: 'Goldman Sachs Trading', sector: 'Banking', price: 121, sparkline: [50,60,70,80,85,90,95,100,105,108,110,112,115,116,118,119,120,118,116,118,119,120,121,120,118,119,120,121,120,121], sentiment: 'CAUTION' },
  ],
  events: [
    {
      title: 'BLACK THURSDAY \u2014 PANIC SELLING BEGINS',
      brief: 'The market opens and immediately drops 11%. Margin calls cascade. Brokers are selling stocks at any price to cover loans. The ticker tape is running 90 minutes behind.',
      choices: [
        { id: 'hold-1929-1', text: 'HOLD \u2014 This is a temporary correction. The fundamentals have not changed.', portfolioImpact: -0.15, riskAppetite: 10, innovationBias: 0, lossTolerance: 15, contrarianScore: 5, decisionSpeed: -5, indiaInstinct: 0, annotation: 'Held through the initial panic \u2014 high loss tolerance but potentially dangerous in a systemic crash.' },
        { id: 'sell-half-1929-1', text: 'SELL HALF \u2014 Reduce exposure but keep some skin in the game.', portfolioImpact: -0.07, riskAppetite: -5, innovationBias: 0, lossTolerance: 0, contrarianScore: -5, decisionSpeed: 5, indiaInstinct: 0, annotation: 'Balanced response to panic \u2014 prudent risk management without full capitulation.' },
      ],
    },
    {
      title: 'BANKERS POOL INTERVENES \u2014 TEMPORARY RELIEF',
      brief: 'J.P. Morgan, Chase, and National City Bank form a consortium and buy stocks aggressively. The market stabilizes briefly. Headlines declare the crisis over.',
      choices: [
        { id: 'buy-dip-1929-2', text: 'BUY THE DIP \u2014 The bankers have it under control. Load up on discounted stocks.', portfolioImpact: 0.08, riskAppetite: 15, innovationBias: 0, lossTolerance: 10, contrarianScore: 10, decisionSpeed: 10, indiaInstinct: 0, annotation: 'Trusted institutional intervention during systemic failure \u2014 classic overconfidence trap.' },
        { id: 'wait-1929-2', text: 'WAIT \u2014 Something feels wrong. The volume is too high. Stay in cash.', portfolioImpact: 0, riskAppetite: -10, innovationBias: 0, lossTolerance: 5, contrarianScore: 15, decisionSpeed: -10, indiaInstinct: 0, annotation: 'Resisted the false recovery signal \u2014 demonstrated pattern recognition in crisis.' },
      ],
    },
    {
      title: 'BLACK TUESDAY \u2014 THE FLOOR FALLS OUT',
      brief: '16.4 million shares traded. The Dow drops 12% in a single day. There are no buyers. Entire fortunes are being wiped out by the hour.',
      choices: [
        { id: 'sell-everything-1929-3', text: 'SELL EVERYTHING \u2014 Get out at any price. Preservation over profit.', portfolioImpact: -0.25, riskAppetite: -20, innovationBias: 0, lossTolerance: -15, contrarianScore: -10, decisionSpeed: 15, indiaInstinct: 0, annotation: 'Full capitulation at the bottom \u2014 loss aversion override during maximum fear.' },
        { id: 'short-market-1929-3', text: 'SHORT THE MARKET \u2014 This is a once-in-a-lifetime collapse. Bet against it.', portfolioImpact: 0.30, riskAppetite: 20, innovationBias: 5, lossTolerance: 20, contrarianScore: 25, decisionSpeed: 15, indiaInstinct: 0, annotation: 'Livermore-level conviction \u2014 identified systemic failure and profited from chaos.' },
      ],
    },
    {
      title: 'PRESIDENT HOOVER DECLARES FUNDAMENTAL BUSINESS IS SOUND',
      brief: 'The President makes a public statement reassuring the nation. Banks are quietly restricting lending. Unemployment is beginning to rise in industrial cities.',
      choices: [
        { id: 'believe-hoover-1929-4', text: 'RE-ENTER \u2014 The President says it is fine. Buy quality stocks at discount prices.', portfolioImpact: -0.18, riskAppetite: 10, innovationBias: -5, lossTolerance: 5, contrarianScore: -15, decisionSpeed: 5, indiaInstinct: 0, annotation: 'Trusted political reassurance over market signals \u2014 authority bias in action.' },
        { id: 'ignore-hoover-1929-4', text: 'STAY OUT \u2014 Politicians lie. The credit system is broken. This gets worse.', portfolioImpact: 0.05, riskAppetite: -5, innovationBias: 5, lossTolerance: 10, contrarianScore: 20, decisionSpeed: -5, indiaInstinct: 0, annotation: 'Separated political narrative from economic reality \u2014 independent thinking under pressure.' },
      ],
    },
    {
      title: 'SUICIDES ON WALL STREET \u2014 THE HUMAN COST',
      brief: 'Reports of ruined investors dominate the press. Life savings wiped out. Margin debt has destroyed middle-class families who entered the market for the first time.',
      choices: [
        { id: 'bonds-1929-5', text: 'MOVE TO BONDS \u2014 Safety first. Government bonds are the only refuge now.', portfolioImpact: 0.03, riskAppetite: -15, innovationBias: -5, lossTolerance: -10, contrarianScore: -5, decisionSpeed: 0, indiaInstinct: 0, annotation: 'Flight to safety during extreme distress \u2014 classic defensive positioning.' },
        { id: 'buy-ge-1929-5', text: 'BUY GE AND STEEL \u2014 These companies will survive. This is generational pricing.', portfolioImpact: -0.10, riskAppetite: 15, innovationBias: -5, lossTolerance: 20, contrarianScore: 20, decisionSpeed: 5, indiaInstinct: 0, annotation: 'Value investing instinct \u2014 but timing was premature. The Depression had years to run.' },
      ],
    },
    {
      title: 'THE GREAT DEPRESSION BEGINS \u2014 MARKETS KEEP FALLING',
      brief: 'By year-end, the Dow has lost 40% from its peak. But the worst is yet to come. Over the next 3 years it will fall another 80%. The roaring twenties are dead.',
      choices: [
        { id: 'cash-gold-1929-6', text: 'ALL CASH AND GOLD \u2014 Prepare for a decade of pain. Capital preservation is everything.', portfolioImpact: 0.02, riskAppetite: -20, innovationBias: -10, lossTolerance: -5, contrarianScore: 10, decisionSpeed: 0, indiaInstinct: 0, annotation: 'Correct long-term read \u2014 but required abandoning all optimism for years.' },
        { id: 'dca-1929-6', text: 'DOLLAR-COST AVERAGE \u2014 Start buying slowly. Nobody can time the exact bottom.', portfolioImpact: -0.12, riskAppetite: 5, innovationBias: 5, lossTolerance: 10, contrarianScore: 5, decisionSpeed: -10, indiaInstinct: 0, annotation: 'Systematic approach to a chaotic market \u2014 sound in theory, painful in practice.' },
      ],
    },
  ],
  optimalPath: [1, 1, 1, 1, 0, 0],
  biases: {
    'Confirmation Bias': 'You only bought what you already believed in, ignoring the structural cracks in the credit system.',
    'Loss Aversion': 'You sold at the bottom, locking in losses when patience might have been rewarded \u2014 though in 1929, patience meant waiting until 1954.',
    'Overconfidence': 'You went all-in too early, trusting the correction was temporary when it was the start of the Great Depression.',
    'Authority Bias': 'You trusted bankers and politicians over market signals. In 1929, the authorities were wrong.',
    'Anchoring': 'You anchored to pre-crash prices, expecting a return to highs that would not come for 25 years.',
  },
};
