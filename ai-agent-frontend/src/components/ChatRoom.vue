<template>
  <div class="chat-fullscreen-wrapper">
    <div class="chat-header">
      <svg class="chat-logo" viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#2A3950"/><rect x="9" y="13" width="14" height="7" rx="3.5" fill="#F4F6FA"/><circle cx="13" cy="17" r="1.5" fill="#2A3950"/><circle cx="19" cy="17" r="1.5" fill="#2A3950"/><rect x="13" y="21" width="6" height="2" rx="1" fill="#2A3950"/></svg>
      <span class="chat-title">AI {{ aiType === 'tour' ? '伴游助手' : '超级智能体' }}</span>
    </div>
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(msg, index) in messages" :key="index" class="message-row" :class="{ 'from-user': msg.isUser, 'from-ai': !msg.isUser }">
        <div v-if="!msg.isUser" class="avatar ai-avatar">
          <svg viewBox="0 0 32 32" width="36" height="36"><circle cx="16" cy="16" r="16" fill="#E3E8F0"/><rect x="10" y="13" width="12" height="7" rx="3.5" fill="#B0B8C9"/><circle cx="14" cy="17" r="1.5" fill="#2A3950"/><circle cx="18" cy="17" r="1.5" fill="#2A3950"/><rect x="14" y="21" width="4" height="2" rx="1" fill="#2A3950"/></svg>
        </div>
        <div v-else class="avatar user-avatar">
          <div class="user-initial">我</div>
        </div>
        <div class="message-bubble">
          <div class="message-content">
            {{ msg.content }}
            <span v-if="connectionStatus === 'connecting' && index === messages.length - 1 && !msg.isUser" class="typing-indicator">▋</span>
          </div>
          <div class="message-time">{{ formatTime(msg.time) }}</div>
        </div>
      </div>
    </div>
    <div class="chat-input-bar">
      <textarea
        v-model="inputMessage"
        @keydown.enter.prevent="sendMessage"
        placeholder="请输入消息..."
        class="input-box"
        :disabled="connectionStatus === 'connecting'"
      ></textarea>
      <button
        @click="sendMessage"
        class="send-button"
        :disabled="connectionStatus === 'connecting' || !inputMessage.trim()"
      >发送</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  connectionStatus: {
    type: String,
    default: 'disconnected'
  },
  aiType: {
    type: String,
    default: 'default'
  }
})
const emit = defineEmits(['send-message'])
const inputMessage = ref('')
const messagesContainer = ref(null)
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  emit('send-message', inputMessage.value)
  inputMessage.value = ''
}
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
watch(() => props.messages.length, () => {
  scrollToBottom()
})
watch(() => props.messages.map(m => m.content).join(''), () => {
  scrollToBottom()
})
onMounted(() => {
  scrollToBottom()
})
</script>
<style scoped>
.chat-fullscreen-wrapper {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #F4F6FA 0%, #E3E8F0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  overflow: hidden;
}
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 32px 0 16px 0;
  width: 100vw;
  justify-content: center;
}
.chat-logo {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(42,57,80,0.08);
}
.chat-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2A3950;
  letter-spacing: 1px;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 0 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: transparent;
  align-items: center;
}
.message-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
  max-width: 800px;
}
.from-user {
  flex-direction: row-reverse;
}
.from-ai {
  flex-direction: row;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #F4F6FA;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-avatar {
  background: #2A3950;
}
.user-initial {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message-bubble {
  background: #F4F6FA;
  color: #2A3950;
  border-radius: 18px 18px 18px 6px;
  padding: 14px 18px;
  font-size: 1rem;
  max-width: 70vw;
  min-width: 60px;
  box-shadow: 0 2px 8px rgba(42,57,80,0.04);
  word-break: break-word;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* 修正内容左对齐 */
  align-items: flex-start;
}
.from-user .message-bubble {
  background: #2A3950;
  color: #fff;
  border-radius: 18px 18px 6px 18px;
  /* 修正内容左对齐 */
  align-items: flex-start;
}
.message-content {
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  white-space: pre-wrap;
  /* 保证所有行左对齐 */
  text-align: left;
  width: 100%;
}
.message-time {
  font-size: 0.75rem;
  color: #B0B8C9;
  text-align: right;
}
.typing-indicator {
  display: inline-block;
  animation: blink 0.7s infinite;
  margin-left: 2px;
}
@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
.chat-input-bar {
  width: 100vw;
  background: #F4F6FA;
  border-top: 1px solid #E3E8F0;
  padding: 18px 0 18px 0;
  display: flex;
  gap: 12px;
  align-items: flex-end;
  z-index: 10;
  justify-content: center;
}
.input-box {
  flex: 1;
  border: none;
  border-radius: 16px;
  padding: 12px 16px;
  font-size: 1rem;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  background: #fff;
  color: #2A3950;
  resize: none;
  min-height: 36px;
  max-height: 80px;
  outline: none;
  box-shadow: 0 1px 4px rgba(42,57,80,0.04);
  transition: box-shadow 0.2s;
  max-width: 600px;
}
.input-box:focus {
  box-shadow: 0 2px 8px rgba(42,57,80,0.10);
}
.send-button {
  background: #2A3950;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 0 24px;
  font-size: 1rem;
  font-weight: 600;
  height: 40px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(42,57,80,0.04);
}
.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.send-button:hover:not(:disabled) {
  background: #1B2536;
}
@media (max-width: 600px) {
  .chat-header {
    padding: 16px 0 8px 0;
  }
  .chat-title {
    font-size: 1.1rem;
  }
  .message-row {
    max-width: 100vw;
  }
  .message-bubble {
    font-size: 0.95rem;
    padding: 10px 12px;
    max-width: 90vw;
  }
  .input-box {
    max-width: 90vw;
  }
}
</style> 