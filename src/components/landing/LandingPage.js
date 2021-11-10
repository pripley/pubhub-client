import React from "react";
import BeerOfTheDay from "./BeerOfTheDay";
import HeroSection from "./HeroSection";
import { Container } from "reactstrap";

const LandingPage = () => {
  return (    
      <>
        <HeroSection />
        <Container>
        <BeerOfTheDay />
        </Container>
        
      </>    
  );
};

export default LandingPage;
