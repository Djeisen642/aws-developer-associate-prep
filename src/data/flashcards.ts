import type { Flashcard } from './types';

export const FLASHCARDS: Flashcard[] = [
  // Development
  {
    id: 'fc-dev-1',
    domain: 'development',
    front: 'Lambda: Reserved concurrency vs Provisioned concurrency',
    back: 'Reserved = caps/guarantees max concurrent executions for a function (a ceiling, can still cold start). Provisioned = pre-warms execution environments so invocations skip cold starts entirely.',
  },
  {
    id: 'fc-dev-2',
    domain: 'development',
    front: 'DynamoDB: LSI vs GSI',
    back: 'LSI: same partition key as base table, different sort key; must be created with the table; shares table throughput. GSI: different partition/sort key entirely; own throughput; can be added anytime.',
  },
  {
    id: 'fc-dev-3',
    domain: 'development',
    front: 'SQS Standard vs FIFO',
    back: 'Standard: at-least-once delivery, best-effort ordering, near-unlimited throughput. FIFO: exactly-once processing, strict ordering, throughput limited (or higher with batching), queue name must end in .fifo.',
  },
  {
    id: 'fc-dev-4',
    domain: 'development',
    front: 'SNS vs SQS',
    back: 'SNS = pub/sub push messaging to many subscribers (fan-out) with no storage/polling. SQS = a durable pull-based queue for decoupling producers/consumers with message persistence.',
  },
  {
    id: 'fc-dev-5',
    domain: 'development',
    front: 'Kinesis Data Streams vs Firehose',
    back: 'Data Streams: you manage shards/consumers, low-latency custom processing (~200ms). Firehose: fully managed delivery straight to S3/Redshift/OpenSearch/Splunk, near real-time, no shard management.',
  },
  {
    id: 'fc-dev-6',
    domain: 'development',
    front: 'Cognito User Pools vs Identity Pools',
    back: 'User Pools: user directory, sign-up/sign-in, issues JWTs. Identity Pools: exchange identity tokens (from user pools, social IdPs, etc.) for temporary AWS IAM credentials via STS.',
  },
  {
    id: 'fc-dev-7',
    domain: 'development',
    front: 'API Gateway: REST API vs HTTP API',
    back: 'HTTP API: lower cost, lower latency, simpler feature set, JWT authorizers. REST API: full feature set — request validation, API keys/usage plans, caching, WAF integration, private endpoints.',
  },
  {
    id: 'fc-dev-8',
    domain: 'development',
    front: 'Lambda Layers',
    back: 'A way to package shared libraries, custom runtimes, or dependencies separately from your function code so multiple functions can reuse them and keep deployment packages smaller.',
  },

  // Security
  {
    id: 'fc-sec-1',
    domain: 'security',
    front: 'Envelope encryption (KMS)',
    back: 'Data is encrypted with a data key (DEK); the DEK itself is then encrypted by a KMS customer master key (CMK). Only the small encrypted DEK is sent to/from KMS, keeping bulk data local.',
  },
  {
    id: 'fc-sec-2',
    domain: 'security',
    front: 'Secrets Manager vs SSM Parameter Store',
    back: 'Secrets Manager: built-in automatic rotation (native for RDS/Redshift/DocumentDB), costs per secret. Parameter Store: free tier for standard params, supports secure strings via KMS, no native rotation Lambda templates (but can be scripted).',
  },
  {
    id: 'fc-sec-3',
    domain: 'security',
    front: 'S3 encryption options: SSE-S3 vs SSE-KMS vs SSE-C',
    back: 'SSE-S3: AWS-owned/managed keys, simplest. SSE-KMS: customer-managed CMK in KMS, audit trail via CloudTrail, request quota limits apply. SSE-C: customer supplies the key per-request; AWS never stores it.',
  },
  {
    id: 'fc-sec-4',
    domain: 'security',
    front: 'IAM Role vs IAM User',
    back: 'User: a persistent identity with long-term credentials for a person/service. Role: an identity assumed temporarily (via STS) with short-lived credentials — no long-term secrets, ideal for EC2/Lambda/cross-account access.',
  },
  {
    id: 'fc-sec-5',
    domain: 'security',
    front: 'Identity-based vs Resource-based policies',
    back: 'Identity-based: attached to a user/group/role, defines what that identity can do. Resource-based: attached to the resource itself (e.g., S3 bucket policy, SQS queue policy), can grant access to other accounts/principals directly.',
  },
  {
    id: 'fc-sec-6',
    domain: 'security',
    front: 'STS AssumeRole',
    back: 'Returns temporary security credentials (access key, secret key, session token) that let a principal act as the assumed role, commonly used for cross-account access and federated identities.',
  },
  {
    id: 'fc-sec-7',
    domain: 'security',
    front: 'VPC Gateway Endpoint vs Interface Endpoint',
    back: 'Gateway endpoint: free, route-table based, only for S3 and DynamoDB. Interface endpoint: an ENI with a private IP (powered by PrivateLink), supports most other AWS services, billed hourly + per GB.',
  },
  {
    id: 'fc-sec-8',
    domain: 'security',
    front: 'CORS',
    back: 'Cross-Origin Resource Sharing — a browser security mechanism requiring the server to explicitly allow (via Access-Control-Allow-Origin and related headers) requests originating from a different domain.',
  },

  // Deployment
  {
    id: 'fc-dep-1',
    domain: 'deployment',
    front: 'CodeDeploy: In-place vs Blue/Green',
    back: 'In-place: updates the app directly on existing instances (some downtime/reduced capacity). Blue/green: provisions a brand-new environment, shifts traffic over, keeps the old one available for instant rollback.',
  },
  {
    id: 'fc-dep-2',
    domain: 'deployment',
    front: 'appspec.yml vs buildspec.yml',
    back: 'appspec.yml (CodeDeploy): defines files to copy and lifecycle hooks (BeforeInstall, AfterInstall, ApplicationStart, etc.). buildspec.yml (CodeBuild): defines build phases/commands and output artifacts.',
  },
  {
    id: 'fc-dep-3',
    domain: 'deployment',
    front: 'Elastic Beanstalk deployment policies',
    back: 'All-at-once (fast, downtime), Rolling (batch by batch, reduced capacity), Rolling with additional batch (maintains full capacity), Immutable (new ASG, safest rollback), Blue/Green (swap environment URLs, manual).',
  },
  {
    id: 'fc-dep-4',
    domain: 'deployment',
    front: 'CloudFormation Change Sets',
    back: 'A preview of what a stack update will actually do (create/modify/replace resources) before you execute it — critical for catching accidental resource replacement (e.g., a DB that would be recreated).',
  },
  {
    id: 'fc-dep-5',
    domain: 'deployment',
    front: 'Lambda deployment: Alias + weighted traffic shifting',
    back: 'An alias points to one or two function versions with a traffic weight split (e.g., 90/10). CodeDeploy can automate canary/linear shifts between versions with CloudWatch-alarm-triggered rollback.',
  },
  {
    id: 'fc-dep-6',
    domain: 'deployment',
    front: 'ECS Launch Types: EC2 vs Fargate',
    back: 'EC2: you manage/provision the underlying EC2 instances (cluster capacity). Fargate: serverless — AWS manages the infrastructure; you just define CPU/memory per task.',
  },
  {
    id: 'fc-dep-7',
    domain: 'deployment',
    front: 'SAM (Serverless Application Model)',
    back: 'An extension of CloudFormation with shorthand syntax for serverless resources (AWS::Serverless::Function, Api, SimpleTable). `sam build`, `sam deploy` compile and package into a full CFN template.',
  },
  {
    id: 'fc-dep-8',
    domain: 'deployment',
    front: 'CodePipeline artifacts',
    back: 'Output from one stage (e.g., Source or Build) stored in an S3 artifact bucket and passed as input to the next stage, chaining source → build → deploy actions together.',
  },

  // Troubleshooting
  {
    id: 'fc-tr-1',
    domain: 'troubleshooting',
    front: 'DynamoDB hot partition',
    back: 'Throttling caused by uneven request distribution across partition key values. Fix: better key design (higher cardinality / write sharding with random or calculated suffixes), or switch to on-demand capacity.',
  },
  {
    id: 'fc-tr-2',
    domain: 'troubleshooting',
    front: 'AWS X-Ray',
    back: 'Distributed tracing service that builds a service map and shows per-segment timing across a request\'s path through multiple services, helping pinpoint latency bottlenecks and errors.',
  },
  {
    id: 'fc-tr-3',
    domain: 'troubleshooting',
    front: 'Lambda + SQS: Dead-letter queue (DLQ)',
    back: 'After a message fails processing more than maxReceiveCount times, SQS\'s redrive policy automatically moves it to a configured DLQ, preventing one "poison pill" from blocking the whole queue.',
  },
  {
    id: 'fc-tr-4',
    domain: 'troubleshooting',
    front: 'CloudWatch Logs Insights',
    back: 'A query language/tool for interactively searching, filtering, and aggregating CloudWatch Logs data directly, without needing to export logs to a separate system.',
  },
  {
    id: 'fc-tr-5',
    domain: 'troubleshooting',
    front: 'API Gateway 502 vs 504',
    back: '502 Bad Gateway: backend (e.g., Lambda) returned a malformed/invalid response. 504 Gateway Timeout: the backend integration took too long to respond (exceeded the integration timeout).',
  },
  {
    id: 'fc-tr-6',
    domain: 'troubleshooting',
    front: 'Lambda cost/performance tuning',
    back: 'Memory allocation scales CPU proportionally. Since cost = memory × duration, more memory can sometimes *lower* total cost by shortening duration enough. Use AWS Lambda Power Tuning to find the optimum.',
  },
  {
    id: 'fc-tr-7',
    domain: 'troubleshooting',
    front: 'CloudWatch Alarms',
    back: 'Monitor a single metric (or math expression) over time and change state (OK/ALARM/INSUFFICIENT_DATA) when a threshold is breached, triggering SNS notifications, Auto Scaling actions, or other automation.',
  },
  {
    id: 'fc-tr-8',
    domain: 'troubleshooting',
    front: 'API Gateway caching',
    back: 'Per-stage response caching (configurable TTL, up to 3600s) that serves repeated identical requests from cache, reducing backend load and improving latency for read-heavy endpoints.',
  },
];
