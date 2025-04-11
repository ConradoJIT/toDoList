## Rodar

1. Roda o back fazendo `node server.js`
2. Roda o front fazendo `npx create-react-app frontend`, `npm install`, `npm run dev`

## Dependências

1. Axios para comunicação entre diferentes portas (no caso o front roda numa porta e o back em outra)
2. bcrypt pra criptografar as senhas no banco de dados
3. mongoDB

## Anotações

1. Fiz algumas modificações no front para que eu pudesse conectar o front e o back. As tabelas de perfis
2. de usuários já estão prontas, mas estão comentadas pq na branch main ainda não tem os perfis. Quando
3. vc adiciona algo, já adiciona direto pro banco, mas não consegui adaptar a lógica do front para trabalhar
4. com as exclusões e as alterações no banco. Isso é só o que falta em relação a isto.
