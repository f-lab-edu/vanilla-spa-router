import { fetchProducts } from '../api/products';
import { Product } from '../types/product';
import './productList.css';

export const ProductList = async (): Promise<HTMLElement> => {
  const product = document.createElement('div');
  product.className = 'product';

  const title = document.createElement('h1');
  title.textContent = '상품 목록';

  const productList = document.createElement('div');
  productList.className = 'product-list';

  try {
    const products = await fetchProducts();

    products.forEach((product: Product) => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const image = document.createElement('img');
      image.src = product.image;
      image.alt = product.name;

      const name = document.createElement('h3');
      name.textContent = product.name;

      const price = document.createElement('p');
      price.textContent = `${product.price.toLocaleString()}원`;

      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(price);

      productList.appendChild(card);
    });
  } catch (error) {
    console.error('상품 목록을 불러오는데 실패했습니다.', error);
  }

  product.appendChild(title);
  product.appendChild(productList);

  return product;
};
