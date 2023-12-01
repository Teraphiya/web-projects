# Лабораторная работа №1

**Студент:** Нилогов Сергей Александрович
**Группа:** M33121
**ИСУ:** 332955

## Тема лабораторной работы:
Сайт о моем родном городе - Салехарде

## Use-Case сценарии с использованием выбранных мною библиотек:

# Swiper (Слайдер для галереи фотографий на странице погоды): weather
Сценарий: Человек посещает страницу с погодой. И на этой странице реализована галерея, оформленная в виде слайдера с эффектом "coverflow". Пользователь может листать фотографии, используя курсор.
Цель: Сделать интересную и красивую анимацию скроллинга фотографий.

# Toastr (Уведомления о действиях в интер. табл.): planer
Сценарий: После сохранения расписания пользователь получит уведомление в верхнем правом углу экрана, которое подтверждает успешное сохранение события.
Цель: Существует интерактивная кнопка, при нажатии которой происходит определенное действие, но не всегда пользователь может понять, совершено это действие или нет. Для этого необходимо добавить уведомление.

# SweetAlert (Модальные окна, для комментариев): comments
Сценарий: При успешной отправке комментария на странице фотографий, пользователь видит уже оформленное модальное окно с сообщением об успешной отправке.
Цель: Аналогична предыдущей.

1. Лаба 4 - runtime
Я считаю время между началом и завершением DOM - БЕЗ ОЖИДАНИЯ загрузки стилей... А нужно учитывать это время.
        let loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        let loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;


2. Добавление grid - интерактивная таблица


            <div class="grid-table">
                <div class="grid-header">1891 год</div>
                <div class="grid-header">2003 год</div>
                <div class="grid-header">2023 год</div>

                <div class="grid-cell">876 человек</div>
                <div class="grid-cell">36 800 человек</div>
                <div class="grid-cell">48 619 человек</div>

                <div class="grid-cell">+0 человек</div>
                <div class="grid-cell">+35 924 человек</div>
                <div class="grid-cell">+12 695 человек</div>
            </div>

3.
padding - внутренние отступы

4.
sub - верхний индекс
sup - нижний индекс

5.
blockquote - для длинный цитат. есть отступы у тега
q - для коротких цитат выставляет кавычки
cite - помечает текст как цитату или сноску. Удобно использовать со стилями.
aside - для добавления краткого описания

6.
  h1 {
      text-transform: uppercase;
      /* Заглавные буквы */
  }

8. Исправил тип шрифта, читаемый везде

9. ex->rem

10. Наладил псевдокод







ПРАВКИ:
1. Пересмотрел свое отношение. Изменил названия файлов, их структуру.

2. Вопрос: связанный с указанием цвета.

3. Вопрос: Если добавлять в свой проект шрифты, как сделат так, чтобы они у всех отображались корректно. Исключить их возможное исчезновение.

4. Исключил белые отступы вокруг подвала

5. Настройка Swiper в погоде

6. Тщательная настройка header

7. Переосмысление страницы с фотографиями. Обший стиль header.

8. Псевдографика работает корректно 

9. Добваил подвал на страницу фотографий


10. СДЕЛАТЬ так, чтобы активное меню при масштабировании становилось вертикальным

11. Указал размер шрифта в rem.

12. Исправил вывод времени загрузки в секундах. Проблема была в использловании устаревшено формата timing.
1)
(function () {
    'use strict'; /* Строго */
    // Отслеживание времени загрузки
    window.addEventListener('load', function () {
        let loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart; /* Устарело */
        let footer = document.querySelector('footer');
        if (footer) {
            footer.innerHTML += `<p>Время загрузки: ${loadTime}ms</p>`;
        }
    });

2)
;(function () {
	'use strict'
	window.addEventListener('load', function () {
		let perfEntries = performance.getEntriesByType('navigation')
		if (perfEntries.length > 0) {
			let p = perfEntries[0]
			let loadTime = p.domContentLoadedEventEnd - p.startTime /* Вот loadEventEnd */
			let footer = document.querySelector('footer')
			if (footer) {
				footer.innerHTML += `<p>Время загрузки: ${loadTime}ms</p>`
			}
		}
	})

3)
;(function () {
    'use strict';
    window.onload = function() {
        setTimeout(function() {
            let perfEntries = performance.getEntriesByType("navigation");
            if (perfEntries.length > 0) {
                let p = perfEntries[0];
                let loadTime = p.loadEventEnd - p.startTime;
                let footer = document.querySelector('footer');
                if (footer) {
                    footer.innerHTML += `<p>Полное время загрузки: ${loadTime}ms</p>`;
                }
            }
        }, 0); // Задержка в 0 мс гарантирует
    };

13. Добавление grid - интерактивная таблица. +Таблица с table tag










Лабораторная 5.
- Создана отдельная страница в формате html для работы с in runtime (planer.html)
- Реализована Web-форма в которой пользователь может создать расписание на неделю









Вопросы:
- Нэйминг