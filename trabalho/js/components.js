class MeuHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <header>
                <img src="./img/ovni.png" alt="Ícone OVNI" width="40">
                <h1>Arquivo X - Avistamentos</h1>
            </header>
        `;
    }
}

class MeuNav extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <nav>
                <a href="index.html">Consultar</a>
                <a href="criar.html">Registrar</a>
                <a href="alterar.html">Alterar</a>
                <a href="deletar.html">Excluir</a>
            </nav>
        `;
    }
}

class MeuFooter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <footer>
                <p>Departamento de Fenômenos Estranhos - 2026</p>
            </footer>
        `;
    }
}

customElements.define('meu-header', MeuHeader);
customElements.define('meu-nav', MeuNav);
customElements.define('meu-footer', MeuFooter);