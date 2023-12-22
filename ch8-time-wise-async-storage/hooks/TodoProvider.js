import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (date, todo) => {
    try {
      const newTodo = {
        id: Date.now().toString(),
        date,
        todo,
        isChecked: false,
      };

      const updateTodos = [...data, newTodo];
      setData(updateTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updateTodos));
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("timeWise");
      if (storedTodos) {
        setData(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodos = data.filter((todo) => todo.id !== id);
      setData(updatedTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const updatedTodos = data.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      );
      setData(updatedTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        data,
        addTodo,
        deleteTodo,
        loadTodos,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  return useContext(TodoContext);
};
