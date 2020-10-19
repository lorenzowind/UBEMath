import React from 'react';

import { Container, Background, MainContainer, Content, Card } from './styles';

import { useAuth } from '../../hooks/auth';

import Menu from '../../components/Menu';
import Header from '../../components/Header';

import conquestsImg from '../../assets/conquests.svg';
import modulesImg from '../../assets/modules.svg';
import generalImg from '../../assets/general.svg';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
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
                <h1>0%</h1>
              </Card>

              <Card>
                <img src={modulesImg} alt="Modules" />
                <strong>Módulos</strong>
                <h1>0%</h1>
              </Card>

              <Card>
                <img src={generalImg} alt="General" />
                <strong>Geral</strong>
                <h1>0%</h1>
              </Card>
            </section>
          </Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Dashboard;
