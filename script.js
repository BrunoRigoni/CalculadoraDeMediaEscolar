const form = document.getElementById("form");
const nome = document.getElementById("nome-aluno");
const turma = document.getElementById("idade-aluno");
const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");
const resultado = document.getElementById("resultado");
const resultadoAluno = document.getElementById("resultado-aluno");
const resultadoMedia = document.getElementById("resultado-media");

const mostrarAlunos = document.getElementById("mostrar-alunos");
const calcMedia = document.getElementById("calcular-media");
const calcMediaAluno = document.getElementById("calcular-media-aluno");

// Elementos de importação
const fileInput = document.getElementById("file-input");
const importBtn = document.getElementById("import-btn");
const importStatus = document.getElementById("import-status");

// Estrutura para organizar alunos por turma
const turmas = {};

const calcularMedia = (nota1, nota2, nota3) => {
    const totalNotas = Number(nota1) + Number(nota2) + Number(nota3);
    const media = totalNotas / 3;
    return media.toFixed(2);
}

const exibirAlunos = () => {
    const todasAsTurmas = Object.keys(turmas);
    
    if (todasAsTurmas.length === 0) {
        resultado.innerHTML = '<p class="no-data">Nenhum aluno cadastrado ainda.</p>';
        return;
    }

    let html = '<h3>Lista de Alunos por Turma:</h3>';
    
    todasAsTurmas.sort().forEach(numeroTurma => {
        const alunosTurma = turmas[numeroTurma];
        html += `<div class="turma-section">`;
        html += `<h4 class="turma-titulo">🏫 Turma ${numeroTurma} (${alunosTurma.length} aluno${alunosTurma.length > 1 ? 's' : ''})</h4>`;
        
        alunosTurma.forEach((aluno, index) => {
            const status = aluno.media >= 7 ? 'Aprovado' : 'Reprovado';
            const statusClass = aluno.media >= 7 ? 'aprovado' : 'reprovado';
            
            html += `
                <div class="aluno-card">
                    <h4>${aluno.nome}</h4>
                    <p><strong>Turma:</strong> ${aluno.turma}</p>
                    <p><strong>Notas:</strong> ${aluno.nota1}, ${aluno.nota2}, ${aluno.nota3}</p>
                    <p><strong>Média:</strong> <span class="${statusClass}">${aluno.media}</span></p>
                    <p><strong>Status:</strong> <span class="${statusClass}">${status}</span></p>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    resultado.innerHTML = html;
}

const calcularMediaGeral = () => {
    const todasAsTurmas = Object.keys(turmas);
    
    if (todasAsTurmas.length === 0) {
        resultado.innerHTML = '<p class="no-data">Nenhum aluno cadastrado ainda.</p>';
        return;
    }

    let totalAlunos = 0;
    let somaMedias = 0;
    let html = '<h3>Médias por Turma</h3>';
    
    todasAsTurmas.sort().forEach(numeroTurma => {
        const alunosTurma = turmas[numeroTurma];
        const mediaTurma = alunosTurma.reduce((total, aluno) => total + Number(aluno.media), 0) / alunosTurma.length;
        
        totalAlunos += alunosTurma.length;
        somaMedias += alunosTurma.reduce((total, aluno) => total + Number(aluno.media), 0);
        
        html += `
            <div class="turma-media">
                <h4>Turma ${numeroTurma}</h4>
                <p><strong>Alunos:</strong> ${alunosTurma.length}</p>
                <p><strong>Média da turma:</strong> <span class="media-destaque">${mediaTurma.toFixed(2)}</span></p>
            </div>
        `;
    });
    
    const mediaGeral = (somaMedias / totalAlunos).toFixed(2);
    
    html += `
        <div class="media-geral">
            <h4>📊 Resumo Geral</h4>
            <p><strong>Total de turmas:</strong> ${todasAsTurmas.length}</p>
            <p><strong>Total de alunos:</strong> ${totalAlunos}</p>
            <p><strong>Média geral de todas as turmas:</strong> <span class="media-destaque">${mediaGeral}</span></p>
        </div>
    `;
    
    resultado.innerHTML = html;
}

const calcularMediaAlunoIndividual = () => {
    const todasAsTurmas = Object.keys(turmas);
    
    if (todasAsTurmas.length === 0) {
        resultado.innerHTML = '<p class="no-data">Nenhum aluno cadastrado ainda.</p>';
        return;
    }

    let html = '<h3>Médias Individuais por Turma</h3>';
    
    todasAsTurmas.sort().forEach(numeroTurma => {
        const alunosTurma = turmas[numeroTurma];
        html += `<div class="turma-section">`;
        html += `<h4 class="turma-titulo">🏫 Turma ${numeroTurma}</h4>`;
        
        alunosTurma.forEach((aluno) => {
            const status = aluno.media >= 7 ? 'Aprovado' : 'Reprovado';
            const statusClass = aluno.media >= 7 ? 'aprovado' : 'reprovado';
            
            html += `
                <div class="aluno-card media-individual">
                    <h4>${aluno.nome}</h4>
                    <p><strong>Média:</strong> <span class="${statusClass}">${aluno.media}</span></p>
                    <p><strong>Status:</strong> <span class="${statusClass}">${status}</span></p>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    resultado.innerHTML = html;
}

// Função para processar arquivo CSV
const processarCSV = (texto) => {
    const linhas = texto.split('\n');
    const alunos = [];
    let erros = [];
    
    // Pular cabeçalho se existir
    const inicio = linhas[0].toLowerCase().includes('nome') ? 1 : 0;
    
    for (let i = inicio; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (!linha) continue;
        
        const colunas = linha.split(',').map(col => col.trim());
        
        if (colunas.length < 5) {
            erros.push(`Linha ${i + 1}: Dados insuficientes`);
            continue;
        }
        
        const [nome, turma, nota1, nota2, nota3] = colunas;
        
        // Validações
        if (!nome) {
            erros.push(`Linha ${i + 1}: Nome não informado`);
            continue;
        }
        
        if (!turma || isNaN(turma)) {
            erros.push(`Linha ${i + 1}: Turma inválida`);
            continue;
        }
        
        const notas = [Number(nota1), Number(nota2), Number(nota3)];
        if (notas.some(nota => isNaN(nota) || nota < 0 || nota > 10)) {
            erros.push(`Linha ${i + 1}: Notas devem estar entre 0 e 10`);
            continue;
        }
        
        alunos.push({
            nome: nome,
            turma: turma,
            nota1: notas[0],
            nota2: notas[1],
            nota3: notas[2],
            media: calcularMedia(notas[0], notas[1], notas[2])
        });
    }
    
    return { alunos, erros };
}

// Função para processar arquivo Excel
const processarExcel = (data) => {
    const alunos = [];
    let erros = [];
    
    // Assumindo que a primeira planilha contém os dados
    const planilha = data.Sheets[data.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(planilha, { header: 1 });
    
    // Pular cabeçalho se existir
    const inicio = jsonData[0] && jsonData[0][0] && jsonData[0][0].toString().toLowerCase().includes('nome') ? 1 : 0;
    
    for (let i = inicio; i < jsonData.length; i++) {
        const linha = jsonData[i];
        if (!linha || linha.length < 5) {
            erros.push(`Linha ${i + 1}: Dados insuficientes`);
            continue;
        }
        
        const [nome, turma, nota1, nota2, nota3] = linha;
        
        // Validações
        if (!nome) {
            erros.push(`Linha ${i + 1}: Nome não informado`);
            continue;
        }
        
        if (!turma || isNaN(turma)) {
            erros.push(`Linha ${i + 1}: Turma inválida`);
            continue;
        }
        
        const notas = [Number(nota1), Number(nota2), Number(nota3)];
        if (notas.some(nota => isNaN(nota) || nota < 0 || nota > 10)) {
            erros.push(`Linha ${i + 1}: Notas devem estar entre 0 e 10`);
            continue;
        }
        
        alunos.push({
            nome: nome.toString(),
            turma: turma.toString(),
            nota1: notas[0],
            nota2: notas[1],
            nota3: notas[2],
            media: calcularMedia(notas[0], notas[1], notas[2])
        });
    }
    
    return { alunos, erros };
}

// Função para importar arquivo
const importarArquivo = (arquivo) => {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        
        leitor.onload = (e) => {
            try {
                const conteudo = e.target.result;
                let resultado;
                
                if (arquivo.name.endsWith('.csv')) {
                    resultado = processarCSV(conteudo);
                } else {
                    // Arquivo Excel
                    const data = XLSX.read(conteudo, { type: 'binary' });
                    resultado = processarExcel(data);
                }
                
                resolve(resultado);
            } catch (erro) {
                reject(erro);
            }
        };
        
        leitor.onerror = () => reject(new Error('Erro ao ler arquivo'));
        
        if (arquivo.name.endsWith('.csv')) {
            leitor.readAsText(arquivo);
        } else {
            leitor.readAsBinaryString(arquivo);
        }
    });
}

// Event listener para importação
importBtn.addEventListener("click", async () => {
    const arquivo = fileInput.files[0];
    
    if (!arquivo) {
        mostrarStatus('Por favor, selecione um arquivo.', 'error');
        return;
    }
    
    try {
        mostrarStatus('Processando arquivo...', 'info');
        
        const { alunos, erros } = await importarArquivo(arquivo);
        
        if (alunos.length === 0) {
            mostrarStatus('Nenhum aluno válido encontrado no arquivo.', 'error');
            return;
        }
        
        // Adicionar alunos às turmas
        let adicionados = 0;
        alunos.forEach(aluno => {
            if (!turmas[aluno.turma]) {
                turmas[aluno.turma] = [];
            }
            turmas[aluno.turma].push(aluno);
            adicionados++;
        });
        
        let mensagem = `✅ ${adicionados} aluno(s) importado(s) com sucesso!`;
        if (erros.length > 0) {
            mensagem += `\n⚠️ ${erros.length} erro(s) encontrado(s):\n${erros.slice(0, 5).join('\n')}`;
            if (erros.length > 5) {
                mensagem += `\n... e mais ${erros.length - 5} erro(s)`;
            }
        }
        
        mostrarStatus(mensagem, 'success');
        fileInput.value = '';
        
        // Atualizar resultado
        exibirAlunos();
        
    } catch (erro) {
        mostrarStatus(`Erro ao processar arquivo: ${erro.message}`, 'error');
    }
});

const mostrarStatus = (mensagem, tipo) => {
    importStatus.textContent = mensagem;
    importStatus.className = `import-status ${tipo}`;
    importStatus.style.display = 'block';
    
    if (tipo === 'success') {
        setTimeout(() => {
            importStatus.style.display = 'none';
        }, 5000);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Validação dos campos
    if (!nome.value.trim() || !turma.value || !nota1.value || !nota2.value || !nota3.value) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Validação das notas
    const notas = [Number(nota1.value), Number(nota2.value), Number(nota3.value)];
    if (notas.some(nota => nota < 0 || nota > 10)) {
        alert("As notas devem estar entre 0 e 10!");
        return;
    }

    const numeroTurma = turma.value.trim();
    const aluno = {
        nome: nome.value.trim(),
        turma: numeroTurma,
        nota1: Number(nota1.value),
        nota2: Number(nota2.value),
        nota3: Number(nota3.value),
        media: calcularMedia(nota1.value, nota2.value, nota3.value)
    };
    
    // Adicionar aluno à turma correspondente
    if (!turmas[numeroTurma]) {
        turmas[numeroTurma] = [];
    }
    turmas[numeroTurma].push(aluno);
    
    // Exibir confirmação
    resultado.innerHTML = `
        <div class="sucesso">
            <h3>✅ Aluno adicionado com sucesso!</h3>
            <p><strong>Nome:</strong> ${aluno.nome}</p>
            <p><strong>Turma:</strong> ${aluno.turma}</p>
            <p><strong>Média:</strong> <span class="${aluno.media >= 7 ? 'aprovado' : 'reprovado'}">${aluno.media}</span></p>
        </div>
    `;
    
    form.reset();
});

mostrarAlunos.addEventListener("click", (e) => {
    e.preventDefault();
    exibirAlunos();
});

calcMedia.addEventListener("click", (e) => {
    e.preventDefault();
    calcularMediaGeral();
});

calcMediaAluno.addEventListener("click", (e) => {
    e.preventDefault();
    calcularMediaAlunoIndividual();
});
























