export const Home = () => {
  const home = document.createElement('div');
  home.className = 'home';

  const title = document.createElement('h1');
  title.textContent = 'home page';

  const link = document.createElement('a');
  link.href = 'product';
  link.textContent = 'move to product page';

  home.appendChild(title);
  home.appendChild(link);

  return home;
};
