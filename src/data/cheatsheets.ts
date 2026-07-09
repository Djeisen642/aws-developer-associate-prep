import type { CheatSheet } from './types';

export const CHEATSHEETS: CheatSheet[] = [
  {
    slug: 'lambda',
    title: 'AWS Lambda',
    icon: '⚡',
    domain: 'development',
    summary: 'Event-driven, serverless compute that runs code without provisioning servers.',
    sections: [
      {
        heading: 'Core concepts',
        points: [
          'Max execution timeout: 15 minutes.',
          'Memory: 128 MB – 10,240 MB; CPU scales proportionally with memory.',
          '/tmp ephemeral storage: up to 10,240 MB, persists only for the life of the execution environment.',
          'Deployment package limits: 50 MB zipped (direct upload), 250 MB unzipped, 10 GB for container images.',
        ],
      },
      {
        heading: 'Concurrency',
        points: [
          'Reserved concurrency: caps AND guarantees a max number of concurrent executions for a function.',
          'Provisioned concurrency: pre-initializes environments to eliminate cold starts for predictable load.',
          'Unreserved account concurrency is shared across all functions without reserved concurrency.',
        ],
      },
      {
        heading: 'Versions, aliases & deployment',
        points: [
          'Versions are immutable snapshots of code + config; $LATEST is always mutable.',
          'Aliases are mutable pointers to a version, and can split traffic by weight between two versions.',
          'CodeDeploy automates canary/linear traffic shifting between versions via an alias, with alarm-based rollback.',
        ],
      },
      {
        heading: 'Integration patterns',
        points: [
          'Synchronous invocations: API Gateway, ALB, direct SDK calls — caller waits for a response.',
          'Asynchronous invocations: S3 events, SNS — Lambda retries automatically and can send failures to a DLQ or Lambda Destination.',
          'Poll-based (event source mapping): SQS, Kinesis, DynamoDB Streams — Lambda service polls on your behalf.',
          'Lambda Destinations route async/stream success or failure results to SQS, SNS, EventBridge, or another Lambda — richer than a DLQ.',
        ],
      },
    ],
  },
  {
    slug: 'dynamodb',
    title: 'DynamoDB',
    icon: '🗄️',
    domain: 'development',
    summary: 'Fully managed, serverless NoSQL key-value and document database.',
    sections: [
      {
        heading: 'Keys & indexes',
        points: [
          'Partition key alone, or partition key + sort key (composite key).',
          'LSI: alternate sort key, same partition key, must be created at table creation, shares table throughput.',
          'GSI: alternate partition + sort key, own throughput, can be created/deleted anytime.',
        ],
      },
      {
        heading: 'Capacity modes',
        points: [
          'Provisioned: set RCU/WCU ahead of time, use Auto Scaling to adjust; cheaper for predictable workloads.',
          'On-demand: pay-per-request, scales instantly; better for unpredictable/spiky traffic.',
        ],
      },
      {
        heading: 'Consistency & performance',
        points: [
          'Eventually consistent reads (default, cheaper) vs strongly consistent reads (RequestConsistency, 2x cost).',
          'DAX (DynamoDB Accelerator): in-memory cache, microsecond reads, reduces read load — for read-heavy workloads.',
          'Hot partitions cause throttling — fix with better key cardinality/distribution or write sharding.',
        ],
      },
      {
        heading: 'Advanced features',
        points: [
          'DynamoDB Streams: time-ordered change log of item-level modifications, consumed by Lambda for triggers/replication.',
          'Conditional writes (e.g. attribute_not_exists) enforce atomic checks without a separate read.',
          'TransactWriteItems / TransactGetItems: all-or-nothing multi-item ACID transactions across tables.',
          'TTL: automatically expire/delete items based on a timestamp attribute, at no extra write cost.',
        ],
      },
    ],
  },
  {
    slug: 's3',
    title: 'Amazon S3',
    icon: '🪣',
    domain: 'development',
    summary: 'Object storage built for durability, scale, and a wide range of storage tiers.',
    sections: [
      {
        heading: 'Storage classes',
        points: [
          'S3 Standard: frequent access, high durability/availability.',
          'S3 Standard-IA / One Zone-IA: infrequent access, cheaper storage, retrieval fee.',
          'S3 Intelligent-Tiering: automatically moves objects between tiers based on access patterns.',
          'S3 Glacier Instant/Flexible/Deep Archive: archival tiers with retrieval times from milliseconds to 12+ hours.',
        ],
      },
      {
        heading: 'Uploads & access',
        points: [
          'Multipart upload: recommended for objects > 100 MB; upload parts independently and in parallel.',
          'Transfer Acceleration: uses CloudFront edge locations to speed up uploads over long distances.',
          'Presigned URLs: grant temporary, time-limited access to a private object without changing permissions.',
        ],
      },
      {
        heading: 'Security & consistency',
        points: [
          'Bucket policies (resource-based) vs IAM policies (identity-based) vs ACLs (legacy, object/bucket level).',
          'SSE-S3 (AWS-owned key), SSE-KMS (customer-managed CMK, auditable), SSE-C (customer-supplied key).',
          'S3 now provides strong read-after-write consistency for all operations by default.',
        ],
      },
      {
        heading: 'Other features',
        points: [
          'Versioning: keeps multiple variants of an object, protects against accidental overwrite/delete.',
          'Event notifications: trigger Lambda, SQS, or SNS on object create/delete/restore events.',
          'Lifecycle rules: automatically transition or expire objects based on age.',
        ],
      },
    ],
  },
  {
    slug: 'api-gateway',
    title: 'API Gateway',
    icon: '🌐',
    domain: 'development',
    summary: 'Fully managed service for creating, publishing, and securing APIs at any scale.',
    sections: [
      {
        heading: 'API types',
        points: [
          'REST API: full feature set (caching, API keys/usage plans, request validation, WAF).',
          'HTTP API: lower latency and cost, simpler, built-in JWT authorizers — best for simple proxy use cases.',
          'WebSocket API: for persistent, bidirectional client-server connections.',
        ],
      },
      {
        heading: 'Endpoint types',
        points: [
          'Edge-optimized: routed through CloudFront, best for geographically distributed clients.',
          'Regional: for clients in the same region, or when you manage your own CDN.',
          'Private: only accessible from within a VPC via an interface endpoint.',
        ],
      },
      {
        heading: 'Traffic management',
        points: [
          'Throttling: account/stage/method-level rate and burst limits (token bucket algorithm).',
          'Caching: per-stage response cache with configurable TTL, reduces backend calls.',
          'Usage plans + API keys: control and meter per-customer access, often paired with throttling quotas.',
        ],
      },
      {
        heading: 'Security',
        points: [
          'Lambda authorizers (token or request-based) for custom auth logic.',
          'Cognito authorizers to validate user pool JWTs directly.',
          'IAM authorization using SigV4-signed requests for internal/service-to-service calls.',
          'CORS must be explicitly enabled for browser-based cross-origin calls.',
        ],
      },
    ],
  },
  {
    slug: 'messaging',
    title: 'SQS & SNS',
    icon: '📬',
    domain: 'development',
    summary: 'Decoupled, asynchronous messaging — queues (SQS) and pub/sub (SNS).',
    sections: [
      {
        heading: 'SQS basics',
        points: [
          'Standard queue: at-least-once delivery, best-effort ordering, near-unlimited throughput.',
          'FIFO queue: exactly-once processing, strict ordering, name must end in .fifo.',
          'Visibility timeout: time a message is hidden after being received, before becoming visible again (default 30s).',
          'Long polling (up to 20s) reduces empty responses and cost vs short polling.',
        ],
      },
      {
        heading: 'SQS reliability',
        points: [
          'Dead-letter queue (DLQ): captures messages that fail maxReceiveCount times via a redrive policy.',
          'Message retention: 1 minute to 14 days (default 4 days).',
        ],
      },
      {
        heading: 'SNS basics',
        points: [
          'Pub/sub push-based messaging — no polling, no persistent storage of messages.',
          'Fan-out pattern: one SNS topic → many SQS queues/Lambda functions/HTTP endpoints/email/SMS.',
          'Message filtering: subscribers can set a filter policy to receive only a subset of published messages.',
        ],
      },
      {
        heading: 'Comparisons',
        points: [
          'Use SQS to decouple producer/consumer with buffering and retry semantics.',
          'Use SNS when multiple independent systems need the same event simultaneously.',
          'EventBridge extends this pattern with schema registries, third-party SaaS sources, and content-based routing rules.',
        ],
      },
    ],
  },
  {
    slug: 'security-iam',
    title: 'IAM & Security',
    icon: '🔐',
    domain: 'security',
    summary: 'Identity, access management, and encryption fundamentals for the exam.',
    sections: [
      {
        heading: 'IAM basics',
        points: [
          'Users: long-term credentials for people/apps. Roles: temporary credentials assumed via STS — preferred for AWS resources.',
          'Policies: JSON documents defining Effect/Action/Resource/Condition; identity-based (attached to principal) or resource-based (attached to resource, can be cross-account).',
          'Explicit Deny always wins over any Allow.',
          'Least privilege: grant only the specific actions and resources actually needed.',
        ],
      },
      {
        heading: 'STS',
        points: [
          'AssumeRole: get temporary credentials for a role, commonly for cross-account access.',
          'AssumeRoleWithWebIdentity / AssumeRoleWithSAML: federate external identity providers into temporary AWS credentials.',
        ],
      },
      {
        heading: 'KMS & encryption',
        points: [
          'Envelope encryption: a data key encrypts the data; a CMK encrypts the data key.',
          'Customer-managed CMKs support optional automatic annual rotation; AWS-managed keys rotate automatically every year.',
          'SSE-S3 (AWS-owned key) vs SSE-KMS (customer CMK, CloudTrail audit trail, request quotas apply) vs SSE-C (customer-supplied key, not stored by AWS).',
        ],
      },
      {
        heading: 'Secrets & config',
        points: [
          'Secrets Manager: automatic rotation, native RDS/Redshift/DocumentDB integration, cost per secret.',
          'SSM Parameter Store: free tier, SecureString via KMS, good for config + simple secrets.',
          'Cognito: user pools for auth (JWTs), identity pools for temporary AWS credentials via STS.',
        ],
      },
    ],
  },
  {
    slug: 'cicd',
    title: 'CI/CD: CodePipeline, CodeBuild, CodeDeploy',
    icon: '🚀',
    domain: 'deployment',
    summary: 'AWS-native continuous integration and delivery toolchain.',
    sections: [
      {
        heading: 'CodePipeline',
        points: [
          'Orchestrates stages (Source → Build → Test → Deploy) with parallel/sequential actions.',
          'Artifacts flow between stages via an S3 artifact bucket.',
          'Can trigger on source changes (CodeCommit/GitHub/S3) via EventBridge or webhooks.',
        ],
      },
      {
        heading: 'CodeBuild',
        points: [
          'buildspec.yml defines phases: install, pre_build, build, post_build, and artifacts.',
          'Runs in managed, ephemeral build containers; supports custom Docker images.',
        ],
      },
      {
        heading: 'CodeDeploy',
        points: [
          'appspec.yml defines files to copy and lifecycle hooks (BeforeInstall, AfterInstall, ApplicationStart, ValidateService, etc.).',
          'In-place deployment: updates existing instances directly.',
          'Blue/green deployment: new environment provisioned, traffic shifted, old environment kept for rollback.',
          'Also deploys to Lambda (canary/linear traffic shifting via alias) and ECS (blue/green via target groups).',
        ],
      },
      {
        heading: 'CloudFormation & SAM',
        points: [
          'Change sets preview updates before execution — catches unwanted resource replacement.',
          'Nested stacks modularize reusable templates.',
          'SAM adds shorthand serverless resources (Function, Api, SimpleTable); sam build + sam deploy package and transform to CloudFormation.',
        ],
      },
    ],
  },
  {
    slug: 'monitoring',
    title: 'CloudWatch & X-Ray',
    icon: '🩺',
    domain: 'troubleshooting',
    summary: 'Observability: metrics, logs, alarms, and distributed tracing.',
    sections: [
      {
        heading: 'CloudWatch Metrics & Alarms',
        points: [
          'PutMetricData publishes custom application/business metrics.',
          'Alarms watch a metric/expression and change state on threshold breach, triggering SNS/Auto Scaling actions.',
          'Standard resolution: 1 minute; high resolution: down to 1 second.',
        ],
      },
      {
        heading: 'CloudWatch Logs',
        points: [
          'Log groups/streams collect application and Lambda logs automatically.',
          'Logs Insights: interactive query language to search/filter/aggregate logs directly.',
          'Subscription filters can stream logs in real time to Lambda, Kinesis, or OpenSearch.',
        ],
      },
      {
        heading: 'X-Ray',
        points: [
          'Traces requests across service boundaries; builds a visual service map.',
          'Segments (per service) and subsegments (per call/operation) capture timing and errors.',
          'Sampling rules control what percentage of requests are traced, to control cost/volume.',
        ],
      },
      {
        heading: 'Common failure signatures',
        points: [
          'Lambda "Task timed out": raise the timeout and/or optimize slow downstream calls.',
          'DynamoDB throttling with skewed partition metrics: hot partition — fix key design or use on-demand.',
          'API Gateway 502: malformed Lambda proxy response. 504: backend took too long.',
          'SQS poison-pill messages: configure a DLQ with maxReceiveCount to isolate them.',
        ],
      },
    ],
  },
];
