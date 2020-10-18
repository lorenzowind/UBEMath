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

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 70%;
  margin: 0px 30px 0 100px;
  height: 100%;

  animation: ${appearFromTop} 0.5s;

  > strong {
    font-size: 2vw;
    font-weight: 700;
    color: #2b1c81;
  }

  h1 {
    font-size: 3vw;
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

  @media only screen and (max-width: 1100px) {
    & {
      display: none;
    }
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

  img {
    width: 100%;
    height: 100%;
  }

  > strong {
    font-size: 36px;
    font-weight: 700;
    color: #2b1c81;
  }

  h1 {
    margin: 0;
  }
`;
