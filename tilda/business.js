/* ============================================================
  Блок «Поток „Бизнес и успех“».
  В Тильде (блок T123) стоит только:
    <div id="se-business"></div>
    <script src="https://xenaja.github.io/sunenergy-site/tilda/business.js"></script>
  ============================================================ */
(function () {
  /* ====== ДАННЫЕ: правим только здесь; **так** — жирным ====== */
  var EYEBROW = 'Каждый день фестиваля';
  var TITLE = 'Поток <span>«Бизнес и успех»</span>';
  var LEAD = 'Отдельная программа для партнёров FullEnergy и всех, кто строит свой бизнес. Каждый день — практические занятия: от основ сетевого бизнеса до инструментов, которые помогают расти быстрее и тратить меньше сил.';
  var GROUPS = [
    {
      name: 'Основа бизнеса',
      note: 'Как устроен бизнес с FullEnergy и как вести команду',
      items: [
        'Маркетинг-план FullEnergy: как он работает и как на нём зарабатывать',
        'Как проводить планёрки, которые двигают команду',
        'Как выстроить бизнес-сеть и удерживать партнёров'
      ]
    },
    {
      name: 'Масштаб и рост',
      note: 'Инструменты, которые помогают расти без выгорания',
      items: [
        'Как расширить первую линию',
        'Искусственный интеллект в работе: контент, переписка, аналитика',
        'Трафик: где искать новых людей и как приводить их онлайн',
        'Автоматизация процессов и бот, который берёт рутину на себя'
      ]
    }
  ];
  var FOOT = 'Вы уезжаете не только отдохнувшими, но и **с понятным планом роста** и инструментами, которые можно применять уже на следующий день.';

  // ====== дальше код, менять не нужно ======
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/[^\/]*$/, '') : '';
  var VER = script && script.src.split('?')[1] || '';

  var mount = document.getElementById('se-business');
  if (!mount) { mount = document.createElement('div'); script.parentNode.insertBefore(mount, script); }
  if (mount.dataset.ready) return;
  mount.dataset.ready = '1';

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = BASE + 'business.css' + (VER ? '?' + VER : '');
  document.head.appendChild(css);

  var fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&family=Montserrat:wght@400;500;600&display=swap';
  document.head.appendChild(fonts);

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
  function rich(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }

  mount.innerHTML =
    '<section class="sebz" id="business"><div class="sebz__inner">' +
      '<div class="sebz__head">' +
        '<p class="sebz__eyebrow">' + esc(EYEBROW) + '</p>' +
        '<h2 class="sebz__title">' + TITLE + '</h2>' +
        '<p class="sebz__lead">' + rich(LEAD) + '</p>' +
      '</div>' +
      '<div class="sebz__grid">' +
        GROUPS.map(function (g) {
          return '<div class="sebz__card"><h3>' + esc(g.name) + '</h3>' +
            (g.note ? '<p>' + esc(g.note) + '</p>' : '') +
            '<ul>' + g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
        }).join('') +
      '</div>' +
      (FOOT ? '<p class="sebz__foot">' + rich(FOOT) + '</p>' : '') +
    '</div></section>';
})();
