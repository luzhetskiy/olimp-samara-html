//-----------------------------------------------------------------------------------------
// Не забудь фрагментировать и тп.
let touch = 11111;
let newsSlidsQuantity = 0;
let newsSliderCounter = 0;
document.addEventListener("DOMContentLoaded", function () {

	newsSlidsQuantity = document.querySelectorAll(".news__slide").length;
	console.log(newsSlidsQuantity)
	let el = document.querySelector('.news__slider')
	el.addEventListener("touchstart", newsSliderFunc, false);
	el.addEventListener("touchend", newsSliderFunc, false);
	el.addEventListener("touchmove", newsSliderFunc, false);
	// el.addEventListener("touchcancel", handleCancel, false);
	// el.addEventListener("touchmove", handleMove, false);
	document.querySelector(".news__slider").insertAdjacentHTML("afterbegin", `
			<style>
			@media (max-width: 750px){
				.news__sliderCont{
					width: calc(100% * ${newsSlidsQuantity})
				}
				.news__slide{
					width: calc(100% / ${newsSlidsQuantity})
				}
			}
			</style>
		`);
	for (let i = 0; i < newsSlidsQuantity; i++) {
		document.querySelector(".news__points").insertAdjacentHTML("afterbegin", `
			<div class="news__point"></div>
		`)
	}
	document.querySelectorAll(".news__point")[0].style.backgroundColor = "#337c7e"
	//-------------

	let layoutImgScrollWidth = (document.querySelector(".layout__img").offsetWidth - document.querySelector("body").offsetWidth) / 2;
	document.querySelector(".layout__imgCont").scroll(layoutImgScrollWidth, 0)
	// let locationMapScrollWidth = (document.querySelector(".location__img").offsetWidth - document.querySelector("body").offsetWidth) / 2;
	// document.querySelector(".location__mapCont").scroll(locationMapScrollWidth, 0)
});
let newsSliderTouchIsNew = 0;
let newsSliderTouchMove = 0;
// let newsSliderTouchStart = 0;
function newsSliderFunc(e) {
	if (document.querySelector("body").clientWidth < 750) {
		if (e.type != "touchend" && e.type != "touchstart") {
			if (newsSliderTouchMove == 0) {
				newsSliderTouchMove = e.changedTouches[0].clientX;
				return
			}
			document.querySelector(".news__sliderCont").style.transform = `translateX(calc(${(-100 / newsSlidsQuantity) * newsSliderCounter}% - ${newsSliderTouchMove - e.changedTouches[0].clientX}px))`;
			console.log("return 'No end or start'")
			return
		}
		newsSliderTouchMove = 0
		if (touch == 11111) {
			touch = e.changedTouches[0].clientX;
			console.log("touch == 11111")
		}
		console.log(e.changedTouches[0].clientX)
		if (touch == e.changedTouches[0].clientX) {
			console.log("return")
			newsSliderTouchIsNew++;
			if (newsSliderTouchIsNew == 2) {
				console.log("reset")
				touch = 11111
				newsSliderTouchIsNew = 0;
			}
			return
		}
		if ((touch - e.changedTouches[0].clientX) > 0) {
			console.log("++")
			newsSliderCounter++;
			document.querySelector(".news__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * newsSliderCounter}%)`;
			// let i = (-100 / newsSlidsQuantity) * newsSliderCounter;
			// let w = document.querySelector("body").clientWidth;
			// let c = i / w;
			// for (let b = 0; b < w; b++) {
			// 	setTimeout(() => {
			// document.querySelector(".news__sliderCont").style.transform = `translateX(${b * c}%)`;
			// 	}, 1 * b);
			// }
		} else {
			console.log("--")
			newsSliderCounter--
			if (newsSliderCounter != -1) {
				document.querySelector(".news__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * newsSliderCounter}%)`;
			} else {
				document.querySelector(".news__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * (newsSlidsQuantity - 1)}%)`;
				newsSliderCounter = newsSlidsQuantity - 1;
			}
		}
		if (newsSliderCounter == newsSlidsQuantity) {
			newsSliderCounter = 0;
			document.querySelector(".news__sliderCont").style.transform = `translateX(0)`;
		}
		for (i of document.querySelectorAll(".news__point")) {
			i.style.backgroundColor = "#c4c4c4"
		}
		document.querySelectorAll(".news__point")[newsSliderCounter].style.backgroundColor = "#337c7e"
		touch = 11111
		newsSliderTouchIsNew = 0;
	}
}


sel_addEventListener(
	".orderCall_main_js",
	function () {
		// console.log(this)
		orderCallFormOpenFunc(2)
	}
)
//-----------------------------------------------------------------------------------------