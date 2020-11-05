import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '../../hooks/toast';

import sortArrayByOrder from '../../utils/sortArrayByOrder';

import {
  Container,
  Background,
  MainContainer,
  Content,
  ModulesBar,
  ModuleSection,
  ModuleCard,
  ImageContainer,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import defaultImg from '../../assets/default_module.png';
import api from '../../services/api';

export interface Level {
  id: string;
  name: string;
  order: number;
}

export interface Module {
  id: string;
  level_id: string;
  order: number;
  name: string;
  description: string;
  is_exercise: boolean;
  image_url: string;
}

const Modules: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [modules, setModules] = useState<Module[]>([]);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSortModules = useCallback((array: Module[]): Module[] => {
    function isModuleType(paramArray: any): paramArray is Module[] {
      return 'level_id' in paramArray[0];
    }

    if (array.length > 1) {
      const auxArray = sortArrayByOrder(array);

      if (isModuleType(auxArray)) {
        return auxArray;
      }
    }

    return [];
  }, []);

  const handleSortLevels = useCallback((array: Level[]): Level[] => {
    function isLevelType(paramArray: any): paramArray is Level[] {
      return !('level_id' in paramArray[0]);
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

        await api.get<Level[]>('levels/all').then(response => {
          setLevels(handleSortLevels(response.data));
        });

        await api.get<Module[]>('modules/all').then(response => {
          setModules(handleSortModules(response.data));
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar os níveis/módulos',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [addToast, handleSortLevels, handleSortModules]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Container>
        <Background>
          <MainContainer>
            <Header />
            <Menu />
            <Content>
              <ModulesBar>
                {levels.map(level => (
                  <button type="button" key={level.id}>
                    <a href={`#${level.name}`}>
                      <strong>{level.name}</strong>
                    </a>
                  </button>
                ))}
              </ModulesBar>

              <nav>
                {levels.map(level => (
                  <ModuleSection key={level.id}>
                    <strong id={level.name}>{level.name}</strong>

                    {modules
                      .filter(module => module.level_id === level.id)
                      .map((filteredModule: Module) => (
                        <ModuleCard
                          key={filteredModule.id}
                          color={
                            filteredModule.is_exercise ? '#1cd8d2' : '#55e2c1'
                          }
                        >
                          <strong>
                            {filteredModule.is_exercise
                              ? 'EXERCÍCIOS'
                              : 'CONTEÚDO'}
                          </strong>
                          <section>
                            <ImageContainer>
                              {filteredModule.image_url ? (
                                <img
                                  src={filteredModule.image_url}
                                  alt="Module "
                                />
                              ) : (
                                <img src={defaultImg} alt="Default" />
                              )}
                            </ImageContainer>
                            <div>
                              <strong>{filteredModule.name}</strong>
                              <h1>{filteredModule.description}</h1>
                            </div>
                          </section>
                        </ModuleCard>
                      ))}
                  </ModuleSection>
                ))}
              </nav>
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Modules;
