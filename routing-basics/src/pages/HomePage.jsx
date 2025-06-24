import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/products');
  };

  return (
    <>
      <h1>Home Page</h1>

      <p>
        <button onClick={handleNavigate}>Products</button>
      </p>
    </>
  );
}
