async function loadUsers(params = '') {
  try {
    const data = await API.request(`/api/admin/users${params}`);
    document.getElementById('userRows').innerHTML = data.users.map((user) => `
      <tr>
        <td>${user.username}</td><td>${user.nickname}</td>
        <td><input class="form-control form-control-sm score-input" data-id="${user.id}" value="${user.score}" type="number"></td>
        <td>${user.is_frozen ? '凍結' : '正常'}</td><td>${user.last_login_at || '-'}</td>
        <td class="text-nowrap">
          <button class="btn btn-sm btn-outline-dark" data-save="${user.id}">改分</button>
          <button class="btn btn-sm btn-outline-warning" data-freeze="${user.id}" data-state="${user.is_frozen ? 0 : 1}">${user.is_frozen ? '解凍' : '凍結'}</button>
          <button class="btn btn-sm btn-outline-danger" data-delete="${user.id}">刪除</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    toast('請使用管理員帳號登入', 'danger');
  }
}

document.getElementById('searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const params = new URLSearchParams(new FormData(event.target)).toString();
  loadUsers(`?${params}`);
});

document.getElementById('userRows').addEventListener('click', async (event) => {
  const id = event.target.dataset.save || event.target.dataset.freeze || event.target.dataset.delete;
  if (!id) return;
  try {
    if (event.target.dataset.save) {
      const score = Number(document.querySelector(`.score-input[data-id="${id}"]`).value);
      await API.request(`/api/admin/users/${id}`, { method: 'PUT', body: JSON.stringify({ score }) });
    }
    if (event.target.dataset.freeze) {
      await API.request(`/api/admin/users/${id}`, { method: 'PUT', body: JSON.stringify({ isFrozen: event.target.dataset.state === '1' }) });
    }
    if (event.target.dataset.delete && confirm('確定刪除此玩家？')) {
      await API.request(`/api/admin/users/${id}`, { method: 'DELETE' });
    }
    toast('已更新', 'success');
    loadUsers();
  } catch (error) {
    toast(error.message, 'danger');
  }
});

loadUsers();
