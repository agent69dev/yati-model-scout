import { useState, useRef, useEffect } from "react";

const getLocationReaction = (location) => {
  const l = location.toLowerCase();
  if (l.includes("lagos")) return "🇳🇬 Lagos heat! The fashion capital of Africa!";
  if (l.includes("abuja")) return "🌆 Abuja vibes! Let's showcase your style!";
  if (l.includes("port harcourt")) return "🌊 Port Harcourt represent!";
  if (l.includes("nigeria") || l.includes("naija")) return "🇳🇬 Nigerian excellence incoming!";
  if (l.length > 2) return "🌍 Global talent incoming!";
  return "";
};

export default function StepLocation({ formData, updateField, nextStep, prevStep, addAura, errors }) {
  const [reaction, setReaction] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    updateField("location", val);
    setReaction(getLocationReaction(val));
    if (val.toLowerCase().includes("lagos")) addAura(25);
    else if (val.length > 2) addAura(15);
  };

  const handleNext = () => {
    if (!formData.location.trim()) {
      alert("Please enter your city!");
      return;
    }
    nextStep();
  };

  return (
    <div className="step">
      <div className="audition-header">
        <div className="camera-flash" />
        🌆 TAKE 3: LOCATION SCOUT
      </div>
      <h3>Where you at? (City)</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Lagos, Nigeria"
        value={formData.location}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleNext()}
      />
      {reaction && <p className="location-reaction">{reaction}</p>}
      {errors?.location && <p className="error-msg">{errors.location[0]}</p>}
      <div>
        <button className="prev-btn" onClick={prevStep}>← Rewind</button>
        <button className="next-btn" onClick={handleNext}>Next Scene →</button>
      </div>
    </div>
  );
}
