for (let i of document.querySelectorAll(".filter__section")) {
	i.addEventListener("click", function () {
		document.querySelector(".main__parkingImg").src = i.getAttribute("data_img_src")
		for (let b of document.querySelectorAll(".filter__section")) {
			b.style = ""
		}
		i.style.backgroundColor = "#337c7e"
		i.style.color = "#fff"
		// console.log(i.data_img_src)
	})
}
sel_addEventListener(
	".orderCall_parking_js",
	function () {
		// console.log(this)
		orderCallFormOpenFunc(1)
	}
)

const parking = document.querySelectorAll('[data-parking]')

let isTouch = false

function isTouchDevice() {
	isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}

const throttle = (func, delay = 250) => {
	let isThrottled = false
	let savedArgs = null
	let savedThis = null

	return function wrap(...args) {
		if (isThrottled) {
			savedArgs = args,
				savedThis = this
			return
		}

		func.apply(this, args)
		isThrottled = true

		setTimeout(() => {
			isThrottled = false

			if (savedThis) {
				wrap.apply(savedThis, savedArgs)
				savedThis = null
				savedArgs = null
			}

		}, delay)
	}
}

function updateMaxHeight(element) {
	const container = document.createElement('div')
	const tempContainer = document.createElement('div')
	const clone = element.cloneNode(true)
	container.style.position = 'absolute'
	container.style.width = '85%'
	container.style.height = '100%'
	container.style.visibility = 'hidden'
	tempContainer.style.width = '100%'

	document.body.appendChild(container)
	container.appendChild(tempContainer)
	tempContainer.appendChild(clone)

	requestAnimationFrame(() => {
		const height = clone.offsetHeight
		element.style.maxHeight = `${height}px`
		document.body.removeChild(container)
	})
}

function createParkingWindow() {
	const parkingWindow = document.createElement('div')
	parkingWindow.classList.add('parking-window')
	document.body.appendChild(parkingWindow)
	return parkingWindow
}

function updateParkingWindowContent(target, parkingWindow) {
	const id = target.getAttribute('data-parking-placement')
	const status = target.getAttribute('data-parking-status')
	const square = target.getAttribute('data-parking-square')
	const price = target.getAttribute('data-parking-price')

	parkingWindow.innerHTML = `
		<span class="parking-window-title">Место № ${id}</span>
		<span class="parking-window-info">Площадь: ${square}</span>
		<span class="parking-window-info">Статус: ${status}</span>
		<span class="parking-window-price">${price}</span>
	`
}

function addParkingAttributes(element) {
	const parkingItems = element.querySelectorAll('[data-parking-item]')
	const statusOptions = ['Свободное место', 'Забронированный', 'Продано']
	parkingItems.forEach((item, index) => {
		const status = statusOptions[index % 3]
		item.setAttribute('data-parking-id', `P-${index + 1}`)
		item.setAttribute('data-parking-placement', `${index + 1}`)
		item.setAttribute('data-parking-status', status)
		item.setAttribute('data-parking-square', `${Math.floor(Math.random() * 50) + 20} м²`)
		item.setAttribute('data-parking-price', `${Math.floor(Math.random() * 20) + 5} ₽`)
	})
}

function enableMouseScroll(element) {
	let isDragging = false
	let startX
	let startY
	let scrollLeft
	let scrollTop

	function onMouseDown(e) {
		isDragging = true
		startX = e.pageX - element.offsetLeft
		startY = e.pageY - element.offsetTop
		scrollLeft = element.scrollLeft
		scrollTop = element.scrollTop
	}

	function onMouseMove(e) {
		if (!isDragging) return
		e.preventDefault()
		const x = e.pageX - element.offsetLeft
		const y = e.pageY - element.offsetTop
		const walkX = (x - startX)
		const walkY = (y - startY)
		element.scrollLeft = scrollLeft - walkX
		element.scrollTop = scrollTop - walkY
	}

	function onMouseUp() {
		isDragging = false
	}

	function onMouseLeave() {
		isDragging = false
	}

	element.addEventListener('mousedown', onMouseDown)
	element.addEventListener('mousemove', onMouseMove)
	element.addEventListener('mouseup', onMouseUp)
	element.addEventListener('mouseleave', onMouseLeave)
}

function setupParkingInteractions(element) {
	let activeWindow = null

	function handleMouseMove(event) {
		const targetItem = event.target.closest('[data-parking-item]')
		if (targetItem && !isTouch && targetItem.hoverWindow) {
			const hoverWindow = targetItem.hoverWindow
			const mouseX = event.pageX + 10
			const mouseY = event.pageY + 10

			const windowWidth = window.innerWidth
			const hoverWindowWidth = hoverWindow.offsetWidth
			const spaceRight = windowWidth - mouseX

			if (spaceRight < hoverWindowWidth) {
				hoverWindow.style.left = `${event.pageX - hoverWindowWidth - 10}px`
			} else {
				hoverWindow.style.left = `${mouseX}px`
			}
			hoverWindow.style.top = `${mouseY}px`
		}
	}

	function handleMouseOver(event) {
		const targetItem = event.target.closest('[data-parking-item]')
		if (targetItem && !isTouch) {
			if (!targetItem.hoverWindow) {
				targetItem.hoverWindow = createParkingWindow()
				updateParkingWindowContent(targetItem, targetItem.hoverWindow)
			}
			handleMouseMove(event)
			element.addEventListener('mousemove', handleMouseMove)
		}
	}

	function handleMouseOut(event) {
		const targetItem = event.target.closest('[data-parking-item]')
		if (targetItem && !isTouch) {
			if (targetItem.hoverWindow) {
				targetItem.hoverWindow.remove()
				targetItem.hoverWindow = null
			}
			element.removeEventListener('mousemove', handleMouseMove)
		}
	}

	function handleClick(event) {
		const targetItem = event.target.closest('[data-parking-item]')
		if (targetItem) {
			if (activeWindow && activeWindow !== targetItem.hoverWindow) {
				activeWindow.remove()
			}
			if (!targetItem.hoverWindow) {
				targetItem.hoverWindow = createParkingWindow()
				updateParkingWindowContent(targetItem, targetItem.hoverWindow)
				activeWindow = targetItem.hoverWindow
			} else {
				targetItem.hoverWindow.remove()
				activeWindow = null
			}
		}
	}

	function parkingViewScale(element) {
		const parkingView = element.querySelector('[data-parking-view]')
		const parkingSvg = element.querySelector('[data-parking-svg]')
		const parkingScale = element.querySelector('[data-parking-scale]')
		const parkingUnscale = element.querySelector('[data-parking-unscale]')
		
		parkingSvg.style.width = `${scale}%`

		if (scale > 100) {
			parkingView.style.overflow = 'auto'
		} else {
			parkingView.style.overflow = 'hidden'
		}

		parkingScale.disabled = scale >= 300
		parkingUnscale.disabled = scale <= 100
	}

	if (isTouch) {
		element.addEventListener('click', handleClick)
		document.addEventListener('click', (event) => {
			if (activeWindow && !element.contains(event.target)) {
				activeWindow.remove()
				activeWindow = null
			}
		})
	} else {
		element.addEventListener('mouseover', handleMouseOver)
		element.addEventListener('mouseout', handleMouseOut)
	}

	const parkingScale = element.querySelector('[data-parking-scale]')
	const parkingUnscale = element.querySelector('[data-parking-unscale]')
	let scale = 100

	parkingScale.addEventListener('click', () => {
		scale = Math.min(300, scale + 25)
		parkingViewScale(element)
	})

	parkingUnscale.addEventListener('click', () => {
		scale = Math.max(100, scale - 25)
		parkingViewScale(element)
	})

	enableMouseScroll(element.querySelector('[data-parking-view]'))
	window.addEventListener('load', () => updateMaxHeight(element.querySelector('[data-parking-view]')))
	window.addEventListener('resize', () => updateMaxHeight(element.querySelector('[data-parking-view]')))
}

isTouchDevice()

window.addEventListener('resize', () => throttle(isTouchDevice))

parking?.forEach(element => {
	addParkingAttributes(element)
	setupParkingInteractions(element)
})