import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

const appearFromRight = keyframes`
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0);
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

  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background: linear-gradient(to left, #1cd8d2, #93edc7);
  padding: 50px 5%;

  animation: ${appearFromRight} 1s;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const LeftContent = styled.div`
  margin-right: 60px;

  img {
    width: 500px;
    height: 500px;
  }
`;

export const RightContent = styled.div`
  margin-left: 60px;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 40px;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      width: 100%;
    }

    strong {
      margin-top: 10px;
      color: #fff;
      font-weight: 400;

      b {
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
`;

export const InputsContainer = styled.div`
  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0;

    legend {
      align-self: flex-start;
      font-weight: 700;
      color: #fff;
      font-size: 18px;
      margin-bottom: 10px;
    }

    > div {
      margin-bottom: 10px;
      width: 360px;

      &:last-child {
        margin-bottom: 40px;
      }
    }
  }
`;
