// Helper: year in footer
document.getElementById('year').textContent = new Date().getFullYear()

// 1) Change header style after scrolling a bit
const header = document.querySelector('[data-header]')
const onScroll = () => {
  if (window.scrollY > 10) header.classList.add('scrolled')
  else header.classList.remove('scrolled')
}
onScroll() // run once on load
window.addEventListener('scroll', onScroll, { passive: true })

// 2) Mobile menu toggle
const toggleBtn = document.querySelector('[data-nav-toggle]')
const menu = document.querySelector('[data-nav-menu]')

toggleBtn.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open')
  toggleBtn.setAttribute('aria-expanded', String(isOpen))
  toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
})

// Close menu when clicking a link (mobile)
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open')
      toggleBtn.setAttribute('aria-expanded', 'false')
      toggleBtn.setAttribute('aria-label', 'Open menu')
    }
  })
})

// 3) Optional: highlight active nav link while scrolling using IntersectionObserver
const sections = Array.from(document.querySelectorAll('main section[id]'))
const navLinks = Array.from(document.querySelectorAll('.nav__link')).filter(a => a.hash)
const byId = id => navLinks.find(a => a.hash === '#' + id)

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = byId(entry.target.id)
    if (!link) return
    if (entry.isIntersecting) link.classList.add('active')
    else link.classList.remove('active')
  })
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })

sections.forEach(sec => io.observe(sec))

// Style for active link via class (kept here so beginners see it)
const style = document.createElement('style')
style.textContent = `.nav__link.active:not(.btn){ outline: 2px solid rgba(255,255,255,.35); }`
document.head.appendChild(style)
