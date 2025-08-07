<template>
  <div class="home-container">
    <div class="header">
      <div class="logo-title">
        <svg class="main-logo" viewBox="0 0 48 48" width="48" height="48">
          <circle cx="24" cy="24" r="24" fill="#E3E8F0"/>
          <path d="M24 10c-4.5 0-8 3.5-8 8 0 4.2 3.2 7.7 7.2 8l.8.1.8-.1C28.8 25.7 32 22.2 32 18c0-4.5-3.5-8-8-8zm0 2c3.3 0 6 2.7 6 6 0 3.2-2.5 5.8-5.6 6l-.4 0-.4 0C20.5 23.8 18 21.2 18 18c0-3.3 2.7-6 6-6zm0 10a2 2 0 110-4 2 2 0 010 4z" fill="#2A3950"/>
          <rect x="20" y="28" width="8" height="2" rx="1" fill="#2A3950"/>
          <rect x="22" y="32" width="4" height="2" rx="1" fill="#2A3950"/>
        </svg>
        <span class="platform-title">AI 伴游导览平台</span>
      </div>
      <p class="subtitle">让AI陪你探索世界</p>
    </div>
    <div class="apps-container">
      <div class="app-card" @click="navigateTo('/tour-master')">
        <div class="app-icon">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="20" fill="#D1E9FF"/>
            <path d="M20 12c-3 0-6 2.5-6 6 0 3.2 2.7 5.7 6 6 3.3-0.3 6-2.8 6-6 0-3.5-3-6-6-6zm0 2c2.2 0 4 1.8 4 4 0 2.1-1.7 3.8-4 4-2.3-0.2-4-1.9-4-4 0-2.2 1.8-4 4-4z" fill="#2A3950"/>
            <rect x="16" y="26" width="8" height="2" rx="1" fill="#2A3950"/>
          </svg>
        </div>
        <div class="app-info">
          <div class="app-title">伴游助手</div>
          <div class="app-desc">智能旅行问答，导览陪伴</div>
        </div>
        <div class="app-button">
          <span class="btn-text">进入</span>
          <span class="btn-icon">→</span>
        </div>
      </div>
      <div class="app-card" @click="navigateTo('/super-agent')">
        <div class="app-icon">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="20" fill="#E3E8F0"/>
            <rect x="13" y="16" width="14" height="7" rx="3.5" fill="#B0B8C9"/>
            <circle cx="17" cy="20" r="1.5" fill="#2A3950"/>
            <circle cx="23" cy="20" r="1.5" fill="#2A3950"/>
            <rect x="17" y="25" width="6" height="2" rx="1" fill="#2A3950"/>
          </svg>
        </div>
        <div class="app-info">
          <div class="app-title">超级智能体</div>
          <div class="app-desc">全能AI助手，专业解答</div>
        </div>
        <div class="app-button">
          <span class="btn-text">进入</span>
          <span class="btn-icon">→</span>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import AppFooter from '../components/AppFooter.vue'
const router = useRouter()
const navigateTo = (path) => {
  router.push(path)
}
</script>
<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #F4F6FA 0%, #E3E8F0 100%);
  align-items: center;
  justify-content: flex-start;
}
.header {
  padding: 56px 0 32px;
  text-align: center;
}
.logo-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}
.main-logo {
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(42,57,80,0.08);
}
.platform-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2A3950;
  letter-spacing: 1px;
}
.subtitle {
  font-size: 1.1rem;
  color: #6B7685;
  margin-top: 8px;
}
.apps-container {
  display: flex;
  gap: 40px;
  margin: 40px 0 0 0;
  flex-wrap: wrap;
  justify-content: center;
}
.app-card {
  width: 320px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px 0 rgba(42,57,80,0.08);
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.app-card:hover {
  box-shadow: 0 8px 32px 0 rgba(42,57,80,0.16);
  transform: translateY(-4px) scale(1.03);
}
.app-icon {
  margin-bottom: 18px;
}
.app-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2A3950;
  margin-bottom: 8px;
}
.app-desc {
  font-size: 1rem;
  color: #6B7685;
  margin-bottom: 18px;
}
.app-button {
  background: #2A3950;
  color: #fff;
  padding: 10px 28px;
  border-radius: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  margin-top: auto;
  transition: background 0.2s;
}
.app-button:hover {
  background: #1B2536;
}
.btn-icon {
  font-size: 1.2rem;
}
@media (max-width: 600px) {
  .apps-container {
    flex-direction: column;
    gap: 24px;
  }
  .app-card {
    width: 90vw;
    min-width: 0;
    padding: 24px 10px 18px 10px;
  }
  .platform-title {
    font-size: 1.3rem;
  }
}
</style> 