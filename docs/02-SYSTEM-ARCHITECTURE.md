# CampaignAgent --- Enterprise System Architecture

## 1. Architecture Principles

1.  Multi-tenant from day one.
2.  API-first backend.
3.  AI is modular, not hard-coded into business logic.
4.  External integrations are isolated behind provider adapters.
5.  Every autonomous action passes through a policy engine.
6.  Long-running AI work runs through background jobs.
7.  All important actions are auditable.
8.  PostgreSQL is the source of truth.
9.  Initial LLM provider is Groq.
10. The AI gateway must allow future multimodal providers.

------------------------------------------------------------------------

## 2. Recommended Stack

### Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   App Router
-   Server/client components where appropriate

### Backend

-   Python
-   FastAPI
-   Pydantic
-   SQLAlchemy
-   Alembic

### AI

-   LangGraph
-   Groq
-   Structured outputs / schema validation
-   Provider abstraction for future models

### Database

**Supabase PostgreSQL** is the recommended initial platform.

Why:

-   Managed PostgreSQL
-   Authentication options
-   Storage
-   Realtime capabilities
-   PostgreSQL extensions including vector capabilities
-   Simple developer workflow

Use PostgreSQL as the source of truth. Keep the application portable so
a future migration to another managed PostgreSQL provider remains
possible.

### Infrastructure

-   Redis for cache/queues
-   Background workers
-   Object storage for documents and creative assets
-   Vercel for frontend later
-   Render or another production platform for backend later

Deployment is intentionally a later phase.

------------------------------------------------------------------------

## 3. High-Level Architecture

``` text
                    Next.js Web App
                          │
                    HTTPS / REST
                          │
                    FastAPI API
                          │
             ┌────────────┴────────────┐
             │                         │
       Core Services              AI Gateway
             │                         │
             │                    LangGraph
             │                         │
             │              ┌──────────┼──────────┐
             │              │          │          │
             │          Research    Strategy   Content
             │              │          │          │
             │              └──────────┼──────────┘
             │                         │
             │                   Creative Agent
             │                         │
             └──────────────┬──────────┘
                            │
                     Policy Engine
                            │
                    Execution Engine
                            │
              ┌─────────────┼─────────────┐
              │             │             │
            Meta          Google       Social
              │             │             │
              └─────────────┼─────────────┘
                            │
                      Analytics Sync
                            │
                     PostgreSQL
```

------------------------------------------------------------------------

## 4. Core Backend Services

Suggested services:

``` text
auth_service
organization_service
client_service
campaign_service
content_service
creative_service
brand_service
knowledge_service
approval_service
policy_service
integration_service
social_service
ads_service
analytics_service
report_service
notification_service
audit_service
billing_service
usage_service
```

Do not create a separate microservice for each service initially. Keep
them as modular backend packages inside one deployable application.
Split services only when scale or operational needs justify it.

------------------------------------------------------------------------

## 5. AI Architecture

``` text
                    AI Gateway
                        │
                 Model Provider
                        │
                      Groq
                        │
                  LangGraph
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
 Research          Strategy           Content
 Agent             Agent              Agent
      │                 │                 │
      └─────────────────┼─────────────────┘
                        │
                   Creative Agent
                        │
                 Approval / Policy
                        │
                  Execution Agent
                        │
                 Analytics Agent
                        │
                Optimization Agent
```

------------------------------------------------------------------------

## 6. Agent Responsibilities

### Research Agent

Input:

-   Industry
-   Product
-   Audience
-   Location
-   Campaign objective

Output:

-   Market insights
-   Audience signals
-   Competitor observations
-   Opportunity areas
-   Research sources/data where available

### Audience Agent

Output:

-   Segments
-   Personas
-   Pain points
-   Motivations
-   Buying intent
-   Messaging angles

### Strategy Agent

Output:

-   Campaign objective
-   Channel strategy
-   Offer
-   Message
-   Funnel
-   Budget plan
-   KPI plan

### Content Agent

Output:

-   Headlines
-   Ad copy
-   Captions
-   Emails
-   CTAs
-   Variations

### Creative Agent

Output:

-   Creative briefs
-   Image prompts
-   Generated image assets
-   Variations

### Approval Agent

Checks:

-   Required approvals
-   Organization policies
-   Budget thresholds
-   Brand rules
-   Action risk

### Execution Agent

Only performs approved/allowed actions through integration adapters.

### Analytics Agent

Turns synchronized metrics into structured insights.

### Optimization Agent

Detects opportunities and creates proposed actions.

### Report Agent

Creates internal and client-facing reports.

------------------------------------------------------------------------

## 7. Agent Safety Pattern

Never allow an LLM to directly execute arbitrary external API actions.

Use:

``` text
LLM Decision
    ↓
Structured Action
    ↓
Schema Validation
    ↓
Permission Check
    ↓
Policy Check
    ↓
Approval Check
    ↓
Execution Adapter
    ↓
External API
    ↓
Audit Log
```

------------------------------------------------------------------------

## 8. Background Jobs

Long operations must not block API requests.

Examples:

``` text
campaign.research
campaign.generate
creative.generate
document.process
embedding.create
social.publish
ads.sync
analytics.sync
report.generate
optimization.analyze
```

Redis-backed queues/workers should process these jobs.

Every job should have:

-   ID
-   type
-   status
-   retries
-   timestamps
-   error information
-   organization ID
-   user/request source

------------------------------------------------------------------------

## 9. Knowledge / RAG Architecture

``` text
Document
   ↓
Upload
   ↓
Object Storage
   ↓
Parser
   ↓
Chunking
   ↓
Embeddings
   ↓
PostgreSQL + pgvector
   ↓
Retriever
   ↓
Brand Context
   ↓
Agent
```

Knowledge must be scoped by:

``` text
organization_id
client_id
knowledge_base_id
```

No cross-client retrieval.

------------------------------------------------------------------------

## 10. External Integration Architecture

Never mix Meta/Google-specific logic into campaign business logic.

Use adapters:

``` text
IntegrationManager
│
├── MetaAdapter
├── GoogleAdsAdapter
├── LinkedInAdapter
├── InstagramAdapter
├── YouTubeAdapter
└── CustomWebhookAdapter
```

Each adapter exposes normalized internal operations such as:

``` text
connect()
disconnect()
get_accounts()
create_campaign()
update_campaign()
pause_campaign()
get_campaign_metrics()
publish_content()
```

Provider-specific differences remain inside adapters.

------------------------------------------------------------------------

## 11. OAuth / Secrets

External account connections should use OAuth where the provider
supports it.

Store:

-   provider
-   account ID
-   encrypted token/credential reference
-   scopes
-   expiry
-   refresh state
-   connection status

Never store credentials in:

-   Git
-   source code
-   frontend
-   `.env` committed to GitHub
-   browser local storage

------------------------------------------------------------------------

## 12. API Design

Version the backend:

``` text
/api/v1/
```

Example:

``` text
POST   /api/v1/auth/...
GET    /api/v1/organizations
POST   /api/v1/organizations
GET    /api/v1/clients
POST   /api/v1/clients
GET    /api/v1/campaigns
POST   /api/v1/campaigns
POST   /api/v1/campaigns/{id}/generate
POST   /api/v1/campaigns/{id}/approve
POST   /api/v1/campaigns/{id}/execute
GET    /api/v1/analytics
POST   /api/v1/knowledge/documents
POST   /api/v1/integrations/{provider}/connect
POST   /api/v1/webhooks/{provider}
GET    /api/v1/audit-logs
```

------------------------------------------------------------------------

## 13. Multi-Tenancy

Every organization-owned table should carry an organization scope.

Typical hierarchy:

``` text
Organization
    ↓
Client
    ↓
Campaign
    ↓
Assets / Ads / Posts / Analytics
```

Every backend query must enforce the current organization context.

Never trust organization IDs sent by the browser without authorization
checks.

------------------------------------------------------------------------

## 14. Security Architecture

Initial requirements:

-   Secure authentication
-   RBAC
-   Organization isolation
-   Object-level authorization
-   Input validation
-   Rate limiting
-   Secure cookies/tokens
-   CSRF strategy where applicable
-   CORS restriction in production
-   Webhook signature validation
-   Encrypted integration secrets
-   Audit logs
-   Secure file uploads
-   Malware/content checks for uploaded files where appropriate
-   Dependency and secret scanning
-   Production logging without sensitive data

Enterprise-ready later:

-   SSO
-   SAML/OIDC
-   SCIM
-   Advanced retention policies
-   Dedicated enterprise environments where required

------------------------------------------------------------------------

## 15. Observability

Track:

-   API latency
-   Error rate
-   Job failures
-   AI latency
-   Token/usage estimates
-   Integration failures
-   External API rate-limit errors
-   Database health
-   Queue depth
-   Agent decisions
-   Autonomous actions

Logs should contain correlation IDs so one campaign execution can be
traced end-to-end.

------------------------------------------------------------------------

## 16. Future Multimodal Architecture

Current:

``` text
Text Request → Groq → Structured Output
```

Future:

``` text
AI Gateway
│
├── Text Model Provider
├── Multimodal Model Provider
├── Image Provider
├── Video Provider
└── Audio Provider
```

Agents should depend on the gateway interface, not a specific vendor
SDK.
