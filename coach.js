const pricePerAula = {
    "Ferro": 15,
    "Bronze": 15,
    "Prata": 15,
    "Ouro": 15,
    "Platina": 20,
    "Esmeralda": 20,
    "Diamante": 20
};

function updatePrice() {
    const eloSelect = document.getElementById("elo-select");
    const aulasSelect = document.getElementById("aulas-select");
    const priceResult = document.getElementById("price-result");

    const elo = eloSelect.value;
    const aulas = parseInt(aulasSelect.value);

    const totalPrice = pricePerAula[elo] * aulas;

    priceResult.innerHTML = `<h3>${totalPrice}R$</h3>`;
}

function buyCoach() {
    const eloSelect = document.getElementById("elo-select");
    const aulasSelect = document.getElementById("aulas-select");
    const userNickname = prompt("Digite seu nickname do Discord:");

    if (confirm("Tem certeza que deseja comprar as aulas de coaching?")) {
        const webhookUrl = "https://discord.com/api/webhooks/1224817398998110401/vbM4P-HrsD4-0z-4WyXIV6zepSYbFz9yHUBD4UgM54Tnzw0GVYQZiwm-I3z_Rox_Z00I";

        const elo = eloSelect.value;
        const aulas = parseInt(aulasSelect.value);
        const totalPrice = pricePerAula[elo] * aulas;

        const message = `
        **----------------------------**\n**AULA**\nId do Discord: ${userNickname}\nQuantidade de Aulas: ${aulas}\nElo Atual: ${elo}\nValor: ${totalPrice}R$\n**----------------------------**`;

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

document.getElementById("elo-select").addEventListener("change", updatePrice);
document.getElementById("aulas-select").addEventListener("change", updatePrice);
document.getElementById("buy-button").addEventListener("click", buyCoach);
