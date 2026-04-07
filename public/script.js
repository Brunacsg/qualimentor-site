const API_ORIGIN = window.location.origin;
const MODULES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
  'module-8',
  'module-9'
];

const LOGIN_MESSAGE_KEY = 'loginMessage';

function setLoginMessage(message) {
  if (message) {
    localStorage.setItem(LOGIN_MESSAGE_KEY, message);
  }
}

function showLoginMessage() {
  const message = localStorage.getItem(LOGIN_MESSAGE_KEY);
  const messageElement = document.getElementById('msg');

  if (!message || !messageElement) {
    return;
  }

  messageElement.innerText = message;
  messageElement.classList.add('error');
  localStorage.removeItem(LOGIN_MESSAGE_KEY);
}

async function hasValidSession() {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const res = await fetch(`${API_ORIGIN}/dashboard`, {
      headers: { Authorization: token }
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API_ORIGIN}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem('token', data.token);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('msg').innerText = data.message;
    document.getElementById('msg').classList.add('error');
  }
}

async function verifySession() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const res = await fetch(`${API_ORIGIN}/dashboard`, {
    headers: { Authorization: token }
  });

  if (!res.ok) {
    let message = 'Sua sessão expirou. Faça login novamente.';

    try {
      const data = await res.json();
      if (data?.error === 'Sessão encerrada por novo login em outro dispositivo') {
        message = 'Sua conta foi acessada em outro dispositivo. Faça login novamente para continuar.';
      }
    } catch (error) {
      console.error('Erro ao ler resposta de sessão:', error);
    }

    setLoginMessage(message);
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
}

function loadCourseProgress() {
  const data = localStorage.getItem('qaCourseProgress');
  return data ? JSON.parse(data) : {};
}

function saveCourseProgress(progress) {
  localStorage.setItem('qaCourseProgress', JSON.stringify(progress));
}

function getCompletedCount(progress) {
  return MODULES.filter((moduleId) => progress[moduleId]).length;
}

function updateDashboardProgress() {
  const progress = loadCourseProgress();
  const completed = getCompletedCount(progress);
  const total = MODULES.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const progressCount = document.getElementById('progress-count');
  const progressFill = document.getElementById('progress-fill');

  if (progressCount) {
    progressCount.textContent = `${completed} de ${total} módulos concluídos (${percent}%)`;
  }
  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }

  document.querySelectorAll('.module-card').forEach((card) => {
    const moduleId = card.dataset.module;
    const statusText = card.querySelector('.status-text');
    if (progress[moduleId]) {
      card.classList.add('completed');
      if (statusText) statusText.textContent = 'Concluído';
      card.querySelector('.module-status-badge')?.classList.add('completed');
    } else {
      card.classList.remove('completed');
      if (statusText) statusText.textContent = 'Não iniciado';
      card.querySelector('.module-status-badge')?.classList.remove('completed');
    }
  });
}

function updateModulePageProgress() {
  const moduleId = document.body.dataset.module;
  if (!moduleId) return;

  const progress = loadCourseProgress();
  const completed = progress[moduleId] === true;
  const statusText = document.getElementById('module-status-text');
  const percentText = document.getElementById('module-progress-percent');
  const button = document.getElementById('complete-module-button');
  const nextLink = document.getElementById('next-module-link');

  if (statusText) {
    statusText.textContent = completed ? 'Concluído' : 'Em andamento';
  }
  if (percentText) {
    const percent = completed ? 100 : 0;
    percentText.textContent = `${percent}%`;
  }
  if (button) {
    button.textContent = completed ? 'Marcar como não concluído' : 'Marcar módulo como concluído';
  }

  const nextModulePage = {
    'module-1': 'process.html',
    'module-2': 'manual.html',
    'module-3': 'automation.html',
    'module-4': 'tools.html',
    'module-5': 'agile.html',
    'module-6': 'security.html',
    'module-7': 'performance.html',
    'module-8': 'career.html'
  }[moduleId];

  if (nextLink) {
    if (nextModulePage) {
      nextLink.href = nextModulePage;
      nextLink.style.display = 'inline-flex';
    } else {
      nextLink.style.display = 'none';
    }
  }
}

function toggleModuleCompletion() {
  const moduleId = document.body.dataset.module;
  if (!moduleId) return;

  const progress = loadCourseProgress();
  progress[moduleId] = !progress[moduleId];
  saveCourseProgress(progress);
  updateModulePageProgress();
}

async function logout() {
  const token = localStorage.getItem('token');

  try {
    if (token) {
      await fetch(`${API_ORIGIN}/logout`, {
        method: 'POST',
        headers: { Authorization: token }
      });
    }
  } catch (error) {
    console.error('Erro ao encerrar sessão:', error);
  } finally {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'login') {
    showLoginMessage();

    hasValidSession().then((isValid) => {
      if (isValid) {
        window.location.href = 'dashboard.html';
      } else {
        localStorage.removeItem('token');
      }
    });

    return;
  }

  verifySession();
  updateDashboardProgress();
  updateModulePageProgress();

  const completeButton = document.getElementById('complete-module-button');
  if (completeButton) {
    completeButton.addEventListener('click', toggleModuleCompletion);
  }
});