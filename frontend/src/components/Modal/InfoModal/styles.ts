import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 30px 0;
    width: 100%;

    strong {
      margin-bottom: 2rem;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      width: 50%;
    }
  }
`;

export const CloseModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;

  strong {
    cursor: pointer;
    font-size: 32px;
    font-weight: 700;
  }
`;
