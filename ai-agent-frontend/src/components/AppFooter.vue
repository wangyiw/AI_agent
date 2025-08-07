<template>
  <footer class="app-footer">
    <div class="footer-bottom">
      <p>© {{ currentYear }} AI聊天助手 - 让AI为你服务</p>
    </div>
  </footer>
</template>
<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>
<style scoped>
.app-footer {
  background: transparent;
  padding: 32px 0 12px;
  color: #B0B8C9;
  width: 100%;
  text-align: center;
  font-size: 0.95rem;
  border: none;
  margin-top: 40px;
}
.footer-bottom p {
  margin: 0;
  color: #B0B8C9;
  font-size: 0.95rem;
  letter-spacing: 1px;
}
</style> 