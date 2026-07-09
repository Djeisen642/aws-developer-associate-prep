import type { QuizQuestion } from './types';

export const QUESTIONS: QuizQuestion[] = [
  // ---------------------------------------------------------------------
  // Development with AWS Services
  // ---------------------------------------------------------------------
  {
    id: 'dev-1',
    domain: 'development',
    question:
      'A Lambda function needs to guarantee it always has warm capacity ready to serve traffic instantly, with no cold starts, for a predictable baseline load. What should you configure?',
    choices: [
      'Reserved concurrency',
      'Provisioned concurrency',
      'A larger memory allocation',
      'An SQS trigger with batch size of 1',
    ],
    correctIndex: 1,
    explanation:
      'Provisioned concurrency pre-initializes execution environments so invocations are served instantly, eliminating cold starts. Reserved concurrency only caps/guarantees a concurrency ceiling — it does not keep functions warm.',
  },
  {
    id: 'dev-2',
    domain: 'development',
    question:
      'You need a DynamoDB table to support queries by a secondary attribute that is different from the partition key, with its own separate throughput allocation and eventual or strong consistency options after table creation. What should you use?',
    choices: [
      'Local Secondary Index (LSI)',
      'Global Secondary Index (GSI)',
      'DynamoDB Streams',
      'DynamoDB Accelerator (DAX)',
    ],
    correctIndex: 1,
    explanation:
      'GSIs have their own partition/sort key and throughput, and can be added or removed after table creation. LSIs must be defined at table creation time and share the base table\'s throughput and partition key.',
  },
  {
    id: 'dev-3',
    domain: 'development',
    question:
      'Which API Gateway endpoint type serves requests through a CloudFront distribution owned by AWS and is ideal for use cases without strong latency requirements near a single region?',
    choices: ['Edge-optimized', 'Regional', 'Private', 'Local'],
    correctIndex: 0,
    explanation:
      'Edge-optimized endpoints are automatically fronted by CloudFront for global clients. Regional endpoints are best when clients are in the same region (or you want to manage your own CloudFront/CDN); private endpoints are only accessible from within a VPC.',
  },
  {
    id: 'dev-4',
    domain: 'development',
    question:
      'An S3 event should trigger processing for objects larger than a few MB uploaded in parts. Which S3 feature lets clients upload large objects in independent parts and reduces the impact of network failures?',
    choices: [
      'Multipart upload',
      'Transfer Acceleration',
      'Byte-range fetches',
      'S3 Select',
    ],
    correctIndex: 0,
    explanation:
      'Multipart upload splits an object into parts uploaded independently (and in parallel), improving throughput and letting you retry only failed parts. AWS recommends it for objects over 100 MB.',
  },
  {
    id: 'dev-5',
    domain: 'development',
    question:
      'A producer needs to send a message to multiple independent consumer queues without knowing about them in advance. Which combination of services is the classic AWS fan-out pattern?',
    choices: [
      'SQS publishing directly to multiple SQS queues',
      'SNS topic with multiple SQS queue subscriptions',
      'EventBridge rule with a single Lambda target',
      'Kinesis Data Streams with one consumer',
    ],
    correctIndex: 1,
    explanation:
      'The fan-out pattern publishes one message to an SNS topic, which pushes copies to any number of subscribed SQS queues (or other subscribers), decoupling the producer from consumers.',
  },
  {
    id: 'dev-6',
    domain: 'development',
    question:
      'Which SQS queue attribute should you increase if consumers regularly need more time to process a message before it becomes visible again to other consumers?',
    choices: [
      'Message retention period',
      'Visibility timeout',
      'Delivery delay',
      'Maximum message size',
    ],
    correctIndex: 1,
    explanation:
      'The visibility timeout is the window during which a message is hidden from other consumers after being received. If processing regularly exceeds it, consumers should extend it via ChangeMessageVisibility or raise the queue default.',
  },
  {
    id: 'dev-7',
    domain: 'development',
    question:
      'A DynamoDB write should only succeed if an item does not already exist, to avoid overwriting existing data. What should you use?',
    choices: [
      'A conditional write with attribute_not_exists()',
      'A transactional read',
      'Strongly consistent read before every write',
      'DynamoDB Streams with a Lambda trigger to reject duplicates',
    ],
    correctIndex: 0,
    explanation:
      'A conditional expression such as attribute_not_exists(pk) on PutItem enforces the condition atomically at the server, avoiding race conditions that a read-then-write pattern would introduce.',
  },
  {
    id: 'dev-8',
    domain: 'development',
    question:
      'Which Kinesis service should you choose if you want to load streaming data into S3, Redshift, or OpenSearch with optional near-real-time transformation, without managing shards or consumers yourself?',
    choices: [
      'Kinesis Data Streams',
      'Kinesis Data Firehose',
      'Kinesis Video Streams',
      'Kinesis Data Analytics',
    ],
    correctIndex: 1,
    explanation:
      'Firehose is a fully managed delivery service — you don\'t manage shards or write consumer code. Data Streams gives you fine-grained, low-latency control but requires you to write producers/consumers.',
  },
  {
    id: 'dev-9',
    domain: 'development',
    question:
      'A mobile app needs users to sign in with email/password and also wants temporary, limited AWS credentials to upload directly to S3. Which Cognito components are needed together?',
    choices: [
      'A user pool only',
      'An identity pool only',
      'A user pool for authentication plus an identity pool for AWS credentials',
      'IAM users created per mobile customer',
    ],
    correctIndex: 2,
    explanation:
      'User pools handle sign-up/sign-in and issue JWTs. Identity pools exchange those tokens (or other identity provider tokens) for temporary IAM credentials via STS, allowing direct, scoped access to AWS resources like S3.',
  },
  {
    id: 'dev-10',
    domain: 'development',
    question:
      'When calling a throttled AWS API repeatedly, what retry strategy does the AWS SDK use by default to avoid overwhelming the service further?',
    choices: [
      'Fixed 1-second delay between every retry',
      'Exponential backoff with jitter',
      'Immediate retry with no delay',
      'A single retry after the request times out',
    ],
    correctIndex: 1,
    explanation:
      'AWS SDKs implement exponential backoff (increasing delay between attempts) with randomized jitter by default, which spreads out retries and reduces the chance of synchronized retry storms.',
  },
  {
    id: 'dev-11',
    domain: 'development',
    question:
      'You want to share common Lambda dependencies (like a large SDK or utility library) across multiple functions without bundling them into every deployment package. What should you use?',
    choices: ['Lambda layers', 'Lambda extensions', 'Container image caching', 'A shared S3 bucket'],
    correctIndex: 0,
    explanation:
      'Layers let you package libraries/dependencies separately and attach them to multiple functions, reducing deployment package size and duplication.',
  },
  {
    id: 'dev-12',
    domain: 'development',
    question:
      'Which Step Functions state type is used to run branches of work in parallel within the same state machine execution?',
    choices: ['Map', 'Parallel', 'Choice', 'Wait'],
    correctIndex: 1,
    explanation:
      'The Parallel state executes multiple fixed branches concurrently. Map is similar but dynamically iterates over items in an array, running the same branch for each.',
  },
  {
    id: 'dev-13',
    domain: 'development',
    question:
      'You need to write multiple items to a DynamoDB table in a single request to reduce round trips, but you do not need the writes to be atomic as a group. What API should you use?',
    choices: ['TransactWriteItems', 'BatchWriteItem', 'PutItem in a loop with exponential backoff', 'UpdateItem with a condition expression'],
    correctIndex: 1,
    explanation:
      'BatchWriteItem puts or deletes up to 25 items across one or more tables in a single call, but each item write succeeds or fails independently (no atomicity). TransactWriteItems is for all-or-nothing atomic writes.',
  },
  {
    id: 'dev-14',
    domain: 'development',
    question:
      'A REST API built on API Gateway needs to transform an incoming request body into a different shape before it reaches the backend Lambda integration. What feature should you use?',
    choices: ['A Lambda authorizer', 'A mapping template (VTL) on the integration request', 'A usage plan', 'A gateway response'],
    correctIndex: 1,
    explanation:
      'Mapping templates, written in Velocity Template Language (VTL), let you transform the request or response payload between the client and a non-proxy Lambda or HTTP integration.',
  },
  {
    id: 'dev-15',
    domain: 'development',
    question:
      'Which DynamoDB feature automatically replicates a table across multiple AWS Regions with multi-active, multi-Region writes?',
    choices: ['DynamoDB Streams', 'Global Tables', 'DynamoDB Accelerator (DAX)', 'On-demand backups'],
    correctIndex: 1,
    explanation:
      'Global Tables provide a fully managed, multi-Region, multi-active replication solution — writes in any participating Region propagate to the others, useful for globally distributed low-latency applications.',
  },
  {
    id: 'dev-16',
    domain: 'development',
    question:
      'What is the purpose of a "dimension" in a CloudWatch custom metric, and how does it relate to Amazon SQS or S3 API calls being reduced?',
    choices: [
      'Dimensions are unrelated to metrics; they configure IAM policies',
      'A dimension is a name/value pair that helps categorize and filter a metric (e.g., by environment or function name)',
      'Dimensions define the retention period of a metric',
      'Dimensions control which Region a metric is published to',
    ],
    correctIndex: 1,
    explanation:
      'Dimensions let you slice a metric by attributes like Environment=prod or FunctionName=MyFn, so you can filter and aggregate CloudWatch metrics meaningfully rather than lumping all data points together.',
  },
  {
    id: 'dev-17',
    domain: 'development',
    question:
      'A serverless HTTP API needs a lightweight way to invoke a single Lambda function directly over HTTPS, without setting up a full API Gateway API. What feature fits best?',
    choices: ['Lambda function URLs', 'Lambda layers', 'Lambda destinations', 'Lambda event source mappings'],
    correctIndex: 0,
    explanation:
      'Lambda function URLs give a function its own dedicated HTTPS endpoint with no separate API Gateway resource needed — ideal for simple, single-function HTTP use cases like webhooks.',
  },
  {
    id: 'dev-18',
    domain: 'development',
    question:
      'Which caching service would you choose for a Redis-compatible, in-memory data store that supports replication, pub/sub, sorted sets, and Multi-AZ failover?',
    choices: ['Amazon ElastiCache for Redis', 'DynamoDB DAX', 'Amazon MQ', 'CloudFront caching'],
    correctIndex: 0,
    explanation:
      'ElastiCache for Redis offers advanced data structures (sorted sets, pub/sub), replication, and Multi-AZ automatic failover. ElastiCache for Memcached is simpler and multi-threaded but lacks these features.',
  },
  {
    id: 'dev-19',
    domain: 'development',
    question:
      'You want a Step Functions state machine to automatically retry a failing Lambda task a few times with exponential backoff, then fall back to a different state if it still fails. Which fields do you use?',
    choices: ['Parallel and Choice', 'Retry and Catch', 'Wait and Succeed', 'Map and Fail'],
    correctIndex: 1,
    explanation:
      'The Retry field configures automatic retries (with interval, backoff rate, and max attempts) for a state; the Catch field defines a fallback transition to another state when errors are not resolved by retries.',
  },
  {
    id: 'dev-20',
    domain: 'development',
    question:
      'Which S3 feature lets you run simple SQL-like queries directly against a subset of a CSV, JSON, or Parquet object, retrieving only the data you need instead of downloading the whole object?',
    choices: ['S3 Select', 'S3 Batch Operations', 'S3 Inventory', 'S3 Object Lambda'],
    correctIndex: 0,
    explanation:
      'S3 Select lets you use simple SQL expressions to filter the contents of an object server-side, reducing the amount of data transferred and the client-side processing required.',
  },
  {
    id: 'dev-21',
    domain: 'development',
    question:
      'A FIFO SQS queue must avoid processing the exact same message body twice within a 5-minute window, even if the producer accidentally sends it more than once. What should you enable?',
    choices: [
      'Content-based deduplication (or an explicit MessageDeduplicationId)',
      'A longer visibility timeout',
      'A dead-letter queue',
      'Long polling',
    ],
    correctIndex: 0,
    explanation:
      'FIFO queues support deduplication using either an explicit MessageDeduplicationId per message or content-based deduplication (a SHA-256 hash of the body), both scoped to a 5-minute deduplication interval.',
  },
  {
    id: 'dev-22',
    domain: 'development',
    question:
      'What is the main benefit of using CloudFront in front of an S3 bucket or API for a globally distributed user base?',
    choices: [
      'It replaces the need for IAM permissions on the origin',
      'It caches content at edge locations close to users, reducing latency and offloading traffic from the origin',
      'It automatically encrypts data at rest in S3',
      'It provides a managed relational database',
    ],
    correctIndex: 1,
    explanation:
      'CloudFront is a CDN that caches responses at edge locations worldwide, reducing latency for end users and reducing load on the origin (S3, ALB, or a custom origin).',
  },
  {
    id: 'dev-23',
    domain: 'development',
    question:
      'Which AWS service provides a managed message broker supporting industry-standard protocols like JMS and AMQP, useful when migrating an existing application off of ActiveMQ or RabbitMQ?',
    choices: ['Amazon MQ', 'Amazon SQS', 'Amazon SNS', 'Amazon EventBridge'],
    correctIndex: 0,
    explanation:
      'Amazon MQ is a managed message broker for Apache ActiveMQ and RabbitMQ, aimed at applications that need standard messaging protocols (JMS, AMQP, MQTT, STOMP) rather than the AWS-native SQS/SNS APIs.',
  },
  {
    id: 'dev-24',
    domain: 'development',
    question:
      'An EventBridge rule needs to run a Lambda function automatically every night at 2 AM UTC. What should you configure?',
    choices: [
      'An SQS queue with a 24-hour delivery delay',
      'An EventBridge scheduled rule using a cron expression as the event source',
      'A CloudWatch Logs subscription filter',
      'A Step Functions Wait state in an always-running execution',
    ],
    correctIndex: 1,
    explanation:
      'EventBridge (and CloudWatch Events) supports schedule-based rules using rate or cron expressions, which can invoke a Lambda function, Step Functions, or other targets on a fixed schedule.',
  },
  {
    id: 'dev-25',
    domain: 'development',
    question:
      'What happens to concurrent Lambda invocations beyond a function\'s available concurrency (reserved or account-level unreserved pool)?',
    choices: [
      'They are queued indefinitely until capacity frees up',
      'They are throttled — synchronous callers get a 429 TooManyRequestsException; async invocations are retried automatically',
      'They automatically spill over to Fargate',
      'The function is disabled until concurrency is manually reset',
    ],
    correctIndex: 1,
    explanation:
      'When concurrency limits are exceeded, Lambda throttles further invocations. Synchronous callers receive a 429/ThrottlingException they must handle; async invocations and most poll-based event sources retry automatically.',
  },
  {
    id: 'dev-26',
    domain: 'development',
    question:
      'Which Amazon Cognito feature provides a prebuilt, customizable web sign-in/sign-up page so you do not have to build your own login UI?',
    choices: ['Identity pools', 'The Cognito Hosted UI', 'Cognito Sync', 'User pool Lambda triggers'],
    correctIndex: 1,
    explanation:
      'The Hosted UI is a Cognito-provided, customizable webpage for sign-up, sign-in, and federation with social/SAML identity providers, saving you from building that UI from scratch.',
  },

  // ---------------------------------------------------------------------
  // Security
  // ---------------------------------------------------------------------
  {
    id: 'sec-1',
    domain: 'security',
    question:
      'An EC2 instance running your application needs permission to read from an S3 bucket. What is the AWS best-practice way to grant that access?',
    choices: [
      'Store an IAM user\'s access key and secret on the instance',
      'Attach an IAM role to the instance profile with a policy granting S3 read access',
      'Make the S3 bucket public',
      'Embed credentials in the application code',
    ],
    correctIndex: 1,
    explanation:
      'IAM roles attached via an instance profile provide temporary, automatically rotated credentials to the instance — no long-lived secrets to manage or leak.',
  },
  {
    id: 'sec-2',
    domain: 'security',
    question:
      'What is "envelope encryption" as implemented by AWS KMS?',
    choices: [
      'Encrypting data twice with two different customer master keys',
      'Using a data key to encrypt data, then encrypting that data key with a KMS customer master key (CMK)',
      'Wrapping an S3 bucket in a VPC endpoint policy',
      'Encrypting only the transport layer (TLS) and not the data at rest',
    ],
    correctIndex: 1,
    explanation:
      'Envelope encryption encrypts the actual data with a data encryption key (DEK), then encrypts that DEK with a KMS CMK. Only the small encrypted DEK needs to go to KMS, which is more efficient than sending all data through KMS.',
  },
  {
    id: 'sec-3',
    domain: 'security',
    question:
      'Which service is purpose-built for storing and automatically rotating database credentials, with native integration for rotation Lambda functions?',
    choices: ['SSM Parameter Store', 'AWS Secrets Manager', 'AWS KMS', 'IAM Access Analyzer'],
    correctIndex: 1,
    explanation:
      'Secrets Manager natively supports automatic rotation (including built-in rotation for RDS, DocumentDB, Redshift) and charges per secret. Parameter Store can hold secrets and supports rotation too, but has no built-in rotation Lambda templates and is cheaper for general config.',
  },
  {
    id: 'sec-4',
    domain: 'security',
    question:
      'A Lambda function in Account A needs to access a DynamoDB table in Account B. What is the standard cross-account access pattern?',
    choices: [
      'Copy the DynamoDB table into Account A',
      'Have the Lambda function assume an IAM role in Account B via STS AssumeRole',
      'Make the DynamoDB table public',
      'Share the Account B root credentials with Account A',
    ],
    correctIndex: 1,
    explanation:
      'Cross-account access is achieved by defining a role in the target account with a trust policy allowing the source account/principal to assume it, then calling sts:AssumeRole to get temporary credentials scoped to that role.',
  },
  {
    id: 'sec-5',
    domain: 'security',
    question:
      'Which S3 server-side encryption option lets you supply and manage your own encryption key while AWS performs the encryption/decryption, and AWS does not store the key?',
    choices: ['SSE-S3', 'SSE-KMS', 'SSE-C', 'Client-side encryption'],
    correctIndex: 2,
    explanation:
      'SSE-C (customer-provided keys) has you supply the key with each request; S3 uses it to encrypt/decrypt but never stores it. SSE-S3 and SSE-KMS use AWS-managed or KMS-managed keys respectively.',
  },
  {
    id: 'sec-6',
    domain: 'security',
    question:
      'What is the primary difference between an IAM identity-based policy and a resource-based policy?',
    choices: [
      'Identity-based policies are attached to users/groups/roles; resource-based policies are attached directly to resources like S3 buckets and can grant access to a different account',
      'Resource-based policies only apply to EC2 instances',
      'There is no functional difference, only naming',
      'Identity-based policies cannot deny access, only allow it',
    ],
    correctIndex: 0,
    explanation:
      'Identity-based policies are attached to IAM principals. Resource-based policies (e.g., S3 bucket policies, SQS queue policies, Lambda resource policies) are attached to the resource itself and can grant cross-account access without requiring a role.',
  },
  {
    id: 'sec-7',
    domain: 'security',
    question:
      'A single-page web app hosted on one domain calls an API Gateway endpoint on a different domain. The browser blocks the request. What must be configured on the API?',
    choices: ['A resource policy allowing "*"', 'CORS headers on the API responses', 'A WAF rule', 'A VPC endpoint policy'],
    correctIndex: 1,
    explanation:
      'Cross-Origin Resource Sharing (CORS) must be enabled on the API (returning headers like Access-Control-Allow-Origin) so browsers permit the cross-domain request from client-side JavaScript.',
  },
  {
    id: 'sec-8',
    domain: 'security',
    question:
      'What does AWS Signature Version 4 (SigV4) provide when making direct HTTP requests to AWS service APIs?',
    choices: [
      'Encryption of the request body',
      'A way to cryptographically sign requests so AWS can authenticate the caller and verify the request has not been tampered with',
      'Automatic retry logic',
      'DNS resolution for regional endpoints',
    ],
    correctIndex: 1,
    explanation:
      'SigV4 is the signing process the SDKs use under the hood to authenticate and verify integrity of requests to AWS APIs, using your access key to derive a signature — it does not itself encrypt the payload.',
  },
  {
    id: 'sec-9',
    domain: 'security',
    question:
      'Which statement about KMS key rotation is correct for AWS-managed vs customer-managed symmetric keys?',
    choices: [
      'AWS-managed keys can never be rotated',
      'Automatic annual rotation can be enabled for customer-managed symmetric CMKs; AWS-managed keys are rotated automatically every year by default',
      'Customer-managed keys rotate every 90 days automatically with no way to change it',
      'Rotation re-encrypts all previously encrypted data immediately',
    ],
    correctIndex: 1,
    explanation:
      'Customer-managed symmetric CMKs support optional automatic rotation (yearly). AWS-managed keys are rotated automatically every year and you cannot disable it. Rotation only changes the backing key material used for new encryptions; old data stays decryptable via retained key versions.',
  },
  {
    id: 'sec-10',
    domain: 'security',
    question:
      'A private subnet\'s Lambda function needs to call the S3 API without traversing the public internet or requiring a NAT gateway. What should you configure?',
    choices: [
      'A gateway VPC endpoint for S3',
      'A public IP on the Lambda ENI',
      'An internet gateway attached to the private subnet',
      'A NAT instance',
    ],
    correctIndex: 0,
    explanation:
      'S3 and DynamoDB support gateway VPC endpoints, which route traffic to those services privately within the AWS network via route table entries — no NAT or internet gateway needed.',
  },
  {
    id: 'sec-11',
    domain: 'security',
    question:
      'What is the least-privilege best practice when writing an IAM policy for a Lambda function that only needs to read from one specific S3 bucket?',
    choices: [
      'Grant s3:* on Resource: *',
      'Grant only the needed actions (e.g., s3:GetObject) scoped to the specific bucket ARN/prefix',
      'Attach the AdministratorAccess managed policy for simplicity',
      'Grant s3:* scoped to that bucket only',
    ],
    correctIndex: 1,
    explanation:
      'Least privilege means granting only the specific actions required (e.g., s3:GetObject, maybe s3:ListBucket) scoped to the exact resource ARN needed — not wildcarding actions or resources beyond what\'s necessary.',
  },
  {
    id: 'sec-12',
    domain: 'security',
    question:
      'In IAM policy evaluation, if one policy attached to a user explicitly denies an action and another attached policy explicitly allows it, what is the result?',
    choices: [
      'The allow wins because it was evaluated first',
      'The explicit deny always wins over any allow',
      'IAM throws a conflict error and blocks all actions for that user',
      'The most recently attached policy wins',
    ],
    correctIndex: 1,
    explanation:
      'IAM policy evaluation logic: by default everything is denied; an explicit Allow grants access; but an explicit Deny anywhere in the applicable policies always overrides any Allow.',
  },
  {
    id: 'sec-13',
    domain: 'security',
    question:
      'What is an IAM permissions boundary used for?',
    choices: [
      'It replaces the need for identity-based policies entirely',
      'It sets the maximum permissions an IAM entity (user or role) can have, regardless of what its identity-based policies grant',
      'It defines network boundaries for a VPC',
      'It encrypts IAM policy documents at rest',
    ],
    correctIndex: 1,
    explanation:
      'A permissions boundary is an advanced feature that caps the maximum permissions an identity can have — the effective permissions are the intersection of the boundary and the identity-based policies, commonly used to safely delegate role/user creation.',
  },
  {
    id: 'sec-14',
    domain: 'security',
    question:
      'Which service should you use to provision, manage, and automatically renew free public SSL/TLS certificates for use with CloudFront, API Gateway (custom domains), or an Application Load Balancer?',
    choices: ['AWS KMS', 'AWS Certificate Manager (ACM)', 'IAM Access Analyzer', 'AWS Secrets Manager'],
    correctIndex: 1,
    explanation:
      'ACM issues and manages public/private SSL/TLS certificates, integrates directly with CloudFront, ALB, and API Gateway custom domains, and handles automatic renewal — no manual certificate ordering or installation needed.',
  },
  {
    id: 'sec-15',
    domain: 'security',
    question:
      'A Lambda function in Account A needs permission to be invoked directly by an S3 bucket event in the same account, without assuming a role. What must be granted?',
    choices: [
      'A KMS key policy allowing S3',
      'A resource-based policy on the Lambda function (lambda:AddPermission) granting S3 the lambda:InvokeFunction action',
      'An IAM user with S3FullAccess',
      'A VPC endpoint policy for Lambda',
    ],
    correctIndex: 1,
    explanation:
      'Services like S3, SNS, and EventBridge invoke Lambda using a resource-based (Lambda function) policy rather than assuming an IAM role — you grant the service principal lambda:InvokeFunction via AddPermission.',
  },
  {
    id: 'sec-16',
    domain: 'security',
    question:
      'Which S3 setting, when enabled at the account or bucket level, overrides any bucket policies or ACLs that would otherwise make objects publicly accessible?',
    choices: ['Versioning', 'S3 Block Public Access', 'Requester Pays', 'Transfer Acceleration'],
    correctIndex: 1,
    explanation:
      'S3 Block Public Access provides account- or bucket-level settings that can override permissive bucket policies/ACLs, acting as a safety net against accidental public exposure.',
  },
  {
    id: 'sec-17',
    domain: 'security',
    question:
      'Your application reads a SecureString parameter from SSM Parameter Store. Besides ssm:GetParameter, what additional permission is typically required?',
    choices: [
      'kms:Decrypt on the KMS key used to encrypt the parameter',
      's3:GetObject on the parameter\'s backing bucket',
      'secretsmanager:GetSecretValue',
      'No additional permission is ever required for SecureString',
    ],
    correctIndex: 0,
    explanation:
      'SecureString parameters are encrypted with a KMS key. The caller needs both ssm:GetParameter (with decryption requested) and kms:Decrypt permission on the specific CMK used to encrypt that parameter.',
  },
  {
    id: 'sec-18',
    domain: 'security',
    question:
      'Which identities can Cognito Identity Pools hand out temporary AWS credentials to, in addition to authenticated users from a login provider?',
    choices: [
      'Only authenticated users — unauthenticated access is never supported',
      'Unauthenticated ("guest") users, if you enable and configure an unauthenticated IAM role',
      'Only IAM users created manually',
      'Only EC2 instance roles',
    ],
    correctIndex: 1,
    explanation:
      'Identity pools support both an authenticated role (for signed-in users) and an optional unauthenticated ("guest") role, letting unauthenticated app users get limited, scoped temporary AWS credentials too.',
  },
  {
    id: 'sec-19',
    domain: 'security',
    question:
      'What is the maximum duration a temporary session obtained via sts:AssumeRole can typically last, by default and configurable range?',
    choices: [
      'Always exactly 1 hour, never configurable',
      'Between 15 minutes and the role\'s configured max session duration (up to 12 hours), default 1 hour',
      'Always 24 hours',
      'Sessions never expire once issued',
    ],
    correctIndex: 1,
    explanation:
      'AssumeRole sessions default to 1 hour but can be requested anywhere from 15 minutes up to the role\'s configured maximum session duration (which can itself be set up to 12 hours).',
  },
  {
    id: 'sec-20',
    domain: 'security',
    question:
      'What is the difference between a KMS key policy and an IAM policy attached to a user, when both are relevant to accessing a customer-managed CMK?',
    choices: [
      'IAM policies are irrelevant for KMS; only the key policy matters',
      'The key policy is always attached directly to the CMK and is the root of access control for that key; IAM policies can only grant additional access if the key policy allows it (e.g., via delegation to IAM)',
      'Key policies and IAM policies are exactly the same construct with different names',
      'IAM policies fully override key policies',
    ],
    correctIndex: 1,
    explanation:
      'Every CMK has a resource-based key policy that is the primary access control. By default it must explicitly allow the account to use IAM policies to delegate permissions — without that delegation statement, IAM policies alone won\'t grant access.',
  },
  {
    id: 'sec-21',
    domain: 'security',
    question:
      'Which AWS service continuously analyzes IAM policies attached to your resources and identifies resources shared with an external entity, helping you find unintended public/cross-account access?',
    choices: ['AWS Trusted Advisor only', 'IAM Access Analyzer', 'AWS Config Rules only', 'Amazon Macie'],
    correctIndex: 1,
    explanation:
      'IAM Access Analyzer uses logic-based reasoning to identify resources (S3 buckets, IAM roles, KMS keys, etc.) that grant access to entities outside your account/organization, surfacing potentially unintended sharing.',
  },
  {
    id: 'sec-22',
    domain: 'security',
    question:
      'Why is it recommended to require multi-factor authentication (MFA) for sensitive IAM actions, such as deleting a CloudTrail trail or changing account settings?',
    choices: [
      'MFA is required by AWS for all API calls by default',
      'It adds a second factor beyond a password/access key, reducing the risk from a single compromised credential',
      'It replaces the need for any IAM policies',
      'It automatically rotates the user\'s access keys',
    ],
    correctIndex: 1,
    explanation:
      'MFA requires a time-based one-time code (or hardware/virtual device) in addition to credentials, so a leaked password or access key alone is not enough to perform the protected action — commonly enforced via an IAM policy condition (aws:MultiFactorAuthPresent).',
  },
  {
    id: 'sec-23',
    domain: 'security',
    question:
      'Security groups are stateful while network ACLs (NACLs) are stateless. What does this mean in practice?',
    choices: [
      'Security groups require explicit outbound rules for return traffic; NACLs do not',
      'For security groups, a response to an allowed inbound request is automatically allowed out (no separate outbound rule needed); NACLs evaluate inbound and outbound rules independently, so return traffic must be explicitly allowed both ways',
      'NACLs only apply to EC2 instances, not subnets',
      'There is no practical difference; both behave identically',
    ],
    correctIndex: 1,
    explanation:
      'Security groups automatically allow return traffic for an allowed request (stateful). NACLs are stateless — they evaluate every packet in both directions against their rule lists, so you must explicitly allow both inbound and outbound (including ephemeral ports for return traffic).',
  },

  // ---------------------------------------------------------------------
  // Deployment
  // ---------------------------------------------------------------------
  {
    id: 'dep-1',
    domain: 'deployment',
    question:
      'Which CodeDeploy deployment configuration shifts traffic gradually to a new environment while keeping the old one running, then terminates the original only after validation succeeds?',
    choices: ['In-place deployment', 'Blue/green deployment', 'All-at-once deployment', 'Rolling deployment'],
    correctIndex: 1,
    explanation:
      'Blue/green deployments provision a new (green) environment alongside the old (blue), shift traffic over (all at once or gradually), and only decommission blue after green is verified healthy — enabling fast rollback.',
  },
  {
    id: 'dep-2',
    domain: 'deployment',
    question:
      'In a CodeDeploy deployment, which file defines the deployment lifecycle hooks (like BeforeInstall, AfterInstall, ApplicationStart) and what files to copy?',
    choices: ['buildspec.yml', 'appspec.yml', 'template.yaml', 'Dockerfile'],
    correctIndex: 1,
    explanation:
      'appspec.yml (AppSpec file) tells CodeDeploy what to install and defines lifecycle event hooks to run scripts at each stage of a deployment.',
  },
  {
    id: 'dep-3',
    domain: 'deployment',
    question:
      'What is the purpose of buildspec.yml in AWS CodeBuild?',
    choices: [
      'It defines IAM permissions for the build project',
      'It declares the build commands, phases (install, pre_build, build, post_build), and artifacts to produce',
      'It configures the CodePipeline stages',
      'It defines the CloudFormation stack resources',
    ],
    correctIndex: 1,
    explanation:
      'buildspec.yml is CodeBuild\'s build specification — it lists build phases, commands to run, environment variables, and which files become output artifacts.',
  },
  {
    id: 'dep-4',
    domain: 'deployment',
    question:
      'Which Elastic Beanstalk deployment policy takes existing instances out of service in small batches while deploying the new version, but risks reduced capacity during the deployment and offers no immediate full rollback of "in place" batches already updated?',
    choices: ['All at once', 'Rolling', 'Immutable', 'Blue/green (via swap environment URL)'],
    correctIndex: 1,
    explanation:
      'Rolling deployments update a configurable batch of instances at a time in place, reducing (but not eliminating) capacity during rollout. All-at-once has zero extra cost but full downtime risk; Immutable launches an entirely new, fully separate instance group before swapping.',
  },
  {
    id: 'dep-5',
    domain: 'deployment',
    question:
      'You want a Lambda function to shift traffic from the old version to a new version gradually (e.g., 10% every few minutes) with automatic rollback on CloudWatch alarm, using an alias. Which service enables this?',
    choices: ['CodeBuild', 'CodeDeploy (canary/linear deployment via a Lambda alias)', 'CloudFormation StackSets', 'Elastic Beanstalk'],
    correctIndex: 1,
    explanation:
      'CodeDeploy integrates with Lambda aliases to perform canary or linear traffic shifting between the old and new function versions, with automatic rollback triggered by CloudWatch alarms.',
  },
  {
    id: 'dep-6',
    domain: 'deployment',
    question:
      'What CloudFormation feature lets you preview what changes will be made to your stack (resources added, modified, or replaced) before actually applying an update?',
    choices: ['Stack policies', 'Change sets', 'Drift detection', 'Nested stacks'],
    correctIndex: 1,
    explanation:
      'A change set shows a summary of proposed changes to a stack before you execute them, so you can catch unintended resource replacements (e.g., a change that would recreate a database) before it happens.',
  },
  {
    id: 'dep-7',
    domain: 'deployment',
    question:
      'Which AWS Serverless Application Model (SAM) command packages your local code, uploads artifacts to S3, and transforms your SAM template into a full CloudFormation template ready to deploy?',
    choices: ['sam init', 'sam local invoke', 'sam package / sam build + sam deploy', 'sam logs'],
    correctIndex: 2,
    explanation:
      '`sam build` compiles/prepares your code, and `sam package` (or the combined `sam deploy` with `--guided`) uploads artifacts and produces/executes the transformed CloudFormation template.',
  },
  {
    id: 'dep-8',
    domain: 'deployment',
    question:
      'What is the main benefit of using nested stacks in CloudFormation?',
    choices: [
      'They deploy faster than a single flat stack in all cases',
      'They let you break large templates into reusable, composable units referenced from a parent stack',
      'They remove the need for IAM permissions',
      'They automatically version your infrastructure in Git',
    ],
    correctIndex: 1,
    explanation:
      'Nested stacks let you modularize common patterns (e.g., a standard VPC or logging setup) into reusable templates referenced by AWS::CloudFormation::Stack resources in a parent template.',
  },
  {
    id: 'dep-9',
    domain: 'deployment',
    question:
      'Which ECS launch type removes the need to provision or manage the underlying EC2 instances that run your containers?',
    choices: ['EC2 launch type', 'Fargate launch type', 'On-premises (ECS Anywhere)', 'Spot Fleet launch type'],
    correctIndex: 1,
    explanation:
      'Fargate is a serverless compute engine for containers — AWS manages the underlying infrastructure; you just define task definitions with CPU/memory requirements.',
  },
  {
    id: 'dep-10',
    domain: 'deployment',
    question:
      'In CodePipeline, what is passed between stages (e.g., from a Source stage to a Build stage) to let each stage act on the output of the previous one?',
    choices: ['IAM roles', 'Artifacts (typically stored in S3)', 'CloudWatch Events only', 'Parameter Store values only'],
    correctIndex: 1,
    explanation:
      'Each pipeline stage can produce output artifacts (zipped and stored in an S3 artifact bucket) that subsequent stages declare as input artifacts, chaining the flow of code/build output through the pipeline.',
  },
  {
    id: 'dep-11',
    domain: 'deployment',
    question:
      'Which CloudFormation intrinsic function would you use to reference the value of another resource\'s attribute, such as an S3 bucket\'s ARN, within the same template?',
    choices: ['Fn::Join', 'Fn::GetAtt', 'Fn::ImportValue', 'Fn::Sub only'],
    correctIndex: 1,
    explanation:
      'Fn::GetAtt returns the value of an attribute from a resource in the same template (e.g., !GetAtt MyBucket.Arn). Fn::ImportValue is for values exported from a different stack.',
  },
  {
    id: 'dep-12',
    domain: 'deployment',
    question:
      'What happens during an Elastic Beanstalk "immutable" deployment if health checks on the new instances fail?',
    choices: [
      'The old environment is already gone, so there is no rollback possible',
      'The new (temporary) Auto Scaling group of instances is simply terminated, leaving the original environment untouched and unaffected',
      'Beanstalk automatically deletes the entire application',
      'Traffic is permanently split 50/50 between old and new',
    ],
    correctIndex: 1,
    explanation:
      'Immutable deployments launch a completely new, temporary Auto Scaling group alongside the existing one. If the new instances fail health checks, they are simply torn down, and the original, untouched environment continues serving traffic — a very safe rollback story.',
  },
  {
    id: 'dep-13',
    domain: 'deployment',
    question:
      'What CloudFormation feature lets you deploy the same stack template consistently across multiple AWS accounts and Regions from a single administrative account?',
    choices: ['Nested stacks', 'StackSets', 'Change sets', 'Stack policies'],
    correctIndex: 1,
    explanation:
      'CloudFormation StackSets extend stacks by letting you create, update, or delete stacks across multiple accounts and Regions with a single operation — common for organization-wide baseline resources.',
  },
  {
    id: 'dep-14',
    domain: 'deployment',
    question:
      'By default, what happens to a CloudFormation-managed resource (like an RDS database) when its stack is deleted, unless you configure otherwise?',
    choices: [
      'It is automatically backed up forever at no cost',
      'It is deleted along with the stack, unless a DeletionPolicy of Retain or Snapshot is set on that resource',
      'CloudFormation always prompts for manual confirmation per resource',
      'It is automatically migrated to a new stack',
    ],
    correctIndex: 1,
    explanation:
      'Resources are deleted by default when their stack is deleted. Setting DeletionPolicy: Retain leaves the resource in place (orphaned from the stack), while Snapshot (supported by RDS, EBS, ElastiCache, Redshift) takes a final snapshot before deletion.',
  },
  {
    id: 'dep-15',
    domain: 'deployment',
    question:
      'How does a CloudFormation template share a value (like a VPC ID) so that a different, independent stack can consume it?',
    choices: [
      'The producing stack declares an Output with an Export name; the consuming stack uses Fn::ImportValue to reference it',
      'All stacks automatically share a global variable namespace',
      'Only nested stacks can share values, via Parameters passed at creation',
      'You must manually copy the value into the second template\'s source code',
    ],
    correctIndex: 0,
    explanation:
      'Cross-stack references work by exporting an Output value with a unique name in one stack, then using Fn::ImportValue in another stack to consume it — useful for sharing networking or shared-resource IDs between independently managed stacks.',
  },
  {
    id: 'dep-16',
    domain: 'deployment',
    question:
      'What is the purpose of an .ebextensions configuration file in an Elastic Beanstalk application source bundle?',
    choices: [
      'It defines the CodePipeline stages for the app',
      'It customizes the Beanstalk environment — installing packages, running commands, or configuring resources — beyond the platform defaults',
      'It is required only for Docker-based Beanstalk platforms',
      'It replaces the need for an application version',
    ],
    correctIndex: 1,
    explanation:
      '.ebextensions is a directory of YAML/JSON config files bundled with your source code that let you customize software, run commands, set environment resources, and more during environment provisioning.',
  },
  {
    id: 'dep-17',
    domain: 'deployment',
    question:
      'Which Elastic Beanstalk environment tier is designed to process background jobs pulled from an SQS queue rather than serve HTTP web traffic directly?',
    choices: ['Web server tier', 'Worker tier', 'Multi-container Docker tier', 'Load-balanced tier'],
    correctIndex: 1,
    explanation:
      'The Worker tier runs an internal SQS daemon that pulls messages from a queue and POSTs them to your application, ideal for background/async job processing, decoupled from the web-facing tier.',
  },
  {
    id: 'dep-18',
    domain: 'deployment',
    question:
      'How can you speed up repeated CodeBuild runs that reinstall the same large set of dependencies (e.g., npm or Maven packages) on every build?',
    choices: [
      'Increase the build\'s compute type only',
      'Enable CodeBuild caching (local or S3) to persist dependency directories between builds',
      'Switch to a smaller Docker image',
      'Disable the install phase entirely',
    ],
    correctIndex: 1,
    explanation:
      'CodeBuild supports caching (S3-based or local Docker layer/source/custom caching) so dependency directories like node_modules or .m2 can persist between build runs, cutting down repeated download/install time.',
  },
  {
    id: 'dep-19',
    domain: 'deployment',
    question:
      'You want a CodePipeline release to pause and wait for a human to explicitly approve it (e.g., before deploying to production) before continuing. What should you add?',
    choices: ['A Test action', 'A Manual approval action', 'An additional Source stage', 'A CodeBuild stage with a sleep command'],
    correctIndex: 1,
    explanation:
      'A Manual approval action pauses the pipeline and (optionally via SNS) notifies approvers; the pipeline only proceeds once someone approves it in the console or via the API.',
  },
  {
    id: 'dep-20',
    domain: 'deployment',
    question:
      'What is the AWS Cloud Development Kit (CDK) primarily used for?',
    choices: [
      'Writing CloudFormation templates in familiar programming languages (TypeScript, Python, Java, etc.), which synthesize into CloudFormation templates',
      'Replacing IAM entirely with code-based permissions',
      'A GUI-only tool for clicking through infrastructure setup',
      'A container orchestration engine, alternative to ECS',
    ],
    correctIndex: 0,
    explanation:
      'CDK lets you define infrastructure using general-purpose programming languages with reusable constructs; `cdk synth` compiles that code down into standard CloudFormation templates, which are then deployed like any other stack.',
  },
  {
    id: 'dep-21',
    domain: 'deployment',
    question:
      'When CodeDeploy performs a deployment to an ECS service using blue/green, what AWS resource is used to shift traffic between the old and new task sets?',
    choices: [
      'An Application Load Balancer with two target groups',
      'A Network ACL',
      'A Route 53 hosted zone only, with no load balancer involved',
      'An SQS queue',
    ],
    correctIndex: 0,
    explanation:
      'ECS blue/green deployments via CodeDeploy use an ALB (or NLB) with two target groups — one for the current task set, one for the new one — and CodeDeploy shifts listener traffic between them, similar to EC2 blue/green.',
  },
  {
    id: 'dep-22',
    domain: 'deployment',
    question:
      'A CloudFormation template needs to let the person deploying the stack choose the EC2 instance type at deploy time, instead of hardcoding it. What should the template declare?',
    choices: ['A Mapping', 'A Parameter', 'A Condition', 'An Output'],
    correctIndex: 1,
    explanation:
      'Parameters let a template accept input values at stack creation/update time (e.g., InstanceType, Environment), which can then be referenced elsewhere in the template with Ref.',
  },
  {
    id: 'dep-23',
    domain: 'deployment',
    question:
      'Which artifact repository service would you use to securely store and share software packages (npm, Maven, PyPI, NuGet) across your organization\'s build pipelines?',
    choices: ['AWS CodeArtifact', 'AWS CodeStar', 'Amazon ECR', 'AWS Systems Manager'],
    correctIndex: 0,
    explanation:
      'CodeArtifact is a managed artifact repository for common package formats (npm, PyPI, Maven, NuGet), letting teams securely publish, store, and share dependencies, often as an upstream proxy to public repositories.',
  },

  // ---------------------------------------------------------------------
  // Troubleshooting and Optimization
  // ---------------------------------------------------------------------
  {
    id: 'tr-1',
    domain: 'troubleshooting',
    question:
      'A Lambda function intermittently fails with "Task timed out after 3.00 seconds". What is the most direct fix?',
    choices: [
      'Increase the function\'s memory allocation only',
      'Increase the function\'s configured timeout (and investigate/optimize slow dependencies)',
      'Switch the function to a container image',
      'Add a dead-letter queue',
    ],
    correctIndex: 1,
    explanation:
      'A timeout error means the function exceeded its configured maximum duration. You should raise the timeout setting appropriately and investigate why the code/dependency call is slow. (Raising memory also raises proportional CPU, which can help indirectly, but the direct fix is the timeout setting plus root-causing the slowness.)',
  },
  {
    id: 'tr-2',
    domain: 'troubleshooting',
    question:
      'You see many DynamoDB ProvisionedThroughputExceededException / throttling errors, and CloudWatch shows uneven consumption across partitions. What is the most likely root cause?',
    choices: [
      'The table has too many GSIs',
      'A hot partition, caused by a partition key with low cardinality or highly skewed access patterns',
      'The AWS Region is experiencing an outage',
      'The table is missing a sort key',
    ],
    correctIndex: 1,
    explanation:
      'Throttling with uneven partition consumption is the classic sign of a "hot partition" — too many requests hitting the same partition key value(s). The fix is usually a better-distributed key design (e.g., write sharding) or switching to on-demand capacity.',
  },
  {
    id: 'tr-3',
    domain: 'troubleshooting',
    question:
      'Which tool provides an end-to-end view of requests as they travel through multiple services (API Gateway → Lambda → DynamoDB), helping you find latency bottlenecks?',
    choices: ['CloudTrail', 'AWS X-Ray', 'AWS Config', 'CloudWatch Logs Insights alone'],
    correctIndex: 1,
    explanation:
      'X-Ray traces requests across service boundaries, building a service map with per-segment/subsegment timing so you can pinpoint which downstream call is causing latency.',
  },
  {
    id: 'tr-4',
    domain: 'troubleshooting',
    question:
      'An API Gateway endpoint backed by Lambda returns HTTP 502 "Bad Gateway" errors. What is a common cause?',
    choices: [
      'The client sent malformed JSON',
      'The Lambda function returned a response in an invalid format for the configured integration (e.g., missing required fields for proxy integration)',
      'The API key is invalid',
      'CORS is misconfigured',
    ],
    correctIndex: 1,
    explanation:
      '502 errors from a Lambda proxy integration usually mean the Lambda response body isn\'t valid JSON matching the expected structure (e.g., missing statusCode/body/headers), or the function crashed/threw an unhandled exception.',
  },
  {
    id: 'tr-5',
    domain: 'troubleshooting',
    question:
      'You need to run ad-hoc, SQL-like queries across large volumes of CloudWatch Logs to find patterns and aggregate fields without exporting logs elsewhere. Which tool should you use?',
    choices: ['CloudWatch Logs Insights', 'CloudTrail Lake', 'AWS Config Rules', 'X-Ray Analytics'],
    correctIndex: 0,
    explanation:
      'CloudWatch Logs Insights provides a purpose-built query language to search, filter, and aggregate log data directly within CloudWatch, without needing to export logs to another system.',
  },
  {
    id: 'tr-6',
    domain: 'troubleshooting',
    question:
      'A Lambda function processing an SQS queue keeps failing on the same "poison pill" message, blocking the queue for other messages after retries are exhausted. What should be configured to isolate it?',
    choices: [
      'A visibility timeout of 0',
      'A dead-letter queue (DLQ) with a maxReceiveCount, so the message is moved aside after repeated failures',
      'FIFO ordering',
      'A larger Lambda memory setting',
    ],
    correctIndex: 1,
    explanation:
      'Configuring a redrive policy with a DLQ and maxReceiveCount automatically moves messages that repeatedly fail processing out of the main queue, so they stop blocking other messages while remaining available for later inspection.',
  },
  {
    id: 'tr-7',
    domain: 'troubleshooting',
    question:
      'Which CloudWatch feature lets you trigger an action (like an SNS notification or Auto Scaling policy) automatically when a metric crosses a defined threshold?',
    choices: ['CloudWatch Alarms', 'CloudWatch Dashboards', 'CloudWatch Synthetics', 'CloudWatch Contributor Insights'],
    correctIndex: 0,
    explanation:
      'CloudWatch Alarms watch a metric over a period and change state (e.g., to ALARM) when a threshold is breached, which can then trigger notifications or automated actions.',
  },
  {
    id: 'tr-8',
    domain: 'troubleshooting',
    question:
      'Your application publishes a custom business metric (like "orders processed") to CloudWatch. What API call is used to send custom metrics?',
    choices: ['PutMetricData', 'PutLogEvents', 'PutMetricAlarm', 'PutDashboard'],
    correctIndex: 0,
    explanation:
      'PutMetricData publishes custom metric data points to CloudWatch, which can then be graphed, alarmed on, and aggregated just like built-in AWS service metrics.',
  },
  {
    id: 'tr-9',
    domain: 'troubleshooting',
    question:
      'A Lambda function\'s execution duration is consistently near its memory-proportional CPU limit, and increasing memory noticeably reduces total duration. What is the most cost-effective next step?',
    choices: [
      'Leave memory as-is since Lambda always charges the same regardless of memory',
      'Use AWS Lambda Power Tuning (or manual testing) to find the memory setting that minimizes cost x duration',
      'Switch to a scheduled EC2 instance instead',
      'Reduce the timeout to force faster execution',
    ],
    correctIndex: 1,
    explanation:
      'Since Lambda cost is a function of both memory allocated and execution duration, and more memory means more CPU, the sweet spot isn\'t always the minimum memory. Power tuning approaches test multiple memory sizes to find the best cost/performance balance.',
  },
  {
    id: 'tr-10',
    domain: 'troubleshooting',
    question:
      'Users report that responses from your API are slow for frequently repeated, identical GET requests. Which API Gateway feature can reduce backend load and latency for these repeat requests?',
    choices: ['API Gateway caching', 'Usage plans', 'Request validators', 'Custom domain names'],
    correctIndex: 0,
    explanation:
      'API Gateway response caching stores responses for a configurable TTL per stage, serving repeat identical requests from cache instead of invoking the backend integration every time.',
  },
  {
    id: 'tr-11',
    domain: 'troubleshooting',
    question:
      'What tool would you use to record and audit every API call made in your AWS account (who called what action, when, and from where), for security analysis or compliance?',
    choices: ['CloudWatch Logs', 'AWS CloudTrail', 'AWS X-Ray', 'VPC Flow Logs'],
    correctIndex: 1,
    explanation:
      'CloudTrail records API activity (management and, optionally, data events) across your account as an audit trail, distinct from CloudWatch (metrics/logs/alarms) and X-Ray (distributed tracing).',
  },
  {
    id: 'tr-12',
    domain: 'troubleshooting',
    question:
      'You want a single CloudWatch alarm to only fire when several underlying alarms (e.g., high latency AND high error rate) are simultaneously in ALARM state, to reduce noisy individual alerts. What should you create?',
    choices: ['A composite alarm', 'A metric filter', 'An anomaly detection alarm', 'A dashboard widget'],
    correctIndex: 0,
    explanation:
      'Composite alarms combine the states of multiple existing alarms using AND/OR logic (an alarm rule expression) into one, reducing alert noise by only notifying when the meaningful combination of conditions occurs.',
  },
  {
    id: 'tr-13',
    domain: 'troubleshooting',
    question:
      'Which X-Ray concept lets you attach custom, indexed key-value data (like a customer ID or order ID) to a trace segment so you can search and filter traces by it later?',
    choices: ['Sampling rules', 'Annotations', 'Subsegments', 'The service map'],
    correctIndex: 1,
    explanation:
      'Annotations are indexed key-value pairs on a segment/subsegment that X-Ray lets you filter and group traces by. Metadata is similar but not indexed/searchable — useful for extra debugging context instead.',
  },
  {
    id: 'tr-14',
    domain: 'troubleshooting',
    question:
      'A Lambda function\'s traffic pattern is spiky and unpredictable, and you are seeing occasional 429 throttling errors during bursts even though total daily invocations are low. What is a likely fix?',
    choices: [
      'Reduce the function\'s memory allocation',
      'Increase reserved/account concurrency limits for the function, or smooth bursts with an SQS buffer in front of it',
      'Switch the function\'s runtime language',
      'Disable X-Ray tracing',
    ],
    correctIndex: 1,
    explanation:
      'Throttling during bursts usually means the concurrency limit (account-level or function-reserved) is being hit momentarily. Raising the limit (if you have headroom) or buffering bursty invocations through SQS smooths the spike.',
  },
  {
    id: 'tr-15',
    domain: 'troubleshooting',
    question:
      'Which logs would you enable on a VPC to record IP traffic metadata (source/destination, port, protocol, accept/reject) going to and from network interfaces, useful for diagnosing connectivity issues?',
    choices: ['CloudTrail data events', 'VPC Flow Logs', 'S3 access logs', 'ALB access logs'],
    correctIndex: 1,
    explanation:
      'VPC Flow Logs capture IP traffic information for network interfaces in a VPC — essential for diagnosing whether traffic is being blocked by a security group/NACL or simply not arriving.',
  },
  {
    id: 'tr-16',
    domain: 'troubleshooting',
    question:
      'In API Gateway, what is the difference between enabling "execution logs" and enabling "access logs" for a stage?',
    choices: [
      'They are two names for the exact same feature',
      'Execution logs capture detailed request/response processing steps (useful for debugging integration errors); access logs capture a customizable summary of each request (method, path, status, latency) for analytics',
      'Access logs are only available for HTTP APIs, execution logs only for REST APIs, with no overlap',
      'Execution logs are billed separately from CloudWatch entirely',
    ],
    correctIndex: 1,
    explanation:
      'Execution (CloudWatch) logs give step-by-step details of request handling — great for debugging why an integration failed. Access logs give a structured, customizable log line per request, better suited for traffic analytics and dashboards.',
  },
  {
    id: 'tr-17',
    domain: 'troubleshooting',
    question:
      'DynamoDB\'s adaptive capacity feature helps with which specific problem?',
    choices: [
      'It automatically compresses item sizes to save storage cost',
      'It automatically and transparently helps absorb some non-uniform (hot key) traffic within a table\'s allocated throughput, without needing manual intervention',
      'It removes the need for indexes entirely',
      'It automatically archives old items to S3 Glacier',
    ],
    correctIndex: 1,
    explanation:
      'Adaptive capacity works in the background to isolate frequently accessed items onto their own partitions and can raise effective throughput on hot partitions instantly, reducing (but not eliminating the need to design against) throttling from uneven access patterns.',
  },
  {
    id: 'tr-18',
    domain: 'troubleshooting',
    question:
      'What is the recommended first step when a CloudFormation stack update fails and rolls back, before trying the update again?',
    choices: [
      'Immediately delete and recreate the entire stack',
      'Check the stack\'s Events tab (or CloudTrail/CloudWatch Logs for the failing resource) to identify which resource failed and why',
      'Increase the stack\'s timeout setting and retry blindly',
      'Switch the template from YAML to JSON',
    ],
    correctIndex: 1,
    explanation:
      'The CloudFormation Events tab shows a timeline of resource creation/update statuses and failure reasons, which is the fastest way to pinpoint exactly which resource failed and why before attempting a fix and retry.',
  },
];

export const QUESTIONS_BY_DOMAIN = QUESTIONS.reduce<Record<string, QuizQuestion[]>>((acc, q) => {
  (acc[q.domain] ??= []).push(q);
  return acc;
}, {});
