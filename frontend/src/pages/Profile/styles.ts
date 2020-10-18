import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

const appearFromTop = keyframes`
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: stretch;
  overflow-x: hidden;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg});

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background: #fff;
  width: 95%;
  height: 900px;
  position: relative;

  animation: ${appearFromTop} 1s;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const Content = styled.div``;
