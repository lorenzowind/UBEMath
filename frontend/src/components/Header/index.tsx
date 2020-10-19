import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import InfoModal from '../Modal/InfoModal';

import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const [infoOpen, setInfoOpen] = useState(false);

  const toggleModalInfo = useCallback(() => {
    setInfoOpen(!infoOpen);
  }, [infoOpen]);

  return (
    <>
      <InfoModal
        text="Funcionalidade ainda não disponível na plataforma UBEMath."
        isOpen={infoOpen}
        setIsOpen={toggleModalInfo}
      />

      <Container>
        <Content>
          <Link to="/dashboard">INÍCIO</Link>
          <button type="button" onClick={() => signOut()}>
            SAIR
          </button>
          {user.avatar_url ? (
            <section>
              <button type="button" onClick={toggleModalInfo}>
                <img src={user.avatar_url} alt="User" />
              </button>
            </section>
          ) : (
            <div>
              <button type="button" onClick={toggleModalInfo}>
                <FiUser />
              </button>
            </div>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Header;
