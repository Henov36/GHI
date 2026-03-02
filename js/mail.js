"use strick";

const swiper = new Swiper(".mySwiper", {
	slidesPerView: 2, // Показывать 2 слайда
	slidesPerGroup: 2,
	spaceBetween: 40, // Расстояние между ними (в пикселях)
	loop: true, // Бесконечная прокрутка
	autoplay: {
		delay: 2000, // Пауза между переключениями (в миллисекундах, 3000 = 3 сек)
		disableOnInteraction: false, // Продолжать крутить, даже если пользователь кликал на слайдер
		pauseOnMouseEnter: true, // Останавливать прокрутку при наведении мышки
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true, // Чтобы можно было кликать по точкам
	},
	// Добавим адаптивность: на мобилках 1 фото, на компах 2
	breakpoints: {
		320: { slidesPerView: 1, slidesPerGroup: 1 },
		768: { slidesPerView: 2, slidesPerGroup: 2 },
	},
});