const request = require('supertest');
const express = require('express');
const mysql = require('mysql2');
const pg = require('pg');
const { addDatabase } = require('./controllers/databaseController');

const app = express();
app.use(express.json());
app.post('/add-database', addDatabase);

jest.mock('mysql2');
jest.mock('pg');

describe('Tests pour addDatabase', () => {
    // Test unitaire 1 : Vérifie la connexion à MySQL
    it('devrait ajouter une connexion MySQL avec succès', done => {
        const mockConnection = { connect: jest.fn((cb) => cb(null)) };
        mysql.createConnection.mockReturnValue(mockConnection);

        request(app)
            .post('/add-database')
            .send({
                dbType: 'mysql',
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'safebase'
            })
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe('Connexion ajoutée avec succès.');
            })
            .end(err => {
                if (err) return done(err);
                expect(mysql.createConnection).toHaveBeenCalledWith({
                    host: 'localhost',
                    user: 'root',
                    password: 'password',
                    database: 'test_db'
                });
                done();
            });
    });

    /*
    // Test unitaire 2 : Vérifie la connexion à PostgreSQL
    // je n'ai pas POstgreSQL
    it('devrait ajouter une connexion PostgreSQL avec succès', done => {
        const mockConnection = { connect: jest.fn((cb) => cb(null)) };
        pg.Client.mockImplementation(() => mockConnection);

        request(app)
            .post('/add-database')
            .send({
                dbType: 'postgres',
                host: 'localhost',
                user: 'postgres',
                password: 'password',
                database: 'test_db'
            })
            .expect(200)
            .expect(res => {
                expect(res.body.message).toBe('Connexion ajoutée avec succès.');
            })
            .end(err => {
                if (err) return done(err);
                expect(pg.Client).toHaveBeenCalledWith({
                    host: 'localhost',
                    user: 'postgres',
                    password: 'password',
                    database: 'test_db'
                });
                done();
            });
    });
    */

    // Test unitaire 3 : Vérifie la gestion des types de bases de données non pris en compte
    it('devrait retourner une erreur pour un type de base de données non pris en compte', done => {
        request(app)
            .post('/add-database')
            .send({
                dbType: 'mariadb',
                host: 'localhost',
                user: 'user',
                password: 'password',
                database: 'test_db'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.message).toBe('Type de base de données non pris en compte');
            })
            .end(done);
    });

    // Test fonctionnel : Vérifie la gestion d'une erreur de connexion
    it('devrait retourner une erreur de connexion en cas de problème', done => {
        const mockConnection = { connect: jest.fn((cb) => cb(new Error('Erreur de connexion.'))) };
        mysql.createConnection.mockReturnValue(mockConnection);

        request(app)
            .post('/add-database')
            .send({
                dbType: 'mysql',
                host: 'localhost',
                user: 'root',
                password: 'wrong_password',
                database: 'test_db'
            })
            .expect(500)
            .expect(res => {
                expect(res.body.message).toBe('Erreur de connexion.');
            })
            .end(done);
    });
});