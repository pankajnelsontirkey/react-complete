import { Link, useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const { productId } = useParams();

  return (
    <>
      <h1>Products Details for {productId}</h1>
      <p>
        <Link to='..' relative='path'>
          Back
        </Link>
      </p>
    </>
  );
}
