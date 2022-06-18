let webCamersBlocksQuantity = document.querySelectorAll(".webCamers__block").length;
document.querySelector(".webCamers__grid").insertAdjacentHTML("afterbegin", webCamersBlocksStyle())
function webCamersBlocksStyle() {
	if (webCamersBlocksQuantity > 1) {
		return `
			<style>
				.webCamers__grid {
					display:grid;
					gap: 40px 100px;
					grid-template-columns: 1fr 1fr;
				}
			</style>
			`
	}
	return ``
}