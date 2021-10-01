import { useRef } from "react";
import { SubmitHandler, FormHandles } from "@unform/core";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { useFood } from "../../hooks/useFood";

interface ModalAddFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface FormData {
  name: string;
  image: string;
  price: string;
  description: string;
}

const ModalAddFood = ({ isOpen, onRequestClose }: ModalAddFoodProps) => {
  const formRef = useRef<FormHandles>(null);
  const { handleAddFood } = useFood();

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    await handleAddFood(data);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => onRequestClose()}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
