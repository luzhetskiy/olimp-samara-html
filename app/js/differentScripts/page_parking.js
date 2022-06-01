for (let i of document.querySelectorAll(".filter__section")) {
	i.addEventListener("click", function () {
		document.querySelector(".main__parkingImg").src = i.getAttribute("data_img_src");
		for (let b of document.querySelectorAll(".filter__section")) {
			b.style = "";
		}
		i.style.backgroundColor = "#337c7e";
		i.style.color = "#fff"
		// console.log(i.data_img_src)
	})
}