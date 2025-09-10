import { addTodo } from "./crud.js"
import {
  elAddBtn,
  elCheckboxComplated,
  elInputTitle,
  elTextareaDescription,
} from "./html-elements.js"
import { todos } from "./todos.js"
import { uiChanger } from "./ui-changer.js"

uiChanger(todos)

elAddBtn.addEventListener("click", () => {
  const title = elInputTitle.value
  const description = elTextareaDescription.value
  const isComplated = elCheckboxComplated.checked
  const id = crypto.randomUUID()

  const result = {
    id,
    title,
    description,
    isComplated,
  }

  elInputTitle.value = ""
  elTextareaDescription.value = ""
  elCheckboxComplated.checked = false

  addTodo(result)
})
