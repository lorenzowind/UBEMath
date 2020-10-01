import React from 'react';

import { Container, Background, MainContainer, Content } from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import TopButtons from '../../components/TopsButtons';
import ConquestList from '../../components/ConquestsList';

const Conquests: React.FC = () => {
  return (
    <Container>
      <Background>
        <MainContainer>
          <Menu />
          <Content>
            <Header />
            <TopButtons />
            <ConquestList />
            <ConquestList />
          </Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Conquests;
