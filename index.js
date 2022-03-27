const burger = document.querySelector(".hn-burger");
const mobileMenu = document.querySelector(".hn-list");
burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  burger.classList.toggle("close");
});

import IMask from "imask";
import JustValidate from "just-validate";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

if (document.documentElement.id === "pageMain") {
  const formPhone = document.querySelector("#formPhone");

  const maskedPhone = IMask(formPhone, {
    mask: "+{7}(000)000-00-00",
    lazy: false, // make placeholder always visible
    //placeholderChar: '#'     // defaults to '_'
  });

  maskedPhone.on("accept", () => {
    console.log("changed");
    console.log(maskedPhone.unmaskedValue);
  });

  const validate = new JustValidate("#cooperationForm");

  validate
    .addField("#cooperationFormName", [
      {
        rule: "required",
        errorMessage: "Name is required",
      },
    ])
    .addField("#cooperationFormMail", [
      {
        rule: "required",
        errorMessage: "Email is required",
      },
      {
        rule: "email",
        errorMessage: "Email is invalid!",
      },
    ])
    .addField("#formPhone", [
      {
        rule: "required",
        errorMessage: "Phone is required",
      },
      {
        rule: "function",
        validator: function () {
          return maskedPhone.unmaskedValue.length === 11;
        },
        errorMessage: "Phone is invalid",
      },
    ])
    .onSuccess(() => {
      console.log("good");
    })
    .onFail(() => {
      console.log("fail");
    });
}

if (document.documentElement.id === "pageFilter" || document.documentElement.id === "pageAN") {
  const swiperFilterThumbs = new Swiper(".sc-thumbs__slider", {
    direction: "vertical",
		slidesPerView: 3,
		spaceBetween: 20,
    loop: true,
		navigation: {
			nextEl: '.sc-thumbs-next',
			prevEl: '.sc-thumbs-prev',
		},
		freeMode: true,
    watchSlidesProgress: true,
  });

	const swiperFilterMain = new Swiper('.sc-main__slider', {
		//loop: true,
		thumbs: {
			swiper: swiperFilterThumbs,
		}
	})
}
