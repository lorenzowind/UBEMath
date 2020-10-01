import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

const appearWithFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  height: 100vh;

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

  overflow-y: hidden;

  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background: #fff;
  width: 95vw;
  height: 95%;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 70%;
  padding-top: 140px;
  margin: 0px 30px 60px 100px;
  height: 100%;

  animation: ${appearWithFade} 0.5s;
`;
