///<reference types="cypress"/>

describe('home page',()=>{
  it('App deve estar online',()=>{
        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
        cy.get('h1').should('have.text','TICKETBOX')  
  })

})
describe('Testes - Preenchimento do formulario de ticket', () => {
  it('Preenchimento dos dados via arquivo de dados',function(){
      cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')

      // Preenchimento de cada um dos campos.
      cy.fixture('ticketData').as('ticket').then(() => {
         
        //cy.get('#first-name').type('Marcelino')
        cy.get('#first-name').type( this.ticket.firstName ) 
        cy.get('#last-name').type( this.ticket.lastName )
        cy.get('#email').type( this.ticket.email )
        cy.get('#ticket-quantity').select(this.ticket.quantity)
        cy.get('#ticket-quantity').should('have.value', '4')
        cy.get('#requests').then($elemento =>{
          cy.wrap($elemento).type(this.ticket.requests)
          cy.get('#agree').click().should('be.checked')
        })
        //<input type="radio" id="general" value="general">
        //<input type="radio" id="vip" value="vip"> 
        //cy.get('[id="vip"]').click().should('be.checked');
        cy.get(`[id=${this.ticket.typed}]`).click().should('be.checked');
        // id="friend" <=> value="friend"
        // id="social-media" <=> value="media"
        // id="publication"  <=> value="publication"
       // cy.get('[id="publication"]').click().should('be.checked');
        cy.get(`[id=${this.ticket.event}]`).click().should('be.checked');
        
        var signature = this.ticket.firstName+" "+this.ticket.lastName 
        cy.get('#signature').type(signature)
        cy.get('[type="submit"]').click()
        cy.get('[class=success] p')
          .should('contain','Ticket(s) successfully ordered.')
          .and('be.visible')
        cy.get('.reset').click()

      })
  })
})
