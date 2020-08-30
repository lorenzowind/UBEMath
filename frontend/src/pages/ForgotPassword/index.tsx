import React, { useRef, useCallback } from 'react';
import { FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background>
        <MainContainer>
          <LeftContent>
            <section>
              <h1>Recuperar senha</h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <InputsContainer>
                  <fieldset>
                    <legend>E-mail</legend>
                    <Input name="email" icon={FiMail} />
                  </fieldset>
                </InputsContainer>

                <nav>
                  <Button
                    type="submit"
                    textColor="#2b1c81"
                    borderColor="#2b1c81"
                    backgroundColor="#fff"
                  >
                    RECUPERAR
                  </Button>

                  <Link to="/signin">Voltar ao login</Link>
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

export default ForgotPassword;
