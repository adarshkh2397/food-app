import { useEffect, useCallback, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealsListData, setMealsListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_DOMAIN}/meals.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMealsListData(loadedMeals);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  let content = <p>No meals found!</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (mealsListData.length > 0) {
    const mealsList = mealsListData.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    ));

    content = mealsList;
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
