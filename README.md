# Word Quest 英文單字猜謎闖關網站

## 專案目錄

```text
puzzle/
  單字.txt
  遊戲示意圖.png
  package.json
  README.md
  db/
    schema.sql
    game.sqlite
  server/
    app.js
    db.js
    wordService.js
  public/
    index.html
    auth.html
    game.html
    profile.html
    rankings.html
    admin.html
    admin-words.html
    admin-users.html
    css/styles.css
    js/api.js
    js/auth.js
    js/game.js
    js/profile.js
    js/rankings.js
    js/admin.js
    js/admin-words.js
    js/admin-users.js
  test/
    word-service.test.js
```

## 三張核心資料表

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nickname TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'player',
  score INTEGER NOT NULL DEFAULT 0,
  is_frozen INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book INTEGER NOT NULL,
  unit INTEGER NOT NULL,
  english TEXT NOT NULL,
  chinese TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(book, unit, english, chinese)
);

CREATE TABLE IF NOT EXISTS player_saves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  unlocked_level INTEGER NOT NULL DEFAULT 1,
  completed_levels TEXT NOT NULL DEFAULT '[]',
  attempts TEXT NOT NULL DEFAULT '[]',
  last_played_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 安裝與啟動

1. 安裝 Node.js 20 以上版本。
2. 在本資料夾開啟 PowerShell。
3. 安裝依賴：

```powershell
npm.cmd install
```

4. 啟動網站：

```powershell
npm.cmd start
```

5. 打開瀏覽器：

```text
http://localhost:3000
```

預設後台帳號：

```text
帳號：admin
密碼：admin123
後台：http://localhost:3000/admin.html
```

第一次啟動時系統會自動建立 `db/game.sqlite`，並從 `單字.txt` 匯入 6 冊、20 Unit 的題庫。規則為每冊 10 關，共 60 關，每關包含連續 2 個 Unit。

## 測試

```powershell
npm.cmd test
npm.cmd audit --audit-level=high
```
