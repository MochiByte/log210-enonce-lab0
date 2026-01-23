// Vous devez insérer les nouveaux tests ici
import request from 'supertest';
import { assert } from 'console';
import 'jest-extended';

import app from '../../src/app';

describe('Get /api/v1/jeu/redemarrerJeu', () => {
  
  beforeAll(async () => {
    
    const r1 = await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'Alice' })
      .set('Accept', 'application/json');
   
    const r2 = await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'Bob' })
      .set('Accept', 'application/json');

    expect([200, 201]).toContain(r1.status);
    expect([200, 201]).toContain(r2.status);
  });

  it('devrait redémarrer le jeu avec succès', async () => {
    const res = await request(app)
      .get('/api/v1/jeu/redemarrerJeu')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.header['content-type']).toMatch(/application\/json/i);
    expect(res.body.message).toBe('Success');
  });

  it("devrait respecter la postcondition : il n'y a plus de joueurs", async () => {
    const res = await request(app)
      .get('/api/v1/jeu/joueurs')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.header['content-type']).toMatch(/application\/json/i);
    
    const joueurs = Array.isArray(res.body) ? res.body : res.body.joueurs;
    expect(joueurs).toBeArray();
    expect(joueurs).toBeEmpty();
  });
});
