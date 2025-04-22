export interface Route {
  path: string;
  component: () => HTMLElement | Promise<HTMLElement>;
}
