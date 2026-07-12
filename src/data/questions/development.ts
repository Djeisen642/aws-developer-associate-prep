import type { QuizQuestion } from '../types';

export const DEVELOPMENT_QUESTIONS: QuizQuestion[] = [
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
  {
    id: 'dev-43',
    domain: 'development',
    question:
      "A Lambda function connects directly to an RDS MySQL database. Under bursty traffic, the database frequently hits its maximum connections limit — even though the actual query workload is modest — causing connection errors. What should the team add between Lambda and RDS to fix this without changing the application's connection logic?",
    choices: [
      "Keep raising the RDS instance's max_connections parameter indefinitely",
      'RDS Proxy, which pools and multiplexes a small set of database connections across many concurrent Lambda invocations',
      'An RDS read replica',
      'ElastiCache placed in front of RDS',
    ],
    correctIndexes: [1],
    explanation:
      "RDS Proxy sits between the application and RDS/Aurora, pooling and sharing a small, stable set of established database connections across many concurrent client connections (like bursty Lambda invocations) — fixing connection exhaustion without any app-side connection-handling changes. Raising max_connections just delays the same problem and strains instance memory; a read replica scales reads, not connection handling; ElastiCache is an application-level cache, not a connection pooler.",
  },
  {
    id: 'dev-44',
    domain: 'development',
    question:
      'A mobile app needs a single API that lets clients query and mutate data pulled from multiple backend sources (DynamoDB, a Lambda function, and an HTTP endpoint) through one flexible schema, plus built-in real-time updates pushed to clients when data changes. Which service fits best?',
    choices: ['An API Gateway REST API', 'AWS AppSync', 'Amazon Cognito', 'AWS Step Functions'],
    correctIndexes: [1],
    explanation:
      'AppSync is a managed GraphQL API service: a single schema can resolve fields from multiple backend data sources (DynamoDB, Lambda, HTTP endpoints, and more), and it natively supports real-time subscriptions that push updates to connected clients over WebSockets. A REST API built on API Gateway has no equivalent schema-driven, multi-source query flexibility or built-in subscription mechanism.',
  },
  {
    id: 'dev-45',
    domain: 'development',
    question:
      'A front-end team wants to quickly stand up a full-stack web app — Git-connected CI/CD hosting for the frontend, plus provisioned backend building blocks like authentication, an API, and storage — through a guided CLI/console workflow, without hand-writing infrastructure-as-code templates. Which service is designed for this?',
    choices: ['AWS Amplify', 'AWS CDK', 'AWS SAM', 'AWS Elastic Beanstalk'],
    correctIndexes: [0],
    explanation:
      'Amplify provides an opinionated CLI/console workflow for provisioning common backend building blocks (Cognito auth, an AppSync/API Gateway API, S3 storage, and more) alongside Git-connected CI/CD hosting for the frontend — the fastest path to a scaffolded full-stack app. CDK and SAM are lower-level infrastructure-as-code tools where you still define every resource yourself; Elastic Beanstalk deploys a single application, not a scaffolded set of full-stack backend and frontend resources.',
  },
  {
    id: 'dev-46',
    domain: 'development',
    question:
      "A Lambda function bundles a large machine-learning library that puts it well past the 250 MB unzipped size limit for a .zip deployment package plus layers. The team wants to package and deploy the function as a container instead, up to 10 GB. What should they do?",
    choices: [
      'Package the function as a container image, push it to Amazon ECR, and point the Lambda function at that image URI',
      'Split the function into ten smaller Lambda functions to stay under the size limit',
      'Attach additional Lambda layers to work around the 250 MB limit',
      'Move the code to an EC2 instance instead of Lambda',
    ],
    correctIndexes: [0],
    explanation:
      "Lambda supports packaging a function as a container image (up to 10 GB, stored in Amazon ECR) instead of a .zip file — the standard escape hatch once a function's code and dependencies exceed the .zip/layers size limit. The function still runs on Lambda's normal execution model (same triggers, concurrency, and scaling), just with a larger and more flexible packaging format.",
  },
  {
    id: 'dev-47',
    domain: 'development',
    question:
      'An application caches frequently-read data in ElastiCache and can tolerate results being briefly stale. It wants the simplest possible strategy: on a cache miss, read from the database and populate the cache for next time, so only data that has actually been requested ever gets cached. Which caching strategy is this?',
    choices: ['Write-through caching', 'Lazy loading (cache-aside)', 'Write-behind caching', 'TTL-only caching with no read/write logic'],
    correctIndexes: [1],
    explanation:
      "In lazy loading (cache-aside), the application checks the cache first; on a miss, it reads from the database and writes the result into the cache for next time. It's simple and the cache only ever holds data that was actually requested, but the first request for any key is always a miss and cached data can go stale until it expires or is invalidated. Write-through instead writes to the cache on every database write, keeping the cache fresh but adding write latency and potentially caching data that's never read.",
  },
  {
    id: 'dev-48',
    domain: 'development',
    question:
      "An application's RDS database is CPU-bound from a high volume of read queries while writes stay light, and the team separately wants automatic failover if the primary instance fails. Which combination correctly matches each need to the right RDS feature?",
    choices: [
      'One or more read replicas for read scaling, plus a Multi-AZ deployment for automatic failover — two separate, complementary features',
      'A single Multi-AZ deployment alone handles both read scaling and automatic failover',
      'Read replicas provide automatic failover, and Multi-AZ scales reads',
      'ElastiCache alone replaces the need for both',
    ],
    correctIndexes: [0],
    explanation:
      "Read replicas are asynchronous, read-only copies used to offload read traffic from the primary. A classic (single-standby) Multi-AZ deployment maintains a synchronously-replicated standby purely for automatic failover during an outage — that standby isn't used to serve read traffic. The two features solve different problems and are commonly combined: replicas for read scaling, Multi-AZ for availability.",
  },
  {
    id: 'dev-49',
    domain: 'development',
    question:
      "An SNS topic publishes order events to three SQS queues subscribed to it, but each queue's consumer only cares about a subset of order types (for example, only \"high-value\" orders). The team wants each subscriber to receive only the messages relevant to it, without publishing to a separate topic per consumer. What should they configure?",
    choices: [
      'A subscription filter policy on each SQS subscription, matching on message attributes',
      'A separate SNS topic per consumer',
      'A Lambda function sitting between SNS and each queue to drop irrelevant messages',
      'SQS message attributes, with no SNS-side configuration',
    ],
    correctIndexes: [0],
    explanation:
      'SNS subscription filter policies let each subscription declare which messages it wants, based on message attributes (or the message body). SNS evaluates the policy at delivery time and only forwards matching messages to that subscriber — no router Lambda or per-consumer topic required.',
  },
  {
    id: 'dev-50',
    domain: 'development',
    question:
      'A company needs pub/sub fan-out where publish order and deduplication matter — for example, financial transaction events — fanning out to multiple SQS queues. What should they use?',
    choices: [
      'A standard SNS topic fanning out to standard SQS queues',
      'A FIFO SNS topic fanning out to FIFO SQS queues',
      'A standard SNS topic fanning out to FIFO SQS queues',
      'EventBridge with an at-least-once delivery guarantee',
    ],
    correctIndexes: [1],
    explanation:
      "FIFO SNS topics preserve strict publish order and support deduplication, but they can only fan out to FIFO SQS queues — not standard queues or other subscriber types — so pairing a FIFO topic with FIFO queues is required to carry those guarantees end-to-end. A standard SNS topic cannot subscribe a FIFO SQS queue at all.",
  },
  {
    id: 'dev-51',
    domain: 'development',
    question:
      "A Lambda function needs to read and write a shared, multi-gigabyte working directory that persists and stays visible across concurrent invocations and multiple functions — well beyond Lambda's ephemeral /tmp storage (configurable up to 10 GB, but private to a single execution environment). What should be mounted to the function?",
    choices: [
      "An Amazon EFS file system, mounted via an access point (requiring the function to be attached to EFS's VPC)",
      'Amazon S3, mounted as a POSIX filesystem',
      'A larger /tmp allocation with no upper bound',
      'An Amazon EBS volume attached directly to the function',
    ],
    correctIndexes: [0],
    explanation:
      "Lambda supports mounting an Amazon EFS file system over NFS (via an EFS access point, which requires the function to be VPC-attached to reach the mount targets) for shared, persistent, multi-GB storage across concurrent invocations — unlike /tmp, which is ephemeral and private to one execution environment. EBS volumes can't be attached directly to Lambda, and S3 isn't natively mountable as a POSIX filesystem.",
  },
  {
    id: 'dev-52',
    domain: 'development',
    question:
      'A team runs a relational database with highly unpredictable, spiky traffic — idle for hours, then sudden bursts — and wants compute capacity to scale up and down automatically within seconds, without manually resizing instances or dropping connections during a scaling event. Which service fits best?',
    choices: [
      'A fixed-size RDS MySQL instance sized for peak load',
      'Aurora Serverless v2',
      'A DynamoDB table in on-demand capacity mode',
      'A single large, manually-provisioned Aurora instance',
    ],
    correctIndexes: [1],
    explanation:
      "Aurora Serverless v2 scales database compute capacity automatically in fine-grained increments within seconds to match load, without the connection drops that could occur during Aurora Serverless v1 scaling events and without over-provisioning a fixed instance for peak load — a strong fit for spiky, hard-to-predict relational workloads. DynamoDB on-demand is serverless too, but it's non-relational — the right fit only if the app doesn't need SQL/relational features.",
  },
  {
    id: 'dev-53',
    domain: 'development',
    question:
      'An SQS-triggered Lambda function processes payment events. Because SQS delivery is at-least-once, the same message can occasionally be delivered and processed more than once — after a visibility timeout expiry, for example. The team wants to guarantee a given payment is never charged twice even on duplicate delivery. What should the function implement?',
    choices: [
      "Reduce the queue's visibility timeout to zero to avoid redelivery entirely",
      'An idempotency check: record a unique key (like the payment ID) in a fast-lookup store such as DynamoDB, using a conditional write, before performing the charge — and skip processing if that key is already recorded',
      "Increase the Lambda function's reserved concurrency",
      'Switch the queue to FIFO, which alone makes the charge operation idempotent',
    ],
    correctIndexes: [1],
    explanation:
      "Because SQS guarantees at-least-once delivery, code with real side effects (like charging a card) needs to be idempotent regardless of queue type. The standard pattern is recording a unique idempotency key in a fast, strongly-consistent store before performing the side effect, and skipping if it's already there. FIFO queues add deduplication at publish time and preserve order, but that alone doesn't protect a consumer's own side effects against every possible redelivery scenario.",
  },
  {
    id: 'dev-54',
    domain: 'development',
    question:
      "A service calls a downstream dependency that has started failing and timing out under load. With no protection in place, the calling service keeps retrying and piling up threads/connections waiting on the failing dependency, risking a cascading failure across the whole system. Which resiliency pattern addresses this by temporarily stopping calls to a failing dependency and failing fast instead?",
    choices: ['The circuit breaker pattern', 'Exponential backoff alone', 'The bulkhead pattern', 'Read-through caching'],
    correctIndexes: [0],
    explanation:
      "A circuit breaker tracks failures to a dependency and, once a threshold is crossed, \"opens\" — failing fast (or falling back) without calling the dependency at all for a cooldown period, giving it room to recover and stopping the caller from piling up retries and resources. Exponential backoff spaces out retries but still calls the same failing dependency; the bulkhead pattern isolates resources (like separate connection pools) between dependencies so one failing dependency can't starve resources needed by others — a related but distinct pattern.",
  },
  {
    id: 'dev-55',
    domain: 'development',
    question:
      'A high-traffic site needs to inspect and rewrite HTTP headers on every CloudFront viewer request, with sub-millisecond execution and minimal added latency, using simple JavaScript logic that never needs to call another AWS service or reach the origin. Which edge compute option is the better fit, over Lambda@Edge?',
    choices: [
      'CloudFront Functions, built for lightweight, high-scale JavaScript logic at the viewer request/response events',
      'Lambda@Edge, for its full Node.js/Python runtime and ability to call other AWS services',
      'An origin-based Lambda function invoked synchronously per request',
      'An API Gateway request validator',
    ],
    correctIndexes: [0],
    explanation:
      "CloudFront Functions run natively inside CloudFront's edge locations (not as a separate Lambda invocation), execute in sub-millisecond time at very high scale, and are built for lightweight, JavaScript-only logic like header manipulation or URL rewrites at the viewer request/response events. Lambda@Edge supports all four CloudFront event types (including origin request/response), longer execution times, and full language runtimes with network/AWS SDK access — better when logic needs more compute or must reach other services, but with higher latency and cost than CloudFront Functions.",
  },
  {
    id: 'dev-56',
    domain: 'development',
    question:
      'A workflow processes millions of short-lived (under a few minutes) events per day and needs fast, cost-efficient orchestration rather than a guaranteed once-only execution and a fully durable, console-visualized audit trail for every run. Which Step Functions workflow type fits, and what is the key trade-off versus the alternative?',
    choices: [
      'Standard Workflows, because only Standard supports a Map state',
      'Express Workflows, priced by number of executions/duration/memory and built for high-volume, short-duration workloads — trading Standard\'s exactly-once semantics and built-in execution history for at-least-once (or at-most-once) semantics and CloudWatch Logs-based history',
      'Standard Workflows, because they support long-running executions',
      'Express Workflows, because they support executions up to one year long',
    ],
    correctIndexes: [1],
    explanation:
      "Standard Workflows guarantee exactly-once execution, support runs up to one year long, and keep a visual, auditable execution history in the console — but are priced per state transition, which gets expensive at very high volume. Express Workflows are priced by number of executions, duration, and memory, and are built for high-volume, short-duration (up to 5 minutes) workloads — but offer only at-least-once or at-most-once execution semantics, and execution details live in CloudWatch Logs rather than the built-in console history Standard provides. Both workflow types support the same state types, including Map.",
  },
  {
    id: 'dev-57',
    domain: 'development',
    question:
      "A developer wants AI-powered, context-aware code suggestions, natural-language chat about their codebase, and automated code reviews directly inside their IDE while working on AWS-integrated application code. Which AWS tool provides this?",
    choices: ['Amazon Q Developer', 'AWS CodeGuru Reviewer alone', 'Amazon Comprehend', 'Amazon SageMaker'],
    correctIndexes: [0],
    explanation:
      "Amazon Q Developer is AWS's generative-AI-powered assistant for developers, available as an IDE/CLI extension (VS Code, JetBrains, and more) as well as in the AWS console and chat interfaces. It provides inline code suggestions, natural-language chat about a codebase, and automated code reviews integrated directly into the developer's existing workflow. CodeGuru Reviewer gives automated code-review recommendations but isn't a conversational, IDE-embedded coding assistant; Comprehend and SageMaker are general-purpose NLP/ML services, not developer coding assistants.",
  },
  {
    id: 'dev-58',
    domain: 'development',
    question:
      'A team has a large legacy Java 8 application and wants to upgrade it to a newer Java LTS version, plus generate unit tests for previously untested code, without performing the migration by hand line-by-line. Which capability fits?',
    choices: [
      "Amazon Q Developer's agentic code transformation and unit test generation capabilities",
      "CodeBuild's default build image, upgraded to a newer Java runtime",
      'The `sam build` command',
      'Manually rewriting the application from scratch',
    ],
    correctIndexes: [0],
    explanation:
      "Amazon Q Developer includes agentic code transformation capabilities — for example, automating Java version upgrades (like Java 8/11 to a newer LTS release) and generating unit tests for existing code — substantially reducing what would otherwise be a large, error-prone manual migration effort. Changing a CodeBuild image's runtime version doesn't touch the application's own source code, and `sam build` just compiles/packages code as-is.",
  },
];
