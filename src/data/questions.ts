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
];

export const QUESTIONS_BY_DOMAIN = QUESTIONS.reduce<Record<string, QuizQuestion[]>>((acc, q) => {
  (acc[q.domain] ??= []).push(q);
  return acc;
}, {});
