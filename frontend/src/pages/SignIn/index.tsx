import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, history, signIn],
  );

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
