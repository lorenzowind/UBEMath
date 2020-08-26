import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  textColor: string;
  borderColor?: string;
  backgroundColor: string;
};

const Button: React.FC<Props> = ({
  textColor,
  borderColor,
  backgroundColor,
  children,
  ...rest
}) => {
  return (
    <Container
      textColor={textColor}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      type="button"
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Button;
