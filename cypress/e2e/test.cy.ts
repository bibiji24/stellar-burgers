describe('Tests of ConstructorPage', function() {
  const elementsSelectors ={
    modal: 'div[id=modals]',
    modalCloseButton: '[data-testid="modal-close-button"]',
    constructorElement: '[data-testid="constructor-element"]',
    topBun: '[data-testid="top-bun"]',
    botomBun: '[data-testid="bottom-bun"]',
    ingredient: '[data-testid="ingredient"]',
    addIngredient: '[data-testid="ingredient"] button'
  }
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('userData');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json',
      statusCode: 200
    }).as('createOrder');

    cy.setCookie('accessToken', 'mock-access-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');

    cy.visit('/');

    cy.get(elementsSelectors.modal).as('modal')

    cy.wait(['@getIngredients', '@userData']);
  });

  it('App is available on localhost:4000', function() {
    cy.contains('Соберите бургер'); 
  });

  it('User data is available', function() {
    cy.get('[data-testid="user-name"]').should('have.text', 'User');
  })

  it('Ingredients can be added', function() {
    cy.get(elementsSelectors.addIngredient).each(function($btn) {
      if (cy.wrap($btn).contains('Добавить')) {
        cy.wrap($btn).click();
      }
    })
    cy.get(elementsSelectors.constructorElement).should('have.length', 2);
    cy.get(elementsSelectors.topBun).should('have.length', 1);
    cy.get(elementsSelectors.botomBun).should('have.length', 1);
  })

  it('modals work properly', function() {
    cy.get(elementsSelectors.ingredient).first()
      .click();
    cy.get('@modal').children().should('have.length.above', 1);
    cy.get('@modal').first().within(() => {
      cy.get(elementsSelectors.modalCloseButton).click();
    })
    cy.get('@modal').children().should('have.length', 0);
  });

  it('modals are closed on overlay click', function() {
    cy.get(elementsSelectors.ingredient).first()
      .click();
    cy.get('@modal').children().should('have.length.above', 1);
    cy.get('@modal').children().last().click({ force: true });
    cy.get('@modal').children().should('have.length', 0);
  });

  it('make order', function() {
    cy.get(elementsSelectors.addIngredient).each(function($btn) {
      if (cy.wrap($btn).contains('Добавить')) {
        cy.wrap($btn).click();
      }
    })
    cy.get('[data-testid="order-button"]').click();
    cy.get('@modal').children().should('have.length.above', 1);
    cy.contains('Ваш заказ начали готовить');
    cy.contains('11111');
    cy.get('@modal').first().within(() => {
      cy.get(elementsSelectors.modalCloseButton).click();
    })
    cy.get(elementsSelectors.constructorElement).should('have.length', 0);
    cy.get(elementsSelectors.topBun).should('have.length', 0);
    cy.get(elementsSelectors.botomBun).should('have.length', 0);
  })
});