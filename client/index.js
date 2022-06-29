//navbar
const nav = document.querySelector('nav')

window.addEventListener('scroll', (e) => {
  nav.classList.toggle('headerfixed', nav.getBoundingClientRect().top <= 0)
})



//navigate page with buttons
const navBar = document.querySelector('nav')

navBar.addEventListener('click', (e) => {
  e.preventDefault()
  if (
    e.target.hasAttribute('href') &&
    e.target.getAttribute('href').startsWith('#')
  ) {
    const scrollSection = document.querySelector(e.target.getAttribute('href'))
    window.scrollTo({
      top: scrollSection.offsetTop - 135,
      behavior: 'smooth',
    })
  }
})

//carousel
const track = document.querySelector('.carousel_track')
const slides = Array.from(document.querySelectorAll('.carousel_slide'))
const nextButton = document.querySelector('.carousel_button--right')
const prevButton = document.querySelector('.carousel_button--left')
const dotsNav = document.querySelector('.carousel_nav')
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

//arranging slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px'
}
slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left
  ;+')'
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide')
  targetDot.classList.add('current-slide')
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden')
    nextButton.classList.remove('is-hidden')
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden')
    nextButton.classList.add('is-hidden')
  } else {
    prevButton.classList.remove('is-hidden')
    nextButton.classList.remove('is-hidden')
  }
}

//click left
prevButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide')
  const prevSlide = currentSlide.previousElementSibling
  const currentDot = dotsNav.querySelector('.current-slide')
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex((slide) => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevButton, nextButton, prevIndex)
})
//click right
nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide')
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = dotsNav.querySelector('.current-slide')
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slides.findIndex((slide) => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevButton, nextButton, nextIndex)
})

//move to indicator

dotsNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button')

  if (!targetDot) return

  const currentSlide = track.querySelector('.current-slide')
  const currentDot = dotsNav.querySelector('.current-slide')
  const targetIndex = dots.findIndex((dot) => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
})
