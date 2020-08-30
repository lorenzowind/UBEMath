import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link } from 'react-router-dom';
import {
  Container,
  Background,
  MainContainer,
  LeftContent,
  InputsContainer,
  RightContent,
} from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Background>
        <MainContainer>
          <LeftContent>
            <img src={logoImg} alt="Logo" />
          </LeftContent>

          <RightContent>
            <section>
              <h1>Crie sua conta</h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <InputsContainer>
                  <fieldset>
                    <legend>Nome completo</legend>
                    <Input name="name" icon={FiUser} />

                    <legend>E-mail</legend>
                    <Input name="email" icon={FiMail} />

                    <legend>Senha</legend>
                    <Input name="password" icon={FiLock} type="password" />
                  </fieldset>
                </InputsContainer>

                <nav>
                  <Button
                    type="submit"
                    textColor="#2b1c81"
                    borderColor="#2b1c81"
                    backgroundColor="#fff"
                  >
                    CRIAR CONTA
                  </Button>

                  <strong>
                    {'Já possui conta? '}
                    <b>
                      <Link to="/signin">Faça login!</Link>
                    </b>
                  </strong>
                </nav>
              </Form>
            </section>
          </RightContent>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default SignUp;
