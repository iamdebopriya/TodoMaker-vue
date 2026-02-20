<template>
  <div class="wrapper">
    <div class="bg-orbs">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
    </div>

    <div class="card">
      <!-- Header -->
      <div class="header">
        <el-button class="back-btn" text @click="emit('back')">
          <el-icon><ArrowLeft /></el-icon> Back
        </el-button>
        <div class="title-block">
          <h2>My Tasks</h2>
          <span class="count">
          {{ todos.length }} {{ todos.length <= 1 ? 'item' : 'items' }}
        </span>
        </div>
      </div>

      <!-- Input -->
      <div class="input-row">
        <el-input
          v-model="newTask"
          placeholder="What needs to be done?"
          class="task-input"
          @keyup.enter="addTask"
          autofocus
        />
        <el-button class="add-btn" @click="addTask">
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>

      <!-- List -->
      <div class="list">
        <transition-group name="fade">
          <div v-for="todo in todos" :key="todo.id" class="todo-row" :class="{ done: todo.done }">
            <el-checkbox
              :model-value="todo.done"
              @change="(val) => toggle(todo.id, val)"
              class="check"
            />

            <el-input
              v-if="editingId === todo.id"
              v-model="editText"
              size="small"
              class="edit-input"
            />
            <span v-else class="task-text">{{ todo.text }}</span>

            <div class="actions">
              <el-button
                v-if="editingId === todo.id"
                size="small"
                class="action-btn save"
                @click="saveEdit(todo.id)"
              >
                <el-icon><Check /></el-icon>
              </el-button>
              <el-button
                v-else
                size="small"
                class="action-btn edit"
                @click="startEdit(todo)"
              >
                <el-icon><EditPen /></el-icon>
              </el-button>
              <el-button
                size="small"
                class="action-btn del"
                @click="remove(todo.id)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </transition-group>

        <div v-if="!todos.length" class="empty">
          <el-icon size="36" color="#d4a84b"><EditPen /></el-icon>
          <p>No tasks yet. Add one above!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Plus, EditPen, Delete, Check } from '@element-plus/icons-vue'
import { useTodoStore } from '../store/todoStore'

const emit = defineEmits(['back'])
const store = useTodoStore()
const newTask = ref('')
const editingId = ref(null)
const editText = ref('')
const todos = computed(() => store.todos)

function addTask() {
  if (!newTask.value.trim()) return
  store.addTodo(newTask.value)
  newTask.value = ''
}
function remove(id) { store.deleteTodo(id) }
function toggle(id, val) { store.toggleTodo(id, val) }
function startEdit(todo) { editingId.value = todo.id; editText.value = todo.text }
function saveEdit(id) { store.updateTodo(id, editText.value); editingId.value = null }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdf6e3;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
}

.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; animation: float 8s ease-in-out infinite; }
.orb-1 { width: 380px; height: 380px; background: #f4c87a; top: -100px; left: -100px; }
.orb-2 { width: 280px; height: 280px; background: #e8965a; bottom: -80px; right: -60px; animation-delay: -4s; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

.card {
  position: relative;
  z-index: 1;
  width: 720px;
  background: rgba(255, 252, 240, 0.75);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(210, 170, 100, 0.35);
  border-radius: 28px;
  padding: 36px 40px 40px;
  box-shadow: 0 32px 80px rgba(140, 90, 30, 0.13);
  animation: rise 0.6s cubic-bezier(.22,1,.36,1) both;
}
@keyframes rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

/* Header */
.header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 28px; }
.back-btn {
  color: #a06520 !important;
  font-size: 13px;
  padding: 6px 10px;
  margin-top: 4px;
  border-radius: 10px;
  transition: background 0.2s;
}
.back-btn:hover { background: rgba(200,140,50,0.12) !important; }
.title-block { flex: 1; }
h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 600;
  color: #3d2800;
  margin: 0;
  line-height: 1.1;
}
.count {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a07840;
}

/* Input */
.input-row { display: flex; gap: 10px; margin-bottom: 24px; }
.task-input :deep(.el-input__wrapper) {
  border-radius: 14px;
  border: 1px solid rgba(200,150,60,0.3);
  background: rgba(255,250,235,0.8);
  box-shadow: none !important;
}
.task-input :deep(.el-input__wrapper):hover,
.task-input :deep(.el-input__wrapper.is-focus) {
  border-color: #d4880a;
}
.add-btn {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #d4880a, #e8a020);
  border: none;
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 6px 18px rgba(200,130,20,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.add-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(200,130,20,0.4); }

/* List */
.list { display: flex; flex-direction: column; gap: 10px; }

.todo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 250, 235, 0.7);
  border: 1px solid rgba(210,170,100,0.2);
  border-radius: 14px;
  padding: 10px 14px;
  transition: border-color 0.2s, opacity 0.3s;
}
.todo-row:hover { border-color: rgba(210,170,100,0.45); }
.todo-row.done { opacity: 0.55; }

.check :deep(.el-checkbox__inner) {
  border-radius: 6px;
  border-color: #c89640;
}
.check :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #d4880a;
  border-color: #d4880a;
}

.task-text { flex: 1; font-size: 14px; color: #3d2800; }
.done .task-text { text-decoration: line-through; }
.edit-input { flex: 1; }
.edit-input :deep(.el-input__wrapper) { border-radius: 8px; }

/* Action buttons */
.actions { display: flex; gap: 6px; }
.action-btn {
  width: 30px !important;
  height: 30px !important;
  padding: 0 !important;
  border-radius: 9px !important;
  border: 1px solid transparent !important;
  display: flex; align-items: center; justify-content: center;
}
.action-btn.edit { color: #a06520 !important; background: rgba(200,140,50,0.1) !important; border-color: rgba(200,140,50,0.2) !important; }
.action-btn.edit:hover { background: rgba(200,140,50,0.22) !important; }
.action-btn.del { color: #c0392b !important; background: rgba(192,57,43,0.08) !important; border-color: rgba(192,57,43,0.15) !important; }
.action-btn.del:hover { background: rgba(192,57,43,0.18) !important; }
.action-btn.save { color: #27ae60 !important; background: rgba(39,174,96,0.1) !important; border-color: rgba(39,174,96,0.2) !important; }
.action-btn.save:hover { background: rgba(39,174,96,0.2) !important; }

/* Empty */
.empty { text-align: center; padding: 36px 0 12px; color: #a07840; font-size: 14px; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(-8px); }
.fade-leave-to { opacity: 0; transform: translateX(10px); }
</style>