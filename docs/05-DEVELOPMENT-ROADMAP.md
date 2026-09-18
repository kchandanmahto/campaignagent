# CampaignAgent --- Development Roadmap

## 1. Development Rule

Build the product in layers.

Do not attempt to implement the complete enterprise vision in one pass.

The final architecture is large, but the codebase should grow
incrementally while keeping interfaces stable.

------------------------------------------------------------------------

# Phase 0 --- Clean Foundation

## Goal

Turn the current prototype into a maintainable monorepo.

Target structure:

``` text
campaignagent/
├── frontend/
├── backend/
├── docs/
├── .gitignore
├── README.md
└── docker-compose.yml
```

Backend direction:

``` text
backend/
├── app/
│   ├── main.py
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── agents/
│   ├── integrations/
│   ├── workers/
│   └── db/
├── tests/
├── requirements.txt
└── .env.example
```

Frontend direction:

``` text
frontend/
├── app/
├── components/
├── lib/
├── hooks/
├── types/
├── public/
└── package.json
```

Do not commit:

``` text
node_modules/
.next/
venv/
.env
.env.local
```

------------------------------------------------------------------------

# Phase 1 --- Database + Authentication

## Build

-   Supabase PostgreSQL
-   Database migrations
-   Users
-   Organizations
-   Organization members
-   Roles
-   Permissions
-   Login
-   Signup
-   Session handling

## Completion

User can:

``` text
Signup
 ↓
Login
 ↓
Create Organization
 ↓
Invite member
 ↓
Select organization
```

------------------------------------------------------------------------

# Phase 2 --- Multi-Tenant Client Management

## Build

-   Client CRUD
-   Client workspace
-   Member access
-   Client settings
-   Brand profile

## Completion

An agency can safely manage multiple clients without mixing their data.

------------------------------------------------------------------------

# Phase 3 --- Campaign Core

## Build

-   Campaign builder
-   Campaign status
-   Campaign brief
-   Strategy storage
-   Audience storage
-   Budget
-   Platform selection
-   Campaign history

## Completion

User can create and manage campaigns without AI.

------------------------------------------------------------------------

# Phase 4 --- AI Campaign Agent

## Build

LangGraph workflow:

``` text
Input
 ↓
Research
 ↓
Audience
 ↓
Strategy
 ↓
Content
 ↓
Validation
 ↓
Result
```

Initial LLM:

**Groq**

Keep provider code behind an AI gateway.

## Completion

One request can create a complete structured campaign plan.

------------------------------------------------------------------------

# Phase 5 --- Brand Knowledge + RAG

## Build

-   Document upload
-   Object storage
-   Parsing
-   Chunking
-   Embeddings
-   pgvector
-   Retrieval
-   Client-scoped knowledge
-   Brand voice
-   Brand rules

## Completion

Campaign output uses approved client knowledge.

------------------------------------------------------------------------

# Phase 6 --- Content Studio

## Build

-   Ad copy
-   Headlines
-   CTAs
-   Social posts
-   Emails
-   Content variations
-   Editing
-   Version history
-   Approval

## Completion

Users can create, edit, compare, save and approve content.

------------------------------------------------------------------------

# Phase 7 --- Creative Studio

## Build

-   Creative brief
-   Image generation
-   Variations
-   Asset library
-   Brand assets
-   Creative approval

## Completion

A campaign can contain generated image creatives.

Future:

``` text
Video
Audio
Voice
Multimodal
```

Do not build these in the first implementation.

------------------------------------------------------------------------

# Phase 8 --- Approval + Policy Engine

## Build

Three modes:

``` text
Suggest Only
Human Approval
Autonomous
```

Build:

-   Approval requests
-   Approval history
-   Budget thresholds
-   Allowed actions
-   Platform restrictions
-   Role restrictions
-   Risk levels

## Completion

Every external action can be classified as:

``` text
Allowed Automatically
Requires Approval
Not Allowed
```

------------------------------------------------------------------------

# Phase 9 --- Social Media Manager

## Build

-   Social account connections
-   Content calendar
-   Post composer
-   Scheduling
-   Publishing
-   Drafts
-   Published history
-   Social metrics

Initial platform priority:

``` text
Instagram
Facebook
LinkedIn
```

Add additional platforms through adapters.

------------------------------------------------------------------------

# Phase 10 --- Ads Integrations

## First

### Meta Ads

Build:

-   OAuth/account connection
-   Account discovery
-   Campaign creation
-   Ad set/ad handling where supported
-   Creative attachment
-   Pause/resume
-   Metrics sync

### Google Ads

Then:

-   OAuth
-   Customer account
-   Campaign operations
-   Metrics

### Later

-   LinkedIn Ads
-   YouTube/Google ecosystem

Important: platform APIs, permissions, review requirements, account
eligibility, and available capabilities can change. Treat each
integration as a separate adapter and verify the provider's current
official requirements before production launch.

------------------------------------------------------------------------

# Phase 11 --- Analytics Platform

## Build

-   Metric normalization
-   Platform sync
-   Campaign dashboard
-   Creative analytics
-   Audience analytics
-   Funnel
-   Spend
-   Leads
-   Conversions
-   Revenue
-   ROAS

## Completion

User can view marketing performance across connected platforms from one
dashboard.

------------------------------------------------------------------------

# Phase 12 --- AI Analytics Agent

## Build

Questions such as:

``` text
What changed?
Why might it have changed?
Which campaign needs attention?
Which creative should be tested?
Where is spend concentrated?
```

AI output format:

``` text
Observed
Interpretation
Recommendation
Possible Action
```

Never present a model-generated explanation as a measured fact unless
supported by data.

------------------------------------------------------------------------

# Phase 13 --- Optimization Agent

## Build

``` text
Metrics
 ↓
Detect anomaly/opportunity
 ↓
Generate action
 ↓
Policy check
 ↓
Approval or auto
 ↓
Execute
 ↓
Record result
```

Initial actions:

-   Pause allowed weak variants
-   Adjust budget within limits
-   Create creative variation
-   Create headline variation
-   Change schedule where supported

------------------------------------------------------------------------

# Phase 14 --- Autonomous Marketing Loop

Final Level-4 workflow:

``` text
Research
 ↓
Plan
 ↓
Create
 ↓
Validate
 ↓
Publish
 ↓
Monitor
 ↓
Analyze
 ↓
Decide
 ↓
Policy Check
 ↓
Execute
 ↓
Measure Again
```

This should be implemented as controlled autonomy, not unrestricted AI
access.

------------------------------------------------------------------------

# Phase 15 --- Reporting

## Build

-   Weekly reports
-   Monthly reports
-   Campaign reports
-   Client reports
-   Executive reports
-   PDF/CSV export
-   Branded reports

------------------------------------------------------------------------

# Phase 16 --- Notifications + Audit

## Build

Notifications:

-   Approval
-   Failure
-   Budget threshold
-   Performance anomaly
-   Integration failure
-   Optimization

Audit:

``` text
actor
action
resource
before
after
reason
timestamp
request_id
```

Record both human and AI actions.

------------------------------------------------------------------------

# Phase 17 --- Enterprise Permissions

## Build

Default roles:

``` text
Owner
Admin
Marketing Manager
Content Writer
Analyst
Viewer
```

Then:

-   Custom roles
-   Permission matrix
-   Client-level access
-   Platform-level access
-   Action-level permissions

------------------------------------------------------------------------

# Phase 18 --- Billing + Usage

## Build

Track:

-   Users
-   Clients
-   Campaigns
-   AI usage
-   Image usage
-   Agent runs
-   Storage
-   API calls

Plans can later be:

``` text
Professional
Business
Enterprise
```

Enterprise can support:

-   Higher limits
-   Advanced permissions
-   Custom integrations
-   SSO
-   Custom retention
-   Contract-based pricing

------------------------------------------------------------------------

# Phase 19 --- Enterprise Security

Before commercial production:

-   Production CORS
-   Rate limits
-   Secure secrets
-   OAuth security
-   Webhook verification
-   File validation
-   Audit logs
-   Database backups
-   Monitoring
-   Error tracking
-   Dependency scanning
-   Secret scanning
-   Access reviews
-   Data retention policy
-   Incident response process

Future enterprise capabilities:

-   SSO
-   SAML/OIDC
-   SCIM
-   Advanced compliance controls

Do not claim a compliance certification unless the required
audit/certification has actually been completed.

------------------------------------------------------------------------

# Phase 20 --- Testing

## Backend

-   Unit tests
-   API tests
-   Authorization tests
-   Tenant-isolation tests
-   Integration tests

## AI

-   Structured-output tests
-   Prompt regression tests
-   Brand-context tests
-   Hallucination/grounding checks
-   Policy tests
-   Agent workflow tests

## Frontend

-   Component tests
-   Form validation
-   Permission-based UI tests
-   Error states
-   Loading states

## Integrations

-   Mock provider tests
-   OAuth tests
-   Webhook tests
-   Retry/idempotency tests

------------------------------------------------------------------------

# Phase 21 --- Production Readiness

Checklist:

``` text
[ ] Authentication
[ ] Multi-tenancy
[ ] RBAC
[ ] Database migrations
[ ] Backups
[ ] Monitoring
[ ] Logging
[ ] Rate limiting
[ ] Secrets management
[ ] Error handling
[ ] Queue retries
[ ] Idempotency
[ ] Webhook verification
[ ] Integration failure handling
[ ] AI policy engine
[ ] Approval workflow
[ ] Audit logs
[ ] Usage limits
[ ] Security review
[ ] Load testing
[ ] End-to-end testing
```

------------------------------------------------------------------------

# Phase 22 --- Deployment

Only after the application is stable.

Planned:

``` text
Next.js
   ↓
Vercel

FastAPI
   ↓
Production backend

PostgreSQL
   ↓
Supabase

Redis
   ↓
Managed Redis

Object Storage
   ↓
Managed storage

Monitoring
   ↓
Production observability
```

Do not deploy the current prototype prematurely.

------------------------------------------------------------------------

# 23. Definition of Done for the Final Product

CampaignAgent is commercially ready only when a real organization can:

``` text
Create account
 ↓
Create organization
 ↓
Invite team
 ↓
Create clients
 ↓
Configure brand knowledge
 ↓
Connect marketing accounts
 ↓
Create campaign
 ↓
Run AI research
 ↓
Generate strategy
 ↓
Generate content
 ↓
Generate creatives
 ↓
Review/approve
 ↓
Publish
 ↓
Collect metrics
 ↓
Analyze
 ↓
Optimize
 ↓
Generate client report
```

while the system maintains:

-   tenant isolation
-   permission enforcement
-   audit history
-   configurable autonomy
-   failure recovery
-   secure integrations
-   observable background jobs

------------------------------------------------------------------------

# 24. Implementation Priority

Do not build based only on the number of features.

Build in this order:

``` text
Foundation
   ↓
Multi-tenancy
   ↓
Campaign Core
   ↓
AI
   ↓
Knowledge
   ↓
Content
   ↓
Creative
   ↓
Approval
   ↓
Social
   ↓
Ads
   ↓
Analytics
   ↓
Optimization
   ↓
Autonomy
   ↓
Enterprise
```

The objective is to reach a reliable end-to-end workflow before adding
secondary features.

------------------------------------------------------------------------

# 25. Final Product Architecture

``` text
                         CampaignAgent
                              │
             ┌────────────────┼────────────────┐
             │                │                │
           PLAN             CREATE          EXECUTE
             │                │                │
        Research           Content            Ads
        Audience           Images            Social
        Strategy           Creative          Schedule
             │                │                │
             └────────────────┼────────────────┘
                              │
                           APPROVAL
                              │
                         POLICY ENGINE
                              │
                           PUBLISH
                              │
                          ANALYTICS
                              │
                       AI OPTIMIZATION
                              │
                        AUTONOMOUS LOOP
                              │
                           REPORTING
```

This document set is the source of truth for implementation. Any new
feature should first be checked against these architecture, security,
tenancy, approval, and autonomy rules.
