const orderCallFormVariables = [
  {
    number: 0,
    text: "Заявка по квартире: двухкомнатная, № 132* ",
    form: "1",
    wasSubmited: false,
    open: false,
  },
  {
    number: 1,
    text: "Паркинг",
    form: "2",
    wasSubmited: false,
    open: false,
  },
  {
    number: 2,
    text: "Квартиры",
    form: "3",
    wasSubmited: false,
    open: false,
  },
  {
    number: 3,
    text: "flat",
    form: "4",
    wasSubmited: false,
    open: false,
  },
];

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
const headerNav = document.querySelector(".header__nav");
const orderCallForm = document.querySelector(".orderCallForm");
let orderCallDataSubmited = false;
const orderCallFormMiniConts = document.querySelectorAll(
  ".orderCallForm__miniCont",
);

//----------------
// Очевидное, прослушка бургера.
document.querySelector(".burger").addEventListener("click", function () {
  //-------------
  // Проверяет закончилась ли анимация.
  if (headerNavAnimTimeOut) {
    //--------------
    // Запускает анимацию.
    headerNav.style.display = "flex";
    headerNav.style.animation = `${headerNavAnimTime}s headerNavAnimOpen`;
    //--------------
    // Забирает возможность запустить анимацию.
    headerNavAnimTimeOut = false;
    //--------------
    // После окончания анимации возращает
    // возможность запустить анимацию.
    setTimeout(
      () => {
        headerNavAnimTimeOut = true;
      },
      headerNavAnimTime * 1000 - 50,
    );
  }
});
//---------------
// Прослушка закрывающей кнопки внутри header__nav
// на мобилке.
document
  .querySelector(".btnClose_headerNav")
  .addEventListener("click", function () {
    //-------------
    // Проверяет закончилась ли анимация.
    if (headerNavAnimTimeOut) {
      //--------------
      // Запускает анимацию.
      headerNav.style.animation = `${headerNavAnimTime}s headerNavAnimClose`;
      //--------------
      // Забирает возможность запустить анимацию.
      headerNavAnimTimeOut = false;
      //--------------
      // После окончания анимации даёт display:none header__nav(у),
      // возращает возможность запустить анимацию.
      setTimeout(
        () => {
          headerNav.style.display = "none";
          headerNavAnimTimeOut = true;
        },
        headerNavAnimTime * 1000 - 50,
      );
    }
  });

//-------------
// Прослушка кнопки закрывающей форму.
document
  .querySelector(".btnClose_orderCallform")
  .addEventListener("click", function () {
    //----------
    // Вызывает функцию(смотрите у функции, что она делает)
    orderCallFormCloseFunc();
  });
//-----------
// Цикл устанавливающий слушатель собтиый click
// на каждую кнопку открывающюю форму.
for (i of orderCallQuantity) {
  i.addEventListener("click", function () {
    orderCallFormOpenFunc(0);
  });
}
//-----------
// Цикл устанавливающий слушатель собтиый click
// на каждую кнопку закрывающюю форму.
for (i of document.querySelectorAll(".orderCallForm__btnClose")) {
  i.addEventListener("click", function () {
    orderCallFormCloseFunc();
  });
}
//--------------
// Функция открывающая форму
function orderCallFormOpenFunc(a) {
  if (a == "formQuestion submited = true") {
    console.log("formQuestion submited = true");
    orderCallFormIsSubmited();
  } else if (a != null || a != undefined) {
    // if (a == 1) {
    console.log(" orderCallFormOpenFunc one step");
    document.querySelector(".orderCallForm__h3").innerText =
      orderCallFormVariables[a].text;
    console.log(orderCallFormVariables[a].text);
    orderCallFormVariables[a].open = true;
    // }
    if (orderCallFormVariables[a].wasSubmited) {
      console.log(" orderCallFormOpenFunc two step true");
      orderCallFormIsSubmited();
    } else {
      console.log(" orderCallFormOpenFunc two step false");
      orderCallFormIsSubmited(false);
    }
  }
  //-------------
  // Проверяет закончилась ли анимация.
  if (orderCallFormTimeOut) {
    //--------------
    // Забирает возможность запустить анимацию.
    orderCallFormTimeOut = false;
    //--------------
    // Сама анимация
    orderCallForm.style.display = "flex";
    orderCallForm.style.animation = `${orderCallFormTime}s orderCallFormOpen`;
    // После окончания анимации возращает
    // возможность запустить анимацию.
    setTimeout(
      () => {
        orderCallFormTimeOut = true;
      },
      orderCallFormTime * 1000 - 50,
    );
  }
}
//--------------
// Функция закрывающая форму.
function orderCallFormCloseFunc() {
  if (orderCallFormTimeOut) {
    orderCallFormTimeOut = false;
    orderCallForm.style.animation = `${orderCallFormTime}s orderCallFormClose`;
    setTimeout(
      () => {
        orderCallFormTimeOut = true;
        orderCallForm.style.display = "none";
        //----------
        // Если данные ещё не отправлены,
        // но была неудачная попытка, то при закрытии формы,
        // форма восстанавливается в изначальное состояние
        // без очистки инпутов.
        if (!orderCallDataSubmited) {
          orderCallFormMiniConts[0].style.display = "flex";
          orderCallFormMiniConts[1].style.display = "none";
          orderCallFormMiniConts[2].style.display = "none";
        }
      },
      orderCallFormTime * 1000 - 50,
    );
    for (let i of orderCallFormVariables) {
      i.open = false;
    }
  }
}
// document.querySelector(".formQuestion__submit").addEventListener("click", function () {

// })

// function OrderCallFormChangedFunc(params) {
// 	doc_querySel(".orderCallForm__h3").innerText = params.text
// }

//-------------
// Цикл ставящий просушиватель собтиый input,
// на каждый input. Можно было бы поставить,
// только на input(ы) где надо вводить телефоны,
// но я решил сделать так, вдруг решат сделать проверку
// и других input(ов).
for (i of document.querySelectorAll("input[name='phone']")) {
  let lastValue = "";

  i.addEventListener("input", function () {
    // if (this.getAttribute("type") == "text") {

    // 	return
    // }
    //-------------
    // Если атрибут name у input равен telephone.
    // Тут this равен input(у).
    if (this.getAttribute("name") == "phone") {
      if (this.value.length < 13) {
        // this.value = this.value.replace(/[^\0-9\+]/g, '');
        // this.value = this.value.replace(/\.|[^\0-9\+]/g, '');
        // this.value = this.value.replace(/\.|[^\0 - 9\+]/g, '');
        this.value = this.value.replace(/[^\d\+]/g, "");
        //==================
        // Позже допишу комменты !
        if (this.value.length >= 1) {
          // if (this.value.length == 1) {
          // 	this.value != "7" || this.value != "+7" || this.value != "+ 7" ? this.value = "+7" : ''
          // }
          let numberArray = this.value.split("");
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
              numberArray[0] = "+";
            }
            if (numberArray[1] != "7" && numberArray[1] != undefined) {
              numberArray[0] = "+7";
            }
          } else if (this.value.length == 12) {
            if (numberArray[0] != "+") {
              numberArray[0] = "+";
            }
            if (numberArray[1] != "7" && numberArray[1] != undefined) {
              numberArray[1] = "7";
            }
          }
          if (this.value.length > 1) {
            for (let i = 1; i < numberArray.length; i++) {
              if (numberArray[i] == "+") {
                numberArray.splice(i, 1);
              }
            }
          }
          this.value = numberArray.join("");
        }
        // numberLength = this.value.length;
        lastValue = this.value;
        return;
      } else {
        this.value = lastValue;
      }
    }
  });
}

document
  .querySelector(".orderCallForm__submit")
  .addEventListener("click", function () {
    orderCallFormFunc(this);
  });
document.querySelector(".catalog__btn").addEventListener("click", function () {
  orderCallFormFunc(this);
});
document
  .querySelector(".formQuestion__submit")
  .addEventListener("click", function () {
    if (!orderCallDataSubmited) {
      orderCallFormFunc(this);
    } else {
      orderCallFormOpenFunc("formQuestion submited = true");
    }
  });

function getAll(selector) {
  return document.querySelectorAll(selector) || [];
}

function showByIndex(selector, index, display = "flex") {
  const els = getAll(selector);
  if (els[index]) {
    els[index].style.display = display;
  }
}

function hideByIndex(selector, index) {
  const els = getAll(selector);
  if (els[index]) {
    els[index].style.display = "none";
  }
}

function validateFields(container) {
  let errors = 0;

  const fields = container.querySelectorAll("[data-validate]");

  fields.forEach((field) => {
    const type = field.dataset.validate;
    const errorText = field.dataset.error || "Ошибка";
    const errorEl = field.querySelector(
      ".labelCheckbox__error, .labelInput__error",
    );

    let isValid = true;
    let input;

    switch (type) {
      case "checkbox":
        input = field.querySelector('input[type="checkbox"]');
        isValid = input?.checked;
        break;

      case "required":
        input = field.querySelector("input, textarea");
        isValid = input && input.value.trim() !== "";
        break;

      case "phone":
        input = field.querySelector("input");
        isValid = input && input.value.length === 12;
        break;

      case "email":
        input = field.querySelector("input");
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        break;
    }

    if (!isValid) {
      errors++;
      field.classList.add("field--error");
      if (errorEl) errorEl.textContent = errorText;
    } else {
      field.classList.remove("field--error");
    }
  });

  return errors === 0;
}

function orderCallFormFunc(button) {
  const form = button.closest("[data-form]");

  if (!form) return;

  if (!validateFields(form)) {
    return;
  }

  let p = new Promise((res, rej) => {
    let submitData;
    setTimeout(() => {
      Math.random() > 0.5 ? res() : rej();
    }, 200);
    for (let i of orderCallFormVariables) {
      if (i.open) {
        submitData = i.form;
        console.log(submitData);
      }
    }
  });
  p.then(
    (res) => {
      let isOrderCall = false;
      for (let i of orderCallFormVariables) {
        if (i.open == true) {
          i.wasSubmited = true;
          isOrderCall = true;
        }
      }
      if (!isOrderCall) {
        orderCallFormVariables[0].wasSubmited = true;
      }
      orderCallDataSubmited = true;
      console.log("axios.post()");
      orderCallFormIsSubmited();
      orderCallFormOpenFunc();
      setTimeout(() => {
        labelInputResetFunc(l[0]);
        labelInputResetFunc(l[1]);
      }, 500);
      for (i of orderCallQuantity) {
        i.style.opacity = "0.5";
      }
      document.querySelector(".formQuestion__submit").style.opacity = "0.5";
    },
    (rej) => {
      console.error("error:axios.post()");
      hideByIndex(".orderCallForm__miniCont", 0);
      showByIndex(".orderCallForm__miniCont", 2);
      orderCallFormOpenFunc();
    },
  );
}

function orderCallFormIsSubmited(a = true) {
  if (a) {
    hideByIndex(".orderCallForm__miniCont", 0);
    showByIndex(".orderCallForm__miniCont", 1);
  } else {
    hideByIndex(".orderCallForm__miniCont", 1);
    showByIndex(".orderCallForm__miniCont", 0);
  }

  hideByIndex(".orderCallForm__miniCont", 2);
}

function labelInputResetFunc(a) {
  for (i of document.querySelectorAll(a)) {
    i.value = "";
    if (a == ".labelInput_valueFormQuestion") {
      i.style.border = "solid 1px rgba(255, 255, 255, 0.2)";
    } else if (a == ".labelInput__input_orderCallForm") {
      i.style.border = "solid 2px #337c7e";
    }
    i.style.backgroundColor = "transparent";
  }
}

function doc_querySel(params) {
  return document.querySelector(params);
}

function sel_addEventListener(selector, func) {
  return document
    .querySelector(selector)
    .addEventListener("click", function () {
      func.call(this);
    });
}

if (document.querySelector(".comeAndLive")) {
  window.addEventListener("load", function () {
    for (let i of document.querySelectorAll(".levelFlats__img")) {
      let b = i.naturalHeight - i.naturalWidth;
      let width = 0;
      let height = 0;
      if (b < 0) {
        width = (i.naturalWidth / i.naturalHeight) * 100;
        height = 100;
      } else if (b > 0) {
        height = (i.naturalHeight / i.naturalWidth) * 100;
        width = 100;
      } else if (b == 0) {
        width = 100;
        height = 100;
      }
      i.style.width = `${width}%`;
      i.style.height = `${height}%`;
    }
  });

  for (let elem of document.querySelectorAll(".levelFlats")) {
    const idx = Number(elem.getAttribute("idx"));
    const popupBlockArray = document.querySelectorAll(
      ".comeAndLivePopup__block",
    );
    elem.addEventListener("click", (e) => {
      for (let i of popupBlockArray) {
        i.style.display = "none";
      }
      popupBlockArray[idx].style.display = "flex";
      document.querySelector(".comeAndLivePopup").style.display = "flex";
      e.stopPropagation();
    });
  }

  document
    .querySelector(".comeAndLivePopup__miniContainer")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });
  document
    .querySelector(".comeAndLivePopup__close")
    .addEventListener("click", () => {
      document.querySelector(".comeAndLivePopup").style.display = "none";
    });
  document.querySelector("body").addEventListener("click", (e) => {
    document.querySelector(".comeAndLivePopup").style.display = "none";
  });
}
