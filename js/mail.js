"use strict";
import { translations } from "./translations.js";

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
// const partnersSwiper = new Swiper(".partners-swiper", {
// 	loop: true, // Бесконечная прокрутка
// 	spaceBetween: 150, // Расстояние между логотипами
// 	slidesPerView: "auto", // Автоматическая ширина (зависит от контента)
// 	speed: 9000, // Скорость движения (чем выше, тем медленнее)
// 	allowTouchMove: false, // Отключаем возможность перетаскивать пальцем (по желанию)

// 	autoplay: {
// 		delay: 0, // Задержка между переключениями (0 для плавной строки)
// 		disableOnInteraction: false, // Не останавливать после взаимодействия
// 		waitForTransition: false,
// 	},

// 	// Плавный переход, чтобы строка не «дергалась»
// 	// freeMode: {
// 	// 	enabled: true,
// 	// 	momentum: false, // 3. Отключаем инерцию, чтобы не было рывков
// 	// },
// 	grabCursor: false,
// });

document.querySelectorAll(".accordion__item").forEach((item) => {
	item.querySelector(".accordion__header").addEventListener("click", () => {
		const content = item.querySelector(".accordion__content");

		if (item.classList.contains("active-acordion")) {
			content.style.maxHeight = content.scrollHeight + "px";
			setTimeout(() => {
				content.style.maxHeight = "0px";
			}, 10);
			item.classList.remove("active-acordion");
		} else {
			document.querySelectorAll(".accordion__item").forEach((i) => {
				i.classList.remove("active-acordion");
				i.querySelector(".accordion__content").style.maxHeight = "0px";
			});

			item.classList.add("active-acordion");
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
});

const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			}
		});
	},
	{
		rootMargin: "0px 0px -150px 0px",
	},
);

document.querySelectorAll(".fade-in").forEach((el) => {
	observer.observe(el);
});

document.querySelectorAll(".fade-left").forEach((el) => {
	observer.observe(el);
});

document.querySelectorAll(".fade-right").forEach((el) => {
	observer.observe(el);
});

document.querySelectorAll(".fade-down").forEach((el) => {
	observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
	const popup = document.getElementById("popup");
	const popup2 = document.getElementById("popup2");
	const openButtons = Array.from(
		document.querySelectorAll(".open-button"),
	).filter((btn) => btn.textContent.trim() === "Залишити заявку");
	const openButtons2 = Array.from(
		document.querySelectorAll(".open-button2"),
	).filter((btn) => btn.textContent.trim() === "Залишити заявку");
	const closeButtons = document.querySelectorAll(".popup__close");
	const overlays = document.querySelectorAll(".popup__overlay");
	const infoButtons = document.querySelectorAll(".info-btn");

	openButtons.forEach((btn) => {
		btn.addEventListener("click", () => popup.classList.add("active"));
	});
	openButtons2.forEach((btn) => {
		btn.addEventListener("click", () => popup2.classList.add("active"));
	});

	closeButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			document
				.querySelectorAll(".popup")
				.forEach((p) => p.classList.remove("active"));
		});
	});

	overlays.forEach((overlay) => {
		overlay.addEventListener("click", () => {
			document
				.querySelectorAll(".popup")
				.forEach((p) => p.classList.remove("active"));
		});
	});

	infoButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const targetId = btn.dataset.target;
			document
				.querySelectorAll(".popup")
				.forEach((p) => p.classList.remove("active"));
			document.getElementById(targetId).classList.add("active");
		});
	});
});

const burger = document.querySelector(".site-header__burger");
const drawer = document.querySelector(".site-header__drawer");

if (burger && drawer) {
	burger.addEventListener("click", () => {
		burger.classList.toggle("active");
		drawer.classList.toggle("active");
	});

	drawer.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			burger.classList.remove("active");
			drawer.classList.remove("active");
		});
	});

	document.addEventListener("click", (e) => {
		if (!drawer.classList.contains("active")) return;

		if (!drawer.contains(e.target) && !burger.contains(e.target)) {
			burger.classList.remove("active");
			drawer.classList.remove("active");
		}
	});
}

document.querySelectorAll(".site-header__lang").forEach((group) => {
	group.querySelectorAll("button").forEach((btn) => {
		btn.addEventListener("click", () => {
			group
				.querySelectorAll("button")
				.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
		});
	});
});

const siteHeader = document.querySelector(".site-header");
const heroSection = document.querySelector(".section__main");
let scrollTicking = false;

function onScroll() {
	const y = window.scrollY;
	if (siteHeader) {
		siteHeader.classList.toggle("scrolled", y > 40);
	}
	if (heroSection) {
		heroSection.style.backgroundPositionY = `${y * 0.45}px`;
	}
	scrollTicking = false;
}

window.addEventListener(
	"scroll",
	() => {
		if (!scrollTicking) {
			requestAnimationFrame(onScroll);
			scrollTicking = true;
		}
	},
	{ passive: true },
);
onScroll();

document.querySelectorAll(".tabs__btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		const target = btn.dataset.tab;
		const scope = btn.closest(".tabs");

		scope
			.querySelectorAll(".tabs__btn")
			.forEach((b) => b.classList.remove("active"));
		scope
			.querySelectorAll(".tabs__panel")
			.forEach((p) => p.classList.remove("active"));

		btn.classList.add("active");
		scope
			.querySelector(`.tabs__panel[data-panel="${target}"]`)
			.classList.add("active");
	});
});

const langButtons = document.querySelectorAll(".site-header__lang button");

function changeLanguage(lang) {
	// 1. Обновляем текст на странице
	document.querySelectorAll("[data-key]").forEach((element) => {
		const keyPath = element.getAttribute("data-key");

		const translation = keyPath.split(".").reduce((obj, key) => {
			return obj ? obj[key] : null;
		}, translations[lang]);

		if (translation) {
			if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
				element.placeholder = translation;
			} else {
				// Для всех остальных (p, h2, span, a) — меняем текст внутри
				element.innerHTML = translation;
			}
		}
	});

	// 2. Обновляем визуальный активный класс у кнопок
	langButtons.forEach((btn) => {
		btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
	});

	// 3. Сохраняем выбор
	localStorage.setItem("preferredLang", lang);
}

// Вешаем событие клика на каждую кнопку
langButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		const selectedLang = btn.getAttribute("data-lang");
		changeLanguage(selectedLang);
	});
});

// При загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
	const savedLang = localStorage.getItem("preferredLang") || "ua"; // UA по умолчанию
	changeLanguage(savedLang);
});
