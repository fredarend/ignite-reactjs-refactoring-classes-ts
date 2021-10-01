import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";

import { Container } from "./styles";
import { FoodProp } from "../../types";
import { useFood } from "../../hooks/useFood";
import api from "../../services/api";

interface FoodProps {
  food: FoodProp;
  openModal: () => void;
}

const Food = ({ food, openModal }: FoodProps): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(false);

  const { handleDeleteFood } = useFood();

  const handleTogleAvailable = async () => {
    try {
      await api.put(`/foods/${food.id}`, {
        ...food,
        available: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch {
      toast.error("Aconteceu um erro ao alterar o status do prato");
    }
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => openModal()}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={() => handleTogleAvailable()}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
