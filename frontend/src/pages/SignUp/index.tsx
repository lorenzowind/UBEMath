import React, { useRef, useCallback } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

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

interface SignUpFormData {
  name: string;
  email: string;
  position: 'usuario';
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        Object.assign(data, { position: 'usuario' });

        await api.post('/users', data);

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no UBEMath',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

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
