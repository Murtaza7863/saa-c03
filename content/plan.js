/* Lesson-plan overlay: plain titles, “you can,” skim flags, week phases.
   Patches lessons after they are registered. Official domain weights stay on the path. */

(function () {
  const L = window.SAA.lessons || [];
  function patch(id, o) {
    const l = L.find((x) => x.id === id);
    if (!l) return;
    if (o.title) l.title = o.title;
    if (o.summary) l.summary = o.summary;
    if (o.youCan) l.youCan = o.youCan;
    if (o.already) l.already = o.already;
    if (o.skim) l.skim = true;
  }

  window.SAA.phases = [
    {
      id: "pictures",
      week: "Week 1",
      name: "Pictures of AWS",
      blurb:
        "What it is, where stuff lives, the website, optional account. No exam score yet.",
      use: "Optional: throwaway account + Lab 1 (billing alarm).",
      ids: [
        "start-here",
        "global-infra",
        "use-aws",
        "open-account",
        "shared-waf",
        "vpc-mental-model",
        "compute-storage-db-map",
      ],
    },
    {
      id: "fork",
      week: "Week 1 end",
      name: "Two finish lines",
      blurb:
        "How you will prove you can use AWS, and how the written test is built. Phone book — search, don’t recite.",
      use: "If you have an account, finish Lab 1 before you launch a computer.",
      ids: ["how-you-finish", "exam-mindset", "in-scope-map"],
    },
    {
      id: "secure",
      week: "Weeks 2–3",
      name: "Lock the door",
      blurb:
        "Who can do what, many accounts, doors on the network, encryption. 30% of the exam.",
      use: "Labs 2–3 (VPC, EC2 role → S3). Lab 4 (private files + CloudFront) after the secrets/S3 lessons.",
      ids: [
        "iam-core",
        "iam-roles-federation",
        "organizations-governance",
        "vpc-security",
        "app-edge-security",
        "secrets-app-config",
        "kms-encryption",
        "data-protection-compliance",
        "systems-manager",
        "directory-identity-hybrid",
        "flowlogs-nfw-ipv6",
      ],
    },
    {
      id: "resilient",
      week: "Week 4",
      name: "Stay up",
      blurb:
        "Traffic cop, extra computers, waiting lines, two buildings, disaster in another city. 26%.",
      use: "Labs 5–7 (website + load balancer, private database, queue).",
      ids: [
        "elb-autoscaling",
        "decoupling",
        "serverless-containers",
        "ha-patterns",
        "disaster-recovery",
        "observability",
        "cloudformation",
        "apigw-appsync",
      ],
    },
    {
      id: "perform",
      week: "Week 5",
      name: "The right box",
      blurb:
        "The right disk, computer, database, and network. Skim the lookup lessons; search when a question names the tool. 24%.",
      use: "Lab 8 (alarm). Revisit Lab 4 if S3 + CloudFront is still fuzzy.",
      ids: [
        "s3-storage",
        "block-file-storage",
        "ec2-performance",
        "lambda-container-perf",
        "rds-aurora",
        "dynamodb-nosql",
        "caching",
        "network-performance",
        "route53-deep",
        "data-pipelines",
        "migration-data",
        "analytics-extras",
        "beanstalk-batch-ml",
      ],
    },
    {
      id: "cost",
      week: "Week 6",
      name: "The bill",
      blurb:
        "See spend first, then cheaper disks, computers, databases, and the NAT surprise. 20%.",
      use: "Labs 9–10 (backup restore, read the bill).",
      ids: [
        "cost-visibility",
        "storage-cost",
        "compute-cost",
        "database-cost",
        "network-cost",
      ],
    },
    {
      id: "examday",
      week: "Then",
      name: "Sit the exam",
      blurb:
        "Finish line B. Decision trees, look-alike pairs, 130 minutes. Switch to Exam mode for the trainer and a timed 65.",
      use: "Do not skip labs to ‘save time for questions’ if you also want to use AWS on Monday.",
      ids: ["decision-trees", "high-miss", "exam-day"],
    },
    {
      id: "operate",
      week: "Ongoing",
      name: "Operate (the job)",
      blurb:
        "Finish line A around the diagram: how people actually work, patch, backup drills, cost cadence. Read after a few labs — not only after you pass.",
      use: "Using AWS checklist should be mostly ticked.",
      ids: ["practitioner-day", "operate-cadence"],
    },
  ];

  patch("in-scope-map", { skim: true });

  patch("iam-core", {
    already: [
      "AWS rents computers in Regions. IAM is global. Root is the signup email — not daily work.",
    ],
  });

  patch("iam-roles-federation", {
    title: "Temporary keys (roles, employees, apps)",
    summary:
      "A computer or a person from elsewhere borrows a short-lived key. Not a password file on disk.",
    already: [
      "IAM is who can do what. Roles are the default ‘who’ for computers.",
    ],
    youCan: [
      "Draw trust (who may put the role on) vs permissions (what they can do after).",
      "Pick Identity Center for employees, Cognito for app/game users, a role + external ID for a vendor.",
      "Say why a public website should not wear an all-powerful role.",
    ],
  });

  patch("organizations-governance", {
    title: "Many accounts, one company",
    summary:
      "A leak in ‘experiments’ should not delete production. Guardrails, a log account, sharing a network.",
    youCan: [
      "Say why companies use many accounts (blast radius and bills), not one shared playground.",
      "Treat a Service Control Policy as a ceiling that never grants.",
      "Put the audit log in an account builders cannot empty.",
    ],
  });

  patch("vpc-security", {
    title: "Doors on the private network",
    summary:
      "Public load balancer, private app and database, security groups, and a private road to S3 so you don’t pay NAT.",
    already: [
      "You can draw Internet → gateway → public load balancer → private app → private database.",
    ],
    youCan: [
      "Put the database in private subnets with no public IP.",
      "Prefer Session Manager over opening port 22 to the world.",
      "Use a gateway endpoint for S3 from private computers (cheaper than NAT for that traffic).",
    ],
  });

  patch("app-edge-security", {
    title: "Attacks from the internet",
    summary:
      "HTTP abuse (WAF), flooding (Shield), ‘something weird in the account’ (GuardDuty), secret files in S3 (Macie).",
    youCan: [
      "Pick WAF for malicious HTTP, not a security group (groups don’t read URLs).",
      "Pick GuardDuty for odd API/network findings, Inspector for software holes on computers, Macie for sensitive data in buckets.",
      "Know Shield Standard is on; Shield Advanced is the paid extra.",
    ],
  });

  patch("secrets-app-config", {
    title: "Passwords the app should not keep",
    summary:
      "Secrets Manager vs Parameter Store, certificates, never bake keys into a machine image.",
    youCan: [
      "Put database passwords in Secrets Manager (or Parameter Store SecureString), not in the AMI.",
      "Let a role fetch the secret — don’t paste it into environment variables in git.",
      "Use ACM for public HTTPS certificates on load balancers and CloudFront.",
    ],
  });

  patch("kms-encryption", {
    title: "Locks on the data (KMS)",
    summary:
      "Who may decrypt, customer-managed vs AWS-managed keys, and encrypt on the wire.",
    youCan: [
      "Say encryption at rest (disk/bucket) vs in transit (TLS on the wire).",
      "Know a customer-managed key has a key policy — another account needs that too.",
      "Default to AWS-managed when the story does not ask you to own the key.",
    ],
  });

  patch("data-protection-compliance", {
    title: "Keep, prove, restore",
    summary:
      "Backups you have tested, Object Lock, and AWS’s own audit reports (Artifact) — not ‘we use AWS so we are compliant.’",
    youCan: [
      "Pick AWS Backup for a central backup plan you can restore-test.",
      "Pick Object Lock / Vault Lock when they must not be able to delete backups.",
      "Pick Artifact for AWS’s compliance reports, Config for ‘is my account still configured right.’",
    ],
  });

  patch("systems-manager", {
    title: "Fix computers without SSH",
    summary:
      "Session Manager instead of port 22, patch a fleet, store config. Same tools the exam uses for ‘least open ports.’",
    youCan: [
      "Prefer Session Manager over a bastion with 22 open to 0.0.0.0/0.",
      "Use Patch Manager for a fleet, not logging into each box.",
      "Know Parameter Store can hold config (and secrets, with KMS).",
    ],
  });

  patch("directory-identity-hybrid", {
    title: "When they already have Active Directory",
    summary:
      "Lookup lesson. Pick Directory Service / AD Connector when the story is Windows domain join, FSx, or WorkSpaces.",
    skim: true,
    youCan: [
      "If the story names Active Directory + AWS, look up Directory Service — don’t invent a custom LDAP on EC2 as the first answer.",
      "FSx for Windows wants a directory. Linux EFS does not.",
    ],
  });

  patch("flowlogs-nfw-ipv6", {
    title: "Who talked on the network (and IPv6)",
    summary:
      "Lookup lesson. Flow Logs for forensics, Network Firewall when SGs aren’t enough, egress-only internet for IPv6.",
    skim: true,
    youCan: [
      "Pick VPC Flow Logs when they ask who talked to whom.",
      "Pick Network Firewall for centrally inspected traffic, not as a substitute for security groups on day one.",
    ],
  });

  patch("elb-autoscaling", {
    title: "Traffic cop and extra computers",
    summary:
      "A load balancer in front, more (or fewer) computers when busy. Two buildings or you are not ‘highly available.’",
    already: [
      "Stay-up in one city = two Availability Zones. A single computer with an alarm still dies with the building.",
    ],
    youCan: [
      "Pick Application Load Balancer for HTTP paths and WAF; Network Load Balancer for a fixed IP / raw TCP.",
      "Put the Auto Scaling group in two+ AZs and let bad instances get replaced.",
      "Keep session state in a database or cache, not on one computer’s disk.",
    ],
  });

  patch("decoupling", {
    title: "Waiting lines (queues and events)",
    summary:
      "If the website waits for email to send, a slow email kills the website. SQS, SNS, EventBridge, Step Functions.",
    youCan: [
      "Pick a queue (SQS) to buffer work; a topic (SNS) to fan out; EventBridge for ‘when X happens in AWS.’",
      "Pick Amazon MQ only when they cannot change an existing JMS/AMQP app.",
      "Pick Step Functions when the story is a workflow with waits and branches.",
    ],
  });

  patch("serverless-containers", {
    title: "Functions and containers that stay up",
    summary:
      "Lambda, Fargate, ECS, EKS — when Amazon running the computers is the point, and when it is not.",
    youCan: [
      "Pick Lambda for short event-driven work; not a 24/7 custom kernel.",
      "Pick Fargate when they want containers without patching EC2.",
      "Pick EKS when the constraint is Kubernetes; don’t drag it in for a simple website.",
    ],
  });

  patch("ha-patterns", {
    title: "What dies if you only built one",
    summary:
      "Two buildings in one city vs a second city. Know which AWS pieces are already multi-AZ for you.",
    youCan: [
      "List single points of failure: one AZ NAT, one RDS without Multi-AZ, one Region when they asked for disaster recovery.",
      "Default stay-up = two AZs. Second Region = disaster or users far away.",
      "Know S3/DynamoDB/SQS are Regional — you still design the app around them.",
    ],
  });

  patch("disaster-recovery", {
    title: "How bad a disaster, how fast back",
    summary:
      "RPO (how much data you may lose) and RTO (how long you may be down) pick backup vs a warm second Region.",
    youCan: [
      "Define RPO and RTO in one sentence each.",
      "Match backup / pilot light / warm standby / multi-site to those numbers — not to ‘more AWS is safer.’",
      "Not pick three live Regions when they only asked for a nightly backup.",
    ],
  });

  patch("observability", {
    title: "See it, alarm it, trace it",
    summary:
      "CloudWatch for metrics/logs/alarms, X-Ray for a request hopping services, CloudTrail for who called the API.",
    youCan: [
      "Pick CloudWatch alarms for ‘tell me when this breaks.’",
      "Pick X-Ray (or similar tracing) for ‘which microservice is slow.’",
      "Pick CloudTrail for ‘who deleted the bucket,’ not CloudWatch.",
    ],
  });

  patch("cloudformation", {
    title: "Write it down so you can redo it",
    summary:
      "Templates instead of Friday console clicks. Repeatable environments, drift, many accounts.",
    youCan: [
      "Say why production changes should be a template (CloudFormation or Terraform), not a memory of clicks.",
      "Pick StackSets when the same stack must land in many accounts/Regions.",
      "Know drift means someone clicked anyway.",
    ],
  });

  patch("apigw-appsync", {
    title: "A front door for APIs",
    summary:
      "API Gateway for HTTP/WebSocket, AppSync for GraphQL. Auth and throttling. Sometimes an ALB is enough.",
    youCan: [
      "Pick API Gateway when they need a managed HTTP API with keys, auth, throttling.",
      "Pick AppSync when they name GraphQL.",
      "Pick an ALB when it is just routing HTTP to computers you already run.",
    ],
  });

  patch("s3-storage", {
    title: "Using the file bucket well",
    summary:
      "Private downloads, big uploads from far away, copies near users. Still not a disk for a database.",
    already: ["S3 is a bucket over the internet, not a disk you format."],
    youCan: [
      "Keep the bucket private; put CloudFront (or a presigned URL) in front for people.",
      "Pick Transfer Acceleration for far offices uploading large files; CloudFront for downloads of a website.",
      "Not use S3 as the boot disk or a Windows share.",
    ],
  });

  patch("block-file-storage", {
    title: "Disks and shared folders, in detail",
    summary:
      "EBS types, instance store that dies with the box, EFS vs FSx. Same map as Foundations, with the knobs.",
    youCan: [
      "Default SSD disk = gp3. Extreme database IOPS on EC2 = io2.",
      "Instance store is fast and gone if the computer stops — never the only copy.",
      "Linux shared folder across AZs = EFS. Windows/SMB = FSx for Windows.",
    ],
  });

  patch("ec2-performance", {
    title: "Picking a rented computer",
    summary:
      "Families (general, memory, compute, storage), placement groups, when Batch or EMR is the named job.",
    youCan: [
      "Match the bottleneck (CPU, RAM, disk, GPU) to a family, not ‘the biggest one.’",
      "Know a placement group is about network locality, not stay-up across buildings.",
      "Leave EMR/Batch for when the story is big data / batch jobs.",
    ],
  });

  patch("lambda-container-perf", {
    title: "Making functions and containers fast enough",
    summary:
      "Lambda memory (which also buys CPU), concurrency limits, provisioned concurrency for cold starts.",
    youCan: [
      "Turn Lambda memory up to get more CPU.",
      "Pick provisioned concurrency when they cannot wait for a cold start.",
      "Watch account concurrency so one noisy function doesn’t starve the others.",
    ],
  });

  patch("rds-aurora", {
    title: "SQL databases Amazon runs",
    summary:
      "MySQL/Postgres and friends. Multi-AZ is stay-up; a read replica is extra read power, not failover by itself.",
    already: ["RDS = rented SQL. DynamoDB = key → item, no joins."],
    youCan: [
      "Turn on Multi-AZ for stay-up; add read replicas for heavy reads.",
      "Pick Aurora when they want the MySQL/Postgres-compatible faster cousin.",
      "Not put a busy website’s sessions on Redshift (that is a warehouse).",
    ],
  });

  patch("dynamodb-nosql", {
    title: "Key-value at huge scale",
    summary:
      "Keys matter. Indexes, on-demand vs provisioned, streams. Neptune/DocumentDB when the API is graph or Mongo.",
    youCan: [
      "Design around a key; don’t expect SQL joins.",
      "Pick on-demand when traffic is spiky and unknown; provisioned when it is steady.",
      "Pick DocumentDB / Neptune / Keyspaces only when the story names that API.",
    ],
  });

  patch("caching", {
    title: "Copies so you don’t hit the database every time",
    summary:
      "CloudFront at the edge, ElastiCache in the VPC, DAX in front of DynamoDB, read replicas — different layers.",
    youCan: [
      "Pick CloudFront for public HTTP content near the user.",
      "Pick ElastiCache for session/data in the app tier.",
      "Pick DAX only in front of DynamoDB, not RDS.",
    ],
  });

  patch("network-performance", {
    title: "Faster paths and the edge",
    summary:
      "CloudFront vs Global Accelerator, Direct Connect, PrivateLink, subnets that can actually scale.",
    youCan: [
      "Pick CloudFront for cacheable HTTP; Global Accelerator for TCP/UDP to a Regional app (gaming, VoIP-class).",
      "Pick Direct Connect when they need a private fat pipe to the office, not ‘a VPN is fine.’",
      "Pick PrivateLink when they want a private IP to an AWS service or a partner VPC.",
    ],
  });

  patch("route53-deep", {
    title: "DNS: send users to the right place",
    summary:
      "Failover, latency, weighted, alias to a load balancer. Health checks decide when to move.",
    youCan: [
      "Use an alias to point the zone apex at an ALB or CloudFront.",
      "Pick failover + health checks for active/passive; latency for ‘closest Region.’",
      "Know DNS is not a load balancer inside one VPC.",
    ],
  });

  patch("data-pipelines", {
    title: "Streams, lakes, and reports",
    summary:
      "Kinesis vs Firehose vs a queue, Glue to transform, Athena to SQL the lake. Lookup when the question names the pipe.",
    youCan: [
      "Pick SQS for app work queues; Kinesis when they name streaming ingest; Firehose when they just want it in S3.",
      "Pick Athena to query files in S3 with SQL; Glue for the catalog/ETL; Redshift for a warehouse.",
    ],
  });

  patch("migration-data", {
    title: "Moving servers and files in",
    summary:
      "Lookup: the exam names the tool. MGN for servers, DMS for databases, DataSync/Snow for files, Storage Gateway if on-prem must keep talking.",
    youCan: [
      "Match the constraint (live servers, database, petabytes, existing NFS) to one named tool.",
      "Not redesign the app in the same answer if they forbade changing it.",
    ],
  });

  patch("analytics-extras", {
    title: "Search, dashboards, lake permissions",
    summary:
      "Lookup. QuickSight dashboards, OpenSearch, Lake Formation, extra Redshift knobs.",
    skim: true,
    youCan: [
      "Pick QuickSight for business dashboards, OpenSearch for log/search, Lake Formation for lake permissions.",
    ],
  });

  patch("beanstalk-batch-ml", {
    title: "Simple web PaaS, batch jobs, named ML APIs",
    summary:
      "Lookup. Beanstalk = ‘just run my web app.’ Batch = jobs. Faces/OCR/speech = the named AI service, not SageMaker.",
    skim: true,
    youCan: [
      "Pick Rekognition/Textract/… when the job is a managed AI API; SageMaker when they are building a model.",
      "Pick Batch for queued compute jobs; Beanstalk only when they want the simplest PaaS.",
    ],
  });

  patch("cost-visibility", {
    title: "Read the bill before you cheapen it",
    summary:
      "Tags, Cost Explorer, Budgets, the detailed report. You cannot optimize what you cannot allocate.",
    already: ["Lab 1’s billing alarm is the tiny version of this lesson."],
    youCan: [
      "Turn on cost allocation tags or finance cannot charge teams.",
      "Pick Budgets for ‘ping me when spend will exceed X’; Explorer to look; CUR for every line in Athena.",
    ],
  });

  patch("storage-cost", {
    title: "Cheaper places to keep files",
    summary:
      "S3 classes and lifecycle, EFS infrequent access, don’t keep immortal snapshots.",
    youCan: [
      "Pick Intelligent-Tiering when access is unknown; Deep Archive when they won’t read for months.",
      "Not put daily analytics on Deep Archive (retrieval fees and hours).",
      "Expire old snapshots and unused disks.",
    ],
  });

  patch("compute-cost", {
    title: "Pay less for computers",
    summary:
      "On-Demand vs Spot vs Savings Plans / Reserved. Graviton. Don’t Spot a database that cannot die.",
    youCan: [
      "Spot = interruptible. Not for the only copy of state.",
      "Savings Plans / RIs for steady 24/7. On-Demand for spiky unknown.",
      "Right-size before you sign a one-year plan.",
    ],
  });

  patch("database-cost", {
    title: "Pay less for data stores",
    summary:
      "Aurora Serverless for spiky SQL, Dynamo on-demand vs provisioned, kill idle RDS, extra replicas you don’t read.",
    youCan: [
      "Stop or serverless an idle database.",
      "Not run a Multi-AZ giant RDS ‘just in case’ when the story is a tiny internal tool.",
    ],
  });

  patch("network-cost", {
    title: "The silent bill (data and NAT)",
    summary:
      "AZ-to-AZ, Region-to-Region, NAT by the hour and the gigabyte, CloudFront, endpoints instead of NAT to S3.",
    youCan: [
      "NAT gateways cost money while they exist — delete lab NATs the same day.",
      "S3/DynamoDB from private subnets → gateway endpoint, not NAT.",
      "A second Region’s traffic is not free — don’t add it for stay-up they didn’t ask.",
    ],
  });

  patch("decision-trees", {
    title: "Pick-the-service trees",
    summary:
      "The exam is a decision tree. Walk storage, compute, database, network until the branch is muscle memory.",
    youCan: [
      "Start from the constraint (protocol, stay-up, cost, ‘cannot change the app’), not from a favorite service.",
      "Kill answers that miss one constraint before you pick the famous one.",
    ],
  });

  patch("high-miss", {
    title: "Look-alikes people mix up",
    summary:
      "Community traps plus AWS-documented behavior — not an official ‘most missed’ ranking.",
    youCan: [
      "Separate Multi-AZ vs replica, NAT vs endpoint, Identity Center vs Cognito, gateway vs interface endpoint.",
      "Treat this page as drills, not as a prophecy of your form.",
    ],
  });

  patch("exam-day", {
    title: "How to spend 130 minutes",
    summary:
      "Flag and move. Blank is wrong. Last sentence first. You came here to cross 720, not to reread the whole internet.",
    youCan: [
      "Pace ~2 minutes per question; never leave blank (official: unanswered = incorrect).",
      "Read the last sentence first, then kill options that break a constraint.",
    ],
  });

  patch("practitioner-day", {
    title: "How the job actually feels",
    summary:
      "Accounts, the CLI, tags, tickets, who owns the network vs the app. The loop around the diagram.",
    youCan: [
      "Run get-caller-identity before you destroy anything.",
      "Tag as you create, or the bill cannot be explained.",
      "Treat Friday console clicks in production as the anti-pattern.",
    ],
  });

  patch("operate-cadence", {
    title: "Weekly operate: patch, restore, review cost",
    summary:
      "Architecture nobody operates is a slide. Patch, backup drills, Well-Architected, a cost meeting.",
    youCan: [
      "Name a weekly cadence: patch, restore test, look at the bill, review findings.",
      "Know a backup you have never restored is a hope, not a plan.",
    ],
  });
})();
