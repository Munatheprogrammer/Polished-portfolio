// ── SCROLL REVEAL ──
// IntersectionObserver watches elements and fires when they
// enter the viewport. We use it to trigger fade-up animations.
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      observer.unobserve(e.target) // stop watching once visible
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

// ── NAV HIDE ON SCROLL ──
let lastY = 0
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav')
  const y = window.scrollY
  nav.style.transform = y > lastY && y > 100 ? 'translateY(-100%)' : 'translateY(0)'
  lastY = y
})

// ── COPY EMAIL ──
function copyEmail() {
  navigator.clipboard.writeText('agumirabel3@gmail.com')
  const el = document.getElementById('emailText')
  const prev = el.textContent
  el.textContent = 'Copied!'
  setTimeout(() => el.textContent = prev, 2000)
}

