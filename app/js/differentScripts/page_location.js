//-------------
document.addEventListener("DOMContentLoaded", function () {
	let layoutImgScrollWidth = (document.querySelector(".layout__img").offsetWidth - document.querySelector("body").offsetWidth) / 2;
	document.querySelector(".layout__imgCont").scroll(layoutImgScrollWidth, 0)
})