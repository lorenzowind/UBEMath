import React, { useCallback, useEffect, useMemo, useState } from 'react';

import api from '../../services/api';

import sortArrayByOrder from '../../utils/sortArrayByOrder';

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

export interface CompletedConquest {
  id: string;
  user_id: string;
  conquest_id: string;
}

const Conquests: React.FC = () => {
  const [conquests, setConquests] = useState<Conquest[]>([]);
  const [completedConquests, setCompletedConquests] = useState<
    CompletedConquest[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [option, setOption] = useState<'all' | 'blocked' | 'completed'>('all');

  const { addToast } = useToast();

  const handleSortConquests = useCallback((array: Conquest[]): Conquest[] => {
    function isLevelType(paramArray: any): paramArray is Conquest[] {
      return !('level_id' in paramArray[0]) && 'description' in paramArray[0];
    }

    if (array.length > 1) {
      const auxArray = sortArrayByOrder(array);

      if (isLevelType(auxArray)) {
        return auxArray;
      }
    }
    return [];
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<Conquest[]>('conquests/all').then(response => {
          setConquests(handleSortConquests(response.data));
        });

        await api.get<CompletedConquest[]>('user-conquests').then(response => {
          setCompletedConquests(response.data);
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
  }, [addToast, handleSortConquests]);

  const filteredConquests = useMemo(() => {
    return conquests.reduce((newArray: Conquest[], conquest) => {
      const isCompleted = completedConquests.find(
        completedConquest => completedConquest.conquest_id === conquest.id,
      );

      if (option === 'completed') {
        if (isCompleted) {
          newArray.push(conquest);
        }
      } else if (option === 'blocked') {
        if (!isCompleted) {
          newArray.push(conquest);
        }
      } else if (option === 'all') {
        newArray.push(conquest);
      }

      return newArray;
    }, []);
  }, [completedConquests, conquests, option]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Container>
        <Background>
          <MainContainer>
            <Header />
            <Menu />
            <Content>
              <ContainerTopButtons option={option}>
                <button type="button" onClick={() => setOption('all')}>
                  <strong>Todas</strong>
                </button>
                <button type="button" onClick={() => setOption('blocked')}>
                  <strong>Bloqueadas</strong>
                </button>
                <button type="button" onClick={() => setOption('completed')}>
                  <strong>Completadas</strong>
                </button>
              </ContainerTopButtons>

              <nav>
                {filteredConquests.map(filteredConquest => (
                  <section key={filteredConquest.id}>
                    <ConquestContainer
                      color={
                        completedConquests.find(
                          completedConquest =>
                            completedConquest.conquest_id ===
                            filteredConquest.id,
                        )
                          ? '#55e2c1'
                          : '#1cd8d2'
                      }
                    >
                      <ImageContainer>
                        {filteredConquest.image_url ? (
                          <img
                            src={filteredConquest.image_url}
                            alt="Conquest"
                          />
                        ) : (
                          <img src={defaultImg} alt="Default" />
                        )}
                      </ImageContainer>
                      <div>
                        <strong>{filteredConquest.name}</strong>
                        <h1>{filteredConquest.description}</h1>
                      </div>
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
