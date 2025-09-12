import { uiChanger } from "./ui-changer.js"

export let todos = []

// Initialize from localStorage on module load
try {
  const stored = localStorage.getItem("todos")
  todos = stored ? JSON.parse(stored) : []
} catch (error) {
  todos = []
}

// Render initial UI with current todos
uiChanger(todos)

export function changeTodos(value) {
  todos = value
  try {
    localStorage.setItem("todos", JSON.stringify(todos))
  } catch (error) {}
  uiChanger(todos)
}
