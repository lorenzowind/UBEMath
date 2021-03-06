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

import InfoModal from '../Modal/InfoModal';

const Menu: React.FC = () => {
  const history = useHistory();

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [infoOpen, setInfoOpen] = useState(false);

  const handleClickMenu = useCallback(() => {
    setMenuIsOpened(!menuIsOpened);
  }, [menuIsOpened]);

  const toggleModalInfo = useCallback(() => {
    setInfoOpen(!infoOpen);
  }, [infoOpen]);

  return (
    <>
      <InfoModal
        text="Funcionalidade ainda não disponível na plataforma UBEMath."
        isOpen={infoOpen}
        setIsOpen={toggleModalInfo}
      />

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
            <button type="button" onClick={toggleModalInfo}>
              <strong>GAME</strong>
            </button>
            <button type="button" onClick={() => history.push('modules')}>
              <strong>MÓDULOS</strong>
            </button>
            <button type="button" onClick={() => history.push('conquests')}>
              <strong>CONQUISTAS</strong>
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
