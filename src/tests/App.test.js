import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o component App', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const buttonHome = screen.getByRole('link', { name: /home/i });
    const buttonAbout = screen.getByRole('link', { name: /about/i });
    const buttonFavorite = screen.getByRole('link', { name: /favorite/i });
    expect(buttonHome).toBeInTheDocument();
    expect(buttonAbout).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const buttonHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(buttonHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const buttonAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(buttonAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const buttonFavorite = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(buttonFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
      console.log(history);
    });
    const notFound = screen.getByRole('heading', {
      level: 2, name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
