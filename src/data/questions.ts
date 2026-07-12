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
    correctIndexes: [1],
    explanation:
      'Provisioned concurrency pre-initializes execution environments so invocations are served instantly, eliminating cold starts. Reserved concurrency only caps/guarantees a concurrency ceiling — it does not keep functions warm.',
  },
  {
    id: 'dev-2',
    domain: 'development',
    question:
      'You need a DynamoDB table to support queries by a secondary attribute that is different from the partition key, with its own separate throughput allocation, addable at any time after the table already exists. What should you use?',
    choices: [
      'Local Secondary Index (LSI)',
      'Global Secondary Index (GSI)',
      'DynamoDB Streams',
      'DynamoDB Accelerator (DAX)',
    ],
    correctIndexes: [1],
    explanation:
      'GSIs have their own partition/sort key and throughput, and can be added or removed after table creation — but they only support eventually consistent reads. LSIs must be defined at table creation time, share the base table\'s partition key and throughput, but support both eventually and strongly consistent reads.',
  },
  {
    id: 'dev-3',
    domain: 'development',
    question:
      'Which API Gateway endpoint type serves requests through a CloudFront distribution owned by AWS and is ideal for use cases without strong latency requirements near a single region?',
    choices: ['Edge-optimized', 'Regional', 'Private', 'Local'],
    correctIndexes: [0],
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
    correctIndexes: [0],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [0],
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
    correctIndexes: [1],
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
    correctIndexes: [2],
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
    correctIndexes: [1],
    explanation:
      'AWS SDKs implement exponential backoff (increasing delay between attempts) with randomized jitter by default, which spreads out retries and reduces the chance of synchronized retry storms.',
  },
  {
    id: 'dev-11',
    domain: 'development',
    question:
      'You want to share common Lambda dependencies (like a large SDK or utility library) across multiple functions without bundling them into every deployment package. What should you use?',
    choices: ['Lambda layers', 'Lambda extensions', 'Container image caching', 'A shared S3 bucket'],
    correctIndexes: [0],
    explanation:
      'Layers let you package libraries/dependencies separately and attach them to multiple functions, reducing deployment package size and duplication.',
  },
  {
    id: 'dev-12',
    domain: 'development',
    question:
      'Which Step Functions state type is used to run branches of work in parallel within the same state machine execution?',
    choices: ['Map', 'Parallel', 'Choice', 'Wait'],
    correctIndexes: [1],
    explanation:
      'The Parallel state executes multiple fixed branches concurrently. Map is similar but dynamically iterates over items in an array, running the same branch for each.',
  },
  {
    id: 'dev-13',
    domain: 'development',
    question:
      'You need to write multiple items to a DynamoDB table in a single request to reduce round trips, but you do not need the writes to be atomic as a group. What API should you use?',
    choices: ['TransactWriteItems', 'BatchWriteItem', 'PutItem in a loop with exponential backoff', 'UpdateItem with a condition expression'],
    correctIndexes: [1],
    explanation:
      'BatchWriteItem puts or deletes up to 25 items across one or more tables in a single call, but each item write succeeds or fails independently (no atomicity). TransactWriteItems is for all-or-nothing atomic writes.',
  },
  {
    id: 'dev-14',
    domain: 'development',
    question:
      'A REST API built on API Gateway needs to transform an incoming request body into a different shape before it reaches the backend Lambda integration. What feature should you use?',
    choices: ['A Lambda authorizer', 'A mapping template (VTL) on the integration request', 'A usage plan', 'A gateway response'],
    correctIndexes: [1],
    explanation:
      'Mapping templates, written in Velocity Template Language (VTL), let you transform the request or response payload between the client and a non-proxy Lambda or HTTP integration.',
  },
  {
    id: 'dev-15',
    domain: 'development',
    question:
      'Which DynamoDB feature automatically replicates a table across multiple AWS Regions with multi-active, multi-Region writes?',
    choices: ['DynamoDB Streams', 'Global Tables', 'DynamoDB Accelerator (DAX)', 'On-demand backups'],
    correctIndexes: [1],
    explanation:
      'Global Tables provide a fully managed, multi-Region, multi-active replication solution — writes in any participating Region propagate to the others, useful for globally distributed low-latency applications.',
  },
  {
    id: 'dev-16',
    domain: 'development',
    question:
      'What is the purpose of a "dimension" on a CloudWatch metric?',
    choices: [
      'Dimensions are unrelated to metrics; they configure IAM policies',
      'A dimension is a name/value pair that helps categorize and filter a metric (e.g., by environment or function name)',
      'Dimensions define the retention period of a metric',
      'Dimensions control which Region a metric is published to',
    ],
    correctIndexes: [1],
    explanation:
      'Dimensions let you slice a metric by attributes like Environment=prod or FunctionName=MyFn, so you can filter and aggregate CloudWatch metrics meaningfully rather than lumping all data points together.',
  },
  {
    id: 'dev-17',
    domain: 'development',
    question:
      'A serverless HTTP API needs a lightweight way to invoke a single Lambda function directly over HTTPS, without setting up a full API Gateway API. What feature fits best?',
    choices: ['Lambda function URLs', 'Lambda layers', 'Lambda destinations', 'Lambda event source mappings'],
    correctIndexes: [0],
    explanation:
      'Lambda function URLs give a function its own dedicated HTTPS endpoint with no separate API Gateway resource needed — ideal for simple, single-function HTTP use cases like webhooks.',
  },
  {
    id: 'dev-18',
    domain: 'development',
    question:
      'Which caching service would you choose for a Redis-compatible, in-memory data store that supports replication, pub/sub, sorted sets, and Multi-AZ failover?',
    choices: ['Amazon ElastiCache for Redis', 'DynamoDB DAX', 'Amazon MQ', 'CloudFront caching'],
    correctIndexes: [0],
    explanation:
      'ElastiCache for Redis offers advanced data structures (sorted sets, pub/sub), replication, and Multi-AZ automatic failover. ElastiCache for Memcached is simpler and multi-threaded but lacks these features.',
  },
  {
    id: 'dev-19',
    domain: 'development',
    question:
      'You want a Step Functions state machine to automatically retry a failing Lambda task a few times with exponential backoff, then fall back to a different state if it still fails. Which fields do you use?',
    choices: ['Parallel and Choice', 'Retry and Catch', 'Wait and Succeed', 'Map and Fail'],
    correctIndexes: [1],
    explanation:
      'The Retry field configures automatic retries (with interval, backoff rate, and max attempts) for a state; the Catch field defines a fallback transition to another state when errors are not resolved by retries.',
  },
  {
    id: 'dev-20',
    domain: 'development',
    question:
      'Which S3 feature lets you run simple SQL-like queries directly against a subset of a CSV, JSON, or Parquet object, retrieving only the data you need instead of downloading the whole object?',
    choices: ['S3 Select', 'S3 Batch Operations', 'S3 Inventory', 'S3 Object Lambda'],
    correctIndexes: [0],
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
    correctIndexes: [0],
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
    correctIndexes: [1],
    explanation:
      'CloudFront is a CDN that caches responses at edge locations worldwide, reducing latency for end users and reducing load on the origin (S3, ALB, or a custom origin).',
  },
  {
    id: 'dev-23',
    domain: 'development',
    question:
      'Which AWS service provides a managed message broker supporting industry-standard protocols like JMS and AMQP, useful when migrating an existing application off of ActiveMQ or RabbitMQ?',
    choices: ['Amazon MQ', 'Amazon SQS', 'Amazon SNS', 'Amazon EventBridge'],
    correctIndexes: [0],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'When concurrency limits are exceeded, Lambda throttles further invocations. Synchronous callers receive a 429/ThrottlingException they must handle; async invocations and most poll-based event sources retry automatically.',
  },
  {
    id: 'dev-26',
    domain: 'development',
    question:
      'Which Amazon Cognito feature provides a prebuilt, customizable web sign-in/sign-up page so you do not have to build your own login UI?',
    choices: ['Identity pools', 'The Cognito Hosted UI', 'Cognito Sync', 'User pool Lambda triggers'],
    correctIndexes: [1],
    explanation:
      'The Hosted UI is a Cognito-provided, customizable webpage for sign-up, sign-in, and federation with social/SAML identity providers, saving you from building that UI from scratch.',
  },
  {
    id: 'dev-27',
    domain: 'development',
    question:
      'A developer is building a serverless application with AWS SAM. Before deploying to AWS, the developer wants to invoke a specific Lambda function locally, passing in a sample event payload, to verify its behavior without incurring any AWS costs or needing an internet connection. Which command should the developer use?',
    choices: ['sam deploy --guided', 'sam local invoke FunctionName -e event.json', 'sam validate', 'sam logs -n FunctionName --tail'],
    correctIndexes: [1],
    explanation:
      '`sam local invoke` runs a Lambda function in a local Docker container that emulates the Lambda execution environment, accepting an event payload via -e, letting developers test function logic locally before ever deploying.',
  },
  {
    id: 'dev-28',
    domain: 'development',
    question:
      'A developer is writing automated tests for application code that calls DynamoDB, S3, and SQS. The team wants the tests to run in a CI pipeline without making real calls to AWS or incurring any cost, while still exercising realistic request/response behavior. Which approach best fits this requirement?',
    choices: [
      'Run the tests directly against the production AWS account with a low-privilege IAM user',
      'Use a local AWS service emulator, such as LocalStack, and point the SDK at local endpoints during tests',
      'Mock every SDK call to always return an empty successful response',
      'Skip automated testing and rely on manual QA in a staging AWS account',
    ],
    correctIndexes: [1],
    explanation:
      'Tools like LocalStack (or DynamoDB Local for just DynamoDB) emulate AWS service APIs locally, letting CI pipelines exercise realistic request/response behavior with no AWS cost, credentials, or network dependency. Blanket-stubbing every call loses realistic behavior; testing against production is unsafe and costly.',
  },
  {
    id: 'dev-29',
    domain: 'development',
    question:
      "A company's Lambda function processes orders from an SQS queue and must guarantee that messages are processed in the exact order they were sent for each customer, with no duplicate processing. Which TWO actions should the developer take? (Select TWO.)",
    choices: [
      'Use a FIFO SQS queue with a MessageGroupId set to the customer ID',
      'Use a Standard SQS queue with a very short visibility timeout',
      'Enable content-based deduplication, or supply a MessageDeduplicationId, on the FIFO queue',
      "Increase the Lambda function's reserved concurrency to the account's maximum limit",
      'Add a random delay before each SQS SendMessage call',
    ],
    correctIndexes: [0, 2],
    explanation:
      'FIFO queues guarantee ordering within a message group (scoped by MessageGroupId, e.g., per customer) and support deduplication via MessageDeduplicationId or content-based deduplication — together they guarantee ordered, effectively-once-per-dedup-interval processing. Standard queues do not guarantee strict ordering.',
  },
  {
    id: 'dev-30',
    domain: 'development',
    question:
      'A developer deployed a Lambda function behind API Gateway using a Lambda proxy integration. Clients now receive a generic 502 Bad Gateway error for every request, even though CloudWatch Logs show the function executing without throwing any exception. What is the most likely cause?',
    choices: [
      'The Lambda function is returning a plain string instead of the required JSON object with statusCode, headers, and body fields',
      'The client is sending an invalid Content-Type header',
      "The API Gateway usage plan quota has been exceeded",
      "The Lambda function's IAM execution role is missing permissions",
    ],
    correctIndexes: [0],
    explanation:
      "For proxy integrations, API Gateway requires the Lambda function to return a specific JSON shape (statusCode, headers, body). If the function returns anything else — even without throwing an error — API Gateway can't parse the response and returns 502.",
  },
  {
    id: 'dev-31',
    domain: 'development',
    question:
      'A retail company has an order-processing service that, whenever an order is placed, must notify a shipping service, a billing service, and an analytics pipeline — and the company expects to add more downstream consumers over time without modifying the order-processing service. Which approach requires the least change to the producer as new consumers are added?',
    choices: [
      "Have the order-processing service call each downstream service's API directly",
      'Publish an OrderPlaced event to Amazon EventBridge and let each consumer create its own rule to match the event',
      'Have each downstream service poll the order database on a schedule',
      "Hardcode a list of webhook URLs in the order-processing service's configuration",
    ],
    correctIndexes: [1],
    explanation:
      'EventBridge decouples producers from consumers: the producer publishes an event to a bus, and any number of consumers can independently create rules that match it — new consumers can be added with zero changes to the producer.',
  },
  {
    id: 'dev-32',
    domain: 'development',
    question:
      "A developer is designing a DynamoDB table for an application that needs to look up orders both by OrderId (the natural unique identifier) and, separately, by CustomerId to list all of a customer's orders sorted by order date. Which TWO design elements should the table include? (Select TWO.)",
    choices: [
      "OrderId as the partition key of the base table",
      'A Global Secondary Index with CustomerId as its partition key and OrderDate as its sort key',
      'A second DynamoDB table that duplicates every item, keyed by CustomerId',
      'DynamoDB Streams replaying every write into a separate search index for this query',
      "CustomerId as the sort key of the base table's primary key",
    ],
    correctIndexes: [0, 1],
    explanation:
      "OrderId as the base table's partition key supports direct order lookups. A GSI with CustomerId as partition key and OrderDate as sort key supports the \"all of a customer's orders, sorted by date\" access pattern — standard single-table-design technique, avoiding a duplicate table or a streams-based search index for this simple case.",
  },
  {
    id: 'dev-33',
    domain: 'development',
    question:
      'An asynchronously invoked Lambda function occasionally fails. The team wants both failed and successful invocations routed to different downstream targets (an SQS queue for failures, an EventBridge bus for successes) without writing custom retry/routing code inside the function itself. What should the developer configure?',
    choices: [
      'A dead-letter queue (DLQ) only',
      'Lambda Destinations, configuring separate OnSuccess and OnFailure targets',
      'An increased SQS visibility timeout',
      'A CloudWatch Logs subscription filter',
    ],
    correctIndexes: [1],
    explanation:
      'Lambda Destinations route the results of asynchronous invocations — both success and failure — to different targets (SQS, SNS, EventBridge, or another Lambda), which a plain DLQ (failure-only) cannot do.',
  },
  {
    id: 'dev-34',
    domain: 'development',
    question:
      'A company is building a real-time analytics pipeline where multiple independent applications each need to process the entire stream of clickstream events in the same order, and the pipeline must retain the last 24 hours of data for reprocessing if a consumer falls behind. Which service best fits this requirement?',
    choices: [
      'Amazon SQS Standard queue',
      'Amazon SQS FIFO queue',
      'Amazon Kinesis Data Streams',
      'Amazon SNS with multiple subscribers',
    ],
    correctIndexes: [2],
    explanation:
      "Kinesis Data Streams retains data for a configurable window (up to 365 days) and supports multiple independent consumers reading the same ordered stream at their own pace — SQS messages are removed once consumed by one consumer (fan-out requires SNS+SQS), and SNS doesn't retain or replay data.",
  },
  {
    id: 'dev-35',
    domain: 'development',
    question:
      'An order-processing workflow must deduct inventory from one DynamoDB item and insert a new order item in a second table, with both writes succeeding or both failing together — a partial write would leave inventory incorrect. What should you use?',
    choices: [
      'Two separate PutItem calls wrapped in a try/catch block',
      'TransactWriteItems to perform both writes as a single all-or-nothing transaction',
      'BatchWriteItem, which guarantees atomicity across items',
      'DynamoDB Streams to roll back the second write if the first fails',
    ],
    correctIndexes: [1],
    explanation:
      "TransactWriteItems groups up to 100 write operations (across one or more tables) into a single all-or-nothing transaction — either every write succeeds or none do. BatchWriteItem is NOT atomic (individual item failures don't roll back the others); a try/catch around separate calls can't undo a write that already succeeded.",
  },
  {
    id: 'dev-36',
    domain: 'development',
    question:
      'A DynamoDB table stores session data that should be automatically deleted about 24 hours after creation, without the application running any cleanup jobs or consuming write capacity to delete expired items. What should you configure?',
    choices: [
      'A GSI sorted by creation timestamp, queried periodically to find and delete old items',
      'Time to Live (TTL), setting an expiry timestamp attribute on each item',
      'A DynamoDB Stream with a Lambda consumer that deletes old items nightly',
      'S3 Lifecycle rules pointed at the table',
    ],
    correctIndexes: [1],
    explanation:
      "DynamoDB TTL lets you designate an attribute holding an epoch timestamp; DynamoDB automatically deletes the item after that time, at no extra write-capacity cost and without any application-managed cleanup job. TTL deletes aren't instantaneous (typically within 48 hours) but require no polling or extra infrastructure.",
  },
  {
    id: 'dev-37',
    domain: 'development',
    question:
      'A SaaS company exposes a public REST API through API Gateway and wants to give each paying customer a distinct API key, enforce a different request-rate limit per customer tier, and track usage per key. What should you configure?',
    choices: [
      'A separate API Gateway deployment per customer',
      'API Gateway usage plans with associated API keys, and require the key on each method',
      'IAM resource policies scoped to each customer\'s IP range',
      'A Lambda authorizer that hardcodes each customer\'s rate limit in code',
    ],
    correctIndexes: [1],
    explanation:
      'Usage plans let you define throttle (rate/burst) and quota limits, then associate one or more API keys with a plan; clients pass the key in a header, and API Gateway enforces the plan and reports usage per key — no need for separate deployments or custom rate-limiting code.',
  },
  {
    id: 'dev-38',
    domain: 'development',
    question:
      'A trading application needs the server to push live price updates to connected clients as they happen, and clients also occasionally send messages to the server on the same long-lived connection. Which API Gateway API type fits this?',
    choices: [
      'REST API with long polling',
      'HTTP API with a 29-second timeout',
      'WebSocket API',
      'Edge-optimized REST API with CloudFront',
    ],
    correctIndexes: [2],
    explanation:
      'API Gateway WebSocket APIs maintain a persistent, full-duplex connection between client and server, so either side can push messages at any time — the right fit for real-time, bidirectional use cases like live price feeds or chat, unlike REST/HTTP APIs which are request/response only.',
  },
  {
    id: 'dev-39',
    domain: 'development',
    question:
      'Multiple producers send orders to a FIFO SQS queue. Orders for the same customer must be processed in the order they were sent, but orders for different customers can be processed in parallel without waiting on each other. What should you set on each message?',
    choices: [
      'A unique MessageDeduplicationId per message',
      'The same MessageGroupId for all messages in the queue',
      'A distinct MessageGroupId per customer (e.g., the customer ID)',
      'DelaySeconds proportional to the customer ID',
    ],
    correctIndexes: [2],
    explanation:
      "FIFO queues guarantee order only within a message group. Setting MessageGroupId to the customer ID keeps each customer's orders strictly ordered while allowing SQS to deliver different customers' groups to consumers in parallel — using one shared group ID would force strict ordering across all customers, serializing everything.",
  },
  {
    id: 'dev-40',
    domain: 'development',
    question:
      'A Step Functions state machine receives an array of an unknown number of image files and must run the same resize-and-upload Lambda function once per file, independently, with a configurable ceiling on how many run concurrently. Which state type fits this?',
    choices: [
      'Parallel state, with one fixed branch per possible file',
      'Map state, iterating the Lambda task over each array element',
      'Choice state, routing based on array length',
      'Pass state, forwarding the array unchanged to a single Lambda invocation',
    ],
    correctIndexes: [1],
    explanation:
      "A Map state dynamically iterates a task over every item in an input array — exactly the fit for a variable-length list of files — and supports a MaxConcurrency setting to cap parallel executions. Parallel states define a fixed number of hardcoded branches, which doesn't work for an unknown, variable count of items.",
  },
  {
    id: 'dev-41',
    domain: 'development',
    question:
      "A Java Lambda function has unacceptably long cold-start latency for a latency-sensitive, low-traffic API, and the team doesn't want to pay for provisioned concurrency around the clock. What Lambda feature directly targets this?",
    choices: [
      'Lambda SnapStart, which caches an initialized execution environment snapshot and resumes from it',
      'Increasing the function timeout',
      'Switching the handler to use synchronous invocation',
      'Enabling X-Ray tracing',
    ],
    correctIndexes: [0],
    explanation:
      'Lambda SnapStart initializes the function once, then caches an encrypted snapshot of that initialized execution environment (memory and disk state); new invocations resume from the snapshot instead of running init from scratch, cutting cold-start latency for supported runtimes (like Java) without paying for always-on provisioned concurrency.',
  },
  {
    id: 'dev-42',
    domain: 'development',
    question:
      'A mobile app needs to let users upload a photo directly to a private S3 bucket without giving the app any long-lived AWS credentials, and the upload permission should expire a few minutes after being issued. What should the backend generate?',
    choices: [
      'An IAM user access key embedded in the app',
      'A presigned URL for the S3 PutObject operation, with a short expiration',
      'A public bucket policy allowing anonymous PutObject',
      "The backend's own IAM role credentials, shared with the app",
    ],
    correctIndexes: [1],
    explanation:
      "A presigned URL is generated server-side using the backend's credentials but grants the bearer time-limited permission to perform one specific S3 operation (like PutObject) without exposing any actual AWS credentials to the client — ideal for letting an untrusted client upload directly to a private bucket.",
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Envelope encryption encrypts the actual data with a data encryption key (DEK), then encrypts that DEK with a KMS CMK. Only the small encrypted DEK needs to go to KMS, which is more efficient than sending all data through KMS.',
  },
  {
    id: 'sec-3',
    domain: 'security',
    question:
      'Which service is purpose-built for storing and automatically rotating database credentials, with native integration for rotation Lambda functions?',
    choices: ['SSM Parameter Store', 'AWS Secrets Manager', 'AWS KMS', 'IAM Access Analyzer'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Cross-account access is achieved by defining a role in the target account with a trust policy allowing the source account/principal to assume it, then calling sts:AssumeRole to get temporary credentials scoped to that role.',
  },
  {
    id: 'sec-5',
    domain: 'security',
    question:
      'Which S3 server-side encryption option lets you supply and manage your own encryption key while AWS performs the encryption/decryption, and AWS does not store the key?',
    choices: ['SSE-S3', 'SSE-KMS', 'SSE-C', 'Client-side encryption'],
    correctIndexes: [2],
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
    correctIndexes: [0],
    explanation:
      'Identity-based policies are attached to IAM principals. Resource-based policies (e.g., S3 bucket policies, SQS queue policies, Lambda resource policies) are attached to the resource itself and can grant cross-account access without requiring a role.',
  },
  {
    id: 'sec-7',
    domain: 'security',
    question:
      'A single-page web app hosted on one domain calls an API Gateway endpoint on a different domain. The browser blocks the request. What must be configured on the API?',
    choices: ['A resource policy allowing "*"', 'CORS headers on the API responses', 'A WAF rule', 'A VPC endpoint policy'],
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [0],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'A permissions boundary is an advanced feature that caps the maximum permissions an identity can have — the effective permissions are the intersection of the boundary and the identity-based policies, commonly used to safely delegate role/user creation.',
  },
  {
    id: 'sec-14',
    domain: 'security',
    question:
      'Which service should you use to provision, manage, and automatically renew free public SSL/TLS certificates for use with CloudFront, API Gateway (custom domains), or an Application Load Balancer?',
    choices: ['AWS KMS', 'AWS Certificate Manager (ACM)', 'IAM Access Analyzer', 'AWS Secrets Manager'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Services like S3, SNS, and EventBridge invoke Lambda using a resource-based (Lambda function) policy rather than assuming an IAM role — you grant the service principal lambda:InvokeFunction via AddPermission.',
  },
  {
    id: 'sec-16',
    domain: 'security',
    question:
      'Which S3 setting, when enabled at the account or bucket level, overrides any bucket policies or ACLs that would otherwise make objects publicly accessible?',
    choices: ['Versioning', 'S3 Block Public Access', 'Requester Pays', 'Transfer Acceleration'],
    correctIndexes: [1],
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
    correctIndexes: [0],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Every CMK has a resource-based key policy that is the primary access control. By default it must explicitly allow the account to use IAM policies to delegate permissions — without that delegation statement, IAM policies alone won\'t grant access.',
  },
  {
    id: 'sec-21',
    domain: 'security',
    question:
      'Which AWS service continuously analyzes IAM policies attached to your resources and identifies resources shared with an external entity, helping you find unintended public/cross-account access?',
    choices: ['AWS Trusted Advisor only', 'IAM Access Analyzer', 'AWS Config Rules only', 'Amazon Macie'],
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Security groups automatically allow return traffic for an allowed request (stateful). NACLs are stateless — they evaluate every packet in both directions against their rule lists, so you must explicitly allow both inbound and outbound (including ephemeral ports for return traffic).',
  },
  {
    id: 'sec-24',
    domain: 'security',
    question:
      'A company wants to allow developers to use the AWS Management Console only when connecting from the corporate office IP range, and deny console access from anywhere else, without affecting their use of the CLI/SDK from other locations. Which IAM policy element should be used?',
    choices: [
      'A permissions boundary set to DenyAllExceptOffice',
      'An explicit Deny statement with a Condition block using aws:SourceIp, scoped to console sign-in actions',
      'A resource-based policy attached to the IAM user',
      'Multi-factor authentication (MFA) enforcement alone',
    ],
    correctIndexes: [1],
    explanation:
      'IAM policy Condition blocks (e.g., the aws:SourceIp global condition key) restrict when a statement applies. An explicit Deny for actions outside the allowed IP range enforces the restriction regardless of any Allow elsewhere, since explicit Deny always wins.',
  },
  {
    id: 'sec-25',
    domain: 'security',
    question:
      'A company stores an Amazon RDS database password in AWS Secrets Manager and wants the password automatically rotated every 30 days with no application downtime and no manual password updates. Which TWO things should the company configure? (Select TWO.)',
    choices: [
      'Enable automatic rotation on the secret with a 30-day schedule',
      'Use the Secrets Manager RDS rotation Lambda function (or a custom rotation function) to update the credentials',
      'Store the password in a Lambda environment variable instead, and redeploy the function every 30 days',
      'Manually rotate the password in the RDS console and update Secrets Manager afterward',
      'Disable Secrets Manager encryption to allow faster rotation',
    ],
    correctIndexes: [0, 1],
    explanation:
      "Secrets Manager's built-in rotation, paired with its native RDS rotation Lambda template, automatically rotates the secret on a schedule and updates the RDS credentials with zero manual intervention — applications simply call GetSecretValue to always retrieve the current password.",
  },
  {
    id: 'sec-26',
    domain: 'security',
    question:
      "Company A hosts a data file in an S3 bucket and needs to grant Company B's AWS account (a completely separate account) read-only access to a single object prefix, without creating any IAM users or roles in Company A's account for Company B to use. What should Company A configure?",
    choices: [
      "An S3 bucket policy with a Principal referencing Company B's AWS account ID, scoped to the object prefix, granting s3:GetObject",
      'Make the entire bucket public',
      "Create an IAM user in Company A's account and share its access keys with Company B",
      'Enable S3 Transfer Acceleration',
    ],
    correctIndexes: [0],
    explanation:
      'A resource-based S3 bucket policy can grant access directly to a principal in another AWS account — no IAM role assumption, shared credentials, or public access required.',
  },
  {
    id: 'sec-27',
    domain: 'security',
    question:
      "An application running on Lambda needs temporary, fine-grained permission to use a specific KMS key for a single encryption operation, and that permission needs to be revocable independently without editing the key's policy document. What KMS feature fits this need?",
    choices: ['A KMS alias', 'A KMS grant', 'A customer-managed CMK with key rotation enabled', 'An IAM permissions boundary'],
    correctIndexes: [1],
    explanation:
      'KMS grants delegate temporary, fine-grained permissions to use a CMK without modifying the key policy, and can be individually revoked — useful for programmatic, short-lived access patterns.',
  },
  {
    id: 'sec-28',
    domain: 'security',
    question:
      'A backend API receives a JWT access token issued by a Cognito user pool on every request and must verify the token is genuine and unexpired before processing the request. Which TWO checks should the backend perform? (Select TWO.)',
    choices: [
      "Verify the token's signature using the user pool's public JSON Web Key Set (JWKS)",
      "Check the token's exp (expiration) claim against the current time",
      "Trust any token that begins with 'Bearer '",
      'Decode the token and check only that it is valid Base64',
      'Store every issued token in DynamoDB and check for membership on every request',
    ],
    correctIndexes: [0, 1],
    explanation:
      "Proper JWT validation requires verifying the cryptographic signature against the issuer's public keys (JWKS) and checking standard claims like exp. Decoding Base64 or checking a prefix does not verify authenticity or expiration.",
  },
  {
    id: 'sec-29',
    domain: 'security',
    question:
      "A company's Lambda functions run inside a private VPC subnet with no NAT gateway or internet gateway, and must call the DynamoDB API without any traffic leaving the AWS network. The functions are failing with connection timeouts when calling DynamoDB. What is the most likely fix?",
    choices: [
      'Attach an internet gateway to the private subnet',
      "Create a gateway VPC endpoint for DynamoDB and add a route to it in the subnet's route table",
      "Increase the Lambda function's timeout setting",
      'Move the Lambda functions out of the VPC entirely',
    ],
    correctIndexes: [1],
    explanation:
      'DynamoDB (like S3) supports gateway VPC endpoints, which add a route table entry allowing private, in-VPC traffic to reach the service with no internet gateway or NAT required — the missing gateway endpoint and route is the likely cause of the timeouts.',
  },
  {
    id: 'sec-30',
    domain: 'security',
    question:
      'A financial services company must store audit log objects in S3 such that no one — including the account root user or an admin with full IAM permissions — can delete or overwrite them until a fixed retention date has passed. What should you enable?',
    choices: [
      'S3 Versioning alone',
      'S3 Object Lock in Compliance mode, with a retention period set on the objects',
      'A bucket policy that denies s3:DeleteObject to all principals',
      'MFA Delete on the bucket',
    ],
    correctIndexes: [1],
    explanation:
      "S3 Object Lock in Compliance mode enforces WORM (write once, read many) storage — no user, including the root account, can delete or overwrite a locked object version until its retention period expires. A Deny bucket policy can still be edited or removed by an admin, and MFA Delete only adds a confirmation step, it doesn't block deletion outright.",
  },
  {
    id: 'sec-31',
    domain: 'security',
    question:
      'A CloudFront distribution serves private content from an S3 bucket. The security team wants to guarantee that the S3 objects can only ever be reached through CloudFront, never directly via the bucket\'s S3 URL, without managing expiring credentials. What should you configure?',
    choices: [
      'Make the S3 bucket fully public and rely on obscurity of the URL',
      'Origin Access Control (OAC) on the distribution, paired with a bucket policy that only allows that CloudFront distribution',
      'A Lambda@Edge function that checks the Referer header',
      'S3 Transfer Acceleration',
    ],
    correctIndexes: [1],
    explanation:
      "Origin Access Control (OAC) lets CloudFront sign requests to the S3 origin with its own identity; the bucket policy then allows only that specific distribution, keeping the bucket itself private and blocking any direct S3 URL access. This is the modern replacement for the older Origin Access Identity (OAI) approach.",
  },
  {
    id: 'sec-32',
    domain: 'security',
    question:
      'A public-facing Application Load Balancer regularly receives SQL injection and cross-site scripting attempts embedded in request parameters. Which AWS service is purpose-built to inspect and block these patterns at the edge, before they reach the application?',
    choices: [
      'AWS Shield Standard',
      'AWS WAF, with managed rule groups for common web exploits',
      'A network ACL blocking the source IP ranges',
      'Amazon Inspector',
    ],
    correctIndexes: [1],
    explanation:
      'AWS WAF inspects HTTP(S) requests against rules (including AWS Managed Rules like the Core Rule Set and SQLi rule group) and can block requests matching known exploit patterns, attached directly to the ALB, CloudFront, or API Gateway. Shield protects against network/transport-layer DDoS, not application-layer payload inspection; Inspector scans workloads for vulnerabilities, it doesn\'t filter live traffic.',
  },
  {
    id: 'sec-33',
    domain: 'security',
    question:
      "A mobile game authenticates users through a third-party OpenID Connect provider (not Cognito) and needs to hand those users short-lived AWS credentials scoped to a specific IAM role, without running any backend server. What STS API enables this directly?",
    choices: [
      'sts:GetSessionToken',
      'sts:AssumeRoleWithWebIdentity',
      'sts:GetFederationToken',
      'sts:AssumeRole using a long-lived IAM user access key embedded in the app',
    ],
    correctIndexes: [1],
    explanation:
      "AssumeRoleWithWebIdentity exchanges an OIDC/web identity token (from providers like Google, Facebook, or any OIDC-compliant IdP) directly for temporary AWS credentials tied to an IAM role's trust policy — no backend or embedded long-lived credentials required. Cognito Identity Pools solve the same underlying problem (token-for-credentials federation) but through their own managed API rather than a direct AssumeRoleWithWebIdentity call.",
  },
  {
    id: 'sec-34',
    domain: 'security',
    question:
      'A company wants every request to its S3 bucket to be rejected if it arrives over plain HTTP instead of HTTPS, regardless of which IAM principal is making the request. What should the bucket policy use?',
    choices: [
      'A Deny statement with condition key aws:SecureTransport equals false',
      'An Allow statement scoped only to HTTPS IP ranges',
      'S3 default encryption (SSE-S3)',
      'A CORS configuration restricting allowed origins',
    ],
    correctIndexes: [0],
    explanation:
      'A bucket policy Deny statement with the condition "aws:SecureTransport": "false" blocks any request (from any principal) that did not arrive over TLS — the standard way to enforce HTTPS-only access to S3. Default encryption protects data at rest, not the transport used to reach the bucket.',
  },
  {
    id: 'sec-35',
    domain: 'security',
    question:
      'A security team wants continuous, automated detection of suspicious account activity — such as API calls from known-malicious IPs, unusual credential usage, or EC2 instances communicating with crypto-mining endpoints — without manually writing detection rules. Which service should they enable?',
    choices: [
      'Amazon GuardDuty',
      'AWS Config',
      'IAM Access Analyzer',
      'AWS Trusted Advisor',
    ],
    correctIndexes: [0],
    explanation:
      'GuardDuty is a managed threat-detection service that continuously analyzes CloudTrail, VPC Flow Logs, and DNS logs against threat intelligence and machine learning models to surface findings like compromised credentials or malicious network activity — no rule-writing required. Access Analyzer specifically finds unintended external/cross-account resource access, not general threat activity.',
  },
  {
    id: 'sec-36',
    domain: 'security',
    question:
      "Company A stores a database credential in AWS Secrets Manager and needs to let a specific IAM role in Company B's separate AWS account retrieve that one secret's value, without creating any IAM users for Company B or copying the secret into their account.",
    choices: [
      'Attach a resource policy to the secret allowing Company B\'s specific role ARN to call secretsmanager:GetSecretValue',
      "Email the secret value directly to Company B",
      'Make the secret publicly readable',
      "Create an IAM user in Company A's account and share its access keys with Company B",
    ],
    correctIndexes: [0],
    explanation:
      "Secrets Manager secrets support resource-based policies, just like S3 buckets or KMS keys. Attaching a policy that grants Company B's role ARN secretsmanager:GetSecretValue enables direct, least-privilege cross-account access to that one secret without creating IAM users, copying the secret, or any manual credential sharing.",
  },
  {
    id: 'sec-37',
    domain: 'security',
    question:
      'An application tier of EC2 instances (in an Auto Scaling group, with IPs that change constantly) needs to reach a database tier on port 5432, and the database security group rule should keep working automatically as instances scale in and out. What should the database security group\'s inbound rule reference?',
    choices: [
      "The application tier's current list of instance IPs, updated manually as it scales",
      "The application tier's security group ID as the source, instead of a CIDR block",
      '0.0.0.0/0 to avoid maintaining the rule',
      "The application tier's VPC ID as the source",
    ],
    correctIndexes: [1],
    explanation:
      "Security groups can reference another security group ID as the source/destination of a rule. Any instance that's a member of the application tier's security group is automatically covered, regardless of its IP — no manual updates needed as the Auto Scaling group scales in or out, unlike a CIDR-based rule.",
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
    correctIndexes: [1],
    explanation:
      'Blue/green deployments provision a new (green) environment alongside the old (blue), shift traffic over (all at once or gradually), and only decommission blue after green is verified healthy — enabling fast rollback.',
  },
  {
    id: 'dep-2',
    domain: 'deployment',
    question:
      'In a CodeDeploy deployment, which file defines the deployment lifecycle hooks (like BeforeInstall, AfterInstall, ApplicationStart) and what files to copy?',
    choices: ['buildspec.yml', 'appspec.yml', 'template.yaml', 'Dockerfile'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'buildspec.yml is CodeBuild\'s build specification — it lists build phases, commands to run, environment variables, and which files become output artifacts.',
  },
  {
    id: 'dep-4',
    domain: 'deployment',
    question:
      'Which Elastic Beanstalk deployment policy takes existing instances out of service in small batches while deploying the new version, but risks reduced capacity during the deployment and offers no immediate full rollback of "in place" batches already updated?',
    choices: ['All at once', 'Rolling', 'Immutable', 'Blue/green (via swap environment URL)'],
    correctIndexes: [1],
    explanation:
      'Rolling deployments update a configurable batch of instances at a time in place, reducing (but not eliminating) capacity during rollout. All-at-once has zero extra cost but full downtime risk; Immutable launches an entirely new, fully separate instance group before swapping.',
  },
  {
    id: 'dep-5',
    domain: 'deployment',
    question:
      'You want a Lambda function to shift traffic from the old version to a new version gradually (e.g., 10% every few minutes) with automatic rollback on CloudWatch alarm, using an alias. Which service enables this?',
    choices: ['CodeBuild', 'CodeDeploy (canary/linear deployment via a Lambda alias)', 'CloudFormation StackSets', 'Elastic Beanstalk'],
    correctIndexes: [1],
    explanation:
      'CodeDeploy integrates with Lambda aliases to perform canary or linear traffic shifting between the old and new function versions, with automatic rollback triggered by CloudWatch alarms.',
  },
  {
    id: 'dep-6',
    domain: 'deployment',
    question:
      'What CloudFormation feature lets you preview what changes will be made to your stack (resources added, modified, or replaced) before actually applying an update?',
    choices: ['Stack policies', 'Change sets', 'Drift detection', 'Nested stacks'],
    correctIndexes: [1],
    explanation:
      'A change set shows a summary of proposed changes to a stack before you execute them, so you can catch unintended resource replacements (e.g., a change that would recreate a database) before it happens.',
  },
  {
    id: 'dep-7',
    domain: 'deployment',
    question:
      'Which AWS Serverless Application Model (SAM) command packages your local code, uploads artifacts to S3, and transforms your SAM template into a full CloudFormation template ready to deploy?',
    choices: ['sam init', 'sam local invoke', 'sam package / sam build + sam deploy', 'sam logs'],
    correctIndexes: [2],
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
    correctIndexes: [1],
    explanation:
      'Nested stacks let you modularize common patterns (e.g., a standard VPC or logging setup) into reusable templates referenced by AWS::CloudFormation::Stack resources in a parent template.',
  },
  {
    id: 'dep-9',
    domain: 'deployment',
    question:
      'Which ECS launch type removes the need to provision or manage the underlying EC2 instances that run your containers?',
    choices: ['EC2 launch type', 'Fargate launch type', 'On-premises (ECS Anywhere)', 'Spot Fleet launch type'],
    correctIndexes: [1],
    explanation:
      'Fargate is a serverless compute engine for containers — AWS manages the underlying infrastructure; you just define task definitions with CPU/memory requirements.',
  },
  {
    id: 'dep-10',
    domain: 'deployment',
    question:
      'In CodePipeline, what is passed between stages (e.g., from a Source stage to a Build stage) to let each stage act on the output of the previous one?',
    choices: ['IAM roles', 'Artifacts (typically stored in S3)', 'CloudWatch Events only', 'Parameter Store values only'],
    correctIndexes: [1],
    explanation:
      'Each pipeline stage can produce output artifacts (zipped and stored in an S3 artifact bucket) that subsequent stages declare as input artifacts, chaining the flow of code/build output through the pipeline.',
  },
  {
    id: 'dep-11',
    domain: 'deployment',
    question:
      'Which CloudFormation intrinsic function would you use to reference the value of another resource\'s attribute, such as an S3 bucket\'s ARN, within the same template?',
    choices: ['Fn::Join', 'Fn::GetAtt', 'Fn::ImportValue', 'Fn::Sub only'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Immutable deployments launch a completely new, temporary Auto Scaling group alongside the existing one. If the new instances fail health checks, they are simply torn down, and the original, untouched environment continues serving traffic — a very safe rollback story.',
  },
  {
    id: 'dep-13',
    domain: 'deployment',
    question:
      'What CloudFormation feature lets you deploy the same stack template consistently across multiple AWS accounts and Regions from a single administrative account?',
    choices: ['Nested stacks', 'StackSets', 'Change sets', 'Stack policies'],
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [0],
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
    correctIndexes: [1],
    explanation:
      '.ebextensions is a directory of YAML/JSON config files bundled with your source code that let you customize software, run commands, set environment resources, and more during environment provisioning.',
  },
  {
    id: 'dep-17',
    domain: 'deployment',
    question:
      'Which Elastic Beanstalk environment tier is designed to process background jobs pulled from an SQS queue rather than serve HTTP web traffic directly?',
    choices: ['Web server tier', 'Worker tier', 'Multi-container Docker tier', 'Load-balanced tier'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'CodeBuild supports caching (S3-based or local Docker layer/source/custom caching) so dependency directories like node_modules or .m2 can persist between build runs, cutting down repeated download/install time.',
  },
  {
    id: 'dep-19',
    domain: 'deployment',
    question:
      'You want a CodePipeline release to pause and wait for a human to explicitly approve it (e.g., before deploying to production) before continuing. What should you add?',
    choices: ['A Test action', 'A Manual approval action', 'An additional Source stage', 'A CodeBuild stage with a sleep command'],
    correctIndexes: [1],
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
    correctIndexes: [0],
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
    correctIndexes: [0],
    explanation:
      'ECS blue/green deployments via CodeDeploy use an ALB (or NLB) with two target groups — one for the current task set, one for the new one — and CodeDeploy shifts listener traffic between them, similar to EC2 blue/green.',
  },
  {
    id: 'dep-22',
    domain: 'deployment',
    question:
      'A CloudFormation template needs to let the person deploying the stack choose the EC2 instance type at deploy time, instead of hardcoding it. What should the template declare?',
    choices: ['A Mapping', 'A Parameter', 'A Condition', 'An Output'],
    correctIndexes: [1],
    explanation:
      'Parameters let a template accept input values at stack creation/update time (e.g., InstanceType, Environment), which can then be referenced elsewhere in the template with Ref.',
  },
  {
    id: 'dep-23',
    domain: 'deployment',
    question:
      'Which artifact repository service would you use to securely store and share software packages (npm, Maven, PyPI, NuGet) across your organization\'s build pipelines?',
    choices: ['AWS CodeArtifact', 'AWS CodeStar', 'Amazon ECR', 'AWS Systems Manager'],
    correctIndexes: [0],
    explanation:
      'CodeArtifact is a managed artifact repository for common package formats (npm, PyPI, Maven, NuGet), letting teams securely publish, store, and share dependencies, often as an upstream proxy to public repositories.',
  },
  {
    id: 'dep-24',
    domain: 'deployment',
    question:
      'A CodeDeploy in-place deployment to EC2 instances needs to stop the running application, install the new application revision, run a database migration script, and then start and validate the new application, all as part of the automated deployment. In which lifecycle hook should the database migration script run?',
    choices: ['ApplicationStop', 'BeforeInstall', 'AfterInstall (before ApplicationStart)', 'ValidateService'],
    correctIndexes: [2],
    explanation:
      'The CodeDeploy in-place lifecycle runs, in order: ApplicationStop → DownloadBundle → BeforeInstall → Install → AfterInstall → ApplicationStart → ValidateService. A migration that must run after the new files are installed but before the app starts belongs in AfterInstall.',
  },
  {
    id: 'dep-25',
    domain: 'deployment',
    question:
      'A team runs a customer-facing Elastic Beanstalk application that must maintain full request-serving capacity throughout every deployment (no reduced capacity) and must be able to roll back instantly and completely if the new version fails health checks after receiving live traffic. Which TWO deployment policies satisfy both requirements? (Select TWO.)',
    choices: ['All at once', 'Rolling', 'Rolling with additional batch', 'Immutable', 'Traffic-splitting (canary)'],
    correctIndexes: [3, 4],
    explanation:
      "Immutable deployments launch a full, separate new instance group and only shift traffic after it passes health checks, preserving full capacity and enabling a clean rollback. Traffic-splitting (canary) deployments similarly launch new instances alongside old ones and shift a portion of live traffic while monitoring, also allowing an immediate rollback. Rolling and 'rolling with additional batch' reduce capacity or mix old/new versions in place; all-at-once causes downtime.",
  },
  {
    id: 'dep-26',
    domain: 'deployment',
    question:
      'A CodePipeline pipeline has a Source stage (CodeCommit), a Build stage (CodeBuild, running unit tests and packaging), and a Deploy stage (CodeDeploy). The Deploy stage is failing because it cannot find the packaged application files. What is the most likely misconfiguration?',
    choices: [
      "The Build stage's buildspec.yml is missing an `artifacts` section that specifies which files to output",
      'The Source stage is using the wrong branch',
      'The CodeDeploy appspec.yml has a syntax error',
      'The pipeline is missing a manual approval action',
    ],
    correctIndexes: [0],
    explanation:
      "Each CodePipeline action passes files forward via declared output artifacts. If CodeBuild's buildspec.yml doesn't declare an `artifacts` section (which files to package as output), no output artifact is produced for the next stage to consume, and the Deploy stage has nothing to deploy.",
  },
  {
    id: 'dep-27',
    domain: 'deployment',
    question:
      'A CloudFormation stack update replaces an RDS database instance because a developer changed an immutable property (like the DB engine). The team wants to be warned about this kind of unintended, disruptive replacement before it happens. What should the team do before every stack update?',
    choices: [
      'Delete and recreate the stack from scratch each time',
      "Create and review a change set before executing the update, checking each resource's 'Replacement' value",
      'Disable stack rollback',
      "Increase the RDS instance's backup retention period",
    ],
    correctIndexes: [1],
    explanation:
      'A change set previews exactly what a stack update will do per resource, including whether a resource will be modified in place or replaced (which for a database means data loss/downtime) — reviewing it before executing catches this before it happens.',
  },
  {
    id: 'dep-28',
    domain: 'deployment',
    question:
      "A platform team wants to define a reusable, parameterized 'standard web service' infrastructure pattern (VPC, ALB, ECS service, auto scaling) that other application teams can instantiate with just a few lines of code in their own repositories, with full IDE type-checking and the ability to write loops/conditionals during infrastructure definition. Which approach best fits?",
    choices: [
      'A single large, copy-pasted CloudFormation YAML template per team',
      'An AWS CDK construct encapsulating the pattern, published as a shared library and instantiated in each team\'s CDK app',
      'A CloudFormation StackSet deployed identically to every account with no customization',
      'Manual console configuration repeated by every team',
    ],
    correctIndexes: [1],
    explanation:
      "CDK constructs are reusable, composable, type-checked components written in a general-purpose language — ideal for encapsulating a standard pattern that other teams instantiate with a few lines of code, with full IDE support and programming-language control flow, unlike raw copy-pasted YAML.",
  },
  {
    id: 'dep-29',
    domain: 'deployment',
    question:
      'A team runs a production service on ECS Fargate behind an Application Load Balancer and wants new task revisions to roll out with zero downtime and an automatic rollback if error rates spike after the new version starts receiving traffic. Which TWO capabilities should the team use together? (Select TWO.)',
    choices: [
      'CodeDeploy blue/green deployment for ECS, using two target groups behind the ALB',
      "CloudWatch alarms monitoring the new task set's error rate, configured as automatic rollback triggers in the CodeDeploy deployment group",
      'Manually terminating old tasks immediately when the new task definition is registered',
      'A single target group shared by old and new tasks with no health checks',
      "Increasing the ECS service's desired count to 1",
    ],
    correctIndexes: [0, 1],
    explanation:
      'ECS blue/green deployments via CodeDeploy use two target groups to shift traffic gradually, and CodeDeploy deployment groups support CloudWatch alarms as automatic rollback triggers — together they give a zero-downtime rollout with automatic rollback on error-rate spikes.',
  },
  {
    id: 'dep-30',
    domain: 'deployment',
    question:
      'A team wants every container image pushed to their Amazon ECR repository to be automatically scanned for known OS and package vulnerabilities, with no separate tool to run manually. What should they enable?',
    choices: [
      'Amazon Inspector or ECR basic scanning, configured for scan-on-push on the repository',
      'S3 Object Lock on the repository',
      'CloudTrail data events for the repository',
      'A CodeBuild step that runs `docker history`',
    ],
    correctIndexes: [0],
    explanation:
      'ECR supports scan-on-push (basic scanning, or enhanced scanning powered by Amazon Inspector), which automatically scans each pushed image layer for known CVEs and surfaces findings in the console/API — no manual tool invocation required.',
  },
  {
    id: 'dep-31',
    domain: 'deployment',
    question:
      "A CloudFormation template needs to provision a resource type that CloudFormation doesn't natively support (a third-party SaaS resource, reachable only via a custom API). What CloudFormation feature allows this?",
    choices: [
      'A CloudFormation macro that transforms the entire template',
      'A custom resource, backed by a Lambda function that implements the create/update/delete logic',
      'A nested stack pointing at the third-party API',
      'A stack policy',
    ],
    correctIndexes: [1],
    explanation:
      "Custom resources let a template include a resource type CloudFormation doesn't natively understand: CloudFormation invokes a backing Lambda function (or SNS topic) on create/update/delete, and the function implements whatever provisioning logic is needed against the external system, then signals success or failure back to CloudFormation.",
  },
  {
    id: 'dep-32',
    domain: 'deployment',
    question:
      'A team suspects that someone manually changed an EC2 instance\'s security group directly in the console after it was provisioned by CloudFormation, so the live resource no longer matches the template. What CloudFormation feature detects this kind of manual, out-of-band change?',
    choices: [
      'Change sets',
      'Drift detection',
      'Stack policies',
      'Termination protection',
    ],
    correctIndexes: [1],
    explanation:
      "Drift detection compares a stack's actual resource configuration against what the template defines and reports any resource whose real-world state has diverged due to manual, out-of-band changes. Change sets preview the effect of an upcoming template update — a different concept from detecting drift that already happened.",
  },
  {
    id: 'dep-33',
    domain: 'deployment',
    question:
      "An Elastic Beanstalk web application must handle a deployment without ever reducing the number of instances serving live traffic, and it's acceptable for the deployment to take longer as long as capacity never drops. Which deployment policy fits, without the cost of doubling the fleet like Immutable or Blue/Green would?",
    choices: [
      'All at once',
      'Rolling',
      'Rolling with additional batch',
      'Blue/Green',
    ],
    correctIndexes: [2],
    explanation:
      "\"Rolling with additional batch\" launches one extra batch of new instances first, then performs the rolling update in batches on the existing fleet — so total capacity never drops below 100% during the deployment, without provisioning a full second environment the way Blue/Green or Immutable do. Plain Rolling temporarily reduces capacity by one batch while it updates instances in place.",
  },
  {
    id: 'dep-34',
    domain: 'deployment',
    question:
      "A developer wants to test a REST API defined in a SAM template — invoking it over local HTTP exactly as API Gateway would route it to the backing Lambda functions — before deploying anything to AWS. What command should they run?",
    choices: [
      'sam deploy --guided',
      'sam local start-api',
      'sam validate',
      'sam local invoke',
    ],
    correctIndexes: [1],
    explanation:
      "`sam local start-api` spins up a local HTTP server that emulates API Gateway's routing based on the SAM template, invoking the correct local Lambda function (in a Docker container) for each path/method — useful for full request/response testing. `sam local invoke` runs a single function directly with a sample event, without simulating API Gateway routing.",
  },
  {
    id: 'dep-35',
    domain: 'deployment',
    question:
      'A CodeBuild project reinstalls the same large set of npm dependencies from scratch on every single build, adding several minutes to each run. What is the most direct way to speed this up?',
    choices: [
      'Switch to a larger CodeBuild compute type',
      'Configure a CodeBuild cache (local or S3) for the dependency directory (e.g., node_modules)',
      'Reduce the number of CodePipeline stages',
      'Disable CodeBuild logs',
    ],
    correctIndexes: [1],
    explanation:
      "CodeBuild supports caching build output directories (like node_modules) either locally on the build host or in S3, so unchanged dependencies don't need to be re-downloaded/reinstalled on every build — directly cutting build time. A bigger compute type speeds up CPU-bound work, not redundant network installs.",
  },
  {
    id: 'dep-36',
    domain: 'deployment',
    question:
      'A CodeDeploy deployment to an EC2 Auto Scaling group uses the blue/green deployment type. What happens to the original ("blue") instances after traffic has fully shifted to the new ("green") instances and validation succeeds?',
    choices: [
      'They keep serving traffic alongside the green instances indefinitely',
      'They are terminated (or kept for a configured wait period) after CodeDeploy confirms the new environment is healthy',
      'They are automatically converted into the new green environment',
      'CodeDeploy pauses indefinitely and requires manual termination',
    ],
    correctIndexes: [1],
    explanation:
      'In an EC2/on-premises blue/green deployment, CodeDeploy provisions a replacement (green) Auto Scaling group, shifts traffic to it once healthy, and then terminates the original (blue) instances — optionally after a configurable wait time — giving a clean cutover with the old environment available briefly for a fast rollback if needed.',
  },
  {
    id: 'dep-37',
    domain: 'deployment',
    question:
      'A platform team wants application teams to self-provision pre-approved, governed infrastructure patterns (like "standard VPC" or "standard RDS instance") from a catalog, without giving them direct IAM permissions to create those resources themselves. What AWS service fits this?',
    choices: [
      'AWS Service Catalog',
      'AWS Config',
      'AWS Organizations',
      'AWS Systems Manager Automation',
    ],
    correctIndexes: [0],
    explanation:
      'Service Catalog lets administrators package approved CloudFormation templates as "products" in a catalog; end users can launch those products through a constrained self-service interface without needing direct IAM permissions to create the underlying resources, keeping provisioning governed and consistent.',
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Throttling with uneven partition consumption is the classic sign of a "hot partition" — too many requests hitting the same partition key value(s). The fix is usually a better-distributed key design (e.g., write sharding) or switching to on-demand capacity.',
  },
  {
    id: 'tr-3',
    domain: 'troubleshooting',
    question:
      'Which tool provides an end-to-end view of requests as they travel through multiple services (API Gateway → Lambda → DynamoDB), helping you find latency bottlenecks?',
    choices: ['CloudTrail', 'AWS X-Ray', 'AWS Config', 'CloudWatch Logs Insights alone'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      '502 errors from a Lambda proxy integration usually mean the Lambda response body isn\'t valid JSON matching the expected structure (e.g., missing statusCode/body/headers), or the function crashed/threw an unhandled exception.',
  },
  {
    id: 'tr-5',
    domain: 'troubleshooting',
    question:
      'You need to run ad-hoc, SQL-like queries across large volumes of CloudWatch Logs to find patterns and aggregate fields without exporting logs elsewhere. Which tool should you use?',
    choices: ['CloudWatch Logs Insights', 'CloudTrail Lake', 'AWS Config Rules', 'X-Ray Analytics'],
    correctIndexes: [0],
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
    correctIndexes: [1],
    explanation:
      'Configuring a redrive policy with a DLQ and maxReceiveCount automatically moves messages that repeatedly fail processing out of the main queue, so they stop blocking other messages while remaining available for later inspection.',
  },
  {
    id: 'tr-7',
    domain: 'troubleshooting',
    question:
      'Which CloudWatch feature lets you trigger an action (like an SNS notification or Auto Scaling policy) automatically when a metric crosses a defined threshold?',
    choices: ['CloudWatch Alarms', 'CloudWatch Dashboards', 'CloudWatch Synthetics', 'CloudWatch Contributor Insights'],
    correctIndexes: [0],
    explanation:
      'CloudWatch Alarms watch a metric over a period and change state (e.g., to ALARM) when a threshold is breached, which can then trigger notifications or automated actions.',
  },
  {
    id: 'tr-8',
    domain: 'troubleshooting',
    question:
      'Your application publishes a custom business metric (like "orders processed") to CloudWatch. What API call is used to send custom metrics?',
    choices: ['PutMetricData', 'PutLogEvents', 'PutMetricAlarm', 'PutDashboard'],
    correctIndexes: [0],
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
    correctIndexes: [1],
    explanation:
      'Since Lambda cost is a function of both memory allocated and execution duration, and more memory means more CPU, the sweet spot isn\'t always the minimum memory. Power tuning approaches test multiple memory sizes to find the best cost/performance balance.',
  },
  {
    id: 'tr-10',
    domain: 'troubleshooting',
    question:
      'Users report that responses from your API are slow for frequently repeated, identical GET requests. Which API Gateway feature can reduce backend load and latency for these repeat requests?',
    choices: ['API Gateway caching', 'Usage plans', 'Request validators', 'Custom domain names'],
    correctIndexes: [0],
    explanation:
      'API Gateway response caching stores responses for a configurable TTL per stage, serving repeat identical requests from cache instead of invoking the backend integration every time.',
  },
  {
    id: 'tr-11',
    domain: 'troubleshooting',
    question:
      'What tool would you use to record and audit every API call made in your AWS account (who called what action, when, and from where), for security analysis or compliance?',
    choices: ['CloudWatch Logs', 'AWS CloudTrail', 'AWS X-Ray', 'VPC Flow Logs'],
    correctIndexes: [1],
    explanation:
      'CloudTrail records API activity (management and, optionally, data events) across your account as an audit trail, distinct from CloudWatch (metrics/logs/alarms) and X-Ray (distributed tracing).',
  },
  {
    id: 'tr-12',
    domain: 'troubleshooting',
    question:
      'You want a single CloudWatch alarm to only fire when several underlying alarms (e.g., high latency AND high error rate) are simultaneously in ALARM state, to reduce noisy individual alerts. What should you create?',
    choices: ['A composite alarm', 'A metric filter', 'An anomaly detection alarm', 'A dashboard widget'],
    correctIndexes: [0],
    explanation:
      'Composite alarms combine the states of multiple existing alarms using AND/OR logic (an alarm rule expression) into one, reducing alert noise by only notifying when the meaningful combination of conditions occurs.',
  },
  {
    id: 'tr-13',
    domain: 'troubleshooting',
    question:
      'Which X-Ray concept lets you attach custom, indexed key-value data (like a customer ID or order ID) to a trace segment so you can search and filter traces by it later?',
    choices: ['Sampling rules', 'Annotations', 'Subsegments', 'The service map'],
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'Throttling during bursts usually means the concurrency limit (account-level or function-reserved) is being hit momentarily. Raising the limit (if you have headroom) or buffering bursty invocations through SQS smooths the spike.',
  },
  {
    id: 'tr-15',
    domain: 'troubleshooting',
    question:
      'Which logs would you enable on a VPC to record IP traffic metadata (source/destination, port, protocol, accept/reject) going to and from network interfaces, useful for diagnosing connectivity issues?',
    choices: ['CloudTrail data events', 'VPC Flow Logs', 'S3 access logs', 'ALB access logs'],
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
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
    correctIndexes: [1],
    explanation:
      'The CloudFormation Events tab shows a timeline of resource creation/update statuses and failure reasons, which is the fastest way to pinpoint exactly which resource failed and why before attempting a fix and retry.',
  },
  {
    id: 'tr-19',
    domain: 'troubleshooting',
    question:
      'A Lambda function calls DynamoDB and an external HTTP API. X-Ray tracing is enabled on the function, but the generated traces only show the overall Lambda segment with no subsegments for the individual DynamoDB or HTTP calls. What is the most likely cause?',
    choices: [
      "The Lambda function's timeout is set too low",
      'The application code is not using the X-Ray SDK to instrument the AWS SDK client and outgoing HTTP calls',
      'The X-Ray sampling rate is set to 100%',
      'The DynamoDB table does not have Streams enabled',
    ],
    correctIndexes: [1],
    explanation:
      'Enabling X-Ray tracing on a Lambda function only captures the top-level segment automatically. Getting subsegments for downstream calls requires instrumenting the code with the X-Ray SDK (e.g., wrapping the AWS SDK client, patching http/https) to capture those calls.',
  },
  {
    id: 'tr-20',
    domain: 'troubleshooting',
    question:
      "A CloudWatch alarm monitoring a Lambda function's error count has been stuck in the INSUFFICIENT_DATA state for hours, even though the team can see in the Lambda console that the function has been invoked repeatedly during that time. What is a likely explanation?",
    choices: [
      'The function has had no errors, and CloudWatch does not publish a data point for some metrics when the underlying event never occurs, leaving evaluation periods with no data',
      'The Lambda function has been deleted',
      'CloudWatch Alarms are only supported for EC2 metrics',
      "The account has exceeded its CloudWatch Logs retention limit",
    ],
    correctIndexes: [0],
    explanation:
      "Some CloudWatch metrics (like Lambda Errors) are only published when the relevant event actually occurs; with zero errors, some periods may have no data points at all, which can leave a poorly configured alarm in INSUFFICIENT_DATA rather than OK. Configuring the alarm to treat missing data as \"not breaching\" avoids this.",
  },
  {
    id: 'tr-21',
    domain: 'troubleshooting',
    question:
      "An application's DynamoDB table is in on-demand capacity mode, yet a specific access pattern still experiences throttling: reads for a single, very popular item (a \"celebrity\" item) are being rejected while overall table-level consumption is well within normal limits. Which TWO actions would help resolve this? (Select TWO.)",
    choices: [
      'Switch the table from on-demand to provisioned capacity mode',
      'Cache the hot item in DynamoDB Accelerator (DAX) or another in-memory cache to reduce direct reads',
      "Redesign the key so the hot item's data is sharded across multiple partition key values, spreading reads across partitions",
      'Add a Global Secondary Index that duplicates the same partition key',
      'Enable point-in-time recovery on the table',
    ],
    correctIndexes: [1, 2],
    explanation:
      "A single hot (\"celebrity\") item overwhelms one partition regardless of overall table capacity or capacity mode. The fixes are reducing direct reads against it (caching with DAX) and/or sharding the key space so the item's reads spread across multiple partitions — switching capacity mode or adding a GSI on the same key does not fix a single-item hot-partition problem.",
  },
  {
    id: 'tr-22',
    domain: 'troubleshooting',
    question:
      "A scheduled batch job runs once per day, takes about 20 minutes to complete, and uses a steady, predictable amount of CPU and memory. It currently runs as a Lambda function that must be split into many chained, short invocations to work around Lambda's maximum execution duration, adding significant code complexity. What change would both simplify the code and likely reduce cost?",
    choices: [
      "Increase the Lambda function's memory to the maximum to speed it up",
      'Move the job to a scheduled ECS Fargate task, which has no 15-minute execution limit and only bills for the ~20 minutes it actually runs',
      'Convert the job to use Step Functions Express Workflows only, with no change to the compute',
      'Run the job on a permanently running EC2 instance',
    ],
    correctIndexes: [1],
    explanation:
      "Lambda's 15-minute maximum duration forces awkward chaining for longer jobs. A scheduled Fargate task removes that limit entirely and, like Lambda, only bills for the resources used during the ~20-minute run — cheaper than a permanently running EC2 instance and simpler than artificially chaining Lambda invocations.",
  },
  {
    id: 'tr-23',
    domain: 'troubleshooting',
    question:
      "One Lambda function in an account starts throttling with a burst of traffic, and unrelated Lambda functions in the same account start throttling too, even though none of them individually exceeds a high invocation rate. What is the most likely cause, and fix?",
    choices: [
      "The functions share the account's unreserved concurrency pool, which one noisy function exhausted; set reserved concurrency on the noisy function to cap its usage and protect the shared pool",
      'The account has hit its S3 request limit',
      "The functions' IAM roles have expired",
      'CloudWatch Logs retention is misconfigured',
    ],
    correctIndexes: [0],
    explanation:
      "All Lambda functions in an account/region draw from a shared account-level concurrency limit unless they have reserved concurrency carved out. A single function scaling up under load can exhaust that shared pool and cause unrelated functions to throttle too — setting reserved concurrency on the noisy function caps its draw and protects the rest.",
  },
  {
    id: 'tr-24',
    domain: 'troubleshooting',
    question:
      'You need to be alerted whenever the phrase "OutOfMemoryError" appears in a Lambda function\'s CloudWatch Logs, ideally within seconds, without paying to run ad-hoc Logs Insights queries on a schedule. What should you configure?',
    choices: [
      'A CloudWatch Logs metric filter matching the pattern, driving a CloudWatch alarm',
      'A scheduled EventBridge rule that runs a Logs Insights query every minute',
      'S3 Event Notifications on the log group',
      'AWS Config custom rules',
    ],
    correctIndexes: [0],
    explanation:
      'A metric filter scans incoming log events in near real time for a pattern and emits a custom metric data point on a match; a CloudWatch alarm on that metric then fires quickly with no polling or scheduled queries needed. Logs Insights is better suited to ad-hoc, on-demand investigation rather than continuous low-latency alerting.',
  },
  {
    id: 'tr-25',
    domain: 'troubleshooting',
    question:
      'A high-traffic API traced with X-Ray is generating so many traces that X-Ray costs and console clutter are becoming a problem, but the team still wants a representative baseline of traces preserved for every endpoint rather than tracing almost nothing. What should they adjust?',
    choices: [
      'Disable X-Ray entirely and rely on CloudWatch Logs only',
      "A custom X-Ray sampling rule that lowers the percentage traced for high-volume routine traffic, while keeping the reservoir (a fixed number of requests per second always traced) intact",
      'The Lambda function timeout',
      'The CloudWatch Logs retention period',
    ],
    correctIndexes: [1],
    explanation:
      "X-Ray sampling rules combine a per-second reservoir (a fixed number of requests always traced, regardless of outcome) with a percentage rate applied to requests beyond that reservoir. Lowering the percentage on a custom rule cuts trace volume/cost for high-traffic routes while the reservoir still guarantees a baseline of traces every second — note that the sampling decision is made when a trace starts, so sampling alone can't retroactively guarantee every erroring request is captured; that requires either a higher reservoir/rate or explicit instrumentation to force-sample specific paths.",
  },
  {
    id: 'tr-26',
    domain: 'troubleshooting',
    question:
      'An RDS instance on a burstable t3 instance class performs fine most of the day but suddenly becomes sluggish during sustained peak traffic, with CPU showing as high but not maxed. Which CloudWatch metric would confirm the instance ran out of burst capacity?',
    choices: [
      'FreeStorageSpace',
      'CPUCreditBalance dropping to (or hovering near) zero',
      'DatabaseConnections',
      'ReadIOPS',
    ],
    correctIndexes: [1],
    explanation:
      "Burstable (t3/t4g) instances earn CPU credits during idle periods and spend them during bursts above their baseline. CPUCreditBalance nearing zero means the instance has exhausted its credits and is now capped at baseline CPU performance — explaining sluggishness under sustained load. The fix is typically switching to a non-burstable instance class or enabling unlimited bursting.",
  },
  {
    id: 'tr-27',
    domain: 'troubleshooting',
    question:
      "Multiple unrelated APIs hosted on the same API Gateway account start returning 429 Too Many Requests during a traffic spike, even though no single client is exceeding its own usage plan quota. What is the most likely cause?",
    choices: [
      'A single Lambda function has been given reserved concurrency of zero',
      "The account-level API Gateway steady-state/burst throttle limit (a regional, per-account default) has been exceeded across all APIs combined",
      'The DynamoDB table backing the API is under-provisioned',
      'CloudFront is caching stale responses',
    ],
    correctIndexes: [1],
    explanation:
      "API Gateway enforces a default account-level (regional) throttle limit shared across all APIs in that account/region, separate from any per-client usage plan. A traffic spike that exceeds this shared account limit throttles requests across unrelated APIs — the fix is requesting a service quota increase or isolating high-traffic APIs, not touching an individual usage plan.",
  },
  {
    id: 'tr-28',
    domain: 'troubleshooting',
    question:
      'A Step Functions standard workflow execution appears to be stuck, with no visible errors in the state machine\'s recent CloudWatch metrics. What is the most direct way to see exactly which state it is currently in and how long it has been there?',
    choices: [
      "Reading the state machine's IAM role policy",
      "Viewing the specific execution's event history and visual workflow graph in the Step Functions console",
      'Checking S3 access logs',
      'Increasing the Lambda function timeout',
    ],
    correctIndexes: [1],
    explanation:
      "Each Step Functions execution has a detailed event history and a visual graph in the console showing exactly which state is active (or where it stalled), how long each state took, and any input/output at each step — the direct way to diagnose a stuck execution, rather than inferring from aggregate CloudWatch metrics.",
  },
  {
    id: 'tr-29',
    domain: 'troubleshooting',
    question:
      "After moving a Lambda function into a VPC to reach a private RDS instance, cold-start latency increased noticeably and the function occasionally fails to scale under burst traffic. What is the most likely explanation?",
    choices: [
      "VPC-attached Lambda functions must provision elastic network interfaces (ENIs) in the configured subnets, and a subnet with too few free IP addresses can throttle scaling and add latency",
      'RDS does not support connections from Lambda',
      'VPC Lambda functions cannot use environment variables',
      'The Lambda function\'s IAM role lost permissions when moved into the VPC',
    ],
    correctIndexes: [0],
    explanation:
      "Lambda functions in a VPC use Hyperplane ENIs shared across functions/subnets, which reduced most of the historical ENI cold-start penalty, but scaling is still bounded by available IP addresses in the configured subnets — a small or nearly-full subnet can throttle concurrency growth and add latency. Sizing subnets with enough free IPs (and spreading across multiple subnets/AZs) is the standard fix.",
  },
];

export const QUESTIONS_BY_DOMAIN = QUESTIONS.reduce<Record<string, QuizQuestion[]>>((acc, q) => {
  (acc[q.domain] ??= []).push(q);
  return acc;
}, {});
