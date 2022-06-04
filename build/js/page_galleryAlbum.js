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
let touch = 11111;
let newsSlidsQuantity = 0;
let newsSliderCounter = 0;
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("galleryAlbum__arrowNext")
	document.querySelector(".wrapper").addEventListener("click", function (e) {
		console.log(e)
		if (e.path[1].classList.contains("galleryAlbum__contImg")) {
			newsSliderCounter = e.path[1].getAttribute("data_idx") - 1
			console.log(newsSliderCounter)
			galleryAlbumSliderPlusFunc()
			document.querySelector(".galleryAlbum__contSlider").style.display = "flex"
			return
		}
		if (e.path[0].classList.contains("galleryAlbum__contSlider")) {
			document.querySelector(".galleryAlbum__contSlider").style.display = "none"
		}
	})
	newsSlidsQuantity = document.querySelectorAll(".galleryAlbum__contImg").length;
	for (let i = 0; i < document.querySelectorAll(".galleryAlbum__contImg").length; i++) {
		document.querySelectorAll(".galleryAlbum__contImg")[i].setAttribute("data_idx", i)
	}
	for (let i of document.querySelectorAll(".galleryAlbum__img")) {
		console.log(i)
		document.querySelector(".galleryAlbum__sliderCont").insertAdjacentHTML("afterbegin", `
		<img src="${i.getAttribute("src")}" alt="" class="galleryAlbum__slideImg">
		`)
	}
	let el = document.querySelector('.galleryAlbum__slider')
	// document.querySelector(".galleryAlbum__arrowBack").addEventListener("click", galleryAlbumSliderMinusFunc)
	// document.querySelector(".galleryAlbum__arrowBack").addEventListener("click", galleryAlbumSliderPlusFunc)
	el.addEventListener("touchstart", newsSliderFunc, false);
	el.addEventListener("touchend", newsSliderFunc, false);
	el.addEventListener("touchmove", newsSliderFunc, false);
	document.getElementById("galleryAlbum__arrowNext").addEventListener("click", () => {
		if (document.querySelector("body").clientWidth > 900) {
			galleryAlbumSliderPlusFunc()
		}
	});
	document.getElementById("galleryAlbum__arrowBack").addEventListener("click", () => {
		if (document.querySelector("body").clientWidth > 900) {
			galleryAlbumSliderMinusFunc()
		}
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
			.galleryAlbum__slideImg {
				width: calc(100% / ${newsSlidsQuantity});
			}
			@media (max-width: 750px){
				.galleryAlbum__sliderCont{
					width: calc(100% * ${newsSlidsQuantity})
				}
				.galleryAlbum__slideImg{
					width: calc(100% / ${newsSlidsQuantity})
				}
			}
			</style>
		`);
	for (let i = 0; i < newsSlidsQuantity; i++) {
		document.querySelector(".galleryAlbum__points").insertAdjacentHTML("afterbegin", `
			<div class="galleryAlbum__point"></div>
		`)
	}
	document.querySelectorAll(".galleryAlbum__point")[0].style.backgroundColor = "#337c7e"

});

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
				console.log()
				e.target.getAttribute("id") == "galleryAlbum__arrowNext" ? galleryAlbumSliderPlusFunc() : ""
				e.target.getAttribute("id") == "galleryAlbum__arrowBack" ? galleryAlbumSliderMinusFunc() : ""
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
		galleryAlbumSliderPointsFunc()
		touch = 11111
		newsSliderTouchIsNew = 0;
	}
}
function galleryAlbumSliderPlusFunc() {
	console.log("++")
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
	galleryAlbumSliderPointsFunc()
}
function galleryAlbumSliderMinusFunc() {
	console.log("--")
	newsSliderCounter--
	if (newsSliderCounter != -1) {
		document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * newsSliderCounter}%)`;
	} else {
		document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(${(-100 / newsSlidsQuantity) * (newsSlidsQuantity)}%)`;
		newsSliderCounter = newsSlidsQuantity - 1;
	}
	galleryAlbumSliderPointsFunc()
}
function galleryAlbumSliderPointsFunc() {
	if (newsSliderCounter == newsSlidsQuantity) {
		newsSliderCounter = 0;
		document.querySelector(".galleryAlbum__sliderCont").style.transform = `translateX(0)`;
	}
	for (i of document.querySelectorAll(".galleryAlbum__point")) {
		i.style.backgroundColor = "#c4c4c4"
	}
	document.querySelectorAll(".galleryAlbum__point")[newsSliderCounter].style.backgroundColor = "#337c7e"
}