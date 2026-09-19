# CampaignAgent

> AI-powered Marketing Operating System for organizations, agencies, and modern marketing teams.

CampaignAgent is an AI-powered marketing operating system designed to help organizations, agencies, and marketing teams manage campaigns, content, creative assets, knowledge, analytics, approvals, and marketing workflows from a unified platform.

The project is being developed incrementally according to the documented product vision, system architecture, feature specifications, database/API design, and development roadmap.

---

## 🚀 Project Status

**Current Phase: Phase 0 — Clean Foundation**

CampaignAgent is currently being built as a scalable enterprise-grade platform.

The current foundation focuses on:

- Monorepo architecture
- Next.js frontend foundation
- FastAPI backend foundation
- PostgreSQL / Supabase readiness
- Redis readiness
- Environment configuration
- Docker/local infrastructure
- Testing foundation
- Documentation structure
- Git hygiene
- Scalable separation of concerns
- Responsive frontend UI foundation
- Reusable frontend design system

Business automation, AI agents, external integrations, billing, and autonomous execution are intentionally being implemented incrementally according to the development roadmap.

---

# 🎯 Vision

CampaignAgent aims to provide a unified operating layer for modern marketing teams.

The long-term platform is designed to bring together:

- Campaign management
- AI-powered marketing workflows
- Audience research
- Marketing strategy
- Content generation
- Creative asset management
- Brand management
- Knowledge and RAG
- Approval workflows
- Social media integrations
- Advertising integrations
- Marketing analytics
- Reporting
- Notifications
- Audit logs
- Usage tracking
- Enterprise permissions
- Multi-tenant workspaces

The platform is designed around **human-in-the-loop AI**, controlled execution, structured actions, permissions, policies, approvals, and auditability.

---

# 🏗️ Architecture

CampaignAgent follows a modular monolith architecture initially, allowing the system to remain simple to develop while maintaining clear boundaries for future scalability.

```text
CampaignAgent
│
├── frontend/
│   └── Next.js
│
├── backend/
│   └── FastAPI
│
├── docs/
│   ├── 01-PRODUCT-VISION.md
│   ├── 02-SYSTEM-ARCHITECTURE.md
│   ├── 03-FEATURES-AND-USER-FLOWS.md
│   ├── 04-DATABASE-API-AND-AGENTS.md
│   └── 05-DEVELOPMENT-ROADMAP.md
│
├── PostgreSQL / Supabase
│
├── Redis
│
├── Docker
│
└── GitHub