import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  FirstContainer,
  Header,
  FirstContainerContent,
} from './styles';

import logoImg from '../../assets/logo.svg';

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
    </Container>
  );
};

export default Home;
