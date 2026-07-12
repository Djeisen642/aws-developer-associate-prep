import type { QuizQuestion } from '../types';

export const SECURITY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sec-1',
    domain: 'security',
    question:
      'An EC2 instance running your application needs permission to read from an S3 bucket. What is the AWS best-practice way to grant that access?',
    choices: [
      "Store an IAM user's access key and secret on the instance, refreshing them manually whenever they're due to expire",
      'Attach an IAM role to the instance profile with a policy granting S3 read access',
      'Make the S3 bucket public, so the instance can read objects without needing any credentials at all',
      'Embed credentials in the application code, rotating them through a new deployment each time they change',
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
      'Copy the DynamoDB table into Account A, keeping the two copies in sync with a scheduled export/import job',
      'Have the Lambda function assume an IAM role in Account B via STS AssumeRole',
      'Make the DynamoDB table public, so any caller can read and write to it without further configuration',
      "Share Account B's root user credentials with Account A's Lambda function via an environment variable",
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
      'Identity-based policies attach to users/groups/roles; resource-based policies attach directly to resources (like S3 buckets) and can grant cross-account access',
      'Resource-based policies only apply to EC2 instances and cannot be attached to any other AWS resource type',
      'There is no functional difference between the two — they are simply two different names for the same construct',
      'Identity-based policies can only allow access; only resource-based policies are capable of denying it',
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
      "Encryption of the request body, so the payload contents are unreadable to anyone without the caller's access key",
      'A way to cryptographically sign requests so AWS can authenticate the caller and verify the request has not been tampered with',
      'Automatic retry logic that resends a failed request with the same signature until it eventually succeeds',
      'DNS resolution for regional endpoints, mapping a service name to the nearest healthy regional API endpoint',
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
      'Grant s3:* on Resource: *, which is simplest to write and covers every possible S3 action the function might ever need',
      'Grant only the needed actions (e.g., s3:GetObject) scoped to the specific bucket ARN/prefix',
      "Attach the AdministratorAccess managed policy, since Lambda execution roles aren't billed per attached policy",
      'Grant s3:* scoped to that bucket only, since scoping the resource already satisfies least privilege on its own',
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
      'It replaces the need for identity-based policies entirely, becoming the only permissions document an entity needs',
      'It sets the maximum permissions an IAM entity (user or role) can have, regardless of what its identity-based policies grant',
      'It defines network boundaries for a VPC, restricting which subnets an IAM entity is allowed to operate within',
      'It encrypts IAM policy documents at rest, so only entities holding the matching KMS key can read them',
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
      'A KMS key policy allowing S3, since Lambda invocations are authorized through the same key policy used for encryption',
      'A resource-based policy on the Lambda function (lambda:AddPermission) granting S3 the lambda:InvokeFunction action',
      "An IAM user with S3FullAccess, attached so S3 can assume that user's permissions when it calls the function",
      "A VPC endpoint policy for Lambda, since invocations from S3 route through the function's VPC endpoint by default",
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
      'Only authenticated users — unauthenticated access is never supported by identity pools',
      'Unauthenticated ("guest") users, if you enable and configure an unauthenticated IAM role',
      'Only IAM users created manually and mapped one-to-one to each Cognito user during sign-up',
      'Only EC2 instance roles, which the identity pool proxies for any authenticated mobile client',
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
      'Always exactly 1 hour, with no way for the role or caller to request a different duration',
      "Between 15 minutes and the role's configured max session duration (up to 12 hours), default 1 hour",
      'Always 24 hours, matching the maximum session length AWS enforces for every IAM role account-wide',
      'Sessions never expire once issued, remaining valid until the role or its trust policy is deleted',
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
      'IAM policies are irrelevant for KMS — only the resource-based key policy is ever evaluated for any request',
      'The key policy, attached directly to the CMK, is the root of access control; IAM policies only grant access if the key policy delegates permission to IAM',
      'Key policies and IAM policies are the exact same construct, just attached to different resource types',
      'IAM policies always take precedence over the key policy, regardless of what the key policy allows',
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
      'Security groups require explicit outbound rules for return traffic, while NACLs allow all return traffic automatically',
      'For security groups, an allowed inbound response is automatically allowed back out; NACLs evaluate inbound/outbound independently, so return traffic needs its own rule',
      'NACLs only apply to individual EC2 instances directly, never to an entire subnet at once',
      'There is no practical difference between the two — both enforce identical stateful rule evaluation',
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
      "An S3 bucket policy naming Company B's account ID as Principal, scoped to the prefix, granting s3:GetObject",
      'Make the entire bucket public, so any AWS account (or anonymous caller) can read every object in it',
      "Create an IAM user in Company A's account and share its long-lived access keys with Company B",
      'Enable S3 Transfer Acceleration, which opens a separate accelerated endpoint reachable from any AWS account',
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
      'S3 Versioning alone, which by itself already prevents any version of an object from ever being deleted',
      'S3 Object Lock in Compliance mode, with a retention period set on the objects',
      'A bucket policy that denies s3:DeleteObject to all principals',
      'MFA Delete on the bucket, which permanently blocks all delete operations rather than only requiring extra confirmation',
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
      'Make the S3 bucket fully public, relying on the object URLs being too hard to guess',
      'Origin Access Control (OAC), paired with a bucket policy that only allows requests from that CloudFront distribution',
      'A Lambda@Edge function that checks the Referer header before forwarding the request to S3',
      'S3 Transfer Acceleration, routing requests through a nearby CloudFront edge location by default',
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
      'S3 default encryption (SSE-S3), which automatically upgrades any plain-HTTP request to HTTPS before storing the object',
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
  {
    id: 'sec-38',
    domain: 'security',
    question:
      'An application in a private subnet (no NAT gateway) needs to call the Secrets Manager API without any traffic leaving the AWS network. Secrets Manager does not support gateway VPC endpoints. What should you create instead?',
    choices: [
      'A gateway VPC endpoint for Secrets Manager, since every AWS service supports the same route-table-based endpoint type as S3',
      'An interface VPC endpoint (powered by AWS PrivateLink) for Secrets Manager, with a security group controlling access',
      'A NAT gateway, which lets Secrets Manager traffic reach the service over the public internet while staying encrypted in transit',
      "A VPN connection to Secrets Manager's public endpoint",
    ],
    correctIndexes: [1],
    explanation:
      "Most AWS services — including Secrets Manager, KMS, SNS, and SQS — are reached privately through interface VPC endpoints, which use AWS PrivateLink to place an elastic network interface with a private IP directly in your subnet; access is controlled by a security group. Gateway endpoints (route-table based, no security group) are only available for S3 and DynamoDB.",
  },
  {
    id: 'sec-39',
    domain: 'security',
    question:
      'A partner system outside your AWS account needs to verify the digital signature on documents your application signs, but must never be able to create new signatures or access any private key material. What KMS setup fits this?',
    choices: [
      'A symmetric KMS key used with GenerateDataKey, which produces a public/private key pair for signing',
      "An asymmetric KMS key pair used for signing — the private key never leaves KMS, but the public key can be shared freely for verification",
      'An IAM user with kms:Sign permission, shared with the partner so they can call the signing API directly',
      'A customer-managed multi-Region symmetric key, replicated so the partner can verify signatures locally',
    ],
    correctIndexes: [1],
    explanation:
      "Asymmetric KMS keys support sign/verify operations: the private key material never leaves KMS (signing happens through the kms:Sign API), while the corresponding public key can be downloaded and distributed to anyone who needs to verify signatures — including systems outside AWS — without ever granting them the ability to sign new documents. Symmetric KMS keys are for encrypt/decrypt and data-key generation, not digital signatures.",
  },
  {
    id: 'sec-40',
    domain: 'security',
    question:
      "A SaaS monitoring vendor assumes an IAM role in each customer's AWS account (using a role ARN the customer creates and shares with the vendor) to pull CloudWatch metrics on their behalf. AWS's documented mitigation for the cross-account \"confused deputy\" problem — where a malicious customer could trick the vendor's service into assuming a different customer's role on their behalf — is for each customer's role trust policy to require:",
    choices: [
      "Nothing extra — scoping the trust policy to the vendor's AWS account ID is always sufficient on its own",
      "A condition requiring sts:ExternalId to match a unique value that customer shared with the vendor specifically for their engagement",
      'A condition requiring MFA on every AssumeRole call',
      'A resource-based policy on the monitored resources instead of a role trust policy',
    ],
    correctIndexes: [1],
    explanation:
      "AWS's documented mitigation for the cross-account confused deputy problem is a unique external ID, passed via the sts:ExternalId condition, known only to that specific customer and the vendor for their engagement. Because a malicious customer doesn't know another customer's external ID, they can't trick the vendor's service into assuming that other customer's role on their behalf — even though the vendor's account ID is legitimately trusted broadly across many different customers' roles. Scoping the trust policy to the vendor's account ID alone doesn't stop this, since that same account is trusted by every customer simultaneously; the external ID is what ties a specific AssumeRole call to the intended customer relationship.",
  },
];
