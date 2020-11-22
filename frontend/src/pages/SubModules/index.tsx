import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import sortArrayByOrder from '../../utils/sortArrayByOrder';

import { useToast } from '../../hooks/toast';
import { useModule } from '../../hooks/module';

import {
  Container,
  Background,
  MainContainer,
  Content,
  LeftContainer,
  SubModule,
  CompletedCircle,
  RightContainer,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import LoadingImage from '../../components/LoadingImage';

export interface SubModule {
  id: string;
  module_id: string;
  name: string;
  order: number;
  content: {
    id: string;
    order: number;
    image_url: string;
  }[];
}

export interface CompletedSubModule {
  id: string;
  user_id: string;
  sub_module_id: string;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const { selectedModuleId } = useModule();

  const history = useHistory();

  const [completedSubModules, setCompletedSubModules] = useState<
    CompletedSubModule[]
  >([]);

  const [subModules, setSubModules] = useState<SubModule[]>([]);
  const [selectedSubModule, setSelectedSubModule] = useState<
    [SubModule, number]
  >([{} as SubModule, -1]);
  const [subModulesPage, setSubModulesPage] = useState<number[]>([]);

  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const checkIsFirstPage = useCallback(() => {
    return subModulesPage[selectedSubModule[1]] === 0;
  }, [selectedSubModule, subModulesPage]);

  const handleBackPage = useCallback(() => {
    if (!checkIsFirstPage()) {
      setSubModulesPage(state =>
        state.map((subModulePage, index) => {
          if (selectedSubModule[1] === index) {
            return subModulePage - 1;
          }

          return subModulePage;
        }),
      );

      setIsLastPage(false);
    } else {
      setIsFirstPage(true);
    }
  }, [checkIsFirstPage, selectedSubModule]);

  const checkIsLastPage = useCallback(() => {
    if (selectedSubModule[0].content) {
      return (
        subModulesPage[selectedSubModule[1]] ===
        selectedSubModule[0].content.length - 1
      );
    }

    return false;
  }, [selectedSubModule, subModulesPage]);

  const handleNextPage = useCallback(() => {
    if (!checkIsLastPage()) {
      setSubModulesPage(state =>
        state.map((subModulePage, index) => {
          if (selectedSubModule[1] === index) {
            return subModulePage + 1;
          }

          return subModulePage;
        }),
      );

      setIsFirstPage(false);
    } else {
      setIsLastPage(true);
    }
  }, [checkIsLastPage, selectedSubModule]);

  const handleSortSubModules = useCallback(
    (array: SubModule[]): SubModule[] => {
      function isModuleType(paramArray: any): paramArray is SubModule[] {
        return 'content' in paramArray[0];
      }

      if (array.length > 1) {
        const auxArray = sortArrayByOrder(array);

        if (isModuleType(auxArray)) {
          return auxArray;
        }
      }

      return [];
    },
    [],
  );

  const checkIsCompleted = useCallback(
    (subModuleId: string) => {
      return !!completedSubModules.find(
        completedSubModule => completedSubModule.sub_module_id === subModuleId,
      );
    },
    [completedSubModules],
  );

  const getIsCompleted = useCallback(
    (subModuleId: string) => {
      return completedSubModules.find(
        completedSubModule => completedSubModule.sub_module_id === subModuleId,
      );
    },
    [completedSubModules],
  );

  const handleCompleteSubModule = useCallback(
    async (subModuleId: string) => {
      try {
        setLoading(true);

        const auxCompletedSubModule = getIsCompleted(subModuleId);

        if (auxCompletedSubModule) {
          await api.delete(`user-progress/${auxCompletedSubModule.id}`);

          setCompletedSubModules(state =>
            state.filter(
              completedSubModule =>
                completedSubModule.sub_module_id !== subModuleId,
            ),
          );
        } else {
          const response = (
            await api.post<CompletedSubModule>('user-progress', {
              sub_module_id: subModuleId,
            })
          ).data;

          setCompletedSubModules([...completedSubModules, { ...response }]);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao controlar o progresso do sub-módulo',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, completedSubModules, getIsCompleted],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api
          .get<SubModule[]>(`sub-modules/${selectedModuleId}`)
          .then(response => {
            setSubModules(handleSortSubModules(response.data));
          });

        await api
          .get<CompletedSubModule[]>(`user-progress/${selectedModuleId}`)
          .then(response => {
            setCompletedSubModules(response.data);
          });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar o sub módulos',
        });
      } finally {
        setLoading(false);
      }
    };

    if (!selectedModuleId) {
      history.push('modules');
    } else {
      loadData();
    }
  }, [addToast, handleSortSubModules, history, selectedModuleId]);

  useEffect(() => {
    if (subModules.length) {
      setSelectedSubModule([subModules[0], 0]);

      const auxSubModulesPage = [];

      for (let i = 0; i < subModules.length; i += 1) {
        auxSubModulesPage.push(0);
      }

      setSubModulesPage(auxSubModulesPage);
    }
  }, [subModules]);

  useEffect(() => {
    setIsFirstPage(checkIsFirstPage());
    setIsLastPage(checkIsLastPage());
  }, [checkIsFirstPage, checkIsLastPage, selectedSubModule]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Container>
        <Background>
          <MainContainer>
            <Header />
            <Menu />
            <Content>
              <LeftContainer>
                <button type="button" onClick={() => history.goBack()}>
                  <FiArrowLeft />
                  <strong>Voltar</strong>
                </button>

                <nav>
                  {subModules.map((subModule, index) => (
                    <SubModule
                      key={subModule.id}
                      isSelected={subModule.id === selectedSubModule[0].id}
                    >
                      <CompletedCircle
                        isFilled={checkIsCompleted(subModule.id)}
                        onClick={() => handleCompleteSubModule(subModule.id)}
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedSubModule([subModule, index])}
                      >
                        {subModule.name}
                      </button>
                    </SubModule>
                  ))}
                </nav>
              </LeftContainer>

              <RightContainer isFirstPage={isFirstPage} isLastPage={isLastPage}>
                <FiChevronLeft onClick={handleBackPage} />

                {selectedSubModule[0].content && (
                  <>
                    <img
                      key={
                        selectedSubModule[0].content[
                          subModulesPage[selectedSubModule[1]]
                        ].id
                      }
                      src={
                        selectedSubModule[0].content[
                          subModulesPage[selectedSubModule[1]]
                        ].image_url
                      }
                      onLoad={() => setLoadingImage(false)}
                      alt="Material"
                    />

                    {loadingImage && <LoadingImage />}
                  </>
                )}

                <FiChevronRight onClick={handleNextPage} />
              </RightContainer>
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Dashboard;
