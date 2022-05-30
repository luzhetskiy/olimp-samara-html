// for (let i of document.querySelectorAll(".galleryAlbum__contImg")) {
// 	i.addEventListener("click", () => {

// 	})
// }
document.querySelector(".wrapper").addEventListener("click", function (e) {
	if (!e.path[1].classList.contains("galleryAlbum__contImg")) {
		for (let i of document.querySelectorAll(".galleryAlbum__contImg")) {
			i.style = ''
			i.querySelector(".galleryAlbum__textBackGroundImg").style.display = ""
		}
	} else {
		e.path[1].style.position = "fixed"
		e.path[1].style.width = "100vw"
		e.path[1].style.height = "100vh"
		e.path[1].style.zIndex = "12"
		e.path[1].style.left = "0"
		e.path[1].style.top = "0"
		e.path[1].style.backgroundColor = "rgb(0,0,0,0.35)"
		e.path[1].querySelector(".galleryAlbum__textBackGroundImg").style.display = "none"
	}
})