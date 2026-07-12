import type { QuizQuestion } from '../types';

export const DEPLOYMENT_QUESTIONS: QuizQuestion[] = [
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
  {
    id: 'dep-38',
    domain: 'deployment',
    question:
      "An ECS task definition on Fargate needs two distinct sets of permissions: one for the ECS agent to pull the container image from a private ECR repo and write logs to CloudWatch, and a separate one for the application code inside the container to read from a specific S3 bucket. How should these be configured?",
    choices: [
      'One IAM role, used as the task role, covering both the ECS agent and the application code',
      "The task execution role for the ECS agent (pulling the image, writing logs) and a separate task role for the application code's own AWS API calls (like S3 access)",
      'The task role for the ECS agent and the task execution role for the application code — the reverse pairing',
      'IAM roles are not used by Fargate tasks; permissions come from the underlying EC2 instance profile',
    ],
    correctIndexes: [1],
    explanation:
      "The task execution role is used by the ECS/Fargate infrastructure itself (pulling the image, writing logs/secrets); the task role is assumed by the application code running inside the container for its own AWS API calls. Mixing them up either over-grants the infrastructure agent app-level permissions or leaves the app unable to call the AWS services it needs — and Fargate tasks have no underlying EC2 instance, so there's no instance profile to fall back on.",
  },
  {
    id: 'dep-39',
    domain: 'deployment',
    question:
      'A CI/CD pipeline needs to build a Lambda function packaged as a container image, push it to ECR, and update the Lambda function to use the new image on every commit. Which CodeBuild buildspec step is required here that would not be needed when deploying a .zip-based Lambda function?',
    choices: [
      'Running `docker build` and `docker push` to publish the image to ECR, then updating the function with the new image URI',
      'Running `npm install`',
      'Running unit tests',
      'Uploading a build artifact to an S3 bucket',
    ],
    correctIndexes: [0],
    explanation:
      "Deploying a container-image Lambda function means CodeBuild must build the Docker image, push it to an ECR repository, and then point the function at that new image URI (e.g. via `aws lambda update-function-code --image-uri`) — a materially different artifact flow than a .zip-based Lambda deployment, which packages and uploads a .zip instead of building/pushing a container image.",
  },
  {
    id: 'dep-40',
    domain: 'deployment',
    question:
      'A team wants to release a new API Gateway stage configuration to a small percentage of production traffic first, monitor error rates separately from the current version, and promote to 100% only if it looks healthy — without standing up a second stage or changing the client-facing URL. What API Gateway feature fits this?',
    choices: [
      'A canary release deployment on the existing stage, with a configurable traffic percentage and the ability to promote or roll back',
      'A completely separate stage with its own URL, splitting traffic manually with Route 53 weighted routing',
      'A Lambda alias with weighted traffic shifting',
      'CloudFront origin failover',
    ],
    correctIndexes: [0],
    explanation:
      'API Gateway stages support canary release deployments directly: a configurable percentage of traffic on the same stage (same URL) is routed to the canary (new) deployment while the rest goes to the current one, with CloudWatch metrics reported separately for each — and a single "promote canary" action rolls it out to 100%, or you can roll back. No second stage, URL change, or external traffic-splitting tool is required.',
  },
  {
    id: 'dep-41',
    domain: 'deployment',
    question:
      'A team wants to toggle a new feature on or off for a percentage of production users instantly, without redeploying application code — with built-in validation to catch a bad configuration before it rolls out broadly, and automatic rollback if error-rate alarms fire during the rollout. Which service is purpose-built for this?',
    choices: [
      'Systems Manager Parameter Store, polled by the application every few minutes',
      'AWS AppConfig, with a deployment strategy and CloudWatch alarm-based automatic rollback',
      'Hardcoded environment variables, redeployed via CI/CD',
      'A DynamoDB table, with the application polling a "features" table',
    ],
    correctIndexes: [1],
    explanation:
      'AWS AppConfig is purpose-built for dynamic application configuration and feature flags: it validates new configuration before deployment, rolls it out gradually according to a defined deployment strategy, and can automatically roll back if a monitoring alarm fires mid-rollout — capabilities Parameter Store, hardcoded environment variables, or a hand-rolled DynamoDB table don\'t provide out of the box.',
  },
];
