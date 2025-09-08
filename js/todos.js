import { uiChanger } from "./ui-changer.js"

export let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : []

export function changeTodos(value) {
  todos = value
  localStorage.setItem("todos", JSON.stringify(todos))
  uiChanger(todos)
}
