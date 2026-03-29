export default function Hero() {
  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById("apply").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <h1>YATICORP SCOUTING</h1>
      <p>CALLING ALL MODELS</p>
      <button className="audition-btn" onClick={scrollToForm}>
        <span>START AUDITION</span>
      </button>
    </section>
  );
}