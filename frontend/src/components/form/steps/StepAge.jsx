import { useState, useRef, useEffect } from "react";

const getAgeFact = (age) => {
  const n = parseInt(age);
  if (!n) return "";
  if (n >= 18 && n <= 25) return "🌟 Perfect age for breaking into modeling!";
  if (n > 25 && n <= 30) return "💪 Mature vibe — experience is sexy!";
  if (n < 16) return "⚠️ You must be at least 16 to apply.";
  return "🎭 Every age has its runway moment!";
};

export default function StepAge({ formData, updateField, nextStep, prevStep, addAura, errors }) {
  const [fact, setFact] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    updateField("age", val);
    setFact(getAgeFact(val));
    const n = parseInt(val);
    if (n >= 18 && n <= 25) addAura(20);
    else if (n > 25 && n <= 30) addAura(15);
    else addAura(10);
  };

  const handleNext = () => {
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age)) {
      alert("Please enter your age!");
      return;
    }
    if (age < 16) {
      alert("You must be at least 16 to apply.");
      return;
    }
    nextStep();
  };

  return (
    <div className="step">
      <div className="audition-header">
        <div className="camera-flash" />
        🎭 TAKE 2: THE VIBE CHECK
      </div>
      <h3>How old are you?</h3>
      <input
        ref={inputRef}
        type="number"
        placeholder="e.g. 22"
        value={formData.age}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleNext()}
        min="16"
        max="60"
      />
      {fact && <p className="fun-fact">{fact}</p>}
      {errors?.age && <p className="error-msg">{errors.age[0]}</p>}
      <div>
        <button className="prev-btn" onClick={prevStep}>← Rewind</button>
        <button className="next-btn" onClick={handleNext}>Next Scene →</button>
      </div>
    </div>
  );
}
