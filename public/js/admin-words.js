let words = [];

async function loadWords(params = '') {
  try {
    const data = await API.request(`/api/admin/words${params}`);
    words = data.words;
    document.getElementById('wordRows').innerHTML = words.map((word) => `
      <tr>
        <td>${word.book}</td><td>${word.unit}</td><td>${word.english}</td><td>${word.chinese}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-dark" data-edit="${word.id}">編輯</button>
          <button class="btn btn-sm btn-outline-danger" data-delete="${word.id}">刪除</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    toast('請使用管理員帳號登入', 'danger');
  }
}

document.getElementById('wordForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target));
  const id = payload.id;
  delete payload.id;
  try {
    await API.request(id ? `/api/admin/words/${id}` : '/api/admin/words', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    });
    event.target.reset();
    toast('已儲存', 'success');
    loadWords();
  } catch (error) {
    toast(error.message, 'danger');
  }
});

document.getElementById('importForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const payload = Object.fromEntries(new FormData(event.target));
    const data = await API.request('/api/admin/import', { method: 'POST', body: JSON.stringify(payload) });
    toast(data.message, 'success');
    loadWords();
  } catch (error) {
    toast(error.message, 'danger');
  }
});

document.getElementById('filterForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const params = new URLSearchParams(new FormData(event.target)).toString();
  loadWords(`?${params}`);
});

document.getElementById('wordRows').addEventListener('click', async (event) => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;
  if (editId) {
    const word = words.find((item) => item.id === Number(editId));
    for (const key of ['id', 'book', 'unit', 'english', 'chinese']) {
      document.querySelector(`#wordForm [name="${key}"]`).value = word[key];
    }
  }
  if (deleteId && confirm('確定刪除此單字？')) {
    await API.request(`/api/admin/words/${deleteId}`, { method: 'DELETE' });
    loadWords();
  }
});

loadWords();
