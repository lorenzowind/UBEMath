import React from 'react';
import { useHistory } from 'react-router-dom';

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

import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import illustrationImg from '../../assets/illustration.svg';
import teamImg from '../../assets/team.jpg';

const Home: React.FC = () => {
  const history = useHistory();

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
            <Button
              textColor="#fff"
              backgroundColor="#2b1c81"
              onClick={() => history.push('/signin')}
            >
              LOGIN
            </Button>

            <Button
              textColor="#2b1c81"
              borderColor="#2b1c81"
              backgroundColor="#93edc7"
              onClick={() => history.push('/signup')}
            >
              CRIAR CONTA
            </Button>
          </section>
        </Header>
        <FirstContainerContent>
          <div>
            <h1>Matematicamente divertido!</h1>
            <p>
              Crie sua conta agora mesmo e aprenda Matemática de uma forma
              <b> única </b>e<b> organizada</b>.
            </p>

            <Button
              textColor="#fff"
              borderColor="#fff"
              backgroundColor="#1cd8d2"
              onClick={() => history.push('/signup')}
            >
              COMECE AGORA
            </Button>
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

            <Button
              textColor="#2b1c81"
              borderColor="#2b1c81"
              backgroundColor="#fff"
              onClick={() => history.push('/signup')}
            >
              COMECE AGORA
            </Button>
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

            <Button
              textColor="#fff"
              borderColor="#fff"
              backgroundColor="#55e2c1"
              onClick={() => history.push('/signup')}
            >
              COMECE AGORA
            </Button>
          </section>
        </ThirdContainerContent>
      </ThirdContainer>

      <FourthContainer>
        <FourthContainerContent>
          <article>
            <h1>Sobre nós</h1>
          </article>

          <div>
            <img src={teamImg} alt="Team" />
            {/* <div>
              <strong>Foto equipe</strong>
            </div> */}

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
        <h1>UBEMath © 2020</h1>
      </Footer>
    </Container>
  );
};

export default Home;
