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
  align-items: stretch;

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

    a {
      text-decoration: none;
      margin-right: 50px;
    }

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

  section {
    display: flex;
    justify-content: space-between;

    #signin {
      border: 0;
      width: 180px;
      border-radius: 13px;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
      background-color: #2b1c81;

      font-size: 20px;
      font-weight: 700;
      color: #fff;
      padding: 8px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#2b1c81')};
      }
    }

    #signup {
      border: 0;
      width: 180px;
      border-radius: 13px;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
      border: solid 2px #2b1c81;
      background-color: #93edc7;

      font-size: 20px;
      font-weight: 700;
      color: #2b1c81;
      padding: 8px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#93edc7')};
      }
    }

    button {
      & + button {
        margin-left: 30px;
      }
    }
  }

  @media (max-width: 1368px) {
    margin: 0 25px;
    h1 {
      margin-right: 19px;
    }
    nav {
      padding: 10px 0 10px 19px;

      a {
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

    #signup {
      border: 0;
      width: 200px;
      border-radius: 13px;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
      border: solid 2px #fff;
      background-color: #1cd8d2;

      font-size: 20px;
      font-weight: 700;
      color: #fff;
      padding: 8px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#1cd8d2')};
      }
    }
  }

  img {
    width: 500px;
    height: 500px;
  }
`;
