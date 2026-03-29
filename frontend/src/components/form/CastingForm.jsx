import { useRef } from "react";
import { useCastingForm } from "../../hooks/useCastingForm";
import ProgressBar from "./ProgressBar";
import StepName from "./steps/StepName";
import StepAge from "./steps/StepAge";
import StepLocation from "./steps/StepLocation";
import StepInstagram from "./steps/StepInstagram";
import StepTikTok from "./steps/StepTikTok";
import StepPhotos from "./steps/StepPhotos";

export default function CastingForm() {
  const form = useCastingForm();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) form.nextStep();
      else form.prevStep();
    }
  };

  const s = form.currentStep;

  return (
    <section id="apply" className="apply">
      <div className="form-container">
        <h2>Drop Your Deets</h2>
        <div id="onboarding" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <ProgressBar current={s} total={form.totalSteps} />
          <div className="score-display">Aura Score: {form.auraScore}</div>

          <div className="form-card">
            {/* Conditional rendering — React keeps the SAME component instance
                across re-renders, so inputs never lose focus while typing */}
            {s === 1 && <StepName {...form} />}
            {s === 2 && <StepAge {...form} />}
            {s === 3 && <StepLocation {...form} />}
            {s === 4 && <StepInstagram {...form} />}
            {s === 5 && <StepTikTok {...form} />}
            {s === 6 && <StepPhotos {...form} />}
          </div>

          {form.status === "success" && (
            <div className="post-submit active">
              🎬 AUDITION COMPLETE! Aura Score: {form.auraScore}.<br />
              🚀 You're in the studio queue — we'll hit you back in 24h!
            </div>
          )}
          {form.status === "error" && (
            <div className="post-submit active" style={{ borderColor: "#ff4444" }}>
              ⚠️ Something went wrong. Check your details and try again.
            </div>
          )}
        </div>
        <p className="social-media-note">
          Our AI will vibe-check your socials for the perfect brand fit. No cap.
        </p>
      </div>
    </section>
  );
}
