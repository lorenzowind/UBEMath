import React from 'react';

import { FiCamera, FiUser } from 'react-icons/fi';

import {
  ConteinerChange,
  ConteinerImg,
  ButtonPhoto,
  UserPhoto,
  FormChange,
  InfoChange,
  LabelChange,
  InputChange,
  ButtonChange,
  ButtonChild,
} from './styles';

const ProfileImage: React.FC = () => {
  return (
    <ConteinerChange>
      <ConteinerImg>
        <UserPhoto>
          <FiUser />
        </UserPhoto>
        <ButtonPhoto>
          <FiCamera />
        </ButtonPhoto>
      </ConteinerImg>
      <FormChange>
        <InfoChange area="change1">
          <LabelChange>Nome completo</LabelChange>
          <InputChange type="text" />
        </InfoChange>
        <InfoChange area="change2">
          <LabelChange>Email</LabelChange>
          <InputChange type="text" />
        </InfoChange>
        <InfoChange area="change3">
          <LabelChange>Senha</LabelChange>
          <InputChange type="password" />
        </InfoChange>
        <InfoChange area="change4">
          <LabelChange>Senha atual</LabelChange>
          <InputChange type="password" />
        </InfoChange>
        <InfoChange area="change5">
          <LabelChange>Nova senha</LabelChange>
          <InputChange type="password" />
        </InfoChange>
        <InfoChange area="change6">
          <LabelChange>Confirmar senha</LabelChange>
          <InputChange type="password" />
        </InfoChange>
        <ButtonChange>
          <ButtonChild type="submit">SALVAR</ButtonChild>
        </ButtonChange>
      </FormChange>
    </ConteinerChange>
  );
};

export default ProfileImage;
