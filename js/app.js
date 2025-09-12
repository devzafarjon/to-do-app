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

// Theme initialization and toggle
const THEME_KEY = "theme"
function applyTheme(theme) {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
  const btn = document.getElementById("themeToggle")
  if (btn) {
    const icon = btn.querySelector(".icon")
    const label = btn.querySelector(".label")
    if (theme === "dark") {
      if (icon) icon.textContent = "☀️"
      if (label) label.textContent = "Light"
    } else {
      if (icon) icon.textContent = "🌙"
      if (label) label.textContent = "Dark"
    }
  }
}

try {
  const stored = localStorage.getItem(THEME_KEY)
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  applyTheme(stored || (prefersDark ? "dark" : "light"))
} catch (e) {
  applyTheme("light")
}

const themeToggleBtn = document.getElementById("themeToggle")
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark")
    const next = isDark ? "light" : "dark"
    applyTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch (e) {}
  })
}

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
