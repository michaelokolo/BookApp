import HeroSection from "../components/HeroSection";
import Book from "../components/Book";
import AboutApp from "../components/AboutApp";
import Community from "../components/Community";
import Promo from "../components/Promo"


function Home() {
    return (
        <>
            <HeroSection />
            <Book />
            <AboutApp />
            <Community />
            <Promo/>
        </>
            
  );
}

export default Home;