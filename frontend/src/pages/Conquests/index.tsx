import React from 'react';

import {
  Container,
  Background,
  MainContainer,
  Content,
  ContainerTopButtons,
  ConquestContainer,
  ImageContainer,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';

import pyramidImg from '../../assets/pyramid.png';

const Conquests: React.FC = () => {
  return (
    <Container>
      <Background>
        <MainContainer>
          <Header />
          <Menu />
          <Content>
            <ContainerTopButtons>
              <button type="button">
                <strong>Todas</strong>
              </button>
              <button type="button">
                <strong>Bloqueadas</strong>
              </button>
              <button type="button">
                <strong>Completadas</strong>
              </button>
            </ContainerTopButtons>

            <ConquestContainer>
              <ImageContainer>
                <img src={pyramidImg} alt="Pyramid" />
              </ImageContainer>
            </ConquestContainer>

            <ConquestContainer>
              <ImageContainer>
                <img src={pyramidImg} alt="Pyramid" />
              </ImageContainer>
            </ConquestContainer>
          </Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Conquests;
