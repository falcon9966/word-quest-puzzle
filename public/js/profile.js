(async function loadProfile() {
  try {
    const data = await API.request('/api/profile');
    document.getElementById('score').textContent = data.user.score;
    document.getElementById('completed').textContent = data.save.completedLevels.length;
    document.getElementById('unlocked').textContent = data.save.unlockedLevel;
    document.getElementById('attemptRows').innerHTML = data.save.attempts.slice().reverse().map((item) => `
      <tr><td>${item.levelId}</td><td>${item.answer || '-'}</td><td>${item.correct ? '答對' : '答錯'}</td><td>${new Date(item.at).toLocaleString()}</td></tr>
    `).join('') || '<tr><td colspan="4" class="text-secondary">尚無作答記錄</td></tr>';
  } catch (error) {
    toast('請先登入玩家帳號', 'warning');
  }
})();
