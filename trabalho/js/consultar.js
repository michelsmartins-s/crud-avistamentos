import { API_URL, PUBLISHABLE_KEY } from './config.js';

const container = document.querySelector('#avistamentosContainer');
let listaAvistamentos = [];

async function buscarAvistamentos() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                apikey: PUBLISHABLE_KEY,
                Accept: 'application/json'
            }
        });
        listaAvistamentos = await response.json();
        renderAvistamentos();
    } catch (error) {
        container.innerHTML = 'Erro ao carregar os registros.';
    }
}

function renderAvistamentos() {
    if (listaAvistamentos.length === 0) {
        container.innerHTML = '<p>Nenhum avistamento registrado ainda.</p>';
        return;
    }

    container.innerHTML = '';
    listaAvistamentos.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.criatura}</h3>
                <div class="local">Local: ${item.local}</div>
                <p>${item.relato}</p>
            </div>
        `;
    });
}

buscarAvistamentos();