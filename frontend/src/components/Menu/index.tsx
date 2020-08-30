import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { Container, Content } from './styles';

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
