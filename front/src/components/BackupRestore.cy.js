import React from 'react'
import BackupRestore from './BackupRestore'

describe('<BackupRestore />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BackupRestore />)
  })
})


describe('failed save', () => {
  it('should be a failed message', () => {
    cy.mount(<BackupRestore />);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Erreur lors de l\'opération');
    });
    cy.get('input[name="database"]').type('jqsdhjksqdshkjq');
    cy.get('input[name="user"]').type('root');
    cy.get('input[name="password"]').type('root');
    cy.get('button').click();
  });
});

describe('succesful save', () => {
  it('should be a success message', () => {
    cy.mount(<BackupRestore />);
    cy.on('window:alert', (str) => {
      expect(str).to.contain('réussie');
    });
    cy.get('input[name="database"]').type('jqsdhjksqdshkjq');
    cy.get('input[name="user"]').type('root');
    cy.get('input[name="password"]').type('root');
    cy.get('button').click();
  });
});