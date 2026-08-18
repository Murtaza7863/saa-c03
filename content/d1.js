lesson({
  id: "iam-core",
  order: 6,
  domain: 1,
  minutes: 18,
  title: "Who is allowed to do what (IAM)",
  summary:
    "Identity and Access Management is the lock on the account: people, computers, and rules that say Allow or Deny.",
  tags: ["iam", "policy", "least privilege", "mfa"],
  youCan: [
    "Say IAM is who can do what, on which resource, from where.",
    "Prefer a role on a computer over a long-lived key file on the disk.",
    "Remember: an explicit Deny wins; a second account needs permission on both sides.",
  ],
  body: `
    <p><strong>Identity and Access Management (IAM)</strong> is the lock on the account. Every later security lesson, and almost every scary story at work, is the same sentence: <em>who is allowed to do what, on which resource, from where?</em></p>
    <p>Think of a nightclub: a <strong>who</strong> (person, computer, or another AWS account), a <strong>door list</strong> (the policy — a written list of yes/no rules), and a <strong>room</strong> (the bucket, database, or computer they want to use).</p>
    <div class="arch">
      <div class="arch-label">Three kinds of “who”</div>
      <div class="arch-row">
        <div class="arch-box solid"><strong>A person</strong><small>you, a coworker — prefer Identity Center, not a long-lived IAM user</small></div>
        <div class="arch-box"><strong>A computer or function</strong><small>EC2 / Lambda must talk to S3 — give it a role, not a password file</small></div>
        <div class="arch-box"><strong>Another account</strong><small>needs permission on both sides, not only on yours</small></div>
      </div>
    </div>
    <h2>Identities (the “who”)</h2>
    <ul>
      <li><strong>IAM user</strong> — a long-lived login in one account (a username + password, and maybe access keys). Fine for a tiny personal sandbox. Companies prefer Identity Center for people. Never paste user access keys into an app.</li>
      <li><strong>IAM group</strong> — a bundle of permissions you attach to IAM users. Groups do not nest. You do not hang a group on a computer.</li>
      <li><strong>IAM role</strong> — an identity you <em>assume</em> for a while. Amazon’s Security Token Service hands out temporary keys that expire. EC2, Lambda, a vendor, another account — this is the default “who” for anything that is not a human typing a password every day.</li>
      <li><strong>IAM Identity Center</strong> (workforce single sign-on) — employees. Permission sets become roles in each account. Preferred over IAM users for humans.</li>
    </ul>
    <p>An <strong>instance profile</strong> is just the envelope that hangs a role on an EC2 computer, so the computer can call AWS without a key file on the disk.</p>
    <h2>What a policy is</h2>
    <p>A <strong>policy</strong> is a JSON document (curly-brace text) that says Allow or Deny. An <strong>ARN</strong> (Amazon Resource Name) is the full address of one thing, like a file path for the cloud.</p>
    <p>Where you <em>attach</em> the policy changes what it means:</p>
    <p><strong>Identity-based</strong> = “this person/computer may…” <strong>Resource-based</strong> = “this bucket/key may be used by…” If the caller is in a <em>different</em> account, you usually need both.</p>
    <div class="table-wrap"><table>
      <tr><th>Type</th><th>Attached to</th><th>Job</th></tr>
      <tr><td>Identity-based</td><td>User, group, role</td><td>What this identity can do</td></tr>
      <tr><td>Resource-based</td><td>S3 bucket, KMS key, SQS, SNS, Lambda, Secrets Manager…</td><td>Who can use <em>this</em> resource (can include other accounts)</td></tr>
      <tr><td>Permission boundary</td><td>User or role</td><td>Max ceiling; used so a delegated admin cannot create a super-admin</td></tr>
      <tr><td>Service Control Policy (SCP)</td><td>Org OU / account</td><td>Account-wide ceiling (never grants)</td></tr>
      <tr><td>Session policy</td><td>AssumeRole call</td><td>Further restrict one session</td></tr>
    </table></div>
    <h2>How AWS decides yes or no (simplified)</h2>
    <div class="arch">
      <div class="arch-label">Read top to bottom</div>
      <div class="arch-flow">
        <div class="arch-box"><strong>1. Any explicit Deny?</strong><small>anywhere: identity, resource, SCP, boundary — stop, no</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>2. Is there an Allow?</strong><small>the identity needs one. Another account also needs the resource’s own Allow</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box solid"><strong>3. Ceilings</strong><small>SCPs and permission boundaries never grant. They can only shrink.</small></div>
      </div>
    </div>
    <ol>
      <li>Explicit <strong>Deny</strong> anywhere (identity, resource, SCP, boundary, session) wins.</li>
      <li>Otherwise need an <strong>Allow</strong> from identity policy <em>and</em> (if a resource policy exists and the principal is from another account) the resource policy.</li>
      <li>Same-account: identity Allow is often enough; resource policy can still Deny.</li>
      <li>SCPs and boundaries cannot grant; they only allow the request if they don’t block it.</li>
    </ol>
    <h2>Least privilege in practice</h2>
    <p>Give only what the job needs. “AdministratorAccess on the computer so the app works” is how breaches start.</p>
    <ul>
      <li>Prefer actions + resource ARNs + conditions (<code>aws:SourceIp</code>, <code>aws:SourceVpce</code>, <code>kms:ViaService</code>, <code>s3:x-amz-server-side-encryption</code>).</li>
      <li>MFA for humans; <code>aws:MultiFactorAuthPresent</code> on sensitive actions (stop instances, decrypt, delete vault).</li>
      <li>Access keys: none on root; rotate; prefer roles for compute.</li>
      <li>IAM Access Analyzer and last-used data exist to tighten policies — “review unused access” questions.</li>
    </ul>
    <div class="callout trap"><strong>Resource policy vs identity</strong>Cross-account S3 access needs <em>both</em> a bucket policy (or ACL, don’t use ACLs) allowing the other account <em>and</em> identity permission in the caller account. Forgetting the bucket policy is the classic miss.</div>
  `,
  traps: [
    "Putting AWS keys in Lambda environment variables or an AMI.",
    "Using IAM users for EC2. Use an instance profile (role).",
    "Thinking a Deny in a permission boundary can be overridden by AdministratorAccess on the role — it cannot.",
  ],
  quiz: [
    {
      q: "An app on EC2 must call S3 and SQS. Best credential design?",
      choices: [
        "IAM user access keys stored in a file on the instance",
        "IAM role as instance profile; no long-lived keys on disk",
        "Root access keys in user data",
        "Hard-code keys in the application repo with .gitignore",
      ],
      answer: 1,
      explain:
        "The computer gets a role (an instance profile). Amazon mints temporary keys on the box. A long-lived access key file on disk is how keys get stolen.",
    },
    {
      q: "Account A’s Lambda must read a bucket in Account B. What is required?",
      choices: [
        "Only an identity policy on the Lambda role in A",
        "Only a bucket policy in B",
        "Identity policy on the Lambda role in A AND a bucket policy in B that allows that role",
        "Enable S3 Transfer Acceleration",
      ],
      answer: 2,
      explain:
        "Two different accounts: the caller needs permission, and the bucket in the other account must also allow that caller. Speeding up transfers does not grant access.",
    },
    {
      q: "A junior admin must create roles for apps but must not be able to create a role with AdministratorAccess. Tool?",
      choices: [
        "SCP only on the management account root user",
        "IAM permission boundary on the junior admin and on roles they create",
        "Security group",
        "AWS WAF",
      ],
      answer: 1,
      explain:
        "A permission boundary is a ceiling on that one person and on roles they create. A Service Control Policy is an account-wide ceiling, not “this one human.”",
    },
  ],
});

lesson({
  id: "iam-roles-federation",
  order: 7,
  domain: 1,
  minutes: 16,
  title: "Roles, STS, and federation",
  summary:
    "Temporary credentials, AssumeRole, Identity Center, Cognito, and cross-account patterns.",
  tags: ["sts", "assume role", "cognito", "identity center", "saml"],
  body: `
    <p>You already know IAM is the lock. This lesson is how a <em>computer</em>, an <em>employee from the company directory</em>, or a <em>vendor</em> gets a short-lived key — not a password file on disk.</p>
    <h2>STS in one sentence</h2>
    <p><strong>AWS STS</strong> vends short-lived keys. <code>AssumeRole</code>, <code>AssumeRoleWithSAML</code>, <code>AssumeRoleWithWebIdentity</code>. Everything modern uses this instead of IAM user keys.</p>
    <h2>Trust policy vs permissions policy</h2>
    <p>A role has two JSON documents:</p>
    <ul>
      <li><strong>Trust (assume-role policy)</strong> — who may assume this role (EC2 service, another account’s role, SAML provider, OIDC).</li>
      <li><strong>Permissions</strong> — what the session can do after assuming.</li>
    </ul>
    <p>Cross-account: Account B role trusts Account A’s role ARN (or account root, looser). Account A identity needs <code>sts:AssumeRole</code> on B’s role ARN. Optional external ID for third-party vendors (confused deputy).</p>
    <h2>Humans</h2>
    <ul>
      <li><strong>IAM Identity Center</strong> — workforce, permission sets mapped to accounts. Can use built-in directory, AD, or external IdP (SAML/OIDC).</li>
      <li><strong>SAML 2.0 federation</strong> to IAM roles — older but still in questions: corporate AD → SAML → AssumeRoleWithSAML.</li>
    </ul>
    <h2>Apps and mobile</h2>
    <p><strong>Amazon Cognito</strong> user pools = your user directory (sign-up, JWT). Identity pools = exchange IdP token for temporary AWS credentials (roles for authenticated vs guest). Use Cognito when the stem is “mobile/web users, not employees.” Employees = Identity Center. AWS service-to-service = IAM roles, not Cognito.</p>
    <h2>EC2 and IMDSv2</h2>
    <p>Instance metadata must be IMDSv2 (session hop limit) so SSRF cannot steal the role. Exam may say “protect credentials from a compromised web app” → require IMDSv2, or don’t put a privileged role on a public web instance (use least privilege + maybe a separate task role).</p>
    <div class="callout tip"><strong>Keyword map</strong>Workforce / multiple accounts → Identity Center. Mobile app users → Cognito. Third-party vendor accessing your account → role + external ID. EC2/Lambda/ECS task → service role. Break-glass → tightly audited role with MFA.</div>
  `,
  traps: [
    "Cognito for employees who need the AWS Console across 40 accounts (Identity Center).",
    "Identity Center for a game’s 2 million players (Cognito).",
    "Sharing IAM user keys with a vendor.",
  ],
  quiz: [
    {
      q: "A mobile game needs millions of players to upload photos to S3 without IAM users per player.",
      choices: [
        "Create an IAM user per player",
        "Cognito identity pool with a role limited to PutObject on a prefix",
        "Put the company’s admin keys in the app",
        "Enable S3 public write",
      ],
      answer: 1,
      explain:
        "Identity pool → temporary creds scoped to that user’s prefix. Public write is a breach.",
    },
    {
      q: "Consultants from a vendor need to read CloudWatch in your account. Safest?",
      choices: [
        "Create IAM users and email passwords",
        "Cross-account role with external ID; vendor assumes it from their account",
        "Share root MFA device",
        "Open the console with no auth on a bastion",
      ],
      answer: 1,
      explain:
        "External ID is the vendor pattern. No long-lived users in your account for a third party.",
    },
  ],
});

lesson({
  id: "organizations-governance",
  order: 8,
  domain: 1,
  minutes: 14,
  title: "Organizations, SCPs, Control Tower, RAM",
  summary:
    "Multi-account is the real security boundary. Guardrails, sharing, and logging accounts.",
  tags: ["organizations", "scp", "control tower", "ram", "cloudtrail"],
  body: `
    <p>One account is fine for labs. A company uses many accounts so a leak in “experiments” cannot delete production. This lesson is the fence between those accounts — and the log pile nobody on the app team can empty.</p>
    <h2>Why many accounts</h2>
    <p>Blast radius, billing tags/chargeback, different security teams, and SCP isolation. Typical OU layout: Security (Log Archive, Audit), Sandbox, Workloads (Prod/Nonprod), Suspended.</p>
    <h2>SCPs</h2>
    <ul>
      <li>Attached to OUs or member accounts. Not to the management account (it can still do anything — protect it).</li>
      <li>Default FullAWSAccess must remain unless you know how to write an allow-list SCP (easy to lock yourself out).</li>
      <li>Examples: deny leaving org, deny disabling CloudTrail, deny creating resources outside <code>eu-central-1</code>, deny IAM user creation (force Identity Center).</li>
    </ul>
    <h2>Control Tower</h2>
    <p>Landing zone automation: Account Factory, mandatory guardrails (detective via AWS Config, preventive via SCP), centralized logging. Choose Control Tower when the stem is “new multi-account environment, best practice, least ops to set up the org.”</p>
    <h2>AWS RAM</h2>
    <p>Share subnets, Transit Gateway, Route 53 resolver rules, License Manager — inside the org — without copying resources. Shared VPC: network team owns the VPC account; app accounts launch into shared subnets.</p>
    <p><strong>Service Catalog</strong> — approved products (a “golden” VPC/RDS template) that member accounts can launch. Stem: “developers may only deploy from an approved list.”</p>
    <h2>Central logging (you will see this stem weekly)</h2>
    <p>Organization CloudTrail → S3 in Log Archive account, bucket policy only from trail, MFA delete / object lock if “tamper resistant,” CloudWatch Logs optional, AWS Config aggregator in Audit account, GuardDuty delegated admin. Security Hub rolls findings up.</p>
    <div class="callout compare"><strong>Config vs CloudTrail vs CloudWatch</strong>CloudTrail = API audit (who called what). Config = resource inventory + drift/compliance rules. CloudWatch = metrics, logs, alarms. They are not interchangeable.</div>
  `,
  traps: [
    "Applying SCPs to the management account and expecting them to bind it like a member.",
    "Storing CloudTrail logs in the production account the builders can delete.",
    "Using RAM to share an IAM role’s credentials (that’s not what RAM does).",
  ],
  quiz: [
    {
      q: "Developers must not be able to disable CloudTrail in workload accounts, even with AdministratorAccess.",
      choices: [
        "Ask them nicely",
        "SCP Deny on cloudtrail:StopLogging / DeleteTrail on the workloads OU",
        "Security group egress deny",
        "KMS key rotation",
      ],
      answer: 1,
      explain:
        "Only an SCP (or removing admin, which they still might grant themselves) reliably caps AdministratorAccess in member accounts.",
    },
    {
      q: "Network team wants one VPC; app teams in other accounts must launch EC2 into it.",
      choices: [
        "VPC peering to every app account and copy route tables by hand",
        "AWS RAM share of subnets (shared VPC)",
        "Public subnets and public IPs",
        "AWS DataSync",
      ],
      answer: 1,
      explain: "Shared VPC via RAM is the pattern.",
    },
  ],
});

lesson({
  id: "vpc-security",
  order: 9,
  domain: 1,
  minutes: 16,
  title: "Secure VPC design",
  summary:
    "Public/private tiers, SG vs NACL, endpoints, VPN, Direct Connect, and Network Firewall.",
  tags: [
    "vpc",
    "security group",
    "nacl",
    "privatelink",
    "vpn",
    "direct connect",
  ],
  body: `
    <p>You already drew the private network. This lesson is the doors: who can knock, how you log in without opening port 22 to the world, and a private road to S3 so you don’t pay a NAT tax for file traffic.</p>
    <h2>Tiering</h2>
    <p>Internet-facing load balancer in public subnets. App and data in private. Databases: no public accessibility checkbox. Bastion or better: <strong>SSM Session Manager</strong> (no SSH port, IAM-auth, logging). If the stem still wants SSH, bastion in public + SG 22 only from that bastion.</p>
    <h2>Endpoints</h2>
    <ul>
      <li><strong>Gateway endpoint</strong> — S3, DynamoDB. Route table prefix list. No extra hourly charge.</li>
      <li><strong>Interface endpoint (PrivateLink)</strong> — ENI per AZ, security groups, private DNS. Most AWS APIs, and your own NLB-backed services. Use when “must not traverse internet” or “overlap CIDRs, still consume a service.”</li>
    </ul>
    <h2>Hybrid</h2>
    <div class="table-wrap"><table>
      <tr><th></th><th>Site-to-Site VPN</th><th>Direct Connect</th></tr>
      <tr><td>Setup</td><td>Hours, encrypted over internet</td><td>Weeks, dedicated circuit</td></tr>
      <tr><td>Use</td><td>Backup, quick start, low-moderate bandwidth</td><td>Consistent latency, lots of data, production hybrid</td></tr>
      <tr><td>Exam combo</td><td colspan="2">DX for primary + VPN as failover (or DX + DX). Encrypt DX with VPN or MACsec when “must be encrypted.”</td></tr>
    </table></div>
    <p><strong>Client VPN</strong> — remote humans. <strong>PrivateLink</strong> — expose a service without opening the VPC. <strong>Transit Gateway</strong> — hub for many VPCs + VPN/DX.</p>
    <h2>AWS Network Firewall / Gateway Load Balancer</h2>
    <p>When you need IDS/IPS or a fleet of virtual appliances, traffic is steered with route tables to GWLB or Network Firewall. Don’t pick these for a simple SG question.</p>
    <h2>DDoS and HTTP threats</h2>
    <p>Covered next lesson — but network-layer: Shield Standard is automatic on ALB/CloudFront/Route 53. Security groups are not a DDoS product.</p>
  `,
  traps: [
    "Opening RDS to 0.0.0.0/0 ‘temporarily.’",
    "VPN when the stem needs 10 Gbps consistent (DX).",
    "DX alone when the stem requires encryption in transit — add VPN overlay or MACsec.",
  ],
  quiz: [
    {
      q: "Admins must open a shell on private EC2 without opening inbound 22 and without a bastion.",
      choices: [
        "Elastic IP + SSH from 0.0.0.0/0",
        "AWS Systems Manager Session Manager",
        "FTP",
        "Public ALB to port 22",
      ],
      answer: 1,
      explain:
        "SSM is the no-bastion pattern. Needs SSM agent + instance profile + (usually) endpoints if no NAT.",
    },
    {
      q: "Must connect on-prem to AWS with predictable 5 Gbps and a VPN backup.",
      choices: [
        "Only Internet Gateway",
        "Direct Connect primary + Site-to-Site VPN backup",
        "Only Client VPN",
        "VPC peering to the office",
      ],
      answer: 1,
      explain:
        "You cannot peer to on-prem. DX + VPN is the HA hybrid textbook.",
    },
  ],
});

lesson({
  id: "app-edge-security",
  order: 10,
  domain: 1,
  minutes: 14,
  title: "WAF, Shield, GuardDuty, Inspector, Macie",
  summary:
    "Edge protection and threat detection. Know what each finding-service is for.",
  tags: ["waf", "shield", "guardduty", "inspector", "macie", "security hub"],
  body: `
    <p>Security groups stop ports. They do not read a URL. This lesson is the named products for “bad HTTP,” “flood,” “something weird in the account,” and “there are passport scans in a bucket.”</p>
    <h2>AWS WAF</h2>
    <p>Layer 7 rules on <strong>ALB, CloudFront, API Gateway, AppSync, Cognito (user pool)</strong>. SQL injection, XSS, rate-based rules, geo, IP sets, Bot Control. When the stem is “OWASP, malicious HTTP, rate limit API,” pick WAF — not security groups (they don’t parse HTTP).</p>
    <h2>AWS Shield</h2>
    <ul>
      <li><strong>Standard</strong> — always on, L3/L4 for CloudFront, ALB, Route 53. Free.</li>
      <li><strong>Advanced</strong> — extra DDoS protections, cost protection, 24/7 DDoS response team, integrates with WAF. Pick when “large DDoS, financial protection, want Shield Response Team.”</li>
    </ul>
    <h2>GuardDuty</h2>
    <p>Threat intel on CloudTrail, VPC Flow Logs, DNS, (optional) S3, EKS, RDS, Lambda, Malware Protection for EBS. Output: findings, not a firewall. Enable org-wide delegated admin. Pair with EventBridge → SNS/Lambda for response.</p>
    <h2>Inspector</h2>
    <p>Vulnerability scanning: EC2 (SSM), ECR images, Lambda. CVE / network reachability. Not runtime threat intel (that’s GuardDuty).</p>
    <h2>Macie</h2>
    <p>Discovers sensitive data in <strong>S3</strong> (PII, credentials). Classification / data security questions.</p>
    <h2>Security Hub, Detective, Firewall Manager</h2>
    <p><strong>Security Hub</strong> — one scoreboard (CIS, Foundational Security Best Practices) aggregating GuardDuty, Inspector, Macie, Config. <strong>Detective</strong> — investigation graphs after an incident. <strong>Firewall Manager</strong> — centrally deploy WAF/SG/Shield policies across accounts.</p>
    <div class="callout tip"><strong>One-line picker</strong>HTTP exploit → WAF. Volumetric DDoS → Shield. “Is this API call weird?” → GuardDuty. “Is this AMI/package CVE?” → Inspector. “SSN in a bucket?” → Macie. “Org-wide WAF policy” → Firewall Manager.</div>
  `,
  traps: [
    "GuardDuty as a packet filter that blocks traffic (it doesn’t).",
    "Macie on EBS or RDS (it’s S3-centric on this exam).",
    "WAF on an NLB (WAF needs HTTP listeners: ALB/CloudFront/API GW).",
  ],
  quiz: [
    {
      q: "API on API Gateway is being flooded with SQLi payloads. First control?",
      choices: [
        "NACL deny 80",
        "AWS WAF on API Gateway",
        "Macie",
        "S3 Object Lock",
      ],
      answer: 1,
      explain:
        "L7 inspection is WAF. NACL is IP/port. Macie is data classification.",
    },
    {
      q: "Security team wants automatic detection of crypto-mining behavior on EC2 using AWS telemetry.",
      choices: [
        "AWS WAF",
        "Amazon GuardDuty",
        "AWS Artifact",
        "Amazon Rekognition",
      ],
      answer: 1,
      explain:
        "GuardDuty findings include crypto/C2. Artifact is compliance reports. Rekognition is images.",
    },
    {
      q: "Find credit-card numbers left in S3.",
      choices: [
        "Amazon Macie",
        "AWS Shield",
        "Elastic Transcoder",
        "AWS Glue only",
      ],
      answer: 0,
      explain:
        "Macie. Glue can transform data but is not the PII discovery service the exam wants.",
    },
  ],
});

lesson({
  id: "secrets-app-config",
  order: 11,
  domain: 1,
  minutes: 10,
  title: "Secrets, certificates, and app credentials",
  summary:
    "Secrets Manager vs Parameter Store, ACM, and never baking secrets into images.",
  tags: ["secrets manager", "ssm parameter", "acm", "cognito"],
  body: `
    <div class="table-wrap"><table>
      <tr><th></th><th>Secrets Manager</th><th>SSM Parameter Store</th></tr>
      <tr><td>Best for</td><td>DB creds, third-party API keys, automatic rotation (Lambda)</td><td>Config and secrets (SecureString); cheaper; no native rotation engine like Secrets Manager</td></tr>
      <tr><td>Rotation</td><td>Built-in for RDS/Aurora/Redshift/DocumentDB etc.</td><td>You build it</td></tr>
      <tr><td>Exam cue</td><td>“Rotate every 30 days,” “RDS credentials”</td><td>“Hierarchy /config/prod/db,” cheap parameters, or mixed config</td></tr>
    </table></div>
    <p>Both encrypt with KMS. Access via IAM. Inject at runtime (ECS secrets, Lambda env from Secrets Manager extension, ECS/EKS CSI). Never AMI, never git, never S3 public.</p>
    <h2>Certificates</h2>
    <p><strong>ACM</strong> issues/renews public TLS certs for ALB, CloudFront, API Gateway — free, auto-renew. Need a cert on EC2 itself? ACM public certs cannot be exported; use ACM Private CA or import. CloudFront requires cert in <code>us-east-1</code>.</p>
    <h2>Cognito (apps)</h2>
    <p>User pools for app users; MFA, hosted UI, JWT to API Gateway. Don’t use IAM users for customers.</p>
  `,
  traps: [
    "Storing DB password in Lambda environment as plain text with no KMS.",
    "Exporting an ACM public certificate onto EC2 (you can’t).",
    "Parameter Store when the stem heavily emphasizes managed rotation of RDS passwords — Secrets Manager.",
  ],
  quiz: [
    {
      q: "Aurora password must rotate every 30 days with least custom code.",
      choices: [
        "Put password in Git",
        "Secrets Manager with rotation",
        "S3 file chmod 777",
        "Hard-code and change yearly",
      ],
      answer: 1,
      explain: "Secrets Manager rotation is the managed path for RDS/Aurora.",
    },
    {
      q: "TLS on an ALB with automatic renewal, no EC2 involved in TLS.",
      choices: [
        "Buy a cert, copy to each instance",
        "ACM certificate attached to the ALB",
        "Self-signed in a security group",
        "WAF encryption",
      ],
      answer: 1,
      explain: "Terminate TLS at ALB with ACM. WAF is not TLS.",
    },
  ],
});

lesson({
  id: "kms-encryption",
  order: 12,
  domain: 1,
  minutes: 16,
  title: "KMS, encryption at rest and in transit",
  summary:
    "CMK vs AWS-owned keys, key policies, envelope encryption, and when CloudHSM appears.",
  tags: ["kms", "encryption", "cloudhsm", "s3 sse", "ebs"],
  body: `
    <h2>At rest</h2>
    <p>Almost every data service encrypts with AWS KMS: S3, EBS, EFS, RDS, DynamoDB, SQS, SNS, CloudWatch Logs… The exam distinction is <strong>who owns the key</strong> and <strong>who is allowed to use it</strong>.</p>
    <ul>
      <li><strong>AWS owned</strong> — you cannot see it in KMS. Fine if the stem doesn’t care about key policy/audit.</li>
      <li><strong>AWS managed</strong> (<code>aws/s3</code> etc.) — you see it, limited policy control.</li>
      <li><strong>Customer managed key (CMK)</strong> — you set key policy, IAM, grants, rotation, cross-account, CloudTrail on key use. Pick when “customer managed,” “separate account must not decrypt,” “must rotate,” “must be able to immediately revoke.”</li>
    </ul>
    <h2>S3 encryption options</h2>
    <ul>
      <li><strong>SSE-S3</strong> — S3-managed AES-256. Simple.</li>
      <li><strong>SSE-KMS</strong> — KMS CMK, audit who decrypted, bucket keys to cut KMS cost.</li>
      <li><strong>SSE-C</strong> — customer provides a key on each request (rare; you manage the key material outside AWS).</li>
      <li><strong>DSSE-KMS</strong> — dual layer, compliance niches.</li>
      <li><strong>Client-side</strong> — encrypt before PutObject; AWS never sees plaintext. Use when “AWS operators must not be able to read.”</li>
    </ul>
    <p>Default encryption on the bucket + bucket policy <code>Deny</code> if <code>s3:x-amz-server-side-encryption</code> missing. S3 Bucket Keys reduce KMS API volume.</p>
    <h2>Key policy is the resource policy</h2>
    <p>KMS keys do not trust IAM by default the way S3 sometimes feels like it does. The key policy must allow the principal (and often <code>kms:ViaService</code>). Cross-account snapshots/AMIs: share the snapshot <em>and</em> grant kms:Decrypt/CreateGrant on the CMK.</p>
    <h2>In transit</h2>
    <p>TLS everywhere: ALB/CloudFront/ACM, HTTPS endpoints, <code>rds.force_ssl</code>, S3 HTTPS (default). VPN/DX encryption as in the VPC lesson. <strong>ACM</strong> for public certs; <strong>IAM server certificates</strong> are legacy.</p>
    <h2>CloudHSM</h2>
    <p>Single-tenant HSM, FIPS, you control keys at a lower level, some Oracle TDE / custom PKCS#11. More ops, more cost. Only when the stem demands dedicated HSM or CloudHSM by name. Otherwise KMS.</p>
    <div class="callout trap"><strong>EBS and AMIs</strong>Copying an encrypted snapshot to another Region/account needs KMS access in the destination. Unencrypted copy then re-encrypt is the wrong direction if the stem wants to stay encrypted the whole time.</div>
  `,
  traps: [
    "SSE-S3 when the stem requires CMK policies and CloudTrail on Decrypt.",
    "Forgetting kms:Decrypt on the instance role for an encrypted EBS volume.",
    "CloudHSM for a basic ‘encrypt the bucket’ question.",
  ],
  quiz: [
    {
      q: "Security requires S3 objects encrypted with a key the company can disable instantly, with an audit of who decrypted.",
      choices: [
        "SSE-S3",
        "Plaintext bucket",
        "SSE-KMS with a customer managed key",
        "Website hosting",
      ],
      answer: 2,
      explain:
        "CMK disable/schedule-delete kills new decrypts; CloudTrail logs kms:Decrypt.",
    },
    {
      q: "Share an encrypted EBS snapshot with another AWS account so they can launch instances.",
      choices: [
        "Make the snapshot public",
        "Share the snapshot and allow the other account on the KMS key policy",
        "Email the CMK plaintext",
        "Disable encryption first",
      ],
      answer: 1,
      explain:
        "Both the snapshot ACL/share and the CMK grant/policy are required.",
    },
  ],
});

lesson({
  id: "data-protection-compliance",
  order: 13,
  domain: 1,
  minutes: 12,
  title: "Data lifecycle, backups, and compliance evidence",
  summary:
    "Object Lock, AWS Backup, replication, Artifact, and Config rules as evidence.",
  tags: ["backup", "object lock", "config", "artifact", "lifecycle"],
  body: `
    <h2>Classification and access</h2>
    <p>S3 Block Public Access at account + bucket. Bucket policies over ACLs. VPC-only access via endpoint + <code>aws:SourceVpce</code>. Lake Formation for data lakes (column/row permissions) when the stem is analytics + fine-grained.</p>
    <h2>Retention and immutability</h2>
    <ul>
      <li><strong>S3 Lifecycle</strong> — move/expire. Cost lesson will go deep; security cares about not deleting too soon and about legal holds.</li>
      <li><strong>S3 Object Lock</strong> (WORM) — compliance or governance mode, legal hold. “Ransomware, immutable backups, SEC-17a-4” → Object Lock on backup bucket, MFA delete extra.</li>
      <li><strong>Glacier Vault Lock</strong> — similar WORM for vaults.</li>
    </ul>
    <h2>AWS Backup</h2>
    <p>Central backup policies across EBS, RDS, EFS, DynamoDB, FSx, EC2, Organization-wide. Cross-Region / cross-account copies for DR. Prefer this over a pile of custom snapshot Lambda unless the stem is tiny.</p>
    <h2>Replication</h2>
    <p>S3 CRR/SRR with replica encryption (maybe different CMK). RDS/Aurora replicas. DynamoDB Global Tables. Replication is not a substitute for least privilege; it is durability/DR/local reads.</p>
    <h2>Compliance</h2>
    <p><strong>AWS Artifact</strong> — download SOC/PCI reports (AWS’s side of shared responsibility). <strong>Audit Manager</strong> — collect evidence. <strong>Config</strong> — “are all buckets encrypted? public access blocked?” <strong>Macie</strong> — sensitive data. You cannot outsource <em>your</em> app’s HIPAA architecture to Artifact.</p>
  `,
  traps: [
    "Artifact as a product that encrypts your buckets.",
    "Versioning without Object Lock when the stem is WORM/immutable.",
    "Manual snapshots in one account as ‘org-wide backup strategy.’",
  ],
  quiz: [
    {
      q: "Regulators require WORM storage for financial documents in S3 for 7 years.",
      choices: [
        "S3 Standard only",
        "S3 Object Lock in compliance mode with a 7-year retention",
        "EBS snapshots",
        "CloudFront signed cookies",
      ],
      answer: 1,
      explain:
        "Object Lock compliance mode is the WORM control. Snapshots are mutable by an admin who can delete them (unless Backup Vault Lock).",
    },
    {
      q: "An auditor asks for AWS’s SOC 2 report.",
      choices: [
        "AWS Artifact",
        "Amazon Macie",
        "VPC Flow Logs",
        "Personal Health Dashboard",
      ],
      answer: 0,
      explain: "Artifact is the report portal.",
    },
  ],
});
