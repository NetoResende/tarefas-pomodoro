import { Container } from "./component/Container";
import { Heading } from "./component/Heading";
import "./styles/Theme.css";
import "./styles/Global.css";

export function App() {
  return (
    <>
      <Container>
        <Heading>LOGO</Heading>
      </Container>
      <Container>
        <Heading>MENU</Heading>
      </Container>
    </>
  );
}
