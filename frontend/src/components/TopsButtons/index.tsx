import React from 'react';
import { Link } from 'react-router-dom';

import {
  ConteinerTopButtons,
  AllButton,
  BlockedButton,
  CompleteButton,
} from './styles';

const TopsButtons: React.FC = () => {
  return (
    <ConteinerTopButtons>
      <AllButton>
        <Link to="/">
          <button type="submit">Todas</button>
        </Link>
      </AllButton>
      <BlockedButton>
        <Link to="/">
          <button type="submit">Bloqueadas</button>
        </Link>
      </BlockedButton>
      <CompleteButton>
        <Link to="/">
          <button type="submit">Completadas</button>
        </Link>
      </CompleteButton>
    </ConteinerTopButtons>
  );
};

export default TopsButtons;
