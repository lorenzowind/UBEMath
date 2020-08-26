import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface Props {
  textColor: string;
  borderColor?: string;
  backgroundColor: string;
}

export const Container = styled.button<Props>`
  border: 0;
  width: 200px;
  border-radius: 13px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);

  font-size: 20px;
  font-weight: 700;
  color: ${props => props.textColor};
  padding: 8px;

  ${props =>
    props.borderColor &&
    css`
      border: solid 2px ${props.borderColor};
    `}

  background-color: ${props => props.backgroundColor};
  transition: background-color 0.2s;

  &:hover {
    background: ${props => shade(0.2, props.backgroundColor)};
  }
`;
