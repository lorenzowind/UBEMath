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
  RightContainerContent,
  RightContainerExercise,
  AlternativeCircle,
  AlternativeCard,
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

export interface Question {
  id: string;
  sub_module_id: string;
  statement: string;
  right_letter: string;
}

export interface Alternative {
  id: string;
  question_id: string;
  letter: string;
  description: string;
  image_url: string;
}

export interface UserAnswer {
  id: string;
  user_id: string;
  question_id: string;
  answer_letter: string;
}

interface FormattedQuestion {
  question: Question;
  alternatives: Alternative[];
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const { selectedModule } = useModule();

  const history = useHistory();

  const [completedSubModules, setCompletedSubModules] = useState<
    CompletedSubModule[]
  >([]);

  const [subModules, setSubModules] = useState<SubModule[]>([]);
  const [selectedSubModule, setSelectedSubModule] = useState<
    [SubModule, number]
  >([{} as SubModule, -1]);
  const [subModulesPage, setSubModulesPage] = useState<number[]>([]);

  const [formattedQuestions, setFormattedQuestions] = useState(
    {} as FormattedQuestion,
  );
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showRightAnswer, setShowRightAnswer] = useState(false);

  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      function isSubModuleType(paramArray: any): paramArray is SubModule[] {
        return 'module_id' in paramArray[0];
      }

      if (array.length >= 1) {
        const auxArray = sortArrayByOrder(array);

        if (isSubModuleType(auxArray)) {
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

  const handleControlSubModule = useCallback(async () => {
    try {
      setLoading(true);

      const auxCompletedSubModule = getIsCompleted(selectedSubModule[0].id);

      if (auxCompletedSubModule) {
        await api.delete(`user-progress/${auxCompletedSubModule.id}`);

        setCompletedSubModules(state =>
          state.filter(
            completedSubModule =>
              completedSubModule.sub_module_id !== selectedSubModule[0].id,
          ),
        );
      } else if (checkIsLastPage()) {
        const response = (
          await api.post<CompletedSubModule>('user-progress', {
            sub_module_id: selectedSubModule[0].id,
          })
        ).data;

        setCompletedSubModules([...completedSubModules, { ...response }]);
      } else {
        addToast({
          type: 'info',
          title: 'Primeiro você deve concluir o sub-módulo',
        });
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao controlar o progresso do sub-módulo',
      });
    } finally {
      setLoading(false);
    }
  }, [
    addToast,
    checkIsLastPage,
    completedSubModules,
    getIsCompleted,
    selectedSubModule,
  ]);

  const loadSubModuleQuestions = useCallback(
    async (subModuleId: string) => {
      try {
        setLoading(true);

        await api
          .get<Question[]>(`questions/${subModuleId}`)
          .then(async questionsResponse => {
            for (let i = 0; i < questionsResponse.data.length; i += 1) {
              // eslint-disable-next-line no-await-in-loop
              const alternativesResponse = await api.get<Alternative[]>(
                `alternatives/${questionsResponse.data[i].id}`,
              );

              if (alternativesResponse) {
                setFormattedQuestions({
                  question: questionsResponse.data[i],
                  alternatives: alternativesResponse.data,
                });
              }

              // eslint-disable-next-line no-await-in-loop
              const userAnswersResponse = await api.get<UserAnswer>(
                `user-answers/${questionsResponse.data[i].id}`,
              );

              const userAnswerFound = userAnswers.find(
                userAnswer => userAnswer.id === userAnswersResponse.data.id,
              );

              if (!userAnswerFound) {
                setUserAnswers([
                  ...userAnswers,
                  { ...userAnswersResponse.data },
                ]);
              }
            }
          });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar as questões e alternativas',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, userAnswers],
  );

  const checkUserAnswer = useCallback(
    (questionId: string, alternativeLetter: string) => {
      return !!userAnswers.find(
        userAnswer =>
          userAnswer.question_id === questionId &&
          userAnswer.answer_letter === alternativeLetter,
      );
    },
    [userAnswers],
  );

  const getUserAnswer = useCallback(
    (questionId: string) => {
      return userAnswers.find(
        userAnswer => userAnswer.question_id === questionId,
      );
    },
    [userAnswers],
  );

  const checkRightAnswer = useCallback(
    (question: Question, alternativeLetter: string) => {
      return question.right_letter === alternativeLetter;
    },
    [],
  );

  const handleSelectAlternative = useCallback(
    async (questionId: string, alternativeLetter: string) => {
      try {
        setLoading(true);

        const userAnswerFound = getUserAnswer(questionId);

        const auxCompletedSubModule = getIsCompleted(selectedSubModule[0].id);

        if (
          userAnswerFound &&
          userAnswerFound.answer_letter === alternativeLetter
        ) {
          await api.delete(`user-answers/${userAnswerFound.id}`);

          setUserAnswers(state =>
            state.filter(userAnswer => userAnswer.id !== userAnswerFound.id),
          );

          if (auxCompletedSubModule) {
            await api.delete(`user-progress/${auxCompletedSubModule.id}`);

            setCompletedSubModules(state =>
              state.filter(
                completedSubModule =>
                  completedSubModule.sub_module_id !== selectedSubModule[0].id,
              ),
            );
          }
        } else if (userAnswerFound) {
          await api.put(`user-answers/${userAnswerFound.id}`, {
            answer_letter: alternativeLetter,
          });

          setUserAnswers(state =>
            state.reduce((newArray: UserAnswer[], userAnswer) => {
              if (userAnswer.id === userAnswerFound.id) {
                newArray.push({
                  ...userAnswer,
                  answer_letter: alternativeLetter,
                });
              } else {
                newArray.push(userAnswer);
              }
              return newArray;
            }, []),
          );
        } else {
          const userAnswerResponse = await api.post<UserAnswer>(
            'user-answers',
            {
              question_id: questionId,
              answer_letter: alternativeLetter,
            },
          );

          setUserAnswers([...userAnswers, { ...userAnswerResponse.data }]);

          const completedSubModuleResponse = (
            await api.post<CompletedSubModule>('user-progress', {
              sub_module_id: selectedSubModule[0].id,
            })
          ).data;

          setCompletedSubModules([
            ...completedSubModules,
            { ...completedSubModuleResponse },
          ]);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao selecionar alternativa',
        });
      } finally {
        setLoading(false);
      }
    },
    [
      addToast,
      completedSubModules,
      getIsCompleted,
      getUserAnswer,
      selectedSubModule,
      userAnswers,
    ],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api
          .get<SubModule[]>(`sub-modules/${selectedModule.id}`)
          .then(response => {
            setSubModules(handleSortSubModules(response.data));
          });

        await api
          .get<CompletedSubModule[]>(`user-progress/${selectedModule.id}`)
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

    if (!selectedModule.id) {
      history.push('modules');
    } else {
      loadData();
    }
  }, [addToast, handleSortSubModules, history, selectedModule]);

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
    if (selectedModule.is_exercise && selectedSubModule[0].id && !loaded) {
      setLoaded(true);
      loadSubModuleQuestions(selectedSubModule[0].id);
    } else {
      setIsFirstPage(checkIsFirstPage());
      setIsLastPage(checkIsLastPage());
    }
  }, [
    checkIsFirstPage,
    checkIsLastPage,
    loadSubModuleQuestions,
    loaded,
    selectedModule.is_exercise,
    selectedSubModule,
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
                        isAvailable={
                          subModule.id === selectedSubModule[0].id &&
                          !selectedModule.is_exercise
                        }
                        onClick={() => {
                          if (
                            subModule.id === selectedSubModule[0].id &&
                            !selectedModule.is_exercise
                          ) {
                            handleControlSubModule();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLoaded(false);
                          setShowRightAnswer(false);
                          setSelectedSubModule([subModule, index]);
                        }}
                      >
                        {subModule.name}
                      </button>
                    </SubModule>
                  ))}
                </nav>
              </LeftContainer>

              {subModulesPage[selectedSubModule[1]] <
                selectedSubModule[0].content.length && (
                <RightContainerContent
                  isFirstPage={isFirstPage}
                  isLastPage={isLastPage}
                >
                  <FiChevronLeft onClick={handleBackPage} />

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

                  <FiChevronRight onClick={handleNextPage} />
                </RightContainerContent>
              )}

              {formattedQuestions.alternatives && (
                <RightContainerExercise>
                  <section>
                    <p>{formattedQuestions.question.statement}</p>
                    <nav>
                      {formattedQuestions.alternatives.map(alternative => (
                        <AlternativeCard
                          key={alternative.id}
                          color={
                            checkRightAnswer(
                              formattedQuestions.question,
                              alternative.letter,
                            ) && showRightAnswer
                              ? '#ffdd55'
                              : '#2b1c81'
                          }
                        >
                          <AlternativeCircle
                            isFilled={checkUserAnswer(
                              formattedQuestions.question.id,
                              alternative.letter,
                            )}
                            onClick={() =>
                              handleSelectAlternative(
                                formattedQuestions.question.id,
                                alternative.letter,
                              )
                            }
                          />

                          {alternative.image_url ? (
                            <img
                              src={alternative.image_url}
                              alt="Alternative"
                            />
                          ) : (
                            <strong>{alternative.description}</strong>
                          )}
                        </AlternativeCard>
                      ))}
                    </nav>
                    <button
                      type="button"
                      onClick={() => setShowRightAnswer(!showRightAnswer)}
                    >
                      {showRightAnswer
                        ? 'Esconder resposta'
                        : 'Mostrar resposta'}
                    </button>
                  </section>
                </RightContainerExercise>
              )}
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Dashboard;
