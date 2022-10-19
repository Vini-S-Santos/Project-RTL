import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonTesterName = 'pokemon-name';

describe('Testa o componente PokeDex', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encontered = screen.getByRole(
      'heading',
      { level: 2, name: /Encountered pokémons/i },
    );
    expect(encontered).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      const pokemonTestName = screen.getAllByTestId(pokemonTesterName);
      const pokemonName = screen.getByText(name);
      expect(pokemonTestName).toHaveLength(1);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    const Pikachu = screen.getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const pokemonTestName = screen.getAllByTestId(pokemonTesterName);
    const buttonNext = screen.getAllByTestId('next-pokemon');
    userEvent.click(buttonNext[0]);
    expect(pokemonTestName).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const elementalType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const elementalButtons = screen.getAllByTestId('pokemon-type-button');
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonAll).toBeInTheDocument();
    expect(elementalButtons).toHaveLength(elementalType.length);
    elementalType.forEach((elemental) => {
      const elementButton = screen.getByRole('button', { name: elemental });
      expect(elementButton).toBeInTheDocument();
      userEvent.click(elementButton);
      const pokemonType = screen.getAllByText(elemental);
      expect(pokemonType).toHaveLength(2);
      userEvent.click(nextButton);
      expect(pokemonType).toHaveLength(2);
    });
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    const buttonFireElement = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFireElement);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toHaveTextContent(/charmander/i);
    userEvent.click(buttonAll);
    expect(pikachu).toHaveTextContent(/pikachu/i);
  });
});
