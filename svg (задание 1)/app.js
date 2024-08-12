const btn = document.querySelector(".btn")
const firstIcon = document.querySelector(".first")
const secondIcon = document.querySelector('.second')

btn.addEventListener('click', Change)

function Change() {
    firstIcon.classList.toggle('hidden')
    secondIcon.classList.toggle('hidden')
}
    

    