import HorizontalLessons from "./components/HorizontalLessons";
import CyberStars from "./components/FallingStars";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Lessons overlay */}
      <div className="relative z-10">
        <HorizontalLessons />
      </div>
      
      {/* Canvas background */}
      <CyberStars />
    </div>
  );
}


