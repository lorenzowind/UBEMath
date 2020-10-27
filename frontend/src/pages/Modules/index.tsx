import React, { useEffect, useState } from 'react';

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

import pyramidImg from '../../assets/pyramid.png';
import api from '../../services/api';

interface Level {
  name: string;
}

const Modules: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await api.get<Level[]>('levels/all').then(response => {
        setLevels(response.data);
      });
    };

    loadData();
  }, []);

  return (
    <Container>
      <Background>
        <MainContainer>
          <Header />
          <Menu />
          <Content>
            <ModulesBar>
              {levels.map(level => (
                <button type="button">
                  <strong>{level.name}</strong>
                </button>
              ))}
            </ModulesBar>

            <nav>
              <ModuleSection>
                <strong>Módulo 1</strong>

                <ModuleCard color="#55e2c1">
                  <strong>CONTEÚDO</strong>
                  <section>
                    <ImageContainer>
                      <img src={pyramidImg} alt="Pyramid" />
                    </ImageContainer>
                    <div>
                      <strong>What is Lorem Ipsum?</strong>
                      <h1>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </h1>
                    </div>
                  </section>
                </ModuleCard>

                <ModuleCard color="#1cd8d2">
                  <strong>EXERCÍCIOS</strong>
                  <section>
                    <ImageContainer>
                      <img src={pyramidImg} alt="Pyramid" />
                    </ImageContainer>
                    <div>
                      <strong>What is Lorem Ipsum?</strong>
                      <h1>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </h1>
                    </div>
                  </section>
                </ModuleCard>
              </ModuleSection>
              <ModuleSection>
                <strong>Módulo 2</strong>

                <ModuleCard color="#55e2c1">
                  <strong>CONTEÚDO</strong>
                  <section>
                    <ImageContainer>
                      <img src={pyramidImg} alt="Pyramid" />
                    </ImageContainer>
                    <div>
                      <strong>What is Lorem Ipsum?</strong>
                      <h1>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </h1>
                    </div>
                  </section>
                </ModuleCard>

                <ModuleCard color="#1cd8d2">
                  <strong>EXERCÍCIOS</strong>
                  <section>
                    <ImageContainer>
                      <img src={pyramidImg} alt="Pyramid" />
                    </ImageContainer>
                    <div>
                      <strong>What is Lorem Ipsum?</strong>
                      <h1>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </h1>
                    </div>
                  </section>
                </ModuleCard>
              </ModuleSection>
            </nav>
          </Content>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default Modules;
