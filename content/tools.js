window.SAA.cards = [
  {
    id: "c1",
    front: "IAM role / instance profile",
    back: "Temporary credentials for EC2/Lambda/ECS. Never bake access keys into AMIs.",
    cue: "Compute needs AWS APIs",
  },
  {
    id: "c2",
    front: "IAM Identity Center",
    back: "Workforce SSO into many accounts via permission sets.",
    cue: "Employees, Console, org",
  },
  {
    id: "c3",
    front: "Amazon Cognito",
    back: "App/mobile users, user pools (IdP) + identity pools (AWS creds).",
    cue: "Customers, not staff",
  },
  {
    id: "c4",
    front: "SCP",
    back: "Org guardrail. Cannot grant. Caps even AdministratorAccess in member accounts. Not on management account.",
    cue: "Deny disable CloudTrail",
  },
  {
    id: "c5",
    front: "Permission boundary",
    back: "Ceiling on a user/role. Delegated admins cannot mint super-admins.",
    cue: "Junior IAM admin",
  },
  {
    id: "c6",
    front: "Security group",
    back: "Stateful ENI firewall, allow-only. Primary microsegmentation.",
    cue: "RDS only from app SG",
  },
  {
    id: "c7",
    front: "NACL",
    back: "Stateless subnet ACL, allow+deny, ephemeral ports. Coarse.",
    cue: "Block a bad IP at subnet",
  },
  {
    id: "c8",
    front: "NAT gateway",
    back: "Private IPv4 outbound. AZ-scoped. Costs hourly+$/GB. Prefer endpoints for AWS APIs.",
    cue: "Patches from private subnet",
  },
  {
    id: "c9",
    front: "Gateway VPC endpoint",
    back: "S3 + DynamoDB, via route table, no NAT, no hourly ENI.",
    cue: "NAT bill from S3",
  },
  {
    id: "c10",
    front: "Interface endpoint / PrivateLink",
    back: "ENI in your VPC to AWS or a partner NLB. No CIDR overlap issues.",
    cue: "Private API, overlapping CIDR",
  },
  {
    id: "c11",
    front: "Transit Gateway",
    back: "Hub-and-spoke routing for many VPCs + VPN/DX. Peering is not transitive.",
    cue: "3+ VPCs",
  },
  {
    id: "c12",
    front: "Direct Connect",
    back: "Dedicated hybrid bandwidth. Add VPN for encryption/failover.",
    cue: "Gbps + consistent latency",
  },
  {
    id: "c13",
    front: "Site-to-Site VPN",
    back: "Fast to set up, encrypted over internet, variable performance.",
    cue: "Backup path or quick hybrid",
  },
  {
    id: "c14",
    front: "SSM Session Manager",
    back: "Shell to EC2 without SSH/bastion/inbound 22.",
    cue: "No bastion",
  },
  {
    id: "c15",
    front: "AWS WAF",
    back: "L7 rules on ALB/CloudFront/API GW. SQLi, XSS, rate limit.",
    cue: "OWASP HTTP",
  },
  {
    id: "c16",
    front: "Shield Advanced",
    back: "DDoS extras + cost protection + DRT. Standard is already on many fronts.",
    cue: "Big DDoS, insurance",
  },
  {
    id: "c17",
    front: "GuardDuty",
    back: "Threat intel on logs/runtime. Findings, not a blocking firewall.",
    cue: "Crypto mining, C2",
  },
  {
    id: "c18",
    front: "Inspector",
    back: "CVE scanning EC2/ECR/Lambda.",
    cue: "Package vulnerabilities",
  },
  {
    id: "c19",
    front: "Macie",
    back: "PII/secrets discovery in S3.",
    cue: "SSNs in a bucket",
  },
  {
    id: "c20",
    front: "Security Hub",
    back: "Aggregated security scoreboard + standards.",
    cue: "One dashboard of findings",
  },
  {
    id: "c21",
    front: "CloudTrail",
    back: "API audit who-did-what. Org trail to log-archive account.",
    cue: "Forensics of API calls",
  },
  {
    id: "c22",
    front: "AWS Config",
    back: "Resource inventory, drift, compliance rules.",
    cue: "Are all buckets encrypted?",
  },
  {
    id: "c23",
    front: "KMS CMK",
    back: "Customer key policy, rotation, revoke, CloudTrail on Decrypt.",
    cue: "Customer-managed encryption",
  },
  {
    id: "c24",
    front: "CloudHSM",
    back: "Dedicated HSM, more ops. Only when required.",
    cue: "FIPS single-tenant HSM",
  },
  {
    id: "c25",
    front: "Secrets Manager",
    back: "Secrets + managed rotation (RDS etc.).",
    cue: "Rotate DB password 30 days",
  },
  {
    id: "c26",
    front: "ACM",
    back: "Public TLS for ALB/CloudFront/API GW, auto-renew. Not exportable to EC2.",
    cue: "HTTPS on ALB",
  },
  {
    id: "c27",
    front: "S3 Object Lock",
    back: "WORM. Compliance mode for regulators/ransomware backups.",
    cue: "Immutable 7 years",
  },
  {
    id: "c28",
    front: "AWS Backup",
    back: "Central backup policies, cross-account/Region copies.",
    cue: "Org-wide backups",
  },
  {
    id: "c29",
    front: "ALB",
    back: "L7 HTTP, path/host, WAF, OIDC, Lambda targets.",
    cue: "/api vs /static",
  },
  {
    id: "c30",
    front: "NLB",
    back: "L4, static IP, extreme PPS, TLS/TCP/UDP, PrivateLink.",
    cue: "Allow-list a fixed IP",
  },
  {
    id: "c31",
    front: "GWLB",
    back: "Third-party firewalls inline.",
    cue: "Appliance inspection",
  },
  {
    id: "c32",
    front: "SQS Standard",
    back: "Durable buffer, at-least-once, unordered. Default queue.",
    cue: "Absorb spikes",
  },
  {
    id: "c33",
    front: "SQS FIFO",
    back: "Order per group, exactly-once processing semantics.",
    cue: "Must preserve order",
  },
  {
    id: "c34",
    front: "SNS",
    back: "Pub/sub fan-out. Pair with SQS for durable subscribers.",
    cue: "One event, many teams",
  },
  {
    id: "c35",
    front: "EventBridge",
    back: "Event bus, content filters, SaaS partners, archive/replay, Scheduler.",
    cue: "Org events / SaaS",
  },
  {
    id: "c36",
    front: "Step Functions",
    back: "Orchestrate retries, parallel, long workflows.",
    cue: "State machine",
  },
  {
    id: "c37",
    front: "Amazon MQ",
    back: "Managed ActiveMQ/Rabbit for JMS/AMQP lift-and-shift.",
    cue: "Cannot change protocol",
  },
  {
    id: "c38",
    front: "Lambda",
    back: "15 min, event-driven, scale to zero. CPU follows memory.",
    cue: "Idle then spike",
  },
  {
    id: "c39",
    front: "Fargate",
    back: "Containers without AMIs. Tasks >15 min or existing images.",
    cue: "Don’t patch servers",
  },
  {
    id: "c40",
    front: "ECS vs EKS",
    back: "ECS = AWS-native. EKS = Kubernetes required/portable.",
    cue: "Do they need k8s?",
  },
  {
    id: "c41",
    front: "RDS Multi-AZ",
    back: "Sync standby, automatic failover, HA — not extra read capacity.",
    cue: "Survive AZ loss, SQL",
  },
  {
    id: "c42",
    front: "Read replica",
    back: "Async extra reads / DR promote. Lag exists.",
    cue: "Read-heavy",
  },
  {
    id: "c43",
    front: "Aurora Global",
    back: "Typical RPO <1s, promote in minutes, two Regions, SQL.",
    cue: "Tight RPO SQL DR",
  },
  {
    id: "c44",
    front: "RDS Proxy",
    back: "Pool connections; help Lambda + faster failover.",
    cue: "Lambda + RDS storms",
  },
  {
    id: "c45",
    front: "DynamoDB",
    back: "Serverless key-value, ms, keys/GSIs. Global Tables multi-active.",
    cue: "No joins, huge scale",
  },
  {
    id: "c46",
    front: "DAX",
    back: "Microsecond cache in front of DynamoDB.",
    cue: "Hot key Dynamo",
  },
  {
    id: "c47",
    front: "ElastiCache",
    back: "Redis/Memcached in front of anything. Sessions, query cache.",
    cue: "Repeated RDS queries",
  },
  {
    id: "c48",
    front: "S3",
    back: "Object, 11 nines durability (Standard), HTTP API, data lake.",
    cue: "Not a POSIX disk",
  },
  {
    id: "c49",
    front: "EBS gp3 / io2",
    back: "Block, one AZ. gp3 default. io2 = SAN IOPS / Multi-Attach.",
    cue: "Boot volume / EC2 DB",
  },
  {
    id: "c50",
    front: "EFS",
    back: "Regional NFS, many Linux mounts. Not SMB.",
    cue: "Shared POSIX multi-AZ",
  },
  {
    id: "c51",
    front: "FSx Windows / Lustre",
    back: "SMB+AD vs HPC+S3.",
    cue: "Protocol in the stem",
  },
  {
    id: "c52",
    front: "CloudFront",
    back: "HTTP CDN, OAC to private S3, WAF at edge, Origin failover.",
    cue: "Global static/API cache",
  },
  {
    id: "c53",
    front: "Global Accelerator",
    back: "Anycast TCP/UDP, no cache, static IPs, AWS backbone.",
    cue: "UDP game / static IP",
  },
  {
    id: "c54",
    front: "Route 53",
    back: "DNS: failover, latency, geo, health checks, alias.",
    cue: "Traffic policy",
  },
  {
    id: "c55",
    front: "Kinesis Data Streams",
    back: "Real-time, shards, multiple consumers, replay.",
    cue: "100k events/s custom",
  },
  {
    id: "c56",
    front: "Firehose",
    back: "Managed batching into S3/OpenSearch/Redshift.",
    cue: "Just land it in S3",
  },
  {
    id: "c57",
    front: "MSK",
    back: "Managed Kafka.",
    cue: "Existing Kafka producers",
  },
  {
    id: "c58",
    front: "Glue + Athena",
    back: "Catalog/ETL + serverless SQL on S3. Parquet+partitions.",
    cue: "SQL on the lake",
  },
  {
    id: "c59",
    front: "EMR",
    back: "Managed Spark/Hadoop cluster when Glue isn’t enough.",
    cue: "Custom big data cluster",
  },
  {
    id: "c60",
    front: "Redshift",
    back: "Warehouse. Spectrum to S3.",
    cue: "BI, columnar, petabytes",
  },
  {
    id: "c61",
    front: "DMS",
    back: "DB migration, homogeneous or hetero (+SCT).",
    cue: "Oracle to Aurora",
  },
  {
    id: "c62",
    front: "DataSync / Transfer Family / Snow",
    back: "NFS jobs / SFTP / petabyte truck.",
    cue: "How data enters",
  },
  {
    id: "c63",
    front: "Storage Gateway",
    back: "On-prem NFS/SMB/iSCSI/VTL backed by AWS.",
    cue: "Don’t rewrite on-prem apps",
  },
  {
    id: "c64",
    front: "Pilot light vs warm vs active-active",
    back: "Core data only vs scaled-down running vs full dual Region. Cost vs RTO.",
    cue: "DR strategy",
  },
  {
    id: "c65",
    front: "Compute Savings Plans",
    back: "Flexible commit covering EC2/Fargate/Lambda across families.",
    cue: "3-year discount, might change instance type",
  },
  {
    id: "c66",
    front: "Spot",
    back: "Up to ~90% off, 2-minute interruption. Stateless/Batch/mixed ASG.",
    cue: "Retryable workers",
  },
  {
    id: "c67",
    front: "Intelligent-Tiering",
    back: "S3 auto class for unknown access patterns.",
    cue: "Don’t guess lifecycle",
  },
  {
    id: "c68",
    front: "Deep Archive",
    back: "Cheapest S3, hours to restore. Legal cold storage.",
    cue: "7 years, 12h OK",
  },
  {
    id: "c69",
    front: "Control Tower",
    back: "Opinionated multi-account landing zone + guardrails.",
    cue: "New org, best practice",
  },
  {
    id: "c70",
    front: "RAM",
    back: "Share subnets/TGW/etc. Shared VPC pattern.",
    cue: "App accounts in network team’s VPC",
  },
  {
    id: "c71",
    front: "IMDSv2",
    back: "Session-based instance metadata. Stops SSRF stealing roles.",
    cue: "Web app + instance role",
  },
  {
    id: "c72",
    front: "S3 Transfer Acceleration",
    back: "Edge-aided PUTs into a Regional bucket.",
    cue: "Global large uploads",
  },
  {
    id: "c73",
    front: "Cluster placement group",
    back: "Lowest latency, one AZ, correlated failure. HPC + EFA.",
    cue: "MPI",
  },
  {
    id: "c74",
    front: "Neptune / DocumentDB / Keyspaces",
    back: "Graph / Mongo API / Cassandra.",
    cue: "Purpose-built",
  },
  {
    id: "c75",
    front: "Artifact",
    back: "Download AWS compliance reports (SOC, PCI).",
    cue: "Auditor wants SOC 2",
  },
];

window.SAA.compares = [
  {
    id: "storage",
    title: "S3 vs EBS vs EFS vs FSx",
    intro: "Pick by protocol and sharing, not by which name you remember.",
    table: `<table><tr><th></th><th>S3</th><th>EBS</th><th>EFS</th><th>FSx</th></tr>
      <tr><td>Type</td><td>Object HTTP</td><td>Block, 1 AZ</td><td>NFS file, Regional</td><td>SMB / Lustre / ONTAP / OpenZFS</td></tr>
      <tr><td>Share</td><td>Many clients via API</td><td>One instance (or Multi-Attach cluster)</td><td>Thousands of Linux</td><td>Protocol-specific</td></tr>
      <tr><td>Boot?</td><td>No</td><td>Yes</td><td>No</td><td>No</td></tr>
      <tr><td>Classic exam</td><td>Data lake, backups, static</td><td>EC2 disks, databases on EC2</td><td>Shared web content Linux</td><td>Windows share or HPC</td></tr></table>`,
    rule: "If they said ‘file system’ plus Linux plus multi-AZ → EFS. Windows → FSx. Disk → EBS. Website/API objects → S3.",
  },
  {
    id: "lb",
    title: "ALB vs NLB vs GWLB",
    intro: "Layer and features, not speed-as-a-slogan.",
    table: `<table><tr><th></th><th>ALB</th><th>NLB</th><th>GWLB</th></tr>
      <tr><td>Layer</td><td>7 HTTP</td><td>4 TCP/UDP/TLS</td><td>3/4 appliances</td></tr>
      <tr><td>WAF / path</td><td>Yes</td><td>No</td><td>No</td></tr>
      <tr><td>Static IP</td><td>No</td><td>Yes</td><td>—</td></tr>
      <tr><td>PrivateLink</td><td>Via NLB usually</td><td>Yes</td><td>—</td></tr></table>`,
    rule: "HTTP features → ALB. Fixed IP or non-HTTP → NLB. Firewall fleet → GWLB.",
  },
  {
    id: "db",
    title: "RDS/Aurora vs DynamoDB vs Redshift vs Athena",
    intro: "OLTP vs key-value vs warehouse vs files.",
    table: `<table><tr><th></th><th>RDS/Aurora</th><th>DynamoDB</th><th>Redshift</th><th>Athena</th></tr>
      <tr><td>Model</td><td>Relational SQL</td><td>Key-value/document</td><td>Columnar warehouse</td><td>SQL on S3</td></tr>
      <tr><td>Scale style</td><td>Instance (+ replicas)</td><td>Serverless huge</td><td>Cluster / Serverless</td><td>Serverless scans</td></tr>
      <tr><td>Joins</td><td>Yes</td><td>No (not really)</td><td>Yes analytic</td><td>Yes on files</td></tr>
      <tr><td>Ops</td><td>Managed instance</td><td>Lowest</td><td>Warehouse admin</td><td>None</td></tr></table>`,
    rule: "Joins + transactions → Aurora/RDS. Known key + ms + scale → Dynamo. BI over warehouse → Redshift. Occasional SQL on the lake → Athena.",
  },
  {
    id: "msg",
    title: "SQS vs SNS vs EventBridge vs MQ vs MSK",
    intro: "Queue vs fan-out vs bus vs protocol compatibility.",
    table: `<table><tr><th>Need</th><th>Pick</th></tr>
      <tr><td>Buffer / competing consumers</td><td>SQS</td></tr>
      <tr><td>Fan-out to many subscribers</td><td>SNS (often + SQS)</td></tr>
      <tr><td>Filtering, SaaS, many producers, archive</td><td>EventBridge</td></tr>
      <tr><td>JMS / AMQP unchanged</td><td>Amazon MQ</td></tr>
      <tr><td>Kafka API</td><td>MSK</td></tr>
      <tr><td>Replayable real-time log, shards</td><td>Kinesis Data Streams</td></tr></table>`,
    rule: "Greenfield AWS: SQS/SNS/EventBridge. Don’t pick MQ/MSK unless the protocol is the constraint.",
  },
  {
    id: "edge",
    title: "CloudFront vs Global Accelerator vs Transfer Acceleration",
    intro: "Cache vs backbone vs inbound to S3.",
    table: `<table><tr><th></th><th>CloudFront</th><th>Global Accelerator</th><th>S3 TA</th></tr>
      <tr><td>Caches?</td><td>Yes HTTP</td><td>No</td><td>No</td></tr>
      <tr><td>Protocols</td><td>HTTP(S)</td><td>TCP/UDP</td><td>S3 PUT/GET via edges</td></tr>
      <tr><td>Typical</td><td>Web, APIs, video</td><td>Games, VoIP, static anycast IP</td><td>Far offices uploading into one bucket</td></tr></table>`,
    rule: "If it can be cached HTTP, CloudFront almost always beats GA.",
  },
  {
    id: "iam-pol",
    title: "Identity policy vs resource policy vs SCP vs boundary",
    intro: "Who vs what vs account ceiling vs delegated ceiling.",
    table: `<table><tr><th>Type</th><th>Grants?</th><th>Typical</th></tr>
      <tr><td>Identity</td><td>Yes</td><td>Role can s3:GetObject</td></tr>
      <tr><td>Resource</td><td>Yes (who may use this)</td><td>Bucket policy, KMS key policy, SQS</td></tr>
      <tr><td>SCP</td><td>No</td><td>OU cannot leave us-east-1</td></tr>
      <tr><td>Boundary</td><td>No</td><td>This role max is PowerUser</td></tr></table>`,
    rule: "Cross-account: identity Allow in caller + resource Allow in owner. Explicit Deny always wins.",
  },
  {
    id: "dr",
    title: "Backup vs pilot light vs warm vs multi-site",
    intro: "Match RPO/RTO numbers before you pick Aurora Global.",
    table: `<table><tr><th></th><th>RTO vibe</th><th>RPO vibe</th><th>Pay for</th></tr>
      <tr><td>Backup/restore</td><td>Hours</td><td>Hours</td><td>Storage</td></tr>
      <tr><td>Pilot light</td><td>Tens of min–hours</td><td>Minutes–seconds (replication)</td><td>Data + tiny core</td></tr>
      <tr><td>Warm standby</td><td>Minutes</td><td>Seconds–minutes</td><td>Scaled-down stack</td></tr>
      <tr><td>Active-active</td><td>~0</td><td>~0</td><td>Two productions</td></tr></table>`,
    rule: "Multi-AZ is HA, not DR. DR needs another Region unless they only asked for AZ.",
  },
  {
    id: "buy",
    title: "On-Demand vs Spot vs Savings Plans vs RI",
    intro:
      "Interruptibility and flexibility beat hunting the maximum discount %.",
    table: `<table><tr><th></th><th>Interrupt?</th><th>Flexibility</th><th>Use</th></tr>
      <tr><td>On-Demand</td><td>No</td><td>Max</td><td>Unknown, stateful prod baseline</td></tr>
      <tr><td>Spot</td><td>Yes (2 min)</td><td>Max</td><td>Batch, stateless, mixed ASG</td></tr>
      <tr><td>Compute SP</td><td>No</td><td>High (EC2/Fargate/Lambda)</td><td>Steady spend, changing shapes</td></tr>
      <tr><td>Standard RI / Instance SP</td><td>No</td><td>Low</td><td>Known family 24/7</td></tr></table>`,
    rule: "Right-size, then Compute SP. Spot only if the app can die.",
  },
  {
    id: "hybrid",
    title: "VPN vs Direct Connect vs PrivateLink vs peering",
    intro: "On-prem vs VPC-to-VPC vs published service.",
    table: `<table><tr><th></th><th>Good for</th><th>Not for</th></tr>
      <tr><td>VPN</td><td>Quick, encrypted, backup</td><td>Guaranteed 10 Gbps</td></tr>
      <tr><td>DX</td><td>Consistent bulk hybrid</td><td>Same-day setup</td></tr>
      <tr><td>Peering</td><td>Two VPCs, no transitivity</td><td>Many VPCs, overlapping CIDR</td></tr>
      <tr><td>TGW</td><td>Many VPCs + hybrid hub</td><td>Simple two-VPC toy</td></tr>
      <tr><td>PrivateLink</td><td>Consume a service, overlap OK</td><td>Full mesh of all subnets</td></tr></table>`,
    rule: "Overlap CIDR → PrivateLink (or re-IP). Many VPCs → TGW.",
  },
];

window.SAA.cheatsheet = `
  <h2>Underline these words</h2>
  <p>least cost · least operational overhead · cannot change the application · customer-managed key · multi-AZ · multi-Region · RPO/RTO · Windows/SMB · NFS · Kafka · JMS · millisecond · serverless · hybrid · globally</p>
  <h2>Default production picture</h2>
  <p>2+ AZs · ALB public · app private · data private · SG-to-SG · SSM not SSH · S3 gateway endpoint · RDS Multi-AZ or Aurora · ASG on an AMI or ECS/Fargate · SQS between spikes and workers.</p>
  <h2>Keyword → service (read twice)</h2>
  <div class="table-wrap"><table>
    <tr><td>Workforce SSO</td><td>IAM Identity Center</td></tr>
    <tr><td>Mobile users temp AWS creds</td><td>Cognito identity pool</td></tr>
    <tr><td>Cross-account vendor</td><td>Role + external ID</td></tr>
    <tr><td>Cap AdministratorAccess in member accounts</td><td>SCP</td></tr>
    <tr><td>SQLi / XSS / HTTP flood</td><td>WAF (+ Shield if DDoS)</td></tr>
    <tr><td>PII in S3</td><td>Macie</td></tr>
    <tr><td>Rotate RDS password</td><td>Secrets Manager</td></tr>
    <tr><td>WORM</td><td>S3 Object Lock</td></tr>
    <tr><td>Path-based HTTP + WAF</td><td>ALB</td></tr>
    <tr><td>Static IP TCP</td><td>NLB</td></tr>
    <tr><td>Order + exactly once queue</td><td>SQS FIFO</td></tr>
    <tr><td>SaaS event ingest</td><td>EventBridge</td></tr>
    <tr><td>15 min event code</td><td>Lambda</td></tr>
    <tr><td>Container 45 min no AMI</td><td>Fargate</td></tr>
    <tr><td>SQL HA in one Region</td><td>RDS Multi-AZ / Aurora</td></tr>
    <tr><td>SQL DR RPO ~1s two Regions</td><td>Aurora Global</td></tr>
    <tr><td>Key-value global writers</td><td>DynamoDB Global Tables</td></tr>
    <tr><td>Lambda + RDS connections</td><td>RDS Proxy</td></tr>
    <tr><td>Shared Linux files</td><td>EFS</td></tr>
    <tr><td>SMB + AD</td><td>FSx Windows</td></tr>
    <tr><td>HPC + S3</td><td>FSx Lustre</td></tr>
    <tr><td>HTTP cache global</td><td>CloudFront + OAC</td></tr>
    <tr><td>UDP / anycast IP</td><td>Global Accelerator</td></tr>
    <tr><td>SQL on S3</td><td>Athena (+ Glue catalog)</td></tr>
    <tr><td>Unknown S3 access</td><td>Intelligent-Tiering</td></tr>
    <tr><td>NAT bill to S3</td><td>Gateway endpoint</td></tr>
    <tr><td>Interruptible scale-out</td><td>Spot</td></tr>
    <tr><td>Flexible 1/3yr commit</td><td>Compute Savings Plans</td></tr>
    <tr><td>Petabytes offline</td><td>Snow Family</td></tr>
  </table></div>
  <h2>Never</h2>
  <ul>
    <li>Root access keys. Public RDS. S3 public “because CloudFront is hard.”</li>
    <li>Single-AZ production. One NAT as HA. Read replica as Multi-AZ.</li>
    <li>S3 as a database disk. EFS as Windows share. Lambda as a 2-hour video job.</li>
  </ul>
`;

window.SAA.glossary = [
  { t: "AZ", d: "Isolated data-center cluster in a Region. HA unit." },
  { t: "CMK", d: "Customer managed KMS key — policy, rotation, revoke." },
  { t: "CRR", d: "S3 Cross-Region Replication." },
  { t: "DLQ", d: "Dead-letter queue for failed messages/functions." },
  { t: "ENI", d: "Elastic network interface — SG attaches here." },
  {
    t: "Idempotent",
    d: "Safe to retry; required because SQS/Lambda are at-least-once.",
  },
  { t: "IMDS", d: "Instance metadata service. Prefer v2." },
  { t: "OAC", d: "Origin access control — CloudFront to private S3." },
  { t: "OU", d: "Organizational unit in AWS Organizations." },
  { t: "PIOPS", d: "Provisioned IOPS (io1/io2 EBS or RDS storage)." },
  { t: "RPO", d: "Max acceptable data loss, in time." },
  { t: "RTO", d: "Max acceptable downtime." },
  { t: "SCP", d: "Service control policy — org permission ceiling." },
  { t: "SPOF", d: "Single point of failure." },
  { t: "SSE", d: "Server-side encryption (S3 SSE-S3 / SSE-KMS / SSE-C)." },
  { t: "STS", d: "Security Token Service — AssumeRole, temp creds." },
  { t: "VIF", d: "Direct Connect virtual interface (public/private/transit)." },
  { t: "WAF", d: "Web Application Firewall — L7." },
  { t: "WORM", d: "Write once read many — Object Lock / Vault Lock." },
];
