import { useRef } from "react";
import { SubmitHandler, FormHandles } from "@unform/core";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { useFood } from "../../hooks/useFood";

import { FoodProp } from "../../types";

interface ModalEditFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingFood: EditFoodData | undefined;
}

type EditFoodData = Omit<FoodProp, "available" | "id"> & {
  id: number | undefined;
};

const ModalEditFood = ({
  isOpen,
  onRequestClose,
  editingFood,
}: ModalEditFoodProps) => {
  const formRef = useRef<FormHandles>(null);

  const { handleEditFood } = useFood();

  const handleSubmit: SubmitHandler<FoodProp> = async (data) => {
    const food = { ...data, id: editingFood?.id };
    await handleEditFood(food);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => onRequestClose()}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
