const levelFlatsInfo = {
	white_box: {
		img: "images/repeatImages/шьп.jpg",
		title: "White Box",
		text: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloribus ullam unde commodi reprehenderit suscipit nobis architecto quasi adipisci ducimus voluptas maxime neque, repellendus voluptatum eum, voluptates ea. Laboriosam, esse.",
			"2",
			"3"
		],
		price: "ОТ 3000 РУБ.ЗА КВ.М"
	},
	white_box2: {
		img: "images/repeatImages/шьп.jpg",
		title: "White Box2",
		text: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloribus ullam unde commodi reprehenderit suscipit nobis architecto quasi adipisci ducimus voluptas maxime neque, repellendus voluptatum eum, voluptates ea. Laboriosam, esse.",
			"2",
			"4"
		],
		price: "ОТ 3000 РУБ.ЗА КВ.М"
	},
	white_box3: {
		img: "images/repeatImages/шьп.jpg",
		title: "White Box3",
		text: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloribus ullam unde commodi reprehenderit suscipit nobis architecto quasi adipisci ducimus voluptas maxime neque, repellendus voluptatum eum, voluptates ea. Laboriosam, esse.",
			"2",
			"5"
		],
		price: "ОТ 3000 РУБ.ЗА КВ.М"
	},
}



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
const comeAndLivePopupChange = (value) => {
	// const textChange = e => document.querySelector(e).innerText;
	document.querySelector(".comeAndLivePopup__h2").innerText = levelFlatsInfo[value].title
	for (let i; i < document.querySelectorAll(".comeAndLivePopup__text").length; i++) {
		document.querySelectorAll(".comeAndLivePopup__text")[i].innerText = levelFlatsInfo[value].text[i];
	}
}
for (let elem of document.querySelectorAll(".levelFlats")) {
	elem.addEventListener("click", () => {
		// const attribute = elem.getAttribute("data_levelflats")
		// if (attribute) comeAndLivePopupChange(attribute);

		document.querySelector(".comeAndLivePopup").style.display = "flex";
	})
}
document.querySelector(".comeAndLivePopup__close").addEventListener("click", () => {
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