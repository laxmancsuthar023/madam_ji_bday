// src/App.tsx

import React from "react";
import type { Memory } from "./types";

// Import all components
import HeroSection from "./component/HeroSection/HeroSection";
import BirthdayCake from "./component/BirthdayCake/BirthdayCake";

// Import styles
import "./index.css";
import PhotoCarousel from "./component/PhotoCarousel/PhotoCarousel";
import TypingMessage from "./component/TypingMessage/TypingMessage";
import WishWall from "./component/WishWall/WishWall";
import GiftBox from "./component/GiftBox/GIftBox";
import Footer from "./component/Footer/Footer";

const App: React.FC = () => {
  // Sample memories data - replace with actual photos
  const memories: Memory[] = [
    {
      id: 1,
      src: "/assets/images/memory1.jpg",
      caption: "College days 🥹",
      date: "",
    },
    {
      id: 2,
      src: "/assets/images/memory2.jpg",
      caption: "Fairwell Day",
      date: "",
    },
    {
      id: 3,
      src: "/assets/images/memory3.jpg",
      caption: "Nandi hills Memories",
      date: "",
    },
    {
      id: 4,
      src: "/assets/images/memory4.jpg",
      caption: "College Bunk",
      date: "",
    },
    {
      id: 5,
      src: "/assets/images/memory5.jpg",
      caption: "Nandi hills",
      date: "",
    },
  ];

  // Personal message for the typing animation
  const personalMessage =
    "You're the most special person in my life, Madam ji. Thank you for always being there with your beautiful smile, your endless support, and your incredible friendship. Every day with you is a gift, and I'm so grateful to have someone as amazing as you in my life. Here's to all the wonderful memories we've made and all the incredible adventures still to come! 💖";
  const personalMessage1 =
    "Aaj ka din hai kuch khaas,  Dil se nikli hai ek aawaz...  Tere aane se roshan hua hai samaa,  Tere jaise dost mile toh kya hai gham?  Janamdin mubarak ho Madam Ji,  Tum ho sabse alag, sabse pyaari ji 💐  Roshan rahein har mod pe raaste,  Zindagi le aaye naye vaaste...  Mithi baatein, pyaare lamhe,  Har din ho jadoo se bhare 💫  Har khushi ho tere kadam tale,  Sapne saare ho poore bhale...  Jo tu chahe woh tu paaye,  Zindagi sirf pyaar barsaaye 💖  Muskaan kabhi kam na ho chehre se,  Khushiyaan ho chhaayi har pehre se...  Ek dost ki chhoti si dua,  Tu rahe khush sadaa...  🎉 Happy Birthday Madam Ji 🎉  Tum jiyo hazaaron saal,  Har saal ho khushiyon ka jashn bemisaal 🌟💖";

  // Handle wish submission
  const handleWishSubmit = (wish: string): void => {
    console.log("New wish submitted:", wish);
    // You can add additional logic here like sending to a server
  };

  // Handle cake wish made
  const handleCakeWishMade = (): void => {
    console.log("Birthday wish made on cake!");
    // You can add celebration logic here
  };

  return (
    <div className="App">
      {/* Load Canvas Confetti Library */}
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

      {/* Hero Section */}
      <HeroSection
        name="Madam Ji"
        photoSrc="/assets/images/madamji.jpg"
        photoAlt="Beautiful Maila Mitra smiling"
      />

      {/* Birthday Cake Section */}
      <BirthdayCake candleCount={5} onWishMade={handleCakeWishMade} />

      {/* Photo Memories Carousel */}
      <PhotoCarousel memories={memories} autoplay={true} slidesPerView={1} />

      {/* Personal Typing Message */}
      <TypingMessage message={personalMessage} speed={50} startDelay={1000} />
      <TypingMessage message={personalMessage1} speed={50} startDelay={1000} />

      {/* Interactive Wish Wall */}
      <WishWall onWishSubmit={handleWishSubmit} maxWishes={15} />

      {/* Surprise Gift Box */}
      <GiftBox
        surpriseImageSrc="/assets/images/collage.jpg"
        surpriseImageAlt="Beautiful memory collage of our adventures"
      />

      {/* Footer with final message */}
      <Footer />
    </div>
  );
};

export default App;
