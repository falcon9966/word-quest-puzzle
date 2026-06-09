(async function loadRankings() {
  const data = await API.request('/api/rankings');
  document.getElementById('rankRows').innerHTML = data.rankings.map((user, index) => `
    <tr><td>${index + 1}</td><td>${user.nickname}</td><td>${user.username}</td><td class="fw-bold">${user.score}</td></tr>
  `).join('') || '<tr><td colspan="4" class="text-secondary">尚無排行榜資料</td></tr>';
})();
