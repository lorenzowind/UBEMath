import { shade } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

interface CompletedCircleProps {
  isFilled: boolean;
}

const appearFromTop = keyframes`
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(0);
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
  justify-content: center;
  flex-direction: row;

  width: 70%;
  padding-top: 120px;
  height: 100%;

  animation: ${appearFromTop} 0.5s;

  > strong {
    font-size: 2vw;
    font-weight: 700;
    color: #2b1c81;
  }

  h1 {
    font-size: 3vw;
    font-weight: 700;
    color: #2b1c81;
  }

  section {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  @media only screen and (max-width: 1100px) {
    & {
      display: none;
    }
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;

  button {
    display: flex;
    background: none;
    border: 0;

    &:hover {
      svg {
        color: ${shade(0.2, '#e26f55')};
      }

      strong {
        color: ${shade(0.2, '#e26f55')};
      }
    }

    svg {
      width: 30px;
      height: 30px;
      color: #e26f55;
      transition: color 0.2s;
    }

    strong {
      margin-left: 5px;
      font-size: 24px;
      font-weight: 700;
      color: #e26f55;
      transition: color 0.2s;
    }
  }

  nav {
    margin: 20px 0 0 20px;

    div {
      display: flex;
      align-items: center;
      flex-direction: row;
      position: relative;
      width: 100%;

      & + div {
        padding-top: 20px;
      }

      div {
        width: 25px;
        height: 25px;
      }

      strong {
        cursor: pointer;
        margin-left: 20px;
        font-size: 18px;
        font-weight: 700;
        color: #55e2c1;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, '#55e2c1')};
        }
      }
    }
  }
`;

export const CompletedCircle = styled.div<CompletedCircleProps>`
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  border: solid 3px #2b1c81;

  ${props =>
    props.isFilled &&
    css`
      background: #2b1c81;
    `}

  &:hover {
    border: solid 3px ${shade(0.2, '#2b1c81')};
  }
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  border-radius: 13px;
  border: solid 3px #2b1c81;
  margin: 0 0 40px 40px;
`;
