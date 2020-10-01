import React from 'react';

import { ListConteiner, ConteinerImage } from './styles';

import ImagePiramide from '../../assets/Imagem1.png';

const ConquestList: React.FC = () => {
  return (
    <ListConteiner>
      <ConteinerImage>
        <img src={ImagePiramide} alt="" />
      </ConteinerImage>
    </ListConteiner>
  );
};

export default ConquestList;
