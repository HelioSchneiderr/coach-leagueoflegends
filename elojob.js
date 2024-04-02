let startElo = "";
let startSubdivision = 0;
let endElo = "";
let endSubdivision = 0;
let price = 0;

function buyEloJob() {
    const webhookUrl = "https://discord.com/api/webhooks/1224415354911199302/1u-P5srIc3rO0L6ZbVT-ZDvNQcuYECGGHOB8cG8jbnLEY6TkgPFqmHKLWufAuq83Qa-q";
    
    // Prompt para obter o nickname do usuário
    const userNickname = prompt("Digite seu nickname do Discord:");

    // Verifica se o usuário realmente quer comprar
    if (confirm("Tem certeza que deseja comprar o Elo Job?")) {
        const message = `**----------------------------**\n**ELO JOB**\nNickname do Discord: ${userNickname}\nElo Inicial: ${startElo} ${startSubdivision}\nElo Desejado: ${endElo} ${endSubdivision}\nPreço: ${price}\n**----------------------------**`;

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        })
        .then(response => {
            if (response.ok) {
                alert('Mensagem enviada com sucesso!');
            } else {
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            console.error('Erro:', error);
        });
    } else {
        alert("Compra cancelada.");
    }
}
function updateImage(type) {
    const elo = document.getElementById(type + '-elo').value.toLowerCase();
    const imageId = type === 'start' ? 'elo-image' : 'elo-desejado-image';
    const image = document.getElementById(imageId);
    image.src = './imgElos/' + elo + '.png';
    image.alt = elo + ' Image';
}

function updateDestinationImage() {
    const elo = document.getElementById('end-elo').value.toLowerCase();
    const image = document.getElementById('elo-desejado-image');
    image.src = './imgElos/' + elo + '.png';
    image.alt = elo + ' Image';
}

function isValidTransition(startElo, startSubdivision, endElo, endSubdivision) {
    const elosOrder = ["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Esmeralda", "Diamante"];

    // Verifica se o elo de destino é maior que o de partida
    if (elosOrder.indexOf(startElo) > elosOrder.indexOf(endElo)) {
        return false;
    }

    // Verifica se o elo de destino é o mesmo que o de partida
    if (startElo === endElo && startSubdivision > endSubdivision) {
        return false;
    }

    return true;
}

function calculatePrice() {
    startElo = document.getElementById("start-elo").value;
    startSubdivision = parseInt(document.getElementById("start-subdivision").value);
    endElo = document.getElementById("end-elo").value;
    endSubdivision = parseInt(document.getElementById("end-subdivision").value);

    const elos = {
        "Ferro": 8,
        "Bronze": 9,
        "Prata": 13,
        "Ouro": 16,
        "Platina": 23,
        "Esmeralda": 46,
        "Diamante": 60
    };

    price = 0; // Resetando o preço

    // Verifica se a transição é válida
    if (!isValidTransition(startElo, startSubdivision, endElo, endSubdivision)) {
        const priceResult = document.getElementById("price-result");
        priceResult.textContent = "Elo inválido. Certifique-se de selecionar um elo e subdivisão de destino maior ou igual ao de partida dentro do mesmo elo.";
        return;
    }

    // Calcula o preço da transição
    let currentElo = startElo;
    let currentSubdivision = startSubdivision;
    while (!(currentElo === endElo && currentSubdivision === endSubdivision)) {
        price += elos[currentElo];
        if (currentSubdivision === 1) {
            switch (currentElo) {
                case "Ferro":
                    currentElo = "Bronze";
                    break;
                case "Bronze":
                    currentElo = "Prata";
                    break;
                case "Prata":
                    currentElo = "Ouro";
                    break;
                case "Ouro":
                    currentElo = "Platina";
                    break;
                case "Platina":
                    currentElo = "Esmeralda";
                    break;
                case "Esmeralda":
                    currentElo = "Diamante";
                    break;
                default:
                    break;
            }
            currentSubdivision = 4;
        } else {
            currentSubdivision--;
        }
    }

    const priceResult = document.getElementById("price-result");
    priceResult.textContent = `O preço para ir de ${startElo} ${startSubdivision} para ${endElo} ${endSubdivision} é de ${price} reais.`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateImage('start');
    updateDestinationImage('start');

});
