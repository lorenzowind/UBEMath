import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 70%;
  height: 100%;

  animation: ${appearWithFade} 0.5s;

  form {
    margin-left: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > section {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const InputsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 28px;

  animation: ${appearWithFade} 0.5s;

  legend {
    font-weight: 700;
    font-size: 18px;
    font-weight: 700;
    color: #2b1c81;
  }

  > div {
    margin: 10px 0;
    width: 360px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 0.5s;

  > button {
    width: 360px;

    & + button {
      margin-top: 20px;
    }
  }
`;

export const BackSection = styled.button`
  position: absolute;
  top: -50px;
  left: 0;

  background: none;
  border: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  animation: ${appearWithFade} 0.5s;

  &:hover {
    svg {
      color: ${shade(0.2, '#2b1c81')};
    }

    strong {
      color: ${shade(0.2, '#2b1c81')};
    }
  }

  svg {
    width: 30px;
    height: 30px;
    color: #2b1c81;
    transition: color 0.2s;
  }

  strong {
    margin-left: 5px;
    font-size: 24px;
    font-weight: 700;
    color: #2b1c81;
    transition: color 0.2s;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  margin-right: 30px;

  > img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 2px solid #2b1c81;
  }

  div {
    margin: 0 50px;
    width: 180px;
    height: 180px;

    background: #1cd8d2;
    border-radius: 50%;
    border: 2px solid #2b1c81;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    svg {
      width: 120px;
      height: 120px;
      color: #fff;
    }
  }

  label {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    position: absolute;
    background: #2b1c81;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#2b1c81')};
    }

    svg {
      width: 25px;
      height: 25px;
      color: #fff;
    }

    input {
      display: none;
    }
  }
`;
