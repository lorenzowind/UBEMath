import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  backgroundColor?: string;
  borderFocusedColor?: string;
  iconColor?: string;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.backgroundColor || '#9feee6'};
  border-radius: 10px;
  padding: 12px 16px;
  width: 100%;

  border: 2px solid #2b1c81;
  color: ${props => props.iconColor || '#fff'};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #2b1c81;
      border-color: ${props.borderFocusedColor || '#fff'};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #2b1c81;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #2b1c81;
    font-weight: 400;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
