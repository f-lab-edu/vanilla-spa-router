import { http, HttpResponse } from 'msw';
import { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'product 1',
    image: 'https://picsum.photos/200/200?random=1',
    price: 10,
  },
  {
    id: 2,
    name: 'product 2',
    image: 'https://picsum.photos/200/200?random=2',
    price: 200,
  },
  {
    id: 3,
    name: 'product 3',
    image: 'https://picsum.photos/200/200?random=3',
    price: 3000,
  },
  {
    id: 4,
    name: 'product 4',
    image: 'https://picsum.photos/200/200?random=4',
    price: 40000,
  },
  {
    id: 5,
    name: 'product 5',
    image: 'https://picsum.photos/200/200?random=5',
    price: 500000,
  },
];

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts);
  }),
];
