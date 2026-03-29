import { useRef, useEffect } from "react";

export default function StepName({ formData, updateField, nextStep, errors }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name!");
      return;
    }
    nextStep();
  };

  return (
    <div className="step">
      <div className="audition-header">
        <div className="camera-flash" />
        🎬 TAKE 1: IDENTITY
      </div>
      <h3>What's your name, star?</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="e.g. Adebayo Flex"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleNext()}
      />
      {errors?.name && <p className="error-msg">{errors.name[0]}</p>}
      <button className="next-btn" onClick={handleNext}>
        Lights, Camera, Action! →
      </button>
    </div>
  );
}
