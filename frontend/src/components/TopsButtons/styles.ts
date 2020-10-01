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
    font-size: 24px;
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

    &:before {
      width: 100%;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      transition: all 2s ease;
    }
    &:hover:before {
      height: 100%;
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
    font-size: 24px;
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
    font-size: 24px;
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
  }
`;
