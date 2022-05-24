//---------------
// Переменные определяющие время анимаций
// бургера и формы.
const headerNavAnimTime = 0.9;
const orderCallFormTime = 0.9;
//----------------
// Переменные не дающие возможность нажать более одного раза
// на кнопки запускающие анимации, чтобы анимации правильно
// отработали.
let headerNavAnimTimeOut = true;
let orderCallFormTimeOut = true;
//----------------
// Тут пока что без комментариев...
let orderCallQuantity = document.querySelectorAll(".orderCall_js");
const headerNav = document.querySelector(".header__nav")
const orderCallForm = document.querySelector(".orderCallForm");
let orderCallDataSubmited = false;
const orderCallFormMiniConts = document.querySelectorAll(".orderCallForm__miniCont");

//----------------
// Очевидное, прослушка бургера.
document.querySelector(".burger").addEventListener("click", function () {
	//-------------
	// Проверяет закончилась ли анимация.
	if (headerNavAnimTimeOut) {
		//--------------
		// Запускает анимацию.
		headerNav.style.display = "flex"
		headerNav.style.animation = `${headerNavAnimTime}s headerNavAnimOpen`
		//--------------
		// Забирает возможность запустить анимацию.
		headerNavAnimTimeOut = false
		//--------------
		// После окончания анимации возращает
		// возможность запустить анимацию. 
		setTimeout(() => {
			headerNavAnimTimeOut = true
		}, headerNavAnimTime * 1000 - 50);
	}
})
//---------------
// Прослушка закрывающей кнопки внутри header__nav
// на мобилке.
document.querySelector(".btnClose_headerNav").addEventListener("click", function () {
	//-------------
	// Проверяет закончилась ли анимация.
	if (headerNavAnimTimeOut) {
		//--------------
		// Запускает анимацию.
		headerNav.style.animation = `${headerNavAnimTime}s headerNavAnimClose`
		//--------------
		// Забирает возможность запустить анимацию.
		headerNavAnimTimeOut = false
		//--------------
		// После окончания анимации даёт display:none header__nav(у),
		// возращает возможность запустить анимацию. 
		setTimeout(() => {
			headerNav.style.display = "none";
			headerNavAnimTimeOut = true
		}, headerNavAnimTime * 1000 - 50)
	}
})
//-------------
// Прослушка кнопки закрывающей форму.
document.querySelector(".btnClose_orderCallform").addEventListener("click", function () {
	//----------
	// Вызывает функцию(смотрите у функции, что она делает)
	orderCallFormCloseFunc()
})
//-----------
// Цикл устанавливающий слушатель собтиый click
// на каждую кнопку открывающюю форму.
for (i of orderCallQuantity) {
	i.addEventListener("click", function () {
		orderCallFormOpenFunc()
	})
}
//-----------
// Цикл устанавливающий слушатель собтиый click
// на каждую кнопку закрывающюю форму.
for (i of document.querySelectorAll(".orderCallForm__btnClose")) {
	i.addEventListener("click", function () {
		orderCallFormCloseFunc()
	})
}
//--------------
// Функция открывающая форму
function orderCallFormOpenFunc() {
	//-------------
	// Проверяет закончилась ли анимация.
	if (orderCallFormTimeOut) {
		//--------------
		// Забирает возможность запустить анимацию.
		orderCallFormTimeOut = false
		//--------------
		// Сама анимация
		orderCallForm.style.display = "flex"
		orderCallForm.style.animation = `${orderCallFormTime}s orderCallFormOpen`
		// После окончания анимации возращает
		// возможность запустить анимацию. 
		setTimeout(() => {
			orderCallFormTimeOut = true
		}, orderCallFormTime * 1000 - 50);
	}
}
//--------------
// Функция закрывающая форму.
function orderCallFormCloseFunc() {
	if (orderCallFormTimeOut) {
		orderCallFormTimeOut = false
		orderCallForm.style.animation = `${orderCallFormTime}s orderCallFormClose`
		setTimeout(() => {
			orderCallFormTimeOut = true
			orderCallForm.style.display = "none"
			//----------
			// Если данные ещё не отправлены,
			// но была неудачная попытка, то при закрытии формы,
			// форма восстанавливается в изначальное состояние
			// без очистки инпутов.
			if (!orderCallDataSubmited) {
				orderCallFormMiniConts[0].style.display = 'flex'
				orderCallFormMiniConts[1].style.display = 'none'
				orderCallFormMiniConts[2].style.display = 'none'
			}
		}, orderCallFormTime * 1000 - 50);
	}
}
// document.querySelector(".formQuestion__submit").addEventListener("click", function () {

// })

// let numberLength = 0;
let number;
//-------------
// Цикл ставящий просушиватель собтиый input,
// на каждый input. Можно было бы поставить,
// только на input(ы) где надо вводить телефоны,
// но я решил сделать так, вдруг решат сделать проверку 
// и других input(ов).
for (i of document.querySelectorAll(".labelInput__input")) {
	i.addEventListener("input", function () {
		// if (this.getAttribute("type") == "text") {

		// 	return
		// }
		//-------------
		// Если атрибут name у input равен telephone.
		// Тут this равен input(у).
		if (this.getAttribute("name") == "telephone") {
			if (this.value.length < 13) {
				// this.value = this.value.replace(/[^\0-9\+]/g, '');
				// this.value = this.value.replace(/\.|[^\0-9\+]/g, '');
				// this.value = this.value.replace(/\.|[^\0 - 9\+]/g, '');
				this.value = this.value.replace(/[^\d\+]/g, '');
				//==================
				// Позже допишу комменты !
				if (this.value.length >= 1) {
					// if (this.value.length == 1) {
					// 	this.value != "7" || this.value != "+7" || this.value != "+ 7" ? this.value = "+7" : ''
					// }
					let numberArray = this.value.split('');
					// if (numberArray[0] != "+" && numberArray[1] != "7") {
					// 	numberArray[0] = "+";
					// 	numberArray[1] = "7";
					// }
					// if (numberArray[0] != "+") {
					// 	numberArray[0] = "+7";
					// }
					// if (numberArray[0] == "7" || numberArray[0] == "8") {
					// 	numberArray[0] = "+7"
					// } else if (numberArray[0] != "+") {
					// 	numberArray[0] = "+7"
					// }
					// if (this.value.length > 2) {
					// if (numberArray[0] != "+") {
					// 	numberArray[0] = "+"
					// }
					// if (numberArray[1] != "7" && numberArray[1] != undefined) {
					// 	numberArray[0] = "+7"
					// }
					// } else {
					// 	if (numberArray[0] != "+") {
					// 		numberArray[0] = "+"
					// 	}

					// 	if (numberArray[1] != "7" && numberArray[1] != undefined) {
					// 		numberArray[0] = "+7"
					// 	}
					// }
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
				// numberLength = this.value.length;
				number = this.value
				return
			} else {
				this.value = number
			}
		}
	})
}

document.querySelector(".orderCallForm__submit").addEventListener("click", function () {
	orderCallFormFunc(0)
})
document.querySelector(".formQuestion__submit").addEventListener("click", function () {
	if (!orderCallDataSubmited) {
		orderCallFormFunc(1)
	} else {
		orderCallFormOpenFunc()
	}
})
function orderCallFormFunc(a) {
	let inputCheck = 0;
	let l = [".labelInput__input_orderCallForm", ".labelInput_valueFormQuestion"]
	for (i of document.querySelectorAll(l[a])) {
		// i.value != '' ? i.style.border = "solid 2px #53ba14" : i.style.border = "solid 2px red";
		// i.getAttribute("name") == "telephone" ? i.value.length == 12 ? i.style.border = "solid 2px #53ba14" : i.style.border = "solid 2px red" : ''
		if (i.value != '') {
			i.style.border = "solid 2px #53ba14"
			i.style.color = "#333"
			i.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
		} else {
			i.style.border = "solid 2px red";
			i.style.color = "#333"
			i.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
			inputCheck++
		}
		if (i.getAttribute("name") == "telephone") {
			if (i.value.length == 12) {
				i.style.border = "solid 2px #53ba14"
				i.style.color = "#333"
				i.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
				document.querySelectorAll(".labelInput__invalidFormat")[a].style.display = "none"
			} else {
				i.style.border = "solid 2px red"
				i.style.color = "red"
				i.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
				inputCheck++
				document.querySelectorAll(".labelInput__invalidFormat")[a].style.display = "flex"
			}
		}
	}
	if (inputCheck != 0) {
		return
	}
	let p = new Promise((res, rej) => {
		setTimeout(() => {
			Math.random() > 0.5 ? res() : rej();
		}, 200)
	})
	p.then(res => {
		orderCallDataSubmited = true
		console.log("axios.post()")
		document.querySelectorAll(".orderCallForm__miniCont")[0].style.display = 'none'
		document.querySelectorAll(".orderCallForm__miniCont")[1].style.display = 'flex'
		orderCallFormOpenFunc()
		setTimeout(() => {
			labelInputResetFunc(l[0])
			labelInputResetFunc(l[1])
		}, 500);
		for (i of orderCallQuantity) {
			i.style.opacity = '0.5'
		}
		document.querySelector(".formQuestion__submit").style.opacity = '0.5'
	}, rej => {
		console.error("error:axios.post()")
		document.querySelectorAll(".orderCallForm__miniCont")[0].style.display = 'none'
		document.querySelectorAll(".orderCallForm__miniCont")[2].style.display = 'flex'
		orderCallFormOpenFunc()
	})
}
function labelInputResetFunc(a) {
	for (i of document.querySelectorAll(a)) {
		i.value = ''
		i.style.border = 'solid 1px rgba(255, 255, 255, 0.2)'
		i.style.backgroundColor = "transparent"
	}
}
