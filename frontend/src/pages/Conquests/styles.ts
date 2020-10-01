import { shade } from 'polished';
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

  @media only screen and (max-width: 1100px) {
    & {
      display: none;
    }
  }
`;

export const ContainerTopButtons = styled.div`
  margin-bottom: 40px;

  width: 60vw;
  height: 60px;
  border-radius: 6px;
  background-color: #2b1c81;

  display: flex;
  flex-direction: row;

  button {
    flex: 1;
    background: #2b1c81;
    border: 0;
    border-radius: 13px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#2b1c81')};
    }

    strong {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

export const ConquestContainer = styled.div`
  width: 60vw;
  height: 12vh;
  border-radius: 6px;
  background-color: #55e2c1;

  margin-bottom: 12px;

  display: flex;
  flex-direction: row;

  img {
    border-radius: 6px;
    border: solid 3px #2b1c81;
    background-color: #ffffff;
    margin: 10px;
    padding: 10px;
    width: 15%;
  }
`;
