lesson({
  id: "observability",
  order: 22,
  domain: 2,
  minutes: 14,
  title: "CloudWatch, logs, alarms, and X-Ray",
  summary:
    "If you cannot see it, you cannot operate it. The exam tests which telemetry product matches the question.",
  tags: ["cloudwatch", "x-ray", "alarms", "logs"],
  body: `
    <div class="table-wrap"><table>
      <tr><th>Need</th><th>Product</th></tr>
      <tr><td>Metrics, dashboards, alarms (CPU, ALB 5xx, custom)</td><td>CloudWatch Metrics + Alarms</td></tr>
      <tr><td>App/system log files, retention, metric filters</td><td>CloudWatch Logs</td></tr>
      <tr><td>Who called which AWS API</td><td>CloudTrail</td></tr>
      <tr><td>Resource config history / “is this bucket public?”</td><td>Config</td></tr>
      <tr><td>Distributed trace across APIs/Lambda/ECS</td><td>X-Ray</td></tr>
      <tr><td>Synthetics canaries hitting a URL</td><td>CloudWatch Synthetics</td></tr>
      <tr><td>On-box memory/disk (not default EC2 hypervisor metrics)</td><td>CloudWatch agent</td></tr>
    </table></div>
    <p>Alarms: metric + threshold + action (SNS, ASG, EC2 recover). Composite alarms exist. Use anomaly detection when the stem says “seasonal traffic, don’t hard-code 80%.”</p>
    <p>Logs: never infinite retention on noisy debug in prod unless you like the bill. Metric filters turn “ERROR” into a number you can alarm on.</p>
    <p>X-Ray: service map, latency segments. Stem: “find which microservice is slow.” Not a replacement for CloudTrail.</p>
    <div class="callout compare"><strong>Recover vs reboot</strong>CloudWatch alarm action “recover” moves a failed instance onto new hardware (EBS-backed). StatusCheckFailed_System. That’s HA-adjacent, not a full Multi-AZ design.</div>
  `,
  traps: [
    "CloudTrail when they asked for CPU alarms.",
    "X-Ray when they asked who created an IAM user (CloudTrail).",
    "Assuming memory is in basic EC2 metrics without the agent.",
  ],
  quiz: [
    {
      q: "Need an email when ALB 5XX exceeds 1% for 5 minutes.",
      choices: [
        "CloudWatch alarm on ALB metrics → SNS",
        "AWS Artifact",
        "S3 Inventory",
        "Macie",
      ],
      answer: 0,
      explain: "ALB publishes 5XX metrics. Alarm + SNS is the pager.",
    },
    {
      q: "A checkout request touches API Gateway, Lambda, and DynamoDB. Users say it is slow. First tool to see where time is spent?",
      choices: [
        "AWS X-Ray",
        "AWS Artifact",
        "S3 Object Lock",
        "Direct Connect",
      ],
      answer: 0,
      explain: "Tracing across services is X-Ray.",
    },
    {
      q: "Who created a security group last night?",
      choices: [
        "CloudWatch CPU metric",
        "CloudTrail",
        "CloudFront",
        "EBS snapshot",
      ],
      answer: 1,
      explain: "API audit = CloudTrail.",
    },
  ],
});

lesson({
  id: "cloudformation",
  order: 23,
  domain: 2,
  minutes: 12,
  title: "CloudFormation and immutable infrastructure",
  summary:
    "The exam’s IaC. Repeatable environments, drift, StackSets across accounts.",
  tags: ["cloudformation", "iac", "stacksets"],
  body: `
    <p><strong>CloudFormation</strong> is in scope. CDK/CodePipeline deep trivia is not. You should know: templates declare resources; stacks are living deployments; change sets preview; rollback on failure; drift detection vs Config.</p>
    <ul>
      <li><strong>Parameters / mappings / outputs</strong> — same template, different env.</li>
      <li><strong>Nested stacks / modules</strong> — share a VPC stack, app stacks consume outputs (or SSM params).</li>
      <li><strong>StackSets</strong> — org-wide GuardDuty, Config, baseline IAM. Stem: “deploy this to every account/Region.”</li>
      <li><strong>Deletion policy / retain</strong> — don’t wipe a prod database on stack delete.</li>
      <li><strong>Custom resources / macros</strong> — rare; don’t pick unless the stem needs logic CFN cannot do.</li>
    </ul>
    <p>Immutable: new AMI → new launch template version → instance refresh or new ASG. Don’t SSH-mutate prod. Elastic Beanstalk and ECS rolling/blue-green are the same idea.</p>
    <div class="callout tip"><strong>Vs click-ops</strong>“Least operational overhead to copy this architecture to three environments” → template/Stack, not a 40-page wiki of console clicks.</div>
  `,
  traps: [
    "Picking CodeBuild as the architecture for a VPC (wrong layer).",
    "Deleting a stack that contains RDS without a retain policy.",
  ],
  quiz: [
    {
      q: "Security baseline (Config + GuardDuty) must be deployed to every existing and future Organization account.",
      choices: [
        "Click each account this once",
        "CloudFormation StackSets (often via Control Tower/Customizations)",
        "A public S3 bucket of screenshots",
        "WAF",
      ],
      answer: 1,
      explain:
        "StackSets (or Control Tower) are the org-scale deploy. Screenshots are not IaC.",
    },
    {
      q: "Same web stack needed in dev/test/prod with different instance sizes.",
      choices: [
        "One snowflake prod and hope",
        "One CloudFormation template with parameters per environment",
        "Email JSON to interns",
        "Macie",
      ],
      answer: 1,
      explain: "Parameterized templates are the copy-paste-resistant design.",
    },
  ],
});

lesson({
  id: "systems-manager",
  order: 14,
  domain: 1,
  minutes: 12,
  title: "Systems Manager: Session Manager, Patch, Parameter Store",
  summary:
    "Operate EC2 without SSH, patch fleets, store config. Heavy on both security and ops stems.",
  tags: ["ssm", "session manager", "patch manager", "parameter store"],
  body: `
    <ul>
      <li><strong>Session Manager</strong> — interactive shell/port forward, IAM auth, CloudTrail/logging to S3/CloudWatch. No inbound 22. Needs SSM agent + instance role <code>AmazonSSMManagedInstanceCore</code> + connectivity (NAT or <em>interface endpoints</em> for SSM/ec2messages/ssmmessages).</li>
      <li><strong>Patch Manager</strong> — baselines, maintenance windows, “patch all Amazon Linux in prod at 03:00.” Inventory + compliance.</li>
      <li><strong>Run Command / Automation</strong> — fleet actions, AMI bake, disaster runbooks.</li>
      <li><strong>Parameter Store</strong> — Standard vs Advanced (size, policies, higher throughput). SecureString uses KMS. Hierarchical <code>/app/prod/db</code>.</li>
      <li><strong>State Manager</strong> — desired state (agent config) continuously.</li>
      <li><strong>Hybrid</strong> — SSM on on-prem VMs with activation codes. Stem: “patch on-prem and EC2 the same way.”</li>
    </ul>
    <div class="callout compare"><strong>Bastion vs SSM</strong>Bastion if they still require SSH and a jump host. SSM if “no inbound, least ops, audit who ran what.” Exam default is SSM.</div>
  `,
  traps: [
    "Opening 22 to 0.0.0.0/0 ‘because SSM is hard.’",
    "Forgetting VPC endpoints when private instances have no NAT and must use SSM.",
  ],
  quiz: [
    {
      q: "Private instances, no NAT, must use Session Manager.",
      choices: [
        "Open SSH to the world",
        "Interface VPC endpoints for SSM, ssmmessages, and ec2messages + instance profile",
        "A Classic Load Balancer on 22",
        "GuardDuty",
      ],
      answer: 1,
      explain:
        "Three SSM endpoints (plus agent + role) when there is no outbound internet.",
    },
    {
      q: "Need a managed weekly OS patch process for 200 EC2s and 50 on-prem VMs.",
      choices: [
        "SSH for-loop",
        "SSM Patch Manager (hybrid activations for on-prem)",
        "S3 lifecycle",
        "CloudFront",
      ],
      answer: 1,
      explain: "Patch Manager covers hybrid. A for-loop is not least ops.",
    },
  ],
});

lesson({
  id: "route53-deep",
  order: 34,
  domain: 3,
  minutes: 12,
  title: "Route 53 policies, alias, and health checks",
  summary:
    "DNS is how you fail over, send users to the closest Region, and hide ALBs behind a zone apex.",
  tags: ["route53", "failover", "latency", "alias"],
  body: `
    <ul>
      <li><strong>Alias</strong> — zone apex to ALB, CloudFront, S3 website, API Gateway, NLB. No extra Route 53 per-query charge like a CNAME at the apex (apex CNAME isn’t valid in DNS anyway).</li>
      <li><strong>Simple</strong> — one record.</li>
      <li><strong>Failover</strong> — primary/secondary + health check. Active-passive DR.</li>
      <li><strong>Latency</strong> — send user to the Region with lowest latency. Active-active needs data replication.</li>
      <li><strong>Geolocation / geoproximity</strong> — country or bias. Data residency or “EU users to eu-west-1.”</li>
      <li><strong>Weighted</strong> — canaries, 10% to new stack.</li>
      <li><strong>Multivalue</strong> — returns healthy IPs, not a full load balancer.</li>
    </ul>
    <p>Health checks: HTTP/TCP against an endpoint, or CloudWatch alarm, or calculated. Private endpoints need a different pattern (often ALB health + failover at a higher layer, or custom).</p>
    <p>Private hosted zones associated to VPCs. Split-horizon: same name, different answers inside vs outside.</p>
    <p>Resolver endpoints: inbound (on-prem queries VPC names), outbound (VPC queries on-prem). Forwarding rules shared with RAM.</p>
  `,
  traps: [
    "Latency routing without replicating data — users hit an empty Region.",
    "CNAME at the zone apex instead of alias.",
    "Multivalue as a substitute for an ALB in a serious web app.",
  ],
  quiz: [
    {
      q: "example.com (apex) must point at an ALB.",
      choices: [
        "CNAME at the apex",
        "Route 53 alias A record to the ALB",
        "TXT only",
        "MX to the ALB",
      ],
      answer: 1,
      explain:
        "Alias at the apex. CNAME at apex is not how you do this on Route 53.",
    },
    {
      q: "Active-passive two Regions; promote the secondary when the primary ALB fails health checks.",
      choices: [
        "Failover routing policy + health check",
        "Simple routing to both at once with no health check",
        "Geolocation to Antarctica",
        "WAF",
      ],
      answer: 0,
      explain: "Failover policy is active-passive DNS.",
    },
  ],
});

lesson({
  id: "migration-data",
  order: 35,
  domain: 3,
  minutes: 14,
  title: "Migration: MGN, DMS, DataSync, Snow, Transfer, Storage Gateway",
  summary:
    "How data and servers actually get to AWS. The exam names the tool that matches the constraint.",
  tags: [
    "mgn",
    "dms",
    "datasync",
    "snow",
    "transfer family",
    "storage gateway",
  ],
  body: `
    <div class="table-wrap"><table>
      <tr><th>Constraint</th><th>Tool</th></tr>
      <tr><td>Lift-and-shift many VMs, block-level, cutover</td><td>Application Migration Service (MGN)</td></tr>
      <tr><td>Database ongoing replication, homogeneous or hetero</td><td>DMS (+ SCT if engine change)</td></tr>
      <tr><td>NFS/SMB job, incremental, over WAN/DX</td><td>DataSync</td></tr>
      <tr><td>Petabytes, WAN too small or too expensive</td><td>Snow Family</td></tr>
      <tr><td>Partners upload via SFTP/FTPS/FTP</td><td>Transfer Family (into S3/EFS)</td></tr>
      <tr><td>On-prem apps keep NFS/SMB/iSCSI/tape, data in AWS</td><td>Storage Gateway (File / Volume / Tape)</td></tr>
      <tr><td>VM import one-off</td><td>VM Import/Export (less common than MGN)</td></tr>
    </table></div>
    <p><strong>Storage Gateway flavors:</strong> File → S3 objects. Volume cached → hot block locally, all in S3 snapshots. Volume stored → entire dataset on-prem, snapshots to AWS. Tape → VTL to S3/Glacier.</p>
    <p><strong>DMS:</strong> full load + CDC. Homogeneous (MySQL→MySQL) can also use native replica. Heterogeneous needs SCT for schema. Don’t use DMS as the long-term query engine.</p>
    <div class="callout trap"><strong>DataSync vs Gateway</strong>DataSync is a <em>transfer job</em> (migrate, periodic sync). Gateway is an <em>ongoing protocol front</em> so old apps don’t change. Snow is when the network is the bottleneck.</div>
  `,
  traps: [
    "Snowball for a 20 GB database (just encrypt and copy).",
    "Storage Gateway when they only needed a one-time NFS copy (DataSync).",
    "DMS to migrate a static website.",
  ],
  quiz: [
    {
      q: "200 TB Hadoop directory, 2-week deadline, 100 Mbps MPLS.",
      choices: [
        "VPN copy and hope",
        "AWS Snow Family",
        "Email USB to a friend",
        "CloudFront invalidation",
      ],
      answer: 1,
      explain: "WAN math fails; Snow is the offline path.",
    },
    {
      q: "On-prem Windows app must keep SMB; files should age into S3.",
      choices: [
        "FSx in AWS only, rewrite the app this week",
        "File Gateway (Storage Gateway)",
        "Neptune",
        "WAF",
      ],
      answer: 1,
      explain: "File Gateway presents SMB/NFS and stores objects in S3.",
    },
    {
      q: "Oracle to Aurora PostgreSQL with ongoing replication until cutover.",
      choices: [
        "SCT + DMS",
        "S3 Transfer Acceleration only",
        "GuardDuty",
        "AMI copy of the Oracle host as the complete answer",
      ],
      answer: 0,
      explain: "Heterogeneous: convert schema (SCT), replicate data (DMS).",
    },
  ],
});

lesson({
  id: "apigw-appsync",
  order: 24,
  domain: 2,
  minutes: 12,
  title: "API Gateway and AppSync",
  summary:
    "Managed fronts for HTTP/WebSocket/GraphQL. Auth, throttling, and when an ALB is enough.",
  tags: ["api gateway", "appsync", "cognito", "throttling"],
  body: `
    <ul>
      <li><strong>HTTP API</strong> — cheaper, simpler JWT/IAM, Lambda/ALB integrations. Default for new REST-ish APIs.</li>
      <li><strong>REST API</strong> — API keys, usage plans, WAF (also on HTTP now in many Regions), request validation, canary, AWS service integrations (SQS/Kinesis directly), resource policies, mTLS, private APIs in VPC.</li>
      <li><strong>WebSocket API</strong> — chat, push.</li>
      <li><strong>AppSync</strong> — GraphQL, subscriptions, multiple data sources (Dynamo, Lambda, HTTP, RDS). Stem says GraphQL or “clients subscribe to data changes.”</li>
    </ul>
    <p>Auth: IAM, Cognito user pools, Lambda authorizer (custom), JWT on HTTP APIs. Never IAM users per mobile customer.</p>
    <p>Throttling and usage plans protect Dynamo/Lambda. Caching on REST GET. Private API + VPC endpoint when “not on the internet.”</p>
    <p>ALB can front Lambda too, and supports WAF/path routing — pick API Gateway when you need API keys, usage plans, native Cognito, or a fully managed API product. Pick ALB when it’s a VPC web app that happens to have paths.</p>
  `,
  traps: [
    "AppSync for a simple REST that never mentioned GraphQL.",
    "API Gateway as a MySQL proxy.",
    "No throttle + unbounded Lambda → bill shock (and a Domain 4 item).",
  ],
  quiz: [
    {
      q: "Mobile clients need GraphQL and realtime subscriptions into DynamoDB.",
      choices: ["AWS AppSync", "NLB only", "Storage Gateway", "Snowball"],
      answer: 0,
      explain: "GraphQL + subscriptions = AppSync.",
    },
    {
      q: "Partners need API keys, per-key rate limits, and a REST API in front of SQS (no Lambda required).",
      choices: [
        "API Gateway REST with usage plans, integrating to SQS",
        "Public SQS URL on the internet",
        "EFS",
        "Rekognition",
      ],
      answer: 0,
      explain:
        "REST API usage plans + AWS integration to SQS is a classic decouple pattern.",
    },
  ],
});

lesson({
  id: "analytics-extras",
  order: 36,
  domain: 3,
  minutes: 12,
  title: "QuickSight, OpenSearch, Lake Formation, Redshift extras",
  summary:
    "Visualization, search, lake permissions, and warehouse knobs the exam still asks.",
  tags: ["quicksight", "opensearch", "lake formation", "redshift"],
  body: `
    <ul>
      <li><strong>QuickSight</strong> — BI dashboards, SPICE cache, can query Athena/Redshift/RDS. Stem: “business users need dashboards, least servers.”</li>
      <li><strong>OpenSearch Service</strong> — full-text search, log analytics (often Firehose or CloudWatch subscription). Not a transactional DB. Stem: “search products / logs like ELK.”</li>
      <li><strong>Lake Formation</strong> — permissions on Glue catalog / S3 lake, column/row filters. Stem: “analysts can see salary in HR tables, not in other tables.”</li>
      <li><strong>Redshift</strong> — pause/resume, Reserved/Serverless, RA3 with managed storage, Spectrum to S3, COPY from S3, concurrency scaling. Sort/dist keys for performance (high level).</li>
      <li><strong>Glue</strong> — crawlers, ETL jobs, Data Catalog, Iceberg. Don’t stand a permanent EMR cluster if Glue/Athena fits “least ops.”</li>
      <li><strong>EMR</strong> — custom Spark/Hadoop, EMR Serverless exists; pick EMR when they need cluster control, bootstrap, specific frameworks.</li>
    </ul>
  `,
  traps: [
    "RDS as the petabyte lake.",
    "OpenSearch as a substitute for DynamoDB sessions.",
    "QuickSight when they needed a low-latency OLTP API.",
  ],
  quiz: [
    {
      q: "Analysts need row/column permissions on a data lake in S3 already cataloged by Glue.",
      choices: [
        "AWS Lake Formation",
        "Security groups on S3",
        "Shield Advanced",
        "EBS Multi-Attach",
      ],
      answer: 0,
      explain: "Lake Formation is fine-grained lake access.",
    },
    {
      q: "Product search with fuzzy text, managed, not self-built Solr on EC2.",
      choices: [
        "Amazon OpenSearch Service",
        "AWS WAF",
        "ACM",
        "Snowball Edge as a search engine",
      ],
      answer: 0,
      explain: "OpenSearch is the managed search/analytics product.",
    },
  ],
});

lesson({
  id: "directory-identity-hybrid",
  order: 15,
  domain: 1,
  minutes: 10,
  title: "Directory Service and hybrid identity",
  summary:
    "When the stem says Active Directory, FSx, or WorkSpaces-class domain join.",
  tags: ["directory service", "ad connector", "managed microsoft ad"],
  body: `
    <ul>
      <li><strong>AWS Managed Microsoft AD</strong> — real AD in AWS, Multi-AZ, trusts to on-prem. Use with FSx Windows, RDS SQL Server Windows auth, EC2 domain join, some WorkSpaces/AppStream patterns.</li>
      <li><strong>AD Connector</strong> — proxy to on-prem AD, no directory data stored in AWS. Stem: “don’t copy hashes to the cloud, just join/auth against HQ.”</li>
      <li><strong>Simple AD</strong> — Samba-based, limited; rarely the best SA answer anymore.</li>
      <li><strong>Identity Center + external IdP</strong> — workforce AWS Console, not Windows domain join.</li>
      <li><strong>Cognito</strong> — app users, not corporate AD for Windows file servers.</li>
    </ul>
    <div class="callout tip"><strong>Don’t mix</strong>Identity Center is for AWS access. Managed AD is for Windows/Kerberos/SMB. Cognito is for customers. The exam will offer all three.</div>
  `,
  traps: [
    "Cognito user pools as the answer for FSx AD join.",
    "Managed AD when they forbade storing directory data in AWS (AD Connector).",
  ],
  quiz: [
    {
      q: "Workforce laptops use WorkSpaces. Auth must use on-prem AD. The company does not want a writable directory stored in AWS.",
      choices: [
        "AD Connector to on-prem AD",
        "Cognito user pool",
        "GuardDuty",
        "S3 website hosting",
      ],
      answer: 0,
      explain:
        "AD Connector proxies auth to on-prem AD. Cognito is for app/customers. FSx Windows usually wants Managed Microsoft AD or self-managed AD reachable in the VPC — different constraint.",
    },
  ],
});

lesson({
  id: "beanstalk-batch-ml",
  order: 37,
  domain: 3,
  minutes: 10,
  title: "Beanstalk, Batch, and purpose-built ML services",
  summary: "PaaS web, job queues, and ‘don’t build a ML platform.’",
  tags: ["elastic beanstalk", "batch", "rekognition", "sagemaker"],
  body: `
    <p><strong>Elastic Beanstalk</strong> — upload code, AWS runs ASG/ALB/health. Stem: “developers, least infrastructure management, still EC2 underneath.” Not as flexible as ECS; more ops than Lambda. Still in-scope.</p>
    <p><strong>AWS Batch</strong> — queue of jobs, compute env (Spot/Fargate/EC2), retries. Stem: “overnight transcode/analysis, thousands of jobs, don’t manage a scheduler.”</p>
    <p><strong>Purpose-built ML (pick the named service, don’t train a model from scratch unless SageMaker is the stem):</strong></p>
    <ul>
      <li>Images/moderation → Rekognition</li>
      <li>OCR → Textract</li>
      <li>Speech in/out → Transcribe / Polly</li>
      <li>Translate / sentiment / NLP → Translate / Comprehend</li>
      <li>Chatbot → Lex</li>
      <li>Search enterprise docs → Kendra</li>
      <li>Custom train/deploy → SageMaker</li>
    </ul>
    <p>You will not be asked to tune hyperparameters. You will be asked not to stand a GPU farm for “detect objects in an image.”</p>
  `,
  traps: [
    "SageMaker for a simple ‘is this a cat’ when Rekognition fits.",
    "Batch vs Lambda: hours-long jobs and arrays → Batch; 30-second events → Lambda.",
  ],
  quiz: [
    {
      q: "50,000 independent 2-hour video jobs overnight, retry on fail, use Spot.",
      choices: [
        "One Lambda with 2-hour timeout (invalid)",
        "AWS Batch with a Spot compute environment",
        "SNS email the intern",
        "Object Lock",
      ],
      answer: 1,
      explain: "Batch is the job scheduler. Lambda cannot run 2 hours.",
    },
    {
      q: "App must detect whether an uploaded photo contains a face, least ML ops.",
      choices: [
        "Amazon Rekognition",
        "Build a cluster of random GPUs and hire a research team this sprint",
        "Neptune",
        "Direct Connect",
      ],
      answer: 0,
      explain: "Purpose-built. Rekognition DetectFaces is the SA answer.",
    },
  ],
});

lesson({
  id: "flowlogs-nfw-ipv6",
  order: 16,
  domain: 1,
  minutes: 10,
  title: "Flow Logs, Network Firewall, IPv6, and egress",
  summary: "Forensics and extra network controls beyond SGs.",
  tags: ["vpc flow logs", "network firewall", "ipv6", "egress"],
  body: `
    <p><strong>VPC Flow Logs</strong> — accept/reject metadata for ENIs, subnets, or VPC. Destinations: CloudWatch Logs or S3. Not payload. Stem: “which IP is scanning us,” “prove SG dropped it.” Pair with Athena on S3 logs.</p>
    <p><strong>AWS Network Firewall</strong> — managed IDS/IPS, stateful domain lists, deployed via subnet + route tables (often with GWLB-style insertion). Heavier than SGs. Stem: “suricata-like rules, central inspection VPC.”</p>
    <p><strong>IPv6</strong> — dual-stack subnets. Outbound IPv6 uses an <strong>egress-only internet gateway</strong> (IPv6 cannot use NAT GW the same way). Stem: “IPv6 private subnet, outbound only.”</p>
    <p><strong>NAT instance vs NAT gateway</strong> — instance is cheaper/old, you patch it, it is a bottleneck/SPOF unless you HA it yourself. Gateway is managed. Exam: NAT GW unless they demand a NAT instance for a specific reason (or cost of tiny env with a disclaimer).</p>
  `,
  traps: [
    "Flow Logs as a full packet capture (they’re metadata).",
    "NAT gateway for IPv6 egress (egress-only IGW).",
    "Network Firewall for a two-tier app that only needed SGs.",
  ],
  quiz: [
    {
      q: "Prove whether a security group dropped traffic from 203.0.113.5.",
      choices: [
        "VPC Flow Logs",
        "S3 Transfer Acceleration",
        "ACM",
        "QuickSight as a packet sniffer",
      ],
      answer: 0,
      explain: "Flow Logs show ACCEPT/REJECT. Not full packets.",
    },
    {
      q: "IPv6-only private subnet needs outbound internet, no inbound from internet.",
      choices: [
        "NAT gateway",
        "Egress-only internet gateway",
        "Customer gateway",
        "Snowball",
      ],
      answer: 1,
      explain: "IPv6 egress-only IGW is the product.",
    },
  ],
});

lesson({
  id: "practitioner-day",
  order: 46,
  domain: 6,
  minutes: 14,
  title: "How a cloud practitioner actually works",
  summary:
    "Accounts, billing, CLI, tags, tickets — the job around the architecture diagram.",
  tags: ["cli", "billing", "tags", "support", "practitioner"],
  body: `
    <h2>The loop</h2>
    <p>Understand → design (constraints) → implement (IaC) → observe → cost review → improve. SAA tests the design step. Practitioners live in the whole loop.</p>
    <h2>Account and money</h2>
    <ul>
      <li>Root MFA, no root keys, billing alarm (this is also an exam classic), alternate contacts.</li>
      <li>Support: Basic/Developer/Business/Enterprise. Full Trusted Advisor cost/security checks need Business or higher. TAM is Enterprise.</li>
      <li>CLI: <code>aws sts get-caller-identity</code> before you destroy anything. Named profiles, SSO via Identity Center, never keys in shell history if you can avoid it.</li>
      <li>Tags: <code>env</code>, <code>team</code>, <code>service</code>, <code>cost-center</code>. Activate as cost allocation tags.</li>
    </ul>
    <h2>How teams split</h2>
    <p>Platform/network account owns VPC/TGW. App teams get IAM roles and shared subnets (RAM) or their own VPCs peered/TGW. Security owns log-archive, GuardDuty admin, SCPs. You will design this; you will also be the person who opens the ticket when an SCP blocks a release.</p>
    <h2>Change</h2>
    <p>Prod changes go through templates and PRs, not Friday console clicks. Use change sets. Keep a rollback. That is operational excellence, not bureaucracy.</p>
  `,
  traps: [
    "Using root for daily CLI.",
    "Untagged resources and then asking finance ‘why is the bill up.’",
  ],
  quiz: [
    {
      q: "You need the complete Trusted Advisor cost and security checks.",
      choices: [
        "Basic support is enough",
        "Business or Enterprise Support",
        "Only Enterprise has any Trusted Advisor",
        "Trusted Advisor requires Shield Advanced",
      ],
      answer: 1,
      explain:
        "Full checks: Business and above. Some core checks exist on Basic; the exam usually wants Business+ for the full cost/security set.",
    },
    {
      q: "Before running a destructive CLI command, confirm which account and role you are?",
      choices: [
        "aws sts get-caller-identity",
        "aws s3 ls as the only check you ever need",
        "ping 8.8.8.8",
        "Disable CloudTrail so it doesn’t scare you",
      ],
      answer: 0,
      explain:
        "Always know the caller. Destroying prod ‘by profile mix-up’ is a career event.",
    },
  ],
});

lesson({
  id: "operate-cadence",
  order: 47,
  domain: 6,
  minutes: 12,
  title: "Operate: patch, backup drills, Well-Architected, cost cadence",
  summary:
    "Architecture that nobody operates is a slide deck. This is the weekly work.",
  tags: ["well-architected", "backup", "patch", "cost"],
  body: `
    <ul>
      <li><strong>Well-Architected Review</strong> — six pillars, the Tool in AWS, improvement plan. Do it on real workloads, not as a certification slogan.</li>
      <li><strong>Backup</strong> — AWS Backup plans by tag. Restore test into an isolated account. Vault lock for ransomware.</li>
      <li><strong>Patch</strong> — SSM Patch Manager + immutable AMIs (bake, don’t snowflake). Containers: rebuild images, don’t apt-get on a running task.</li>
      <li><strong>Certificates</strong> — ACM auto-renew on ALB/CloudFront. Calendar for imported certs.</li>
      <li><strong>Secrets</strong> — rotation on. Review unused IAM.</li>
      <li><strong>Cost</strong> — weekly Explorer, Budgets, kill nonprod at night, endpoints vs NAT, gp3, INT.</li>
      <li><strong>Incidents</strong> — alarms to a human, runbooks (see Break/fix), post-incident: was it a missing Multi-AZ, a quota, a key policy?</li>
    </ul>
    <p>Free-tier sandbox ≠ production. Production has tags, IaC, alarms, backups, and someone on call. If your study account has none of that, you are only collecting service trivia.</p>
  `,
  traps: [
    "Snapshots that were never restored.",
    "Alarms that email a folder nobody reads.",
  ],
  quiz: [
    {
      q: "A Well-Architected Review’s output should be:",
      choices: [
        "A PDF nobody opens",
        "A prioritized improvement plan (HA, IAM, backups, cost) you actually schedule",
        "A new Region for fun",
        "Disabling MFA",
      ],
      answer: 1,
      explain: "WAFR is a gap list with owners and dates, not a badge.",
    },
  ],
});
