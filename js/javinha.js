document.getElementById('submit-button').addEventListener('click', function () {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    const resultElement = document.getElementById('result');
    const characterResult = document.getElementById('character-result');
    const characterImage = document.getElementById('character-image');

    if (answers.length < 3) {
        alert('Por favor, responda todas as perguntas!');
        return;
    }

    const scores = {
        ekko: 0,
        jayce: 0,
        vi: 0,
        caitlyn: 0,
        wender: 0,
        singed: 0,
        heimendinger: 0
    };

    // Contabiliza as respostas
    answers.forEach(answer => {
        scores[answer.value]++;
    });

    // Determina o personagem com maior pontuação
    const character = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    // Mapeamento de personagens para imagens
    const characterImages = {
        ekko: "img/601596.webp",
        jayce: "img/fcehy8kweamoubz.webp",
        vi: "img/vi-arcane-netflix-league-of-legends.webp",
        caitlyn: "img/Arcane_Season2_Episode3_Caitlyn_Longshot.jpg",
        wender: "img/Vander_Season_1_Episode_1_001.webp",
        singed: "img/xcr9ceom64zd1.jpeg",
        heimendinger: "img/images.jfif"
    };

    // Atualiza o nome e a imagem do resultado
    characterResult.textContent = character.charAt(0).toUpperCase() + character.slice(1);
    characterImage.src = characterImages[character];
    characterImage.alt = 'Imagem de ${character.charAt(0).toUpperCase() + character.slice(1)}';

    // Exibe a seção de resultados
    resultElement.classList.remove('hidden');
});

document.getElementById('nova-teoria-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo-teoria').value;
    const conteudo = document.getElementById('conteudo-teoria').value;

    const listaTeorias = document.getElementById('teorias-lista');

    // Criar um novo elemento de teoria
    const novaTeoria = document.createElement('div');
    novaTeoria.classList.add('teoria-item');
    novaTeoria.innerHTML = `
        <h3>${titulo}</h3>
        <p>${conteudo}</p>
        <h4>Opiniões:</h4>
        <div class="opiniao-lista"></div>
        <form class="opiniao-form">
            <label for="opinion">Escreva sua opinião:</label>
            <input type="text" class="opinion-input" placeholder="Escreva aqui..." required>
            <button type="submit">Adicionar</button>
        </form>
    `;

    // Adicionar funcionalidade para enviar opiniões
    const opiniaoForm = novaTeoria.querySelector('.opiniao-form');
    const opiniaoLista = novaTeoria.querySelector('.opiniao-lista');

    opiniaoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const opiniaoInput = novaTeoria.querySelector('.opinion-input');
        const opiniaoTexto = opiniaoInput.value;

        const novaOpiniao = document.createElement('p');
        novaOpiniao.classList.add('opiniao-item');
        novaOpiniao.textContent = opiniaoTexto;

        opiniaoLista.appendChild(novaOpiniao);
        opiniaoInput.value = ''; // Limpar o campo
    });

    // Adicionar a nova teoria à lista
    listaTeorias.appendChild(novaTeoria);

    // Limpar o formulário
    document.getElementById('titulo-teoria').value = '';
    document.getElementById('conteudo-teoria').value = '';
});
