import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import InfoModal from '../Modal/InfoModal';

import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  const history = useHistory();

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
              <button type="button" onClick={() => history.push('profile')}>
                <img src={user.avatar_url} alt="User" />
              </button>
            </section>
          ) : (
            <div>
              <button type="button" onClick={() => history.push('profile')}>
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
