import { shade } from 'polished';
import styled from 'styled-components';

export const ConteinerTopButtons = styled.div`
  margin-bottom: 40px;

  width: 60vw;
  height: 60px;
  border-radius: 6px;
  background-color: #2b1c81;

  display: flex;
  flex-direction: row;

  button {
    flex: 1;
    background: #2b1c81;
    border: 0;
    border-radius: 13px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#2b1c81')};
    }

    strong {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
    }
  }
`;
