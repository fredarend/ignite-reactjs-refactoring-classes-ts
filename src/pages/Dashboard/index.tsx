import { useState } from "react";

import Header from "../../components/Header";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

import { useFood } from "../../hooks/useFood";

import { FoodProp } from "../../types";

const Dashboard = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodProp>();

  const { foods } = useFood();

  const toggleAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const toggleEditModal = (food: FoodProp) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <Header openModal={() => toggleAddModal()} />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              openModal={() => toggleEditModal(food)}
            />
          ))}
      </FoodsContainer>

      <ModalAddFood
        isOpen={addModalOpen}
        onRequestClose={() => handleCloseAddModal()}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        onRequestClose={() => handleCloseEditModal()}
        editingFood={editingFood}
      />
    </>
  );
};

export default Dashboard;
