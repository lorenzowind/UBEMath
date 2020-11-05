import React from 'react';
import { Progress } from 'semantic-ui-react';

import { Container } from './styles';

interface Props {
  percent: number;
  color: string;
}

const ProgressBar: React.FC<Props> = ({ percent, color }) => (
  <Container percent={percent} color={color}>
    <Progress percent={percent} progress />
  </Container>
);

export default ProgressBar;
