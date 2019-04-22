const doc = document
const win = window
    
doc.querySelector('.mobile-menu').addEventListener('click', () => {
    doc.querySelector('.bar-two').classList.toggle('rotated')
    doc.querySelector('.bar-one').classList.toggle('rotated')
    doc.querySelector('.bar-three').classList.toggle('rotated')
    doc.querySelector('.menu-wrapper').classList.toggle('show')
})

const nav = doc.querySelector('.menu-container')
const navTop = nav.offsetTop
debounce = (func, wait, immediate) => {
	let timeout
	return function() {
        let context = this, 
            args = arguments
		let later = function() {
			timeout = null
			if (!immediate) {
                func.apply(context, args)
            } 
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) {
            func.apply(context, args)
        } 
	}
}

fixedNav = debounce( () => {
    if (win.scrollY >= navTop){
        nav.classList.add('fixed')
        doc.querySelector('main').classList.add('fixed-active')
    } else {
        nav.classList.remove('fixed')
        doc.querySelector('main').classList.remove('fixed-active')
    }
}, 20)

win.addEventListener('scroll', fixedNav)