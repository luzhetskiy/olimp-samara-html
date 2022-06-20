// window.addEventListener("load", function () {
// 	for (let i of document.querySelectorAll(".listGallerys__img")) {
// 		console.log(i.naturalHeight)
// 		console.log(i.naturalWidth)
// 		let b = i.naturalHeight - i.naturalWidth
// 		let width = 0;
// 		let height = 0;
// 		if (b < -150) {
// 			width = i.naturalWidth / i.naturalHeight * 100;
// 			// width = i.naturalWidth / i.naturalHeight * 100 / 1.65;
// 			height = 100
// 		} else if (b > -150) {
// 			// height = i.naturalHeight / i.naturalWidth * 100;
// 			height = i.naturalHeight / i.naturalWidth * 100 * 1.65;
// 			width = 100
// 		} else if (b == -150) {
// 			width = 100
// 			height = 100
// 		}
// 		// i.style.width = `calc(${width}% `
// 		// i.style.height = `calc(${height}% `
// 		i.style.width = `${width}% `
// 		i.style.height = `${height}% `
// 	}
// })