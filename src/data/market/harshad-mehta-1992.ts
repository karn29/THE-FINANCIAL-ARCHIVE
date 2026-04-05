export const harshadMehta1992 = {
  id: 'harshad-mehta-1992',
  name: 'The Harshad Mehta Scam',
  year: 1992,
  threatLevel: 'SEVERE' as const,
  hook: 'Five thousand crore. Fake bank receipts. The bull that broke a nation. Did you see it coming?',
  legendaryInvestor: 'Radhakishan Damani',
  legendaryAction: 'Damani was one of the few who shorted the market during the Harshad Mehta bull run. While everyone was drunk on the rally, Damani saw the house of cards and bet against it. He made a fortune when the scam unraveled.',
  briefing: {
    date: 'March 1, 1992',
    context: 'The BSE Sensex has exploded from 1,000 to 4,500 in months. One man is behind it all \u2014 Harshad Mehta, the Big Bull of Dalal Street. He is using fake bank receipts to siphon money from the banking system into the stock market, creating an artificial bull run. The media calls him the Amitabh Bachchan of the stock market. Nobody questions where the money is coming from. Yet.',
    fearGreed: 92,
    sectors: [
      { name: 'Banking', momentum: 85 },
      { name: 'Cement', momentum: 75 },
      { name: 'Petrochemicals', momentum: 70 },
      { name: 'FMCG', momentum: 55 },
      { name: 'Textiles', momentum: 60 },
      { name: 'Steel', momentum: 65 },
      { name: 'Auto', momentum: 50 },
      { name: 'Sugar', momentum: 40 },
    ],
    headlines: [
      'HARSHAD MEHTA DRIVES SENSEX TO ALL-TIME HIGH \u2014 4,500 AND COUNTING',
      'ACC CEMENT STOCK SURGES 4,400% IN ONE YEAR \u2014 BIG BULL EFFECT',
      'BANK RECEIPTS MARKET BOOMS AS READY-FORWARD DEALS MULTIPLY',
      'RETAIL INVESTORS FLOOD DALAL STREET \u2014 NEW DEMAT ACCOUNTS SURGE',
      'MEHTA BUYS LEXUS FROM BOMBAY SHOWROOM \u2014 FIRST IN INDIA',
      'SUCHETA DALAL INVESTIGATING UNUSUAL BANKING TRANSACTIONS',
    ],
  },
  companies: [
    { name: 'ACC Cement', sector: 'Cement', price: 10000, sparkline: [200,400,800,1200,1800,2500,3200,4000,5000,5500,6000,6500,7000,7500,8000,8200,8500,8800,9000,9200,9400,9500,9600,9700,9800,9850,9900,9950,9980,10000], sentiment: 'EUPHORIC' },
    { name: 'SBI', sector: 'Banking', price: 320, sparkline: [180,190,200,210,220,230,240,250,260,270,275,280,285,290,295,298,300,305,308,310,312,314,316,318,319,320,320,319,320,320], sentiment: 'STRONG BUY' },
    { name: 'Reliance Industries', sector: 'Petrochemicals', price: 280, sparkline: [150,160,170,180,190,200,210,220,225,230,235,240,245,250,255,258,260,265,268,270,272,274,276,278,279,280,280,279,280,280], sentiment: 'BULLISH' },
    { name: 'Videocon', sector: 'Electronics', price: 450, sparkline: [200,220,240,260,280,300,320,340,350,360,370,380,390,400,410,415,420,425,430,435,438,440,442,444,446,448,449,450,450,450], sentiment: 'MOMENTUM' },
    { name: 'Tata Steel', sector: 'Steel', price: 210, sparkline: [140,145,150,155,160,165,170,175,178,180,182,185,188,190,192,195,198,200,202,204,205,206,207,208,209,210,210,209,210,210], sentiment: 'NEUTRAL' },
  ],
  events: [
    {
      title: 'THE BIG BULL RALLY \u2014 ACC HITS 10,000',
      brief: 'Harshad Mehta single-handedly pushes ACC Cement from 200 to 10,000. The stock is trading at 100x earnings. Nobody cares. Everyone is making money. Your neighbor just bought a flat from stock profits.',
      choices: [
        { id: 'ride-bull-1992-1', text: 'RIDE THE BULL \u2014 Follow the Big Bull. The trend is your friend.', portfolioImpact: 0.25, riskAppetite: 20, innovationBias: -5, lossTolerance: 5, contrarianScore: -15, decisionSpeed: 10, indiaInstinct: 5, annotation: 'Followed the herd into a fraudulent rally \u2014 momentum trading without fundamental analysis.' },
        { id: 'something-wrong-1992-1', text: 'SOMETHING IS WRONG \u2014 No stock goes up 5000% on fundamentals. Stay out.', portfolioImpact: 0, riskAppetite: -10, innovationBias: 5, lossTolerance: 10, contrarianScore: 25, decisionSpeed: -5, indiaInstinct: 15, annotation: 'Recognized the impossibility of the rally \u2014 fundamental analysis over market noise.' },
      ],
    },
    {
      title: 'SUCHETA DALAL PUBLISHES \u2014 THE TIMES OF INDIA EXPOSE',
      brief: 'Journalist Sucheta Dalal publishes her investigation revealing that Mehta has been using fake bank receipts (BRs) to divert over 5,000 crore from the banking system into stocks. The house of cards begins to tremble.',
      choices: [
        { id: 'short-now-1992-2', text: 'SHORT EVERYTHING \u2014 The scam is out. This market is built on fraud. Sell.', portfolioImpact: 0.30, riskAppetite: 15, innovationBias: 5, lossTolerance: 15, contrarianScore: 20, decisionSpeed: 15, indiaInstinct: 15, annotation: 'Acted on investigative journalism before the market priced it in \u2014 information edge.' },
        { id: 'wait-confirm-1992-2', text: 'WAIT FOR CONFIRMATION \u2014 One newspaper article does not crash a market. Hold positions.', portfolioImpact: -0.15, riskAppetite: 5, innovationBias: -5, lossTolerance: 5, contrarianScore: -10, decisionSpeed: -10, indiaInstinct: -5, annotation: 'Waited for official confirmation while the smart money was already exiting.' },
      ],
    },
    {
      title: 'RBI INVESTIGATION LAUNCHED \u2014 BANKING SYSTEM IN CRISIS',
      brief: 'The Reserve Bank of India confirms the fraud. Multiple banks are implicated. The ready-forward market is frozen. Credit lines are being cut across Dalal Street.',
      choices: [
        { id: 'exit-all-1992-3', text: 'EXIT ALL POSITIONS \u2014 The banking system itself is compromised. Nothing is safe.', portfolioImpact: -0.05, riskAppetite: -15, innovationBias: 0, lossTolerance: -10, contrarianScore: -5, decisionSpeed: 10, indiaInstinct: 5, annotation: 'Systemic risk recognition \u2014 understood that banking fraud contaminates all asset classes.' },
        { id: 'buy-quality-1992-3', text: 'BUY QUALITY \u2014 Tata and Hindustan Lever did nothing wrong. Their stocks are on sale.', portfolioImpact: 0.12, riskAppetite: 10, innovationBias: 0, lossTolerance: 15, contrarianScore: 15, decisionSpeed: 5, indiaInstinct: 10, annotation: 'Separated fraudulent stocks from quality companies \u2014 sophisticated crisis investing.' },
      ],
    },
    {
      title: 'MEHTA ARRESTED \u2014 SENSEX CRASHES 50%',
      brief: 'Harshad Mehta is arrested. The Sensex crashes from 4,500 to 2,500. Retail investors who entered the market for the first time are devastated. The dream is over.',
      choices: [
        { id: 'stay-out-1992-4', text: 'STAY IN CASH \u2014 The wreckage is not over. More bodies will surface. Wait.', portfolioImpact: 0.02, riskAppetite: -15, innovationBias: 0, lossTolerance: -5, contrarianScore: 5, decisionSpeed: -5, indiaInstinct: 5, annotation: 'Patience during cleanup phase \u2014 let the dust settle before re-entering.' },
        { id: 'bottom-fish-1992-4', text: 'BOTTOM FISH \u2014 The scam was one man. India is still liberalizing. Buy the fear.', portfolioImpact: 0.15, riskAppetite: 15, innovationBias: 5, lossTolerance: 20, contrarianScore: 20, decisionSpeed: 10, indiaInstinct: 15, annotation: 'Separated the scam from the structural India story \u2014 contrarian conviction.' },
      ],
    },
    {
      title: 'SEBI GETS REAL POWERS \u2014 MARKET REGULATION BORN',
      brief: 'In the aftermath of the scam, SEBI is given statutory powers to regulate Indian markets. New rules on disclosure, insider trading, and market manipulation are introduced.',
      choices: [
        { id: 'believe-reform-1992-5', text: 'REGULATION IS BULLISH \u2014 Clean markets attract more capital. This is good for India.', portfolioImpact: 0.10, riskAppetite: 5, innovationBias: 10, lossTolerance: 5, contrarianScore: 10, decisionSpeed: -5, indiaInstinct: 15, annotation: 'Understood that regulation builds trust and attracts institutional capital.' },
        { id: 'skeptical-1992-5', text: 'INDIAN REGULATION IS A JOKE \u2014 Nothing changes. The system protects the powerful.', portfolioImpact: -0.03, riskAppetite: -5, innovationBias: -10, lossTolerance: -5, contrarianScore: -5, decisionSpeed: 0, indiaInstinct: -10, annotation: 'Cynicism toward institutional reform \u2014 missed that SEBI would genuinely transform Indian markets.' },
      ],
    },
    {
      title: 'ONE YEAR LATER \u2014 LESSONS FROM THE WRECKAGE',
      brief: 'The scam destroyed retail investor trust for a generation. But companies like Infosys, HDFC, and Reliance kept building. The India story was bigger than one scammer.',
      choices: [
        { id: 'long-india-1992-6', text: 'GO LONG INDIA \u2014 The scam was a speed bump. The destination is unchanged. Build positions for the decade.', portfolioImpact: 0.20, riskAppetite: 10, innovationBias: 10, lossTolerance: 15, contrarianScore: 10, decisionSpeed: -10, indiaInstinct: 20, annotation: 'Long-term conviction survived short-term fraud \u2014 the hallmark of great investors.' },
        { id: 'never-again-1992-6', text: 'NEVER AGAIN \u2014 The Indian market is a casino. Put money in FDs and gold only.', portfolioImpact: 0.01, riskAppetite: -20, innovationBias: -15, lossTolerance: -15, contrarianScore: -10, decisionSpeed: 0, indiaInstinct: -20, annotation: 'Trauma-driven exit from equities \u2014 the scam achieved its worst outcome: killing investor confidence.' },
      ],
    },
  ],
  optimalPath: [1, 0, 1, 1, 0, 0],
  biases: {
    'Herd Mentality': 'You followed the Big Bull without questioning where the money was coming from \u2014 social proof overrode fundamental analysis.',
    'Normalcy Bias': 'You assumed the market would keep going up because it had been going up \u2014 ignoring the exponential impossibility of the rally.',
    'Confirmation Bias': 'You only consumed bullish news and ignored the investigative journalism that was uncovering the fraud.',
    'Recency Bias': 'You let the trauma of the scam permanently color your view of Indian markets \u2014 missing decades of legitimate wealth creation.',
    'Availability Bias': 'The vivid, emotional nature of the scam made it feel more common than it was \u2014 leading to permanent risk aversion.',
  },
};
