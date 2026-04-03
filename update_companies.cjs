const fs = require('fs');

const data2008 = JSON.parse(fs.readFileSync('src/data/scenarios/2008-crisis.json', 'utf8'));

const companyProfiles = {
  "Amazon": {
    keyProducts: ["E-commerce platform", "AWS (early stages)", "Kindle"],
    leadership: "Jeff Bezos (CEO)",
    financialHealth: "Revenue growing rapidly, but margins still thin. Low debt.",
    bullCase: "E-commerce is the future of retail, and AWS is a hidden gem.",
    bearCase: "Valuation is too high, and consumer spending will drop in a recession.",
    recentNews: ["Amazon launches Kindle", "AWS gaining traction among startups"],
    analystRating: "Buy"
  },
  "Apple": {
    keyProducts: ["iPhone", "Mac", "iPod"],
    leadership: "Steve Jobs (CEO)",
    financialHealth: "Strong cash position, zero debt, explosive revenue growth.",
    bullCase: "The iPhone is a revolutionary product with massive addressable market.",
    bearCase: "Consumer discretionary spending will plummet, hurting premium products.",
    recentNews: ["iPhone 3G launched", "App Store opens"],
    analystRating: "Buy"
  },
  "Citigroup": {
    keyProducts: ["Consumer banking", "Investment banking", "Wealth management"],
    leadership: "Vikram Pandit (CEO)",
    financialHealth: "Massive exposure to toxic CDOs, requiring multiple government bailouts.",
    bullCase: "Too big to fail, government will backstop losses.",
    bearCase: "Insolvent without government intervention, equity will be diluted.",
    recentNews: ["Citi announces massive write-downs", "Government injects capital"],
    analystRating: "Sell"
  },
  "JPMorgan": {
    keyProducts: ["Investment banking", "Commercial banking", "Asset management"],
    leadership: "Jamie Dimon (CEO)",
    financialHealth: "Fortress balance sheet, avoided the worst of the subprime mess.",
    bullCase: "Will emerge stronger by acquiring weaker rivals (Bear Stearns, WaMu).",
    bearCase: "Systemic risk could drag down even the strongest banks.",
    recentNews: ["JPM acquires Bear Stearns", "JPM acquires Washington Mutual"],
    analystRating: "Hold"
  },
  "Exxon": {
    keyProducts: ["Oil exploration", "Refining", "Chemicals"],
    leadership: "Rex Tillerson (CEO)",
    financialHealth: "Record profits in early 2008, strong balance sheet.",
    bullCase: "Global demand for energy will continue to rise long-term.",
    bearCase: "Oil prices are crashing as global recession destroys demand.",
    recentNews: ["Oil hits $147/barrel then crashes", "Exxon reports record profits"],
    analystRating: "Hold"
  },
  "J&J": {
    keyProducts: ["Pharmaceuticals", "Medical devices", "Consumer health"],
    leadership: "William Weldon (CEO)",
    financialHealth: "AAA credit rating, steady cash flows, strong dividend.",
    bullCase: "Defensive stock, people still need healthcare in a recession.",
    bearCase: "Growth is slow, pipeline concerns.",
    recentNews: ["J&J maintains dividend", "FDA approves new drug"],
    analystRating: "Buy"
  },
  "Simon Prop": {
    keyProducts: ["Shopping malls", "Premium outlets"],
    leadership: "David Simon (CEO)",
    financialHealth: "High debt levels typical of REITs, facing refinancing risks.",
    bullCase: "High-quality assets will survive the downturn.",
    bearCase: "Retailers going bankrupt will lead to high vacancy rates.",
    recentNews: ["Retail bankruptcies rise", "Credit markets freeze"],
    analystRating: "Hold"
  },
  "Walmart": {
    keyProducts: ["Discount retail", "Groceries"],
    leadership: "Lee Scott (CEO)",
    financialHealth: "Strong cash flow, counter-cyclical business model.",
    bullCase: "Consumers will trade down to discount retailers in a recession.",
    bearCase: "Even discount retail will suffer if unemployment spikes too high.",
    recentNews: ["Walmart sees sales increase", "Consumers trading down"],
    analystRating: "Buy"
  },
  "GE": {
    keyProducts: ["Aviation", "Healthcare", "GE Capital"],
    leadership: "Jeff Immelt (CEO)",
    financialHealth: "Heavy reliance on GE Capital for profits, facing severe liquidity crisis.",
    bullCase: "Industrial businesses remain strong.",
    bearCase: "GE Capital is a black box of risk, dividend is in danger.",
    recentNews: ["GE cuts dividend", "Warren Buffett invests $3B in GE"],
    analystRating: "Sell"
  },
  "BHP": {
    keyProducts: ["Iron ore", "Copper", "Coal"],
    leadership: "Marius Kloppers (CEO)",
    financialHealth: "Strong cash flows from China boom, but commodity prices crashing.",
    bullCase: "China's stimulus will revive commodity demand.",
    bearCase: "Global recession will destroy demand for industrial metals.",
    recentNews: ["Commodity prices crash", "BHP abandons Rio Tinto bid"],
    analystRating: "Hold"
  },
  "Lehman Brothers": {
    keyProducts: ["Investment banking", "Fixed income", "Mortgage origination"],
    leadership: "Richard Fuld (CEO)",
    financialHealth: "Massive leverage (30:1), huge exposure to toxic real estate assets.",
    bullCase: "The government will orchestrate a rescue like Bear Stearns.",
    bearCase: "The firm is insolvent and counterparties are pulling back.",
    recentNews: ["Lehman seeks capital injection", "Korea Development Bank walks away"],
    analystRating: "Sell",
    failed: true,
    collapseYear: 2008,
    collapseLesson: "Excessive leverage and reliance on short-term funding for illiquid assets."
  }
};

// Add Lehman Brothers to Banking sector
const bankingSector = data2008.scenarioMeta.sectors.find(s => s.name === 'Banking');
bankingSector.companies.push({
  name: "Lehman Brothers",
  sector: "Banking",
  initialPrice: 60,
  finalPrice: 0,
  description: "Global investment bank heavily exposed to subprime mortgages."
});

data2008.scenarioMeta.sectors.forEach(sector => {
  sector.companies.forEach(company => {
    const profile = companyProfiles[company.name];
    if (profile) {
      Object.assign(company, profile);
    }
  });
});

fs.writeFileSync('src/data/scenarios/2008-crisis.json', JSON.stringify(data2008, null, 2));

const data1991 = JSON.parse(fs.readFileSync('src/data/scenarios/india-1991.json', 'utf8'));

const companyProfiles1991 = {
  "Reliance": {
    keyProducts: ["Textiles", "Petrochemicals"],
    leadership: "Dhirubhai Ambani",
    financialHealth: "Highly leveraged but rapidly expanding capacity.",
    bullCase: "Master of navigating the License Raj, poised to benefit from deregulation.",
    bearCase: "High debt and political risk if the new government changes policies.",
    recentNews: ["Hazira petrochemical plant expansion", "Lobbying for tariff protection"],
    analystRating: "Buy"
  },
  "Tata Steel": {
    keyProducts: ["Steel", "Iron"],
    leadership: "Russi Mody",
    financialHealth: "Solid but burdened by outdated technology and excess labor.",
    bullCase: "Core infrastructure play for a developing nation.",
    bearCase: "Inefficient and vulnerable to cheaper imports if tariffs fall.",
    recentNews: ["Modernization program announced", "Labor union negotiations"],
    analystRating: "Hold"
  },
  "Infosys": {
    keyProducts: ["IT Services", "Software exports"],
    leadership: "N. R. Narayana Murthy",
    financialHealth: "Small, bootstrapped, highly profitable but capital constrained.",
    bullCase: "Global labor arbitrage and software boom.",
    bearCase: "Too small, vulnerable to currency fluctuations and brain drain.",
    recentNews: ["Secures new US clients", "Struggles with import licenses for computers"],
    analystRating: "Buy"
  },
  "HUL": {
    keyProducts: ["Soaps", "Detergents", "Personal care"],
    leadership: "S. M. Datta",
    financialHealth: "Cash-rich, dominant market share, strong distribution.",
    bullCase: "Rising middle class will drive consumer spending.",
    bearCase: "Multinational status makes it a target for political backlash.",
    recentNews: ["Launches new detergent brand", "Faces competition from local players"],
    analystRating: "Hold"
  },
  "SBI": {
    keyProducts: ["Corporate banking", "Retail banking"],
    leadership: "M. N. Goiporia",
    financialHealth: "Massive deposit base but burdened by non-performing assets (NPAs).",
    bullCase: "Proxy for the Indian economy, too big to fail.",
    bearCase: "Inefficient, bureaucratic, and forced to lend to priority sectors.",
    recentNews: ["Government mandates debt waiver scheme", "Profits squeezed"],
    analystRating: "Hold"
  },
  "L&T": {
    keyProducts: ["Engineering", "Construction", "Manufacturing"],
    leadership: "U. V. Rao",
    financialHealth: "Strong order book but facing working capital constraints.",
    bullCase: "Will build the infrastructure India desperately needs.",
    bearCase: "Government spending cuts will hurt order inflows.",
    recentNews: ["Wins major power plant contract", "Delayed payments from government"],
    analystRating: "Buy"
  },
  "Maruti": {
    keyProducts: ["Passenger cars"],
    leadership: "R. C. Bhargava",
    financialHealth: "Profitable monopoly, backed by government and Suzuki.",
    bullCase: "Untapped demand for personal mobility.",
    bearCase: "Devaluation makes imported components expensive.",
    recentNews: ["Maruti 800 sales boom", "Waitlists stretch to years"],
    analystRating: "Buy"
  },
  "Sun Pharma": {
    keyProducts: ["Generic drugs", "Psychiatry formulations"],
    leadership: "Dilip Shanghvi",
    financialHealth: "Small, niche player with high margins.",
    bullCase: "Process patent regime allows reverse engineering of global drugs.",
    bearCase: "Regulatory risks and lack of R&D scale.",
    recentNews: ["Expands manufacturing facility", "Launches new generic formulation"],
    analystRating: "Buy"
  }
};

data1991.scenarioMeta.sectors.forEach(sector => {
  sector.companies.forEach(company => {
    const profile = companyProfiles1991[company.name];
    if (profile) {
      Object.assign(company, profile);
    }
  });
});

fs.writeFileSync('src/data/scenarios/india-1991.json', JSON.stringify(data1991, null, 2));

console.log("Updated JSON files");
