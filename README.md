
# Controle de Recargas

O Controle de Recargas é um projeto que permite acompanhar as recargas de celulares pré-pagos em vista de uma meta mensal. Com ele, é possível ter acesso à venda acumulada, venda do dia, meta de venda para o dia, média de venda, quanto falta em reais para atingir a meta mensal e uma projeção de quando a meta será batida se permanecer na mesma média de vendas.

Além disso, o projeto oferece um CRUD completo dos operadores e um relatório com o ranking de vendas dos colaboradores.

## Pré-requisitos
Antes de começar, é necessário ter instalado:

- Node.js versão 16 ou superior
- NPM ou Yarn
- MySQL
- Docker (opcional)
O projeto foi desenvolvido no frontend com React v18 e no backend com Node v16, Express e Sequelize, utilizando o MySQL como banco de dados. Caso deseje, é possível executar o projeto com Docker.

Certifique-se de ter as versões mais recentes do Node.js e do NPM/Yarn instaladas em sua máquina antes de prosseguir. Para instalar o MySQL, consulte a documentação oficial para sua distribuição.

Caso opte por executar o projeto com Docker, certifique-se de ter o Docker instalado e configurado corretamente em sua máquina. Para obter mais informações sobre como instalar o Docker, consulte a documentação oficial.

## Instalação

1. Clone o repositório em sua máquina:

``` bash
  git clone https://github.com/PauloEwerson/relatorio_recargas.git
```

2. Instale as dependências do projeto na raiz, na pasta backend e na pasta frontend. Para isso, execute o comando abaixo:

``` bash
 npm install
 cd backend
 npm install
 cd ..
 cd frontend
 npm install
 cd ..
```

3. Configure o arquivo .env na pasta backend (caso rode localmente) ou no arquivo docker-compose.yml que está na raiz do projeto caso use Docker.

4. Caso esteja utilizando Docker, execute o comando abaixo para fazer o build das imagens:

``` bash
# Esse comando cria as imagens dos containers do projeto com base nas configurações definidas no arquivo docker-compose.yml.
docker-compose build
```
5. Em seguida, execute o comando abaixo para iniciar os containers:

``` bash
# O "-d" inicia os containers do projeto em segundo plano.
docker-compose up -d
```

6. Acesse a pasta backend e execute o script do sequelize:

``` bash
# Acessa a pasta backend
cd backend

# Esse comando cria as tabelas e relacionamentos no banco de dados, além de popular algumas informações iniciais.
npm run db:reset
```
Pronto, agora você pode acessar a aplicação no endereço http://localhost:3000 (ou em outra porta definida nas configurações) e começar a utilizar o Controle de Recargas.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MYSQL_HOST`

`MYSQL_PORT`

`MYSQL_DATABASE`

`MYSQL_USER`

`MYSQL_PASSWORD`

## Uso

Para a utilização completa do Controle de Recargas, é necessário importar os dados de vendas dos operadores. Para isso, é disponibilizado um arquivo chamado `demo.csv` na raiz do projeto que pode ser utilizado como demonstração. Entretanto, em produção, o arquivo CSV utilizado é gerado pelo portal do SITEF.

Para importar o arquivo `demo.csv`, siga os passos abaixo:

1. Clique no botão que se encontra no menu inferior esquerdo.
2. Selecione a opção "Importar arquivo".
3. Escolha o arquivo demo.csv e clique em "Importar".
4. Em seguida, preencha o campo de Metas, estipulando um valor para a meta mensal que deseja atingir.

Após importar os dados, você terá acesso a todas as informações sobre as vendas dos operadores e poderá acompanhar o progresso em relação à meta mensal. Além disso, é possível visualizar relatórios detalhados sobre as vendas, bem como o ranking dos colaboradores.

## Contribuição

Se você quiser contribuir com o projeto, sinta-se à vontade para abrir uma issue ou um pull request no GitHub.

## Autor

- [@Paulo Ewerson](https://www.github.com/PauloEwerson)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
