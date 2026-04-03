import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Users, TrendingUp, AlertTriangle, Newspaper, BarChart3 } from 'lucide-react';

interface CompanyProfileModalProps {
  company: any;
  onClose: () => void;
}

export function CompanyProfileModal({ company, onClose }: CompanyProfileModalProps) {
  if (!company) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-parchment border-4 border-dark-sepia shadow-[8px_8px_0px_var(--sepia)] max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-tan-mid transition-colors"
          >
            <X className="w-6 h-6 text-ink" />
          </button>

          <div className="p-8 space-y-8">
            <div className="border-b-2 border-dark-sepia pb-6">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-4xl font-bold font-serif text-ink">{company.name}</h2>
                {company.failed && (
                  <span className="px-3 py-1 bg-rust text-parchment text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Failed Entity
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm font-mono text-dark-sepia uppercase tracking-wider">
                <span>Sector: {company.sector}</span>
                {company.analystRating && (
                  <>
                    <span>•</span>
                    <span className={`font-bold ${
                      company.analystRating === 'Buy' ? 'text-green-700' :
                      company.analystRating === 'Sell' ? 'text-rust' : 'text-ink'
                    }`}>
                      Rating: {company.analystRating}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-tan-mid pb-1">
                    <Building2 className="w-5 h-5 text-dark-sepia" /> Business Overview
                  </h3>
                  <p className="text-ink leading-relaxed">{company.description}</p>
                </section>

                {company.keyProducts && (
                  <section>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-tan-mid pb-1">
                      <BarChart3 className="w-5 h-5 text-dark-sepia" /> Key Products / Services
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-ink">
                      {company.keyProducts.map((product: string, i: number) => (
                        <li key={i}>{product}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {company.leadership && (
                  <section>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-tan-mid pb-1">
                      <Users className="w-5 h-5 text-dark-sepia" /> Leadership
                    </h3>
                    <p className="text-ink">{company.leadership}</p>
                  </section>
                )}

                {company.financialHealth && (
                  <section>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-tan-mid pb-1">
                      <TrendingUp className="w-5 h-5 text-dark-sepia" /> Financial Health
                    </h3>
                    <p className="text-ink">{company.financialHealth}</p>
                  </section>
                )}
              </div>

              <div className="space-y-6">
                {(company.bullCase || company.bearCase) && (
                  <section className="space-y-4">
                    {company.bullCase && (
                      <div className="bg-green-900/5 border border-green-900/20 p-4">
                        <h4 className="font-bold text-green-800 mb-2 uppercase text-xs tracking-widest">What Bulls Say</h4>
                        <p className="text-sm text-ink">{company.bullCase}</p>
                      </div>
                    )}
                    {company.bearCase && (
                      <div className="bg-rust/5 border border-rust/20 p-4">
                        <h4 className="font-bold text-rust mb-2 uppercase text-xs tracking-widest">What Bears Say</h4>
                        <p className="text-sm text-ink">{company.bearCase}</p>
                      </div>
                    )}
                  </section>
                )}

                {company.recentNews && (
                  <section>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3 border-b border-tan-mid pb-1">
                      <Newspaper className="w-5 h-5 text-dark-sepia" /> Recent News
                    </h3>
                    <ul className="space-y-3">
                      {company.recentNews.map((news: string, i: number) => (
                        <li key={i} className="text-sm text-ink flex gap-2">
                          <span className="text-dark-sepia mt-1">■</span>
                          <span>{news}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {company.failed && company.collapseLesson && (
                  <section className="mt-8 bg-rust/10 border-2 border-rust p-6">
                    <h3 className="text-xl font-bold text-rust flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-6 h-6" /> Post-Mortem Analysis
                    </h3>
                    <p className="font-mono text-sm mb-2 opacity-70">Collapsed: {company.collapseYear}</p>
                    <p className="text-ink italic font-serif leading-relaxed">
                      "{company.collapseLesson}"
                    </p>
                  </section>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
