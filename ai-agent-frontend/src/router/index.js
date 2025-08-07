import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页 - AI智能体应用',
      description: 'AI智能体应用平台提供AI伴游助手和AI超级智能体服务，满足您的各种AI对话需求'
    }
  },
  {
    path: '/tour-master',
    name: 'TourMaster',
    component: () => import('../views/TourMaster.vue'),
    meta: {
      title: 'AI伴游助手 - AI伴游智能体应用',
      description: 'AI伴游助手是AI智能体应用平台的专业城市向导，提供个性化的出行规划和地方特色的伴游体验'
    }
  },
  {
    path: '/super-agent',
    name: 'SuperAgent',
    component: () => import('../views/SuperAgent.vue'),
    meta: {
      title: 'AI-Manus - AI智能体应用平台',
      description: 'AI-Manus是AI智能体应用平台的全能助手，能解答各类专业问题，提供精准建议和解决方案'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局导航守卫，设置文档标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router 