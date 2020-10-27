import React from 'react';

import Modal from '..';

import { Container, CloseModal } from './styles';
import Button from '../../Button';

interface IModalProps {
  text: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const InfoModal: React.FC<IModalProps> = ({ text, isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <CloseModal onClick={setIsOpen}>
        <strong>X</strong>
      </CloseModal>
      <Container>
        <div>
          <strong>{text}</strong>

          <Button
            backgroundColor="#2b1c81"
            textColor="#fff"
            type="button"
            onClick={setIsOpen}
          >
            Ok
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default InfoModal;
