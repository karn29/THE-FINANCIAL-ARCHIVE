export const indiaLiberalization1991 = {
  id: 'india-liberalization-1991',
  name: 'India Liberalization',
  year: 1991,
  threatLevel: 'CRITICAL' as const,
  hook: 'The IMF gave us 15 days. Manmohan opened the gates. Would you have bet on India?',
  legendaryInvestor: 'Rakesh Jhunjhunwala',
  legendaryAction: 'Jhunjhunwala saw the liberalization wave before anyone else. He loaded up on Tata Tea and TITAN, riding the wave of a newly opened Indian economy for decades.',
  briefing: {
    date: 'July 24, 1991',
    context: 'India has only $1.2 billion in forex reserves \u2014 enough for 15 days of imports. The IMF demands structural reform as a condition for a bailout loan. Prime Minister Narasimha Rao appoints Manmohan Singh as Finance Minister. Singh is about to present a budget that will dismantle the License Raj and open India to the world. The Sensex is at 1,100. Nobody knows if this is the end of India or the beginning.',
    fearGreed: 25,
    sectors: [
      { name: 'Banking', momentum: 20 },
      { name: 'IT Services', momentum: 55 },
      { name: 'Pharma', momentum: 45 },
      { name: 'Steel', momentum: 30 },
      { name: 'FMCG', momentum: 60 },
      { name: 'Textiles', momentum: 35 },
      { name: 'Auto', momentum: 40 },
      { name: 'Infrastructure', momentum: 25 },
    ],
    headlines: [
      'INDIA PLEDGES 67 TONNES OF GOLD TO BANK OF ENGLAND FOR EMERGENCY LOAN',
      'MANMOHAN SINGH APPOINTED FINANCE MINISTER \u2014 MARKETS UNCERTAIN',
      'IMF DEMANDS STRUCTURAL REFORMS IN EXCHANGE FOR $2.2 BILLION BAILOUT',
      'RUPEE DEVALUED 18% IN TWO DAYS \u2014 IMPORT COSTS SURGE',
      'LICENSE RAJ TO BE DISMANTLED \u2014 INDUSTRIAL POLICY OVERHAUL ANNOUNCED',
      'FOREIGN INSTITUTIONAL INVESTORS MAY SOON BE ALLOWED INTO INDIAN MARKETS',
    ],
  },
  companies: [
    { name: 'Infosys', sector: 'IT Services', price: 145, sparkline: [95,98,100,105,108,110,112,115,118,120,122,125,128,130,132,134,136,138,140,142,143,144,145,144,143,144,145,144,143,145], sentiment: 'CAUTIOUS OPTIMISM' },
    { name: 'Reliance Industries', sector: 'Petrochemicals', price: 82, sparkline: [60,62,65,68,70,72,74,75,76,78,79,80,81,80,79,80,81,82,81,80,81,82,81,80,81,82,82,81,82,82], sentiment: 'HOLD' },
    { name: 'HDFC', sector: 'Banking', price: 195, sparkline: [150,155,160,165,168,170,172,175,178,180,182,184,186,188,190,191,192,193,194,195,194,193,194,195,194,193,194,195,195,195], sentiment: 'STRONG BUY' },
    { name: 'Tata Steel', sector: 'Steel', price: 110, sparkline: [90,92,95,98,100,102,104,105,106,107,108,109,110,109,108,109,110,109,108,109,110,109,108,109,110,110,109,110,110,110], sentiment: 'NEUTRAL' },
    { name: 'Hindustan Lever', sector: 'FMCG', price: 320, sparkline: [280,285,290,295,298,300,302,305,308,310,312,314,315,316,317,318,319,320,319,318,319,320,319,318,319,320,320,319,320,320], sentiment: 'SAFE BET' },
  ],
  events: [
    {
      title: 'MANMOHAN SINGH PRESENTS THE UNION BUDGET \u2014 INDIA OPENS UP',
      brief: 'The Finance Minister declares: "No power on earth can stop an idea whose time has come." Industrial licensing abolished. Import tariffs slashed. FDI caps raised. The License Raj is officially dead.',
      choices: [
        { id: 'go-all-in-1991-1', text: 'GO ALL IN ON INDIA \u2014 This is the birth of modern India. Buy everything.', portfolioImpact: 0.20, riskAppetite: 20, innovationBias: 15, lossTolerance: 10, contrarianScore: 20, decisionSpeed: 15, indiaInstinct: 25, annotation: 'Bet on India at its most uncertain moment \u2014 maximum conviction, maximum reward.' },
        { id: 'wait-see-1991-1', text: 'WAIT AND SEE \u2014 Reform announcements do not equal execution. India has disappointed before.', portfolioImpact: 0.02, riskAppetite: -10, innovationBias: -5, lossTolerance: 5, contrarianScore: -10, decisionSpeed: -10, indiaInstinct: -5, annotation: 'Skepticism toward reform promises \u2014 historically justified but missed the inflection.' },
      ],
    },
    {
      title: 'RUPEE CRASHES 18% \u2014 PANIC IN THE BAZAAR',
      brief: 'The government devalues the rupee in two steps. Import prices explode. Inflation fears grip the nation. Gold prices surge as households hoard.',
      choices: [
        { id: 'buy-exporters-1991-2', text: 'BUY EXPORTERS \u2014 A weaker rupee makes Indian IT and textiles globally competitive.', portfolioImpact: 0.15, riskAppetite: 10, innovationBias: 10, lossTolerance: 5, contrarianScore: 15, decisionSpeed: 10, indiaInstinct: 15, annotation: 'Connected currency devaluation to export competitiveness \u2014 sophisticated macro thinking.' },
        { id: 'sell-panic-1991-2', text: 'SELL \u2014 A currency crash is a sign of a failing state. Get out before it gets worse.', portfolioImpact: -0.10, riskAppetite: -15, innovationBias: -5, lossTolerance: -15, contrarianScore: -10, decisionSpeed: 10, indiaInstinct: -15, annotation: 'Conflated currency adjustment with national failure \u2014 missed that devaluation was the medicine.' },
      ],
    },
    {
      title: 'FOREIGN INVESTORS ALLOWED IN \u2014 FII ROUTE OPENS',
      brief: 'For the first time in history, foreign institutional investors can buy Indian equities directly. Global fund managers begin studying Indian companies.',
      choices: [
        { id: 'front-run-fii-1991-3', text: 'FRONT-RUN THE FII MONEY \u2014 Buy blue chips before the foreign wall of money arrives.', portfolioImpact: 0.18, riskAppetite: 15, innovationBias: 5, lossTolerance: 10, contrarianScore: 10, decisionSpeed: 15, indiaInstinct: 20, annotation: 'Anticipated the structural flow of foreign capital \u2014 institutional-grade thinking.' },
        { id: 'cautious-1991-3', text: 'STAY CAUTIOUS \u2014 Foreign money is hot money. It comes fast and leaves faster.', portfolioImpact: 0.03, riskAppetite: -10, innovationBias: -5, lossTolerance: 5, contrarianScore: 5, decisionSpeed: -5, indiaInstinct: -5, annotation: 'Valid concern about hot money flows \u2014 but underestimated the structural nature of this opening.' },
      ],
    },
    {
      title: 'INFOSYS IPO \u2014 THE FUTURE ARRIVES',
      brief: 'A small Bangalore-based software company lists on the stock exchange. Most investors ignore it. IT services is not a real industry, they say. The founders own 75% of the stock.',
      choices: [
        { id: 'buy-infosys-1991-4', text: 'BUY INFOSYS \u2014 Software is the future. India has the engineers. This is the one.', portfolioImpact: 0.35, riskAppetite: 15, innovationBias: 25, lossTolerance: 10, contrarianScore: 25, decisionSpeed: 10, indiaInstinct: 20, annotation: 'Identified the IT revolution before the market \u2014 visionary contrarian thinking.' },
        { id: 'skip-infosys-1991-4', text: 'SKIP IT \u2014 Stick to real businesses. Manufacturing, banks, commodities.', portfolioImpact: 0.02, riskAppetite: -5, innovationBias: -20, lossTolerance: 0, contrarianScore: -15, decisionSpeed: 0, indiaInstinct: -10, annotation: 'Anchored to traditional industries \u2014 missed the paradigm shift in Indian economic structure.' },
      ],
    },
    {
      title: 'POLITICAL CRISIS \u2014 OPPOSITION CALLS REFORMS ANTI-NATIONAL',
      brief: 'The opposition BJP and Left Front attack liberalization as surrender to IMF imperialism. Strikes called across industrial belts. The reform agenda faces its first political test.',
      choices: [
        { id: 'hold-conviction-1991-5', text: 'HOLD \u2014 Reforms are irreversible. No government can put the genie back in the bottle.', portfolioImpact: 0.08, riskAppetite: 5, innovationBias: 5, lossTolerance: 15, contrarianScore: 10, decisionSpeed: -5, indiaInstinct: 15, annotation: 'Understood that liberalization was a structural shift, not a political whim.' },
        { id: 'reduce-exposure-1991-5', text: 'REDUCE EXPOSURE \u2014 Political instability could reverse everything overnight.', portfolioImpact: -0.05, riskAppetite: -10, innovationBias: -5, lossTolerance: -10, contrarianScore: -10, decisionSpeed: 5, indiaInstinct: -10, annotation: 'Overweighted political noise over economic fundamentals.' },
      ],
    },
    {
      title: 'SENSEX CROSSES 2,000 \u2014 THE NEW INDIA RALLY',
      brief: 'Within months, the Sensex has nearly doubled. New demat accounts are being opened. India is on the cover of The Economist. The Nifty 50 companies are being born.',
      choices: [
        { id: 'ride-wave-1991-6', text: 'RIDE THE WAVE \u2014 This is just the beginning. Hold for 10 years minimum.', portfolioImpact: 0.25, riskAppetite: 10, innovationBias: 10, lossTolerance: 15, contrarianScore: 5, decisionSpeed: -10, indiaInstinct: 20, annotation: 'Long-term conviction in the India growth story \u2014 the right call for the next three decades.' },
        { id: 'book-profits-1991-6', text: 'BOOK PROFITS \u2014 100% return is enough. Nobody went broke taking profits.', portfolioImpact: 0.10, riskAppetite: -10, innovationBias: -5, lossTolerance: -5, contrarianScore: -5, decisionSpeed: 10, indiaInstinct: -5, annotation: 'Sensible profit-booking \u2014 but left generational wealth on the table.' },
      ],
    },
  ],
  optimalPath: [0, 0, 0, 0, 0, 0],
  biases: {
    'Confirmation Bias': 'You only invested in what felt familiar \u2014 missing the new sectors that liberalization was about to create.',
    'Status Quo Bias': 'You assumed India would remain the same closed economy it had always been \u2014 missing the structural break.',
    'Recency Bias': 'You focused on the immediate crisis (currency crash, political noise) rather than the long-term structural reform.',
    'Home Bias': 'Ironically, Indian investors were the most skeptical of the India story \u2014 foreigners saw it first.',
    'Anchoring': 'You anchored to pre-reform valuations, missing that the entire framework for valuing Indian companies had changed.',
  },
};
