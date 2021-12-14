"use strict";

const burger = document.querySelector(".burger");
const burgerOpen = document.querySelector(".burger__button--open");
const burgerClose = document.querySelector(".burger__button--close");
const menuMobile = document.querySelector(".nav-mobile");
const menuLinks = document.querySelectorAll(".nav__link");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".footer__form");
const confirmation = document.querySelector(".footer__confirm");

const closeMobileMenu = () => {
  burgerOpen.classList.toggle("hidden");
  burgerClose.classList.toggle("hidden");
  menuMobile.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

burger.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMobileMenu;
  });
});

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   form.classList.toggle('hidden');
//   confirmation.classList.toggle('hidden');
// });
