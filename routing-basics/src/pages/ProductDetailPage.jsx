import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const { productId } = useParams();

  return (
    <>
      <h1>Products Details for {productId}</h1>
    </>
  );
}
