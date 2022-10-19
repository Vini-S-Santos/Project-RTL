import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test('Testa se as informações detalhadas do pokémon selecionado são mostradas na tela e se pode favorita-lo.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const getTextDetail = screen.getByText(/details/i);
    const getSumary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const getTextLocation = screen.getByText(/game locations of pikachu/i);
    const getResumePokemon = screen.getByText(/this intelligent pokémon/i);
    const getLabelFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(getTextDetail).toBeInTheDocument();
    expect(getSumary).toBeInTheDocument();
    expect(getTextLocation).toBeInTheDocument();
    expect(getResumePokemon).toBeInTheDocument();
    expect(getLabelFavorite).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const locationOne = screen.getAllByRole('img')[1];
    const locationTwo = screen.getAllByRole('img')[2];
    expect(locationOne).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationTwo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(screen.getAllByAltText(/Pikachu location/i));
  });
});
