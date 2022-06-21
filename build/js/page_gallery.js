window.addEventListener("load", function () {
	for (let i of document.querySelectorAll(".listGallerys__img")) {
		console.log(i.naturalHeight)
		console.log(i.naturalWidth)
		let b = i.naturalHeight - i.naturalWidth
		let width = 0;
		let height = 0;
		// if (b < -150) {
		// 	width = i.naturalWidth / i.naturalHeight * 100;
		// 	// width = i.naturalWidth / i.naturalHeight * 100 / 1.65;
		// 	height = 100
		// } else if (b > -150) {
		// 	// height = i.naturalHeight / i.naturalWidth * 100;
		// 	height = i.naturalHeight / i.naturalWidth * 100 * 1.65;
		// 	width = 100
		// } else if (b == -150) {
		// 	width = 100
		// 	height = 100
		// }
		// // i.style.width = `calc(${width}% `
		// // i.style.height = `calc(${height}% `
		// i.style.width = `${width}% `
		// i.style.height = `${height}% `

		// if (b < -150) {
		// 	width = i.naturalWidth / i.naturalHeight * 100;
		// 	height = 100
		// 	if (i.naturalWidth / i.naturalHeight < 1.65218) {
		// 		height = 0
		// 		width = 100
		// 	}
		// } else if (b > -150) {
		// 	height = i.naturalHeight / i.naturalWidth * 100 * 1.65;
		// 	width = 100
		// 	// if(i.naturalHeight / i.naturalWidth < 1.65218){

		// 	// }
		// } else if (b == -150) {
		// 	width = 100
		// 	height = 100
		// }
		// i.style.width = width == 100 ? `${width}% ` : `auto`
		// i.style.height = height == 100 ? `${height}% ` : `auto`
		if (b < 0) {
			width = "auto";
			height = 100
			if (i.naturalWidth / i.naturalHeight < 1.65218) {
				height = "auto"
				width = 100
			}
		} else if (b > 0) {
			height = "auto";
			width = 100
		} else if (b == -150) {
			width = 100
			height = 100
		}
		i.style.width = width == 100 ? `100% ` : `auto`
		i.style.height = height == 100 ? `100% ` : `auto`
	}
})