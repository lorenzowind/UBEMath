import React, { useCallback, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import {
  ContainerClosed,
  ContainerOpened,
  ContentClosed,
  ContentOpened,
  OptionsContainer,
  Background,
} from './styles';

const Menu: React.FC = () => {
  const history = useHistory();

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const handleClickMenu = useCallback(() => {
    setMenuIsOpened(!menuIsOpened);
  }, [menuIsOpened]);

  return (
    <>
      {menuIsOpened ? (
        <ContainerOpened>
          <Background />

          <ContentOpened>
            <strong>MENU</strong>

            <button type="button">
              <FiMenu onClick={handleClickMenu} />
            </button>
          </ContentOpened>

          <OptionsContainer>
            <button type="button">
              <strong>CAMPANHA</strong>
            </button>
            <button type="button">
              <strong>TREINO</strong>
            </button>
            <button type="button" onClick={() => history.push('modules')}>
              <strong>MÓDULOS</strong>
            </button>
            <button type="button" onClick={() => history.push('conquests')}>
              <strong>CONQUISTAS</strong>
            </button>
            <button type="button">
              <strong>CONFIGURAÇÕES</strong>
            </button>
          </OptionsContainer>

          <footer>
            <strong>UBEMath © 2020</strong>
          </footer>
        </ContainerOpened>
      ) : (
        <ContainerClosed>
          <ContentClosed>
            <button type="button">
              <FiMenu onClick={handleClickMenu} />
            </button>
          </ContentClosed>
        </ContainerClosed>
      )}
    </>
  );
};

export default Menu;
