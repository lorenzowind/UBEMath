import React from 'react';

import { Container, Background, MainContainer, Content } from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Background>
        <MainContainer>
          <Header />
          <Menu />
          <Content>Início</Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Dashboard;
