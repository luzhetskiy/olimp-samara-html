// let webCamersBlocksQuantity = document.querySelectorAll(".webCamers__block").length;
let webCamers = document.querySelectorAll('.webCamers__video')

// document.querySelector(".webCamers__grid").insertAdjacentHTML("afterbegin", webCamersBlocksStyle())
// function webCamersBlocksStyle() {
// 	if (webCamersBlocksQuantity > 1) {
// 		return `
// 			<style>
// 				.webCamers__grid {
// 					display:grid;
// 					gap: 40px 100px;
// 					grid-template-columns: 1fr 1fr;
// 				}
// 			</style>
// 			`
// 	}
// 	return ``
// }
if (webCamers.length > 1) {
	document.querySelector(".webCamers__grid").classList.add("webCamers__grid_grid-template-columns-2")
}

for (let video of webCamers) {
	if (Hls.isSupported()) {
		var hls = new Hls();
		hls.loadSource(video.getAttribute("data_video_link"));
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED, function () {
			video.play();
		});
	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = video.getAttribute("data_video_link");
		video.addEventListener('canplay', function () {
			video.play();
		});
	}
}