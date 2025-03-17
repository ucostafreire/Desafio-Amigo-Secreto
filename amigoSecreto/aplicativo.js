//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let amigos = [];
let sorteados = [];

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nomes = input.value.trim();

    if (nomes === '') {
        alert('Digite pelo menos um nome válido!');
        return;
    }

    if (/\d/.test(nomes)) {
        alert('Por favor, insira apenas nomes (números não são permitidos)!');
        return;
    } //para verificar se há números no texto e exibir um alerta se encontrar.

    let listaNomes = nomes.split(',')
        .map(nome => nome.trim().replace(/\s+/g, ' ').toLowerCase())
        .filter(nome => nome !== '');

    let setNomes = new Set(listaNomes);
    if (setNomes.size !== listaNomes.length) {
        alert('Você digitou nomes repetidos na mesma entrada! Corrija isso.');
        return;
    }

    let nomesDuplicados = listaNomes.filter(nome =>
        amigos.some(amigo => amigo.toLowerCase() === nome)
    );

    if (nomesDuplicados.length > 0) {
        alert(`Os seguintes nomes já foram adicionados: ${nomesDuplicados.join(', ')}`);
        return;
    }

    listaNomes.forEach(nome => {
        if (!amigos.map(a => a.toLowerCase()).includes(nome)) {
            amigos.push(nome.charAt(0).toUpperCase() + nome.slice(1));
        }
    });

    atualizarLista();
    input.value = '';
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((nome) => {
        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    });
}



function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para sortear!');
        return;
    }

    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados! A lista será reiniciada.');
        reiniciarLista();
        return;
    }

    let sorteado;
    do {
        sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    } while (sorteados.includes(sorteado));

    sorteados.push(sorteado);
    document.getElementById('resultado').innerText = `Sorteado: ${sorteado}`;

    function lançarConfetti() {
        confetti({
            particleCount: 500, 
            spread: 160,        
            origin: { x: 0.5, y: 0.5 } 
        });
    }

    document.getElementById('hiden-elements').classList.remove('hidden');
    document.getElementById('auto-sorteio').classList.remove('hidden');
    document.getElementById('novo-sorteio').classList.remove('hidden');

    document.getElementById('amigo').disabled = true;
    document.querySelector('.button-add').disabled = true;

    lançarConfetti();
}

function resortearAmigo() {
    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados! A lista será reiniciada.');
        reiniciarLista();
        return;
    }

    sorteados.pop();
    sortearAmigo();
}

function reiniciarLista() {
    amigos = [];
    sorteados = [];
    atualizarLista();
    document.getElementById('resultado').innerText = '';

    document.getElementById('amigo').disabled = false;
    document.querySelector('.button-add').disabled = false;

    document.getElementById('hiden-elements').classList.add('hidden');
    document.getElementById('auto-sorteio').classList.add('hidden');
    document.getElementById('novo-sorteio').classList.add('hidden');
}

function novoSorteio() {
    reiniciarLista();
}
