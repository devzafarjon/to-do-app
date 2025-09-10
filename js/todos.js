import { uiChanger } from "./ui-changer.js"

// export let todos = localStorage.getItem("todos")
//   ? JSON.parse(localStorage.getItem("todos"))
//   : []
export let todos = [
  {
    id: 1,
    title: "Todo 1",
    description: "Nima gap 1",
    isComplated: true,
  },
]

export function changeTodos(value) {
  todos = value
  localStorage.setItem("todos", JSON.stringify(todos))
  uiChanger(todos)
}
