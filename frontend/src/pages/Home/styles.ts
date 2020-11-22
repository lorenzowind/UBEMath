import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromTop = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-x: hidden;

  animation: ${appearFromTop} 1s;
`;

export const FirstContainer = styled.div`
  height: 900px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: linear-gradient(to bottom, #93edc7, #1cd8d2);
`;

export const Header = styled.header`
  height: 140px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 95px;

  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
    margin-right: 59px;
  }

  nav {
    flex: 1;
    padding: 10px 0 10px 59px;

    border-left: 1px solid #fff;

    button {
      border: 0;
      background: none;
      margin-right: 50px;

      strong {
        font-size: 28px;
        font-weight: 700;
        color: #fff;

        white-space: nowrap;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.1, '#fff')};
        }
      }
    }
  }

  section {
    display: flex;
    justify-content: space-between;

    button {
      & + button {
        margin-left: 30px;
      }
    }
  }

  @media (max-width: 1396px) {
    margin: 0 40px;
    h1 {
      margin-right: 19px;
    }
    nav {
      padding: 10px 0 10px 19px;

      button {
        margin-right: 20px;
      }
    }
    section {
      button {
        & + button {
          margin-left: 20px;
        }
      }
    }
  }
`;

export const FirstContainerContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  height: 620px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: max-content;
    text-align: center;

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      margin-bottom: 19px;
    }

    p {
      width: 350px;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      word-break: normal;
      margin-bottom: 27px;
      line-height: 30px;
    }
  }

  img {
    width: 500px;
    height: 500px;
  }
`;

export const SecondContainer = styled.div`
  height: 720px;
  width: 100%;

  display: flex;
  align-items: stretch;
`;

export const SecondContainerContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 110px;

  height: 100%;
  width: 100%;

  img {
    width: 500px;
    height: 500px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: max-content;
    text-align: center;

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #2b1c81;
      white-space: nowrap;
      margin-bottom: 49px;
    }

    p {
      width: 350px;
      font-size: 24px;
      font-weight: 400;
      color: #2b1c81;
      word-break: normal;
      margin-bottom: 17px;
      line-height: 30px;
    }

    h2 {
      font-size: 24px;
      font-weight: 400;
      color: #2b1c81;
    }

    button {
      margin-top: 63px;
    }
  }

  @media (max-width: 1290px) {
    margin: 0;
  }
`;

export const ThirdContainer = styled.div`
  height: 900px;
  width: 100%;

  display: flex;
  align-items: stretch;

  background: #55e2c1;
`;

export const ThirdContainerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 55px;
  }

  div {
    width: 1000px;
    height: 500px;
    opacity: 0.5;
    border-radius: 13px;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 55px;

    strong {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }
  }
`;

export const FourthContainer = styled.div`
  height: 720px;
  width: 100%;

  display: flex;
  align-items: stretch;
`;

export const FourthContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  > article {
    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #2b1c81;
      white-space: nowrap;
      margin-bottom: 49px;
    }
  }

  > div {
    display: flex;
    flex-direction: row;

    img {
      height: 320px;
      margin-right: 30px;
      border-radius: 13px;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30px;

      width: 540px;
      height: 320px;
      opacity: 0.5;
      border-radius: 13px;
      background-color: #000000;

      strong {
        font-size: 28px;
        font-weight: 700;
        color: #fff;
      }
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: max-content;
      text-align: center;

      p {
        font-size: 24px;
        font-weight: 400;
        color: #2b1c81;
        word-break: normal;
        line-height: 30px;
      }

      article {
        h2 {
          font-size: 24px;
          font-weight: 400;
          color: #2b1c81;
        }
      }
    }
  }

  @media (max-width: 1368px) {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        margin-right: 0;
        margin-bottom: 30px;
      }

      div {
        margin-right: 0;
        margin-bottom: 30px;
      }

      section {
        article {
          margin: 10px 0;
        }
      }
    }
  }
`;

export const Footer = styled.footer`
  height: 170px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #1cd8d2;
  text-align: center;

  h1 {
    font-size: 24px;
    opacity: 0.5;
    font-weight: 700;
    color: #2b1c81;
    white-space: nowrap;
  }
`;
