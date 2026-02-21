# Todo Micro-Frontend (Vue 3)

## Project Overview

This project is a **Micro-Frontend To-Do List Application** built using **Vue 3**.
It runs as an independent application and can also be mounted inside a host app.
It supports complete task management with persistent storage and instant UI updates.

---

## Technology Stack

| Layer            | Tool                 |
| ---------------- | -------------------- |
| Framework        | Vue 3                |
| State Management | Pinia                |
| UI Library       | Element Plus         |
| Build Tool       | Vite                 |
| Storage          | Browser LocalStorage |
| Architecture     | Micro-Frontend       |

---

## Functional Features

■ Add new tasks
■ Mark tasks as completed
■ Edit existing tasks
■ Delete tasks
■ Persist tasks after browser refresh
■ Immediate UI update after every action

---

## Micro-Frontend Architecture

The application is designed as a mountable micro-frontend.

### Entry Flow

```
index.html
   └── bootstrap.js
         └── App.vue
               └── TodoApp.vue
```

The `bootstrap.js` file is the only entry point and replaces the need for `main.js`.

---

## Folder Structure

```
todo-mf/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   └── TodoApp.vue
│   │
│   ├── store/
│   │   └── todoStore.js
│   │
│   ├── App.vue
│   └── bootstrap.js
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation & Setup

### Step 1: Create Project

```
npm create vite@latest todo-microfrontend-vue -- --template vue
cd todo-microfrontend-vue

```

### Step 2: Install Dependencies

```
npm install
npm install pinia element-plus
```

### Step 3: Run Project

```
npm run dev
```

---

## State Management (Pinia)

All task operations are handled in Pinia:

■ addTodo
■ toggleTodo
■ deleteTodo
■ updateTodo

Pinia ensures reactive updates and centralized state control.

---

## Data Persistence

Tasks are stored in browser LocalStorage.

Saving:

```
localStorage.setItem('tasks', JSON.stringify(tasks))
```

Loading:

```
JSON.parse(localStorage.getItem('tasks'))
```

This guarantees:
■ Data persistence
■ No backend dependency
■ High performance

---

## UI Design (Element Plus)

Element Plus components used:

■ el-input
■ el-button
■ el-card
■ el-checkbox
■ el-icon

Custom theme:
■ Yellow background
■ Brown text
■ Poppins font
■ Rounded cards

---

## Performance & Reactivity

■ Vue reactivity ensures instant UI updates
■ Pinia manages state changes
■ LocalStorage sync prevents data loss
■ No page reload required

---

## Requirement Mapping

| Requirement       | Status      |
| ----------------- | ----------- |
| Add Task          | Completed   |
| Mark Task Done    | Completed   |
| Edit Task         | Completed   |
| Delete Task       | Completed   |
| Persist Data      | Completed   |
| Instant UI Update | Completed   |
| Vue 3             | Used        |
| Pinia             | Used        |
| Element Plus      | Used        |
| Vite              | Used        |
| Micro-Frontend    | Implemented |

---

## Micro-Frontend Integration

This application is designed to be consumed by a host (container) app instead of mounting itself automatically.

```js
export function mount(el) { ... }
```

* The app **exports a `mount` function**, allowing an external application to decide **where** it should render.

```js
export function mount(el) {
  const pinia = createPinia()
  app = createApp(App)
  app.use(pinia)
  app.use(ElementPlus)
  app.mount(el)
}
```

* It does **not hardcode a DOM root** like `#app`, which makes it embeddable inside another application.

* In standalone mode (when no host is present), it mounts itself for testing:

```js
if (!window.__MICRO_FRONTEND_HOST__) {
  const el = document.querySelector('#_todo-mf-dev-root')
  if (el) {
    mount(el)
  }
}
```

* When used inside a host application, the host calls `mount(el)` and controls where the app renders.

This pattern enables:

* Independent deployment
* Runtime integration into a host UI
* Isolated Vue, Pinia, and UI dependencies

Therefore, the app follows the core principle of micro-frontend architecture:
**independently built UI modules mounted and controlled by a container application.**

## Recommended VS Code Extensions

■ Vue Language Features (Volar)
■ ESLint
■ Prettier
■ Auto Rename Tag
■ Material Icon Theme

---

## Conclusion

This project fulfills all requirements of:

**Micro-Frontend To-Do Application**

■ Fully functional
■ Persistent data
■ Clean architecture
■ Performance optimized
■ Built using Vue 3, Pinia, Element Plus, and Vite
