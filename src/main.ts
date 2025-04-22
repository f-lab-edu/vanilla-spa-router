import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { Router } from './router';
import { worker } from './mocks/browser';
import './style.css';

if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const routes = [
  { path: '/', component: Home },
  { path: '/product', component: ProductList },
];

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element not found');
}

const router = new Router(routes, rootElement);

router.navigate(window.location.pathname);
