/* Official in-scope lookup + leftover compares.
   Service list: AWS SAA-C03 exam guide “In-Scope AWS Services” (non-exhaustive).
   “When” lines are architecture cues, not unofficial miss-rate claims. */

window.SAA.scope = [
  {
    cat: "Analytics",
    svc: "Amazon Athena",
    when: "SQL on files in S3; no warehouse cluster",
  },
  {
    cat: "Analytics",
    svc: "Amazon Data Firehose",
    when: "Capture streaming data and land in S3/OpenSearch/Redshift",
  },
  {
    cat: "Analytics",
    svc: "Amazon EMR",
    when: "Spark/Hadoop cluster you still want managed",
  },
  {
    cat: "Analytics",
    svc: "AWS Glue",
    when: "ETL, crawlers, Data Catalog; CSV→Parquet",
  },
  {
    cat: "Analytics",
    svc: "Amazon Kinesis Data Streams",
    when: "Real-time stream, shards, replay, many consumers",
  },
  {
    cat: "Analytics",
    svc: "AWS Lake Formation",
    when: "Govern who can query the lake (tables/columns)",
  },
  { cat: "Analytics", svc: "Amazon MSK", when: "Kafka API required" },
  {
    cat: "Analytics",
    svc: "Amazon OpenSearch Service",
    when: "Full-text search / log analytics UI",
  },
  {
    cat: "Analytics",
    svc: "Amazon QuickSight",
    when: "BI dashboards on Athena/Redshift/RDS",
  },
  {
    cat: "Analytics",
    svc: "Amazon Redshift",
    when: "Columnar warehouse, BI at scale",
  },
  {
    cat: "Analytics",
    svc: "AWS Data Exchange",
    when: "Subscribe to third-party datasets",
  },
  {
    cat: "Application integration",
    svc: "Amazon SQS",
    when: "Durable buffer; competing consumers",
  },
  {
    cat: "Application integration",
    svc: "Amazon SNS",
    when: "Fan-out to many subscribers",
  },
  {
    cat: "Application integration",
    svc: "Amazon EventBridge",
    when: "Rules, SaaS events, archive/replay, many producers",
  },
  {
    cat: "Application integration",
    svc: "Amazon MQ",
    when: "Existing JMS/AMQP; cannot change the app",
  },
  {
    cat: "Application integration",
    svc: "AWS Step Functions",
    when: "Orchestrate steps, waits, retries, approvals",
  },
  {
    cat: "Application integration",
    svc: "AWS AppSync",
    when: "GraphQL and subscriptions",
  },
  {
    cat: "Application integration",
    svc: "Amazon AppFlow",
    when: "SaaS (Salesforce etc.) → S3/Redshift without custom glue",
  },
  {
    cat: "Cost",
    svc: "AWS Cost Explorer",
    when: "Trends, what changed, RI/SP coverage",
  },
  {
    cat: "Cost",
    svc: "AWS Budgets",
    when: "Alert when spend/usage crosses a line",
  },
  {
    cat: "Cost",
    svc: "Cost and Usage Report",
    when: "Line-item bill in S3 for Athena",
  },
  {
    cat: "Cost",
    svc: "Savings Plans",
    when: "Commit $/hour; Compute SP is the flexible default",
  },
  {
    cat: "Compute",
    svc: "Amazon EC2",
    when: "VMs; custom OS, GPU, steady 24/7",
  },
  {
    cat: "Compute",
    svc: "EC2 Auto Scaling",
    when: "Horizontal scale + health replace across AZs",
  },
  {
    cat: "Compute",
    svc: "AWS Lambda",
    when: "Event, short, idle-friendly; 15 min max",
  },
  { cat: "Compute", svc: "AWS Fargate", when: "Containers, no EC2 to patch" },
  {
    cat: "Compute",
    svc: "AWS Batch",
    when: "Queued jobs, Spot-friendly, no cluster babysitting",
  },
  {
    cat: "Compute",
    svc: "Elastic Beanstalk",
    when: "PaaS web (upload code); least ops among ‘still a web server’",
  },
  {
    cat: "Compute",
    svc: "AWS Outposts",
    when: "AWS racks in your DC; low latency to on-prem",
  },
  { cat: "Compute", svc: "AWS Wavelength", when: "5G edge / carrier PoP" },
  { cat: "Containers", svc: "Amazon ECS", when: "AWS-native containers" },
  {
    cat: "Containers",
    svc: "Amazon EKS",
    when: "Kubernetes is the constraint",
  },
  {
    cat: "Containers",
    svc: "Amazon ECR",
    when: "Image registry; often with a VPC endpoint",
  },
  {
    cat: "Database",
    svc: "Amazon RDS",
    when: "Managed MySQL/Postgres/Oracle/SQL Server/MariaDB",
  },
  {
    cat: "Database",
    svc: "Amazon Aurora",
    when: "MySQL/Postgres-compatible HA storage; Serverless v2; Global DB",
  },
  {
    cat: "Database",
    svc: "Amazon DynamoDB",
    when: "Key-value, ms, huge scale; Global Tables",
  },
  {
    cat: "Database",
    svc: "Amazon ElastiCache",
    when: "Redis (default) or Memcached in front of an app/DB",
  },
  {
    cat: "Database",
    svc: "Amazon Redshift",
    when: "Warehouse (also listed under analytics)",
  },
  { cat: "Database", svc: "Amazon DocumentDB", when: "MongoDB-compatible API" },
  { cat: "Database", svc: "Amazon Neptune", when: "Graph" },
  { cat: "Database", svc: "Amazon Keyspaces", when: "Cassandra API" },
  {
    cat: "Front end",
    svc: "Amazon API Gateway",
    when: "Managed API: keys, usage plans, Cognito, AWS integrations",
  },
  {
    cat: "Front end",
    svc: "AWS Amplify",
    when: "Hosted web/mobile front end + CI; know the name",
  },
  {
    cat: "Front end",
    svc: "AWS Device Farm",
    when: "Real-device test farm; rare, know the name",
  },
  {
    cat: "Machine learning",
    svc: "Amazon Rekognition",
    when: "Images/video: faces, labels, moderation",
  },
  {
    cat: "Machine learning",
    svc: "Amazon Textract",
    when: "Extract text/tables from scans/PDFs",
  },
  {
    cat: "Machine learning",
    svc: "Amazon Comprehend",
    when: "NLP: sentiment, entities, PII in text",
  },
  {
    cat: "Machine learning",
    svc: "Amazon Translate",
    when: "Language translation",
  },
  { cat: "Machine learning", svc: "Amazon Transcribe", when: "Speech → text" },
  { cat: "Machine learning", svc: "Amazon Polly", when: "Text → speech" },
  {
    cat: "Machine learning",
    svc: "Amazon Lex",
    when: "Chatbots (same family as Alexa NLU)",
  },
  {
    cat: "Machine learning",
    svc: "Amazon Kendra",
    when: "Enterprise search over documents",
  },
  {
    cat: "Machine learning",
    svc: "Amazon SageMaker AI",
    when: "Build/train/host custom models; not a ‘pick Rekognition’ stem",
  },
  {
    cat: "Management",
    svc: "Amazon CloudWatch",
    when: "Metrics, logs, alarms, dashboards",
  },
  { cat: "Management", svc: "AWS CloudTrail", when: "Who called which API" },
  {
    cat: "Management",
    svc: "AWS Config",
    when: "Resource inventory + compliance rules",
  },
  {
    cat: "Management",
    svc: "AWS CloudFormation",
    when: "IaC templates; StackSets for every account",
  },
  {
    cat: "Management",
    svc: "AWS Organizations / Control Tower",
    when: "Multi-account + guardrails",
  },
  {
    cat: "Management",
    svc: "AWS Systems Manager",
    when: "Session Manager, Patch, Parameter Store, Fleet Manager",
  },
  {
    cat: "Management",
    svc: "AWS Compute Optimizer",
    when: "Right-size EC2/EBS/Lambda/ASG before buying a plan",
  },
  {
    cat: "Management",
    svc: "AWS Trusted Advisor",
    when: "Checks; full cost/security needs Business+ Support",
  },
  {
    cat: "Management",
    svc: "AWS Service Catalog",
    when: "Only launch approved products",
  },
  { cat: "Management", svc: "AWS License Manager", when: "Track BYOL" },
  {
    cat: "Management",
    svc: "AWS Health Dashboard",
    when: "AWS-side incidents affecting you",
  },
  {
    cat: "Management",
    svc: "Amazon Managed Grafana / Prometheus",
    when: "Existing Grafana/Prom observability; know the name",
  },
  {
    cat: "Management",
    svc: "AWS X-Ray",
    when: "Trace a request across microservices",
  },
  {
    cat: "Management",
    svc: "AWS Well-Architected Tool",
    when: "Review a workload against pillars",
  },
  {
    cat: "Media",
    svc: "Amazon Elastic Transcoder / Kinesis Video",
    when: "Video convert / video ingest; know the name, don’t over-pick",
  },
  {
    cat: "Migration",
    svc: "AWS Application Migration Service (MGN)",
    when: "Lift-and-shift VMs",
  },
  {
    cat: "Migration",
    svc: "AWS DMS (+ SCT)",
    when: "Database replica/cutover; SCT if engine changes",
  },
  {
    cat: "Migration",
    svc: "AWS DataSync",
    when: "NFS/SMB copy job over WAN/DX",
  },
  {
    cat: "Migration",
    svc: "AWS Snow Family",
    when: "Petabytes; WAN cannot finish in time",
  },
  {
    cat: "Migration",
    svc: "AWS Transfer Family",
    when: "SFTP/FTPS/FTP into S3/EFS",
  },
  {
    cat: "Networking",
    svc: "Amazon VPC",
    when: "Your network; subnets, routes, SG, NACL",
  },
  {
    cat: "Networking",
    svc: "Elastic Load Balancing",
    when: "ALB HTTP/WAF; NLB static IP/TCP/UDP; GWLB appliances",
  },
  {
    cat: "Networking",
    svc: "Amazon CloudFront",
    when: "HTTP cache at the edge; OAC to private S3",
  },
  {
    cat: "Networking",
    svc: "AWS Global Accelerator",
    when: "Anycast TCP/UDP; no cache",
  },
  {
    cat: "Networking",
    svc: "Amazon Route 53",
    when: "DNS policies + health checks; alias to ALB/CF",
  },
  {
    cat: "Networking",
    svc: "AWS Transit Gateway",
    when: "Many VPCs + hybrid hub",
  },
  {
    cat: "Networking",
    svc: "AWS PrivateLink",
    when: "Consume a service; overlapping CIDR OK",
  },
  {
    cat: "Networking",
    svc: "AWS Direct Connect",
    when: "Consistent hybrid bandwidth; DX Gateway to many VPCs/Regions",
  },
  {
    cat: "Networking",
    svc: "Site-to-Site VPN / Client VPN",
    when: "Encrypted internet hybrid / remote humans",
  },
  {
    cat: "Security",
    svc: "IAM / IAM Identity Center",
    when: "AWS principals; workforce SSO",
  },
  {
    cat: "Security",
    svc: "Amazon Cognito",
    when: "App users (user pool) and temp AWS keys (identity pool)",
  },
  {
    cat: "Security",
    svc: "AWS KMS",
    when: "Customer-managed keys; key policies; rotation",
  },
  {
    cat: "Security",
    svc: "AWS Certificate Manager",
    when: "TLS on ALB/CloudFront/API GW; auto-renew; CloudFront cert in us-east-1",
  },
  {
    cat: "Security",
    svc: "AWS Secrets Manager",
    when: "Secrets + managed RDS rotation",
  },
  {
    cat: "Security",
    svc: "AWS WAF / Shield / Firewall Manager",
    when: "L7 rules / DDoS / org-wide WAF-SG-Shield policy",
  },
  {
    cat: "Security",
    svc: "Amazon GuardDuty / Inspector / Macie",
    when: "Threat findings / CVE scan / PII in S3",
  },
  {
    cat: "Security",
    svc: "AWS Security Hub / Detective / Audit Manager",
    when: "Scoreboard / investigate / evidence collection",
  },
  {
    cat: "Security",
    svc: "AWS Artifact",
    when: "AWS’s own compliance reports, not your app design",
  },
  { cat: "Security", svc: "AWS RAM", when: "Share subnets/TGW inside the org" },
  {
    cat: "Security",
    svc: "AWS Directory Service",
    when: "Managed AD / AD Connector for WorkSpaces/FSx/Windows",
  },
  {
    cat: "Security",
    svc: "AWS Network Firewall",
    when: "VPC IDS/IPS / domain allow-lists",
  },
  {
    cat: "Security",
    svc: "AWS CloudHSM",
    when: "Single-tenant HSM when KMS is not enough (FIPS/exclusive control)",
  },
  {
    cat: "Storage",
    svc: "Amazon S3 / Glacier classes",
    when: "Object; lifecycle; Intelligent-Tiering if unknown",
  },
  {
    cat: "Storage",
    svc: "Amazon EBS",
    when: "Disk on EC2; gp3 default; io2 for SAN-like; one AZ",
  },
  {
    cat: "Storage",
    svc: "Amazon EFS",
    when: "Linux NFS, multi-AZ, many mounts",
  },
  {
    cat: "Storage",
    svc: "Amazon FSx",
    when: "Windows/SMB, Lustre+S3, NetApp ONTAP, OpenZFS",
  },
  {
    cat: "Storage",
    svc: "AWS Backup",
    when: "Central backup plans + restore tests across services",
  },
  {
    cat: "Storage",
    svc: "AWS Storage Gateway",
    when: "On-prem NFS/SMB/iSCSI/tape that must keep talking",
  },
];

lesson({
  id: "in-scope-map",
  order: 5.5,
  domain: 0,
  minutes: 10,
  title: "Official in-scope catalog",
  summary:
    "The exam guide’s in-scope list, as pick-when cues. Filterable copy lives under Tools → In-scope map.",
  tags: ["exam guide", "in-scope", "services"],
  body: `
    <div class="source-note"><strong>Official, and incomplete on purpose.</strong> AWS says the in-scope list is non-exhaustive and can change. This is a study index, not a promise that every row appears on your form. Out-of-scope examples in the same guide include things like Braket and most IoT — don’t study those for SAA-C03.</div>
    <p>Open the <a href="#/scope">filterable in-scope map</a> and search a stem noun (Textract, MQ, Outposts). If you cannot say the one-line “when,” you are not ready for that item.</p>
    <h2>How to use the catalog</h2>
    <ul>
      <li><strong>Purpose-built ML:</strong> the stem describes the job (faces, OCR, sentiment, speech). Pick Rekognition / Textract / Comprehend / Transcribe / Translate / Polly / Lex / Kendra. SageMaker is when they are <em>building a model</em>, not calling a managed AI API.</li>
      <li><strong>Purpose-built data:</strong> Mongo API → DocumentDB. Graph → Neptune. Cassandra → Keyspaces. Search → OpenSearch. Warehouse → Redshift. SQL on the lake → Athena.</li>
      <li><strong>Hybrid compute:</strong> Outposts = AWS in your DC. Wavelength = 5G edge. Local Zones = metro latency (foundations lesson). VMware Cloud on AWS is in-scope by name — pick it only if VMware is the constraint.</li>
      <li><strong>Don’t overfit rare names:</strong> Device Farm, Elastic Transcoder, AppFlow, Grafana/Prometheus show up as “which service does this job,” not as deep configuration.</li>
    </ul>
    <p>Continue the path: IAM next. Come back to this catalog when a practice question names a service you skipped.</p>
  `,
  traps: [
    "Treating the in-scope list as a permission to memorize every API.",
    "Picking SageMaker when the stem is ‘detect faces in uploaded images’ (Rekognition).",
    "Studying out-of-scope IoT/quantum because a blog listed them.",
  ],
  quiz: [
    {
      q: "Invoices as PDFs; extract tables into a database with least custom ML.",
      choices: [
        "Amazon Textract",
        "Amazon Polly",
        "AWS Snowball as the OCR engine",
        "Route 53",
      ],
      answer: 0,
      explain:
        "OCR/tables from documents is Textract. Polly is speech. Don’t train SageMaker for a solved AWS API.",
    },
    {
      q: "Existing app speaks AMQP and cannot be rewritten. Buffer between producers and consumers.",
      choices: [
        "Amazon MQ",
        "Rewrite to SQS this sprint even though they forbade app changes",
        "CloudFront",
        "Neptune",
      ],
      answer: 0,
      explain:
        "Cannot change the app + AMQP/JMS → Amazon MQ. SQS is the greenfield default.",
    },
    {
      q: "Need AWS hardware in the corporate data center for latency to factory systems.",
      choices: [
        "AWS Outposts",
        "CloudFront as a factory PLC",
        "S3 Transfer Acceleration for the PLC protocol",
        "Lightsail",
      ],
      answer: 0,
      explain:
        "Outposts is the in-DC AWS rack. Wavelength is 5G. Local Zones are AWS metro, not your DC.",
    },
  ],
});

window.SAA.extras = window.SAA.extras || {};
window.SAA.extras["in-scope-map"] = {
  cues: [
    { if: "faces / image labels", then: "Rekognition" },
    { if: "OCR / forms / PDF tables", then: "Textract" },
    { if: "sentiment / entities in text", then: "Comprehend" },
    { if: "JMS/AMQP cannot change app", then: "Amazon MQ" },
    { if: "AWS in our data center", then: "Outposts" },
    { if: "approved products only", then: "Service Catalog" },
  ],
  exam: `<p>These are vocabulary-plus-constraint items. If the stem is a managed AI job, pick the named AI service, not SageMaker and not a from-scratch EC2 model.</p>`,
  job: `<p>Keep a personal ‘when not to use’ list. Most production mistakes are using RDS as a warehouse or EC2 as a queue.</p>`,
};

const _X = window.SAA.extras;
const _rel = {
  "s3-storage": ["storage", "glacier", "s3-share"],
  "block-file-storage": ["storage"],
  "vpc-security": ["endpoints", "hybrid"],
  "vpc-mental-model": ["endpoints", "hybrid"],
  "iam-core": ["iam-pol"],
  "iam-roles-federation": ["iam-pol", "cognito"],
  "elb-autoscaling": ["lb", "front-door"],
  decoupling: ["msg"],
  "disaster-recovery": ["dr"],
  "compute-cost": ["buy"],
  "network-cost": ["endpoints"],
  "rds-aurora": ["db"],
  "dynamodb-nosql": ["db", "ddb-access"],
  caching: ["edge"],
  "network-performance": ["edge", "hybrid"],
  "migration-data": ["move-data"],
  "app-edge-security": ["detect"],
  "apigw-appsync": ["front-door"],
  "high-miss": ["endpoints", "cognito", "ddb-access"],
  "secrets-app-config": ["cognito"],
};
for (const [id, compares] of Object.entries(_rel)) {
  if (_X[id]) _X[id].compares = compares;
}

window.SAA.compares.push(
  {
    id: "nat-types",
    title: "NAT gateway vs NAT instance",
    intro: "Official Domain 4 skill: pick NAT gateway type. Managed vs DIY.",
    table: `<table><tr><th></th><th>NAT gateway</th><th>NAT instance</th></tr>
      <tr><td>Ops</td><td>Managed, scales</td><td>You patch an AMI; bottleneck</td></tr>
      <tr><td>HA</td><td>One per AZ you care about</td><td>You build it (ASG + failover scripts)</td></tr>
      <tr><td>Security group on the NAT</td><td>No</td><td>Yes</td></tr>
      <tr><td>Default exam pick</td><td>Production, least ops</td><td>Tiny/dev, or they explicitly want an instance</td></tr></table>`,
    rule: "Production + HA → NAT gateway per AZ. Cost-only lab with ops OK → instance can appear. S3/DynamoDB from that VPC → gateway endpoint, not more NAT.",
  },
  {
    id: "cache-svc",
    title: "CloudFront vs ElastiCache vs DAX vs replica",
    intro: "Four different layers. The protocol in the stem picks the product.",
    table: `<table><tr><th>Layer</th><th>Product</th></tr>
      <tr><td>HTTP to users</td><td>CloudFront (± Functions / Lambda@Edge)</td></tr>
      <tr><td>App objects/sessions in VPC</td><td>ElastiCache Redis (default) or Memcached</td></tr>
      <tr><td>DynamoDB microsecond</td><td>DAX</td></tr>
      <tr><td>SQL read scale</td><td>RDS/Aurora read replica (not a cache)</td></tr></table>`,
    rule: "MySQL protocol → not CloudFront. DynamoDB → DAX not generic Redis unless they already cache in the app.",
  },
  {
    id: "ml-pick",
    title: "Managed ML APIs vs SageMaker",
    intro:
      "In-scope ML is mostly ‘which API matches the sentence.’ SageMaker is custom model work.",
    table: `<table><tr><th>Stem</th><th>Service</th></tr>
      <tr><td>Faces, labels, celebrity, moderation</td><td>Rekognition</td></tr>
      <tr><td>OCR, forms, tables from PDFs</td><td>Textract</td></tr>
      <tr><td>Sentiment, entities, PII in text</td><td>Comprehend</td></tr>
      <tr><td>Speech to text / text to speech</td><td>Transcribe / Polly</td></tr>
      <tr><td>Translate language</td><td>Translate</td></tr>
      <tr><td>Chatbot NLU</td><td>Lex</td></tr>
      <tr><td>Search company documents</td><td>Kendra</td></tr>
      <tr><td>Train/host our model</td><td>SageMaker</td></tr></table>`,
    rule: "If AWS already sells that API, don’t build it on EC2 or SageMaker unless the stem says custom model.",
  },
);

window.SAA.glossary.push(
  {
    t: "NAT instance",
    d: "EC2-based NAT. You manage it. Contrast NAT gateway (managed). Official cost-domain comparison.",
  },
  {
    t: "Requester Pays",
    d: "S3 setting: downloader pays transfer. Data-set sharing. Domain 4 access option.",
  },
  {
    t: "Service Catalog",
    d: "Launch only approved CloudFormation/products. Multi-account governance.",
  },
  { t: "Outposts", d: "AWS-operated racks in your data center." },
  {
    t: "Textract",
    d: "OCR and form/table extraction. Not Polly, not Rekognition.",
  },
);

bank({
  domain: 4,
  q: "Dev VPC, tiny egress, team will patch a box, minimize NAT hourly cost. Production later will need HA.",
  choices: [
    "NAT instance now is acceptable if the stem is cost-first for nonprod; production HA still wants NAT gateways per AZ",
    "One NAT gateway in one AZ is always HA",
    "NAT is never needed if you have an internet gateway on a private subnet",
    "CloudTrail replaces NAT",
  ],
  answer: 0,
  explain:
    "NAT instance can be the cheap nonprod answer. Private subnet + IGW without NAT still cannot initiate outbound IPv4 the way people think. HA prod = NAT GW per AZ.",
});
bank({
  domain: 3,
  q: "Need to rewrite a URL at CloudFront on every viewer request with microseconds of overhead.",
  choices: [
    "CloudFront Functions",
    "A fleet of NAT gateways",
    "AWS Backup",
    "Snowball Edge as a CDN",
  ],
  answer: 0,
  explain:
    "CloudFront Functions = lightweight viewer-stage. Lambda@Edge is the heavier origin/viewer option.",
});
bank({
  domain: 1,
  q: "Org wants developers in member accounts to launch only a blessed three-tier template.",
  choices: [
    "AWS Service Catalog products (often with Control Tower)",
    "Email a wiki of console clicks",
    "Disable CloudTrail so they cannot be audited",
    "Public AMIs from the internet with AdministratorAccess",
  ],
  answer: 0,
  explain:
    "Service Catalog is the approved-product gate. SCPs can also deny rogue APIs.",
});
bank({
  domain: 3,
  q: "Factory PLCs cannot tolerate Region latency. Need AWS compute in the factory DC.",
  choices: [
    "AWS Outposts",
    "CloudFront Functions running ladder logic",
    "S3 Standard in eu-west-1 only",
    "Amazon Rekognition",
  ],
  answer: 0,
  explain:
    "Outposts brings AWS into the DC. Wavelength is 5G. Local Zones are AWS facilities in a metro.",
});
