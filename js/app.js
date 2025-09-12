import { addTodo, editTodo } from "./crud.js"
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

  // Basic validation
  if (!title.trim() && !description.trim()) {
    alert("Iltimos, todo nomi yoki izoh kiriting.")
    elInputTitle.focus()
    return
  }

  // Save edit mode
  if (elAddBtn.dataset.mode === "edit") {
    const id = elAddBtn.dataset.id
    if (!id) return
    editTodo({ id, title, description, isComplated })
    // Reset to add mode
    elAddBtn.textContent = "Tasdiqlash"
    delete elAddBtn.dataset.mode
    delete elAddBtn.dataset.id
  } else {
    // Add mode
    const id = crypto.randomUUID()
    const result = { id, title, description, isComplated }
    addTodo(result)
  }

  // Clear form
  elInputTitle.value = ""
  elTextareaDescription.value = ""
  elCheckboxComplated.checked = false
})

// Handle save in edit modal
const saveEditBtn = document.getElementById("saveEditBtn")
if (saveEditBtn) {
  saveEditBtn.addEventListener("click", () => {
    const id = document.getElementById("edit-id").value
    const title = document.getElementById("edit-title").value
    const description = document.getElementById("edit-description").value
    const isComplated = document.getElementById("edit-complated").checked

    if (!id) return

    editTodo({ id, title, description, isComplated })
  })
}
