import { useRef, useEffect } from "react";

export default function StepInstagram({ formData, updateField, nextStep, prevStep, errors }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = () => {
    if (!formData.instagram.trim()) {
      alert("Please enter your Instagram handle!");
      return;
    }
    nextStep();
  };

  return (
    <div className="step">
      <div className="audition-header">
        <div className="camera-flash" />
        📸 TAKE 4: SOCIAL PROOF
      </div>
      <h3>Instagram @</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="@yourhandle"
        value={formData.instagram}
        onChange={(e) => updateField("instagram", e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleNext()}
      />
      <p className="social-tip">💡 Pro tip: Your feed is your portfolio!</p>
      {errors?.instagram_link && <p className="error-msg">{errors.instagram_link[0]}</p>}
      <div>
        <button className="prev-btn" onClick={prevStep}>← Rewind</button>
        <button className="next-btn" onClick={handleNext}>Next Scene →</button>
      </div>
    </div>
  );
}
