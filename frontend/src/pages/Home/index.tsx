import React from 'react';

import {
  Container,
  FirstContainer,
  Header,
  FirstContainerContent,
  SecondContainer,
  SecondContainerContent,
  ThirdContainer,
  ThirdContainerContent,
  FourthContainer,
  FourthContainerContent,
  Footer,
} from './styles';

import logoImg from '../../assets/logo.svg';
import illustrationImg from '../../assets/illustration.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <FirstContainer>
        <Header>
          <h1>UBEMath</h1>

          <nav>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 750,
                  behavior: 'smooth',
                });
              }}
            >
              <strong>Objetivo</strong>
            </button>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 1600,
                  behavior: 'smooth',
                });
              }}
            >
              <strong>Inovação</strong>
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 2500,
                  behavior: 'smooth',
                });
              }}
            >
              <strong>Sobre nós</strong>
            </button>
          </nav>

          <section>
            <button id="signin" type="button">
              LOGIN
            </button>

            <button id="signup" type="button">
              CRIAR CONTA
            </button>
          </section>
        </Header>
        <FirstContainerContent>
          <div>
            <h1>Matematicamente divertido!</h1>
            <p>
              Crie sua conta agora mesmo e aprenda Matemática de uma forma
              <b> única </b>e<b> organizada</b>.
            </p>
            <button id="signup" type="button">
              COMECE AGORA
            </button>
          </div>

          <img src={logoImg} alt="Logo" />
        </FirstContainerContent>
      </FirstContainer>

      <SecondContainer id="secondContainer">
        <SecondContainerContent>
          <img src={illustrationImg} alt="Illustration" />

          <div>
            <h1>Objetivo</h1>

            <p>
              <b>
                Domine a Matemática do 9º ano do ensino fundamental através de
                um jogo RPG, materiais e exercícios.
              </b>
            </p>

            <h2>História da Matemática</h2>
            <h2>Equação de 1º e 2º grau</h2>
            <h2>Construção de figuras</h2>
            <h2>Geometria plana</h2>
            <h2>Trigonometria</h2>

            <button id="signup" type="button">
              COMECE AGORA
            </button>
          </div>
        </SecondContainerContent>
      </SecondContainer>

      <ThirdContainer>
        <ThirdContainerContent>
          <section>
            <h1>Inovação</h1>

            <div>
              <strong>Vídeo introdutório do jogo</strong>
            </div>

            <button id="signup" type="button">
              COMECE AGORA
            </button>
          </section>
        </ThirdContainerContent>
      </ThirdContainer>

      <FourthContainer>
        <FourthContainerContent>
          <article>
            <h1>Sobre nós</h1>
          </article>

          <div>
            <div>
              <strong>Foto equipe</strong>
            </div>

            <section>
              <p>
                <b>
                  Em um contexto de projeto de conclusão de curso no 3º ano do
                  <br />
                  ensino médio da Fundação Matias Machline (FMM),
                </b>
              </p>

              <article>
                <h2>
                  <b>Lorenzo Windmoller Martins</b>
                </h2>
                <h2>
                  <b>Samuel Albuquerque de Paiva</b>
                </h2>
                <h2>
                  <b>Vinícius Andrade Perrone</b>
                </h2>
              </article>

              <p>
                <b>
                  são alunos de Informática que decidiram desenvolver o <br />
                  "Under the Banner of Eternal Math" (UBEMath).
                </b>
              </p>
            </section>
          </div>
        </FourthContainerContent>
      </FourthContainer>

      <Footer>
        <h1>
          UBEMath © 2020
          <br />
          ubemath@gmail.com
        </h1>
      </Footer>
    </Container>
  );
};

export default Home;
