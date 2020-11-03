import React, { useState } from 'react';

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
import Loading from '../../components/Loading';

import defaultImg from '../../assets/default_conquest.png';

const Conquests: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading zIndex={1} />}

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

              <nav>
                <section>
                  <ConquestContainer>
                    <ImageContainer>
                      <img src={defaultImg} alt="Default" />
                    </ImageContainer>
                  </ConquestContainer>
                </section>
              </nav>
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Conquests;
