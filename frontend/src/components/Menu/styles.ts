import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import logoImg from '../../assets/logo_menu.svg';

const appearFromLeft = keyframes`
  from {
    transform: translateX(-50px);
  }
  to {
    transform: translateX(0);
  }
`;

const appearFromRight = keyframes`
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(0);
  }
`;

export const ContainerClosed = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  width: 100px;
  height: 95%;
  margin: 0 20px;
  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background-color: #1cd8d2;

  animation: ${appearFromRight} 0.5s;
`;

export const ContentClosed = styled.div`
  display: flex;
  justify-content: center;

  margin: 30px 0;

  button {
    border: 0;
    background: none;

    svg {
      width: 40px;
      height: 40px;
      color: #fff;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }
`;

export const ContainerOpened = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  z-index: 1;
  left: 0;
  width: 500px;
  height: 95%;
  margin: 0 20px;
  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background-color: #1cd8d2;

  animation: ${appearFromLeft} 0.5s;

  > footer {
    display: flex;
    justify-content: center;

    position: absolute;
    bottom: 0;
    width: 500px;
    padding: 30px;

    strong {
      color: #fff;
      font-size: 28px;
      font-weight: 700;
      opacity: 0.7;
    }
  }
`;

export const ContentOpened = styled.div`
  position: absolute;

  display: flex;
  align-self: flex-start;
  justify-content: center;
  flex-direction: row;

  padding: 30px;
  width: 500px;

  > strong {
    color: #fff;
    font-size: 36px;
    font-weight: 700;
  }

  > button {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    background: none;
    margin: 30px;

    svg {
      width: 40px;
      height: 40px;
      color: #fff;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 30px;
  width: 500px;

  > button {
    background: none;
    border: 0;

    strong {
      color: #fff;
      font-size: 28px;
      font-weight: 700;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }

    & + button {
      margin-top: 50px;
    }
  }
`;

export const Background = styled.div`
  position: absolute;
  opacity: 0.07;
  width: 500px;
  height: 500px;
  background: url(${logoImg}) no-repeat center;
  background-size: cover;
`;
