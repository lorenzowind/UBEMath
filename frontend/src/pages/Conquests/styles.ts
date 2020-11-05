import { shade } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

interface ContainerTopButtonsProps {
  option: 'all' | 'blocked' | 'completed';
}

interface ConquestContainerProps {
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

  @media only screen and (max-width: 1100px) {
    & {
      display: none;
    }
  }

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

    section {
      & + section {
        margin-top: 20px;
      }
    }
  }
`;

export const ContainerTopButtons = styled.div<ContainerTopButtonsProps>`
  margin: 0px 30px 40px 100px;
  width: 100%;
  height: 60px;
  background: #2b1c81;
  border-radius: 13px;

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
      transition: color 0.2s;
    }


    ${props =>
      props.option === 'all' &&
      css`
        &:first-child {
          strong {
            color: ${shade(0.3, '#fff')};
          }
        }
      `}

      ${props =>
        props.option === 'blocked' &&
        css`
          &:nth-child(2) {
            strong {
              color: ${shade(0.3, '#fff')};
            }
          }
        `}

      ${props =>
        props.option === 'completed' &&
        css`
          &:last-child {
            strong {
              color: ${shade(0.3, '#fff')};
            }
          }
        `}
  }
`;

export const ConquestContainer = styled.div<ConquestContainerProps>`
  width: 60vw;
  height: 14vh;
  border-radius: 6px;
  background-color: ${props => props.color};

  display: flex;
  flex-direction: row;
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
  margin: 0 30px;

  img {
    object-fit: contain;
    width: 90%;
    height: 90%;
  }
`;
