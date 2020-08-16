import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  FirstContainer,
  Header,
  FirstContainerContent,
  SecondContainer,
  SecondContainerContent,
  ThirdContainer,
  ThirdContainerContent,
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
            <Link to="secondContainer">
              <strong>Objetivo</strong>
            </Link>
            <Link to="thirdContainer">
              <strong>Inovação</strong>
            </Link>
            <Link to="fourthContainer">
              <strong>Sobre nós</strong>
            </Link>
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

      <SecondContainer>
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
    </Container>
  );
};

export default Home;
