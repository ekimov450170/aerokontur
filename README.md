# АЭРОКОНТУР — сайт

Лендинг компании по монтажу промышленной и коммерческой вентиляции.

## Структура проекта

```
aerokontur/
├── index.html          # Главная страница
├── css/
│   └── style.css       # Все стили
├── js/
│   └── main.js         # Навигация, анимации, форма
├── assets/
│   └── icons/          # Сюда добавлять SVG/PNG-иконки
└── README.md
```

## Быстрый старт локально

Просто откройте `index.html` в браузере — никаких сборщиков не нужно.

---

## GitHub Pages — публикация сайта

Сайт будет доступен по адресу:
**`https://ekimov450170.github.io/aerokontur`**

### Шаг 1 — залить код на GitHub

```bash
git add .
git commit -m "initial site"
git push origin main
```

### Шаг 2 — включить GitHub Pages

1. Откройте репозиторий на GitHub
2. Перейдите в **Settings → Pages**
3. В разделе **Source** выберите ветку **`main`**, папку **`/ (root)`**
4. Нажмите **Save**

Через 1–2 минуты сайт будет доступен по адресу выше.

### Автоматическое обновление

Каждый раз при `git push origin main` GitHub Pages автоматически пересобирает сайт — деплой занимает около 1 минуты.

---

## Что нужно заменить перед запуском

| Место                         | Что поменять                          |
|-------------------------------|---------------------------------------|
| Все страницы — телефон        | `+7 (495) 220-14-07` → ваш номер     |
| Footer — email                | `info@aerokontur.ru` → ваш email     |
| Footer — адрес                | Дербеневская наб., 7 → ваш адрес     |
| Footer — СРО                  | `№ 0123.45-2011` → ваш номер допуска |
| Footer — допуск МЧС           | `№ 77-Б/00321` → ваш номер           |
| `<title>` и `<meta name="description">` в index.html | Уточните описание |
| Форма (js/main.js)            | Добавьте реальную отправку (EmailJS, Formspree и т.п.) |

## Подключение реальной отправки формы (Formspree)

1. Зарегистрируйтесь на [formspree.io](https://formspree.io)
2. Создайте форму, получите endpoint вида `https://formspree.io/f/xxxxxxxx`
3. В `js/main.js` найдите `// Simulate submission` и замените блок:

```js
const data = new FormData(form);
fetch('https://formspree.io/f/xxxxxxxx', {
  method: 'POST',
  body: data,
  headers: { Accept: 'application/json' }
}).then(res => {
  if (res.ok) {
    submitBtn.textContent = '✓ Заявка отправлена';
    form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
  } else {
    submitBtn.textContent = 'Ошибка — попробуйте ещё раз';
    submitBtn.disabled = false;
  }
});
```

## Добавление Яндекс.Метрики

Вставьте код счётчика перед закрывающим тегом `</head>` в `index.html`.

---

Разработан как чистый HTML/CSS/JS без фреймворков — легко редактировать и хостить где угодно.
