import { API_URL, PUBLISHABLE_KEY } from './config.js';

const form = document.querySelector('#avistamentoForm');
const idInput = document.querySelector('#avistamentoId');
const criaturaInput = document.querySelector('#criatura');
const localInput = document.querySelector('#local');
const relatoInput = document.querySelector('#relato');
const container = document.querySelector('#avistamentosContainer');
const mensagem = document.querySelector('#mensagem');

let listaAvistamentos = [];

form.addEventListener('submit', updateAvistamento);

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
                <button class="btn-edit" onclick="prepararEdit(${item.id})">Editar</button>
            </div>
        `;
    });
}

function prepararEdit(id) {
    const item = listaAvistamentos.find(a => a.id === id);
    if (item) {
        form.classList.remove('oculto');
        container.classList.add('oculto');
        mensagem.innerHTML = 'Altere os dados abaixo:';

        idInput.value = item.id;
        criaturaInput.value = item.criatura;
        localInput.value = item.local;
        relatoInput.value = item.relato;
    }
}

async function updateAvistamento(e) {
    e.preventDefault();

    const id = idInput.value;
    const dados = {
        criatura: criaturaInput.value,
        local: localInput.value,
        relato: relatoInput.value
    };

    try {
        await fetch(`${API_URL}?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                apikey: PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify(dados)
        });

        form.classList.add('oculto');
        container.classList.remove('oculto');
        mensagem.innerHTML = 'Registro atualizado! Escolha outro se desejar.';
        buscarAvistamentos();
    } catch (error) {
        mensagem.innerHTML = 'Erro ao alterar registro.';
    }
}

window.prepararEdit = prepararEdit;
buscarAvistamentos();