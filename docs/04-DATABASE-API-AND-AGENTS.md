# CampaignAgent --- Database, API and Agent Specification

## 1. Database Choice

Use **Supabase PostgreSQL** as the initial managed PostgreSQL platform.

Use PostgreSQL for:

-   Application data
-   Organizations
-   Users/memberships
-   Campaigns
-   Content
-   Integrations metadata
-   Analytics
-   Audit logs
-   Approval rules
-   Usage
-   Vector/RAG data

Use object storage for large files and generated assets.

Use Redis for queues/cache.

------------------------------------------------------------------------

## 2. Core Database Tables

### Identity / Organization

``` text
users
organizations
organization_members
roles
permissions
role_permissions
member_roles
```

### Client

``` text
clients
client_members
client_brand_profiles
client_settings
```

### Campaign

``` text
campaigns
campaign_briefs
campaign_strategies
campaign_audiences
campaign_assets
campaign_variants
campaign_events
```

### Content

``` text
contents
content_variants
content_approvals
content_versions
```

### Social

``` text
social_accounts
social_posts
social_post_metrics
content_calendar
```

### Advertising

``` text
ad_accounts
ad_campaigns
ad_sets
ads
ad_creatives
ad_metrics
```

### Knowledge / RAG

``` text
knowledge_bases
documents
document_versions
document_chunks
document_embeddings
```

### Analytics

``` text
metrics
metric_snapshots
conversions
revenue_events
analytics_sync_runs
```

### Automation

``` text
approval_requests
approval_rules
automation_policies
agent_runs
agent_actions
agent_action_results
```

### Integrations

``` text
integrations
oauth_connections
webhook_events
```

### Enterprise / Operations

``` text
notifications
audit_logs
reports
report_runs
subscriptions
usage_records
api_keys
```

------------------------------------------------------------------------

## 3. Common Fields

Most tenant-owned tables should include:

``` text
id
organization_id
client_id (when applicable)
created_by
created_at
updated_at
```

Additional fields should be added based on the domain.

Use UUIDs.

------------------------------------------------------------------------

## 4. Important Relationships

``` text
Organization
  ├── Members
  ├── Clients
  ├── Campaigns
  ├── Integrations
  ├── Knowledge Bases
  ├── Policies
  └── Audit Logs

Client
  ├── Brand Profile
  ├── Campaigns
  ├── Social Accounts
  ├── Ad Accounts
  ├── Documents
  └── Reports

Campaign
  ├── Strategy
  ├── Audiences
  ├── Contents
  ├── Creatives
  ├── Ads
  ├── Metrics
  ├── Approvals
  └── Agent Runs
```

------------------------------------------------------------------------

## 5. Multi-Tenant Security

Every request must establish:

``` text
authenticated_user
organization_context
client_context
role
permissions
```

Authorization sequence:

``` text
Authenticate
   ↓
Find organization membership
   ↓
Check role/permission
   ↓
Check client access
   ↓
Access resource
```

Never rely on frontend-only authorization.

------------------------------------------------------------------------

## 6. API Version

All APIs:

``` text
/api/v1/
```

### Organization

``` text
GET    /api/v1/organizations
POST   /api/v1/organizations
GET    /api/v1/organizations/{id}
PATCH  /api/v1/organizations/{id}
```

### Clients

``` text
GET    /api/v1/clients
POST   /api/v1/clients
GET    /api/v1/clients/{id}
PATCH  /api/v1/clients/{id}
DELETE /api/v1/clients/{id}
```

### Campaigns

``` text
GET    /api/v1/campaigns
POST   /api/v1/campaigns
GET    /api/v1/campaigns/{id}
PATCH  /api/v1/campaigns/{id}
POST   /api/v1/campaigns/{id}/research
POST   /api/v1/campaigns/{id}/generate
POST   /api/v1/campaigns/{id}/approve
POST   /api/v1/campaigns/{id}/execute
POST   /api/v1/campaigns/{id}/pause
```

### Content

``` text
POST   /api/v1/content/generate
GET    /api/v1/content
PATCH  /api/v1/content/{id}
POST   /api/v1/content/{id}/approve
```

### Creative

``` text
POST   /api/v1/creatives/generate
GET    /api/v1/creatives
POST   /api/v1/creatives/{id}/approve
```

### Knowledge

``` text
POST   /api/v1/knowledge/documents
GET    /api/v1/knowledge/documents
DELETE /api/v1/knowledge/documents/{id}
POST   /api/v1/knowledge/search
```

### Integrations

``` text
GET    /api/v1/integrations
POST   /api/v1/integrations/{provider}/connect
GET    /api/v1/integrations/{provider}/callback
POST   /api/v1/integrations/{id}/disconnect
```

### Analytics

``` text
GET /api/v1/analytics/overview
GET /api/v1/analytics/campaigns/{id}
GET /api/v1/analytics/platforms
POST /api/v1/analytics/sync
```

### Approvals

``` text
GET  /api/v1/approvals
POST /api/v1/approvals/{id}/approve
POST /api/v1/approvals/{id}/reject
POST /api/v1/approvals/{id}/request-changes
```

### Agent

``` text
POST /api/v1/agent/runs
GET  /api/v1/agent/runs/{id}
GET  /api/v1/agent/runs/{id}/actions
```

------------------------------------------------------------------------

## 7. Agent State

A LangGraph campaign state can conceptually contain:

``` text
organization_id
client_id
campaign_id
user_id

objective
product
audience
location
budget
platforms

research
audience_analysis
strategy
content
creatives

approval_status
policy_result
execution_result

analytics_context
optimization_candidates

errors
warnings
current_step
```

Do not store secrets in agent state.

------------------------------------------------------------------------

## 8. Agent Run Lifecycle

``` text
created
  ↓
running
  ↓
waiting_for_approval
  ↓
approved
  ↓
executing
  ↓
completed
```

Failure branches:

``` text
failed
cancelled
expired
```

Every run should be resumable where technically safe.

------------------------------------------------------------------------

## 9. Agent Action Model

An action should be structured.

Example:

``` json
{
  "type": "UPDATE_BUDGET",
  "target": "campaign_123",
  "parameters": {
    "new_daily_budget": 5000
  },
  "reason": "Configured optimization policy"
}
```

Then:

``` text
Action
 ↓
Schema validation
 ↓
Permission
 ↓
Policy
 ↓
Approval
 ↓
Execution
```

The LLM does not directly call arbitrary URLs.

------------------------------------------------------------------------

## 10. Approval Rules

Rules can include:

``` text
action_type
platform
budget_threshold
requires_approval
allowed_roles
risk_level
```

Example:

``` text
UPDATE_BUDGET
> ₹10,000
→ approval required
```

------------------------------------------------------------------------

## 11. Analytics Data Model

Normalize platform metrics internally.

Example:

``` text
metric_date
platform
campaign_id
ad_id
impressions
reach
clicks
spend
leads
conversions
revenue
```

Platform-specific raw payloads may be retained separately when necessary
for debugging/reconciliation.

------------------------------------------------------------------------

## 12. Webhook Processing

``` text
Provider
  ↓
Webhook Endpoint
  ↓
Signature Verification
  ↓
Store Raw Event
  ↓
Queue Job
  ↓
Normalize
  ↓
Update Metrics
  ↓
Trigger Relevant Analysis
```

Never trust an unsigned external webhook.

------------------------------------------------------------------------

## 13. Background Worker Pattern

``` text
FastAPI
  ↓
Redis Queue
  ↓
Worker
  ↓
Task
  ↓
Database
  ↓
Notification
```

Tasks should be idempotent whenever possible.

------------------------------------------------------------------------

## 14. Provider Gateway

### LLM

``` python
class LLMProvider:
    def generate(...)
    def generate_structured(...)
```

Initial implementation:

``` text
GroqProvider
```

Future:

``` text
OpenAIProvider
GeminiProvider
MultimodalProvider
```

### Image

``` python
class ImageProvider:
    def generate(...)
```

Initial/future providers can be added without changing the Creative
Agent.

------------------------------------------------------------------------

## 15. API Response Convention

Success:

``` json
{
  "data": {},
  "meta": {}
}
```

Error:

``` json
{
  "error": {
    "code": "CAMPAIGN_NOT_FOUND",
    "message": "Campaign was not found"
  }
}
```

Use stable error codes.

------------------------------------------------------------------------

## 16. Idempotency

For important execution APIs:

``` text
POST /campaigns/{id}/execute
```

support an idempotency key.

This prevents duplicate external campaign creation when a network retry
occurs.

------------------------------------------------------------------------

## 17. File Processing

``` text
Upload
 ↓
Validate type/size
 ↓
Store
 ↓
Create document record
 ↓
Background parse
 ↓
Chunk
 ↓
Embed
 ↓
Index
 ↓
Ready
```

Large processing should never happen inside the upload request.

------------------------------------------------------------------------

## 18. Usage Tracking

Track:

-   AI requests
-   Generated content
-   Generated images
-   Agent runs
-   Connected accounts
-   Campaigns
-   Storage
-   API requests

Usage belongs to the organization and can be aggregated for
billing/limits.
