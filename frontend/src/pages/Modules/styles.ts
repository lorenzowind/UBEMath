import { shade } from 'polished';
import styled, { keyframes, css } from 'styled-components';

import backgroundImg from '../../assets/background.png';

interface ModuleCardProps {
  color: string;
  isAvailable: boolean;
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

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 70%;
  padding-top: 120px;
  height: 100%;

  animation: ${appearWithFade} 0.5s;

  nav {
    display: flex;
    align-items: center;
    flex-direction: column;

    overflow-y: auto;
    height: 100%;
    width: 100%;
    margin: 0px 30px 60px 100px;

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

  @media only screen and (max-width: 1100px) {
    & {
      display: none;
    }
  }
`;

export const ModulesBar = styled.div`
  white-space: nowrap;
  display: inline-block;

  margin: 0px 30px 40px 100px;
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

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      width: 100%;
      height: 100%;
    }

    strong {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

export const ModuleSection = styled.div`
  width: 100%;
  padding: 30px 40px 0 40px;

  > strong {
    color: #2b1c81;
    font-size: 32px;
    font-weight: 700;
  }
`;

export const ModuleCard = styled.div<ModuleCardProps>`
  position: relative;
  opacity: 0.5;
  margin-top: 20px;
  border-radius: 13px;
  background-color: ${props => props.color};
  padding: 50px 60px 110px 180px;
  transition: background-color 0.2s;

  ${props =>
    props.isAvailable &&
    css`
      cursor: pointer;
      opacity: 1;

      &:hover {
        background-color: ${shade(0.2, props.color)};
      }
    `}

  > strong {
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    color: #2b1c81;
    font-size: 20px;
    font-weight: 700;
  }

  section {
    display: flex;
    align-items: center;

    > div {
      strong {
        color: #fff;
        font-size: 24px;
        font-weight: 700;
      }

      h1 {
        margin-top: 15px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
`;

export const ProgressContainer = styled.div`
  position: absolute;
  left: 0;
  margin: 50px 0 0 30px;
  width: 90%;
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 10vh;
  border-radius: 6px;
  border: solid 3px #2b1c81;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  margin: 0 30px;

  img {
    object-fit: contain;
    width: 90%;
    height: 90%;
  }
`;
