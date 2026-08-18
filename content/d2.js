lesson({
  id: "elb-autoscaling",
  order: 17,
  domain: 2,
  minutes: 16,
  title: "Load balancing and Auto Scaling",
  summary:
    "ALB vs NLB vs GWLB, target health, and scaling policies that actually match the stem.",
  tags: ["alb", "nlb", "autoscaling", "target group"],
  body: `
    <p>Stay-up in one city is more than two buildings: a traffic cop in front, and extra computers when it gets busy. That is a load balancer plus Auto Scaling. If you only built one computer, an alarm does not save you.</p>
    <h2>Elastic Load Balancing</h2>
    <div class="table-wrap"><table>
      <tr><th></th><th>ALB (L7)</th><th>NLB (L4)</th><th>GWLB</th></tr>
      <tr><td>Pick when</td><td>HTTP/HTTPS, path/host routing, WAF, OIDC, gRPC</td><td>Extreme performance, static IP, non-HTTP (TLS/TCP/UDP), PrivateLink targets</td><td>Bump-in-the-wire virtual appliances (firewalls)</td></tr>
      <tr><td>WAF</td><td>Yes</td><td>No</td><td>No</td></tr>
      <tr><td>IPs</td><td>No customer-owned static</td><td>Static per AZ / Elastic IP</td><td>—</td></tr>
    </table></div>
    <p>CLB (classic) is legacy — don’t pick it. Health checks belong on the <strong>target group</strong>. Cross-zone load balancing: ALB on by default; NLB optional (cost: cross-AZ bytes).</p>
    <h2>Target types</h2>
    <p>Instance, IP (including on-prem or another VPC), Lambda (ALB only). ECS/EKS register tasks dynamically.</p>
    <h2>Auto Scaling</h2>
    <ul>
      <li><strong>Horizontal</strong> — more instances/tasks. Default for stateless web. Put state in DynamoDB/RDS/ElastiCache/S3, not the local disk.</li>
      <li><strong>Vertical</strong> — bigger instance. Downtime or careful resize. Databases sometimes; web fleets rarely.</li>
      <li>Policies: target tracking (CPU 50%, ALB requests/target), step, scheduled, predictive. Target tracking is the usual exam answer for “keep CPU at X.”</li>
      <li>Cooldown, warmup, instance refresh (immutable rolling replace — good with new AMIs).</li>
      <li>Launch templates, not launch configs. Mixed instance + Spot in the ASG for cost (Domain 4) while keeping On-Demand base for resilience.</li>
    </ul>
    <h2>Health</h2>
    <p>ELB health check + ASG health check replacement. If an instance fails ELB, ASG should replace it. Capacity must span <strong>two+ AZs</strong> or you don’t have HA.</p>
    <div class="callout tip"><strong>Sticky sessions</strong>If the stem needs stickiness, ALB can do it — but the better architecture is a shared session store (ElastiCache/DynamoDB) so any instance can serve any user. Sticky is a crutch for sticky apps you cannot change.</div>
  `,
  traps: [
    "NLB when they need path-based routing or WAF.",
    "ALB when they need a static Elastic IP for a partner firewall allow-list (NLB).",
    "One AZ ASG ‘to save money’ as a production HA design.",
  ],
  quiz: [
    {
      q: "Microservices behind one HTTPS name: /api to ECS, /static to another target, WAF required.",
      choices: ["NLB", "ALB with path rules + WAF", "GWLB", "Route 53 only"],
      answer: 1,
      explain:
        "L7 path routing + WAF is ALB (or CloudFront+ALB). NLB cannot do path rules.",
    },
    {
      q: "A partner must allow-list a fixed IP for a TCP service at high PPS.",
      choices: ["ALB", "NLB with Elastic IP", "S3 website", "API Gateway REST"],
      answer: 1,
      explain: "Static IP + L4 = NLB.",
    },
    {
      q: "Stateless web fleet, keep average CPU near 40%, replace bad instances automatically.",
      choices: [
        "One huge EC2",
        "ASG with target tracking on CPU, 2+ AZs, ELB health checks",
        "Vertical scaling alarm only",
        "Manual AMI copy",
      ],
      answer: 1,
      explain: "Textbook ASG + ELB.",
    },
  ],
});

lesson({
  id: "decoupling",
  order: 18,
  domain: 2,
  minutes: 16,
  title: "Queues, topics, buses, and workflows",
  summary:
    "SQS, SNS, EventBridge, MQ, and Step Functions — loose coupling is Domain 2’s heart.",
  tags: ["sqs", "sns", "eventbridge", "step functions", "mq"],
  body: `
    <p>If the website waits for the email to send, a slow email kills the website. Put a waiting line between them. That is this lesson — queues, topics, and workflows.</p>
    <h2>Why decouple</h2>
    <p>Producers should not fail because consumers are slow. Scale independently. Absorb spikes. Retry without losing messages.</p>
    <div class="table-wrap"><table>
      <tr><th>Service</th><th>Pattern</th><th>Exam cue</th></tr>
      <tr><td>SQS Standard</td><td>Queue, at-least-once, best-effort order</td><td>Buffer, scale consumers, default</td></tr>
      <tr><td>SQS FIFO</td><td>Exactly-once-ish, order per message group</td><td>“Must preserve order,” “exactly once”</td></tr>
      <tr><td>SNS</td><td>Pub/sub fan-out</td><td>One event, many subscribers (Lambda, SQS, HTTP, email)</td></tr>
      <tr><td>EventBridge</td><td>Event bus, rules, SaaS partners, archive/replay, Scheduler</td><td>Many producers/consumers, content filtering, org-wide events, third-party SaaS</td></tr>
      <tr><td>Amazon MQ</td><td>Managed ActiveMQ/Rabbit</td><td>App already speaks JMS/AMQP and cannot change</td></tr>
      <tr><td>Step Functions Standard</td><td>Orchestration, retries, parallel, wait, human approval; exactly-once; up to 1 year</td><td>Workflow spanning Lambda/ECS/EMR; approval waits</td></tr>
      <tr><td>Step Functions Express</td><td>High-rate, at-least-once, short (minutes), cheaper per execution</td><td>IoT/high-volume event pipelines, not long waits</td></tr>
    </table></div>
    <h2>SNS + SQS fan-out</h2>
    <p>Topic → several SQS queues (each with its own DLQ). Classic “fan-out with durability.” EventBridge can replace SNS when you need payload matching or many buses.</p>
    <h2>SQS details that get items right</h2>
    <ul>
      <li><strong>Visibility timeout</strong> ≥ processing time; extend if work is long.</li>
      <li><strong>DLQ</strong> after maxReceiveCount — poison messages.</li>
      <li><strong>Long polling</strong> (WaitTimeSeconds 20) to cut empty receives.</li>
      <li>Lambda event source mapping scales consumers for you.</li>
      <li>FIFO throughput is limited vs Standard; don’t pick FIFO unless order/exactly-once is in the stem.</li>
    </ul>
    <h2>API Gateway</h2>
    <p>Front door for REST/HTTP/WebSocket. Throttling, API keys, usage plans, WAF, Cognito/IAM/Lambda authorizers. Can put SQS/Kinesis directly (decouple clients from Lambda). For “millions of mobile clients, managed API, auth” this is the front.</p>
    <div class="arch">
      <div class="arch-label">Resilient ingest</div>
      <div class="arch-row">
        <div class="arch-box">Clients</div>
        <div class="arch-box solid">API Gateway</div>
        <div class="arch-box">SQS</div>
        <div class="arch-box">Lambda / ECS consumers</div>
        <div class="arch-box">DLQ</div>
      </div>
    </div>
  `,
  traps: [
    "SNS when a durable buffer is required (use SQS; SNS HTTP can drop if the endpoint is down unless you subscribe SQS).",
    "Step Functions when a simple queue would do (over-orchestration).",
    "Amazon MQ for a greenfield serverless app (SQS/EventBridge).",
  ],
  quiz: [
    {
      q: "Upload service spikes 20×. Image processors must not be overwhelmed; no message loss; order doesn’t matter.",
      choices: [
        "Synchronous Lambda per HTTP call only",
        "SQS Standard between API and workers",
        "SNS email to operators",
        "RDS as a queue table",
      ],
      answer: 1,
      explain: "SQS is the buffer. RDS-as-queue is an anti-pattern.",
    },
    {
      q: "Order events must fan out to billing, search, and analytics with independent retry.",
      choices: [
        "One Lambda does all three inline",
        "SNS topic to three SQS queues",
        "S3 website",
        "CloudFront",
      ],
      answer: 1,
      explain: "Fan-out + durable per consumer = SNS→SQS (or EventBridge→SQS).",
    },
    {
      q: "Legacy app uses JMS and cannot be rewritten this quarter.",
      choices: [
        "Amazon MQ",
        "SQS only, no code change guaranteed",
        "DynamoDB Streams",
        "ELB",
      ],
      answer: 0,
      explain: "MQ exists for protocol compatibility. SQS needs AWS SDK.",
    },
  ],
});

lesson({
  id: "serverless-containers",
  order: 19,
  domain: 2,
  minutes: 14,
  title: "Serverless and containers for resilience",
  summary:
    "Lambda, Fargate, ECS, EKS — when each reduces operational load without breaking the workload.",
  tags: ["lambda", "fargate", "ecs", "eks"],
  body: `
    <h2>Lambda</h2>
    <p>Event source: API GW, SQS, S3, DynamoDB Streams, EventBridge, ALB, Kinesis. Scale to concurrency. Limits: 15 minutes, 10 GB memory, package size, ephemeral /tmp. Use EFS for larger shared files, S3 for objects, RDS Proxy for connection storms.</p>
    <p>Failures: retries + DLQ / destination on failure. Idempotency matters (at-least-once). Provisioned concurrency when the stem is “cold starts / consistent latency.”</p>
    <h2>Fargate vs EC2 launch type</h2>
    <p><strong>Fargate</strong> — no AMIs, no ASG of instances, pay per vCPU/GB. Pick for “don’t manage servers,” bursty containers, security isolation per task. <strong>EC2 launch type</strong> — when you need GPUs, extra daemons, persistently cheaper dense packing, or privileged host features.</p>
    <h2>ECS vs EKS</h2>
    <p>ECS: less Kubernetes expertise, AWS-native. EKS: when the stem requires K8s APIs, portability, existing Helm. Both get multi-AZ, ALB Ingress, Fargate profiles. Don’t pick EKS just because it sounds senior if the team has no k8s and ECS fits.</p>
    <h2>Stateless rule</h2>
    <p>Tasks/functions die. Session and uploads go to DynamoDB/S3/EFS. Immutable deploys (new task definition) beat SSH-to-box.</p>
    <div class="callout compare"><strong>Lambda vs Fargate</strong>Short, event-driven, spiky, simple code → Lambda. Long-running process, custom binary, sidecar, >15 min, or existing container image as the unit → Fargate/ECS. Always-on min of many containers can be cheaper on EC2 than huge Lambda — Domain 4.</div>
  `,
  traps: [
    "Lambda for a 2-hour video transcode (use Batch, MediaConvert, ECS, or Step Functions + Fargate).",
    "EKS for a single container with no k8s requirement.",
    "Storing uploads on the container filesystem.",
  ],
  quiz: [
    {
      q: "Image already in ECR, runs 45 minutes, team does not want to patch AMIs.",
      choices: ["Lambda", "ECS on Fargate", "Lightsail", "S3 Object Lambda"],
      answer: 1,
      explain:
        "45 minutes kills Lambda. Fargate runs the container without AMI ops.",
    },
    {
      q: "S3 PutObject should trigger a 30-second thumbnail function, thousands per minute at peak, idle most of the day.",
      choices: [
        "Always-on EC2",
        "Lambda from S3 event",
        "Dedicated Oracle",
        "Direct Connect",
      ],
      answer: 1,
      explain: "Idle-to-spike is Lambda’s pricing and scaling model.",
    },
  ],
});

lesson({
  id: "ha-patterns",
  order: 20,
  domain: 2,
  minutes: 14,
  title: "Multi-AZ, multi-Region, and single points of failure",
  summary:
    "Eliminate SPOFs. Know what is AZ-independent vs what you must place twice.",
  tags: ["ha", "multi-az", "rds proxy", "route53"],
  body: `
    <h2>What AWS already replicates</h2>
    <ul>
      <li>S3, DynamoDB, SQS, SNS, Lambda (the service control plane) — Regional, multi-AZ under the hood.</li>
      <li>ALB/NLB nodes in every AZ you enable.</li>
      <li>Aurora storage: six copies, three AZs.</li>
    </ul>
    <h2>What you must design</h2>
    <ul>
      <li>EC2: ASG min 2 across AZs.</li>
      <li>RDS: Multi-AZ (standby) for HA; read replica is <em>not</em> the HA feature (it is scale/DR). Aurora: extra instances in other AZs.</li>
      <li>NAT, Interface endpoints, RDS Proxy: one per AZ you care about.</li>
      <li>EBS: tied to one AZ. Snapshot to S3 (Regional) then restore in another AZ. EFS if you need multi-AZ files.</li>
    </ul>
    <h2>RDS Proxy</h2>
    <p>Connection pooling for RDS/Aurora, especially Lambda. Faster failover by keeping the app pointed at a stable proxy endpoint. Stem: “many Lambda connections, failover too slow, don’t want to change SQL.”</p>
    <h2>DNS failover</h2>
    <p>Route 53 health checks + failover / latency / weighted / geolocation / geoproximity. Alias to ALB/CloudFront/S3. For active-active two Regions: latency routing + replicated data (Aurora Global, DynamoDB Global Tables, S3 CRR). For active-passive: failover routing + promote replica.</p>
    <h2>Immutable infrastructure</h2>
    <p>Replace, don’t patch in place: new AMI → instance refresh, or new ECS task. Reduces config drift (reliability + ops).</p>
    <h2>Quotas</h2>
    <p>Service quotas can throttle a DR Region you never tested. Request increases in the standby Region <em>before</em> the disaster. Throttling: API GW, Lambda reserved concurrency to protect downstream.</p>
  `,
  traps: [
    "Calling a single-AZ RDS ‘highly available.’",
    "Using a read replica as the only HA mechanism without Multi-AZ (replica lag, manual promote).",
    "One NAT for three AZs as an HA design.",
  ],
  quiz: [
    {
      q: "Aurora PostgreSQL must survive AZ failure with automatic failover and no app SQL changes.",
      choices: [
        "Single instance in one AZ",
        "Aurora with instances in at least two AZs (or RDS Multi-AZ)",
        "SQS in front of the database",
        "CloudFront",
      ],
      answer: 1,
      explain:
        "Multi-AZ database instances. SQS does not make a DB survive AZ loss.",
    },
    {
      q: "Lambda opens too many RDS connections and failover takes too long.",
      choices: [
        "Turn off VPC",
        "Amazon RDS Proxy",
        "Disable Multi-AZ",
        "Put RDS in a public subnet",
      ],
      answer: 1,
      explain: "RDS Proxy pools connections and helps failover.",
    },
  ],
});

lesson({
  id: "disaster-recovery",
  order: 21,
  domain: 2,
  minutes: 16,
  title: "RPO, RTO, and DR strategies",
  summary:
    "Backup-restore, pilot light, warm standby, multi-site. Match strategy to numbers in the stem.",
  tags: ["dr", "rpo", "rto", "pilot light", "aurora global"],
  body: `
    <p><strong>RPO</strong> — how much data you can lose (time). <strong>RTO</strong> — how long you can be down. The exam gives numbers; you pick the cheapest strategy that meets both.</p>
    <div class="table-wrap"><table>
      <tr><th>Strategy</th><th>RTO/RPO</th><th>Cost</th><th>What it looks like on AWS</th></tr>
      <tr><td>Backup and restore</td><td>Hours+</td><td>Lowest</td><td>AWS Backup / S3 / AMI snapshots to another Region; restore after disaster</td></tr>
      <tr><td>Pilot light</td><td>Tens of minutes–hours</td><td>Low</td><td>Core data replicated (RDS replica, DynamoDB GT, S3 CRR); tiny core in DR; scale out on failover</td></tr>
      <tr><td>Warm standby</td><td>Minutes</td><td>Medium</td><td>Scaled-down but running copy; Route 53 failover; maybe Aurora Global with promoted cluster</td></tr>
      <tr><td>Multi-site active/active</td><td>Seconds, RPO ~0</td><td>Highest</td><td>Global Accelerator or latency DNS, DynamoDB Global Tables / Aurora Global, active app in two Regions</td></tr>
    </table></div>
    <h2>Data-layer picks</h2>
    <ul>
      <li>S3 CRR — objects. Versioning on. Replication time control if “minutes SLA.”</li>
      <li>Aurora Global Database — typical RPO &lt; 1s, RTO minutes on promote.</li>
      <li>DynamoDB Global Tables — multi-active, conflict last-writer-wins unless you design around it.</li>
      <li>DMS / ongoing replication for heterogeneous or EC2 databases.</li>
    </ul>
    <h2>Failover mechanics</h2>
    <p>Route 53 health checks, CloudFront origin failover (primary/secondary origins), Global Accelerator endpoint groups. Test with game days; DR that is never failed over is a story, not a design.</p>
    <p>Official Domain 2 knowledge: <strong>service quotas in the standby Region</strong>. Failover that cannot <code>RunInstances</code> or raise Lambda concurrency is not a DR plan. Request quota increases in peacetime (the break/fix playbook covers this).</p>
    <div class="callout trap"><strong>Cheap and zero RPO</strong>You cannot have both. If they demand RPO 0 and lowest cost, pick the cheapest that can still do synchronous or near-sync (often Aurora Global or Multi-AZ in-Region if they only needed AZ). If they demand two Regions and RPO 0, they pay for active-active or Aurora Global, not nightly backups.</div>
  `,
  traps: [
    "Pilot light when RTO is 2 minutes (need warm or active-active).",
    "Nightly backups when RPO is 5 minutes.",
    "Forgetting that Multi-AZ is not Multi-Region DR.",
  ],
  quiz: [
    {
      q: "RPO 24h, RTO 8h, minimize cost, second Region required.",
      choices: [
        "Active-active two Regions",
        "AWS Backup / snapshots copied daily to the second Region",
        "Aurora Global + full-size fleet always on",
        "Three production Regions",
      ],
      answer: 1,
      explain:
        "Loose numbers → backup and restore. Don’t overbuy Global Database.",
    },
    {
      q: "RPO under 1 second, RTO a few minutes, two Regions, SQL MySQL-compatible.",
      choices: [
        "Weekly AMI copy",
        "Aurora Global Database",
        "S3 Standard-IA",
        "SQS FIFO",
      ],
      answer: 1,
      explain: "Aurora Global is the product built for that RPO/RTO pair.",
    },
    {
      q: "Active users in US and EU must write locally with millisecond reads/writes, key-value data.",
      choices: [
        "Single-Region RDS",
        "DynamoDB Global Tables",
        "EFS One Zone",
        "Snowball",
      ],
      answer: 1,
      explain:
        "Global Tables is multi-active key-value. RDS is not a global writer without a lot of pain.",
    },
  ],
});
