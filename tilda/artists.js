/* ============================================================
  Блок «Артисты и мастера».
  В Тильде (блок T123) стоит только:
    <div id="se-artists"></div>
    <script src="https://xenaja.github.io/sunenergy-site/tilda/artists.js"></script>
  Всё остальное (вёрстка, стили, фото) подтягивается отсюда.
  Фото кладём в папку tilda/img/ и пишем в photo путь вида 'img/имя.jpg'.
  ============================================================ */
(function () {
  /* ====== ДАННЫЕ: правим только здесь ======
     photo — путь к фото в папке img ('img/Pavitra.jpg', регистр букв важен) или полная ссылка https://...
     pos   — какая часть фото попадёт в кружок и в попап: 'по горизонтали по вертикали',
             '50% 50%' — центр, '35% 50%' — левее, '50% 25%' — выше. Можно не указывать.
     zoom  — приблизить фото в кружке (1.3 = на 30% крупнее). Можно не указывать.
     bio   — текст для попапа «Подробнее» в обратных кавычках `...`; абзацы разделяем пустой строкой. */
  var ARTISTS = [
    { name: 'Татьяна Валеева', photo: 'img/Valeeva.jpg', pos: '50% 38%', zoom: 1.35, bio: 'Текст о Татьяне Валеевой.' },
    { name: 'Павитра', photo: 'img/Pavitra.jpg', pos: '36% 50%', bio: `
Павитра – проводник Три йоги, Парной йоги и Тантры, гонг-медитации. Более 20 лет практикует и проводит йогу, медитацию, дыхательные практики и sound-healing.

Проводит сеансы массажа: классический, висцеральный, тайский, виброакустический (тибетская чаша и гонг), биоэнергетический.

Создатель «Мистерии Звука», ретрит-центра и фестиваля «Энергия Солнца».

Специалист по упаковке и продвижению благостных событий.

«Йога – это не два квадратных метра коврика, а километры нашей жизни. Йога – это не упражнения, а непрерывное состояние Гармонии и Единства!»` },
    { name: 'Юра Ра',           photo: '', bio: 'Текст о Юре Ра.' },
    { name: 'Андрей Захаревич', photo: 'img/Zakharevich.jpg', pos: '46% 36%', zoom: 1.7, bio: 'Текст об Андрее Захаревиче.' }
  ];

  var TEXT = {
    title: 'Артисты и мастера',
    lead: [
      'Прямо сейчас мы создаём для вас яркую насыщенную программу со звездным составом.'
    ]
  };

  // ====== дальше код, менять не нужно ======
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/[^\/]*$/, '') : '';
  var VER = script && script.src.split('?')[1] || '';
  function url(p) { return !p || /^(https?:)?\/\//.test(p) ? p : BASE + p; }

  var mount = document.getElementById('se-artists');
  if (!mount) { mount = document.createElement('div'); script.parentNode.insertBefore(mount, script); }
  if (mount.dataset.ready) return;
  mount.dataset.ready = '1';

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = BASE + 'artists.css' + (VER ? '?' + VER : '');
  document.head.appendChild(css);

  // Шрифты: Philosopher — заголовки, Montserrat — кнопки и текст попапа
  var fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&family=Montserrat:wght@300;500&display=swap';
  document.head.appendChild(fonts);

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
  function initials(n) { return n.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase(); }

  // Рамка-мандала: кольцо, 4 жёлтых треугольника, уголки и красные лучи
  function frameSVG() {
    var c = 200, s = '';
    s += '<circle class="r" cx="200" cy="200" r="194"/>';
    s += '<circle class="h" cx="200" cy="200" r="150"/>';
    [0, 90, 180, 270].forEach(function (a) {
      var g = 'transform="rotate(' + a + ' 200 200)"';
      s += '<path class="y" ' + g + ' d="M200 18 L232 50 L168 50 Z"/>';
      s += '<path class="yl" ' + g + ' d="M76 108 V76 H108"/>';
      s += '<path class="y" ' + g + ' d="M80 80 H100 L80 100 Z"/>';
    });
    [-112, -68, -22, 22, 68, 112, 158, 202].forEach(function (deg) {
      for (var i = -1; i <= 1; i++) {
        var a = (deg + i * 5) * Math.PI / 180;
        var r1 = 152, r2 = 178 - Math.abs(i) * 6;
        s += '<line x1="' + (c + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (c - r1 * Math.cos(a)).toFixed(1) +
             '" x2="' + (c + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (c - r2 * Math.cos(a)).toFixed(1) + '"/>';
      }
    });
    return '<svg viewBox="0 0 400 400" aria-hidden="true">' + s + '</svg>';
  }

  var frame = frameSVG();
  var cards = ARTISTS.map(function (a, i) {
    var pic = a.photo
      ? '<div class="mpa-card__photo"><img src="' + esc(url(a.photo)) + '" alt="' + esc(a.name) + '" loading="lazy" style="' +
        (a.pos ? 'object-position:' + esc(a.pos) + ';' : '') +
        (a.zoom ? 'transform:scale(' + +a.zoom + ');transform-origin:' + esc(a.pos || '50% 50%') + ';' : '') + '"></div>'
      : '<div class="mpa-card__initials">' + esc(initials(a.name)) + '</div>';
    return '<div class="mpa-card"><div class="mpa-card__frame">' + frame + pic + '</div>' +
      '<h3 class="mpa-card__name">' + esc(a.name) + '</h3><div class="mpa-card__line"></div>' +
      '<button class="mpa-card__more" type="button" data-i="' + i + '">Подробнее</button></div>';
  }).join('');

  mount.innerHTML =
    '<section class="mpa" id="artists"><div class="mpa__inner">' +
      '<h2 class="mpa__title">' + esc(TEXT.title) + '</h2>' +
      TEXT.lead.map(function (p) { return '<p class="mpa__lead">' + esc(p) + '</p>'; }).join('') +
      '<div class="mpa__grid">' + cards + '</div>' +
    '</div></section>';

  // Попап кладём в конец страницы, чтобы его не обрезал контейнер Тильды
  var modal = document.createElement('div');
  modal.className = 'mpa-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="mpa-modal__bg" data-close></div>' +
    '<div class="mpa-modal__box" role="dialog" aria-modal="true" aria-labelledby="mpa-modal-name">' +
      '<button class="mpa-modal__x" type="button" aria-label="Закрыть" data-close>&times;</button>' +
      '<img class="mpa-modal__photo" alt="">' +
      '<div class="mpa-modal__body"><h3 class="mpa-modal__name" id="mpa-modal-name"></h3><div class="mpa-modal__bio"></div></div>' +
    '</div>';
  document.body.appendChild(modal);

  var mPhoto = modal.querySelector('.mpa-modal__photo');
  var lastBtn = null;

  function open(i, btn) {
    var a = ARTISTS[i];
    lastBtn = btn;
    modal.querySelector('.mpa-modal__name').textContent = a.name;
    modal.querySelector('.mpa-modal__bio').innerHTML =
      a.bio.trim().split(/\n\s*\n/).map(function (p) { return '<p>' + esc(p.trim()) + '</p>'; }).join('');
    if (a.photo) {
      mPhoto.src = url(a.photo); mPhoto.alt = a.name; mPhoto.style.objectPosition = a.pos || ''; mPhoto.hidden = false;
    } else { mPhoto.hidden = true; }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.mpa-modal__x').focus();
  }
  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastBtn) lastBtn.focus();
  }

  mount.addEventListener('click', function (e) {
    var b = e.target.closest('.mpa-card__more');
    if (b) open(+b.dataset.i, b);
  });
  modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
})();
