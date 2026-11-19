import { API_URL, PUBLISHABLE_KEY } from './config.js';

const form = document.querySelector('#avistamentoForm');
const criaturaInput = document.querySelector('#criatura');
const localInput = document.querySelector('#local');
const relatoInput = document.querySelector('#relato');
const mensagem = document.querySelector('#mensagem');

form.addEventListener('submit', criarAvistamento);

async function criarAvistamento(e) {
    e.preventDefault();

    const dados = {
        criatura: criaturaInput.value,
        local: localInput.value,
        relato: relatoInput.value
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                apikey: PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify(dados)
        });

        mensagem.innerHTML = 'Avistamento registrado com sucesso! Preencha novamente para enviar outro.';
        form.reset();
    } catch (error) {
        mensagem.innerHTML = 'Erro ao registrar avistamento.';
    }
}