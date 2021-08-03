describe('Map Side testing', () => {
  before(() => {
    cy.visit('/');
  });

  // beforeEach(() => {
  //   cy.login();
  // });

  it('Verify starting modal print content', () => {
    // Click to open modal
    cy.get('#openModalPrint')
      .click();

    cy.get('#modalCanvas')
      .should('be.visible')
      .get('#modalDetail')
      .should('be.visible')
      .get('#activitiesDetail')
      .should('not.be.visible')
      .get('#roadDetail')
      .should('not.be.visible')
      .get('#mapDetail')
      .should('not.be.visible');

    // Click on close button
    cy.get('#closePrint')
      .click();

    // Check if modal is not in dom
    cy.get('#modalCanvas')
      .should('not.exist');
  });

  it('Input routes', () => {
    cy.typeMapBox('input[placeholder="Choose a starting place"]', 'Paris')
      .should('have.value', 'Paris, France');

    cy.typeMapBox('input[placeholder="Choose destination"]', 'Lyon')
      .should('have.value', 'Lyon, Rhône, France');

    // Check if infos are in block infos
    cy.get('#infos')
      .children()
      .should('contain', 'Paris')
      .and('contain', 'Lyon');
  });

  it('Add events to trip', () => {
    // Add activities from start
    cy.clickBlockInfos(0);
    cy.addActivities(0, 0)
      .should('have.length', 1);
    // cy.addActivities(1, 0)
    //   .should('have.length', 2);

    // Add activities from end
    cy.clickBlockInfos(1);
    cy.addActivities(2, 0)
      .should('have.length', 2);
    // cy.addActivities(3, 0)
    //   .should('have.length', 4);
  });

  it('Verify ending modal print content', () => {
    // Click to open modal
    cy.get('#openModalPrint')
      .click();

    // Check modal
    cy.verifyNotEmpty('#modalCanvas');
    cy.verifyNotEmpty('#modalDetail');
    cy.verifyNotEmpty('#activitiesDetail');
    cy.verifyNotEmpty('#roadDetail');
    cy.verifyNotEmpty('#mapDetail');

    // Click on close button
    cy.get('#closePrint')
      .click();

    // Check if modal is not in dom
    cy.get('#modalCanvas')
      .should('not.exist');
  });

  it('Close burger menu', () => {
    cy.get('div[class=close]')
      .click();

    cy.get('#modalMap')
      .should('not.exist');
  });

  it('Remove event', () => {
    cy.verifyNotEmpty('#addHistoryDesktop')
      .children()
      .as('container')
      .should('have.length', 2);

    cy.get('@container')
      .first()
      .find('#mdiv')
      .click();

    cy.get('@container')
      .should('have.length', 1);
  });

  it('Remove routes', () => {
    // Get MapBox input to delete
    cy.deleteMapBoxField('input[placeholder="Choose a starting place"]')
      .should('have.value', '')
      .and('be.empty');
    cy.deleteMapBoxField('input[placeholder="Choose destination"]')
      .should('have.value', '')
      .and('be.empty');
  });
});
