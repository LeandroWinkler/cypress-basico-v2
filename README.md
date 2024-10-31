#Documentação básica para rodar os testes no projeto#

## Pré-requisitos
É necessário ter o Node.js e o npm instalados 
- Estou usando a versão 20.18.0 do Node.js e a versão 10.8.2 do npm (Sugiro usar as mesmas versões ou inferiores)
    - Para baixar o Node.js acesse o site https://nodejs.org/en/download/source-code (O npm já vem com o pacote do Node.js)
___________________________________________________________________________________________________________________

## Instalando depedências
- Rode o comando "npm install" em seu terminal para baixa todas as depedências.
___________________________________________________________________________________________________________________

## Testes
Rodando os testes via cypress runner
- Em seu arquivo package.json adicione o script "cy:open": "cypress open" para ter acesso ao cypress runner quando rodar o comando abaixo.
- Para a realização dos testes rode o comando "npm run cy:open" em seu terminal para abrir o cypress runner em seu navegador.

Rodando testes simulando mobile via cypress runner
- Instale o pacote cross-env rodando o comando "npm install cross-env --save-dev" em seu terminal
- Em seu arquivo package.json adicione o script "cypress:open:mobile": "cross-env CYPRESS_VIEWPORT_WIDTH=410 CYPRESS_VIEWPORT_HEIGHT=860 cypress open" para ter acesso ao cypress runner quando rodar o comando abaixo.
- Rode o comando "npm run cypress:open:mobile em seu terminal para abrir o cypress runner em seu navegador.

Rodando testes via modo headless
- Em seu terminal rode o comando "npx cypress run" e o teste irá começa a ser realizado

Rodando testes simulando mobile via modo headless
- Para rodar os testes simulando o mobile no modo headless, rode o comando "npx cypress run --config viewportWidth=410,viewportHeight=860 --headless" em seu terminal.

Obs: Lembrando que os valores de resolução no viewportWidth e viewportHeight podem ser alterados para a resolução desejada.