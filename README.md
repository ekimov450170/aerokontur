# АЭРОКОНТУР — сайт

Лендинг компании по монтажу промышленной и коммерческой вентиляции.

## Структура проекта

```
aerokontur/
├── index.html              # Главная страница
├── about.html              # О компании
├── robots.txt              # Директивы для поисковых роботов
├── sitemap.xml             # Карта сайта
├── css/
│   └── style.css           # Все стили (токены, компоненты, адаптив)
├── js/
│   └── main.js             # Навигация, анимации, отправка формы
├── assets/
│   ├── icons/              # SVG-иконки
│   └── images/
│       └── og.png          # Open Graph-изображение (1200×630)
└── .github/
    └── workflows/
        └── deploy.yml      # Авто-деплой на GitHub Pages
```

## Быстрый старт локально

Откройте `index.html` в браузере — никаких сборщиков не нужно.

---

## Деплой на GitHub Pages (автоматический)

Сайт публикуется автоматически при каждом `git push` в ветку `main`.  
Адрес после публикации: **`https://ekimov450170.github.io/aerokontur`**

### Один раз — включить GitHub Actions Pages

1. Откройте репозиторий на GitHub
2. Перейдите в **Settings → Pages**
3. В разделе **Source** выберите **GitHub Actions** (не «Deploy from branch»)
4. Нажмите **Save**

После этого любой `git push origin main` запустит workflow `.github/workflows/deploy.yml`  
и через ~1 минуту обновит сайт.

### Обновить сайт

```bash
# Внесите правки в файлы, затем:
git add .
git commit -m "описание изменений"
git push origin main
```

Статус деплоя — в разделе **Actions** репозитория.

---

## Что нужно заменить перед запуском

| Место | Что поменять |
|---|---|
| Все страницы — телефон | `+7 (495) 220-14-07` → ваш номер |
| Footer — email | `info@aerokontur.ru` → ваш email |
| Footer — адрес | Дербеневская наб., 7 → ваш адрес |
| Footer — СРО | `№ 0123.45-2011` → ваш номер допуска |
| Footer — допуск МЧС | `№ 77-Б/00321` → ваш номер |
| `sitemap.xml` | Обновить даты `<lastmod>` при публикации |
| `assets/images/og.png` | Заменить на реальное изображение (1200×630 px) |
| Форма `action=` в index.html | Заменить `YOUR_FORM_ID` на ID из Formspree |
| Карточки объектов | Заменить демо-данные на реальные |
| Команда в about.html | Заменить имена и роли |

---

## Подключение отправки формы (Formspree)

1. Зарегистрируйтесь на [formspree.io](https://formspree.io)
2. Создайте новую форму — получите endpoint вида  
   `https://formspree.io/f/xxxxxxxx`
3. В `index.html` найдите строку:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```
   и замените `YOUR_FORM_ID` на ваш ID.

Форма автоматически переключится с режима «тест» на реальную отправку.  
Письма будут приходить на email, указанный при регистрации в Formspree.

---

## Яндекс.Метрика

Вставьте код счётчика перед `</head>` в `index.html` и `about.html`:

```html
<!-- Yandex.Metrika -->
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){...})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "XXXXXXXX");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/XXXXXXXX" .../></div></noscript>
<!-- /Yandex.Metrika -->
```

Замените `XXXXXXXX` на номер вашего счётчика.

---

Разработан как чистый HTML/CSS/JS без фреймворков — легко редактировать и хостить где угодно.
