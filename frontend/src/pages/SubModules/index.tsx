import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

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
  CompletedCircle,
  RightContainer,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

export interface SubModule {
  id: string;
  module_id: string;
  name: string;
  order: number;
  content_url: string;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const { selectedModuleId } = useModule();

  const history = useHistory();

  const [subModules, setSubModules] = useState<SubModule[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSortSubModules = useCallback(
    (array: SubModule[]): SubModule[] => {
      function isModuleType(paramArray: any): paramArray is SubModule[] {
        return 'content_url' in paramArray[0];
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api
          .get<SubModule[]>(`sub-modules/${selectedModuleId}`)
          .then(response => {
            setSubModules(handleSortSubModules(response.data));
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

    if (selectedModuleId) {
      history.push('modules');
    } else {
      loadData();
    }
  }, [addToast, handleSortSubModules, history, selectedModuleId]);

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
                <button type="button">
                  <FiArrowLeft />
                  <strong>Voltar</strong>
                </button>

                <nav>
                  {/* {subModules.map(subModule => (
                    <div key={subModule.id}>
                      <CompletedCircle />
                      <strong>{subModule.name}</strong>
                    </div>
                  ))} */}
                  <div>
                    <CompletedCircle isFilled={false} />
                    <strong>Sub-module 1</strong>
                  </div>
                  <div>
                    <CompletedCircle isFilled />
                    <strong>Sub-module 2</strong>
                  </div>
                  <div>
                    <CompletedCircle isFilled={false} />
                    <strong>Sub-module 3</strong>
                  </div>
                </nav>
              </LeftContainer>

              <RightContainer />
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Dashboard;
