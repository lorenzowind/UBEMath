import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  left: 0;
  width: 100px;
  height: 95%;
  margin: 0 20px;
  border-radius: 13px;
  box-shadow: 0 60px 80px 0 rgba(0, 0, 0, 0.18);
  background-color: #1cd8d2;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;

  margin: 30px 0;

  button {
    border: 0;
    background: none;

    svg {
      width: 40px;
      height: 40px;
      color: #fff;
    }
  }
`;
