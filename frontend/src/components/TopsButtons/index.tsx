import React from 'react';

import { ConteinerTopButtons } from './styles';

const TopsButtons: React.FC = () => {
  return (
    <ConteinerTopButtons>
      <button type="button">
        <strong>Todas</strong>
      </button>
      <button type="button">
        <strong>Bloqueadas</strong>
      </button>
      <button type="button">
        <strong>Completadas</strong>
      </button>
    </ConteinerTopButtons>
  );
};

export default TopsButtons;
