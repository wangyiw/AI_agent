<template>
  <div class="tour-master-fullscreen">
    <ChatRoom 
      :messages="messages" 
      :connection-status="connectionStatus"
      ai-type="tour"
      @send-message="sendMessage"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChatRoom from '../components/ChatRoom.vue'
import { chatWithTourApp } from '../api'
const messages = ref([])
const chatId = ref('')
const connectionStatus = ref('disconnected')
let eventSource = null
const generateChatId = () => {
  return 'tour_' + Math.random().toString(36).substring(2, 10)
}
const addMessage = (content, isUser) => {
  messages.value.push({
    content,
    isUser,
    time: new Date().getTime()
  })
}
const sendMessage = (message) => {
  addMessage(message, true)
  if (eventSource) {
    eventSource.close()
  }
  const aiMessageIndex = messages.value.length
  addMessage('', false)
  connectionStatus.value = 'connecting'
  eventSource = chatWithTourApp(message, chatId.value)
  eventSource.onmessage = (event) => {
    const data = event.data
    if (data && data !== '[DONE]') {
      if (aiMessageIndex < messages.value.length) {
        messages.value[aiMessageIndex].content += data
      }
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
  chatId.value = generateChatId()
  addMessage('欢迎来到AI伴游助手，请告诉我你的问题，我会尽力给予帮助和建议。', false)
})
onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
  }
})
</script>
<style scoped>
.tour-master-fullscreen {
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