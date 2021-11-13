import { Container } from "reactstrap";
import Search from "../site/Search";

const HeroSection = (props) => {
  return (
    <div className="hero">
      <Container className="center">
        <Search/>
      </Container>
    </div>
  );
};

export default HeroSection;
