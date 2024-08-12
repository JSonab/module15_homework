const btn = document.querySelector('.btn')
btn.addEventListener('click', sizeSelector)

function sizeSelector() {
    const height= document.documentElement.clientHeight
    const width = document.documentElement.clientWidth
    alert(`Высота экрана равна ${height}, а ширина ${width}`)
}