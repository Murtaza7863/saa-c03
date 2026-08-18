lesson({
  id: "cost-visibility",
  order: 38,
  domain: 4,
  minutes: 12,
  title: "Seeing spend: tags, Cost Explorer, Budgets, CUR",
  summary:
    "You cannot optimize what you cannot allocate. Tools first, then architecture.",
  tags: ["cost explorer", "budgets", "cur", "tags"],
  body: `
    <p>You cannot cheapen a bill you cannot read. Tags and a budget alarm come before “use Spot.” Lab 1’s email if spend moves is the tiny version of this page.</p>
    <ul>
      <li><strong>Cost allocation tags</strong> — activate in billing. Enforce with SCP/tag policies/Control Tower. No tags → no chargeback.</li>
      <li><strong>Cost Explorer</strong> — interactive, RI/SP recommendations, forecast. Human analysis.</li>
      <li><strong>Budgets</strong> — alerts (actual or forecasted), including RI utilization. SNS/email. “Notify if we exceed $X.”</li>
      <li><strong>Cost and Usage Report (CUR)</strong> — raw to S3, Athena/QuickSight, most granular. “Data lake of billing.”</li>
      <li><strong>Compute Optimizer</strong> — right-size EC2/ASG/EBS/Lambda/ECS. Overprovisioned = money.</li>
      <li><strong>Trusted Advisor</strong> — cost checks (idle LBs, unassociated EIPs, underused RDS) plus security/quota. Business/Enterprise for full checks.</li>
      <li><strong>Well-Architected Tool</strong> — reviews, not a bill.</li>
      <li>Organizations consolidated billing: volume discounts, SP/RI sharing (can be restricted).</li>
    </ul>
    <div class="callout compare"><strong>Budgets vs Cost Explorer vs CUR</strong>Explorer = look. Budgets = alarm. CUR = export every line for custom analytics. Don’t pick CloudWatch billing alarm as the ‘enterprise allocation’ answer unless the stem is a simple threshold.</div>
  `,
  traps: [
    "CloudTrail as a cost allocation tool.",
    "Budgets that only look at last month when they asked for forecasted overrun.",
  ],
  quiz: [
    {
      q: "Finance wants a Slack ping when forecasted monthly spend will exceed $50k.",
      choices: [
        "AWS Budgets with forecasted alert to SNS",
        "GuardDuty",
        "VPC Flow Logs",
        "S3 inventory",
      ],
      answer: 0,
      explain: "Budgets forecasted notifications. GuardDuty is threat finding.",
    },
    {
      q: "Need per-team cost in Athena with maximum granularity.",
      choices: [
        "Screenshot Cost Explorer",
        "CUR to S3 + Athena, plus allocation tags",
        "CloudFront access logs only",
        "IAM Access Analyzer",
      ],
      answer: 1,
      explain: "CUR is the detailed export. Tags make rows attributable.",
    },
  ],
});

lesson({
  id: "storage-cost",
  order: 39,
  domain: 4,
  minutes: 14,
  title: "Cost-optimized storage",
  summary:
    "S3 classes, Intelligent-Tiering, lifecycle, EBS/EFS/FSx tiers, and backup retention that isn’t immortal.",
  tags: ["s3 glacier", "intelligent-tiering", "lifecycle", "efs ia"],
  body: `
    <h2>S3 classes (memorize access vs cost)</h2>
    <div class="table-wrap"><table>
      <tr><th>Class</th><th>When</th></tr>
      <tr><td>Standard</td><td>Hot, frequent, multi-AZ</td></tr>
      <tr><td>Standard-IA / One Zone-IA</td><td>Infrequent, retrieval fee; One Zone if you can lose an AZ</td></tr>
      <tr><td>Intelligent-Tiering</td><td>Unknown or changing patterns; monitoring fee tiny; exam favorite for “unpredictable”</td></tr>
      <tr><td>Glacier Instant Retrieval</td><td>Archive but milliseconds</td></tr>
      <tr><td>Glacier Flexible Retrieval</td><td>Minutes–hours, cheaper</td></tr>
      <tr><td>Glacier Deep Archive</td><td>12–48h, cheapest, compliance archives</td></tr>
      <tr><td>Express One Zone</td><td>Latency/RPS, not cost-archive</td></tr>
    </table></div>
    <p><strong>Lifecycle</strong> transitions and expirations. Don’t transition tiny objects (overhead). <strong>Requester Pays</strong> for public datasets. Compact many small files (cost of PUTs and later Athena scans).</p>
    <h2>EBS / EFS / FSx</h2>
    <p>gp3 over gp2 (cheaper, tunable). Delete unused volumes and old snapshots. EFS Infrequent Access / Archive lifecycle. FSx storage types per product. Snapshot too often + never expire = a second bill.</p>
    <h2>Hybrid transfer cost</h2>
    <p>Snowball/Snow Family when petabytes would blow WAN cost/time. DataSync over DX. Don’t run months of VPN egress if a Snow device is cheaper — the stem will give size and weeks.</p>
    <div class="callout trap"><strong>Retrieval fees</strong>IA and Glacier are not “cheap Standard.” If they read the data often, Standard or Intelligent-Tiering wins. Deep Archive for daily analytics is a trap.</div>
  `,
  traps: [
    "One Zone-IA for irreplaceable backups.",
    "Lifecycle to Deep Archive after 1 day on objects still used by Athena hourly.",
  ],
  quiz: [
    {
      q: "Access pattern unknown and changes over months; minimize storage cost without custom lifecycle guesses.",
      choices: [
        "Intelligent-Tiering",
        "Deep Archive immediately",
        "io2 volumes",
        "S3 Standard forever with no review",
      ],
      answer: 0,
      explain: "INT moves objects automatically. Deep Archive punishes reads.",
    },
    {
      q: "7-year legal archive, restore acceptable in 12 hours, lowest storage price.",
      choices: [
        "S3 Standard",
        "S3 Glacier Deep Archive",
        "EBS gp3 snapshots left in the account forever without lifecycle",
        "CloudFront cache",
      ],
      answer: 1,
      explain: "Deep Archive is the coldest S3 class. 12h fits.",
    },
  ],
});

lesson({
  id: "compute-cost",
  order: 40,
  domain: 4,
  minutes: 16,
  title: "Compute purchasing and right-sizing",
  summary:
    "On-Demand, Spot, Savings Plans, RIs, Graviton, Fargate vs EC2, and hibernate.",
  tags: ["spot", "savings plans", "reserved instances", "graviton"],
  body: `
    <div class="table-wrap"><table>
      <tr><th>Model</th><th>Use</th></tr>
      <tr><td>On-Demand</td><td>Baseline unknown, spiky, cannot interrupt, short experiments</td></tr>
      <tr><td>Spot</td><td>Fault-tolerant, stateless, Batch, EMR, ASG mixed policy, CI. Can be reclaimed with 2 minutes. Never the only prod for a stateful unprepared DB unless the stem is OK with that</td></tr>
      <tr><td>Savings Plans (Compute)</td><td>Flexible $ /hour commit 1 or 3 years — EC2/Fargate/Lambda, any instance family/Region (Compute SP). Best default “commitment” answer</td></tr>
      <tr><td>EC2 Instance SP / Standard RI</td><td>More discount, less flexible, known family/Region</td></tr>
      <tr><td>Convertible RI</td><td>Mid-flexibility, older exam answers; SP usually supersedes</td></tr>
    </table></div>
    <h2>Architecture that is cheaper than a coupon</h2>
    <ul>
      <li>Right-size (Compute Optimizer) before you buy a 3-year plan.</li>
      <li>Graviton if software allows — often the first “lower cost same perf” pick.</li>
      <li>ASG: On-Demand base + Spot % for extra capacity.</li>
      <li>Lambda/Fargate when idle time is huge. EC2 when 24/7 high utilization fills the box.</li>
      <li>Hibernate or stop/start nonprod nights (Instance Scheduler, or Time-based ASG desired=0). Hibernate writes RAM to EBS; supported families only; faster resume than a cold boot.</li>
      <li>License: SQL BYOL vs License Included; <strong>Dedicated Hosts</strong> when the stem is socket/core BYOL (Oracle, Windows). Capacity Reservations when you must be able to launch in an AZ (DR / event), not as a discount by themselves.</li>
      <li>License Manager tracks licenses. Compute Optimizer before you commit to Savings Plans.</li>
    </ul>
    <h2>Load balancer cost note</h2>
    <p>ALB vs NLB is a requirements pick first; don’t pick NLB “because cheaper” if they need WAF/path routing. Idle Classic/ALBs show up in Trusted Advisor — delete them.</p>
    <div class="callout tip"><strong>Spot + ASG</strong>Capacity-optimized allocation, diversified instance types, multiple AZs, interruption-safe app (queue, checkpoint). That’s a complete answer, not “Spot” alone.</div>
  `,
  traps: [
    "Spot for an un-replicated single-node production database with RPO 0.",
    "Standard RI for a fleet that will change family next month (Compute Savings Plan).",
    "Leaving nonprod on 24/7 On-Demand.",
  ],
  quiz: [
    {
      q: "Stateless image workers, can retry, want up to 70% cheaper compute.",
      choices: [
        "Spot (with On-Demand backup if needed)",
        "Dedicated Hosts for each worker",
        "Always the largest metal On-Demand",
        "Snowball",
      ],
      answer: 0,
      explain: "Interruptible workers are the Spot poster child.",
    },
    {
      q: "Steady EC2+Fargate+Lambda spend, want a 3-year discount that still allows changing instance families.",
      choices: [
        "Compute Savings Plans",
        "A single Standard RI on i3.metal only",
        "Spot for the RDS primary",
        "Buying hardware",
      ],
      answer: 0,
      explain:
        "Compute SP covers EC2/Fargate/Lambda across families. Standard RI is rigid.",
    },
  ],
});

lesson({
  id: "database-cost",
  order: 41,
  domain: 4,
  minutes: 12,
  title: "Cost-optimized databases",
  summary:
    "Aurora Serverless, Dynamo on-demand vs provisioned, idle RDS, replicas you don’t need, and engine choice.",
  tags: ["aurora serverless", "dynamodb capacity", "rds idle"],
  body: `
    <ul>
      <li>Stop/start nonprod RDS (or Aurora pause/Serverless). Snapshots of forgotten instances still cost.</li>
      <li>Don’t run a replica “just in case” if reads don’t need it.</li>
      <li>Aurora Serverless v2 for spiky. Provisioned for flat 100% busy (cheaper than a high ACU floor 24/7 — check the math in the stem).</li>
      <li>DynamoDB: on-demand vs provisioned + auto scaling + reserved capacity. Standard-IA table class for infrequently accessed tables.</li>
      <li>RDS Proxy is a reliability/scale feature; not always cheaper, but can avoid a bigger instance just for connection storms.</li>
      <li>Open-source engines (Aurora PostgreSQL/MySQL) vs commercial licenses when the stem allows a move.</li>
      <li>S3 + Athena for rarely queried logs instead of ingesting everything into RDS/Redshift 24/7.</li>
      <li>Right-size: Performance Insights + Compute Optimizer for RDS.</li>
    </ul>
    <div class="callout compare"><strong>Dynamo vs RDS cost</strong>Dynamo wins at huge scale with simple keys. RDS wins at complex queries without duplicating data into many GSIs (each GSI costs writes). “Cheapest” depends on access pattern, not brand loyalty.</div>
  `,
  traps: [
    "Redshift cluster left on for a 10-minute daily report (use pause, Serverless, or Athena).",
    "On-demand Dynamo for a perfectly flat, well-known 3-year high QPS (provisioned + reserved may be cheaper).",
  ],
  quiz: [
    {
      q: "Internal app is busy 9–5 weekdays, Postgres, nearly idle nights and weekends. Minimize cost, keep managed SQL.",
      choices: [
        "Aurora Serverless v2 (or stop/start RDS on a schedule)",
        "The largest commercial Oracle RAC always on",
        "DynamoDB Global Tables in four Regions",
        "Direct Connect",
      ],
      answer: 0,
      explain:
        "Scale down/pause idle SQL. Global Tables would be the expensive wrong model.",
    },
  ],
});

lesson({
  id: "network-cost",
  order: 42,
  domain: 4,
  minutes: 14,
  title: "Data-transfer and NAT: the silent bill",
  summary:
    "AZ-to-AZ, Region-to-Region, NAT vs endpoints, CloudFront, and DX vs VPN cost logic.",
  tags: ["nat", "vpc endpoint", "data transfer", "cloudfront"],
  body: `
    <p>Compute is visible. Transfer is where designs go to die.</p>
    <h2>Ranking (intuition, not a price list)</h2>
    <ol>
      <li>In from internet: usually free.</li>
      <li>Same AZ, private IP: cheap/free-ish.</li>
      <li>Cross-AZ: you pay. That’s why “NAT in each AZ” and “don’t cross-AZ chat for fun.”</li>
      <li>Cross-Region: more.</li>
      <li>Out to internet: most expensive of the common paths. CloudFront can be cheaper for downloads than origin egress, and caches cut repeat egress.</li>
    </ol>
    <h2>NAT vs endpoints</h2>
    <p>NAT gateway: hourly per AZ + per GB processed. Private subnet talking to S3/Dynamo/ECR/Logs through NAT is a classic waste. <strong>Gateway endpoints</strong> (S3, DynamoDB) are the first save. <strong>Interface endpoints</strong> have hourly ENI cost — still often win vs NAT GB at volume, plus they’re private.</p>
    <p>Shared NAT: one NAT for many AZs saves hourly and <em>adds</em> cross-AZ transfer and a SPOF. Exam: HA vs cost — pick what the stem underlines.</p>
    <p>Official Domain 4 skill: <strong>NAT instance vs NAT gateway</strong>. Gateway is managed, scales, billed hourly+GB, no SG on the NAT itself. NAT instance is an EC2 you patch, can use an SG, can be cheaper at tiny scale, and is a bottleneck/SPOF unless you build HA yourself. Default production answer is NAT gateway unless the stem is clearly “minimize cost for a lab/dev VPC and they will accept instance ops.”</p>
    <h2>Other levers</h2>
    <ul>
      <li>VPC endpoints instead of public NAT for AWS APIs.</li>
      <li>CloudFront / Regional edge for static.</li>
      <li>Direct Connect for heavy hybrid vs pumping over internet VPN.</li>
      <li>PrivateLink vs peering+NAT.</li>
      <li>Keep chatty tiers in the same AZ when the stem allows (but not at the expense of HA if they asked for HA first).</li>
      <li>S3 same-Region from EC2 is cheaper than cross-Region replication you don’t need.</li>
      <li>IPv4 public addresses now cost — don’t spray Elastic IPs.</li>
    </ul>
    <div class="callout trap"><strong>Security vs cost</strong>If the stem says private and least cost, endpoints beat “NAT is fine.” If it says highly available NAT, one NAT is wrong even if cheaper.</div>
  `,
  traps: [
    "A single NAT for three AZs when the stem asked for AZ failure resilience.",
    "Cross-Region replication as a default without a DR/latency requirement.",
  ],
  quiz: [
    {
      q: "Private subnets pull TBs/day from S3 in the same Region. NAT bill is huge. First change?",
      choices: [
        "S3 gateway VPC endpoint",
        "Add a fourth NAT",
        "Move the bucket to another Region",
        "Make the subnet public and call it a day with no SG",
      ],
      answer: 0,
      explain: "Gateway endpoint removes NAT from the S3 path.",
    },
    {
      q: "HA private outbound to the internet is required; cost is secondary.",
      choices: [
        "One NAT in AZ A for all AZs",
        "NAT gateway in each AZ used by private subnets",
        "No NAT, hope for the best",
        "CloudTrail",
      ],
      answer: 1,
      explain: "Per-AZ NAT is the HA pattern. Cost-secondary is in the stem.",
    },
  ],
});

lesson({
  id: "decision-trees",
  order: 43,
  domain: 5,
  minutes: 16,
  title: "Capstone: pick-the-service trees",
  summary:
    "The exam is a decision tree. Walk the same branches until they are muscle memory.",
  tags: ["decision", "comparison", "capstone"],
  body: `
    <h2>Storage</h2>
    <p>Need a disk on one EC2? <strong>EBS</strong> (instance store if ephemeral OK). Many Linux mounts POSIX multi-AZ? <strong>EFS</strong>. SMB/Windows? <strong>FSx Windows</strong>. HPC/S3-linked? <strong>Lustre</strong>. HTTP objects, data lake, website? <strong>S3</strong>.</p>
    <h2>Database</h2>
    <p>SQL joins / existing engine → <strong>RDS/Aurora</strong>. Serverless spiky SQL → <strong>Aurora Serverless</strong>. Key-value ms scale → <strong>DynamoDB</strong>. Cache → <strong>ElastiCache</strong>. Graph → <strong>Neptune</strong>. Mongo API → <strong>DocumentDB</strong>. Warehouse → <strong>Redshift</strong>. SQL on files in S3 → <strong>Athena</strong>.</p>
    <h2>Compute</h2>
    <p>Event, short, idle → <strong>Lambda</strong>. Container, no servers → <strong>Fargate</strong>. K8s required → <strong>EKS</strong>. GPU/weird kernel/cheap dense 24/7 → <strong>EC2</strong>. Batch jobs → <strong>Batch</strong>. Spark → <strong>EMR or Glue</strong>.</p>
    <h2>Decouple</h2>
    <p>Buffer → <strong>SQS</strong>. Fan-out → <strong>SNS or EventBridge</strong>. SaaS/event bus/filter → <strong>EventBridge</strong>. Kafka → <strong>MSK</strong>. JMS → <strong>MQ</strong>. Orchestrate steps → <strong>Step Functions</strong>.</p>
    <h2>Global users</h2>
    <p>HTTP cache → <strong>CloudFront</strong>. Non-HTTP / static IP anycast → <strong>Global Accelerator</strong>. DNS policy → <strong>Route 53</strong>.</p>
    <h2>Hybrid</h2>
    <p>Quick encrypted → <strong>VPN</strong>. Lots of consistent bandwidth → <strong>DX</strong> (+ VPN backup). Files from NFS → <strong>DataSync or Storage Gateway</strong>. SFTP → <strong>Transfer Family</strong>. Petabytes truck → <strong>Snow</strong>.</p>
    <h2>Security keyword</h2>
    <p>People/workforce → <strong>Identity Center</strong>. App users → <strong>Cognito</strong>. Keys → <strong>KMS CMK</strong>. Secrets rotate → <strong>Secrets Manager</strong>. HTTP exploit → <strong>WAF</strong>. DDoS → <strong>Shield</strong>. Weird API → <strong>GuardDuty</strong>. CVE on EC2/ECR → <strong>Inspector</strong>. PII in S3 → <strong>Macie</strong>. WORM → <strong>Object Lock</strong>.</p>
    <p>Open the <a href="#/compare">service vs service</a> tables and the <a href="#/cheatsheet">cheat sheet</a> after this lesson. Then take a practice exam cold.</p>
  `,
  traps: [
    "Memorizing service slogans without the constraint in the stem.",
    "Picking two extra services ‘for best practice’ that the question did not ask for.",
  ],
  quiz: [
    {
      q: "Need SMB, AD, Windows EC2, multi-AZ.",
      choices: ["EFS", "FSx for Windows File Server", "S3 Glacier", "Neptune"],
      answer: 1,
      explain: "Windows file sharing is FSx Windows.",
    },
    {
      q: "Need to buffer jobs and fan them to three independent worker teams with retry.",
      choices: [
        "SNS to three SQS queues",
        "One shared EBS volume",
        "CloudFront",
        "ACM",
      ],
      answer: 0,
      explain: "Fan-out + durable work queues.",
    },
  ],
});

lesson({
  id: "exam-day",
  order: 45,
  domain: 5,
  minutes: 10,
  title: "Exam-day strategy",
  summary: "How to spend 130 minutes so the scaled score crosses 720.",
  tags: ["exam strategy", "flag", "time"],
  body: `
    <h2>Pacing</h2>
    <p>65 items, 130 minutes ≈ 2 minutes each. Flag anything over 90 seconds. Never leave a blank (no penalty). Multiple-response: if it says “choose TWO,” two is two.</p>
    <h2>A method that works</h2>
    <ol>
      <li>Read the last sentence first (the actual ask: least cost? most operationally efficient?).</li>
      <li>Scan the stem for constraints: encryption, no app change, RPO, hybrid, existing engine.</li>
      <li>Kill answers that violate one constraint.</li>
      <li>If two remain, pick the more managed / more least-privilege / fewer moving parts — unless they asked for lowest cost and the managed thing is clearly oversized.</li>
    </ol>
    <h2>Language AWS uses</h2>
    <ul>
      <li><strong>Most operationally efficient</strong> → managed, less undifferentiated heavy lifting.</li>
      <li><strong>Least operational overhead</strong> → same.</li>
      <li><strong>Most cost-effective</strong> → still must meet the SLA; then Spot, IA, endpoints, right-size.</li>
      <li><strong>Highly available</strong> → multi-AZ at minimum.</li>
      <li><strong>Globally available / users worldwide</strong> → multi-Region or CloudFront/GA, not one AZ hero box.</li>
    </ul>
    <h2>After a practice exam here</h2>
    <p>AWS does not publish a practice score that predicts a pass. Do not replay the same 50 until you score 90% by memorizing letters. Read every explanation, then drill the lesson for that domain. Take a <em>fresh</em> set before repeating. Security is 30% of scored content — compensatory scoring still lets a hole there sink the overall 720.</p>
  `,
  traps: [
    "Changing three answers in the last two minutes without a new constraint spotted.",
    "Studying only compute and skipping IAM/VPC (30% security).",
  ],
  quiz: [
    {
      q: "Two answers both work. The question says ‘minimize operational overhead.’ Which class of answer usually wins?",
      choices: [
        "Self-managed on EC2 with custom scripts",
        "A managed AWS service that still meets encryption and HA constraints",
        "The option with the most extra services",
        "Using root keys to simplify IAM",
      ],
      answer: 1,
      explain:
        "Managed + constraints. Extra services and root keys are never ‘ops efficient’ in the security sense.",
    },
  ],
});
