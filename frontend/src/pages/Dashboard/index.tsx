import React, { useEffect, useState, useMemo } from 'react';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Background, MainContainer, Content, Card } from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import conquestsImg from '../../assets/conquests.svg';
import modulesImg from '../../assets/modules.svg';
import generalImg from '../../assets/general.svg';

import { CompletedConquest, Conquest } from '../Conquests';
import { ModuleProgress } from '../Modules';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [conquests, setConquests] = useState<Conquest[]>([]);
  const [completedConquests, setCompletedConquests] = useState<
    CompletedConquest[]
  >([]);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<Conquest[]>('conquests/all').then(response => {
          setConquests(response.data);
        });

        await api.get<CompletedConquest[]>('user-conquests').then(response => {
          setCompletedConquests(response.data);
        });

        await api.get<ModuleProgress[]>('user-progress').then(response => {
          setModuleProgress(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar o progresso do usuário',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [addToast]);

  const conquestProgress = useMemo(() => {
    if (conquests.length !== 0) {
      return (completedConquests.length / conquests.length) * 100;
    }

    return 0;
  }, [completedConquests.length, conquests.length]);

  const formattedModulesProgress = useMemo(() => {
    let sum = 0;

    for (let i = 0; i < moduleProgress.length; i += 1) {
      const factor =
        moduleProgress[i].completed_sub_modules_quantity /
        moduleProgress[i].sub_modules_quantity;

      sum += factor * 100;
    }

    if (sum !== 0) {
      return sum / moduleProgress.length;
    }

    return 0;
  }, [moduleProgress]);

  const generalProgress = useMemo(() => {
    return (conquestProgress + formattedModulesProgress) / 2;
  }, [conquestProgress, formattedModulesProgress]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Container>
        <Background>
          <MainContainer>
            <Header />
            <Menu />
            <Content>
              <strong>Olá, bem vindo</strong>
              <h1>{user.name}</h1>

              <section>
                <Card>
                  <img src={conquestsImg} alt="Conquests" />
                  <strong>Conquistas</strong>
                  <h1>{conquestProgress.toFixed(2)}%</h1>
                </Card>

                <Card>
                  <img src={modulesImg} alt="Modules" />
                  <strong>Módulos</strong>
                  <h1>{formattedModulesProgress.toFixed(2)}%</h1>
                </Card>

                <Card>
                  <img src={generalImg} alt="General" />
                  <strong>Geral</strong>
                  <h1>{generalProgress.toFixed(2)}%</h1>
                </Card>
              </section>
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Dashboard;
