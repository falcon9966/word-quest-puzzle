document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target));
  try {
    const data = await API.request('/api/login', { method: 'POST', body: JSON.stringify(payload) });
    API.setSession(data.token, data.user);
    location.href = data.user.role === 'admin' ? '/admin.html' : '/game.html';
  } catch (error) {
    toast(error.message, 'danger');
  }
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target));
  try {
    await API.request('/api/register', { method: 'POST', body: JSON.stringify(payload) });
    toast('註冊完成，請登入', 'success');
    event.target.reset();
  } catch (error) {
    toast(error.message, 'danger');
  }
});
