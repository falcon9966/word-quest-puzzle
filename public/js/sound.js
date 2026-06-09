const Sound = {
  _ctx: null,
  _enabled: true,

  _getCtx() {
    if (!this._ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) { this._enabled = false; return null; }
      try { this._ctx = new C(); } catch { this._enabled = false; return null; }
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  _play(fn) {
    if (!this._enabled) return;
    const ctx = this._getCtx();
    if (!ctx) return;
    fn(ctx);
  },

  cellSelect() {
    this._play(ctx => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 660;
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.08);
    });
  },

  wordFound() {
    this._play(ctx => {
      const notes = [523, 659, 784];
      notes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        const t = ctx.currentTime + i * 0.1;
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        o.connect(g).connect(ctx.destination);
        o.start(t); o.stop(t + 0.25);
      });
    });
  },

  wrongGuess() {
    this._play(ctx => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(220, ctx.currentTime);
      o.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);
      g.gain.setValueAtTime(0.08, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.25);
    });
  },

  levelStart() {
    this._play(ctx => {
      [523, 659, 784, 1047].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        const t = ctx.currentTime + i * 0.08;
        g.gain.setValueAtTime(0.1, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        o.connect(g).connect(ctx.destination);
        o.start(t); o.stop(t + 0.2);
      });
    });
  },

  levelComplete() {
    this._play(ctx => {
      const melody = [
        [523, 0], [587, 0.15], [659, 0.3], [784, 0.45],
        [880, 0.6], [1047, 0.8],
      ];
      melody.forEach(([freq, offset]) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        const t = ctx.currentTime + offset;
        g.gain.setValueAtTime(0.15, t);
        g.gain.linearRampToValueAtTime(0.12, t + 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        o.connect(g).connect(ctx.destination);
        o.start(t); o.stop(t + 0.5);
      });
    });
  },
};
