import React from 'react';

import { Container, Background, MainContainer, Content } from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import ProfileImage from '../../components/ProfileImage';

const Profile: React.FC = () => {
  return (
    <Container>
      <Background>
        <MainContainer>
          <Menu />
          <Content>
            <Header />
            <ProfileImage />
          </Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Profile;
