// load type definitions that come with Cypress module
/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>

    typeMapBox(selector: string, txt: string): Chainable<Element>

    deleteMapBoxField(selector: string): Chainable<Element>

    clickBlockInfos(blockIndex: number): Chainable<Element>

    addActivities(activityIndex: number, cardIndex: number): Chainable<Element>

    verifyNotEmpty(selector: string): Chainable<Element>

    login(): Chainable<Element>
  }
}

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy=${value}]`));

// Enter address in Mapbox fields (click on first suggestions element)
Cypress.Commands.add('typeMapBox', (selector: string, txt: string) => {
  cy.get(selector)
    .type(txt);

  cy.get('.suggestions', { timeout: 1000 })
    // .first()
    .should('be.visible')
    .children()
    .first()
    .click();

  return (cy.get(selector));
});

// Delete text in Mapbox fields
Cypress.Commands.add('deleteMapBoxField', (selector: string) => {
  cy.get(selector)
    .parent()
    .find('.geocoder-pin-right')
    .children('button')
    .click();

  return (cy.get(selector));
});

// Click infos block
Cypress.Commands.add('clickBlockInfos', (infosIndex: number) => {
  // Click infosIndex block
  // Get infos block
  cy.get('#infos')
    .children('div[class=infos]')
    // .as('infosBlock');
  // cy.get('@infosBlock')
    .eq(infosIndex)
    .children('div[class=infos-svg]')
    .click();

  // Verify if events modal is visible
  cy.get('#modalMap')
    .should('exist')
    .and('be.visible');
});

// Add activities from list
Cypress.Commands.add('addActivities', (activityIndex: number, cardIndex: number) => {
  // Wait for activities fetch
  cy.intercept({ method: 'GET', url: '/find/*' }).as('findActivities');

  // Click activityIndex element of list
  cy.get('#activitiesList')
    .should('exist')
    .and('be.visible')
    .children()
    .eq(activityIndex)
    .click();

  cy.wait('@findActivities');

  // Add cardIndex activity
  cy.get('#activitiesCard')
    .should('be.visible')
    .and('not.be.empty')
    .children()
    .eq(cardIndex)
    .find('div[class=btn-card]')
    .eq(1)
    .click();

  // Check if activity add to history
  return (
    cy.get('#addHistoryDesktop')
      .should('exist')
      .and('be.visible')
      .and('not.be.empty')
      .children()
  );
});

// Verify element
Cypress.Commands.add('verifyNotEmpty', (selector: string) => (
  cy.get(selector)
    .should('exist')
    .and('be.visible')
    .and('not.be.empty')
));

// Auto Login
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/user/login',
    body: {
      email: 'user@test.fr',
      password: '123123',
    },
  })
    .then((resp) => {
      window.localStorage.setItem('jwt', resp.body);
    });
});
