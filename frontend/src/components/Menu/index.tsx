import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { Container, Content } from './styles';

import iconMenu from '../../assets/icon_menu.svg';

const Menu: React.FC = () => {
  return (
    <Container>
      <Content>
        <button type="button">
          <FiMenu />
        </button>
      </Content>
    </Container>
  );
};

export default Menu;
