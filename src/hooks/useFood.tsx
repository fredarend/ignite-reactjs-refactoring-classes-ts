import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import { FoodProp } from "../types";

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: FoodProp[];
  handleAddFood: (data: FoodData) => Promise<void>;
  handleDeleteFood: (foodId: number) => Promise<void>;
  handleEditFood: (data: EditFoodData) => Promise<void>;
}

type FoodData = Omit<FoodProp, "id" | "available">;
type EditFoodData = Omit<FoodProp, "available" | "id"> & {
  id: number | undefined;
};

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps): JSX.Element {
  const [foods, setFoods] = useState<FoodProp[]>([]);

  useEffect(() => {
    async function loadFoods() {
      api.get("foods").then((response) => setFoods(response.data));
    }

    loadFoods();
  }, []);

  const handleAddFood = async (data: FoodData) => {
    try {
      const response = await api.post("/foods", {
        ...data,
        availabel: true,
      });

      setFoods([...foods, response.data]);
      toast.success("Prato cadastrado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar prato");
    }
  };

  const editingFood = {};

  const handleEditFood = async (food: EditFoodData) => {
    try {
      const foodUpdated = await api.put(`/foods/${food.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
      toast.success("Prato editado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar prato");
    }
  };

  const handleDeleteFood = async (foodId: number) => {
    try {
      await api.delete(`/foods/${foodId}`);
      toast.success("Prato removido com sucesso!");

      const foodsFiltered = foods.filter((food) => food.id !== foodId);

      setFoods(foodsFiltered);
    } catch {
      toast.error("Erro ao excluir do prato");
    }
  };

  return (
    <FoodsContext.Provider
      value={{ foods, handleAddFood, handleDeleteFood, handleEditFood }}
    >
      {children}
    </FoodsContext.Provider>
  );
}

export function useFood(): FoodsContextData {
  const context = useContext(FoodsContext);

  return context;
}
