///<reference types="cypress"/>
import signup from '../pages/SignupPage'

describe('Testes Automátizado', () => {

  beforeEach(function() {
    
    cy.fixture('ticketData').then((t)=> {
      this.ticket = t
    })
  })

  it('Preenchimento do formulário de ticket',function(){
    
    signup.go()
    signup.fillForm( this.ticket.signup )
    
    signup.submit()
    signup.modalContentShoudBe('Ticket(s) successfully ordered.')    
    signup.reset()  
  })
})
