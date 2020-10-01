import React from 'react';

import {
  Container,
  Background,
  MainContainer,
  Content,
  ModulesBar,
  ModuleSection,
  ModuleCard,
  CircleSection,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';

import pyramidImg from '../../assets/pyramid.png';

const Modules: React.FC = () => {
  return (
    <Container>
      <Background>
        <MainContainer>
          <Header />
          <Menu />
          <Content>
            <ModulesBar>
              <button type="button">
                <strong>Módulo 1</strong>
              </button>
              <button type="button">
                <strong>Módulo 2</strong>
              </button>
              <button type="button">
                <strong>Módulo 3</strong>
              </button>
              <button type="button">
                <strong>Módulo 3</strong>
              </button>
              <button type="button">
                <strong>Módulo 3</strong>
              </button>
              <button type="button">
                <strong>Módulo 3</strong>
              </button>
            </ModulesBar>

            <nav>
              <ModuleSection>
                <strong>
                  <CircleSection isMain />
                  Módulo 1
                </strong>

                <ModuleCard color="#55e2c1">
                  <CircleSection />
                  <strong>CONTEÚDO</strong>
                  <section>
                    <img src={pyramidImg} alt="Pyramid" />
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
                  <CircleSection />
                  <strong>EXERCÍCIOS</strong>
                  <section>
                    <img src={pyramidImg} alt="Pyramid" />
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
                <strong>
                  <CircleSection isMain />
                  Módulo 2
                </strong>

                <ModuleCard color="#55e2c1">
                  <CircleSection />
                  <strong>CONTEÚDO</strong>
                  <section>
                    <img src={pyramidImg} alt="Pyramid" />
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
                  <CircleSection />
                  <strong>EXERCÍCIOS</strong>
                  <section>
                    <img src={pyramidImg} alt="Pyramid" />
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
