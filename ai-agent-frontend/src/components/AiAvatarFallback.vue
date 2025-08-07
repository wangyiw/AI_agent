<template>
  <div class="ai-avatar-svg">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="#E3E8F0"/>
      <rect x="10" y="13" width="12" height="7" rx="3.5" fill="#B0B8C9"/>
      <circle cx="14" cy="17" r="1.5" fill="#2A3950"/>
      <circle cx="18" cy="17" r="1.5" fill="#2A3950"/>
      <rect x="14" y="21" width="4" height="2" rx="1" fill="#2A3950"/>
    </svg>
  </div>
</template>
<script setup>
defineProps({
  type: {
    type: String,
    default: 'default'
  }
})
</script>
<style scoped>
.ai-avatar-svg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: none;
}
</style> 