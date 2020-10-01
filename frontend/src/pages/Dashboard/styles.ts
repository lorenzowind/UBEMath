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

  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background: #fff;
  width: 95vw;
  height: 95%;
  position: relative;
  animation: ${appearFromTop} 1s;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  animation: ${appearWithFade} 0.5s;
  margin-left: 25px;

  > strong {
    font-size: 52px;
    font-weight: 700;
    color: #2b1c81;
  }

  h1 {
    font-size: 64px;
    font-weight: 700;
    color: #2b1c81;
  }

  section {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  border-radius: 13px;
  box-shadow: 0 6px 13px 0 rgba(0, 0, 0, 0.16);
  border: solid 6px #2b1c81;
  width: 30%;
  height: 400px;
  padding: 30px;

  > strong {
    font-size: 36px;
    font-weight: 700;
    color: #2b1c81;
  }
`;
