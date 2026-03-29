
const featureImages = [
  { src: new URL("../assets/images/feature1.png", import.meta.url).href, alt: "Feature 1" },
  { src: new URL("../assets/images/feature2.png", import.meta.url).href, alt: "Feature 2" },
  { src: new URL("../assets/images/feature3.png", import.meta.url).href, alt: "Feature 3" },
  { src: new URL("../assets/images/feature4.png", import.meta.url).href, alt: "Feature 4" },
  { src: new URL("../assets/images/feature5.png", import.meta.url).href, alt: "Feature 5" },
  { src: new URL("../assets/images/feature6.png", import.meta.url).href, alt: "Feature 6" },
  { src: new URL("../assets/images/feature7.png", import.meta.url).href, alt: "Feature 7" },
  { src: new URL("../assets/images/feature8.png", import.meta.url).href, alt: "Feature 8" },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2>ARE YOU THE NEXT YATI MODEL?</h2>
        <div className="grid">
          {featureImages.map((img, i) => (
            <div className="feature" key={i}>
              <img
                src={img.src}
                alt={img.alt}
                className="feature-img"
                onError={(e) => {
                  e.target.style.background = "rgba(255,0,0,0.1)";
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
