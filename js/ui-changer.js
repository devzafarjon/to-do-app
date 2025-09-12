import { deleteTodo, getTodo } from "./crud.js"
import {
  elCardTemplate,
  elTodosContainer,
  elInputTitle,
  elTextareaDescription,
  elCheckboxComplated,
  elAddBtn,
} from "./html-elements.js"

export function uiChanger(todos) {
  elTodosContainer.innerHTML = null
  const emptyState = document.getElementById("emptyState")
  if (emptyState) {
    if (!todos || todos.length === 0) {
      emptyState.classList.remove("hidden")
    } else {
      emptyState.classList.add("hidden")
    }
  }

  // Event delegation on container (set once per render)
  elTodosContainer.onclick = (evt) => {
    const target = evt.target
    if (target.classList.contains("delete-btn")) {
      deleteTodo(target.id)
      return
    }
    if (target.classList.contains("edit-btn")) {
      const current = getTodo(target.id)
      if (!current) return
      // Populate top inputs and switch to edit mode
      elInputTitle.value = current.title
      elTextareaDescription.value = current.description
      elCheckboxComplated.checked = !!current.isComplated
      elAddBtn.textContent = "Save changes"
      elAddBtn.dataset.mode = "edit"
      elAddBtn.dataset.id = String(current.id)
      // Focus title
      elInputTitle.focus()
      return
    }
  }

  todos.forEach((element) => {
    const clone = elCardTemplate.cloneNode(true).content

    const elTitle = clone.querySelector("h5")
    const elComplated = clone.querySelector("span")
    const elDeleteButton = clone.querySelector(".delete-btn")
    const elDescription = clone.querySelector("p")

    elTitle.innerText = element.title
    elDescription.innerText = element.description
    if (element.isComplated) {
      elComplated.innerText = "Completed"
      elComplated.className =
        "inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
    } else {
      elComplated.innerText = "Pending"
      elComplated.className =
        "inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
    }
    elDeleteButton.id = element.id
    const elEditButton = clone.querySelector(".edit-btn")
    elEditButton.id = element.id

    elTodosContainer.append(clone)
  })
}
