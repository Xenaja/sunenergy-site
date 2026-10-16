/* ============================================================
  Блок «Каждый день вас ждут» (по темам).
  В Тильде (блок T123) стоит только:
    <div id="se-program"></div>
    <script src="https://xenaja.github.io/sunenergy-site/tilda/program.js"></script>
  ============================================================ */
(function () {
  /* ====== ДАННЫЕ: правим только здесь ====== */
  var TITLE = 'Каждый день вас ждут';
  var THEMES = [
    { name: 'Здоровье',   items: ['Телесные и дыхательные практики', 'Йога и медитация', 'Экстатичные танцы'] },
    { name: 'Отношения',  items: ['Женский круг', 'Мужской клуб', 'Сердечная тантра', 'Детская программа'] },
    { name: 'Финансы',    items: ['Трансформационные практики', 'Актёрское мастерство'] },
    { name: 'Духовность', items: ['Сатсанги', 'Звуковые медитации', 'Этно-концерты'] }
  ];

  // ====== дальше код, менять не нужно ======
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/[^\/]*$/, '') : '';
  var VER = script && script.src.split('?')[1] || '';

  var mount = document.getElementById('se-program');
  if (!mount) { mount = document.createElement('div'); script.parentNode.insertBefore(mount, script); }
  if (mount.dataset.ready) return;
  mount.dataset.ready = '1';

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = BASE + 'program.css' + (VER ? '?' + VER : '');
  document.head.appendChild(css);

  var fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&family=Montserrat:wght@500&display=swap';
  document.head.appendChild(fonts);

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  mount.innerHTML =
    '<section class="sep" id="program"><div class="sep__inner">' +
      '<h2 class="sep__title">' + esc(TITLE) + '</h2>' +
      '<div class="sep__grid">' +
        THEMES.map(function (t) {
          return '<div class="sep__card"><h3>' + esc(t.name) + '</h3><ul>' +
            t.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
        }).join('') +
      '</div>' +
    '</div></section>';
})();
