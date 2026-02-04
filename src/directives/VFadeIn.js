export default {
  mounted(el) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el) // Stop observing once visible
        }
      })
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    })

    observer.observe(el)
  }
}
