import { Container } from "../../components/Container";
import { MainTemplate } from "../../templates/MainTemplate";

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Página não encontrada!</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
          quisquam cum laboriosam ut cumque quis enim quaerat corporis soluta
          repellendus facere architecto nulla dignissimos accusantium cupiditate
          eaque temporibus, libero qui.
        </p>
      </Container>
    </MainTemplate>
  );
}
