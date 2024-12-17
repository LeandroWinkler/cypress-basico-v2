describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
         cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })
    // Eu fiz esse teste, mas não criei uma variável com texto longo.
    it('preenche o campo Como posso te ajudar com delay', function() {
        cy.get('#firstName').type('Leandro').should('have.value', 'Leandro')
        cy.get('#lastName').type('Winkler').should('have.value', 'Winkler')
        cy.get('#email').type(Cypress.env('login')).should('have.value','teste@exemplo.com')
        cy.get('#open-text-area').type ('Curso legal', {delay: 0}).should('have.value', 'Curso legal')
        cy.get('button[type="submit"]').click()
    })
    //Resolução feita no curso, criando uma variável com um texto longo
    it('preenche o campo Como posso te ajudar com delay', function() {
        const longtext = ('Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, Curso legal, ')
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Winkler')
        cy.get('#email').type('leandrowinkler2@gmail.com')
        cy.get('#open-text-area').type (longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
    })
    it('validar mensagem de sucesso', function() {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Winkler')
        cy.get('#email').type('leandrowinkler2@gmail.com')
        cy.get('#open-text-area').type ('Curso legal')
        cy.get('button[type="submit"]').click()
        cy.get('span.success > strong').should('be.visible')
    })
    it('validar mensagem de campos obrigatórios', function() {
        cy.get('#firstName').type('Leandro')
        cy.get('#lastName').type('Winkler')
        cy.get('#email').type('leandrowinkler22gmail.com')
        cy.get('#open-text-area').type ('Curso legal')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('campo de telefone não aceita caractere não numérico', function() {
        cy.get('#phone').type('abc').should('have.value', '')
    })
    it('campo de telefone aceita caractere numérico', function() {
        cy.get('#phone').type('123').should('have.value', '123')
    })
    it('erro quando campo telefone é obrigatório e não é preenchido', function() {
        cy.get('#phone-checkbox').click()
        cy.get('button').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Leandro').should('have.value', 'Leandro').clear().should('have.value', '')
        cy.get('#lastName').type('Winkler').should('have.value', 'Winkler').clear().should('have.value', '')
        cy.get('#phone').type('123').should('have.value', '123').clear().should('have.value', '')
        cy.get('#email').type('leandrowinkler2@gmail.com').should('have.value', 'leandrowinkler2@gmail.com').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button').click()
        cy.get('.error').should('be.visible')
    })
    it('Prencher os campos obrigatórios e submeter com camando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit('Leandro', 'Winkler', 'leandrowinkler2@gmail.com', 'Curso legal')
        cy.get('.success').should('be.visible')
    })
    it('Clicar usando cy.contains()', function(){
        cy.contains('Nome').type('Leandro')
        cy.contains('Sobrenome').type('Winkler')
        cy.contains('E-mail').type('leandrowinkler2@gmail.com')
        cy.contains('Telefone').type('123')
        cy.get('#phone-checkbox').click()
        cy.contains('Feedback').click()
        cy.contains('Elogio').click()
        cy.contains('Ajuda').click()
        cy.contains('Como podemos te ajudar?').parent().find('textarea').type('Obrigado! :)')
        cy.contains('Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('Select do tipo texto em campos de seleção suspensa ', function() {
        cy.get('select').select('YouTube').should('have.value', 'youtube') 
        // Passando no get o (select) porque só tem um elemento #product na aplicação, se houvesse mais #product eu deveria ser mais específico no get
    })
    it('Select do tipo valor em campos de seleção suspensa', function() {
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    })
    it('Select do tipo índice em campos de seleção suspensa',function() {
        cy.get('select').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback', function() {
        cy.get(':nth-child(4) > input[type="radio"]').check().should('have.value', 'feedback')
    })
    // Forma não otimizada de código - Feito por mim
    it('Marca cada tipo de atendimento,', function() {
        cy.get(':nth-child(2) > input[type="radio"]').check().should('be.checked').should('have.value', 'ajuda')
        cy.get(':nth-child(3) > input[type="radio"]').check().should('be.checked').should('have.value', 'elogio')
        cy.get(':nth-child(4) > input[type="radio"]').check().should('be.checked').should('have.value', 'feedback')
    })
    //Forma otimizada usando . each e .wrap
    it('Marca cada tipo de atendimento c/ each e wrap', function() {
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    // Repare que o .as() cria uma alias "checkboxes" onde eu posso posteriormente chamar @checkboxes, isso é útil quando eu preciso chamar os checkboxes várias vezes dentro do teste
    it('Marcando checkboxes e desmarcando o último', function() {
        cy.get('#check input[type="checkbox"]').as('checkboxes').check().should('be.checked')
        cy.get('@checkboxes').last().uncheck().should('not.checked')
    })
    it('Mensagem de erro ao enviar formulário com o checkbox telefone ticado mas não preenchido', function() {
        cy.get('#firstName').type('Leandro').should('have.value', 'Leandro')
        cy.get('#lastName').type('Winkler').should('have.value', 'Winkler')
        cy.get('#email').type('leandro@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('Curso Legal').should('have.value', 'Curso Legal')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('Fazer upload de arquivo', function() {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Fazer upload de arquivo com drag and drop', function() {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should('have.prop', 'files')
            .and('have.length', 1)
            .and(files => {
                expect(files[0].name).to.equal('example.json')
        })
    })
    it('Enviando um arquivo que foi passado um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should('have.prop', 'files')
            .and('have.length', 1)
            .and(files => {
                expect(files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a polítiva de privacidade abre m outra aba sem a necessidade de um clique', function() {
        cy.get('a[href="privacy.html"]').should('have.attr','target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    it('Preenche o campo texto livre utilizando o invoke',function() {
        cy.get('#open-text-area')
            .invoke('val','Testando o invoke')
            .should('have.value','Testando o invoke')
    })

    it('Preenche o campo de texto livre utlizando o invoke e repeat', function() {
        const longtext = Cypress._.repeat ('123456789', 20)
        cy.get('#open-text-area')
            .invoke('val',longtext)
            .should('have.value',longtext)
    })

    it('Exibe e esconde a mensagen de sucesso usando o invoke', function() {
        cy.get('.success')
          .should('exist') // Garante que o elemento está no DOM
          .should('not.be.visible') // Confirma que está oculto
          .invoke('show') // Torna visível
          .should('be.visible') // Confirma visibilidade
          .and('contain', 'Mensagem enviada com sucesso.') // Verifica o texto
          .invoke('hide') // Torna oculto novamente
          .should('not.be.visible'); // Confirma que está oculto
    
        // Testar a mensagem de erro
        cy.get('.error')
          .should('not.be.visible') // Confirma que está oculto
          .invoke('show') // Torna visível
          .should('be.visible') // Confirma visibilidade
          .and('contain', 'Valide os campos obrigatórios!') // Verifica o texto
          .invoke('hide') // Torna oculto novamente
          .should('not.be.visible'); // Confirma que está oculto
    })
    it('Validar mensagem de erro usando clock, tick e usando o lodash integrado do cypress', function() {
        cy.clock()
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
        })
    })