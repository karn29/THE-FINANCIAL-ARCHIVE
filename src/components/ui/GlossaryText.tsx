import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const glossary: Record<string, string> = {
  'Quantitative Easing': 'A monetary policy where a central bank buys government bonds or other financial assets to inject money into the economy to expand economic activity.',
  'P/E Ratio': 'Price-to-Earnings Ratio. The ratio for valuing a company that measures its current share price relative to its per-share earnings.',
  'Yield Curve': 'A line that plots yields (interest rates) of bonds having equal credit quality but differing maturity dates.',
  'Inflation': 'The rate at which the general level of prices for goods and services is rising, and, consequently, the purchasing power of currency is falling.',
  'Interest Rate': 'The amount charged, expressed as a percentage of principal, by a lender to a borrower for the use of assets.',
  'Recession': 'A macroeconomic term that refers to a significant decline in general economic activity in a designated region.',
  'Bull Market': 'A market in which share prices are rising, encouraging buying.',
  'Bear Market': 'A market in which prices are falling, encouraging selling.',
  'Dividend': 'A distribution of a portion of a company\'s earnings, decided by the board of directors, paid to a class of its shareholders.',
  'Volatility': 'A statistical measure of the dispersion of returns for a given security or market index.',
  'Liquidity': 'The degree to which an asset or security can be quickly bought or sold in the market without affecting the asset\'s price.',
  'Hedge Fund': 'A pooled investment fund that trades in relatively liquid assets and is able to make extensive use of more complex trading, portfolio-construction and risk management techniques.',
  'Index Fund': 'A type of mutual fund or exchange-traded fund (ETF) with a portfolio constructed to match or track the components of a financial market index.',
  'Value Investing': 'An investment strategy that involves picking stocks that appear to be trading for less than their intrinsic or book value.',
  'Growth Investing': 'An investment style and strategy that is focused on increasing an investor\'s capital. Growth investors typically invest in growth stocks.'
};

interface GlossaryTextProps {
  text: string;
}

export const GlossaryText: React.FC<GlossaryTextProps> = ({ text }) => {
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Create a regex to match any of the glossary terms (case-insensitive)
  const terms = Object.keys(glossary);
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the matched term
    const term = match[0];
    const originalTerm = terms.find(t => t.toLowerCase() === term.toLowerCase()) || term;
    
    parts.push(
      <span
        key={match.index}
        className="border-b border-dotted border-ink cursor-help relative inline-block"
        onMouseEnter={(e) => {
          setHoveredTerm(originalTerm);
        }}
        onMouseMove={(e) => {
          setMousePos({ x: e.clientX, y: e.clientY });
        }}
        onMouseLeave={() => setHoveredTerm(null)}
      >
        {term}
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <>
      {parts.length > 0 ? parts : text}
      <AnimatePresence>
        {hoveredTerm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 bg-ink text-parchment p-4 max-w-xs text-sm font-mono shadow-[4px_4px_0px_var(--sepia)] pointer-events-none"
            style={{ 
              left: Math.min(mousePos.x + 15, window.innerWidth - 320), 
              top: Math.min(mousePos.y + 15, window.innerHeight - 100) 
            }}
          >
            <strong className="block mb-1 uppercase tracking-widest text-tan-mid">{hoveredTerm}</strong>
            {glossary[hoveredTerm]}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
