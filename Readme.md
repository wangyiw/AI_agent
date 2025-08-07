AI 伴游导览平台
项目简介
本项目是一个面向展馆、文旅场景的 AI 智能导览与聊天助手平台，支持多智能体对话、知识库问答、智能导览、文档/图片处理、Web搜索等功能。前后端分离，支持全屏极简聊天体验，适配 PC 和移动端。
架构图
graph TD
  FE[前端 (Vue3 + Vite)] --> BE[Spring Boot 后端]
  BE --> AI[AI 智能体/导览助手核心]
  AI --> KB[知识库/向量数据库]
  BE --> EXT[第三方AI模型/服务]
  BE --> FILE[文件/图片处理]
  BE --> WEB[Web搜索/爬虫]
  BE --> LOG[日志/监控]
  FE -.-> NGINX[nginx/静态服务器]
项目结构

技术栈
前端：Vue3、Vite、Pinia、Vue Router、现代CSS
后端：Spring Boot 3、WebFlux、SSE、Restful API
AI能力：多智能体（导览助手/超级智能体）、RAG知识库、向量数据库（PgVector）、第三方AI模型对接
工具/扩展：PDF生成、Web爬虫、终端操作、文件处理、图片搜索
部署：Docker、Nginx、静态资源分离
主要功能
AI智能导览助手：支持展馆/文旅场景的智能问答、导览、路线推荐、互动体验。
超级智能体：全能AI助手，支持多领域专业问答。
知识库问答：支持RAG、向量检索、文档知识增强。
多模态扩展：支持图片搜索、PDF生成、Web爬虫等。
全屏极简聊天体验：支持PC/移动端，气泡美观，体验流畅。
接口标准化：RESTful + SSE，易于二次开发和扩展。