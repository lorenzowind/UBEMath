import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Background,
  MainContainer,
  Content,
  ProfileImageContainer,
  BackSection,
  ButtonsContainer,
  InputsSection,
} from './styles';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  new_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [status, setStatus] = useState<'data' | 'password' | ''>('');
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        if (status === 'data') {
          const schema1 = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
          });

          await schema1.validate(data, {
            abortEarly: false,
          });
        } else if (status === 'password') {
          if (
            data.password ||
            data.new_password ||
            data.password_confirmation
          ) {
            const schema2 = Yup.object().shape({
              password: Yup.string().min(6, 'Senha obrigatória'),
              new_password: Yup.string().min(6, 'Senha obrigatória'),
              password_confirmation: Yup.string().oneOf(
                [Yup.ref('new_password'), undefined],
                'Confirmação incorreta',
              ),
            });

            await schema2.validate(data, {
              abortEarly: false,
            });
          }
        }

        const userData = {
          name: data.name ? data.name : user.name,
          email: data.email ? data.email : user.email,
          old_password: data.password || '',
          new_password: data.new_password || '',
        };

        setLoading(true);

        await api.put('users', userData).then(response => {
          updateUser(response.data);
        });

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao atualizar perfil',
          description: 'Ocorreu um erro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, status, updateUser, user.email, user.name],
  );

  const handleSubmitAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        if (e.target.files) {
          const data = new FormData();

          data.append('avatar', e.target.files[0]);

          setLoading(true);

          await api.patch('users/avatar', data).then(response => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar avatar',
          description: 'Ocorreu um erro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Container>
        <Background>
          <MainContainer>
            <Menu />
            <Header />

            <Content>
              <ProfileImageContainer>
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="User" />
                ) : (
                  <div>
                    <FiUser />
                  </div>
                )}

                <label htmlFor="avatar">
                  <FiCamera />

                  <input
                    type="file"
                    id="avatar"
                    onChange={handleSubmitAvatar}
                  />
                </label>
              </ProfileImageContainer>

              <Form ref={formRef} onSubmit={handleSubmit}>
                {status && (
                  <BackSection onClick={() => setStatus('')}>
                    <FiArrowLeft />
                    <strong>Voltar</strong>
                  </BackSection>
                )}

                {status === 'data' && (
                  <>
                    <section>
                      <InputsSection>
                        <legend>Nome completo</legend>
                        <Input
                          name="name"
                          defaultValue={user.name}
                          icon={FiUser}
                          backgroundColor="#fff"
                          borderFocusedColor="#2b1c81"
                          iconColor="#2b1c81"
                        />

                        <legend>E-mail</legend>
                        <Input
                          name="email"
                          defaultValue={user.email}
                          icon={FiMail}
                          backgroundColor="#fff"
                          borderFocusedColor="#2b1c81"
                          iconColor="#2b1c81"
                        />
                      </InputsSection>
                    </section>

                    <ButtonsContainer>
                      <Button
                        type="submit"
                        textColor="#fff"
                        borderColor="#fff"
                        backgroundColor="#2b1c81"
                      >
                        Salvar
                      </Button>
                    </ButtonsContainer>
                  </>
                )}

                {status === 'password' && (
                  <>
                    <section>
                      <InputsSection>
                        <legend>Senha atual</legend>
                        <Input
                          name="password"
                          type="password"
                          icon={FiLock}
                          backgroundColor="#fff"
                          borderFocusedColor="#2b1c81"
                          iconColor="#2b1c81"
                        />

                        <legend>Nova senha</legend>
                        <Input
                          name="new_password"
                          type="password"
                          icon={FiLock}
                          backgroundColor="#fff"
                          borderFocusedColor="#2b1c81"
                          iconColor="#2b1c81"
                        />

                        <legend>Confirmar senha</legend>
                        <Input
                          name="password_confirmation"
                          type="password"
                          icon={FiLock}
                          backgroundColor="#fff"
                          borderFocusedColor="#2b1c81"
                          iconColor="#2b1c81"
                        />
                      </InputsSection>
                    </section>

                    <ButtonsContainer>
                      <Button
                        type="submit"
                        textColor="#fff"
                        borderColor="#fff"
                        backgroundColor="#2b1c81"
                      >
                        Salvar
                      </Button>
                    </ButtonsContainer>
                  </>
                )}

                {status === '' && (
                  <ButtonsContainer>
                    <Button
                      textColor="#fff"
                      borderColor="#fff"
                      backgroundColor="#2b1c81"
                      type="button"
                      onClick={() => setStatus('data')}
                    >
                      Dados pessoais
                    </Button>
                    <Button
                      textColor="#fff"
                      borderColor="#fff"
                      backgroundColor="#2b1c81"
                      type="button"
                      onClick={() => setStatus('password')}
                    >
                      Senha
                    </Button>
                  </ButtonsContainer>
                )}
              </Form>
            </Content>
          </MainContainer>
        </Background>
      </Container>
    </>
  );
};

export default Profile;
