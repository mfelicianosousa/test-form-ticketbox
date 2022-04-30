
describe('home page',()=>{
    it('App deve estar online',()=>{
        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
        cy.get('h1').should('have.text','TICKETBOX')
    } )
})