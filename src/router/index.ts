import { Route } from './types';

export class Router {
  private routes: Route[];
  private rootElement: HTMLElement;

  constructor(routes: Route[], rootElement: HTMLElement) {
    this.routes = routes;
    this.rootElement = rootElement;
    this.init();
  }

  private init() {
    window.addEventListener('popstate', () => this.handleRoute());

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href') || '/');
      }
    });

    this.handleRoute();
  }

  private async handleRoute() {
    const path = window.location.pathname;
    const route =
      this.routes.find((route) => route.path === path) || this.routes[0];

    while (this.rootElement.firstChild) {
      this.rootElement.removeChild(this.rootElement.firstChild);
    }

    try {
      const component = route.component();

      if (component instanceof Promise) {
        const element = await component;
        this.rootElement.appendChild(element);
      } else {
        this.rootElement.appendChild(component);
      }
    } catch (error) {
      console.error('Error rendering route', error);
    }
  }

  public navigate(path: string) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}
