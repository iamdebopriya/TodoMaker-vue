<template>
  <div v-if="!showTodo" class="landing">
    <div class="bg-orbs">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
    </div>

    <div class="card">
        <h1>Todo<em color="orange">Maker</em></h1>
      <div class="badge">
        <el-icon><EditPen /></el-icon>
        <span>Task Management</span>
      </div>

      <h1>Make every<br /><em>task count.</em></h1>

      <p>An effective way to capture, organize, and finish what matters most.</p>

      <el-divider />

      <el-button class="cta" @click="showTodo = true" size="large">
        Start Organizing
        <el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>

      <div class="stats">
        <div class="stat"><strong>∞</strong><span>Tasks</span></div>
        <div class="sep" />
        <div class="stat"><strong>0</strong><span>Clutter</span></div>
        <div class="sep" />
        <div class="stat"><strong>100%</strong><span>You</span></div>
      </div>
    </div>
  </div>

  <TodoApp v-else @back="showTodo = false" />
  
</template>

<script setup>
import { h, ref } from 'vue'
import { EditPen, ArrowRight } from '@element-plus/icons-vue'
import TodoApp from './components/TodoApp.vue'

const showTodo = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdf6e3;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  position: relative;
}

/* Soft blurred orbs for depth */
.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  animation: float 8s ease-in-out infinite;
}
.orb-1 { width: 420px; height: 420px; background: #f4c87a; top: -100px; left: -120px; animation-delay: 0s; }
.orb-2 { width: 320px; height: 320px; background: #e8965a; bottom: -80px; right: -80px; animation-delay: -3s; }
.orb-3 { width: 220px; height: 220px; background: #fde09a; top: 50%; left: 60%; animation-delay: -5s; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-24px) scale(1.04); }
}

/* Card */
.card {
  position: relative;
  z-index: 1;
  width: 720px;
  background: rgba(255, 252, 240, 0.72);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(210, 170, 100, 0.35);
  border-radius: 28px;
  padding: 52px 48px 44px;
  box-shadow: 0 32px 80px rgba(140, 90, 30, 0.14), 0 2px 8px rgba(140,90,30,0.08);
  text-align: center;
  animation: rise 0.7s cubic-bezier(.22,1,.36,1) both;
}
@keyframes rise {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(244, 180, 80, 0.2);
  border: 1px solid rgba(200, 140, 50, 0.3);
  color: #a06520;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 999px;
  margin-bottom: 28px;
}

/* Heading */
h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px;
  font-weight: 600;
  line-height: 1.1;
  color: #3d2800;
  margin: 0 0 16px;
}
h1 em {
  font-style: italic;
  color: #c47a20;
}

p {
  color: #7a5230;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
}

/* Divider */
:deep(.el-divider) { border-color: rgba(180, 130, 60, 0.2); margin: 28px 0; }

/* CTA Button */
.cta {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #d4880a, #e8a020);
  border: none;
  border-radius: 14px;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(200, 130, 20, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}
.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(200, 130, 20, 0.45);
  background: linear-gradient(135deg, #c07808, #d4900f);
}

/* Stats row */
.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 28px;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stat strong {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 600;
  color: #3d2800;
}
.stat span {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a07840;
}
.sep {
  width: 1px;
  height: 32px;
  background: rgba(180,130,60,0.25);
}
</style>