# Baba Guardian Access

Bot Discord para controle de acesso ao canal privado "monitoramento" para o cargo "baba", controlado por usuários com o cargo "pais".

## Funcionalidades

- `/baba chegou` — Libera acesso da babá ao canal monitoramento
- `/baba saiu` — Remove acesso da babá ao canal monitoramento
- Apenas usuários com o cargo "pais" podem executar os comandos
- Mensagens de resposta claras e logs para debug

## Requisitos

- Node.js 18+
- Permissões de administrador para registrar comandos e configurar cargos/canais

## Instalação

```bash
npm install
```

## Configuração

1. Preencha as variáveis ambiantes `.env` com os IDs corretos:
   - `DISCORD_TOKEN`: Token do seu bot
   - `CLIENT_ID`: ID do aplicativo do bot
   - `GUILD_ID`: ID do servidor
   - `CHANNEL_ID`: ID do canal "monitoramento" (a ser permitido/negado)
   - `ROLE_BABA_ID`: ID do cargo "baba"
   - `ROLE_PAIS_ID`: ID do cargo "pais"

## Deploy dos comandos

```bash
npm run deploy-commands
```

## Executando o bot

```bash
npm start
```

## Observações

- O bot precisa de permissões para gerenciar cargos e editar permissões de canais.
- Use os IDs corretos para cargos e canais.
- Logs são exibidos no console para facilitar o debug.
