import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  joinedAt: number;
}

interface AuthPageProps {
  onAuthenticated: (user: { name: string; email: string }) => void;
}

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [memberCount, setMemberCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);

  // Get actual member count from localStorage
  useEffect(() => {
    const users: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setMemberCount(users.length);
  }, []);

  // Animate the counter on load
  useEffect(() => {
    if (memberCount === 0) {
      setDisplayCount(0);
      return;
    }
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      start = Math.floor(eased * memberCount);
      setDisplayCount(start);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [memberCount]);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid encrypted channel address.');
      return;
    }

    const users: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const duplicate = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (duplicate) {
      setError('This channel is already registered.');
      return;
    }

    const newUser: RegisteredUser = {
      name: name.trim(),
      email: email.trim(),
      password: password,
      joinedAt: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify({ name: newUser.name, email: newUser.email }));
    setMemberCount(users.length);
    setToast(`Welcome to the Archive, ${newUser.name}. Your dossier is ready.`);

    setTimeout(() => {
      onAuthenticated({ name: newUser.name, email: newUser.email });
    }, 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    const users: RegisteredUser[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) {
      setError('Credentials unverified. Access denied.');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify({ name: match.name, email: match.email }));
    setToast(`Welcome to the Archive, ${match.name}. Your dossier is ready.`);

    setTimeout(() => {
      onAuthenticated({ name: match.name, email: match.email });
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative"
      style={{
        backgroundColor: '#F5F0E8',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(26,16,8,0.04) 22px, rgba(26,16,8,0.04) 23px),
          repeating-linear-gradient(90deg, transparent, transparent 34px, rgba(139,105,20,0.03) 34px, rgba(139,105,20,0.03) 35px),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")
        `,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full"
        style={{ maxWidth: '460px' }}
      >
        {/* Auth Card */}
        <div
          style={{
            background: '#F5F0E8',
            borderTop: '2px solid #1A1208',
            borderBottom: '2px solid #1A1208',
            boxShadow: '0 0 0 1px #1A1208, 0 0 0 5px #F5F0E8, 0 0 0 6px #1A1208',
          }}
        >
          {/* Stamp Label */}
          <div
            style={{
              textAlign: 'center',
              padding: '16px 16px 8px',
              fontFamily: "'Playfair Display', serif",
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#6B5A3E',
              fontVariant: 'small-caps',
            }}
          >
            Established in the Year of Our Lord 2025
          </div>

          {/* Main Heading */}
          <div style={{ textAlign: 'center', padding: '0 16px' }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 'clamp(24px, 6vw, 36px)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: '#1A1208',
                margin: '0 0 4px',
                lineHeight: 1.2,
              }}
            >
              The Financial Archive
            </h1>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(13px, 3vw, 16px)',
                color: '#2C1F0E',
                margin: '0 0 16px',
              }}
            >
              Access Your Trading Dossier
            </p>
          </div>

          {/* Member Counter Banner */}
          <div
            style={{
              background: '#B8960C',
              padding: '12px 16px',
              textAlign: 'center',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(12px, 3vw, 15px)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#1A1208',
            }}
          >
            Archive Members:{' '}
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 'bold',
                fontSize: 'clamp(14px, 3.5vw, 18px)',
              }}
            >
              {displayCount}
            </span>{' '}
            Analysts Enrolled
          </div>

          {/* Toggle Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #8B7355',
            }}
          >
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                fontVariant: 'small-caps',
                background: mode === 'signup' ? '#B8960C' : 'transparent',
                color: mode === 'signup' ? '#1A1208' : '#6B5A3E',
                border: mode === 'signup' ? 'none' : '1px solid #B8960C',
                cursor: 'pointer',
                fontWeight: 700,
                minHeight: '44px',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Enlist
            </button>
            <button
              onClick={() => { setMode('login'); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                fontVariant: 'small-caps',
                background: mode === 'login' ? '#B8960C' : 'transparent',
                color: mode === 'login' ? '#1A1208' : '#6B5A3E',
                border: mode === 'login' ? 'none' : '1px solid #B8960C',
                cursor: 'pointer',
                fontWeight: 700,
                minHeight: '44px',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Access Dossier
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={mode === 'signup' ? handleSignup : handleLogin}
            style={{ padding: '24px 24px 28px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'signup' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
                transition={{ duration: 0.25 }}
              >
                {mode === 'signup' && (
                  <div style={{ marginBottom: '20px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '13px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        color: '#2C1F0E',
                        marginBottom: '6px',
                        fontWeight: 700,
                      }}
                    >
                      Operative Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        fontFamily: "'IM Fell English', serif",
                        fontSize: '16px',
                        color: '#1A1208',
                        background: '#F5F0E8',
                        border: '1.5px solid #8B7355',
                        borderRadius: 0,
                        boxSizing: 'border-box' as const,
                        outline: 'none',
                        minHeight: '44px',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#B8960C'; e.target.style.boxShadow = '0 0 0 2px rgba(184,150,12,0.25)'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#8B7355'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '13px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: '#2C1F0E',
                      marginBottom: '6px',
                      fontWeight: 700,
                    }}
                  >
                    Encrypted Channel
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontFamily: "'IM Fell English', serif",
                      fontSize: '16px',
                      color: '#1A1208',
                      background: '#F5F0E8',
                      border: '1.5px solid #8B7355',
                      borderRadius: 0,
                      boxSizing: 'border-box' as const,
                      outline: 'none',
                      minHeight: '44px',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#B8960C'; e.target.style.boxShadow = '0 0 0 2px rgba(184,150,12,0.25)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#8B7355'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '13px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: '#2C1F0E',
                      marginBottom: '6px',
                      fontWeight: 700,
                    }}
                  >
                    Clearance Code
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontFamily: "'IM Fell English', serif",
                      fontSize: '16px',
                      color: '#1A1208',
                      background: '#F5F0E8',
                      border: '1.5px solid #8B7355',
                      borderRadius: 0,
                      boxSizing: 'border-box' as const,
                      outline: 'none',
                      minHeight: '44px',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#B8960C'; e.target.style.boxShadow = '0 0 0 2px rgba(184,150,12,0.25)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#8B7355'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '14px',
                    color: '#8B1A1A',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#B8960C',
                color: '#1A1208',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                border: 'none',
                cursor: 'pointer',
                minHeight: '44px',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#9E7F0A';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(184,150,12,0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#B8960C';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {mode === 'signup' ? 'Submit Credentials' : 'Enter the Archive'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#B8960C',
              color: '#1A1208',
              padding: '16px 24px',
              textAlign: 'center',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(13px, 3vw, 16px)',
              fontWeight: 600,
              zIndex: 9999,
              boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
