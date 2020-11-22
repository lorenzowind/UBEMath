import { shade } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.png';

interface CompletedCircleProps {
  isFilled: boolean;
  isAvailable: boolean;
}

interface SubModuleProps {
  isSelected: boolean;
}

interface RightContainerContentProps {
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface AlternativeCardProps {
  color: string;
}

interface AlternativeCircleProps {
  isFilled: boolean;
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
  justify-content: center;
  flex-direction: row;

  width: 70%;
  padding-top: 120px;
  height: 100%;

  animation: ${appearWithFade} 0.5s;

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
  }
`;

export const SubModule = styled.div<SubModuleProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  width: 100%;

  & + div {
    padding-top: 20px;
  }

  div {
    position: absolute;
    width: 25px;
    height: 25px;
  }

  button {
    text-align: start;
    background: none;
    border: 0;
    margin-left: 40px;
    font-size: 24px;
    font-weight: 700;
    color: ${props => (props.isSelected ? shade(0.2, '#55e2c1') : '#55e2c1')};
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#55e2c1')};
    }
  }
`;

export const CompletedCircle = styled.div<CompletedCircleProps>`
  border-radius: 50%;
  border: solid 3px #2b1c81;
  transition: border 0.2s;
  opacity: 0.5;

  ${props =>
    props.isAvailable &&
    css`
      cursor: pointer;
      opacity: 1;

      &:hover {
        border: solid 3px ${shade(0.2, '#2b1c81')};
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      background: #2b1c81;
    `}
`;

export const RightContainerContent = styled.div<RightContainerContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 80%;
  border-radius: 13px;
  border: solid 3px #2b1c81;
  margin: 0 0 40px 40px;

  svg {
    cursor: pointer;
    transition: color 0.2s;

    &:first-child {
      position: absolute;
      left: 0;
      width: 60px;
      height: 60px;
      color: #2b1c81;
    }

    &:last-child {
      position: absolute;
      right: 0;
      width: 60px;
      height: 60px;
      color: #2b1c81;
    }

    &:hover {
      color: ${shade(0.2, '#2b1c81')};
    }

    ${props =>
      props.isFirstPage &&
      css`
        &:first-child {
          cursor: default;

          color: ${shade(0.2, '#fff')};

          &:hover {
            color: ${shade(0.2, '#fff')};
          }
        }
      `}

    ${props =>
      props.isLastPage &&
      css`
        &:last-child {
          cursor: default;

          color: ${shade(0.2, '#fff')};

          &:hover {
            color: ${shade(0.2, '#fff')};
          }
        }
      `}
  }

  img {
    animation: ${appearWithFade} 0.5s;
    max-height: 85%;
    max-width: 85%;
  }
`;

export const RightContainerExercise = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80%;
  border-radius: 13px;
  border: solid 3px #2b1c81;
  margin: 0 0 40px 40px;
  padding: 40px;

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-height: 100%;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 20px;

    ::-webkit-scrollbar {
      width: 9px;
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

    p {
      text-align: justify;
      font-size: 20px;
      font-weight: 700;
      color: #2b1c81;
    }

    nav {
      margin-top: 20px;
    }

    button {
      margin-top: 20px;
      background: none;
      border: 0;
      font-size: 20px;
      font-weight: 700;
      color: #2b1c81;
    }
  }
`;

export const AlternativeCard = styled.article<AlternativeCardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  & + article {
    margin-top: 10px;
  }

  div {
    border: solid 3px ${props => (props.color ? props.color : '#2b1c81')};
  }

  strong {
    text-align: justify;
    font-size: 18px;
    font-weight: 500;
    color: ${props => (props.color ? props.color : '#2b1c81')};
  }

  img {
    width: 100px;
    height: 100px;
  }
`;

export const AlternativeCircle = styled.div<AlternativeCircleProps>`
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transition: border 0.2s;
  margin-right: 20px;

  ${props =>
    props.isFilled &&
    css`
      background: #2b1c81;
    `}

  &:hover {
    border: solid 3px ${shade(0.2, '#2b1c81')};
  }
`;
