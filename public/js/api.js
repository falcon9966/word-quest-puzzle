const API = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  clearSession() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  async request(path, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    const response = await fetch(path, { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || '操作失敗');
    return data;
  }
};

function renderNav() {
  const target = document.querySelector('[data-nav-user]');
  if (!target) return;
  if (API.user) {
    target.innerHTML = `
      <span class="navbar-text me-2">${API.user.nickname}</span>
      <button class="btn btn-sm btn-outline-dark" id="logoutBtn">登出</button>
    `;
    document.getElementById('logoutBtn').addEventListener('click', async () => {
      try { await API.request('/api/logout', { method: 'POST' }); } catch (_) {}
      API.clearSession();
      location.href = '/';
    });
  } else {
    target.innerHTML = '<a class="btn btn-sm btn-dark" href="/auth.html">登入 / 註冊</a>';
  }
}

function toast(message, type = 'info') {
  const box = document.querySelector('#messageBox');
  if (!box) return alert(message);
  box.className = `alert alert-${type}`;
  box.textContent = message;
  box.classList.remove('hidden');
  setTimeout(() => box.classList.add('hidden'), 2800);
}

renderNav();
