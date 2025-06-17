import useHttp from '../hooks/useHttp';
import { API } from '../utils/constants';
import Error from './Error';
import MealItem from './MealItem';

const requestConfig = {};

export default function Meals() {
  const {
    data: meals,
    error,
    isLoading
  } = useHttp(`${API}/meals`, requestConfig, []);

  if (error) {
    return <Error title='Failed to fetch meals' message={error} />;
  }

  return (
    <>
      <ul id='meals'>
        {isLoading ? (
          <p className='center'>Loading mouth-watering deliciousness...</p>
        ) : null}

        {meals?.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
