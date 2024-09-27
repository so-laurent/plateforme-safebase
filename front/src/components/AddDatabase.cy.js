import React from 'react'
import AddDatabase from './AddDatabase'

describe('<AddDatabase />', () => {
  it('should render', () => {
    cy.mount(<AddDatabase />)
  })
})

describe('<AddDatabase />', () => {
  it('should have the right title', () => {
    cy.mount(<AddDatabase />)
    cy.get('h2').should('have.text', 'Ajouter une base de données')
  })
})

describe('Database Connection Tests', () => {
  
  describe('Fail Connection to DB', () => {
    it('should get an error message', () => {
      cy.mount(<AddDatabase />);
      //cy.visit('http://localhost:3000/add')
      cy.get('button').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Erreur lors de l\'ajout de la connexion.');
      });
    });
  });

  describe('Successful Connection', () => {
    it('should connect to the database successfully', () => {
      //cy.visit('http://localhost:3000/add')
      cy.mount(<AddDatabase />);
      cy.get('input[name="host"]').type('localhost');
      cy.get('input[name="user"]').type('root');
      cy.get('input[name="password"]').type('root');
      cy.get('input[name="database"]').type('safebase');
      cy.get('button[name="submit"]').click();
      cy.on('window:alert', (str) => {
        console.log(str, 'totot');
        expect(str).to.contain('BDD enregistré avec succès');
      });
    });
  });
});

