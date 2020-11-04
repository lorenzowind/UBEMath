import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

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

export interface Conquest {
  id: string;
  name: string;
  order: number;
  description: string;
  image_url: string;
}

const Conquests: React.FC = () => {
  const [conquests, setConquests] = useState<Conquest[]>([]);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<Conquest[]>('conquests/all').then(response => {
          setConquests(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar as conquistas',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [addToast]);

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
                {conquests.map(conquest => (
                  <section key={conquest.id}>
                    <ConquestContainer>
                      <ImageContainer>
                        {conquest.image_url ? (
                          <img src={conquest.image_url} alt="Conquest" />
                        ) : (
                          <img src={defaultImg} alt="Default" />
                        )}
                      </ImageContainer>
                    </ConquestContainer>
                  </section>
                ))}
              </nav>
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Conquests;
