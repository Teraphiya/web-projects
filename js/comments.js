// ! перенос скрипта -->
var modal = document.getElementById('myModal')
var images = document.querySelectorAll('.photo-container img')
var modalImg = document.getElementById('modalImage')
var captionText = document.getElementById('caption')
for (let i = 0; i < images.length; i++) {
	/* Обработчик событий клик на фото*/
	images[i].onclick = function () {
		modal.style.display = 'block'
		modalImg.src = this.src
		captionText.innerHTML = this.alt
		currentImageIndex = i
	}
}
var span = document.getElementsByClassName('close')[0] /* 1 */
span.onclick = function () {
	modal.style.display = 'none'
}
var currentImageIndex
document.getElementById('nextButton').onclick = function () {
	if (currentImageIndex + 1 < images.length) {
		/* След есть */
		currentImageIndex++
		modalImg.src = images[currentImageIndex].src
		captionText.innerHTML = images[currentImageIndex].alt
	}
}
document.getElementById('prevButton').onclick = function () {
	if (currentImageIndex > 0) {
		/* Не 1, i -на 1*/
		currentImageIndex--
		modalImg.src = images[currentImageIndex].src
		captionText.innerHTML = images[currentImageIndex].alt
	}
}
// ! конец переноса скрипта


document.addEventListener('keydown', function (event) {
	if (modal.style.display === 'block') {
		// Проверяем, открыта ли модалка
		if (event.keyCode === 37) {
			// Стрелка влево
			if (currentImageIndex > 0) {
				currentImageIndex--
				modalImg.src = images[currentImageIndex].src
				captionText.innerHTML = images[currentImageIndex].alt
			}
		} else if (event.keyCode === 39) {
			// Стрелка вправо
			if (currentImageIndex + 1 < images.length) {
				currentImageIndex++
				modalImg.src = images[currentImageIndex].src
				captionText.innerHTML = images[currentImageIndex].alt
			}
		}
	}
})



// Для сохранения комментариев в лок хранилище
function saveComments(comments) {
	localStorage.setItem('comments', JSON.stringify(comments))
}
// Само получение сохраненных комментариев из лок хранилища
function getSavedComments() {
	const savedComments = localStorage.getItem('comments')
	return savedComments ? JSON.parse(savedComments) : []
}
// Функция для отображения комментария на странице
function displayComment(comment) {
	const commentDiv = document.createElement('div')
	commentDiv.className = 'comment'
	commentDiv.innerHTML = `<h4>${comment.name} (${comment.email})</h4><p>${comment.body}</p>`
	document.getElementById('commentsDisplay').appendChild(commentDiv)
}
// *TODO:6 дождаться события загрузки страницы и инициализировать обращение к поставщику данных используя Fetch API
// Основа выполняется при полной загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
	const newCommentForm = document.getElementById('newCommentForm')
	const preloader = document.getElementById('preloader')
	let isFirstLoad = true
	let comments = getSavedComments()
	// Отображение сохраненных комментариев
	comments.forEach(displayComment)
	// Форма которая на сайте
	newCommentForm.addEventListener('submit', function (event) {
		event.preventDefault()

		//Получаем данные
		const name = document.getElementById('commentName').value
		const email = document.getElementById('commentEmail').value
		const body = document.getElementById('commentBody').value

		// !ПРАВКА Проверяю, что все поля заполнены!
		if (!name || !email || !body) {
			Swal.fire({
				title: 'Ошибка!',
				text: 'Пожалуйста, заполните все поля.',
				icon: 'error',
				confirmButtonText: 'Сейчас сделаю',
			})
			return
		}

		// !Улучшение Проверяю конструкцию поля email
		if (!/\S+@\S+\.\S+/.test(email)) {
			// поcложнее: /^[^@\s]+@[^@\s]+\.[^@\s]+$/
			Swal.fire({
				title: 'Ошибка!',
				text: 'Некорректный формат email.',
				icon: 'error',
				confirmButtonText: 'Иду менять',
			})
			return
		}

		const newComment = {
			name,
			email,
			body,
		}

		// SeetAlert 7 ЛАБОРАТОРНАЯ
		Swal.fire({
			title: 'Комментарий отправлен!', // Заголовок
			icon: 'success', // Тип иконки - как успешное действие
			showConfirmButton: false, // Скрыть кнопку
			timer: 1500, // Время отображения модального окна (в мс)
		})
		comments.unshift(newComment)
		saveComments(comments)
		displayComment(newComment)
		// Чищу форму
		document.getElementById('commentName').value = ''
		document.getElementById('commentEmail').value = '' // Очищаем поле email
		document.getElementById('commentBody').value = ''
	})
	// ОСНОВНАЯ по условию - для получения комментариев с внешнего сервера
	function fetchComments() {
		preloader.style.display = 'block'
		let url = 'https://jsonplaceholder.typicode.com/comments'
		url += isFirstLoad ? '?id_gte=100' : '?id_lte=200' // *TODO: псевдо случайная фильтрация
		fetch(url) // *TODO:
			.then(response => response.json()) // *TODO: десериализую данные в JSON
			.then(fetchedComments => {
				preloader.style.display = 'none' // *TODO: скрываю
				fetchedComments.forEach(displayComment) // *TODO: отображаю
				isFirstLoad = false
			})
			.catch(error => {
				// *TODO: обр
				console.error('Fetching comments failed:', error)
				preloader.style.display = 'none'
				document.body.insertAdjacentHTML(
					'beforeend',
					'<p>⚠️ Что-то пошло не так</p>'
				)
			})
	}
	fetchComments()
})
