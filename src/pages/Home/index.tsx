import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { useFetch } from 'ei-fetch';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}
interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const { data, isLoading, isError } = useFetch({ url: 'http://localhost:3333/products' })
  const { addProduct, cart } = useCart();
  
  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    return sumAmount = {
      ...sumAmount,
      [product.id]: product.amount
    }
  }, {} as CartItemsAmount)

  function handleAddProduct(id: number) {
    addProduct(id)
  }
 
  if (isLoading) return <ProductList>...Carregando</ProductList>
  if (isError) return <ProductList>Erro ao carrega os produtos</ProductList>
  return (
    <ProductList>
      {
        data?.map((product: Product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{ formatPrice(product.price) }</span>
            <button
              type="button"
              data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))
      } 
    </ProductList>
  );
};

export default Home;
