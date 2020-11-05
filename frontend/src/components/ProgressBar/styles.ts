import styled from 'styled-components';

interface Props {
  percent: number;
  color: string;
}

export const Container = styled.div<Props>`
  .ui.progress {
    background: #2b1c81;
    border-radius: 6px;
  }

  .ui.progress .bar {
    min-width: 7%;
  }

  .ui.progress .bar > .progress {
    background: ${props => props.color};
    border-radius: 6px;
    color: #2b1c81;
    font-size: 18px;
    font-weight: 700;
    padding: 0 10px;
  }
`;
