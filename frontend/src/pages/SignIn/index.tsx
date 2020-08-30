import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
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

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Background>
        <MainContainer>
          <LeftContent>
            <section>
              <h1>Login</h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <InputsContainer>
                  <fieldset>
                    <legend>E-mail</legend>
                    <Input name="email" icon={FiMail} />

                    <legend>Senha</legend>
                    <Input name="password" icon={FiLock} type="password" />

                    <article>
                      <Link to="/forgot">
                        <b>Esqueci minha senha</b>
                      </Link>
                    </article>
                  </fieldset>
                </InputsContainer>

                <nav>
                  <Button
                    type="submit"
                    textColor="#2b1c81"
                    borderColor="#2b1c81"
                    backgroundColor="#fff"
                  >
                    ENTRAR
                  </Button>

                  <strong>
                    {'Não possui conta? '}
                    <b>
                      <Link to="/signup">Crie agora!</Link>
                    </b>
                  </strong>
                </nav>
              </Form>
            </section>
          </LeftContent>

          <RightContent>
            <img src={logoImg} alt="Logo" />
          </RightContent>
        </MainContainer>
      </Background>
    </Container>
  );
};

export default SignIn;
