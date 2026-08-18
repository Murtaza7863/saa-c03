/* Plain-language dictionary. Lessons hover-define the first use of each term. */

window.SAA.words = [
  {
    t: "AWS",
    d: "Amazon Web Services — Amazon’s cloud company. You rent computers, disks, and networks in their buildings instead of buying your own.",
  },
  {
    t: "SAA-C03",
    d: "The current Solutions Architect Associate exam code. 65 written questions, 130 minutes, no console.",
  },
  {
    t: "Region",
    d: "One geography of Amazon data centers (for example Singapore or Northern Virginia). Things you create stay here unless you copy them.",
  },
  {
    t: "Availability Zone",
    aka: ["AZ", "AZs"],
    d: "One isolated cluster of buildings inside a Region. If this cluster loses power, the other AZs in the same Region can keep running.",
  },
  {
    t: "Data center",
    d: "A building full of computers, disks, and networking gear.",
  },
  {
    t: "EC2",
    aka: ["Elastic Compute Cloud"],
    d: "A rented computer you leave on. You pick the size, you patch the operating system, you pay while it exists.",
  },
  {
    t: "AMI",
    aka: ["Amazon Machine Image"],
    d: "The template (operating system + optional software) used to launch an EC2 computer.",
  },
  {
    t: "EC2 instance",
    d: "One running EC2 computer. “Terminate” means turn it off and throw it away.",
  },
  {
    t: "Lambda",
    d: "A short function Amazon runs for you when something happens. Max 15 minutes. You do not patch a server.",
  },
  {
    t: "S3",
    aka: ["Simple Storage Service"],
    d: "A bucket of files you reach over the internet. Not a disk plugged into one computer.",
  },
  {
    t: "S3 bucket",
    d: "An S3 container for objects (files). The bucket name is global; the data still lives in a Region.",
  },
  {
    t: "Object storage",
    d: "Files addressed as whole objects over an API (S3). Not a formatted disk (block) and not a shared folder (file).",
  },
  {
    t: "EBS",
    aka: ["Elastic Block Store"],
    d: "A disk that plugs into one EC2 computer in one Availability Zone. Typical boot volume.",
  },
  {
    t: "EFS",
    aka: ["Elastic File System"],
    d: "A shared Linux folder many computers in two Availability Zones can see, like a network drive.",
  },
  {
    t: "FSx",
    d: "Managed file systems for specific protocols. Windows/SMB is FSx for Windows, not EFS.",
  },
  {
    t: "RDS",
    aka: ["Relational Database Service"],
    d: "A SQL database (MySQL, PostgreSQL, …) that Amazon patches and runs for you.",
  },
  {
    t: "Aurora",
    d: "Amazon’s faster, MySQL- and PostgreSQL-compatible database. Still SQL with tables and joins.",
  },
  {
    t: "DynamoDB",
    d: "A key → item store. Milliseconds, huge scale, no servers to patch. Not SQL joins.",
  },
  {
    t: "Redshift",
    d: "A data warehouse for reports and analytics, not a busy website’s primary database.",
  },
  {
    t: "Console",
    d: "AWS’s website. Buttons and wizards. The same actions exist as typed commands.",
  },
  {
    t: "CLI",
    aka: ["Command Line Interface", "AWS CLI"],
    d: "A program that talks to AWS by typing commands instead of clicking.",
  },
  {
    t: "CloudShell",
    d: "A terminal in the console, already signed in as you.",
  },
  {
    t: "Root",
    d: "The signup-email login that owns the account and can do anything, including close it. MFA on, then stop using it daily.",
  },
  {
    t: "MFA",
    aka: ["multi-factor authentication", "Multi-factor authentication"],
    d: "A second check besides the password — usually a phone app or hardware key.",
  },
  {
    t: "IAM",
    aka: ["Identity and Access Management"],
    d: "The lock on the account: who is allowed to do what, on which resource, from where.",
  },
  {
    t: "IAM user",
    d: "A long-lived login inside one account. Fine for a tiny sandbox; companies prefer Identity Center for people.",
  },
  {
    t: "IAM group",
    d: "A bundle of permissions you attach to IAM users. Not something you put on a computer.",
  },
  {
    t: "IAM role",
    d: "An identity you assume for a while. Amazon hands out temporary keys. Default for computers and for people coming from elsewhere.",
  },
  {
    t: "IAM policy",
    d: "A JSON document of Allow/Deny rules. Where you attach it changes what it means.",
  },
  {
    t: "JSON",
    d: "A structured text format (curly braces and quotes) AWS uses for policies and many templates.",
  },
  {
    t: "ARN",
    aka: ["Amazon Resource Name"],
    d: "The full address of one AWS thing, like a file path for the cloud (account, Region, name).",
  },
  {
    t: "explicit Deny",
    d: "A policy result that blocks an action. An explicit Deny always beats Allow.",
  },
  {
    t: "Least privilege",
    d: "Give only the permissions needed for the job — not AdministratorAccess “to unblock the app.”",
  },
  {
    t: "Access key",
    aka: ["access keys"],
    d: "A long-lived password pair for programs. Easy to leak if you paste it on a disk. Prefer roles.",
  },
  {
    t: "STS",
    aka: ["Security Token Service", "AssumeRole"],
    d: "The service that vends short-lived keys when someone (or a computer) assumes a role.",
  },
  {
    t: "Trust policy",
    d: "On a role: who is allowed to assume it (an EC2 computer, another account, a company directory).",
  },
  {
    t: "Permissions policy",
    d: "On a role or user: what they can do after they are signed in.",
  },
  {
    t: "Instance profile",
    d: "The envelope that hangs a role on an EC2 computer so the computer can call AWS without a key file.",
  },
  {
    t: "IMDS",
    aka: ["IMDSv2", "instance metadata"],
    d: "The local address an EC2 computer uses to fetch its temporary role keys. v2 is the safer version.",
  },
  {
    t: "Identity Center",
    aka: ["IAM Identity Center", "SSO"],
    d: "Workforce sign-in for employees across many accounts. Not for your mobile app’s millions of customers.",
  },
  {
    t: "Cognito",
    aka: ["Amazon Cognito"],
    d: "Sign-up and sign-in for app/game users (customers), and optional temporary AWS keys for them.",
  },
  {
    t: "Federation",
    d: "Sign in with an existing company directory (or Google/Facebook) instead of a new IAM password.",
  },
  {
    t: "SAML",
    d: "A common protocol companies use to sign employees into other websites, including AWS.",
  },
  {
    t: "External ID",
    d: "A secret string in a cross-account role so a vendor cannot be tricked into using the role for the wrong customer.",
  },
  {
    t: "Permission boundary",
    d: "A ceiling on a user or role. A junior admin cannot create a super-admin even with a wide policy.",
  },
  {
    t: "SCP",
    aka: ["Service Control Policy", "Service Control Policies"],
    d: "An organization-wide ceiling on an account. Never grants. Does not apply to the management account the same way.",
  },
  {
    t: "Organizations",
    aka: ["AWS Organizations"],
    d: "A folder of AWS accounts with one bill and optional guardrails.",
  },
  {
    t: "OU",
    aka: ["organizational unit", "Organizational unit"],
    d: "A folder of accounts inside Organizations (Sandbox, Prod, Security, …).",
  },
  {
    t: "Control Tower",
    d: "A packaged way to set up a multi-account landing zone with guardrails and a log account.",
  },
  {
    t: "AWS RAM",
    aka: ["Resource Access Manager"],
    d: "Share a network (or other resources) with other accounts in the org without copying them.",
  },
  {
    t: "CloudTrail",
    d: "The audit log of who called which AWS API — including console clicks.",
  },
  {
    t: "AWS Config",
    d: "Inventory of what you have, plus rules for “is this still configured the way we said.” Not the API audit log.",
  },
  {
    t: "CloudWatch",
    d: "Metrics, logs, and alarms. “Tell me when the website is broken.” Not “who deleted the bucket” (that is CloudTrail).",
  },
  {
    t: "X-Ray",
    d: "Traces one user request as it hops through microservices so you can see which hop is slow.",
  },
  {
    t: "VPC",
    aka: ["Virtual Private Cloud"],
    d: "Your private network inside one Region. You pick an address range and slice it into subnets.",
  },
  {
    t: "Subnet",
    d: "A slice of a VPC in exactly one Availability Zone. Public vs private is which road goes to the internet.",
  },
  {
    t: "CIDR",
    aka: ["10.0.0.0/16"],
    d: "A way to write an IP address range. /16 is a large private block; /24 is a typical subnet.",
  },
  {
    t: "Route table",
    d: "The list of roads from a subnet: “to reach the internet, go this way.”",
  },
  {
    t: "Internet Gateway",
    aka: ["IGW"],
    d: "The door between your VPC and the public internet.",
  },
  {
    t: "NAT gateway",
    aka: ["NAT", "Network Address Translation"],
    d: "Lets private computers go out to the internet (patches) without letting the internet in. Costs money by the hour and the gigabyte.",
  },
  {
    t: "Security group",
    aka: ["SG", "security groups"],
    d: "A firewall on a computer (or load balancer, or database). Allow-only, stateful: replies are allowed automatically.",
  },
  {
    t: "Network ACL",
    aka: ["NACL", "network ACL"],
    d: "A firewall on a whole subnet. Stateless; you can allow and deny. Daily door is still the security group.",
  },
  {
    t: "VPC endpoint",
    aka: ["gateway endpoint", "interface endpoint", "PrivateLink"],
    d: "A private road from your VPC to an AWS service (or a partner) so traffic does not need NAT or the public internet.",
  },
  {
    t: "Peering",
    aka: ["VPC peering"],
    d: "A one-to-one private link between two VPCs. Not transitive: A–B and B–C does not give A–C.",
  },
  {
    t: "Transit Gateway",
    aka: ["TGW"],
    d: "A hub so many VPCs (and a VPN/Direct Connect) can talk without a mesh of peerings.",
  },
  {
    t: "VPN",
    aka: ["Site-to-Site VPN"],
    d: "An encrypted tunnel over the internet to your office. Quick to set up; speed varies.",
  },
  {
    t: "Direct Connect",
    aka: ["DX"],
    d: "A dedicated private fiber from your building to AWS. Steadier than a VPN; add a VPN if you also need encryption/failover.",
  },
  {
    t: "Session Manager",
    aka: ["SSM", "Systems Manager"],
    d: "Open a shell on an EC2 computer using IAM, without opening port 22 to the world.",
  },
  {
    t: "Bastion",
    d: "A jump computer in a public subnet used only to SSH into private computers. Session Manager is usually better.",
  },
  {
    t: "Load balancer",
    aka: [
      "ELB",
      "ALB",
      "NLB",
      "GWLB",
      "Application Load Balancer",
      "Network Load Balancer",
    ],
    d: "A traffic cop in front of several computers. If one dies, the others still serve. ALB understands HTTP paths; NLB is raw TCP/UDP with optional static IPs.",
  },
  {
    t: "Target group",
    d: "The list of computers (or IPs, or Lambda) a load balancer sends traffic to, plus the health check.",
  },
  {
    t: "Auto Scaling",
    aka: ["ASG", "Auto Scaling group"],
    d: "Add or remove computers when busy or idle, and replace ones that fail health checks. Needs two Availability Zones for stay-up.",
  },
  {
    t: "Health check",
    d: "A periodic “are you still up?” If not, the load balancer stops sending work and Auto Scaling can replace the box.",
  },
  {
    t: "SQS",
    aka: ["Simple Queue Service"],
    d: "A waiting line for messages. Producers drop work in; consumers pull it when ready. The website does not wait for email to send.",
  },
  {
    t: "SNS",
    aka: ["Simple Notification Service"],
    d: "A megaphone: one event, many subscribers (email, queue, function).",
  },
  {
    t: "EventBridge",
    d: "A bus for events (“when a file lands,” “when a scheduled time hits”), including events from other AWS services.",
  },
  {
    t: "Step Functions",
    d: "A workflow: wait, branch, retry, call other AWS services, optionally a human approval.",
  },
  {
    t: "Amazon MQ",
    d: "A managed traditional message broker (ActiveMQ/Rabbit) when an existing app already speaks JMS/AMQP and cannot change.",
  },
  {
    t: "DLQ",
    aka: ["dead-letter queue"],
    d: "A side queue for messages that failed too many times, so you can inspect them instead of losing them.",
  },
  {
    t: "ECS",
    aka: ["Elastic Container Service"],
    d: "Amazon’s way to run containers (a packed app). Can sit on EC2 or on Fargate.",
  },
  {
    t: "EKS",
    aka: ["Elastic Kubernetes Service"],
    d: "Kubernetes that Amazon runs the control plane for. Pick it when the constraint is Kubernetes, not for a simple website.",
  },
  {
    t: "Fargate",
    d: "Run containers without patching EC2. Amazon runs the computers.",
  },
  {
    t: "Container",
    d: "A packed copy of an app plus its libraries, so it runs the same on any machine that can run containers.",
  },
  {
    t: "API Gateway",
    d: "A managed front door for HTTP or WebSocket APIs: keys, auth, throttling. Sometimes an ALB is enough.",
  },
  {
    t: "AppSync",
    d: "A managed GraphQL API. Pick it when the story names GraphQL.",
  },
  {
    t: "CloudFront",
    d: "A content-delivery network: copies of files (and sometimes whole sites) sitting in cities closer to the user.",
  },
  {
    t: "OAC",
    aka: ["origin access control"],
    d: "Lets CloudFront read a private S3 bucket. The bucket stays blocked from the public internet.",
  },
  {
    t: "Route 53",
    d: "Amazon’s DNS: the phone book that turns a name like example.com into the right load balancer or Region.",
  },
  {
    t: "DNS",
    d: "The internet’s phone book: names to addresses. Health checks + failover policies decide where users go when something dies.",
  },
  {
    t: "Route 53 alias",
    aka: ["alias record"],
    d: "A Route 53 record that points at an AWS resource (ALB, CloudFront), including the zone apex (example.com, not only www).",
  },
  {
    t: "Global Accelerator",
    d: "Anycast IPs that send TCP/UDP to the nearest healthy Region. Not a cache (that is CloudFront).",
  },
  {
    t: "WAF",
    aka: ["Web Application Firewall"],
    d: "Rules that read HTTP (SQL injection, flood of requests). Security groups cannot parse URLs.",
  },
  {
    t: "Shield",
    aka: ["AWS Shield"],
    d: "DDoS protection. Standard is on for free on CloudFront/ALB/Route 53. Advanced is the paid extra.",
  },
  {
    t: "GuardDuty",
    d: "Looks at logs for “something weird in the account” (odd API calls, odd traffic). Not a web firewall.",
  },
  {
    t: "Amazon Inspector",
    d: "Finds software holes on computers and containers.",
  },
  {
    t: "Macie",
    aka: ["Amazon Macie"],
    d: "Finds sensitive data (like passport numbers) sitting in S3 buckets.",
  },
  {
    t: "Security Hub",
    d: "A roll-up of findings from GuardDuty, Inspector, Macie, and others.",
  },
  {
    t: "KMS",
    aka: ["Key Management Service"],
    d: "Amazon holds encryption keys. A customer-managed key has a key policy: who may encrypt/decrypt.",
  },
  {
    t: "CMK",
    aka: ["customer managed key"],
    d: "A KMS key you own the policy for. AWS-managed keys exist too; pick customer-managed when the story says you must control the key.",
  },
  {
    t: "SSE",
    aka: ["server-side encryption"],
    d: "The storage service encrypts data at rest for you (S3 SSE-S3 or SSE-KMS).",
  },
  {
    t: "TLS",
    aka: ["encryption in transit"],
    d: "Encryption on the wire (HTTPS). Different from encryption at rest on disk.",
  },
  {
    t: "ACM",
    aka: ["Certificate Manager"],
    d: "Free public HTTPS certificates for load balancers and CloudFront. You cannot export the private key.",
  },
  {
    t: "Secrets Manager",
    d: "A vault for database passwords and API keys. Rotate them; let a role fetch them — don’t paste them in git.",
  },
  {
    t: "Parameter Store",
    d: "A place for config (and optionally secrets). Simpler/cheaper than Secrets Manager for many config values.",
  },
  {
    t: "AWS Backup",
    d: "A central backup plan across services, plus restore. A backup you have never restored is a hope.",
  },
  {
    t: "Object Lock",
    aka: ["WORM", "Vault Lock"],
    d: "Write-once-read-many: even an admin cannot delete the object/backup until the retention expires.",
  },
  {
    t: "Artifact",
    aka: ["AWS Artifact"],
    d: "AWS’s own compliance reports (SOC, ISO). Not proof that your app is compliant.",
  },
  {
    t: "RPO",
    d: "Recovery Point Objective — how much data you can afford to lose, measured in time (e.g. 1 hour of transactions).",
  },
  {
    t: "RTO",
    d: "Recovery Time Objective — how long you can afford to be down.",
  },
  {
    t: "Multi-AZ",
    d: "A standby in a second Availability Zone in the same Region. Stay-up if one building dies. Not the same as a read replica.",
  },
  {
    t: "Read replica",
    d: "A copy you can read from to spread load. Failover is not automatic unless the product says so (Aurora is different from classic RDS replicas).",
  },
  {
    t: "Pilot light",
    d: "A tiny copy in a second Region, scaled up after a disaster. Cheaper than running everything twice; slower than warm standby.",
  },
  {
    t: "Warm standby",
    d: "A scaled-down but running copy in a second Region. Faster than pilot light; costs more.",
  },
  {
    t: "SPOF",
    aka: ["single point of failure"],
    d: "One thing whose death takes the system down — one AZ NAT, one computer, one Region when they asked for disaster recovery.",
  },
  {
    t: "CloudFormation",
    d: "AWS’s template language so you can redo an environment from a file instead of memory of clicks.",
  },
  {
    t: "IaC",
    aka: ["infrastructure as code"],
    d: "Networks and computers described in files (CloudFormation, Terraform) and reviewed like software.",
  },
  {
    t: "Drift",
    d: "Someone clicked in the console and the live account no longer matches the template.",
  },
  {
    t: "ElastiCache",
    d: "A cache in your VPC (Redis/Memcached) so the app does not hit the database every time.",
  },
  { t: "DAX", d: "A DynamoDB-specific cache. Not for RDS." },
  {
    t: "CloudFormation StackSets",
    aka: ["StackSets"],
    d: "The same CloudFormation stack launched into many accounts or Regions.",
  },
  {
    t: "Kinesis",
    d: "Streaming ingest when data is a firehose of events. Different from SQS (an app work queue).",
  },
  {
    t: "Firehose",
    aka: ["Data Firehose"],
    d: "Managed streaming delivery into S3/Redshift/OpenSearch without you running consumers.",
  },
  { t: "Glue", d: "Catalog and transform jobs for a data lake (files in S3)." },
  {
    t: "Athena",
    d: "Run SQL on files sitting in S3 without loading a warehouse first.",
  },
  {
    t: "Transfer Acceleration",
    d: "Speeds up uploads into an S3 bucket from far-away offices via edge locations. Downloads of a website are CloudFront.",
  },
  {
    t: "Presigned URL",
    d: "A time-limited link to one S3 object without making the bucket public.",
  },
  {
    t: "gp3",
    d: "The default general-purpose SSD disk type for EBS. You can set IOPS and throughput without changing size.",
  },
  {
    t: "io2",
    aka: ["io2 Block Express"],
    d: "Highest-end EBS for latency-sensitive databases on EC2. One AZ unless you replicate yourself.",
  },
  {
    t: "Instance store",
    d: "Disk physically in the host. Fast, and gone if the computer stops. Never the only copy of data you care about.",
  },
  {
    t: "Spot Instance",
    aka: ["Spot"],
    cs: true,
    d: "Spare EC2 capacity, cheap, can be taken back with a short warning. Not for the only copy of state.",
  },
  {
    t: "On-Demand",
    d: "Pay by the second/hour with no commitment. Default for spiky unknown work.",
  },
  {
    t: "Savings Plans",
    aka: ["Reserved Instances", "RI"],
    d: "A 1- or 3-year commitment for a discount on steady compute. Right-size first.",
  },
  {
    t: "Graviton",
    d: "AWS’s ARM chips. Often cheaper/faster per dollar if your software runs on them.",
  },
  {
    t: "CUR",
    aka: ["Cost and Usage Report"],
    d: "The detailed export of every bill line to S3, for Athena/QuickSight.",
  },
  {
    t: "Cost Explorer",
    d: "The interactive “look at spend” screen, plus recommendations.",
  },
  {
    t: "Budgets",
    aka: ["AWS Budgets"],
    d: "An alarm when actual or forecasted spend crosses a line. Email/SNS.",
  },
  {
    t: "Cost allocation tags",
    d: "Tags you activate in billing so finance can see which team/service spent the money.",
  },
  {
    t: "Intelligent-Tiering",
    d: "S3 class that moves objects between hot and cold automatically when you don’t know the access pattern.",
  },
  {
    t: "Glacier",
    aka: ["Deep Archive"],
    d: "Very cheap archive storage. Minutes to hours to read (Deep Archive even longer). Not for daily analytics.",
  },
  {
    t: "Lifecycle",
    d: "Rules that move or expire objects/snapshots over time so you don’t pay forever.",
  },
  {
    t: "MGN",
    aka: ["Application Migration Service"],
    d: "Lift-and-shift servers to EC2 with replication.",
  },
  {
    t: "DMS",
    aka: ["Database Migration Service"],
    d: "Copy a database to AWS (or between engines) with optional ongoing replication.",
  },
  { t: "DataSync", d: "Copy lots of files to S3/EFS/FSx over the network." },
  {
    t: "Snow",
    aka: ["Snowball", "Snow Family"],
    d: "A physical device Amazon ships so petabytes don’t have to travel your WAN.",
  },
  {
    t: "Storage Gateway",
    d: "On-prem NFS/SMB/iSCSI/tape that keeps talking while data lives in AWS.",
  },
  {
    t: "Outposts",
    d: "AWS hardware in your data center, for latency to factory systems.",
  },
  {
    t: "Textract",
    d: "Read tables and forms from PDFs/images. Managed OCR — not SageMaker.",
  },
  {
    t: "Rekognition",
    d: "Detect faces/labels in images. A named AI API, not “build a model.”",
  },
  {
    t: "SageMaker",
    d: "Build and train your own machine-learning models. Don’t pick it for a solved API like “detect faces.”",
  },
  {
    t: "Beanstalk",
    aka: ["Elastic Beanstalk"],
    d: "Simplest “just run my web app” platform. Exam often still wants you to name ALB/ECS/Lambda when the story is design, not PaaS.",
  },
  {
    t: "Well-Architected",
    d: "AWS’s six lenses for a design: operational excellence, security, reliability, performance, cost, sustainability.",
  },
  {
    t: "Free Tier",
    d: "A discount on some products for new accounts. Not a promise of $0. A forgotten load balancer still bills.",
  },
  {
    t: "Stem",
    d: "Exam slang for the question text. The last sentence is usually the ask (least cost, stay up, cannot change the app).",
  },
];

window.SAA.glossary = window.SAA.words.map((w) => ({
  t: w.t,
  d: w.d,
}));
