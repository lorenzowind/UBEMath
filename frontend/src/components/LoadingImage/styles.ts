import styled, { keyframes } from 'styled-components';

const appearWithFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.img`
  width: 150px;
  height: 150px;

  animation-name: ${appearWithFade};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.5s;
  animation-direction: alternate;
`;
