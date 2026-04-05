import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { allScenarioCards } from '../../data/market';
import { allBoardroomCards } from '../../data/boardroom';

function AnimatedCandlestick() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let offset = 0;
    const candleWidth = 12;
    const gap = 6;
    const totalWidth = candleWidth + gap;

    function generateCandle(x: number) {
      const open = 200 + Math.sin(x * 0.02) * 80 + Math.random() * 60;
      const close = open + (Math.random() - 0.45) * 80;
      const high = Math.max(open, close) + Math.random() * 30;
      const low = Math.min(open, close) - Math.random() * 30;
      return { open, close, high, low };
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numCandles = Math.ceil(canvas.width / totalWidth) + 2;

      for (let i = 0; i < numCandles; i++) {
        const x = i * totalWidth - (offset % totalWidth);
        const candle = generateCandle(i + Math.floor(offset / totalWidth));
        const isGreen = candle.close > candle.open;
        const color = isGreen ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 45, 85, 0.4)';

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, canvas.height - candle.high);
        ctx.lineTo(x + candleWidth / 2, canvas.height - candle.low);
        ctx.stroke();

        ctx.fillStyle = color;
        const bodyTop = canvas.height - Math.max(candle.open, candle.close);
        const bodyHeight = Math.abs(candle.close - candle.open);
        ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 1));
      }

      offset += 0.5;
      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{ filter: 'blur(2px)' }}
    />
  );
}

const tickerItems = [
  '1929 \u00b7 BLACK TUESDAY \u00b7 DOW \u221289%',
  '1991 \u00b7 INDIA LIBERALIZATION \u00b7 SENSEX \u00d710',
  '1992 \u00b7 HARSHAD MEHTA \u00b7 \u20b95000CR SCAM',
  '2000 \u00b7 DOT-COM \u00b7 $5T WIPED',
  '2008 \u00b7 LEHMAN \u00b7 CHAPTER 11',
  '2020 \u00b7 COVID CRASH \u00b7 \u221234% IN 33 DAYS',
  '2021 \u00b7 ADANI \u00b7 SHORT REPORT',
  'ZOMATO IPO \u00b7 YES BANK COLLAPSE',
];

const marketInsights = [
  'The average investor underperforms the S&P 500 by 4.3% annually due to emotional decision-making.',
  'In 1929, margin debt was 8.5% of GDP. In 2021, it was 3.8%. History does not repeat, but it rhymes.',
  '90% of traders lose money. The 10% who win share one trait: they cut losses fast.',
  'India Sensex has returned 15% CAGR since 1991 liberalization. Patience is the only edge.',
  'Buffett made 99% of his wealth after age 50. Compounding rewards those who stay in the game.',
  'The 2008 crash wiped $10 trillion in US household wealth. It recovered in 5 years.',
  'Harshad Mehta moved ACC cement from 200 to 10,000. It was back to 200 in months.',
  'AWS started as a side project inside Amazon. It now generates more profit than e-commerce.',
  'Netflix stock dropped 77% in 2011. Those who held through saw a 8,500% return.',
  'India has more demat accounts (130M+) than the population of Japan.',
];

export function LandingPage() {
  const navigate = useNavigate();
  const [insightIndex, setInsightIndex] = useState(0);
  const [playedToday] = useState(() => Math.floor(Math.random() * 400 + 200));

  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex(prev => (prev + 1) % marketInsights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const archiveCards = [
    ...allScenarioCards.map(s => ({ ...s, type: 'market' as const })),
    ...allBoardroomCards.map(s => ({ ...s, type: 'boardroom' as const, name: s.company, hook: s.stakes, threatLevel: 'CLASSIFIED' as const })),
  ];

  return (
    <div className="min-h-screen bg-[#07080D] relative">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedCandlestick />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[96px] font-extrabold text-white tracking-[0.15em] leading-none"
          >
            FINCRAFT<span className="text-[#00FF88] cursor-blink">_</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-body text-lg text-[#8A8F98] mt-4 max-w-xl mx-auto italic"
          >
            Every crisis was predictable. The question is whether you were in the room.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-4 mt-10 justify-center"
          >
            <button
              onClick={() => navigate('/market')}
              className="bg-transparent border border-[#00FF88] text-[#00FF88] px-8 py-4 font-mono text-sm tracking-widest hover:bg-[#00FF88] hover:text-[#07080D] transition-all duration-200 glow-border"
            >
              {'>'}_ENTER THE MARKET
            </button>
            <button
              onClick={() => navigate('/boardroom')}
              className="bg-transparent border border-[#00FF88] text-[#00FF88] px-8 py-4 font-mono text-sm tracking-widest hover:bg-[#00FF88] hover:text-[#07080D] transition-all duration-200 glow-border"
            >
              {'>'}_TAKE THE BOARDROOM
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: '14,000+', label: 'decisions logged' },
            { value: '8', label: 'historical scenarios' },
            { value: '\u20b90 real money \u00b7 100% real stakes', label: '' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#12141A] border border-[#1E2028] p-8 text-center scanlines"
            >
              <div className="font-mono text-3xl text-[#00FF88] font-bold">{stat.value}</div>
              {stat.label && <div className="font-body text-sm text-[#8A8F98] mt-2">{stat.label}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Archive */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl text-white tracking-widest uppercase mb-8">The Archive</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {archiveCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="min-w-[280px] bg-[#12141A] border border-[#1E2028] p-5 flex-shrink-0 hover:border-[#00FF88] transition-colors cursor-pointer scanlines"
                onClick={() => navigate(card.type === 'market' ? `/market/${card.id}` : `/boardroom/${card.id}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[#F5A623] text-sm font-bold">{card.year}</span>
                  <span className={`pill-badge ${card.type === 'market' ? 'bg-[#FF2D55]/20 text-[#FF2D55]' : 'bg-[#F5A623]/20 text-[#F5A623]'}`}>
                    {card.type === 'market' ? (card as typeof allScenarioCards[0]).threatLevel : 'CLASSIFIED'}
                  </span>
                </div>
                <h3 className="font-display text-white text-lg font-bold mb-2">{card.name}</h3>
                <p className="font-body text-[#8A8F98] text-sm">{card.type === 'market' ? (card as typeof allScenarioCards[0]).hook : (card as typeof allBoardroomCards[0]).stakes}</p>
                <div className="font-mono text-[9px] text-[#8A8F98] mt-3 tracking-widest uppercase">
                  {card.type === 'market' ? 'MARKET SIMULATOR' : 'BOARDROOM SIMULATOR'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insight */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto bg-[#12141A] border border-[#1E2028] p-8 scanlines">
          <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-3 uppercase">Market Insight</div>
          <motion.p
            key={insightIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-body text-[#E8E8E8] text-base leading-relaxed"
          >
            {marketInsights[insightIndex]}<span className="text-[#00FF88] cursor-blink">_</span>
          </motion.p>
        </div>
      </section>

      {/* Your Identity */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-white tracking-widest uppercase mb-6">Your Identity</h2>
          <div className="space-y-3 font-body text-[#8A8F98] text-lg">
            <p>Every decision you make builds your financial fingerprint.</p>
            <p>Your risk appetite. Your bias. Your edge.</p>
            <p className="text-[#00FF88] font-semibold">See who you really are.</p>
          </div>
        </div>
      </section>

      {/* Players Counter */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="font-mono text-sm text-[#8A8F98]">
            <span className="text-[#00FF88] font-bold">{playedToday}</span> people played today
          </div>
        </div>
      </section>

      {/* Bloomberg Ticker */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#07080D] border-t border-[#1E2028] py-2 z-40 overflow-hidden no-print">
        <div className="ticker-scroll whitespace-nowrap flex">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-mono text-xs text-[#8A8F98] mx-6 inline-block">
              <span className="text-[#00FF88]">\u25CF</span> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
