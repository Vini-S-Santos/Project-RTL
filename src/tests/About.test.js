import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const information = screen.getByText(/This application simulates a Pokédex/i);
    expect(information).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const information = screen.getByRole('heading', {
      level: 2, name: /About Pokédex/i,
    });
    expect(information).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const informationOne = screen.getByText(/This application simulates a Pokédex/i);
    const informationTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(informationOne && informationTwo).toBeInTheDocument();
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { alt: 'Pokédex' });
    expect(img).toHaveProperty('src', url); // https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value para verificar se a propriedade fornecida na referência keyPath existe para um objeto.
  });
});
