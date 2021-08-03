describe('User Side testing', () => {
  before(() => {
    cy.visit('/');
  });

  it('Test reduce auth content', () => {
    cy.get('#userReduce')
      .click();

    cy.get('#userContent')
      .should('contain', '?');

    cy.get('#userReduce')
      .click();

    cy.get('#userContent')
      .should('contain', 'Sign In')
      .and('contain', 'Register');
  });

  it('Fill register form', () => {
    cy.get('#register')
      .click({ force: true });

    cy.get('input[type=email]')
      .type('user@test.fr');

    cy.get('input[type=password]')
      .eq(0)
      .type('123123');

    cy.get('input[type=password]')
      .eq(1)
      .type('123123');

    // Send register form
    cy.get('#registerButton')
      .click({ force: true });

    // Go back
    // cy.get('#backTo')
    //   .click();
  });

  it('Fail login', () => {
    cy.visit('/');
    // Open sign in form
    cy.get('#signIn')
      .click();

    // Fill form
    cy.get('input[type=email]')
      .type('aze@aze.fr');
    cy.get('input[type=password]')
      .type('13ZAZ');

    // Submit
    cy.get('#signInButton')
      .click();

    // Go back should be visible if login failed
    cy.verifyNotEmpty('#backTo')
      .click();
  });

  it('Pass login form then logout', () => {
    cy.intercept({ method: 'POST', url: '/user/login' }).as('login');

    // Open sign in form
    cy.get('#signIn')
      .click();

    // Fill form
    cy.get('input[type=email]')
      .type('user@test.fr');
    cy.get('input[type=password]')
      .type('123123');

    // Submit
    cy.get('#signInButton')
      .click();

    cy.wait('@login');

    cy.verifyNotEmpty('div[class=connected-user]')
      .click()
      .find('div[class=btn-disconnect]')
      .click();

    cy.get('div[class=connected-user]')
      .should('not.exist');

    cy.get('div[class=main-user]')
      .should('contain', 'Sign In')
      .and('contain', 'Register');
  });

  // it('Logout', () => {
  //   cy.verifyNotEmpty('div[class=connected-user]')
  //     .click()
  //     .find('div[class=btn-disconnect]')
  //     .click();
  //
  //   cy.get('div[class=connected-user]')
  //     .should('not.exist');
  //
  //   cy.get('div[class=main-user]')
  //     .should('contain', 'Sign In')
  //     .and('contain', 'Register');
  // });

  // it('Verify login content and logout', () => {
  //   cy.verifyNotEmpty('div[class=connected-user]')
  //     .click()
  //     .find('div[class=btn]')
  //     .click();
  //
  //   cy.verifyNotEmpty('#routesModal')
  //     .find('div[class=modal-cross]')
  //     .click();
  //
  //   cy.get('#routesModal')
  //     .should('not.exist');
  //
  //   cy.verifyNotEmpty('div[class=connected-user]')
  //     .click()
  //     .find('div[class=btn-disconnect]')
  //     .click();
  //
  //   cy.get('div[class=connected-user]')
  //     .should('not.exist');
  //
  //   cy.get('div[class=main-user]')
  //     .should('contain', 'Sign In')
  //     .and('contain', 'Register');
  // });

  it('Input dates and switch', () => {
    // YYYY-MM-DD for date type
    cy.get('#dateStart').type('2021-06-25').should('have.value', '2021-06-25');
    cy.get('#dateEnd').type('2021-07-23').should('have.value', '2021-07-23');

    // Reverse
    cy.get('img[id=reverseDate]').click();
    cy.get('#dateStart').should('have.value', '2021-07-23');
    cy.get('#dateEnd').should('have.value', '2021-06-25');
  });

  // it('Deplace route radius', () => {
  //   // const currentValue = 500;
  //   // const targetValue = 10000;
  //   // const increment = 100;
  //   // const steps = (targetValue - currentValue) / increment;
  //   // const arrows = '{rightarrow}'.repeat(steps);
  //
  //   // cy.get('div[class=slider-origin]').first();
  //
  //   cy.get('#radiusSlider')
  //     .find('div[role="slider"]')
  //     .trigger('mousedown', { which: 1 })
  //     .trigger('mousemove', { which: 1, clientX: 460 })
  //     .trigger('mouseup', { force: true });
  //
  //   // .should('have.attr', 'aria-valuenow', 500)
  //   // .click(0, 250, { force: true });
  //   // .should('have.attr', 'aria-valuenow', 10000);
  // });
});
