import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
  submittedAt: number;
}

const SEED_REVIEWS: Review[] = [
  {
    name: 'Rohan Mehta',
    role: 'Equity Research Associate',
    rating: 5,
    text: 'The Archive turned my Excel anxiety into actual skill. The Arena feature is unlike anything I\'ve seen.',
    submittedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
  {
    name: 'Ananya Iyer',
    role: 'CFA Level II Candidate',
    rating: 5,
    text: 'Studying financial modeling used to feel like reading a textbook. This feels like running a war room.',
    submittedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    name: 'Dev Kapoor',
    role: 'MBA, IIM Ahmedabad',
    rating: 5,
    text: 'The boardroom simulator with Buffett and Soros as opponents? Genuinely made me rethink my frameworks.',
    submittedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
];

function getTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  return `${months} months ago`;
}

function StarRating({
  rating,
  interactive,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            fontSize: '20px',
            color: star <= (hover || rating) ? '#B8960C' : '#8B7355',
            transition: 'color 0.15s',
            minWidth: '24px',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {star <= (hover || rating) ? '\u2605' : '\u2606'}
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Load reviews
  useEffect(() => {
    const stored = localStorage.getItem('userReviews');
    if (stored) {
      const parsed: Review[] = JSON.parse(stored);
      if (parsed.length > 0) {
        setReviews(parsed);
      } else {
        setReviews(SEED_REVIEWS);
      }
    } else {
      setReviews(SEED_REVIEWS);
    }

    // Pre-fill name from logged in user
    const loggedIn = localStorage.getItem('loggedInUser');
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      if (user.name) setName(user.name);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !text.trim() || rating === 0) return;

    const newReview: Review = {
      name: name.trim(),
      role: role.trim(),
      rating,
      text: text.trim(),
      submittedAt: Date.now(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('userReviews', JSON.stringify(updated));

    // Reset form
    setRole('');
    setRating(0);
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const charCount = text.length;

  return (
    <section
      style={{
        padding: '0 0 48px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', margin: '48px 0 40px' }}>
        {/* Top double rule */}
        <div
          style={{
            borderTop: '2px solid #1A1208',
            outline: '1px solid #1A1208',
            outlineOffset: '3px',
            margin: '0 0 32px',
          }}
        />

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(24px, 5vw, 38px)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: '#1A1208',
            margin: '0 0 8px',
          }}
        >
          Analyst Field Reports
        </h2>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 3vw, 18px)',
            color: '#B8960C',
            margin: 0,
          }}
        >
          Dispatches from the Trading Floor
        </p>

        {/* Bottom double rule */}
        <div
          style={{
            borderTop: '2px solid #1A1208',
            outline: '1px solid #1A1208',
            outlineOffset: '3px',
            margin: '32px 0 0',
          }}
        />
      </div>

      {/* Submit Form */}
      <div
        style={{
          background: '#F5F0E8',
          borderTop: '2px solid #B8960C',
          borderBottom: '1px solid #8B7355',
          padding: '28px 24px',
          marginBottom: '40px',
          maxWidth: '680px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: '#1A1208',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          File Your Dispatch
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
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
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
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
            <div>
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
                Designation
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Portfolio Analyst"
                style={{
                  width: '100%',
                  padding: '10px 12px',
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
          </div>

          {/* Rating */}
          <div style={{ marginBottom: '16px' }}>
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
              Performance Rating
            </label>
            <StarRating rating={rating} interactive onRate={setRating} />
          </div>

          {/* Text area */}
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
              Field Report
            </label>
            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= 300) setText(e.target.value);
              }}
              maxLength={300}
              rows={4}
              placeholder="Share your experience..."
              style={{
                width: '100%',
                padding: '10px 12px',
                fontFamily: "'IM Fell English', serif",
                fontSize: '16px',
                color: '#1A1208',
                background: '#F5F0E8',
                border: '1.5px solid #8B7355',
                borderRadius: 0,
                boxSizing: 'border-box' as const,
                outline: 'none',
                resize: 'vertical' as const,
                minHeight: '100px',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#B8960C'; e.target.style.boxShadow = '0 0 0 2px rgba(184,150,12,0.25)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#8B7355'; e.target.style.boxShadow = 'none'; }}
            />
            <div
              style={{
                textAlign: 'right',
                fontFamily: "'IM Fell English', serif",
                fontSize: '12px',
                color: charCount > 280 ? '#8B1A1A' : '#6B5A3E',
                marginTop: '4px',
              }}
            >
              {charCount} / 300
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!name.trim() || !text.trim() || rating === 0}
            style={{
              width: '100%',
              padding: '14px',
              background: !name.trim() || !text.trim() || rating === 0 ? '#C9A84C' : '#B8960C',
              color: '#1A1208',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              border: 'none',
              cursor: !name.trim() || !text.trim() || rating === 0 ? 'not-allowed' : 'pointer',
              minHeight: '44px',
              opacity: !name.trim() || !text.trim() || rating === 0 ? 0.6 : 1,
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (name.trim() && text.trim() && rating > 0) {
                e.currentTarget.style.background = '#9E7F0A';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(184,150,12,0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = !name.trim() || !text.trim() || rating === 0 ? '#C9A84C' : '#B8960C';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Submit Dispatch
          </button>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: '#B8960C',
                  marginTop: '12px',
                  fontSize: '14px',
                }}
              >
                Dispatch filed successfully.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Review Cards — Desktop: 2-col masonry, Mobile: horizontal scroll */}
      {/* Desktop Grid */}
      <div
        className="testimonial-grid-desktop"
        style={{
          display: 'none',
          columnCount: 2,
          columnGap: '24px',
        }}
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={`${review.name}-${review.submittedAt}-${idx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            style={{
              breakInside: 'avoid' as const,
              marginBottom: '24px',
              background: '#F5F0E8',
              borderTop: '3px double #B8960C',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <StarRating rating={review.rating} />
            </div>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: '15px',
                color: '#2C1F0E',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              {review.text}
            </p>
            <div style={{ borderTop: '1px solid #8B7355', paddingTop: '12px' }}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: '#1A1208',
                  margin: '0 0 2px',
                }}
              >
                {review.name}
              </p>
              {review.role && (
                <p
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontStyle: 'italic',
                    fontSize: '13px',
                    color: '#6B5A3E',
                    margin: '0 0 8px',
                  }}
                >
                  {review.role}
                </p>
              )}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: '#6B5A3E',
                  margin: 0,
                  fontVariant: 'small-caps',
                }}
              >
                Filed: {getTimeAgo(review.submittedAt)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div
        className="testimonial-scroll-mobile"
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '0 16px 16px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {reviews.map((review, idx) => (
          <motion.div
            key={`mobile-${review.name}-${review.submittedAt}-${idx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            style={{
              minWidth: '280px',
              maxWidth: '320px',
              flexShrink: 0,
              scrollSnapAlign: 'start',
              background: '#F5F0E8',
              borderTop: '3px double #B8960C',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <StarRating rating={review.rating} />
            </div>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: '15px',
                color: '#2C1F0E',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              {review.text}
            </p>
            <div style={{ borderTop: '1px solid #8B7355', paddingTop: '12px' }}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: '#1A1208',
                  margin: '0 0 2px',
                }}
              >
                {review.name}
              </p>
              {review.role && (
                <p
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontStyle: 'italic',
                    fontSize: '13px',
                    color: '#6B5A3E',
                    margin: '0 0 8px',
                  }}
                >
                  {review.role}
                </p>
              )}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: '#6B5A3E',
                  margin: 0,
                  fontVariant: 'small-caps',
                }}
              >
                Filed: {getTimeAgo(review.submittedAt)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Responsive CSS for grid vs scroll */}
      <style>{`
        @media (min-width: 768px) {
          .testimonial-grid-desktop { display: block !important; }
          .testimonial-scroll-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .testimonial-grid-desktop { display: none !important; }
          .testimonial-scroll-mobile { display: flex !important; }
        }
        .testimonial-scroll-mobile::-webkit-scrollbar { height: 6px; }
        .testimonial-scroll-mobile::-webkit-scrollbar-track { background: #F5F0E8; }
        .testimonial-scroll-mobile::-webkit-scrollbar-thumb { background: #8B7355; }

        /* Form grid responsive */
        @media (max-width: 500px) {
          form div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        /* Global placeholder color fix */
        input::placeholder, textarea::placeholder {
          color: #6B5A3E !important;
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
