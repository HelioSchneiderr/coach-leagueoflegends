function buyPlan(event) {
    const planName = event.target.getAttribute('data-plan');
    const userNickname = prompt("Digite seu nickname do Discord:");

    if (confirm(`Tem certeza que deseja comprar o plano ${planName}?`)) {
        const webhookUrl = "https://discord.com/api/webhooks/1224805381709103154/4dhPy-98Z-CyYqFQoBfO4LkZjQSxVxflmTR42qZcM9tlQ1HYueMc8bvS7hSQOeyouJii";

        const message = `**----------------------------**\n**PLANO**\nId do Discord: ${userNickname}\nPlano: ${planName}\n**----------------------------**`;

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

// Adicione um listener para cada botão de compra
document.querySelectorAll('.button-buy').forEach(button => {
    button.addEventListener('click', buyPlan);
});
