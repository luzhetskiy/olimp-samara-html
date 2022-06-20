// for (let i of document.querySelectorAll(".galleryAlbum__contImg")) {
// 	i.addEventListener("click", () => {
// 	})
// }
// document.querySelector(".wrapper").addEventListener("click", function (e) {
// 	if (!e.path[1].classList.contains("galleryAlbum__contImg")) {
// 		for (let i of document.querySelectorAll(".galleryAlbum__contImg")) {
// 			i.style = ''
// 			i.querySelector(".galleryAlbum__textBackGroundImg").style.display = ""
// 		}
// 	} else {
// 		e.path[1].style.position = "fixed"
// 		e.path[1].style.width = "100vw"
// 		e.path[1].style.height = "100vh"
// 		e.path[1].style.zIndex = "12"
// 		e.path[1].style.left = "0"
// 		e.path[1].style.top = "0"
// 		e.path[1].style.backgroundColor = "rgb(0,0,0,0.35)"
// 		e.path[1].querySelector(".galleryAlbum__textBackGroundImg").style.display = "none"
// 	}
// })
// let i = 0;
// document.querySelector(".galleryAlbum__arrowBack").addEventListener("click", function () {
// 	i--
// 	document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${i * -33.333}%`

// });
// document.querySelector(".galleryAlbum__arrowNext").addEventListener("click", function () {
// 	i++
// 	for (let b = 0; b < 33; b++) {
// 		setTimeout(() => {
// 			document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${i * -b}%)`
// 		}, b * 15);
// 	}
// })
// Не забудь фрагментировать и тп.
const pointsIs = false;
let touch = 11111;
let newsSlidsQuantity = 0;
let newsSliderCounter = 0;
function sliderOpenFunc(i) {
	// newsSliderCounter = e.path[1].getAttribute("data_idx") - 1
	newsSliderCounter = i.getAttribute("data_idx") - 1
	// console.log(newsSliderCounter)
	galleryAlbumSliderPlusFunc()
	document.querySelector(".galleryAlbum__contSlider").style.display = "flex"
	return
}
function galleryAlbumSliderCloseFunc() {

	document.querySelector(".galleryAlbum__contSlider").style.display = "none"
}

document.addEventListener("DOMContentLoaded", function () {
	// document.getElementById("galleryAlbum__arrowNext")
	for (let i of document.querySelectorAll(".galleryAlbum__contImg")) {
		i.addEventListener("click", function () {
			sliderOpenFunc(i)
		})
	}
	doc_querySel(".galleryAlbum__closeSlider").addEventListener("click", function () {
		galleryAlbumSliderCloseFunc()
	})
	document.addEventListener("keydown", function (e) {
		if (e.code == "Escape") {
			galleryAlbumSliderCloseFunc()
		}
	})
	// document.querySelector(".wrapper").addEventListener("click", function (e) {
	// 	console.log(e.path)
	// if (e.path[1].classList.contains("galleryAlbum__contImg") || e.path[0].classList.contains("galleryAlbum__contImg") || e.path[0].classList.contains("galleryAlbum__textBackGroundImg") || e.path[0].classList.contains("galleryAlbum__img")) {
	// 	sliderOpenFunc()
	// }
	// if (e.path[0].classList.contains("galleryAlbum__contSlideImg")) {
	// 	galleryAlbumSliderCloseFunc()
	// }
	// })
	newsSlidsQuantity = document.querySelectorAll(".galleryAlbum__contImg").length;
	for (let i = 0; i < document.querySelectorAll(".galleryAlbum__contImg").length; i++) {
		document.querySelectorAll(".galleryAlbum__contImg")[i].setAttribute("data_idx", i)
	}

	let el = document.querySelector('.galleryAlbum__slider')
	// document.querySelector(".galleryAlbum__arrowBack").addEventListener("click", galleryAlbumSliderMinusFunc)
	// document.querySelector(".galleryAlbum__arrowBack").addEventListener("click", galleryAlbumSliderPlusFunc)
	el.addEventListener("touchstart", newsSliderFunc, false);
	el.addEventListener("touchend", newsSliderFunc, false);
	el.addEventListener("touchmove", newsSliderFunc, false);
	document.querySelector(".galleryAlbum__arrowNext").addEventListener("click", () => {
		// if (document.querySelector("body").clientWidth > 900) {
		galleryAlbumSliderPlusFunc()
		// }
	});
	document.querySelector(".galleryAlbum__arrowBack").addEventListener("click", () => {
		// if (document.querySelector("body").clientWidth > 900) {
		galleryAlbumSliderMinusFunc()
		// }
	});
	document.addEventListener("keydown", (e) => {
		if (document.querySelector("body").clientWidth > 900) {
			if (e.code == "ArrowRight") {
				galleryAlbumSliderPlusFunc()
				return
			}
			if (e.code == "ArrowLeft") {
				galleryAlbumSliderMinusFunc()
			}
		}
	})
	document.querySelector(".galleryAlbum__slider").insertAdjacentHTML("afterbegin", `
			<style>
			.galleryAlbum__sliderCont {
				width: calc(100% * ${newsSlidsQuantity});
			}
			.galleryAlbum__contSlideImg {
				width: calc(100% / ${newsSlidsQuantity});
			}
			@media (max-width: 750px){
				.galleryAlbum__sliderCont{
					width: calc(100% * ${newsSlidsQuantity})
				}
				.galleryAlbum__contSlideImg{
					width: calc(100% / ${newsSlidsQuantity})
				}
			}
			</style>
		`);
	if (pointsIs) {
		for (let i = 0; i < newsSlidsQuantity; i++) {
			document.querySelector(".galleryAlbum__points").insertAdjacentHTML("afterbegin", `
			<div class="galleryAlbum__point"></div>
		`)
		}
		document.querySelectorAll(".galleryAlbum__point")[0].style.backgroundColor = "#337c7e"
	}
	document.querySelector(".galleryAlbum__sliderBackgroundClickForClose").addEventListener("click", function () {
		galleryAlbumSliderCloseFunc()
	})
});
window.addEventListener("load", function () {
	for (let i of document.querySelectorAll(".galleryAlbum__img")) {
		// console.log(i.naturalHeight)
		// console.log(i.naturalWidth)
		let b = i.naturalHeight - i.naturalWidth
		let width = 0;
		let height = 0;
		if (b < 0) {
			width = i.naturalWidth / i.naturalHeight * 100;
			height = 100
		} else if (b > 0) {
			height = i.naturalHeight / i.naturalWidth * 100;
			width = 100
		} else if (b == 0) {
			width = 100
			height = 100
		}
		i.style.width = `${width}%`
		i.style.height = `${height}%`
		document.querySelector(".galleryAlbum__sliderCont").insertAdjacentHTML("beforeend", `
			<div class="galleryAlbum__contSlideImg">
				<img src="${i.getAttribute("src")}" alt="" class="galleryAlbum__slideImg">
			</div>
			`)
	}
})
let newsSliderTouchIsNew = 0;
let newsSliderTouchMove = 0;
function newsSliderFunc(e) {
	if (document.querySelector("body").clientWidth < 900) {
		if (e.type != "touchend" && e.type != "touchstart") {
			if (newsSliderTouchMove == 0) {
				newsSliderTouchMove = e.changedTouches[0].clientX;
				return
			}
			document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(calc(${(-100 / newsSlidsQuantity) * newsSliderCounter}% - ${newsSliderTouchMove - e.changedTouches[0].clientX}px))`;
			// console.log("return 'No end or start'")
			return
		}
		newsSliderTouchMove = 0
		if (touch == 11111) {
			touch = e.changedTouches[0].clientX;
			// console.log("touch == 11111")
		}
		// console.log(e.changedTouches[0].clientX)
		if (touch == e.changedTouches[0].clientX) {
			// console.log("return")
			newsSliderTouchIsNew++;
			if (newsSliderTouchIsNew == 2) {
				// console.log("reset")
				// console.log(e.target.getAttribute("class"))
				// e.target.getAttribute("class").includes("galleryAlbum__arrowNext") ? galleryAlbumSliderPlusFunc() : ""
				// e.target.getAttribute("class").includes("galleryAlbum__arrowBack") ? galleryAlbumSliderMinusFunc() : ""
				touch = 11111
				newsSliderTouchIsNew = 0;
			}
			return
		}
		if ((touch - e.changedTouches[0].clientX) > 0) {
			galleryAlbumSliderPlusFunc()
		} else {
			galleryAlbumSliderMinusFunc()
		}
		// galleryAlbumSliderPointsFunc()
		touch = 11111
		newsSliderTouchIsNew = 0;
	}
}
function galleryAlbumSliderPlusFunc() {
	// console.log("++")
	newsSliderCounter++;
	document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * newsSliderCounter}%)`;
	// let i = (-100 / newsSlidsQuantity) * newsSliderCounter;
	// let w = document.querySelector("body").clientWidth;
	// let c = i / w;
	// for (let b = 0; b < w; b++) {
	// 	setTimeout(() => {
	// document.querySelector(".news__sliderCont").style.transform = `translateX(${b * c}%)`;
	// 	}, 1 * b);
	// }
	galleryAlbumSliderZeroingOut()
}
function galleryAlbumSliderMinusFunc() {
	// console.log("--")
	newsSliderCounter--
	if (newsSliderCounter != -1) {
		document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * newsSliderCounter}%)`;
	} else {
		document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * (newsSlidsQuantity - 1)}%)`;
		newsSliderCounter = newsSlidsQuantity - 1;
	}
	galleryAlbumSliderZeroingOut()
}
function galleryAlbumSliderZeroingOut() {
	if (newsSliderCounter == newsSlidsQuantity) {
		newsSliderCounter = 0;
		document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(0)`;
	}
	galleryAlbumSliderPointsFunc()
}
function galleryAlbumSliderPointsFunc() {
	if (pointsIs) {
		for (i of document.querySelectorAll(".galleryAlbum__point")) {
			i.style.backgroundColor = "#c4c4c4"
		}
		document.querySelectorAll(".galleryAlbum__point")[newsSliderCounter].style.backgroundColor = "#337c7e"
	}
}