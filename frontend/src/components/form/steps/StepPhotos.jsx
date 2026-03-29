import { useState } from "react";

const getScoreMessage = (score) => {
  if (score >= 100) return `🎉 INCREDIBLE! Aura Score: ${score} — You're a natural star!`;
  if (score >= 70)  return `✨ Great potential! Aura Score: ${score} — Let's get you on the runway!`;
  return `💫 Solid foundation! Aura Score: ${score} — We'll polish that star quality!`;
};

export default function StepPhotos({
  formData, updatePhotos, prevStep, handleSubmit, auraScore, status, errors,
}) {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const capped = files.slice(0, 10);
    updatePhotos(capped);
    setPreviews(capped.map((f) => URL.createObjectURL(f)));
  };

  const onSubmit = () => {
    if (!formData.photos || formData.photos.length === 0) {
      alert("Please upload at least one photo!");
      return;
    }
    handleSubmit();
  };

  return (
    <div className="step">
      <div className="audition-header">
        <div className="camera-flash" />
        ✨ TAKE 6: THE REVEAL
      </div>
      <h3>
        Upload your fire pics{" "}
        <span style={{ color: "#888", fontSize: "0.8rem" }}>(1–10 photos)</span>
      </h3>

      <label htmlFor="photo-upload" style={{
        display: "block",
        padding: "0.9rem",
        background: "rgba(255,255,255,0.08)",
        border: "2px dashed rgba(255,0,0,0.5)",
        borderRadius: "10px",
        textAlign: "center",
        cursor: "pointer",
        color: "#ffaaaa",
        marginBottom: "0.75rem",
        fontSize: "0.95rem",
        transition: "border-color 0.3s"
      }}>
        📷 Tap to select photos
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {formData.photos?.length > 0 && (
        <p style={{ color: "#aaffaa", fontSize: "0.85rem", margin: "0 0 0.75rem", textAlign: "center" }}>
          ✅ {formData.photos.length} photo{formData.photos.length > 1 ? "s" : ""} selected
        </p>
      )}

      {previews.length > 0 && (
        <div className="preview-grid">
          {previews.map((url, i) => (
            <img key={i} src={url} alt={`preview-${i}`} />
          ))}
        </div>
      )}

      <p className="final-score">{getScoreMessage(auraScore)}</p>

      {errors?.photos && <p className="error-msg">{errors.photos[0]}</p>}
      {errors?.general && <p className="error-msg">{errors.general}</p>}

      <div>
        <button className="prev-btn" onClick={prevStep}>← Rewind</button>
      </div>

      <button
        className="submit-btn"
        onClick={onSubmit}
        disabled={status === "loading"}
        style={{ opacity: status === "loading" ? 0.7 : 1 }}
      >
        {status === "loading" ? "Submitting…" : "🎬 CUT! Submit Audition"}
      </button>
    </div>
  );
}