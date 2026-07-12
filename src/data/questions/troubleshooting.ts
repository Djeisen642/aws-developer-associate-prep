import type { QuizQuestion } from '../types';

export const TROUBLESHOOTING_QUESTIONS: QuizQuestion[] = [
  {
    id: 'tr-1',
    domain: 'troubleshooting',
    question:
      'A Lambda function intermittently fails with "Task timed out after 3.00 seconds". What is the most direct fix?',
    choices: [
      "Increase the function's memory allocation only, which raises the timeout ceiling proportionally along with the extra CPU",
      "Increase the function's configured timeout (and investigate/optimize slow dependencies)",
      "Switch the function to a container image, which removes Lambda's maximum execution duration limit entirely",
      'Add a dead-letter queue, which automatically extends the timeout for any invocation that would otherwise fail',
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
      "The table has too many GSIs, each of which silently caps the base table's total available throughput",
      'A hot partition, caused by a partition key with low cardinality or highly skewed access patterns',
      'The AWS Region is experiencing an outage, throttling every DynamoDB table in that Region uniformly',
      'The table is missing a sort key, which DynamoDB requires in order to spread writes evenly across partitions',
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
      'The client sent malformed JSON, which API Gateway rejects with a 502 before the request ever reaches Lambda',
      'The Lambda function returned a response in an invalid format for the configured integration (e.g., missing required fields for proxy integration)',
      'The API key is invalid, which API Gateway reports back to the client as a generic 502 rather than a 403',
      'CORS is misconfigured, causing the browser to render the blocked preflight response as a 502 Bad Gateway',
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
      'A visibility timeout of 0, so a failing message becomes visible to another consumer again instantly',
      'A dead-letter queue (DLQ) with a maxReceiveCount, so the message is moved aside after repeated failures',
      'FIFO ordering, which stops a queue from redelivering the same failing message to the same consumer',
      'A larger Lambda memory setting, giving the function enough headroom to eventually process the poison message successfully',
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
      "Reduce the function's memory allocation, which frees up more of the account's shared concurrency pool for this function",
      'Increase reserved/account concurrency limits for the function, or smooth bursts with an SQS buffer in front of it',
      "Switch the function's runtime language, since interpreted languages have a lower per-invocation concurrency ceiling than compiled ones",
      'Disable X-Ray tracing, which reserves a portion of concurrency capacity for trace collection on every invocation',
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
      'They are two names for the exact same feature, just surfaced in different parts of the API Gateway console',
      'Execution logs capture detailed request/response processing steps; access logs capture a customizable summary (method, path, status, latency) per request',
      'Access logs are only available for HTTP APIs, execution logs only for REST APIs, with no overlap between the two',
      'Execution logs are billed separately from CloudWatch entirely, through a dedicated API Gateway logging charge',
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
      'It automatically compresses item sizes to save storage cost, freeing up throughput for other access patterns',
      "It automatically and transparently absorbs some hot-key traffic within a table's allocated throughput, without manual intervention",
      'It removes the need for indexes entirely, since adaptive capacity routes queries around the base table',
      'It automatically archives old, rarely-accessed items to S3 Glacier to reduce table storage costs',
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
      'Immediately delete and recreate the entire stack, since a failed update usually means the template itself is unusable',
      "Check the stack's Events tab (or CloudTrail/CloudWatch Logs) to identify which resource failed and why",
      "Increase the stack's timeout setting and retry blindly, since failures are almost always caused by a value set too low",
      'Switch the template from YAML to JSON, since CloudFormation processes JSON templates more reliably than YAML',
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
      "The Lambda function's timeout is set too low, cutting off trace collection before downstream subsegments can be recorded",
      'The application code is not using the X-Ray SDK to instrument the AWS SDK client and outgoing HTTP calls',
      'The X-Ray sampling rate is set to 100%, which paradoxically causes X-Ray to drop subsegments to control data volume',
      'The DynamoDB table does not have Streams enabled, which X-Ray requires in order to trace calls made against that table',
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
      "The function has had zero errors, and CloudWatch doesn't publish a data point for some metrics when the underlying event never occurs",
      'The Lambda function has been deleted, which suspends alarm evaluation until a new function with the same name is created',
      'CloudWatch Alarms are only supported for EC2 metrics, not for Lambda function-level metrics like Errors',
      'The account has exceeded its CloudWatch Logs retention limit, which pauses alarm evaluation for every metric until logs age out',
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
      "The account has hit its S3 request limit, which Lambda enforces as a shared ceiling across every function that touches S3",
      "The functions' IAM roles have expired, which AWS does automatically after a burst of concurrent role assumptions from one account",
      'CloudWatch Logs retention is misconfigured, causing Lambda to throttle new invocations once the retention window fills up',
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
      'Disable X-Ray entirely and rely on CloudWatch Logs only, since logs capture the same latency breakdown that X-Ray traces do',
      "A custom X-Ray sampling rule that lowers the percentage traced for high-volume routine traffic, while keeping the reservoir (a fixed number of requests per second always traced) intact",
      'The Lambda function timeout, since lowering it reduces how many requests are eligible to be traced in the first place',
      "The CloudWatch Logs retention period, since X-Ray reads its sampling configuration from the log group's retention setting",
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
      'A single Lambda function has been given reserved concurrency of zero, throttling every API that happens to share its account',
      'The account-level API Gateway throttle limit (a shared, regional default) has been exceeded across all APIs combined',
      'The DynamoDB table backing the API is under-provisioned, which API Gateway reports to clients as a 429 instead of the true error',
      "CloudFront is caching stale responses, serving a cached 429 to every client regardless of their actual request rate",
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
      "Reading the state machine's IAM role policy, which lists the current state as part of its last-updated timestamp",
      "Viewing the specific execution's event history and visual workflow graph in the Step Functions console",
      'Checking S3 access logs, since Step Functions writes each state transition as an object write to a logging bucket',
      'Increasing the Lambda function timeout, so the state currently running has more time to complete before appearing stuck',
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
      'VPC-attached Lambda functions provision ENIs in the configured subnets, and too few free IP addresses there can throttle scaling and add latency',
      'RDS does not support connections from Lambda functions running inside the same VPC as the database',
      "VPC Lambda functions cannot use environment variables, since those are resolved through the function's public endpoint",
      "The Lambda function's IAM role lost its permissions automatically the moment the function was attached to a VPC",
    ],
    correctIndexes: [0],
    explanation:
      "Lambda functions in a VPC use Hyperplane ENIs shared across functions/subnets, which reduced most of the historical ENI cold-start penalty, but scaling is still bounded by available IP addresses in the configured subnets — a small or nearly-full subnet can throttle concurrency growth and add latency. Sizing subnets with enough free IPs (and spreading across multiple subnets/AZs) is the standard fix.",
  },
  {
    id: 'tr-30',
    domain: 'troubleshooting',
    question:
      'An application wants to publish several custom, dimensioned CloudWatch metrics alongside its structured application logs, without making a separate PutMetricData API call for every metric — reducing API call volume and cost at high throughput. What should it use?',
    choices: [
      'The CloudWatch Embedded Metric Format (EMF), writing specially-structured JSON log lines that CloudWatch automatically extracts as metrics',
      'Increasing the CloudWatch Logs retention period, which raises the number of custom metrics a single log group can emit per month',
      'A CloudWatch Logs metric filter on every log line, extracting every dimensioned metric from a single pattern match',
      'X-Ray annotations, which are automatically mirrored into CloudWatch as custom dimensioned metrics with no extra configuration',
    ],
    correctIndexes: [0],
    explanation:
      "The Embedded Metric Format lets an application emit structured JSON log entries — which also serve as normal logs — containing a metrics directive; CloudWatch automatically extracts one or more dimensioned metrics from each entry, batched in with log writes instead of a separate PutMetricData call per metric. This is typically cheaper and lower-latency at high volume than individual API calls. A metric filter extracts a single metric via text pattern matching, and doesn't support cleanly extracting multiple dimensioned metrics from one structured log line the way EMF does.",
  },
];
