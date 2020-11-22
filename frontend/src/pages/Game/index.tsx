import React from 'react';

import { Container, Background, MainContainer, Content } from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';

const Game: React.FC = () => {
  return (
    <>
      <Container>
        <Background>
          <MainContainer>
            <Header />
            <Menu />
            <Content />
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Game;
