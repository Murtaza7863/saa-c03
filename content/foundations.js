lesson({
  id: "start-here",
  order: 1,
  domain: 0,
  minutes: 8,
  title: "What AWS is (you can start here)",
  summary:
    "A picture of AWS, how this course teaches, and what you do not have to do today.",
  tags: ["beginner", "overview", "pictures", "labs"],
  body: `
    <p>You do not need to know AWS yet. You do not need an account yet. You are not taking the exam today.</p>
    <p>AWS is a company that rents you computers, storage, and networking in buildings around the world. You use a website (the console) or a terminal to say “please run this.” They bill you for what you leave running.</p>

    <div class="arch">
      <div class="arch-label">The whole idea, as a picture</div>
      <div class="arch-row">
        <div class="arch-box solid">You<br><span class="faint">laptop / browser</span></div>
        <div class="arch-box">Internet</div>
        <div class="arch-az">
          <div class="arch-label">An AWS Region (a city of data centers)</div>
          <div class="arch-box">Compute — a rented computer (EC2)</div>
          <div class="arch-box">Storage — a rented disk / bucket (EBS, S3)</div>
          <div class="arch-box">Database — a rented MySQL/Postgres (RDS)</div>
        </div>
      </div>
    </div>
    <p>Later lessons name more boxes. For now: <strong>you</strong> → <strong>internet</strong> → <strong>one Region</strong> → a few rented pieces. That is AWS.</p>

    <h2>How usual courses teach this</h2>
    <p>A good AWS course is not “read a whitepaper” and not “click randomly until it works.” It is usually three layers. This site does the same.</p>
    <div class="arch">
      <div class="arch-row how-learn">
        <div class="arch-col">
          <div class="arch-box solid">1. A picture</div>
          <p>Boxes and arrows so the idea is visible. You already saw one above. Lesson 2 is a bigger map of Regions.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box">2. A short why</div>
          <p>What the picture is for, in plain language. Not every AWS service name on day one.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box">3. Hands-on, when you are ready</div>
          <p>Optional labs in a throwaway account. The exam itself is still multiple-choice — clicking is for you, not for the test paper.</p>
        </div>
      </div>
    </div>
    <p>Video courses (Skill Builder, A Cloud Guru, Cantrill, and similar) show console screenshots and diagrams, then pause for a lab. Exam-cram courses skip the lab and drill questions. You get both here: pictures first, labs when a lesson says so, questions after you have a picture to hang them on.</p>

    <h2>What you will not do today</h2>
    <ul>
      <li>Memorize a passing score or a list of 80 services.</li>
      <li>Open the <a href="#/use">Using AWS</a> checklist and feel behind because it is empty. That page is a later project.</li>
      <li>Pay for NAT gateways or RDS. Labs warn you before anything that costs money.</li>
    </ul>
    <div class="callout tip"><strong>Next</strong>A picture of the world: Regions and Availability Zones. Still no account required.</div>
  `,
  traps: [],
  quiz: [
    {
      q: "Do you need an AWS account before the next lesson?",
      choices: [
        "No. Next is a picture of Regions. An account comes later, if you want a lab.",
        "Yes, or the site will not continue.",
        "Yes, and you should use the root user for everything.",
        "Only if you have already passed the exam.",
      ],
      answer: 0,
      explain:
        "Foundations are pictures and short explanations. Labs are optional and labeled. Empty checklists are normal.",
    },
    {
      q: "How does a typical structured AWS course teach a new idea?",
      choices: [
        "A picture, a short why, then a lab when you are ready",
        "Only leaked exam questions",
        "Only CLI commands on day one, no diagrams",
        "A full whitepaper before any picture",
      ],
      answer: 0,
      explain:
        "Diagram → explanation → optional clicking. This course is built that way on purpose.",
    },
    {
      q: "What is the SAA-C03 exam itself?",
      choices: [
        "Written multiple-choice about design (no live console)",
        "A timed console lab where you create a VPC",
        "SSH into a server AWS gives you",
        "Build a real company website during the test",
      ],
      answer: 0,
      explain:
        "Official format is multiple choice / multiple response. Hands-on is how you learn; it is not the test engine.",
    },
  ],
});

lesson({
  id: "exam-mindset",
  order: 5.4,
  domain: 0,
  minutes: 12,
  title: "How SAA-C03 thinks",
  summary:
    "After you have a map of AWS, here is how the written questions are built. You can come back later.",
  tags: ["exam", "format", "well-architected"],
  body: `
    <p>You already have a picture of Regions, accounts, VPCs, and the service map. The exam is that picture turned into a short story. You pick the design that hits <strong>every</strong> constraint, not the famous one.</p>
    <div class="arch">
      <div class="arch-label">A tiny example (not a real exam item)</div>
      <div class="arch-box" style="margin-bottom:.5rem">Story: a website in one country must stay up if one data center dies. Keep cost reasonable.</div>
      <div class="arch-row">
        <div class="arch-box">One EC2 + an alarm — cheap, dies with the building</div>
        <div class="arch-box solid">Two AZs + a load balancer — the usual answer</div>
        <div class="arch-box">Three Regions active-active — works, costs a lot, stem did not ask</div>
      </div>
    </div>
    <p>That is the whole game: underline the ask, kill answers that miss a constraint, ignore extra services nobody requested.</p>

    <h2>Format (official, for when you sit the test)</h2>
    <p>You can skim this. It is not homework for week one.</p>
    <ul>
      <li>65 questions, 130 minutes. Multiple choice or multiple response. No console.</li>
      <li>50 scored, 15 unscored (unlabeled). Blank = wrong.</li>
      <li>Pass at scaled <strong>720</strong> / 1000, exam as a whole (a weak domain can be saved by a strong one).</li>
      <li>Weights: Security 30%, Resilience 26%, Performance 24%, Cost 20%.</li>
    </ul>
    <p>AWS describes the target candidate as someone with about a year of hands-on <em>design</em>. That is a description, not a gate on this course.</p>

    <h2>Four filters hiding in most items</h2>
    <ol>
      <li><strong>Secure?</strong> Who can do what, private network, encryption.</li>
      <li><strong>Resilient?</strong> Two AZs unless they asked for another Region (disaster recovery, global users).</li>
      <li><strong>Performs?</strong> Right storage, database, cache, edge.</li>
      <li><strong>Costs?</strong> Don’t pay for a second Region if they only asked for HA in one.</li>
    </ol>
    <div class="callout tip"><strong>How to read a stem</strong>Last sentence is the ask. Keywords: <em>least cost, lowest latency, customer-managed keys, cannot change the application</em>. The tempting wrong answer usually gets three of four right.</div>
  `,
  traps: [
    "Picking the most AWS services. Extra services that are not required are wrong.",
    "Picking multi-Region HA when the stem only needs multi-AZ.",
    "Ignoring ‘the application cannot be changed’ — that often forces a queue or proxy instead of a rewrite.",
  ],
  quiz: [
    {
      q: "A question says the company needs 99.99% availability for a regional web app and lowest cost. Which design is the default SAA answer?",
      choices: [
        "One EC2 instance with a detailed CloudWatch alarm",
        "Multi-AZ across at least two Availability Zones, load balanced",
        "Active-active in three AWS Regions",
        "Pilot light in a second Region",
      ],
      answer: 1,
      explain:
        "Regional HA is multi-AZ. Multi-Region is for DR or global latency, and it costs more. The stem did not ask for DR.",
    },
    {
      q: "Passing score and scoring model for SAA-C03?",
      choices: [
        "700, must pass every domain",
        "720, compensatory overall score",
        "800, compensatory",
        "720, must pass security domain",
      ],
      answer: 1,
      explain:
        "720 scaled, compensatory: you pass or fail the exam as a whole.",
    },
    {
      q: "A stem says ‘minimize operational overhead’. What does the exam usually want?",
      choices: [
        "Self-managed software on EC2",
        "A managed or serverless AWS service that still meets the other constraints",
        "Always AWS Lambda, even for a 24/7 stateful Oracle database",
        "Always Kubernetes on EC2",
      ],
      answer: 1,
      explain:
        "Managed/serverless wins when it fits. Lambda is not a universal replacement for stateful commercial databases.",
    },
  ],
});

lesson({
  id: "global-infra",
  order: 2,
  domain: 0,
  minutes: 14,
  title: "Regions, AZs, edges, and blast radius",
  summary:
    "Availability Zone is the HA unit. Region is the DR unit. Edge is the latency unit.",
  tags: ["region", "az", "cloudfront", "route53", "latency"],
  body: `
    <p>This picture is the map the rest of the course sits on. You do not need to memorize every code yet.</p>
    <p>AWS is a hierarchy of failure domains. Get the picture, then the names will stick.</p>
    <h2>Region</h2>
    <p>A geographic area (e.g. <code>us-east-1</code>) with multiple isolated data-center clusters. You pick a Region for latency to users, data residency, service availability, and price. <strong>Most resources do not automatically replicate across Regions.</strong> That is a feature: blast radius stays in one Region unless you design otherwise.</p>
    <h2>Availability Zone (AZ)</h2>
    <p>One or more discrete data centers with independent power, cooling, and networking, connected by fast private fiber. An AZ has a code like <code>us-east-1a</code> — and those letters are <em>randomized per account</em>, so your 1a is not your coworker’s 1a.</p>
    <p><strong>High availability inside a Region = use two or more AZs.</strong> RDS Multi-AZ, ALB, Auto Scaling across subnets, EKS node groups — they all mean “don’t put production in one AZ.”</p>
    <div class="arch">
      <div class="arch-label">One Region, two AZs — the default production picture</div>
      <div class="arch-row">
        <div class="arch-az"><div class="arch-label">AZ A</div><div class="arch-box">Public subnet · ALB node</div><div class="arch-box">Private subnet · EC2</div><div class="arch-box">Private subnet · RDS primary</div></div>
        <div class="arch-az"><div class="arch-label">AZ B</div><div class="arch-box">Public subnet · ALB node</div><div class="arch-box">Private subnet · EC2</div><div class="arch-box">Private subnet · RDS standby</div></div>
      </div>
    </div>
    <h2>Local Zones, Wavelength, Outposts</h2>
    <ul>
      <li><strong>Local Zones</strong> — compute/storage closer to a metro, still attached to a parent Region. Use when single-digit ms to a city matters.</li>
      <li><strong>Wavelength</strong> — 5G edge, ultra-low latency to mobile users.</li>
      <li><strong>Outposts</strong> — AWS racks in <em>your</em> DC for low latency to on-prem or data residency. Hybrid compute, not a replacement for Multi-AZ in-Region HA unless the stem is hybrid.</li>
    </ul>
    <h2>Edge network</h2>
    <p><strong>CloudFront</strong> caches at edge locations. <strong>Route 53</strong> is global DNS (anycast). <strong>Global Accelerator</strong> puts anycast IPs in front of regional ALBs/NLBs and uses the AWS backbone — it does not cache HTTP objects. <strong>IAM, Route 53, CloudFront, WAF (when used with CloudFront)</strong> are global-ish; VPC, EC2, RDS are Regional.</p>
    <h2>S3 durability vs availability</h2>
    <p>S3 Standard is designed for 11 nines durability across at least three AZs in a Region. Durability ≠ “the object is always readable this millisecond.” That distinction shows up when the stem asks for backups vs HA.</p>
  `,
  traps: [
    "Treating Multi-AZ and Multi-Region as synonyms.",
    "Putting a NAT gateway in one AZ and wondering why private subnets in other AZs die with that AZ.",
    "Using CloudFront when the stem is non-HTTP (use Global Accelerator) or using Global Accelerator when the stem is cacheable static content (use CloudFront).",
  ],
  quiz: [
    {
      q: "A database must survive the loss of a data center with RPO of seconds, in one AWS Region. First design to reach for?",
      choices: [
        "S3 Cross-Region Replication",
        "RDS Multi-AZ",
        "AWS Backup to a second Region",
        "A single EC2 with RAID 0",
      ],
      answer: 1,
      explain:
        "Loss of a data center = AZ failure. Multi-AZ synchronous standby is the Regional HA pattern. Cross-Region is DR.",
    },
    {
      q: "Static website, global users, lowest latency for images. Which pair?",
      choices: [
        "S3 + CloudFront",
        "EBS + Global Accelerator",
        "EFS + Route 53 failover",
        "FSx + Transit Gateway",
      ],
      answer: 0,
      explain:
        "Object storage + CDN. Global Accelerator is for accelerating TCP/UDP to origins, not a cache for static files.",
    },
    {
      q: "Why create a NAT gateway in every AZ used by private subnets?",
      choices: [
        "NAT is AZ-scoped; a single NAT is a cross-AZ single point of failure and extra data-processing charges",
        "AWS requires three NATs by default",
        "Security groups only work with local NATs",
        "IAM policies are AZ-specific",
      ],
      answer: 0,
      explain:
        "NAT gateways live in one AZ. HA and cost (cross-AZ data) both argue for one NAT per AZ, or VPC endpoints to avoid NAT.",
    },
  ],
});

lesson({
  id: "shared-waf",
  order: 3,
  domain: 0,
  minutes: 10,
  title: "Shared responsibility and accounts",
  summary:
    "AWS secures the cloud; you secure what you put in it. The line moves with managed services.",
  tags: ["shared responsibility", "iam", "root", "organizations"],
  body: `
    <h2>Shared responsibility</h2>
    <p><strong>AWS:</strong> hardware, hypervisor, Regions/AZs, the managed control plane of a service.</p>
    <p><strong>You:</strong> IAM, guest OS and patches on EC2, security groups, encryption configuration, application code, data classification.</p>
    <p>The line slides: on <strong>EC2</strong> you patch the OS. On <strong>RDS</strong> AWS patches the engine (in a window you choose) but you still configure encryption, networking, and users. On <strong>Lambda / S3 / DynamoDB</strong> there is no guest OS for you. The exam loves “who patches what?”</p>
    <h2>Root user</h2>
    <p>Account root can do anything, including close the account. Lock it: MFA, no daily use, no access keys. Day-to-day work is IAM Identity Center users or IAM roles.</p>
    <h2>One account vs many</h2>
    <p>Production, sandbox, logging, and security tooling should not share one account. <strong>AWS Organizations</strong> groups accounts, centralizes billing, and attaches <strong>SCPs</strong> (guardrails). <strong>Control Tower</strong> is the opinionated landing zone on top (Account Factory, mandatory guardrails). You will do a full lesson on this in Domain 1; here, remember: <em>isolation of blast radius</em> is an account-level decision, not only a VPC-level one.</p>
    <div class="callout compare"><strong>SCP vs IAM</strong>An SCP can never grant more than IAM allows. It can only shrink the ceiling. “Allow s3:* in IAM” plus “Deny s3:Delete* in SCP” means deletes are blocked, even for admins in that account (except the management account, which SCPs do not affect the same way — exam detail: SCPs don’t apply to the management account).</div>
  `,
  traps: [
    "Saying AWS is responsible for security groups or IAM policies.",
    "Using the root user for API calls.",
    "Expecting an SCP to grant permissions.",
  ],
  quiz: [
    {
      q: "Who is responsible for applying guest OS patches to Amazon EC2?",
      choices: [
        "AWS only",
        "The customer",
        "Shared equally on every Tuesday",
        "AWS Support if you have Business plan",
      ],
      answer: 1,
      explain:
        "EC2 is IaaS. You own the guest OS. RDS/Lambda shift that work to AWS.",
    },
    {
      q: "What can an SCP do?",
      choices: [
        "Grant an IAM user S3 access they don’t have in IAM",
        "Set a permission boundary that IAM cannot exceed in member accounts",
        "Replace MFA",
        "Encrypt EBS volumes automatically",
      ],
      answer: 1,
      explain:
        "SCPs are optional denies/allows that cap max permissions. They do not grant.",
    },
  ],
});

lesson({
  id: "vpc-mental-model",
  order: 4,
  domain: 0,
  minutes: 16,
  title: "VPC mental model",
  summary:
    "Every production design sits in a VPC. Subnets, routes, and gateways are the grammar of AWS networking.",
  tags: ["vpc", "subnet", "igw", "nat", "nacl", "security group"],
  body: `
    <p>A <strong>VPC</strong> is your private IPv4/IPv6 network in a Region (CIDR like <code>10.0.0.0/16</code>). You slice it into <strong>subnets</strong>. A subnet lives in <strong>exactly one AZ</strong>.</p>
    <h2>Public vs private is a route, not a checkbox</h2>
    <p>A subnet is public if its route table sends <code>0.0.0.0/0</code> to an <strong>Internet Gateway (IGW)</strong> and the ENI has a public IPv4 (or IPv6). A subnet is private if default internet traffic goes nowhere, or to a <strong>NAT gateway</strong> (outbound only), never to an IGW.</p>
    <div class="arch">
      <div class="arch-label">Classic three-tier VPC</div>
      <div class="arch-row">
        <div class="arch-col">
          <div class="arch-box solid">IGW</div>
          <div class="arch-box">Public subnet · ALB</div>
        </div>
        <div class="arch-col">
          <div class="arch-box">Private app subnet · EC2 / ECS</div>
          <div class="arch-box">NAT (in public subnet) for outbound patches</div>
        </div>
        <div class="arch-col">
          <div class="arch-box">Private data subnet · RDS</div>
          <div class="arch-box">No path to IGW</div>
        </div>
      </div>
    </div>
    <h2>Security group vs NACL</h2>
    <div class="table-wrap"><table>
      <tr><th></th><th>Security group</th><th>Network ACL</th></tr>
      <tr><td>Attached to</td><td>ENI (instance, ALB, RDS…)</td><td>Subnet</td></tr>
      <tr><td>Stateful?</td><td>Yes — return traffic allowed automatically</td><td>No — must allow egress (and ephemeral ports) explicitly</td></tr>
      <tr><td>Rules</td><td>Allow only</td><td>Allow and deny</td></tr>
      <tr><td>Default</td><td>Deny all inbound, allow all outbound</td><td>Default NACL allows all; custom NACL denies all until you add rules</td></tr>
    </table></div>
    <p>Day-to-day microsegmentation is <strong>security groups</strong>. NACLs are coarse, extra deny (block a bad IP at subnet), or exam trivia about ephemeral ports.</p>
    <h2>How packets leave AWS</h2>
    <ul>
      <li><strong>IGW</strong> — bidirectional internet for public subnets.</li>
      <li><strong>NAT gateway</strong> — private subnet IPv4 outbound to internet; not for inbound. Managed, billed hourly + per GB. Prefer <strong>VPC endpoints</strong> for S3/DynamoDB (gateway) and most other AWS APIs (interface / PrivateLink) to avoid NAT cost and keep traffic private.</li>
      <li><strong>Virtual private gateway / Transit Gateway + VPN or Direct Connect</strong> — hybrid.</li>
      <li><strong>VPC peering</strong> — one-to-one, no transitive routing. Three VPCs that all need to talk: peering mesh gets ugly → <strong>Transit Gateway</strong>.</li>
      <li><strong>PrivateLink (interface endpoint)</strong> — expose a service (yours or AWS) as an ENI in the consumer VPC. No peering, no CIDR overlap problem.</li>
    </ul>
    <div class="callout tip"><strong>Exam default</strong>ALB in public subnets, app and data in private, RDS security group accepts only the app SG (not a CIDR), S3 via gateway endpoint.</div>
  `,
  traps: [
    "Assigning a public IP and forgetting the IGW route — still not reachable.",
    "Using NACLs as the primary app firewall (ephemeral port pain).",
    "Peering three VPCs and expecting A→B→C to work (not transitive).",
  ],
  quiz: [
    {
      q: "RDS in a private subnet must be reachable only from an app Auto Scaling group. Best control?",
      choices: [
        "NACL allow 3306 from 0.0.0.0/0",
        "Security group on RDS allowing 3306 from the app instances’ security group",
        "Public IP on RDS with a password",
        "WAF on the RDS endpoint",
      ],
      answer: 1,
      explain:
        "SG-to-SG is the least-privilege, stateful pattern. WAF is HTTP. Public RDS is a finding, not a design.",
    },
    {
      q: "Three VPCs need many-to-many private routing, including on-prem via one DX. Service?",
      choices: [
        "VPC peering only",
        "Internet Gateway",
        "AWS Transit Gateway",
        "CloudFront",
      ],
      answer: 2,
      explain: "TGW is the hub. Peering is not transitive.",
    },
    {
      q: "Private EC2 must read S3 without traversing the internet, lowest data-transfer cost. First choice?",
      choices: [
        "NAT gateway",
        "S3 gateway VPC endpoint",
        "Public S3 bucket",
        "Client VPN",
      ],
      answer: 1,
      explain:
        "Gateway endpoint for S3/DynamoDB is free of hourly interface-endpoint charges and keeps traffic on the Amazon network.",
    },
  ],
});

lesson({
  id: "compute-storage-db-map",
  order: 5,
  domain: 0,
  minutes: 14,
  title: "A first map of compute, storage, and data",
  summary:
    "A one-page picture of the main boxes. Later lessons go deep; this stops you mixing categories.",
  tags: ["ec2", "lambda", "s3", "ebs", "rds", "dynamodb"],
  body: `
    <h2>Compute</h2>
    <ul>
      <li><strong>EC2</strong> — VMs. You pick AMI, instance family, placement, networking. Maximum control, maximum ops.</li>
      <li><strong>Auto Scaling + ELB</strong> — the HA/scale wrapper around EC2.</li>
      <li><strong>ECS / EKS</strong> — containers. ECS is AWS-native; EKS is Kubernetes. Both can run on EC2 or <strong>Fargate</strong> (no servers to patch).</li>
      <li><strong>Lambda</strong> — functions, 15-minute max, event-driven, pay per request/duration. Not for 24/7 custom kernels or huge in-process state.</li>
      <li><strong>Elastic Beanstalk / App Runner / Lightsail</strong> — Beanstalk is in-scope-ish as “managed PaaS for web apps”; Lightsail is out of scope on the current guide. Prefer naming ECS/ALB/Lambda on the exam unless the stem wants simplest PaaS.</li>
      <li><strong>Batch, EMR</strong> — scheduled/big data compute.</li>
    </ul>
    <h2>Storage types</h2>
    <div class="table-wrap"><table>
      <tr><th>Type</th><th>Service</th><th>Access</th><th>Use</th></tr>
      <tr><td>Object</td><td>S3</td><td>HTTP API, not a POSIX disk</td><td>Files, data lake, static sites, backups</td></tr>
      <tr><td>Block</td><td>EBS</td><td>One AZ, attach to EC2</td><td>Boot volumes, databases on EC2</td></tr>
      <tr><td>File (Linux NFS)</td><td>EFS</td><td>Multi-AZ, many EC2/Lambda/ECS</td><td>Shared web roots, lift-and-shift NFS</td></tr>
      <tr><td>Managed file (Windows/Lustre/NetApp/OpenZFS)</td><td>FSx</td><td>Protocol-specific</td><td>When the stem names SMB, Lustre, or Ontap</td></tr>
    </table></div>
    <h2>Databases</h2>
    <ul>
      <li><strong>RDS</strong> — managed MySQL/PostgreSQL/MariaDB/Oracle/SQL Server. Multi-AZ HA, read replicas for scale-out reads.</li>
      <li><strong>Aurora</strong> — MySQL/Postgres-compatible, faster failover, storage autoscales, Aurora Serverless v2 for spiky. Aurora Global Database for DR/low RPO across Regions.</li>
      <li><strong>DynamoDB</strong> — serverless key-value / document, single-digit ms, keys matter. Global Tables for multi-Region. Not SQL joins.</li>
      <li><strong>ElastiCache</strong> (Redis/Memcached), <strong>MemoryDB</strong> — cache / in-memory.</li>
      <li><strong>Redshift</strong> — warehouse. <strong>DocumentDB</strong> Mongo-compatible. <strong>Neptune</strong> graph. <strong>Keyspaces</strong> Cassandra. Purpose-built wins over “force it into RDS.”</li>
    </ul>
    <div class="callout tip"><strong>Selection rule</strong>If the stem gives a query pattern (joins, strong SQL, existing MySQL) → RDS/Aurora. If it gives a key, huge scale, millisecond, serverless → DynamoDB. If it gives analytics over S3 → Athena/Redshift Spectrum/Glue, not RDS.</div>
    <p>The exam guide also publishes an <a href="#/scope">in-scope service catalog</a> (non-exhaustive). Skim it after this lesson; search it when a practice item names something you have not used.</p>
  `,
  traps: [
    "Mounting S3 as a high-IOPS disk for a database (it’s object storage).",
    "EFS for a Windows SMB share (that’s FSx for Windows).",
    "DynamoDB for ad-hoc multi-table joins.",
  ],
  quiz: [
    {
      q: "Many Linux EC2s in two AZs need a shared POSIX file system. Service?",
      choices: [
        "EBS Multi-Attach on gp3",
        "Amazon EFS",
        "S3 Standard",
        "Instance store",
      ],
      answer: 1,
      explain:
        "EFS is regional NFS. EBS Multi-Attach is limited, same-AZ, clustered FS only. S3 is not POSIX.",
    },
    {
      q: "Session store, millions of keys, no SQL, need single-digit milliseconds and almost no ops. Service?",
      choices: ["RDS MySQL", "Redshift", "DynamoDB", "EFS"],
      answer: 2,
      explain:
        "Classic DynamoDB use case. RDS can do it with pain; the exam wants purpose-built.",
    },
  ],
});
