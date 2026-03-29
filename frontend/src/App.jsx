import Hero from "./components/Hero";
import Features from "./components/Features";
import CastingForm from "./components/form/CastingForm";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <main>
      <Hero />
      <Features />
      <CastingForm />
      <Footer />
    </main>
  );
}
