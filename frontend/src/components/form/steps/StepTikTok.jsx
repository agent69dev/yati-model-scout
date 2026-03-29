import { useRef, useEffect } from "react";

export default function StepTikTok({ formData, updateField, nextStep, prevStep, addAura, errors }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (formData.tiktok) addAura(50);
  }, []);

  const handleChange = (e) => {
    updateField("tiktok", e.target.value);
    if (e.target.value.trim()) addAura(50);
  };

  return (
    <div className="step">
      <div className="audition-header">
        <div className="camera-flash" />
        🎥 TAKE 5: BONUS CONTENT
      </div>
      <h3>TikTok @ <span style={{ color: "#888", fontSize: "0.85rem" }}>(optional)</span></h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="@yourhandle"
        value={formData.tiktok}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && nextStep()}
      />
      <p className="bonus-points">🎉 +50 Aura Points for TikTok!</p>
      {errors?.tiktok_link && <p className="error-msg">{errors.tiktok_link[0]}</p>}
      <div>
        <button className="prev-btn" onClick={prevStep}>← Rewind</button>
        <button className="next-btn" onClick={nextStep}>Next Scene →</button>
      </div>
    </div>
  );
}
