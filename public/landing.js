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

  // Verificar se é redirecionamento de sucesso do formSubmit
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    // Mostrar mensagem de sucesso
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message success';
    messageDiv.textContent = '✓ Solicitação enviada com sucesso! Aguarde nosso contato com o link de pagamento.';
    messageDiv.style.display = 'block';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.background = '#10b981';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.zIndex = '1000';
    document.body.appendChild(messageDiv);

    // Remover após 5 segundos
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);

    // Limpar URL
    window.history.replaceState(null, null, window.location.pathname);
  }
});
