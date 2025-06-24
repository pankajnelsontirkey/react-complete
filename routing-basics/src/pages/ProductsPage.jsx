import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: '1', title: 'Product 1' },
  { id: '2', title: 'Product 2' },
  { id: '3', title: 'Product 3' }
];

export default function ProductsPage() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((item) => (
          <li key={item.id}>
            <Link to={`/products/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
