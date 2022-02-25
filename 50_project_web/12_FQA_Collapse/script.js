const faqToggles = document.querySelectorAll('.faq-toggle')

faqToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active')
        /* const subMenu = document.querySelectorAll(`${toggle.parentNode} .sub-menu`) */
    })
})

