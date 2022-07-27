let scrollWidthMainContImg = (document.querySelector(".main__imgHouse").offsetWidth - document.querySelector("body").offsetWidth) / 2
document.querySelector(".main__contImg").scroll(scrollWidthMainContImg, 0)

window.addEventListener("load", function () {
	for (let i of document.querySelectorAll(".levelFlats__img")) {
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
	}
})

for (let elem of document.querySelectorAll(".levelFlats")) {
	const idx = Number(elem.getAttribute("idx"))
	const popupBlockArray = document.querySelectorAll(".comeAndLivePopup__block")
	elem.addEventListener("click", (e) => {
		for (let i of popupBlockArray) {
			i.style.display = "none";
		}
		popupBlockArray[idx].style.display = "flex";
		document.querySelector(".comeAndLivePopup").style.display = "flex";
		e.stopPropagation()
	})
}
document.querySelector(".comeAndLivePopup__miniContainer").addEventListener("click", (e) => {
	e.stopPropagation()
})
document.querySelector(".comeAndLivePopup__close").addEventListener("click", () => {
	document.querySelector(".comeAndLivePopup").style.display = "none";
})
document.querySelector("body").addEventListener("click", (e) => {
	document.querySelector(".comeAndLivePopup").style.display = "none";
})



for (i of document.querySelectorAll(".catalog__input")) {
	i.addEventListener("input", function () {
		if (this.getAttribute("name") == "phone") {
			if (this.value.length < 13) {
				this.value = this.value.replace(/[^\d\+]/g, '');
				if (this.value.length >= 1) {
					let numberArray = this.value.split('');
					if (this.value.length <= 11) {
						if (numberArray[0] != "+") {
							numberArray[0] = "+"
						}
						if (numberArray[1] != "7" && numberArray[1] != undefined) {
							numberArray[0] = "+7"
						}
					} else if (this.value.length == 12) {
						if (numberArray[0] != "+") {
							numberArray[0] = "+"
						}
						if (numberArray[1] != "7" && numberArray[1] != undefined) {
							numberArray[1] = "7"
						}
					}
					if (this.value.length > 1) {
						for (let i = 1; i < numberArray.length; i++) {
							if (numberArray[i] == "+") {
								numberArray.splice(i, 1)
							}
						}
					}
					this.value = numberArray.join('')
				}
				number = this.value
				return
			} else {
				this.value = number
			}
		}
	})
}