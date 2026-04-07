document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.logo').forEach((logoElement) => {
    if (logoElement.querySelector('.site-logo')) {
      return;
    }

    const logoImage = document.createElement('img');
    logoImage.src = 'imagens/favicon.png';
    logoImage.alt = 'Logo Portal QA';
    logoImage.className = 'site-logo';
    logoElement.prepend(logoImage);
  });

  const purchaseForm = document.getElementById('purchaseForm');
  const purchaseMessage = document.getElementById('purchaseMessage');

  purchaseForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(purchaseForm);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
    };

    if (purchaseMessage) {
      purchaseMessage.textContent = 'Registrando seus dados e preparando o checkout...';
      purchaseMessage.className = 'form-message info';
      purchaseMessage.style.display = 'block';
    }

    try {
      const response = await fetch('/purchase-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Não foi possível registrar seus dados.');
      }

      if (purchaseMessage) {
        purchaseMessage.textContent = 'Cadastro concluído. Redirecionando para o pagamento...';
        purchaseMessage.className = 'form-message success';
      }

      window.location.href = '/checkout';
    } catch (error) {
      if (purchaseMessage) {
        purchaseMessage.textContent = error.message || 'Erro ao seguir para o pagamento.';
        purchaseMessage.className = 'form-message error';
      }
    }
  });
});
