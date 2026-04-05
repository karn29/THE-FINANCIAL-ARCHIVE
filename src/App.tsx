import { Routes, Route } from 'react-router-dom';
import { GrainOverlay } from './components/shared/GrainOverlay';
import { XPBar } from './components/shared/XPBar';
import { AchievementToast } from './components/shared/AchievementToast';
import { IdentityPanel } from './components/identity/IdentityPanel';
import { LandingPage } from './components/landing/LandingPage';
import { MarketSelector, MarketSimulatorGame } from './components/market/MarketSimulator';
import { BoardroomSelector, BoardroomGame } from './components/boardroom/BoardroomSimulator';
import { InvestorReport } from './components/report/InvestorReport';

export default function App() {
  return (
    <>
      <GrainOverlay />
      <XPBar />
      <IdentityPanel />
      <AchievementToast />
      <div className="pt-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/market" element={<MarketSelector />} />
          <Route path="/market/:id" element={<MarketSimulatorGame />} />
          <Route path="/boardroom" element={<BoardroomSelector />} />
          <Route path="/boardroom/:id" element={<BoardroomGame />} />
          <Route path="/report" element={<InvestorReport />} />
        </Routes>
      </div>
    </>
  );
}
