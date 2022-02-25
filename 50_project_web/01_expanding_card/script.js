let panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        RemovePanelActive()
        panel.classList.add('panel-active')
    })
})

function RemovePanelActive(){
    panels.forEach(panel => {
        panel.classList.remove('panel-active')
    });
}