import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;

  a {
    color: #1cd8d2;
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#1cd8d2')};
    }
  }

  > button {
    margin-left: 50px;
    color: #d84b1c;
    font-size: 24px;
    font-weight: 700;
    border: 0;
    background: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#d84b1c')};
    }
  }

  section {
    margin: 0 50px;

    button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 0;
      background: none;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid #2b1c81;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  div {
    margin: 0 50px;
    width: 60px;
    height: 60px;

    background: #1cd8d2;
    border-radius: 50%;
    border: 2px solid #2b1c81;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    button {
      border: 0;
      background: none;

      width: 60px;
      height: 60px;
      border-radius: 50%;

      svg {
        width: 30px;
        height: 30px;
      }
    }

    &:hover {
      background: ${shade(0.2, '#1cd8d2')};
    }
  }
`;
