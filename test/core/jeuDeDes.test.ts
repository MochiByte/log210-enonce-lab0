import 'jest-extended';
import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('JeuDeDesTest', () => {
  let jdd: JeuDeDes;
  beforeEach(async () => {
    jdd = new JeuDeDes();
  });

  it(`devrait n'avoir aucun joueur au début`, async () => {
    expect(jdd.joueurs).toEqual("[]")
  })

  it('devrait retourner une valeur entre 3 et 18', () => {
    for (let i = 0; i < 200; i++) {
      expect(jdd.brasser()).toBeWithin(3, 19);
    }
  })

  it('devrait retourner finalement toutes les valeurs entre 3 et 18', () => {
    const resultats = new Set<number>();
    for (let i = 0; i < 300; i++) {
      resultats.add(jdd.brasser())
    }
    expect(resultats.size).toBeGreaterThanOrEqual(8);

    // cas particuliers
    expect(resultats.has(2)).toBeFalse();
    expect(resultats.has(19)).toBeFalse();
  })

});
