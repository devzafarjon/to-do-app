import { deleteTodo } from "./crud.js"
import { elCardTemplate, elTodosContainer } from "./html-elements.js"

export function uiChanger(todos) {
  elTodosContainer.innerHTML = null
  todos.forEach((element) => {
    const clone = elCardTemplate.cloneNode(true).content

    const elTitle = clone.querySelector("h5")
    const elDeleteButton = clone.querySelector(".delete-btn")
    const elDescription = clone.querySelector("p")

    elTitle.innerText = element.title
    elDescription.innerText = element.description
    elDeleteButton.id = element.id

    elDeleteButton.addEventListener("click", (event) => {
      deleteTodo(event.target.id)
    })

    elTodosContainer.append(clone)
  })
}
