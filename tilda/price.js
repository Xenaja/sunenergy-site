/* ============================================================
  Блок «Стоимость».
  В Тильде (блок T123) стоит только:
    <div id="se-price"></div>
    <script src="https://xenaja.github.io/sunenergy-site/tilda/price.js"></script>
  ============================================================ */
(function () {
  /* ====== ДАННЫЕ: правим только здесь ======
     LEAD — абзацы под заголовком; **так** — жирным.
     price: 0 — «В подарок». */
  var TITLE = 'Стоимость';
  var LEAD = [
    '**Для регистрации обязательна оплата проживания и питания.**',
    'Стоимость участия в программе зависит от скорости принятия решения. Успевай быть первым!'
  ];
  var PLANS = [
    {
      who: 'Партнёрам Full Energy',
      accent: true,
      tiers: [
        { label: 'Первые 50 мест', price: 0 },
        { label: 'Вторые 50 мест', price: 10000 },
        { label: 'Третьи 50 мест', price: 20000 }
      ]
    },
    {
      who: 'Гостям',
      tiers: [
        { label: 'Первые 50 мест', price: 10000 },
        { label: 'Вторые 50 мест', price: 20000 },
        { label: 'Третьи 50 мест', price: 30000 }
      ]
    }
  ];
  var FOOT = 'Проживание и питание оплачиваются отдельно.';

  // ====== дальше код, менять не нужно ======
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/[^\/]*$/, '') : '';
  var VER = script && script.src.split('?')[1] || '';

  var mount = document.getElementById('se-price');
  if (!mount) { mount = document.createElement('div'); script.parentNode.insertBefore(mount, script); }
  if (mount.dataset.ready) return;
  mount.dataset.ready = '1';

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = BASE + 'price.css' + (VER ? '?' + VER : '');
  document.head.appendChild(css);

  var fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&family=Montserrat:wght@400;500;600&display=swap';
  document.head.appendChild(fonts);

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
  function rich(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'; }

  mount.innerHTML =
    '<section class="sepr" id="price"><div class="sepr__inner">' +
      '<h2 class="sepr__title">' + esc(TITLE) + '</h2>' +
      '<div class="sepr__lead">' + LEAD.map(function (p) { return '<p>' + rich(p) + '</p>'; }).join('') + '</div>' +
      '<div class="sepr__grid">' +
        PLANS.map(function (p) {
          return '<div class="sepr__card' + (p.accent ? ' sepr__card--accent' : '') + '">' +
            '<h3 class="sepr__who">' + esc(p.who) + '</h3>' +
            (p.note ? '<p class="sepr__note">' + esc(p.note) + '</p>' : '') +
            '<ul class="sepr__tiers">' + p.tiers.map(function (t) {
              return '<li><span class="sepr__tier">' + esc(t.label) + '</span>' +
                (t.price === 0
                  ? '<span class="sepr__sum sepr__sum--gift">В подарок</span>'
                  : '<span class="sepr__sum">' + money(t.price) + '</span>') + '</li>';
            }).join('') + '</ul></div>';
        }).join('') +
      '</div>' +
      (FOOT ? '<p class="sepr__foot">' + esc(FOOT) + '</p>' : '') +
    '</div></section>';
})();
