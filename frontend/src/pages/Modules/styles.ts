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
  width: 95%;
  height: 900px;
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-width: 900px;
  max-width: 60%;
  padding-top: 140px;
  margin: 0px 30px 60px 100px;
  height: 900px;

  animation: ${appearWithFade} 0.5s;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    overflow-y: auto;
    height: 100%;
    padding-top: 140px;
  }
`;

export const ModulesBar = styled.div`
  white-space: nowrap;
  display: inline-block;

  margin-bottom: 40px;
  width: 100%;
  height: 60px;
  background: #2b1c81;
  border-radius: 13px;

  overflow-y: hidden;
  overflow-x: auto;

  button {
    background: #2b1c81;
    border: 0;
    width: 180px;
    height: 60px;
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

export const ModuleSection = styled.div``;

export const ModuleCard = styled.div``;
