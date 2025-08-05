export default async function MealPage({ params }) {
  const { mealId } = await params;

  return (
    <>
      <h1>Meals Page</h1>
      {mealId}
    </>
  );
}
