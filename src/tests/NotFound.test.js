import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Not Found', () => {
  test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    const notFound = screen.getByRole('heading', {
      level: 2, name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Testa Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/xablau');
    });
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { alt: 'Pokédex' });
    expect(img).toHaveProperty('src', url);
  });
});
