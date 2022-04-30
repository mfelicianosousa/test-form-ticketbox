class SignupPage{

    go(){
       // Check point da página principal do formulário de cadastro
       cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
       cy.get('h1').should('have.text','TICKETBOX')
    }

    fillForm( ticket ){
        //cy.get('#first-name').type('Marcelino')
        cy.get('#first-name').type( ticket.firstName ) 
        cy.get('#last-name').type( ticket.lastName )
        cy.get('#email').type( ticket.email )
        cy.get('#ticket-quantity').select(ticket.quantity)
        cy.get('#ticket-quantity').should('have.value', '4')
             cy.get(`[id=${ticket.typed}]`).click().should('be.checked');
        cy.get(`[id=${ticket.event}]`).click().should('be.checked');
        cy.get('#requests').then($elemento =>{
            cy.wrap($elemento).type(ticket.requests)
            cy.get('#agree').click().should('be.checked')
          })
        var signature = ticket.firstName.concat(' ',ticket.lastName) 
        cy.get('#signature').type(signature)

    }


    submit(){
        cy.get('[type="submit"]').click()  
    }

    modalContentShoudBe( msg ){
        cy.get('[class=success] p')
          .should('contain', msg )
          .and('be.visible')
    }

    reset(){
        cy.get('.reset').click()
    }

}

export default new SignupPage ;