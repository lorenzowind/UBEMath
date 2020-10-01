import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

interface ModuleCardProps {
  color: string;
}

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

  nav {
    display: flex;
    align-items: center;
    flex-direction: column;

    overflow-y: auto;
    height: 100%;

    ::-webkit-scrollbar {
      width: 18px;
    }

    ::-webkit-scrollbar-track {
      background: ${shade(0.2, '#2b1c81')};
      border-radius: 13px;
    }

    ::-webkit-scrollbar-thumb {
      background: #1cd8d2;
      border-radius: 13px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #55e2c1;
    }
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
  padding-bottom: 75px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${shade(0.2, '#2b1c81')};
    border-radius: 13px;
  }

  ::-webkit-scrollbar-thumb {
    background: #1cd8d2;
    border-radius: 13px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #55e2c1;
  }

  overflow-y: hidden;
  overflow-x: scroll;

  > button {
    background: #2b1c81;
    border: 0;
    width: 255px;
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

export const ModuleSection = styled.div`
  margin: 30px 40px 0 80px;

  > strong {
    position: relative;
    color: #2b1c81;
    font-size: 32px;
    font-weight: 700;
  }
`;

export const ModuleCard = styled.div<ModuleCardProps>`
  position: relative;
  margin-top: 20px;
  border-radius: 13px;
  background-color: ${props => props.color};
`;

export const CircleSection = styled.div`
  position: absolute;
  margin-left: -80px;
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;

  width: 28px;
  height: 28px;
  border: 2px solid #2b1c81;
  border-radius: 50%;
`;
