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

## Telegram-уведомления о заявках

Чтобы получать заявки с формы прямо в Telegram (быстрее, чем проверять почту):

1. В Telegram найдите **@BotFather**, отправьте `/newbot`, придумайте имя бота и username (должен заканчиваться на `bot`)
2. BotFather пришлёт **токен** вида `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ` — скопируйте его
3. Найдите своего бота по username, нажмите **Start**, отправьте любое сообщение (например «привет»)
4. Откройте в браузере (вставив свой токен):
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
   В ответе найдите `"chat":{"id": ЧИСЛО, ...}` — это `chat_id`
5. Откройте `js/main.js`, в самом начале файла замените:
   ```js
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
   const TELEGRAM_CHAT_ID   = 'YOUR_CHAT_ID';
   ```
   на свои значения

⚠️ **Токен бота — это как пароль.** Не публикуйте его, не отправляйте в чатах и не коммитьте в публичный репозиторий, если он не приватный. Если репозиторий публичный — рассмотрите вариант приватного репозитория или прокладку через сервис типа Pipedream/Make, чтобы токен не светился в открытом коде.

После настройки заявки будут приходить в Telegram **и** на email через Formspree — независимо друг от друга.

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
