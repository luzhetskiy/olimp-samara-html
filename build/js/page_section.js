document.querySelector(".explanationBlock").addEventListener("click", () => {
	if (document.querySelector("body").offsetWidth < 600) {
		if (document.querySelector(".explanationBlock__arrow").style.transform != "rotate(180deg)") {
			document.querySelector(".filter").style.display = "block"
			document.querySelector(".explanationBlock__arrow").style.transform = "rotate(180deg)"
			return
		}
		document.querySelector(".filter").style.display = "none"
		document.querySelector(".explanationBlock__arrow").style.transform = "rotate(0deg)"
	}
})