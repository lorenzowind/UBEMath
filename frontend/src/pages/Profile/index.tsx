import React from 'react';

import { Container, Background, MainContainer, Content } from './styles';

import Menu from '../../components/Menu';

const Profile: React.FC = () => {
  return (
    <Container>
      <Background>
        <MainContainer>
          <Menu />
          <Content>Início</Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Profile;
