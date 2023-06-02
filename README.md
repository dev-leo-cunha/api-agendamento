# API de agendamento de horários
</br>

## 📖  Descrição

Este é um projeto de uma api para agendamentos de horários, feita com a Alexia Kattah, do [Hero Code](https://herocode.com.br/). 
O projeto original foi feito com POO e eu fiz algumas mudanças para utilizar functions.



## 🛠️ Funcionalidades

- Criação, autenticação e edição de usuários.
- Criação, verificação e edição de horários para agendamento.



## 📖 Aprendizado
- Organização do sistema com controllers, services e repositories para melhor manutenção futura.
- Configuração do Prisma.
- Upload de imagens no AWS utilizando o aws-sdk e o multer.
- manipulação de Date com a biblioteca date-fns e moment-timezone.
- Autenticação com JWT e criptografia de senha com Bcrypt.

## 🔎 Inicialização do Projeto
Para executar este projeto, você precisará adicionar as seguintes variáveis ​​de ambiente ao seu arquivo .env

- `DATABASE_URL="file:./dev.db"`

- `AWS_ACCESS_KEY_ID`

- `AWS_SECRET_ACCESS_KEY`

- `AWS_REGION`

- `ACCESS_KEY_TOKEN`


## 🛠️ Implementação

```bash
  npm install
```

```bash
  npm run dev
```