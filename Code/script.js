
let choices = []
const inputField = document.getElementById('input-field')
const saveBtn = document.getElementById('save-btn')
const clearBtn = document.getElementById('clear-btn')
const choiceContainer = document.getElementById('choices')
const errorMsg = document.getElementById('error-msg')
const randomBtn = document.getElementById('random-btn')
let randomChoice = 0

let storedChoices = JSON.parse(localStorage.getItem('choices'))
if (storedChoices) {
  choices = storedChoices
  render(choices)
} else {
  choices = []
}

function render(arr){
  let list = ''
  for (let i = 0; i < arr.length; i++){
    if (arr[i] != undefined && arr[i] != ''){
      list += `<div class = 'choice' data-index = ${i}>${arr[i]}<button class = 'delete-btn'>-</btn></div>`
    }
  }
  choiceContainer.innerHTML = list
  setupBtns()
}

function setupBtns(){
  let deleteBtns = Array.from(document.querySelectorAll('.delete-btn'))
  let listElement = Array.from(document.querySelectorAll('.choice'))
  deleteBtns.forEach((task,index) => {
    task.addEventListener('click', () => {
      const deletedIndex = listElement[index].getAttribute('data-index')
      choices.splice(deletedIndex, 1)
      localStorage.setItem('choices', JSON.stringify(choices))
      console.log(`${deletedIndex} deleted`)
      render(choices)
    })
  })

}



function addChoice(event){
  if (event.key === 'Enter' || event.target.closest('button')){
    if (inputField.value != ''){
      choices.push(inputField.value)
      localStorage.setItem('choices', JSON.stringify(choices))
      render(choices)
      inputField.value = ''
    } else {
      errorMsg.textContent = '>>>Error: Must add to the list.<<<'
      setTimeout(() => errorMsg.textContent = '', 3000)
    }
  }
}

inputField.addEventListener('keydown', event => addChoice(event))
saveBtn.addEventListener('click', event => addChoice(event))
clearBtn.addEventListener('click', () => {
  choices = []
  localStorage.setItem('choices', JSON.stringify([]))
  render(choices)
})
randomBtn.addEventListener('click', () => {
  randomChoice = Math.floor(Math.random() * choices.length)
  let listElements = Array.from(document.querySelectorAll('.choice'))
  const originalColor = listElements[0].getAttribute('background-color')
  for (let i = 0; i < listElements.length; i++){
    if (i === randomChoice) {
      listElements[i].style.backgroundColor = 'yellow'
      listElements[i].style.border = '3px solid red'
    } else {
      listElements[i].style.backgroundColor = 'grey'
      listElements[i].style.border = 'none'
    }
    setTimeout(() => {
      for (let i = 0; i < listElements.length; i++){
        listElements[i].style.backgroundColor = originalColor
        listElements[i].style.border = '1px solid black'
      }
    }, 5000)
  }
})
