# CampaignAgent

CampaignAgent is an AI-powered marketing operating system designed for
organizations, agencies, and marketing teams.

The project is being developed incrementally according to the documented
product vision, system architecture, feature specifications, database/API
design, and development roadmap.

## Project Status

Current phase:

**Phase 0 — Clean Foundation**

This phase focuses only on:

- Monorepo structure
- Frontend preservation
- FastAPI backend structure
- PostgreSQL/Supabase readiness
- Redis readiness
- Environment configuration
- Docker/local infrastructure
- Testing foundation
- Documentation structure
- Git hygiene
- Scalable separation of concerns

Business features are intentionally not implemented in this phase.

## Architecture

```text
CampaignAgent
│
├── frontend
│   └── Next.js
│
├── backend
│   └── FastAPI
│
├── PostgreSQL / Supabase
│
└── Redis