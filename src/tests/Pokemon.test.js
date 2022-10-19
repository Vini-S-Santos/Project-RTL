import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    const pikachuPng = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const charmandarPng = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(pokemonImg).toHaveProperty('src', pikachuPng);
    expect(pokemonImg.alt).toBe('Pikachu sprite');

    userEvent.click(nextButton);
    expect(pokemonName).toHaveTextContent(/charmander/i);
    expect(pokemonType).toHaveTextContent(/fire/i);
    expect(pokemonWeight).toHaveTextContent(/average weight: 8.5 kg/i);
    expect(pokemonImg).toHaveProperty('src', charmandarPng);
    expect(pokemonImg.alt).toBe('Charmander sprite');
  });

  test('Testa se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonDetailsButton = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetailsButton).toBeInTheDocument();
    expect(pokemonDetailsButton).toHaveAttribute('href', '/pokemons/25');
  });

  test('Testa se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon com a URL correspondente ao ID.', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetailsButton);
    const textPokemonDetails = screen.getByRole('heading', { level: 2, name: /pikachu details/i });
    expect(textPokemonDetails).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsButton);
    const labelFavoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(labelFavoritePokemon);
    history.push('/');
    const textAltStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(textAltStar.src).toContain('/star-icon.svg');
  });
});
