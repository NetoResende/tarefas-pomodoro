import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultButton } from "../../components/DefaultButton";
import { TrashIcon } from "lucide-react";

import styls from "./styles.module.css";

export function History() {
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Historico</span>
          <span className={styls.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar todo o Histórico"
              title="Apagar Histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styls.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tareda</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, index) => {
                return (
                  <tr key={index}>
                    <td>Estudar</td>
                    <td>25 min</td>
                    <td>20/04/2025 06:00</td>
                    <td>Completa</td>
                    <td>Foco</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
