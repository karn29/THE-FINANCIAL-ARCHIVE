import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
}

export function UserOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('boardroom_user_onboarded');
    if (!hasOnboarded) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      localStorage.setItem('boardroom_user_onboarded', 'true');
      localStorage.setItem('boardroom_user_data', JSON.stringify(formData));
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-parchment border-4 border-dark-sepia shadow-[12px_12px_0px_var(--sepia)] max-w-md w-full relative overflow-hidden"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-dark-sepia"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-dark-sepia"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-dark-sepia"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-dark-sepia"></div>

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-ink rounded-full flex items-center justify-center text-parchment">
                <BookOpen className="w-8 h-8" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-serif text-ink mb-2">Welcome to The Boardroom</h2>
              <p className="text-dark-sepia font-mono text-sm uppercase tracking-widest border-b border-dark-sepia pb-4 inline-block">
                Please sign the guest ledger
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-ink mb-1 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-dark-sepia py-2 px-1 text-ink focus:outline-none focus:border-ink font-serif text-lg placeholder:text-dark-sepia/50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-ink mb-1 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-dark-sepia py-2 px-1 text-ink focus:outline-none focus:border-ink font-serif text-lg placeholder:text-dark-sepia/50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-ink mb-1 uppercase tracking-wider">Phone Number <span className="opacity-60 text-xs">(Optional)</span></label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-dark-sepia py-2 px-1 text-ink focus:outline-none focus:border-ink font-serif text-lg placeholder:text-dark-sepia/50"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ink text-parchment py-4 font-bold text-lg uppercase tracking-widest hover:bg-ink/90 transition-all mt-8 border-2 border-transparent hover:border-dark-sepia"
              >
                Sign Ledger & Enter
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
