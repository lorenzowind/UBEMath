import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Content>
        <Link to="/dashboard">INÍCIO</Link>
        <button type="button" onClick={() => signOut()}>
          SAIR
        </button>
        {user.avatar_url ? (
          <section>
            <button type="button">
              <img src={user.avatar_url} alt="User" />
            </button>
          </section>
        ) : (
          <div>
            <button type="button">
              <FiUser />
            </button>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Header;
