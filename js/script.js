;(function () {
	'use strict'
	window.onload = function () {
		setTimeout(function () {
			let perfEntries = performance.getEntriesByType('navigation')
			if (perfEntries.length > 0) {
				let p = perfEntries[0]
				let loadTime = p.loadEventEnd - p.startTime
				let footer = document.querySelector('footer')
				if (footer) {
					footer.innerHTML += `<p>Полное время загрузки: ${loadTime}ms</p>`
				}
			}
		}, 0) // Задержка в 0 мс гарантирует
	}
	// Подсветка ИМЕННО активного пункта меню
	let currentPage = document.location.pathname.split('/').pop()
	let navLinks = document.querySelectorAll('nav ul li a')
	navLinks.forEach(link => {
		let linkPage = link.getAttribute('href')
		if (linkPage === currentPage) {
			link.classList.add('active') /* Если совпадает */
		}
	})
})()

const btn = document.getElementById('back-to-top')
window.addEventListener('scroll', () => {
	if (window.pageYOffset > 300) {
		btn.style.display = 'block' // ВЫводит кнопку, если прокрутка больше 300px
	} else {
		btn.style.display = 'none' // Скрывать кнопку
	}
})
btn.addEventListener('click', e => {
	e.preventDefault()
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	}) // Плавное перемещение в начало страницы
})
