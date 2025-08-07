<template>
  <div class="super-agent-fullscreen">
    <ChatRoom 
      :messages="messages" 
      :connection-status="connectionStatus"
      ai-type="super"
      @send-message="sendMessage"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChatRoom from '../components/ChatRoom.vue'
import { chatWithManus } from '../api'
const messages = ref([])
const connectionStatus = ref('disconnected')
let eventSource = null
const addMessage = (content, isUser, type = '') => {
  messages.value.push({
    content,
    isUser,
    type,
    time: new Date().getTime()
  })
}
const sendMessage = (message) => {
  addMessage(message, true, 'user-question')
  if (eventSource) {
    eventSource.close()
  }
  connectionStatus.value = 'connecting'
  eventSource = chatWithManus(message)
  eventSource.onmessage = (event) => {
    const data = event.data
    if (data && data !== '[DONE]') {
      if (messages.value.length === 0 || messages.value[messages.value.length - 1].isUser) {
        addMessage('', false, 'ai-answer')
      }
      messages.value[messages.value.length - 1].content += data
    }
    if (data === '[DONE]') {
      connectionStatus.value = 'disconnected'
      eventSource.close()
    }
  }
  eventSource.onerror = (error) => {
    connectionStatus.value = 'error'
    eventSource.close()
  }
}
onMounted(() => {
  addMessage('你好，我是AI超级智能体。我可以解答各类问题，提供专业建议，请问有什么可以帮助你的吗？', false)
})
onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
  }
})
</script>
<style scoped>
.super-agent-fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #F4F6FA 0%, #E3E8F0 100%);
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
}
</style> 