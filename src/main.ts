import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { Router } from './router';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
];

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element not found');
}

const router = new Router(routes, rootElement);

router.navigate(window.location.pathname);
