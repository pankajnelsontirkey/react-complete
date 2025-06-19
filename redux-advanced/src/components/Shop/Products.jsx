import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'My First Book',
    description: 'The first book writtern by me.',
    price: 6
  },
  {
    id: 'p2',
    title: 'My Second Book',
    description: 'I did it again.',
    price: 7
  }
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
