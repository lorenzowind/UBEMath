import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useModule } from '../../hooks/module';

import sortArrayByOrder from '../../utils/sortArrayByOrder';

import {
  Container,
  Background,
  MainContainer,
  Content,
  ModulesBar,
  ModuleSection,
  ModuleCard,
  ProgressContainer,
  ImageContainer,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ProgressBar from '../../components/ProgressBar';

import defaultImg from '../../assets/default_module.png';

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

export interface CompletedSubModule {
  id: string;
  user_id: string;
  sub_module_id: string;
}

export interface ModuleProgress {
  user_id: string;
  module_id: string;
  completed_sub_modules_quantity: number;
  sub_modules_quantity: number;
}

interface CalculatedModuleProgress {
  id: string;
  percent: string;
}

interface ConcludedModule {
  id: string;
  is_concluded: boolean;
}

interface ConcludedController {
  level: {
    id: string;
    is_concluded: boolean;
  };
  modules: ConcludedModule[];
}

const Modules: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [calculatedModulesProgress, setCalculatedModulesProgress] = useState<
    CalculatedModuleProgress[]
  >([]);
  const [calculated, setCalculated] = useState(false);

  const [concludedController, setConcludedController] = useState<
    ConcludedController[]
  >([]);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { setSelectedModule } = useModule();

  const history = useHistory();

  const handleSortModules = useCallback((array: Module[]): Module[] => {
    function isModuleType(paramArray: any): paramArray is Module[] {
      return 'level_id' in paramArray[0];
    }

    if (array.length >= 1) {
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

    if (array.length >= 1) {
      const auxArray = sortArrayByOrder(array);

      if (isLevelType(auxArray)) {
        return auxArray;
      }
    }

    return [];
  }, []);

  const calculateModuleProgress = useCallback(
    (filteredModuleId: string, levelId: string) => {
      const auxModuleProgress = moduleProgress.find(
        module => module.module_id === filteredModuleId,
      );

      if (auxModuleProgress) {
        const factor =
          auxModuleProgress.completed_sub_modules_quantity /
          auxModuleProgress.sub_modules_quantity;

        const result = factor * 100;

        if (result === 100) {
          setConcludedController(state =>
            state.reduce(
              (newArray: ConcludedController[], findConcludedController) => {
                const auxConcludedController = findConcludedController;

                if (auxConcludedController.level.id === levelId) {
                  let modulesConcluded = 0;

                  auxConcludedController.modules = auxConcludedController.modules.reduce(
                    (newModulesArray: ConcludedModule[], concludedModule) => {
                      if (
                        concludedModule.id === filteredModuleId &&
                        !concludedModule.is_concluded
                      ) {
                        modulesConcluded += 1;

                        newModulesArray.push({
                          id: concludedModule.id,
                          is_concluded: true,
                        });
                      } else {
                        if (concludedModule.is_concluded) {
                          modulesConcluded += 1;
                        }

                        newModulesArray.push(concludedModule);
                      }

                      return newModulesArray;
                    },
                    [],
                  );

                  if (
                    modulesConcluded === auxConcludedController.modules.length
                  ) {
                    auxConcludedController.level.is_concluded = true;
                  }
                }

                newArray.push(auxConcludedController);

                return newArray;
              },
              [],
            ),
          );
        }

        return result;
      }

      return 0;
    },
    [moduleProgress],
  );

  const findModuleProgress = useCallback(
    (moduleId: string) => {
      const moduleProgressFound = calculatedModulesProgress.find(
        calculatedModuleProgress => calculatedModuleProgress.id === moduleId,
      );

      if (moduleProgressFound) {
        return Number(moduleProgressFound.percent);
      }

      return 0;
    },
    [calculatedModulesProgress],
  );

  const checkIsAvailable = useCallback(
    (index: number) => {
      if (index === -1) {
        return true;
      }

      if (concludedController.length) {
        const modulesLength = concludedController[index].modules.length;

        let modulesConcluded = 0;

        for (let i = 0; i < modulesLength; i += 1) {
          if (concludedController[index].modules[i].is_concluded) {
            modulesConcluded += 1;
          }
        }

        if (modulesConcluded === modulesLength) {
          return true;
        }
      }

      return false;
    },
    [concludedController],
  );

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

        await api.get<ModuleProgress[]>('user-progress').then(response => {
          setModuleProgress(response.data);
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

  useEffect(() => {
    const auxConcludedController: ConcludedController[] = [];

    for (let i = 0; i < modules.length; i += 1) {
      const concludedControllerIndex = auxConcludedController.findIndex(
        findConcludedController =>
          findConcludedController.level.id === modules[i].level_id,
      );

      if (concludedControllerIndex !== -1) {
        auxConcludedController[concludedControllerIndex].modules.push({
          id: modules[i].id,
          is_concluded: false,
        });
      } else {
        auxConcludedController.push({
          level: {
            id: modules[i].level_id,
            is_concluded: false,
          },
          modules: [
            {
              id: modules[i].id,
              is_concluded: false,
            },
          ],
        });
      }
    }

    setConcludedController(auxConcludedController);
  }, [modules]);

  useEffect(() => {
    if (!calculated && concludedController.length && moduleProgress.length) {
      setCalculated(true);

      const auxCalculatedModulesProgress: CalculatedModuleProgress[] = [];

      for (let i = 0; i < modules.length; i += 1) {
        auxCalculatedModulesProgress.push({
          id: modules[i].id,
          percent: calculateModuleProgress(
            modules[i].id,
            modules[i].level_id,
          ).toFixed(2),
        });
      }

      setCalculatedModulesProgress(auxCalculatedModulesProgress);
    }
  }, [
    calculateModuleProgress,
    calculated,
    concludedController,
    modules,
    moduleProgress,
  ]);

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
                {levels.map((level, index) => (
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
                          isAvailable={checkIsAvailable(index - 1)}
                          onClick={() => {
                            if (checkIsAvailable(index - 1)) {
                              setSelectedModule(filteredModule);
                              history.push('sub-modules');
                            }
                          }}
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

                          <ProgressContainer>
                            <ProgressBar
                              percent={findModuleProgress(filteredModule.id)}
                              color="#fff"
                            />
                          </ProgressContainer>
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
