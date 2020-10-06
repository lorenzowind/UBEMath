import styled from 'styled-components';
import { shade } from 'polished';

export interface ProfileProps {
  area: string;
}
export const ConteinerChange = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ConteinerImg = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
`;

export const UserPhoto = styled.div`
  background-color: #1cd8d2;
  width: 230px;
  height: 230px;

  border-radius: 50%;
  border: 5px solid #2b1c81;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 180px;
    height: 180px;

    color: #fff;
  }
`;

export const ButtonPhoto = styled.button`
  background-color: #2b1c81;

  width: 50px;
  height: 50px;

  border-radius: 50%;
  position: absolute;

  margin-left: 170px;

  align-self: flex-end;

  svg {
    width: 30px;
    height: 30px;

    color: #fff;

    &:hover {
      color: ${shade(0.3, '#fff')};
    }
  }
`;

export const FormChange = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    'change1 change4'
    'change2 change5'
    'change3 change6'
    'footer footer';
`;

export const InfoChange = styled.div<ProfileProps>`
  grid-area: ${props => props.area};

  display: flex;
  flex-direction: column;
`;
export const LabelChange = styled.p`
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;

  margin-top: 15px;
  margin-left: 20px;
`;

export const InputChange = styled.input`
  width: 350px;
  height: 45px;
  border-radius: 13px;
  border: solid 3px #2b1c81;
  background-color: #fff;

  margin-top: 15px;
  margin-left: 20px;
`;

export const ButtonChange = styled.div`
  grid-area: footer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonChild = styled.button`
  background-color: #2b1c81;
  border-radius: 13px;
  border: solid 2px #ffffff;

  width: 300px;
  height: 50px;

  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;
