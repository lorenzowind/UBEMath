import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const ConteinerTopButtons = styled.div`
  margin-bottom: 50px;

  width: 60vw;
  height: 7vh;
  border-radius: 6px;
  background-color: #2b1c81;

  display: flex;
  flex-direction: row;
`;

export const AllButton = styled.div`
  width: 33.3%;
  height: 7vh;

  a {
    text-decoration: none;
  }

  button {
    color: #ffffff;
    font-size: 28px;
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    background-color: #2b1c81;

    width: 100%;
    height: 100%;

    border: none;
    border-radius: 6px;

    &:hover {
      color: ${shade(0.5, '#fff')};
    }
  }
`;

export const BlockedButton = styled.div`
  width: 33.3%;

  align-items: stretch;
  text-align: center;

  a {
    text-decoration: none;
  }

  button {
    color: #ffffff;
    font-size: 28px;
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    background-color: #2b1c81;

    width: 100%;
    height: 100%;

    border: none;
    border-radius: 6px;

    &:hover {
      color: ${shade(0.5, '#fff')};
    }
  }
`;

export const CompleteButton = styled.div`
  width: 33.3%;

  align-items: stretch;
  text-align: center;

  a {
    text-decoration: none;
  }

  button {
    color: #ffffff;
    font-size: 28px;
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    background-color: #2b1c81;

    width: 100%;
    height: 100%;

    border: none;
    border-radius: 6px;

    &:hover {
      color: ${shade(0.5, '#fff')};
    }
  }
`;
