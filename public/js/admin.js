(async function loadStats() {
  try {
    const data = await API.request('/api/admin/stats');
    const cards = [
      ['總註冊人數', data.users],
      ['總關卡數', data.levels],
      ['當日活躍玩家', data.activeToday],
      ['題庫總單字數', data.words]
    ];
    document.getElementById('stats').innerHTML = cards.map(([label, value]) => `
      <section class="col-md-3"><div class="panel stat p-4"><div class="text-secondary">${label}</div><div class="display-5 fw-bold">${value}</div></div></section>
    `).join('');
  } catch (error) {
    toast('請使用管理員帳號登入', 'danger');
  }
})();
