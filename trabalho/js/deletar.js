import { API_URL, PUBLISHABLE_KEY } from './config.js';

const container = document.querySelector('#avistamentosContainer');
const mensagem = document.querySelector('#mensagem');
let listaAvistamentos = [];

async function buscarAvistamentos() {
    try {
        const response = await fetch(API_URL, {
            headers: { apikey: PUBLISHABLE_KEY }
        });
        listaAvistamentos = await response.json();
        renderAvistamentos();
    } catch (error) {
        container.innerHTML = 'Erro ao carregar os registros.';
    }
}

function renderAvistamentos() {
    if (listaAvistamentos.length === 0) {
        container.innerHTML = '<p>Nenhum registro encontrado.</p>';
        return;
    }

    container.innerHTML = '';
    listaAvistamentos.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.criatura}</h3>
                <div class="local">Local: ${item.local}</div>
                <p>${item.relato}</p>
                <button class="btn-delete" onclick="deletarAvistamento(${item.id})">Excluir</button>
            </div>
        `;
    });
}

async function deletarAvistamento(id) {
    if (!confirm('Deseja realmente apagar este registro confidencial?')) return;

    try {
        await fetch(`${API_URL}?id=eq.${id}`, {
            method: 'DELETE',
            headers: { apikey: PUBLISHABLE_KEY }
        });

        mensagem.innerHTML = 'Registro excluído com sucesso!';
        buscarAvistamentos();
    } catch (error) {
        mensagem.innerHTML = 'Erro ao excluir registro.';
    }
}

window.deletarAvistamento = deletarAvistamento;
buscarAvistamentos();