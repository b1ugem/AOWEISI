import slides from "./slides.json";
import Slide from "./Slide.jsx";

// Slides above this index render eagerly so the top of the page paints
// immediately; everything below is lazily fetched as it nears the viewport.
const EAGER_COUNT = 2;

export default function App() {
  return (
    <main className="deck">
      {slides.map((slide, i) => (
        <Slide key={slide.page} slide={slide} eager={i < EAGER_COUNT} />
      ))}
    </main>
  );
}
