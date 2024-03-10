---

# Sistema de Gerenciamento de Clientes

Este é um sistema de alta qualidade desenvolvido para atender às necessidades de gestão de clientes de uma empresa especializada em serviços de limpeza residencial. Utilizando uma arquitetura de microsserviços, este sistema proporciona escalabilidade, desempenho otimizado e manutenibilidade. O backend é construído em Node.js com Express.js para a API, enquanto o frontend é desenvolvido em React para uma experiência de usuário moderna e intuitiva.

## Requisitos Funcionais

### Parte 1: Gerenciamento de Clientes

Este módulo permite a listagem, filtragem e cadastro de clientes, fornecendo uma visão abrangente das informações cruciais para o negócio. Os clientes são identificados pelos seguintes atributos:

- **Nome**: Identifica o cliente.
- **E-mail**: Fornece um canal de comunicação direto.
- **Telefone**: Facilita a comunicação imediata.

### Parte 2: Otimização de Rotas

O sistema emprega técnicas avançadas para otimizar as rotas de atendimento dos clientes, garantindo máxima eficiência operacional. Utilizando o algoritmo do vizinho mais próximo, o sistema calcula a rota ideal de visitação, partindo do ponto central da empresa e passando por todas as coordenadas dos clientes cadastrados, retornando à empresa ao final. Isso é realizado de forma automática e transparente para o usuário.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React, Redux Toolkit, Material-UI
- **Algoritmo de Roteamento**: Vizinho Mais Próximo

## Estrutura do Projeto

O projeto é composto por quatro microsserviços:

1. **raiz**: Serviço principal que orquestra toda a funcionalidade do sistema. Responsável pela configuração do ambiente e pela gestão das requisições, este serviço inicia todos os microsserviços em paralelo.

2. **api-cms**: Microsserviço responsável pelo gerenciamento de clientes. Utiliza PostgreSQL localmente para armazenar os dados de forma segura e confiável.

3. **api-router**: Microsserviço especializado no cálculo da rota ótima de atendimento. Emprega algoritmos avançados para garantir a eficiência operacional da empresa.

4. **app-cms**: Interface de usuário frontend que proporciona uma experiência intuitiva e moderna. Permite a visualização e interação com os clientes cadastrados e as rotas calculadas de forma clara e organizada.

## Como Rodar o Projeto Localmente

Para instalar e iniciar o projeto, execute o seguinte comando dentro do diretório principal:

```bash
npm run install-start
```

Este comando instala todas as dependências necessárias e inicia todos os microsserviços do projeto em paralelo, garantindo uma inicialização rápida e eficiente.

Certifique-se de ter o Node.js e o PostgreSQL instalados localmente para executar o projeto.

## DDL do Banco de Dados

Segue abaixo o DDL (Data Definition Language) para a criação da tabela do banco de dados:

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    coordenada_x FLOAT NOT NULL,
    coordenada_y FLOAT NOT NULL
);
```

## Observações Finais

Este projeto representa uma solução completa e robusta para a gestão de clientes de uma empresa de limpeza residencial. Desenvolvido com foco na eficiência operacional e na experiência do usuário, este sistema é uma ferramenta poderosa para impulsionar o crescimento e o sucesso do negócio. Qualquer dúvida ou problema encontrado durante a execução do projeto, não hesite em entrar em contato.

---

