import styled, { keyframes } from 'styled-components';

const animationBottom = keyframes`
  0%, 20%, 60%, 100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  40%{
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
  }
  80%{
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
`;

export const ListConteiner = styled.div`
  width: 60vw;
  height: 12vh;
  border-radius: 6px;
  background-color: #55e2c1;

  margin-bottom: 12px;

  display: flex;
  flex-direction: row;

  &:hover {
    animation: ${animationBottom} 0.5s;
  }
`;

export const ConteinerImage = styled.div`
  border-radius: 6px;
  border: solid 3px #2b1c81;
  background-color: #ffffff;

  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  padding-left: 25px;
  padding-top: 10px;

  width: 140px;
`;
