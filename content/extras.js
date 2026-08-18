(function () {
  const X = (window.SAA.extras = window.SAA.extras || {});
  function add(id, obj) {
    X[id] = obj;
  }

  add("start-here", {
    cues: [
      {
        if: "brand new to AWS",
        then: "Picture first, optional account, labs to use AWS, Exam mode to sit the test",
      },
      {
        if: "empty Using AWS checklist",
        then: "Normal. Tick only what you have clicked in a sandbox.",
      },
    ],
    exam: `<p>This lesson is not exam content. Two finish lines: labs prove you can use AWS; Exam mode proves you can take the written test. Come back to “How the written exam thinks” after the foundation pictures.</p>`,
    job: `<p>You do not need an account today. When you want to click, open a throwaway account (not a company login), then Lab 1 — billing alarm, not root for daily work.</p>`,
  });

  add("exam-mindset", {
    cues: [
      {
        if: "least operational overhead / most operationally efficient",
        then: "Managed or serverless that still meets the other constraints",
      },
      {
        if: "highly available (no Region mentioned)",
        then: "Multi-AZ, not multi-Region",
      },
      { if: "users worldwide + HTTP cacheable", then: "CloudFront" },
      {
        if: "cannot change the application",
        then: "Queue, proxy, migration tool — not a rewrite",
      },
    ],
    exam: `<p>Underline the <em>ask</em> (last sentence) and every constraint. The distractor usually satisfies three of four. Extra services that were not requested are wrong.</p>`,
    job: `<p>At work you get a one-pager with SLAs and a budget, not a multiple-choice. Write the constraints down the same way. Hands-on comes after you have a picture of the design — not as day-one homework.</p>`,
  });

  add("global-infra", {
    cues: [
      {
        if: "survive a data center / AZ failure",
        then: "Multi-AZ in one Region",
      },
      {
        if: "survive a Region / DR / data residency second geography",
        then: "Multi-Region",
      },
      {
        if: "single-digit ms to one metro",
        then: "Local Zones (or Wavelength for 5G)",
      },
      { if: "AWS racks in your DC", then: "Outposts" },
    ],
    exam: `<p>AZ = HA. Region = DR or global latency. Edge = CloudFront/Route 53/Global Accelerator. S3 durability is not the same as “always readable this millisecond.”</p>`,
    job: `<p>Pick a Region for latency to users, compliance, and service availability. Put production subnets in at least two AZs on day one. Don’t “add HA later.”</p>`,
    labId: "lab-vpc",
  });

  add("shared-waf", {
    cues: [
      { if: "who patches EC2 guest OS", then: "You" },
      { if: "who patches RDS engine", then: "AWS (you pick the window)" },
      {
        if: "cap AdministratorAccess in member accounts",
        then: "SCP (not an IAM deny in another account)",
      },
      { if: "root user", then: "MFA, no daily use, no access keys" },
    ],
    exam: `<p>SCPs never grant. They don’t apply to the management account the same way. Artifact is AWS’s reports, not your app’s HIPAA design.</p>`,
    job: `<p>Day 0: lock root, billing alarm, no long-lived keys, decide account layout (prod / nonprod / log-archive). You will hate fixing this after the company has one shared account.</p>`,
    labId: "lab-account",
  });

  add("vpc-mental-model", {
    cues: [
      {
        if: "public vs private subnet",
        then: "Route to IGW vs NAT/none — not a checkbox named ‘private’",
      },
      { if: "RDS only from app", then: "SG-to-SG, not 0.0.0.0/0" },
      { if: "three VPCs need full mesh + on-prem", then: "Transit Gateway" },
      {
        if: "S3 from private subnet, cut NAT cost",
        then: "S3 gateway endpoint",
      },
    ],
    exam: `<p>Peering is not transitive. NACLs are stateless. Security groups are the daily firewall. NAT is AZ-scoped.</p>`,
    job: `<p>Draw the VPC before you launch anything: CIDR big enough, two AZs, public for load balancers only, private for app and data, endpoints for S3/ECR. This is lab 2.</p>`,
    labId: "lab-vpc",
  });

  add("compute-storage-db-map", {
    cues: [
      { if: "shared Linux folder across two buildings", then: "EFS" },
      { if: "SMB / Windows / AD", then: "FSx for Windows" },
      { if: "SQL joins / existing MySQL or Postgres", then: "RDS or Aurora" },
      { if: "key-value, ms, huge scale", then: "DynamoDB" },
    ],
    exam: `<p>S3 is a bucket, not a disk. EBS is one disk in one Availability Zone. DynamoDB is not SQL joins. A warehouse (Redshift) is not a busy website database.</p>`,
    job: `<p>Start from how you look data up, not from a service you like. If you cannot name the key or the join, you cannot pick the database.</p>`,
  });

  add("how-you-finish", {
    cues: [
      { if: "prove you can use AWS", then: "Labs 1–10 + Using AWS checklist" },
      {
        if: "prove you can take the test",
        then: "Exam mode → trainer → timed 65",
      },
      {
        if: "one year of design",
        then: "Who the questions are written for, not a gate",
      },
    ],
    exam: `<p>The exam is still written design questions. Labs do not appear on the test engine. Do them anyway if you want to use AWS on Monday.</p>`,
    job: `<p>Day one at work looks like the labs, not like a multiple-choice stem. Keep both tracks.</p>`,
  });

  add("iam-core", {
    cues: [
      {
        if: "EC2/Lambda/ECS calling AWS APIs",
        then: "Role (instance profile / task / execution role) — never user keys on disk",
      },
      {
        if: "cross-account S3",
        then: "Identity policy in caller AND bucket policy in owner",
      },
      {
        if: "junior admin must not mint super-admin roles",
        then: "Permission boundary",
      },
      { if: "explicit Deny vs Allow", then: "Deny wins" },
    ],
    exam: `<p>Identity policy vs resource policy vs SCP vs boundary: only the first two grant. Cross-account needs both sides. KMS is a resource policy too.</p>`,
    job: `<p>Humans: Identity Center. Workloads: roles. Review unused access. Never put AdministratorAccess on an instance role “to unblock the app.”</p>`,
    labId: "lab-iam",
  });

  add("iam-roles-federation", {
    cues: [
      {
        if: "employees + many accounts + Console",
        then: "IAM Identity Center",
      },
      {
        if: "mobile/game customers, millions",
        then: "Cognito (identity pool for AWS creds)",
      },
      {
        if: "third-party vendor into your account",
        then: "Cross-account role + external ID",
      },
      { if: "SSRF stole instance role", then: "IMDSv2 + shrink the role" },
    ],
    exam: `<p>Trust policy = who may assume. Permissions = what they can do after. Don’t swap Cognito and Identity Center.</p>`,
    job: `<p>Workforce IdP (Google/Okta/AD) → Identity Center permission sets. App users → Cognito. Break-glass role with MFA and logging, tested twice a year.</p>`,
    labId: "lab-iam",
  });

  add("organizations-governance", {
    cues: [
      {
        if: "new multi-account landing zone, least ops",
        then: "Control Tower",
      },
      {
        if: "cannot disable CloudTrail even with AdministratorAccess",
        then: "SCP on the OU",
      },
      {
        if: "app accounts launch into network team’s VPC",
        then: "RAM shared subnets",
      },
      {
        if: "who called which API",
        then: "CloudTrail (not Config, not CloudWatch)",
      },
    ],
    exam: `<p>Config = inventory/compliance. CloudTrail = API audit. CloudWatch = metrics/logs/alarms. Log archive account must not be writable by builders.</p>`,
    job: `<p>OUs: Security (log-archive, audit), Sandbox, Workloads/Prod, Suspended. Org trail to locked bucket. Tag policy from day one or finance will never forgive you.</p>`,
    labId: "lab-account",
  });

  add("vpc-security", {
    cues: [
      { if: "shell without inbound 22", then: "SSM Session Manager" },
      {
        if: "Gbps consistent hybrid + encrypted backup",
        then: "Direct Connect + VPN",
      },
      { if: "overlap CIDR, consume a service", then: "PrivateLink" },
      {
        if: "encrypt Direct Connect",
        then: "VPN overlay or MACsec — DX bits are not magically confidential",
      },
    ],
    exam: `<p>Client VPN = humans. Site-to-Site = offices. You cannot VPC-peer to on-prem. One NAT is not HA.</p>`,
    job: `<p>No public RDS. No SSH from the internet. SSM + endpoints. If you still need a bastion, SG 22 only from that bastion’s SG.</p>`,
    labId: "lab-vpc",
  });

  add("app-edge-security", {
    cues: [
      {
        if: "SQLi / XSS / HTTP flood",
        then: "WAF on ALB/CloudFront/API Gateway",
      },
      {
        if: "volumetric DDoS + DRT + cost protection",
        then: "Shield Advanced",
      },
      { if: "crypto mining / weird API calls", then: "GuardDuty" },
      { if: "CVE on EC2/ECR/Lambda", then: "Inspector" },
      { if: "PII in S3", then: "Macie" },
      { if: "one scoreboard / CIS", then: "Security Hub" },
      { if: "org-wide WAF policy", then: "Firewall Manager" },
    ],
    exam: `<p>GuardDuty does not block packets. WAF is not on NLB. Macie is not a general EBS scanner on this exam.</p>`,
    job: `<p>Turn on GuardDuty, Inspector, Security Hub org-wide. WAF with AWS managed rule groups on every public HTTP entry. Alert EventBridge → Slack/Ticket. Don’t collect findings nobody triages.</p>`,
  });

  add("secrets-app-config", {
    cues: [
      { if: "rotate RDS/Aurora password, least code", then: "Secrets Manager" },
      {
        if: "cheap hierarchical config, maybe a secret",
        then: "SSM Parameter Store (SecureString)",
      },
      {
        if: "TLS on ALB/CloudFront auto-renew",
        then: "ACM (CloudFront cert in us-east-1)",
      },
      {
        if: "TLS on the EC2 itself with an ACM public cert",
        then: "You cannot export public ACM — use imported cert or Private CA",
      },
    ],
    exam: `<p>Never AMI, git, or Lambda env plaintext for DB passwords.</p>`,
    job: `<p>One secret per credential, rotation on, app reads at runtime (ECS secrets / Lambda extension). Parameter Store for non-secret config flags.</p>`,
  });

  add("kms-encryption", {
    cues: [
      {
        if: "customer-managed, revoke instantly, audit Decrypt",
        then: "CMK + CloudTrail",
      },
      {
        if: "share encrypted snapshot/AMI",
        then: "Share the snapshot AND the key policy/grants",
      },
      { if: "S3 simple encryption, no key policy needed", then: "SSE-S3" },
      { if: "dedicated HSM / FIPS single-tenant", then: "CloudHSM (rare)" },
    ],
    exam: `<p>Encrypted EBS needs kms:Decrypt on the instance role. Copying encrypted snapshots across accounts is a KMS problem as much as an EBS problem.</p>`,
    job: `<p>Default encryption on EBS and S3 with a CMK per environment. Separate key admins from key users. Bucket keys to cut KMS cost on hot buckets.</p>`,
  });

  add("data-protection-compliance", {
    cues: [
      {
        if: "WORM / ransomware immutable / 7-year legal",
        then: "S3 Object Lock compliance mode (or Backup Vault Lock)",
      },
      { if: "org-wide backup policy", then: "AWS Backup" },
      { if: "auditor wants AWS SOC 2", then: "Artifact" },
      { if: "are all buckets encrypted?", then: "AWS Config rule" },
    ],
    exam: `<p>Versioning alone is not WORM. Artifact does not encrypt your buckets.</p>`,
    job: `<p>Backup plans by tag (prod-daily, prod-hourly). Test a restore, not just a snapshot. Object Lock on the backup vault/bucket.</p>`,
    labId: "lab-backup",
  });

  add("elb-autoscaling", {
    cues: [
      { if: "HTTP path/host + WAF", then: "ALB" },
      { if: "static IP / TCP / UDP / extreme PPS / PrivateLink", then: "NLB" },
      { if: "inline firewall appliances", then: "GWLB" },
      {
        if: "keep CPU at X%, replace bad nodes, 2 AZs",
        then: "ASG target tracking + ELB health checks",
      },
    ],
    exam: `<p>Sticky sessions are a crutch. Shared session store is the architecture. Classic LB is legacy.</p>`,
    job: `<p>Launch templates, instance refresh for new AMIs, mixed On-Demand + Spot for stateless. Health check the <em>app</em> path, not just TCP.</p>`,
    labId: "lab-web",
  });

  add("decoupling", {
    cues: [
      { if: "buffer spikes, competing consumers", then: "SQS Standard" },
      { if: "order per customer + exactly-once", then: "SQS FIFO + group ID" },
      {
        if: "fan-out to many teams with retry",
        then: "SNS → SQS (or EventBridge → SQS)",
      },
      {
        if: "SaaS events, content filter, archive/replay",
        then: "EventBridge",
      },
      { if: "JMS/AMQP, cannot change app", then: "Amazon MQ" },
      { if: "orchestrate waits/approvals/EMR", then: "Step Functions" },
    ],
    exam: `<p>SNS HTTP can drop if the endpoint is down unless you subscribe SQS. Don’t use RDS as a queue.</p>`,
    job: `<p>Every inbound webhook and every “later” job goes on a queue with a DLQ you actually look at. Visibility timeout ≥ processing time.</p>`,
    labId: "lab-sqs",
  });

  add("serverless-containers", {
    cues: [
      { if: "event, seconds, idle then spike", then: "Lambda" },
      { if: "container, >15 min, no AMIs", then: "Fargate" },
      { if: "Helm / Kubernetes API required", then: "EKS" },
      { if: "GPU / dense 24/7 packing / custom host", then: "EC2 launch type" },
    ],
    exam: `<p>Lambda max 15 minutes. Don’t store uploads on the container disk. RDS Proxy when Lambda meets RDS.</p>`,
    job: `<p>Default new internal APIs to Lambda or Fargate until you have a reason not to. Put state in DynamoDB/S3/RDS. CI builds images; you don’t SSH to patch.</p>`,
  });

  add("ha-patterns", {
    cues: [
      {
        if: "SQL survive AZ, same endpoint",
        then: "RDS Multi-AZ / Aurora instances in 2+ AZs — not a read replica",
      },
      {
        if: "Lambda + RDS connection storms / slow failover",
        then: "RDS Proxy",
      },
      {
        if: "DNS failover two Regions",
        then: "Route 53 health checks + failover or latency policy",
      },
      {
        if: "DR Region throttles RunInstances",
        then: "Raise quotas in standby before the disaster",
      },
    ],
    exam: `<p>S3/Dynamo/SQS/Lambda control planes are already multi-AZ. EC2, NAT, EBS, RDS primaries are not unless you design it.</p>`,
    job: `<p>Game-day: pull an AZ (or simulate), watch the ALB and RDS failover, fix the single NAT you forgot. Quotas in DR are part of the design.</p>`,
    labId: "lab-web",
  });

  add("disaster-recovery", {
    cues: [
      {
        if: "RPO 24h / RTO 8h / cheapest second Region",
        then: "Backup and restore",
      },
      { if: "RPO &lt;1s SQL two Regions", then: "Aurora Global Database" },
      { if: "multi-active key-value writers", then: "DynamoDB Global Tables" },
      {
        if: "RTO two minutes HTTP + two Regions",
        then: "Warm or active-active, not nightly backup",
      },
    ],
    exam: `<p>Multi-AZ is not DR. You cannot have RPO 0 and cheapest backups. Match the numbers in the stem.</p>`,
    job: `<p>Write RPO/RTO on the wiki. Pick a strategy. Restore into a clean account once a quarter. Untested DR is a story.</p>`,
    labId: "lab-backup",
  });

  add("s3-storage", {
    cues: [
      {
        if: "global large uploads into one Regional bucket",
        then: "Transfer Acceleration",
      },
      { if: "HTTPS download, bucket stays private", then: "CloudFront + OAC" },
      {
        if: "time-boxed object for one user",
        then: "Presigned URL (or CloudFront signed)",
      },
      {
        if: "unknown access pattern, min storage $",
        then: "Intelligent-Tiering",
      },
    ],
    exam: `<p>S3 is strongly consistent. It is still not POSIX. Public buckets are not “simple hosting” when CloudFront+OAC exists.</p>`,
    job: `<p>Block Public Access on. Versioning on important buckets. Lifecycle or INT. Access via endpoints from private subnets.</p>`,
    labId: "lab-s3cf",
  });

  add("block-file-storage", {
    cues: [
      { if: "boot volume / most EC2 disks", then: "gp3" },
      { if: "SAN-like IOPS / Multi-Attach same AZ", then: "io2 Block Express" },
      { if: "scratch, can die with the instance", then: "Instance store" },
      { if: "HPC + S3 repository", then: "FSx for Lustre" },
      {
        if: "on-prem NFS must keep working, data in S3",
        then: "Storage Gateway File Gateway",
      },
    ],
    exam: `<p>EFS One Zone is not prod HA files. EBS lives in one AZ; snapshot to move.</p>`,
    job: `<p>gp3 by default. Snapshot via AWS Backup. Don’t run databases on instance store unless you designed replication yourself.</p>`,
  });

  add("ec2-performance", {
    cues: [
      {
        if: "MPI / lowest latency one AZ",
        then: "Cluster placement group + EFA",
      },
      { if: "fit a 500 GB working set in RAM", then: "Memory-optimized (R/X)" },
      { if: "always-hot CPU", then: "Not T-family (credits die)" },
      { if: "batch jobs, Spot-friendly, no cluster admin", then: "AWS Batch" },
    ],
    exam: `<p>Cluster PG is single-AZ. Right-size before you buy a 3-year plan. Graviton when the stack allows.</p>`,
    job: `<p>Install CloudWatch agent for memory. Compute Optimizer monthly. Mixed instance ASG so you are not hostage to one family.</p>`,
  });

  add("lambda-container-perf", {
    cues: [
      {
        if: "cold starts, user-facing, cost OK",
        then: "Provisioned concurrency",
      },
      {
        if: "protect RDS from a Lambda storm",
        then: "Reserved concurrency + RDS Proxy",
      },
      { if: "CPU-bound Lambda", then: "Raise memory (CPU scales with it)" },
    ],
    exam: `<p>Provisioned concurrency on a nightly batch is waste. 10 GB memory on every function is waste.</p>`,
    job: `<p>Power-tune memory. Structured logs. Destinations/DLQ on failure. Alarms on errors and duration, not just “it deployed.”</p>`,
  });

  add("rds-aurora", {
    cues: [
      {
        if: "MySQL/Postgres HA in one Region",
        then: "Multi-AZ / Aurora with instances in 2 AZs",
      },
      {
        if: "read-heavy, stay on MySQL protocol",
        then: "Read replicas / Aurora readers",
      },
      {
        if: "spiky SQL, don’t pick instance size",
        then: "Aurora Serverless v2",
      },
      { if: "Oracle → Aurora", then: "DMS + SCT (heterogeneous)" },
    ],
    exam: `<p>Replica ≠ Multi-AZ. Redshift ≠ OLTP. Public RDS is a finding.</p>`,
    job: `<p>Private subnets, SG from app only, backups, Performance Insights, parameter groups in git (or IaC). Never click-ops a prod database you cannot rebuild.</p>`,
    labId: "lab-rds",
  });

  add("dynamodb-nosql", {
    cues: [
      { if: "known key, ms, serverless scale", then: "DynamoDB" },
      { if: "hot key, microsecond, Dynamo", then: "DAX" },
      { if: "graph / friends-of-friends", then: "Neptune" },
      { if: "Mongo API", then: "DocumentDB" },
      { if: "Cassandra CQL", then: "Keyspaces" },
    ],
    exam: `<p>If the stem is joins and ad-hoc SQL, Dynamo is the trap. Scans at scale are a cost and latency bug.</p>`,
    job: `<p>Design access patterns first, then keys and GSIs. On-demand until traffic is known. Streams to keep search/analytics in sync.</p>`,
  });

  add("caching", {
    cues: [
      { if: "HTTP at the edge", then: "CloudFront" },
      {
        if: "repeated SQL/API results in-VPC",
        then: "ElastiCache Redis (default) or Memcached",
      },
      { if: "Dynamo microsecond", then: "DAX" },
      {
        if: "durable Redis with Multi-AZ",
        then: "MemoryDB or Redis with persistence — ElastiCache is still a cache",
      },
    ],
    exam: `<p>CloudFront does not sit on port 3306. Don’t treat cache as source of truth unless MemoryDB/Dynamo is the store.</p>`,
    job: `<p>Cache keys must include everything that changes the response (auth, locale). Prefer versioned asset names over blanket invalidations.</p>`,
  });

  add("network-performance", {
    cues: [
      {
        if: "HTTP cache / static / signed URLs / WAF at edge",
        then: "CloudFront",
      },
      {
        if: "UDP / static anycast IP / non-HTTP backbone",
        then: "Global Accelerator",
      },
      { if: "steady many-Gbps to AWS", then: "Direct Connect" },
      {
        if: "hybrid DNS",
        then: "Route 53 Resolver inbound/outbound endpoints",
      },
    ],
    exam: `<p>Don’t undersize VPC CIDR. Alias records to ALB/CloudFront. Public VIF can reach S3; private VIF reaches VPC.</p>`,
    job: `<p>Plan IP space with EKS/VPC endpoints in mind. One public/private pair per AZ. Document which TGW attachments exist.</p>`,
  });

  add("data-pipelines", {
    cues: [
      {
        if: "custom real-time, multiple consumers, replay",
        then: "Kinesis Data Streams",
      },
      { if: "just land it in S3/OpenSearch/Redshift", then: "Firehose" },
      { if: "existing Kafka producers", then: "MSK" },
      {
        if: "SQL on S3, no cluster",
        then: "Athena + Glue catalog (Parquet + partitions)",
      },
      { if: "warehouse + BI", then: "Redshift (Spectrum to S3)" },
    ],
    exam: `<p>SQS is not a replayable 24h log. RDS is not a data lake. Athena cost is scan cost.</p>`,
    job: `<p>Lake pattern: land raw in S3, catalog, transform to Parquet, govern with Lake Formation if many analysts. Don’t copy every log into RDS.</p>`,
  });

  add("cost-visibility", {
    cues: [
      { if: "Slack when forecast exceeds $X", then: "Budgets → SNS" },
      { if: "Athena on every billing line", then: "CUR + tags" },
      { if: "idle LBs, unattached EIPs", then: "Trusted Advisor cost checks" },
      { if: "right-size EC2/EBS/Lambda", then: "Compute Optimizer" },
    ],
    exam: `<p>CloudTrail is not a cost tool. Explorer = look. Budgets = alarm. CUR = export.</p>`,
    job: `<p>Mandatory tags: team, env, service. Weekly 15-minute cost review. Nonprod off at night. This is lab 10.</p>`,
    labId: "lab-cost",
  });

  add("storage-cost", {
    cues: [
      { if: "unknown / changing S3 access", then: "Intelligent-Tiering" },
      { if: "7 years, 12h restore OK, cheapest", then: "Glacier Deep Archive" },
      { if: "frequent Athena on yesterday’s data", then: "Not Deep Archive" },
      { if: "200 TB in two weeks, 100 Mbps WAN", then: "Snow Family" },
    ],
    exam: `<p>IA and Glacier have retrieval fees. One Zone-IA is not for irreplaceable backups. Compact tiny files.</p>`,
    job: `<p>Lifecycle by prefix. Expire incomplete multipart uploads. Don’t keep “just in case” snapshots forever.</p>`,
  });

  add("compute-cost", {
    cues: [
      { if: "interruptible workers", then: "Spot (+ diversified / mixed ASG)" },
      {
        if: "steady EC2+Fargate+Lambda, families may change",
        then: "Compute Savings Plans",
      },
      {
        if: "known m7g 24/7 three years, no change",
        then: "EC2 Instance SP or Standard RI can discount more",
      },
      { if: "ARM OK, same architecture", then: "Graviton" },
    ],
    exam: `<p>Spot on an unreplicated RPO-0 database is wrong. Right-size before a 3-year commit.</p>`,
    job: `<p>On-Demand base for prod stateful. Spot for batch. SP on the baseline after a month of data. Stop nonprod.</p>`,
  });

  add("database-cost", {
    cues: [
      {
        if: "Postgres 9–5, idle nights",
        then: "Aurora Serverless v2 or stop/start RDS",
      },
      {
        if: "30-minute daily warehouse",
        then: "Pause Redshift or Redshift Serverless / Athena",
      },
      {
        if: "Dynamo flat 3-year high QPS",
        then: "Provisioned + reserved may beat on-demand",
      },
    ],
    exam: `<p>Global Tables in four Regions is not a cost answer for an internal 9–5 app.</p>`,
    job: `<p>Dev databases should not look like prod. Snapshot and kill unused RDS. Watch storage that only grows.</p>`,
    labId: "lab-rds",
  });

  add("network-cost", {
    cues: [
      { if: "TBs/day S3 via NAT", then: "S3 gateway endpoint" },
      { if: "HA outbound internet, cost secondary", then: "NAT per AZ" },
      {
        if: "interface endpoints for every service unused",
        then: "Hourly ENI waste — keep what you use",
      },
      {
        if: "HA still required, chatty microservices",
        then: "Don’t delete the second AZ; cut chatter / same-AZ where safe",
      },
    ],
    exam: `<p>Ingress is cheap. Egress and NAT GB are not. Security vs cost: the underlined word wins.</p>`,
    job: `<p>After a week of Flow Logs or Cost Explorer “data transfer,” add endpoints and stop NAT-to-AWS-API traffic.</p>`,
    labId: "lab-vpc",
  });

  add("decision-trees", {
    cues: [
      { if: "file + Linux + multi-AZ", then: "EFS" },
      { if: "file + Windows", then: "FSx Windows" },
      { if: "HTTP objects", then: "S3" },
      { if: "disk on one EC2", then: "EBS" },
    ],
    exam: `<p>Walk storage, database, compute, decouple, global, hybrid, security keyword maps until they are automatic.</p>`,
    job: `<p>Keep a living ADR (architecture decision record) in the repo. The exam is a timed ADR.</p>`,
  });

  add("exam-day", {
    cues: [
      { if: "two working answers + minimize ops", then: "More managed" },
      {
        if: "two working answers + most cost-effective",
        then: "Still must meet SLA, then cheaper",
      },
      { if: "choose TWO", then: "Exactly two" },
    ],
    exam: `<p>~2 minutes per item. Flag and move. Never blank. Security is 30% — don’t skip IAM/VPC.</p>`,
    job: `<p>Same method in design reviews: constraints first, then kill options, then pick managed/cheaper among survivors.</p>`,
  });
  add("observability", {
    cues: [
      { if: "CPU / 5xx / alarm / dashboard", then: "CloudWatch" },
      { if: "who called the API", then: "CloudTrail" },
      { if: "is the bucket encrypted / public", then: "Config" },
      { if: "which microservice is slow", then: "X-Ray" },
      { if: "guest memory/disk", then: "CloudWatch agent" },
    ],
    exam: `<p>Do not swap these four names. Recover instance action ≠ Multi-AZ design.</p>`,
    job: `<p>Every production service gets: logs, one latency metric, one error alarm to a human. Then traces on the money path.</p>`,
    labId: "lab-watch",
  });
  add("cloudformation", {
    cues: [
      { if: "same stack in three envs", then: "Template + parameters" },
      { if: "deploy to every org account", then: "StackSets / Control Tower" },
    ],
    exam: `<p>IaC is the ‘least ops to copy architecture’ answer. CDK syntax is out of scope; CloudFormation concepts are in.</p>`,
    job: `<p>If it is not in a template, it does not exist. Click-ops is a lab, not prod.</p>`,
    labId: "lab-vpc",
  });
  add("systems-manager", {
    cues: [
      { if: "no inbound SSH", then: "Session Manager" },
      { if: "patch EC2 + on-prem together", then: "Patch Manager hybrid" },
      {
        if: "private, no NAT, still SSM",
        then: "ssm + ssmmessages + ec2messages endpoints",
      },
    ],
    exam: `<p>Bastion only if they still demand SSH. SSM is the default least-ops admin path.</p>`,
    job: `<p>Bake AMIs, patch via SSM or pipeline, never a Friday SSH party in prod.</p>`,
    labId: "lab-iam",
  });
  add("route53-deep", {
    cues: [
      { if: "apex → ALB/CloudFront", then: "Alias" },
      { if: "active-passive + health check", then: "Failover policy" },
      { if: "nearest Region, data replicated", then: "Latency policy" },
      { if: "data residency by country", then: "Geolocation" },
      { if: "canary 10%", then: "Weighted" },
    ],
    exam: `<p>Latency without replicated data sends users to an empty Region. CNAME at apex is wrong.</p>`,
    job: `<p>Health checks on the real URL, TTL conscious during failover, private zones for internal names.</p>`,
  });
  add("migration-data", {
    cues: [
      { if: "VMs lift-and-shift", then: "MGN" },
      { if: "database CDC / hetero", then: "DMS (+ SCT)" },
      { if: "file copy job NFS/SMB", then: "DataSync" },
      { if: "keep NFS/SMB/iSCSI/tape", then: "Storage Gateway" },
      { if: "SFTP partners", then: "Transfer Family" },
      { if: "WAN too small", then: "Snow" },
    ],
    exam: `<p>Don’t pick Snow for 20 GB. Don’t pick Gateway when they only needed a one-time copy.</p>`,
    job: `<p>Write the cutover runbook: freeze, final sync, change DNS, watch errors, rollback DNS.</p>`,
  });
  add("apigw-appsync", {
    cues: [
      { if: "GraphQL / subscriptions", then: "AppSync" },
      {
        if: "API keys, usage plans, AWS integration to SQS",
        then: "API Gateway REST",
      },
      { if: "simple JWT Lambda API", then: "HTTP API" },
      {
        if: "VPC website paths + WAF",
        then: "ALB (± CloudFront), not always API GW",
      },
    ],
    exam: `<p>Throttle at the door. Cognito for customers. Private APIs when it must not hit the internet.</p>`,
    job: `<p>Treat the API as a product: auth, limits, logging, versioning. Don’t expose SQS publicly.</p>`,
  });
  add("analytics-extras", {
    cues: [
      { if: "dashboards, least servers", then: "QuickSight" },
      { if: "fuzzy search / ELK", then: "OpenSearch" },
      { if: "column/row lake perms", then: "Lake Formation" },
      { if: "warehouse", then: "Redshift" },
    ],
    exam: `<p>RDS is not a petabyte lake. OpenSearch is not a session store.</p>`,
    job: `<p>Lake: S3 → catalog → Parquet → Athena/Redshift Spectrum → QuickSight. Govern before 40 people have copies.</p>`,
  });
  add("directory-identity-hybrid", {
    cues: [
      {
        if: "Windows/Kerberos/FSx AD in AWS",
        then: "Managed Microsoft AD (± trust)",
      },
      { if: "don’t store directory in AWS, proxy to HQ", then: "AD Connector" },
      { if: "AWS Console workforce", then: "Identity Center" },
      { if: "mobile customers", then: "Cognito" },
    ],
    exam: `<p>Three identity products; the stem tells you which population (employees on AWS, Windows machines, app users).</p>`,
    job: `<p>Don’t invent a fourth identity silo. Map: humans-to-AWS, machines-to-AD, customers-to-Cognito.</p>`,
  });
  add("beanstalk-batch-ml", {
    cues: [
      { if: "upload code, AWS runs ASG/ALB", then: "Elastic Beanstalk" },
      { if: "thousands of long jobs, Spot", then: "Batch" },
      {
        if: "faces/OCR/speech/translate without training",
        then: "Rekognition/Textract/Polly/Translate/Comprehend",
      },
      { if: "custom model train/deploy", then: "SageMaker" },
    ],
    exam: `<p>Don’t build a GPU cluster for ‘is there a face.’ Don’t use Lambda for 2-hour jobs.</p>`,
    job: `<p>Purpose-built first. SageMaker when you have a real model. Batch for the overnight pile.</p>`,
  });
  add("flowlogs-nfw-ipv6", {
    cues: [
      { if: "ACCEPT/REJECT who scanned us", then: "VPC Flow Logs" },
      {
        if: "IDS/IPS inspection VPC",
        then: "Network Firewall / GWLB appliances",
      },
      { if: "IPv6 outbound only", then: "Egress-only IGW" },
    ],
    exam: `<p>Flow Logs are not packet capture. NAT GW is not IPv6 egress.</p>`,
    job: `<p>Send Flow Logs to S3 and Athena for incidents. Don’t turn on Network Firewall for a two-SG app ‘because enterprise.’</p>`,
    labId: "lab-vpc",
  });
  add("practitioner-day", {
    cues: [
      {
        if: "full Trusted Advisor cost/security",
        then: "Business or Enterprise Support",
      },
      { if: "which account am I in", then: "sts get-caller-identity" },
    ],
    exam: `<p>Billing alarms and root MFA still show up. Support plan is a real item.</p>`,
    job: `<p>This lesson is the job: identity, tags, CLI hygiene, who owns the VPC. Do lab 1 before any fancy architecture.</p>`,
    labId: "lab-account",
  });
  add("operate-cadence", {
    cues: [
      {
        if: "Well-Architected output",
        then: "A dated improvement plan, not a PDF trophy",
      },
      { if: "backups", then: "Restore test, not only a snapshot job" },
    ],
    exam: `<p>Operational excellence is a pillar. Untested DR and silent alarms fail the job even if they pass a lucky exam.</p>`,
    job: `<p>Weekly: cost, patch/AMI, alarm noise, backup restore sample. That cadence is what ‘practitioner’ means.</p>`,
    labId: "lab-backup",
  });
})();
