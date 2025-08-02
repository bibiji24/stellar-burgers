describe('Tests of ConstructorPage', function() {
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

    cy.visit('http://localhost:4000');

    cy.wait(['@getIngredients', '@userData']);
  });

  it('App is available on localhost:4000', function() {
    cy.contains('Соберите бургер'); 
  });

  it('User data is available', function() {
    cy.get('[data-testid="user-name"]').should('have.text', 'User');
  })

  it('Ingredients can be added', function() {
    cy.get('[data-testid="ingredient"] button').each(function($btn) {
      if (cy.wrap($btn).contains('Добавить')) {
        cy.wrap($btn).click();
      }
    })
    cy.get('[data-testid="constructor-element"]').should('have.length', 2);
    cy.get('[data-testid="top-bun"]').should('have.length', 1);
    cy.get('[data-testid="bottom-bun"]').should('have.length', 1);
  })

  it('modals work properly', function() {
    cy.get('[data-testid="ingredient"]').first()
      .click();
    cy.get('div[id=modals]').children().should('have.length.above', 1);
    cy.get('div[id=modals]').first().within(() => {
      cy.get('[data-testid="modal-close-button"]').click();
    })
    cy.get('div[id=modals]').children().should('have.length', 0);
  });

  it('modals are closed on overlay click', function() {
    cy.get('[data-testid="ingredient"]').first()
      .click();
    cy.get('div[id=modals]').children().should('have.length.above', 1);
    cy.get('div[id=modals]').children().last().click({ force: true });
    cy.get('div[id=modals]').children().should('have.length', 0);
  });

  it('make order', function() {
    cy.get('[data-testid="ingredient"] button').each(function($btn) {
      if (cy.wrap($btn).contains('Добавить')) {
        cy.wrap($btn).click();
      }
    })
    cy.get('[data-testid="order-button"]').click();
    cy.get('div[id=modals]').children().should('have.length.above', 1);
    cy.contains('Ваш заказ начали готовить');
    cy.contains('11111');
    cy.get('div[id=modals]').first().within(() => {
      cy.get('[data-testid="modal-close-button"]').click();
    })
    cy.get('[data-testid="constructor-element"]').should('have.length', 0);
    cy.get('[data-testid="top-bun"]').should('have.length', 0);
    cy.get('[data-testid="bottom-bun"]').should('have.length', 0);
  })
});