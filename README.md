# 📊 Calculadora de Médias - Sistema Escolar

Um sistema web completo para gerenciamento de notas escolares por turma, desenvolvido com JavaScript puro, HTML5 e CSS3.

## 🎯 Funcionalidades

### ✨ Principais Recursos

- **Cadastro Individual de Alunos**: Adicione alunos um por vez com nome, turma e três notas
- **Importação em Massa**: Importe planilhas CSV ou Excel com múltiplos alunos
- **Organização por Turmas**: Alunos são automaticamente organizados por turma
- **Cálculo de Médias**: Sistema automático de cálculo de médias individuais e por turma
- **Status de Aprovação**: Identificação automática de alunos aprovados (média ≥ 7) ou reprovados
- **Visualização Flexível**: Diferentes modos de visualização dos dados
- **Exportação para Excel**: Gere relatórios completos em formato Excel com múltiplas planilhas

### 📁 Importação de Arquivos

O sistema suporta importação de planilhas nos formatos:
- **CSV** (.csv)
- **Excel** (.xlsx, .xls)

**Formato esperado das colunas:**
```
Nome,Turma,Nota1,Nota2,Nota3
João Silva,1,8.5,7.0,9.0
Maria Santos,2,6.5,8.0,7.5
```

### 📤 Exportação de Relatórios

O sistema permite exportar todos os dados para Excel com:
- **Planilha 1 - Alunos**: Dados completos de todos os alunos (nome, turma, notas, média, status)
- **Planilha 2 - Resumo por Turma**: Estatísticas de cada turma (quantidade de alunos, média da turma)
- **Planilha 3 - Resumo Geral**: Estatísticas gerais da escola (total de turmas, alunos, média geral)

**Características da exportação:**
- Nome do arquivo com data atual (`relatorio_escolar_2024-01-15.xlsx`)
- Dados organizados e estruturados
- Múltiplas planilhas para diferentes visualizações
- Mensagens de status amigáveis

### 📊 Relatórios Disponíveis

1. **Lista de Alunos por Turma**: Visualização completa de todos os alunos organizados por turma
2. **Médias Individuais**: Foco nas médias e status de cada aluno
3. **Média Geral**: Estatísticas gerais com médias por turma e geral da escola
4. **Exportação Completa**: Relatório Excel com todas as informações organizadas

## 🏗️ Estrutura do Projeto

```
JAVASCRIPT ANTES DO FRAMEWORK/
├── index.html          # Interface principal do sistema
├── script.js           # Lógica de negócio e funcionalidades
├── style.css           # Estilos e design responsivo
└── README.md           # Documentação do projeto
```

### 📄 Arquivos Principais

#### `index.html`
- Interface responsiva e moderna
- Formulário para cadastro individual
- Seção de importação de arquivos
- Seção de exportação de relatórios
- Botões para diferentes visualizações
- Integração com biblioteca XLSX para Excel

#### `script.js`
- **Gerenciamento de Dados**: Estrutura `turmas` para organizar alunos
- **Validações**: Verificação de dados de entrada e notas
- **Cálculos**: Função `calcularMedia()` para médias automáticas
- **Importação**: Processamento de CSV e Excel
- **Exportação**: Geração de relatórios Excel com múltiplas planilhas
- **Visualizações**: Diferentes modos de exibição dos dados

#### `style.css`
- Design moderno com gradientes e sombras
- Layout responsivo para mobile e desktop
- Sistema de cores consistente
- Animações e transições suaves
- Componentes estilizados (cards, botões, formulários)
- Estilos para seção de exportação

## 🚀 Como Usar

### 1. Cadastro Individual
1. Preencha o formulário com:
   - Nome completo do aluno
   - Número da turma
   - Três notas (0-10)
2. Clique em "Adicionar Aluno"
3. O sistema calcula automaticamente a média e status

### 2. Importação em Massa
1. Prepare uma planilha no formato especificado
2. Clique em "Escolher arquivo" e selecione o arquivo
3. Clique em "Importar Planilha"
4. O sistema processa e adiciona todos os alunos automaticamente

### 3. Visualização dos Dados
- **Mostrar Alunos**: Lista completa organizada por turma
- **Calcular Média Aluno**: Foco nas médias individuais
- **Calcular Média Geral**: Estatísticas gerais da escola

### 4. Exportação de Relatórios
1. Adicione alunos (individualmente ou por importação)
2. Clique no botão "📊 Exportar para Excel"
3. Aguarde a mensagem de processamento
4. Receba o arquivo Excel com todos os dados organizados
5. Veja a mensagem de sucesso com estatísticas

## 🎨 Design e UX

### Características do Design
- **Interface Moderna**: Gradientes, sombras e bordas arredondadas
- **Responsivo**: Adaptável para dispositivos móveis e desktop
- **Feedback Visual**: Status de sucesso, erro e informações
- **Organização Clara**: Seções bem definidas e separadas
- **Cores Semânticas**: Verde para aprovado, vermelho para reprovado

### Componentes Visuais
- Cards para alunos e turmas
- Botões com gradientes e hover effects
- Formulários com validação visual
- Status messages com cores apropriadas
- Layout em grid responsivo
- Seção de exportação com design dedicado

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Flexbox, Grid, Gradientes, Animações
- **JavaScript ES6+**: Arrow functions, Template literals, Async/await
- **XLSX.js**: Biblioteca para processamento de arquivos Excel
- **FileReader API**: Leitura de arquivos no navegador

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação automática do layout
- **Mobile**: Interface otimizada para telas pequenas

## 🎯 Casos de Uso

### Para Professores
- Cadastro rápido de alunos
- Importação de planilhas de notas
- Visualização organizada por turma
- Acompanhamento de médias e status
- Geração de relatórios para reuniões

### Para Coordenadores
- Relatórios gerais da escola
- Análise de desempenho por turma
- Estatísticas de aprovação/reprovação
- Dados organizados para tomada de decisão
- Exportação de relatórios para apresentações

## 🔄 Funcionalidades Técnicas

### Validações Implementadas
- Campos obrigatórios
- Notas entre 0 e 10
- Formato de arquivo correto
- Dados válidos na importação
- Verificação de dados antes da exportação

### Processamento de Dados
- Cálculo automático de médias
- Organização por turma
- Status de aprovação automático
- Tratamento de erros na importação
- Geração de relatórios estruturados

### Armazenamento
- Dados mantidos em memória durante a sessão
- Estrutura organizada por turma
- Fácil acesso e manipulação dos dados

### Exportação
- Geração de arquivos Excel com múltiplas planilhas
- Nomenclatura automática com data
- Dados organizados e estruturados
- Tratamento de erros na exportação

## 🎨 Personalização

O sistema pode ser facilmente personalizado através do arquivo `style.css`:
- Cores principais definidas em variáveis CSS
- Componentes modulares e reutilizáveis
- Sistema de design consistente
- Fácil adaptação para diferentes temas

## 📈 Funcionalidades Implementadas

### ✅ Funcionalidades Atuais
- ✅ Cadastro individual de alunos
- ✅ Importação em massa (CSV/Excel)
- ✅ Cálculo automático de médias
- ✅ Organização por turmas
- ✅ Status de aprovação/reprovação
- ✅ Visualizações flexíveis
- ✅ Exportação para Excel
- ✅ Interface responsiva
- ✅ Validações completas
- ✅ Tratamento de erros

### 🚀 Próximas Funcionalidades

Possíveis melhorias futuras:
- Persistência de dados (localStorage/banco)
- Gráficos e visualizações
- Sistema de login
- Backup automático
- API para integração
- Filtros e busca avançada
- Histórico de alterações

---

**Desenvolvido com ❤️ usando JavaScript puro, HTML5 e CSS3**
