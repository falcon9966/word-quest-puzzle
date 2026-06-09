const EMOJI_MAP = {
  walk:'🚶', moon:'🌙', cake:'🎂', egg:'🥚', chicken:'🐔',
  small:'🐭', girl:'👧', grandmother:'👵', big:'🐘', old:'👴',
  friend:'🤝', home:'🏠', today:'📅', room:'🚪', juice:'🧃',
  fruit:'🍎', jog:'🏃', fat:'🐷', pie:'🥧', sleep:'😴',
  paint:'🎨', animal:'🐾', hand:'✋', giraffe:'🦒', elephant:'🐘',
  love:'❤️', sing:'🎤', listen:'👂', sad:'😢', smile:'😊',
  young:'👶', color:'🌈', head:'👤', pink:'💗', brown:'🤎',
  yellow:'💛', banana:'🍌', watermelon:'🍉', baby:'👶', frog:'🐸',
  sky:'☀️', orange:'🍊', green:'💚', blue:'💙', purple:'💜',
  spider:'🕷️', eight:'8️⃣', leg:'🦵', sheep:'🐑', floor:'🏢',
  robot:'🤖', new:'🆕', jump:'🤸', run:'🏃', car:'🚗',
  mirror:'🪞', nose:'👃', mouth:'👄', eye:'👁️', ear:'👂',
  cow:'🐄', four:'4️⃣', feet:'🦶', duck:'🦆', know:'🧠',
  breakfast:'🥞', seven:'7️⃣', burger:'🍔', fries:'🍟', sausage:'🌭',
  find:'🔍', behind:'📍', book:'📖', six:'6️⃣', door:'🚪',
  zoo:'🏛️', birthday:'🎂', tiger:'🐯', nine:'9️⃣', snake:'🐍',
  baseball:'⚾', badminton:'🏸', ride:'🚴', bike:'🚲', motorbike:'🏍️',
  beach:'🏖️', kick:'🦶', hot:'🔥', sand:'🏖️', soccer:'⚽',
  shoe:'👟', arm:'💪', catch:'🤲', throw:'🤾', basketball:'🏀',
  water:'💧', white:'⬜', swim:'🏊', camera:'📷', tail:'🦊',
  pencil:'✏️', bed:'🛏️', hippo:'🦛', garden:'🌻', park:'🌳',
  classmate:'👫', favorite:'⭐', game:'🎮', teacher:'👩‍🏫', sayhello:'👋',
  write:'✍️', open:'🔓', happy:'😄', cute:'🥰', shy:'😳',
  dirty:'💩', angry:'😠', sorry:'🙏', shop:'🏪', alien:'👽',
  box:'📦', balloon:'🎈', house:'🏠', apartment:'🏢', flower:'🌸',
  picnic:'🧺', sofa:'🛋️', father:'👨', makefood:'🍳', television:'📺',
  sandwich:'🥪', eat:'🍽️', lunch:'🍱', lemonade:'🍋', flag:'🚩',
  show:'🎪', sea:'🌊', line:'📏', star:'⭐', beautiful:'🦋',
  help:'🆘', wash:'🧼', clothes:'👕', sister:'👧', table:'🪑',
  week:'📆', ant:'🐜', bee:'🐝', black:'⚫', picture:'🖼️',
  glasses:'👓', student:'🎒', music:'🎵', guitar:'🎸', piano:'🎹',
  woman:'👩', singer:'🎤', year:'📆', people:'👥', painting:'🖼️',
  child:'🧒', family:'👨‍👩‍👧‍👦', drink:'🥤', mother:'👩', song:'🎵',
  painter:'🎨', dance:'💃', toe:'🦶', talk:'💬', study:'📚',
  lizard:'🦎', meat:'🥩', grass:'🌱', real:'✅', fish:'🐟',
  shell:'🐚', watch:'⌚', ruler:'📏', word:'🔤', computer:'💻',
  phone:'📱', letter:'✉️', put:'📌', candy:'🍬', chocolate:'🍫',
  afternoon:'🌤️', gray:'🌫️', street:'🛣️', window:'🪟', jacket:'🧥',
  hat:'🎩', test:'📝', number:'🔢', clock:'🕐', twelve:'1️⃣2️⃣',
  point:'📍', twenty:'2️⃣0️⃣', friendly:'🤗', doll:'🪆', answer:'💡',
  bag:'🎒', funny:'😂', close:'🚪', store:'🏪', monkey:'🐵',
  dollar:'💰', goat:'🐐', please:'🙏', give:'🎁', boy:'👦',
  add:'➕', double:'2️⃣', right:'✅', page:'📄', count:'🔢',
  dream:'💭', rabbit:'🐰', coat:'🧥', true:'✅', hop:'🦘',
  ground:'🌍', monday:'1️⃣', wait:'⏳', wednesday:'3️⃣', pet:'🐾',
  party:'🎉', invite:'💌', doctor:'👨‍⚕️', map:'🗺️', island:'🏝️',
  sail:'⛵', pirate:'🏴‍☠️', before:'⏪', panda:'🐼', goose:'🦆',
  why:'❓', stomach:'🫃', kitchen:'🍳', work:'💼', worker:'👷',
  farm:'🌾', different:'🔄', horse:'🐴', carry:'🎒', coffee:'☕',
  feel:'🤗', headache:'🤕', earache:'👂', toothache:'🦷', hurt:'💢',
  hospital:'🏥', weekend:'🗓️', train:'🚂', station:'🚉', kite:'🪁',
  lake:'🏞️', holiday:'🎊', america:'🇺🇸', city:'🏙️', town:'🏘️',
  dress:'👗', stair:'🏃', weather:'⛅', sunny:'☀️', outside:'🌳',
  tired:'😫', wear:'👚', autumn:'🍂', snow:'❄️', ice:'🧊',
  hockey:'🏒', skate:'⛸️', join:'🤝', football:'🏈', shoulder:'🦾',
  together:'👫', dolphin:'🐬', rockclimbing:'🧗', back:'🔙', mountain:'⛰️',
  above:'⬆️', fall:'🍂', mistake:'❌', morning:'🌅', upstairs:'⬆️',
  dry:'🏜️', hair:'💇', downstairs:'⬇️', straight:'➡️', cloudy:'☁️',
  cold:'🥶', village:'🏘️', temperature:'🌡️', soup:'🍜', think:'🤔',
  start:'🏁', thin:'🧵', truck:'🚛', clown:'🤡', cage:'🦁',
  laugh:'😂', fair:'🎡', parents:'👪', evening:'🌆', handsome:'😎',
  balcony:'🏢', try:'💪', body:'🧍', river:'🏞️', kiss:'💋',
  inside:'🚪', teeth:'🦷', lion:'🦁', curly:'🌀', sometimes:'🕐',
  trip:'✈️', world:'🌍', chalk:'✏️', diningroom:'🍽️', pasta:'🍝',
  hungry:'😋', cloud:'☁️', dinner:'🍽️', salt:'🧂', library:'📚',
  always:'🔄', rain:'🌧️', spell:'🔤', forest:'🌲', bear:'🐻',
  jungle:'🌴', warm:'☀️', wet:'💦', plant:'🌱', difficult:'😰',
  shark:'🦈', grow:'🌱', scary:'😱', use:'🔧', feed:'🍼',
  bat:'🦇', sound:'🔊', bounce:'🤸', large:'🐋', hundred:'💯',
  smell:'👃', fly:'🪰', leaf:'🍃', bug:'🐛', garbage:'🗑️',
  hole:'🕳️', place:'📍', ugly:'👹', recycle:'♻️', paper:'📄',
  bottle:'🍾', stay:'🏠', stop:'🛑', cry:'😭', wrong:'❌',
  need:'🆘', movie:'🎬', worry:'😟', grandfather:'👴', story:'📖',
  japan:'🇯🇵', taiwan:'🇹🇼', visit:'🚀', countryside:'🌾', bottom:'⬇️',
  meet:'🤝', easy:'😊', spring:'🌸', winter:'⛄', summer:'🏖️',
  wonderful:'✨', country:'🌍', bank:'🏦', travel:'🧳', magazine:'📰',
  farmer:'👨‍🌾', sports:'🏃', blond:'👱', surf:'🏄', exciting:'🎢',
  glass:'🥛', jar:'🫙', plate:'🍽️', top:'⬆️', drop:'💧',
  surprised:'😮', wind:'🌬️', empty:'📭', plastic:'🧴', bowl:'🥣',
  pull:'🚂', neck:'🦒', move:'🚚', same:'🔄', idea:'💡',
  vegetable:'🥦', field:'🌾', bean:'🫘', choose:'🤔', kind:'💕',
  tissue:'🧻', check:'✅', friday:'5️⃣', night:'🌃', uncle:'👨',
  aunt:'👩', fine:'👍', scientist:'🔬', medicine:'💊', sick:'🤒',
  sportscenter:'🏟️', strong:'💪', player:'🏃', fast:'⚡', pass:'🏀',
  shout:'📢', lookfor:'🔎', score:'⭐', supermarket:'🏪', buy:'🛒',
  bread:'🍞', cheese:'🧀', getup:'⏰', lie:'🛌', son:'👦',
  tomorrow:'🗓️', wave:'👋', granddaughter:'👧', thirsty:'🥵', cup:'🥤',
  sweet:'🍬', tea:'🍵', wakeup:'🌅', plan:'📋', decide:'🤔',
  age:'🎂', adventure:'🗺️', forget:'😵', basement:'🏠', describe:'📝',
  writer:'✍️', vacation:'🏖️', restaurant:'🍽️', museum:'🏛️', famous:'🌟',
  steal:'🦸', lookup:'🔍', internet:'🌐', print:'🖨️', cut:'✂️',
  potato:'🥔', shape:'🔷', kitten:'🐱', puppy:'🐶', grandparent:'👴',
  push:'👉', tuesday:'2️⃣', cold2:'🤒', weak:'🥀', parrot:'🦜',
  kangaroo:'🦘', pool:'🏊', office:'🏢', hang:'🪟', thursday:'4️⃣',
  speak:'🗣️', afraid:'😨', terrible:'💀', board:'📋', homework:'📚',
  market:'🏪', opposite:'↔️', space:'🚀', planet:'🪐', hardworking:'💪',
  astronaut:'🧑‍🚀', april:'4️⃣', rocket:'🚀', healthy:'🥗', exercise:'🏋️',
  costume:'🎭', pumpkin:'🎃', lantern:'🏮', halloween:'🎃', believe:'🙏',
  ghost:'👻', scared:'😱', fire:'🔥', knock:'🚪', build:'🏗️',
  stone:'🪨', temple:'🏛️', brave:'🦁', difference:'🔄', married:'💍',
  alphabet:'🔤', language:'🗣️', change:'🔄', century:'📅', avoid:'🚫',
  north:'🧭', land:'🌍', machine:'⚙️', wood:'🪵', thick:'📚',
  broken:'💔', remember:'🧠', past:'⏪', popular:'⭐', goal:'🥅',
  block:'🧱', material:'📦', cave:'🕳️', desert:'🏜️', special:'✨',
  million:'💰', sell:'🏪', collect:'🃏', boring:'😴', factory:'🏭',
  takecareof:'🤗', subject:'📚', dangerous:'☣️', safe:'🛡️', waiter:'👨‍🍳',
  follow:'👣', order:'📋', share:'🤝', information:'ℹ️', online:'💻',
  interesting:'🤔', problem:'❓', careful:'⚠️', rule:'📏', important:'❗',
  strange:'👽', future:'🔮', guess:'🤔', frightened:'😨', technology:'💻',
  convenient:'👍', chat:'💬', surprise:'🎉', knife:'🔪', environment:'🌍',
  carefully:'👀', win:'🏆', team:'👥', group:'👨‍👩‍👧', example:'📝',
  race:'🏁', member:'🆔', mechanic:'🔧', engineer:'👷', coach:'👨‍🏫',
  teach:'📚', practice:'🏋️', instrument:'🎵', flute:'🪈', violin:'🎻',
  thousand:'💯', closed:'🔒', excellent:'🌟', perfect:'💯', competition:'🏆',
  national:'🇺🇳', spend:'💳', prepare:'📋', match:'⚔️', fan:'🎉',
  ticket:'🎫', interested:'🤩', awake:'😳', enter:'🚪', enough:'✅',
  wild:'🐺', train2:'🏃', lookafter:'👀', brush:'🪥', prize:'🏆',
  become:'🔄', begin:'▶️', chance:'🍀', clap:'👏', month:'📅',
  news:'📰', pickup:'🤲', airport:'✈️', welcome:'👋', glove:'🧤',
  yard:'🏡', finger:'👆', cheer:'🎉', nature:'🌿', fresh:'🥬',
  air:'💨', unhappy:'😞', camping:'⛺', hike:'🥾', spot:'📍',
  backpack:'🎒', tent:'⛺', lucky:'🍀', safari:'🦁', east:'➡️',
  journey:'🗺️', getoff:'🚌', beat:'🥊', tour:'🚌', leader:'👑',
  fridge:'🧊', hunt:'🏹', zebra:'🦓', rainbow:'🌈', castle:'🏰',
  fountain:'⛲', neighbor:'👋', trick:'🎃', bench:'🪑', butterfly:'🦋',
  swing:'🎠', bright:'💡', huge:'🐳', bite:'🦷', horrible:'💀',
  interest:'⭐', size:'📏', lose:'😢', bone:'🦴', whale:'🐋',
  dot:'⏺️', knowledge:'📚', cool:'😎', west:'⬅️', puton:'👔',
  sunglasses:'🕶️', light:'💡', poster:'🖼️', reporter:'🎤', newspaper:'📰',
  journalist:'✍️', fact:'📊', finish:'🏁', sunday:'7️⃣', understand:'🧠',
  findout:'🔍', extinct:'💀', kill:'🔪', smart:'🧠', feather:'🪶',
  agree:'👍', sharp:'🗡️', jaw:'🦷', simple:'😊', venom:'☠️',
  fever:'🤒', ill:'🤢', tiny:'🐜', insect:'🦟', mosquito:'🦟',
  ocean:'🌊', befilledwith:'🈵', unusual:'👽', deep:'🏊', dark:'🌑',
  attack:'⚔️', possible:'🤞', twice:'2️⃣', able:'💪', type:'⌨️',
  hard:'🪨', trouble:'😥', horn:'📯', pay:'💰', save2:'🆘',
  gorilla:'🦍', turtle:'🐢', fisherman:'🎣', net:'🥅', turnoff:'🔌',
  leave:'🚶', cost:'💰', money:'💵', electricity:'⚡', global:'🌍',
  hate:'😠', storm:'🌪️', else:'🤷', ofcourse:'👍', trash:'🗑️',
  everywhere:'🌍', cover:'🧢', burn:'🔥', smoke:'💨', dieout:'💀',
  smell2:'👃', clear:'✅', clean:'🧹', hope:'💫', far:'📏',
  maybe:'🤔', send:'📤', mile:'📏', soon:'⏰', dig:'⛏️',
  heat:'🔥', power:'💪', improve:'📈', fix:'🔧', boil:'♨️',
  minute:'⏱️', cook:'🍳', alittle:'🤏', piece:'🧩', might:'🤷',
  break:'💔', roll:'🌀', however:'🤔', wish:'⭐', experiment:'🔬',
  explain:'📖', helpful:'🤝', advice:'💡', born:'👶', britain:'🇬🇧',
  during:'⏳', history:'📜', university:'🎓', rest:'😌', pocket:'👖',
  without:'🚫', oil:'🛢️', gas:'⛽', tie:'👔', rub:'🤲',
  sweater:'🧶', repeat:'🔁', action:'🎬', hold:'🤲', author:'✍️',
  quite:'🤏', poor:'😢', rich:'💰', giveup:'🏳️', complete:'✅',
  later:'⏰', bookstore:'📚', bored:'😒', magical:'✨', feeling:'💖',
  hear:'👂', across:'🌉', collection:'📦', ready:'🏃', character:'🧑',
  experience:'🎯', proud:'😊', excited:'🤩', borrow:'📚', hotel:'🏨',
  sentence:'📝', reply:'💬', weird:'👽', toward:'➡️', amazed:'😮',
  crazy:'🤪', early:'🌅', windy:'💨', worried:'😟', voice:'🗣️',
  striped:'🦓', spotted:'🐆', suddenly:'⚡', road:'🛣️', path:'🛤️',
  goodbye:'👋', along:'➡️', shine:'☀️', taxi:'🚕', photo:'📷',
  photographer:'📸', prefer:'👍', photography:'📷', cheap:'💰', pond:'🏞️',
  copy:'📋', artist:'🎨', expensive:'💎', perhaps:'🤔', probably:'🤔',
  human:'🧑', soil:'🌱', stick:'🪵', inadditionto:'➕', common:'👥',
  seldom:'🕐', area:'🗺️', successful:'🏆', mark:'✅', modern:'🏙️',
  ceiling:'🏠', between:'↔️', several:'🔢', wellknown:'🌟', god:'⛪',
  raise:'⬆️', health:'🏥', visitor:'👋', create:'🛠️', metal:'🔩',
  pot:'🍲', poem:'📝', waterfall:'🌊', pretty:'🌸', pottery:'🏺',
  dish:'🍽️', vase:'🏺', gold:'🥇', silver:'🥈', army:'⚔️',
  soldier:'🪖', clay:'🏺', emperor:'👑', fight:'🥊', uniform:'👔',
  knee:'🦵', tomb:'🪦', until:'⏳', exist:'✅', appear:'👻',
  yet:'🤷', disappear:'💨', normal:'😐', adult:'🧑', heavy:'🏋️',
  shake:'📳', centimeter:'📏', wing:'🦅', arrive:'🚶', europe:'🇪🇺',
  sailor:'⛵', business:'💼', below:'⬇️', level:'📊', roof:'🏠',
  mud:'💩', blanket:'🛌', comfortable:'😌', conversation:'💬', egypt:'🇪🇬',
  pyramid:'🔺', giant:'🦒', queen:'👑', september:'9️⃣', delicious:'😋',
  noodle:'🍜', dumpling:'🥟', policestation:'👮'
};

function getEmoji(word) {
  const key = word.toLowerCase().replace(/[^a-z]/g, '');
  return EMOJI_MAP[key] || EMOJI_MAP[key.replace(/s$/, '')] || '📝';
}

const DIRS = [[0,1],[1,0],[1,1],[1,-1]];
const GRID_SIZE = 10;

let levels = [];
let currentLevel = null;
let words = [];
let grid = [];
let gridWords = [];
let foundWords = new Set();
let selectedCells = [];
let isSelecting = false;
let levelScore = 0;
let unlockedLevel = 1;
let wordLookup = new Map();

function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

async function loadLevels() {
  const data = await API.request('/api/levels');
  levels = data.levels;
  unlockedLevel = data.unlockedLevel || 1;
  renderLevels();
}

function renderLevels() {
  const grid = document.getElementById('levelGrid');
  grid.innerHTML = levels.map(l => {
    const locked = API.user && API.user.role === 'player' && l.id > unlockedLevel;
    return `<button class="level-btn${locked?' locked':''}${currentLevel?.id===l.id?' active':''}" data-id="${l.id}"${locked?' disabled':''}>
      📖 ${l.title.replace('第','').replace('冊','').replace('第','-').replace('關','')}<br><small>Unit ${l.units.join('+')}</small>
    </button>`;
  }).join('');
}

async function startLevel(levelId) {
  currentLevel = levels.find(l => l.id === levelId);
  foundWords = new Set();
  selectedCells = [];
  levelScore = 0;
  isSelecting = false;

  document.getElementById('welcomeScreen').classList.add('hidden');
  document.getElementById('gameContent').classList.remove('hidden');

  const data = await API.request(`/api/levels/${levelId}`);
  words = data.words;
  generateGrid();
  renderGrid();
  renderHints();
  updateStats();
  renderLevels();
}

function generateGrid() {
  grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  gridWords = [];
  wordLookup = new Map();

  const sorted = [...words].sort((a, b) => b.english.length - a.english.length);

  for (const word of sorted) {
    const eng = word.english.toLowerCase().replace(/[^a-z]/g, '');
    if (eng.length < 2 || eng.length > GRID_SIZE) continue;

    let placed = false;
    for (let attempt = 0; attempt < 300 && !placed; attempt++) {
      const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const endRow = row + dir[0] * (eng.length - 1);
      const endCol = col + dir[1] * (eng.length - 1);
      if (endRow < 0 || endRow >= GRID_SIZE || endCol < 0 || endCol >= GRID_SIZE) continue;

      let ok = true;
      for (let i = 0; i < eng.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        if (grid[r][c] !== '' && grid[r][c] !== eng[i]) { ok = false; break; }
      }
      if (!ok) continue;

      for (let i = 0; i < eng.length; i++) {
        const r = row + dir[0] * i;
        const c = col + dir[1] * i;
        grid[r][c] = eng[i];
      }

      const cells = [];
      for (let i = 0; i < eng.length; i++) {
        cells.push([row + dir[0] * i, col + dir[1] * i]);
      }
      gridWords.push({ word: eng, cells, id: word.id });
      wordLookup.set(eng, word);
      placed = true;
    }
  }

  const letters = 'abcdefghijklmnopqrstuvwxyz';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}

function renderGrid() {
  const el = document.getElementById('wordGrid');
  el.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  el.innerHTML = '';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.textContent = grid[r][c];
      el.appendChild(cell);
    }
  }

  el.addEventListener('mousedown', onPointerDown);
  el.addEventListener('mousemove', onPointerMove);
  el.addEventListener('mouseup', onPointerUp);
  el.addEventListener('mouseleave', onPointerUp);
  el.addEventListener('touchstart', onTouchStart, { passive: false });
  el.addEventListener('touchmove', onTouchMove, { passive: false });
  el.addEventListener('touchend', onTouchEnd, { passive: false });
}

function renderHints() {
  const el = document.getElementById('wordHints');
  el.innerHTML = words.map(w => {
    const emoji = getEmoji(w.english);
    return `<div class="word-hint" data-word-id="${w.id}">
      <span class="hint-emoji">${emoji}</span>
      <span class="hint-chinese">${w.chinese}</span>
    </div>`;
  }).join('');
}

function updateStats() {
  document.getElementById('levelTitle').textContent = `${currentLevel.title}`;
  document.getElementById('progressText').textContent = `⭐ ${foundWords.size} / ${gridWords.length}`;
  document.getElementById('scoreText').textContent = `🏅 ${levelScore} 分`;
}

function cellEl(r, c) {
  return document.querySelector(`.grid-cell[data-r="${r}"][data-c="${c}"]`);
}

function clearSelection() {
  for (const [r, c] of selectedCells) {
    const el = cellEl(r, c);
    if (el) el.classList.remove('selected');
  }
  selectedCells = [];
}

function onPointerDown(e) {
  const cell = e.target.closest('.grid-cell');
  if (!cell) return;
  isSelecting = true;
  clearSelection();
  const r = Number(cell.dataset.r);
  const c = Number(cell.dataset.c);
  selectedCells.push([r, c]);
  cell.classList.add('selected');
}

function onPointerMove(e) {
  if (!isSelecting) return;
  const cell = e.target.closest('.grid-cell');
  if (!cell) return;
  const r = Number(cell.dataset.r);
  const c = Number(cell.dataset.c);
  const last = selectedCells[selectedCells.length - 1];
  if (last && last[0] === r && last[1] === c) return;
  const dr = r - last[0];
  const dc = c - last[1];
  if (Math.abs(dr) > 1 || Math.abs(dc) > 1) return;
  if (selectedCells.length >= 1) {
    const prev = selectedCells[selectedCells.length - 2];
    if (prev && prev[0] === r && prev[1] === c) {
      const removed = selectedCells.pop();
      cellEl(removed[0], removed[1])?.classList.remove('selected');
      return;
    }
  }
  if (dr === 0 && dc === 0) return;
  selectedCells.push([r, c]);
  cell.classList.add('selected');
}

function onPointerUp() {
  if (!isSelecting) return;
  isSelecting = false;
  checkSelection();
}

let touchStartPos = null;

function onTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  touchStartPos = { x: touch.clientX, y: touch.clientY };
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  const cell = el?.closest('.grid-cell');
  if (!cell) return;
  isSelecting = true;
  clearSelection();
  const r = Number(cell.dataset.r);
  const c = Number(cell.dataset.c);
  selectedCells.push([r, c]);
  cell.classList.add('selected');
}

function onTouchMove(e) {
  e.preventDefault();
  if (!isSelecting) return;
  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  const cell = el?.closest('.grid-cell');
  if (!cell) return;
  const r = Number(cell.dataset.r);
  const c = Number(cell.dataset.c);
  const last = selectedCells[selectedCells.length - 1];
  if (last && last[0] === r && last[1] === c) return;
  const dr = r - last[0];
  const dc = c - last[1];
  if (Math.abs(dr) > 1 || Math.abs(dc) > 1) return;
  if (selectedCells.length >= 1) {
    const prev = selectedCells[selectedCells.length - 2];
    if (prev && prev[0] === r && prev[1] === c) {
      const removed = selectedCells.pop();
      cellEl(removed[0], removed[1])?.classList.remove('selected');
      return;
    }
  }
  if (dr === 0 && dc === 0) return;
  selectedCells.push([r, c]);
  cell.classList.add('selected');
}

function onTouchEnd(e) {
  e.preventDefault();
  if (!isSelecting) return;
  isSelecting = false;
  checkSelection();
}

function checkSelection() {
  const selectedStr = selectedCells.map(([r, c]) => grid[r][c]).join('');
  const reversed = selectedCells.map(([r, c]) => grid[r][c]).reverse().join('');

  let matched = null;
  for (const gw of gridWords) {
    if (foundWords.has(gw.id)) continue;
    if (gw.word === selectedStr || gw.word === reversed) {
      matched = gw;
      break;
    }
  }

  if (matched) {
    foundWords.add(matched.id);
    levelScore += 10;
    for (const [r, c] of matched.cells) {
      const el = cellEl(r, c);
      if (el) { el.classList.remove('selected'); el.classList.add('found'); }
    }
    const hintEl = document.querySelector(`.word-hint[data-word-id="${matched.id}"]`);
    if (hintEl) {
      const wordData = wordLookup.get(matched.word);
      hintEl.classList.add('found');
      hintEl.innerHTML = `<span class="hint-emoji">${getEmoji(matched.word)}</span>
        <span class="hint-chinese">${wordData ? wordData.chinese : ''}</span>
        <span class="hint-english">${matched.word}</span>`;
    }
    clearSelection();
    updateStats();
    toast(`🎉 找到了 ${matched.word}！`, 'success');
    if (foundWords.size === gridWords.length) {
      setTimeout(completeLevel, 500);
    }
  } else {
    for (const [r, c] of selectedCells) {
      const el = cellEl(r, c);
      if (el) el.classList.add('wrong');
    }
    setTimeout(() => {
      for (const [r, c] of selectedCells) {
        const el = cellEl(r, c);
        if (el) el.classList.remove('wrong');
      }
      clearSelection();
    }, 400);
  }
}

async function completeLevel() {
  if (API.user && API.user.role === 'player') {
    try {
      await API.request(`/api/levels/${currentLevel.id}/complete`, { method: 'POST' });
    } catch (e) { /* ok */ }
  }

  const overlay = document.createElement('div');
  overlay.className = 'celebration';
  overlay.innerHTML = `<div class="celebration-card">
    <span class="big-emoji">🎉</span>
    <h2>太棒了！過關！</h2>
    <p>你在 ${currentLevel.title} 獲得 ${levelScore} 分 🏅</p>
    <button id="nextLevelBtn">下一關 ➡️</button>
  </div>`;
  document.body.appendChild(overlay);

  document.getElementById('nextLevelBtn').addEventListener('click', () => {
    overlay.remove();
    const nextId = currentLevel.id + 1;
    const nextLevel = levels.find(l => l.id === nextId);
    if (nextLevel && (!API.user || API.user.role !== 'player' || nextId <= unlockedLevel + 1)) {
      startLevel(nextId);
    } else {
      toast('🎊 所有關卡已完成！', 'success');
      document.getElementById('welcomeScreen').classList.remove('hidden');
      document.getElementById('gameContent').classList.add('hidden');
    }
  });
}

document.getElementById('levelGrid').addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (btn) startLevel(Number(btn.dataset.id)).catch(err => toast(err.message, 'error'));
});

loadLevels().catch(err => toast(err.message, 'error'));
