import React, { useRef, useCallback, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
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
import Loading from '../../components/Loading';

import logoImg from '../../assets/logo.svg';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Container>
        <Background>
          <MainContainer>
            <LeftContent>
              <img src={logoImg} alt="Logo" />
            </LeftContent>

            <RightContent>
              <section>
                <h1>Resetar senha</h1>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <InputsContainer>
                    <fieldset>
                      <legend>Nova senha</legend>
                      <Input name="password" icon={FiLock} type="password" />

                      <legend>Confirmação da senha</legend>
                      <Input
                        name="password_confirmation"
                        icon={FiLock}
                        type="password"
                      />
                    </fieldset>
                  </InputsContainer>

                  <nav>
                    <Button
                      type="submit"
                      textColor="#2b1c81"
                      borderColor="#2b1c81"
                      backgroundColor="#fff"
                    >
                      ALTERAR SENHA
                    </Button>
                  </nav>
                </Form>
              </section>
            </RightContent>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default ResetPassword;
