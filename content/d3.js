lesson({
  id: "s3-storage",
  order: 25,
  domain: 3,
  minutes: 16,
  title: "S3 performance and access patterns",
  summary:
    "Prefixes, multipart, Transfer Acceleration, Object Lambda, consistency, and when S3 is the wrong disk.",
  tags: ["s3", "prefix", "multipart", "transfer acceleration"],
  body: `
    <p>S3 is object storage: HTTP, unlimited, 11 nines durability (Standard), strongly consistent reads after writes. It is not a block device and not NFS.</p>
    <h2>Performance</h2>
    <ul>
      <li>Scale is per prefix / partition. High request rates: parallelize across prefixes (old advice about random prefixes is mostly obsolete but “many prefixes / parallel GETs” still appears).</li>
      <li><strong>Multipart upload</strong> for large objects; parallel parts.</li>
      <li><strong>Byte-range GETs</strong> for partial reads.</li>
      <li><strong>S3 Transfer Acceleration</strong> — long-distance uploads via CloudFront edges. Stem: “offices worldwide uploading large files.”</li>
      <li><strong>Multipart + CloudFront</strong> for downloads to global users (static/assets). Transfer Acceleration is more for <em>into</em> a bucket from far clients.</li>
      <li><strong>S3 Express One Zone</strong> — single-AZ, very low latency, high RPS, lower durability than Standard. Stem must accept one AZ.</li>
      <li><strong>Object Lambda</strong> — transform on GET (redact PII) without copies.</li>
    </ul>
    <h2>Access</h2>
    <p>Block Public Access. Presigned URLs for time-limited object access without making the bucket public. CloudFront OAC (origin access control) for public HTTPS without public S3. S3 Access Points / Multi-Region Access Points for complex apps and global endpoints. <strong>Requester Pays</strong> — the downloader pays transfer (data-set sharing; official Domain 4 access option). <strong>S3 Replication Time Control</strong> — CRR with an SLA in minutes when the stem names a replication time.</p>
    <h2>When not S3</h2>
    <p>Database storage, boot volumes, shared POSIX, SMB — use EBS/EFS/FSx. “Millions of tiny random IOPS like a SAN” is EBS io2, not S3.</p>
  `,
  traps: [
    "Public bucket for ‘simple’ static hosting when CloudFront + OAC is the secure pattern.",
    "S3 for Windows file shares.",
    "Transfer Acceleration when the users are downloading a website (CloudFront).",
  ],
  quiz: [
    {
      q: "Global offices upload 5 GB video files to a bucket in us-east-1; uploads are slow.",
      choices: [
        "S3 Transfer Acceleration",
        "EBS Magnetic",
        "Security group on S3",
        "RDS",
      ],
      answer: 0,
      explain:
        "TA uses edge locations to accelerate PUTs into a Regional bucket.",
    },
    {
      q: "Users should download objects over HTTPS without a public bucket.",
      choices: [
        "Disable Block Public Access and hope",
        "CloudFront with origin access control",
        "FTP on EC2",
        "Make every object ACL public-read",
      ],
      answer: 1,
      explain:
        "OAC lets CloudFront call S3 privately. Bucket stays non-public.",
    },
  ],
});

lesson({
  id: "block-file-storage",
  order: 26,
  domain: 3,
  minutes: 14,
  title: "EBS, instance store, EFS, and FSx",
  summary:
    "Volume types, Multi-Attach, throughput modes, and picking the file system that matches the protocol.",
  tags: ["ebs", "efs", "fsx", "io2", "gp3"],
  body: `
    <h2>EBS</h2>
    <ul>
      <li><strong>gp3</strong> — default SSD, set IOPS/throughput independently. Most workloads.</li>
      <li><strong>io2 Block Express</strong> — highest durability/IOPS, SAN-like, Multi-Attach, latency-sensitive DBs on EC2.</li>
      <li><strong>st1 / sc1</strong> — throughput HDD / cold HDD. Logs, big sequential, cheapest sequential.</li>
      <li>EBS is <strong>one AZ</strong>. Snapshots in S3 (Regional). Fast Snapshot Restore optional.</li>
      <li><strong>Multi-Attach</strong> — io2 (and some io1) to multiple instances in the <em>same AZ</em>, clustered filesystem (not ext4 on two writers).</li>
    </ul>
    <h2>Instance store</h2>
    <p>Ephemeral NVMe on the host. Fast, dies if the instance stops/hibernates/fails. Caches, scratch, some high-performance DBs you replicate yourself. Never the only copy of data you care about.</p>
    <h2>EFS</h2>
    <p>NFS, Regional (Multi-AZ) or One Zone. Bursting vs Elastic vs Provisioned throughput. General Purpose vs Max I/O performance modes. Mount from thousands of EC2/Lambda/ECS. Use for CMS shared files, home dirs, lift-and-shift NFS. Not for Windows SMB.</p>
    <h2>FSx</h2>
    <ul>
      <li><strong>Windows File Server</strong> — SMB, DFS, AD join.</li>
      <li><strong>Lustre</strong> — HPC, linked to S3, scratch or persistent.</li>
      <li><strong>NetApp ONTAP / OpenZFS</strong> — when the stem says ONTAP, NFS/SMB together, snapshots like NetApp.</li>
    </ul>
    <h2>Storage Gateway (hybrid)</h2>
    <p>File Gateway (NFS/SMB → S3), Volume Gateway (iSCSI block, stored or cached), Tape Gateway (VTL). Stem: “on-prem apps need cloud-backed files without rewriting.” DataSync for migration jobs; Transfer Family for SFTP/FTPS/FTP.</p>
  `,
  traps: [
    "gp3 vs io2: if they quote hundreds of thousands of IOPS or ‘SAN,’ io2 Block Express.",
    "EFS for a single EC2 boot volume (that’s EBS).",
    "EFS One Zone for production HA file data.",
  ],
  quiz: [
    {
      q: "Windows fleet needs a shared SMB file system integrated with AWS Managed Microsoft AD.",
      choices: ["EFS", "FSx for Windows File Server", "S3 Standard", "EBS gp3"],
      answer: 1,
      explain: "SMB + AD = FSx Windows. EFS is NFS/Linux.",
    },
    {
      q: "Oracle on EC2 needs 64k IOPS and sub-ms, same AZ cluster-aware software.",
      choices: [
        "S3",
        "EFS bursting",
        "io2 Block Express with Multi-Attach",
        "sc1",
      ],
      answer: 2,
      explain: "High IOPS clustered block is io2 Multi-Attach.",
    },
    {
      q: "HPC simulation needs a POSIX file system that can ingest a training set from S3 at hundreds of GB/s.",
      choices: [
        "FSx for Lustre linked to S3",
        "EBS st1 on one node",
        "Glacier Deep Archive",
        "SQS",
      ],
      answer: 0,
      explain: "Lustre + S3 repository is the HPC pattern.",
    },
  ],
});

lesson({
  id: "ec2-performance",
  order: 27,
  domain: 3,
  minutes: 14,
  title: "EC2 families, placement, and scaling compute",
  summary:
    "Instance types, placement groups, hibernate, and Batch vs EMR vs just more EC2.",
  tags: ["ec2", "placement group", "batch", "graviton"],
  body: `
    <h2>Families (enough to pick)</h2>
    <ul>
      <li><strong>General (M)</strong> — default balanced.</li>
      <li><strong>Compute (C)</strong> — CPU bound, batch, gaming servers.</li>
      <li><strong>Memory (R, X, U)</strong> — in-memory DBs, large caches.</li>
      <li><strong>Storage (I, D, H)</strong> — local NVMe (I) or dense HDD (D).</li>
      <li><strong>Accelerated (P, G, Inf, Trn)</strong> — GPU / inferentia / trainium. ML, video, graphics.</li>
      <li><strong>Burstable (T)</strong> — spiky, low baseline; not a noisy production DB.</li>
      <li>Graviton (ARM) when “price/performance” and the stack supports it.</li>
    </ul>
    <h2>Placement groups</h2>
    <ul>
      <li><strong>Cluster</strong> — same rack-ish, lowest latency, one AZ. HPC. Higher correlated failure.</li>
      <li><strong>Spread</strong> — distinct hardware, max 7 per AZ per group. Critical small fleets.</li>
      <li><strong>Partition</strong> — Hadoop/Cassandra style, isolate replica sets.</li>
    </ul>
    <h2>Networking</h2>
    <p>Enhanced networking, ENA, EFA (HPC/MPI). Jumbo, placement cluster. Instance bandwidth scales with size — “need 50 Gbps” means a large enough instance, not a security group trick.</p>
    <h2>Other compute</h2>
    <p><strong>AWS Batch</strong> — queues of jobs, Spot-friendly, no cluster admin. <strong>EMR</strong> — Spark/Hadoop. <strong>Beanstalk</strong> — PaaS web. Hibernate: pause T/M/C with RAM to EBS, faster resume than cold boot (dev/desktop-like).</p>
    <div class="callout tip"><strong>Right-size first</strong>Compute Optimizer and metrics (CPU, mem via CW agent) before buying Reserved Instances. A wrong family with a 3-year RI is an expensive trap.</div>
  `,
  traps: [
    "T-family for a constantly hot CPU (credits exhaust).",
    "Cluster placement group across three AZs (it’s single-AZ).",
    "GPU instance for a simple nginx fleet.",
  ],
  quiz: [
    {
      q: "MPI HPC job needs the lowest latency between 32 instances in one AZ.",
      choices: [
        "Spread placement group",
        "Cluster placement group + EFA",
        "Four random Regions",
        "S3 Transfer Acceleration",
      ],
      answer: 1,
      explain: "Cluster PG + EFA is the HPC interconnect pattern.",
    },
    {
      q: "In-memory analytics, 500 GB dataset in RAM, Linux, no GPU.",
      choices: [
        "t3.micro",
        "Memory-optimized (R/X) instance",
        "sc1-only instance store",
        "CloudFront",
      ],
      answer: 1,
      explain: "Fit RAM. T-micro cannot hold 500 GB.",
    },
  ],
});

lesson({
  id: "lambda-container-perf",
  order: 28,
  domain: 3,
  minutes: 10,
  title: "Lambda and container performance knobs",
  summary:
    "Memory/CPU, concurrency, provisioned concurrency, and right-sizing tasks.",
  tags: ["lambda", "concurrency", "fargate"],
  body: `
    <p>Lambda CPU scales with memory. If a function is CPU-bound, raise memory even if it doesn’t need RAM — wall-clock drops, often cheaper. 15-minute cap. Architecture: x86 vs ARM (Graviton) for cost/perf.</p>
    <h2>Concurrency</h2>
    <ul>
      <li>Account reserved / unreserved. Per-function reserved concurrency protects downstream (RDS) and guarantees capacity.</li>
      <li><strong>Provisioned concurrency</strong> — pre-warm, consistent latency, you pay for it. Stem: “p99 latency, interactive API.”</li>
      <li>SQS/Kinesis event source: batch window, parallelization factor (Kinesis per shard).</li>
      <li><strong>Destinations / DLQ</strong> — on failure or success, send to SQS/SNS/EventBridge/Lambda. Stem: “notify / retry poison events without a custom wrapper.”</li>
    </ul>
    <h2>Containers</h2>
    <p>Fargate: pick vCPU/memory pairs; don’t over-request. ECS Service Auto Scaling on CPU/ALB/SQS depth (custom). EKS: HPA/VPA, Karpenter or Cluster Autoscaler. Sidecars cost CPU — mention only if relevant.</p>
    <p>Decouple so each service scales on its own metric (Domain 2 + 3 overlap).</p>
  `,
  traps: [
    "Provisioned concurrency on a nightly batch function (waste).",
    "Unreserved Lambda storming RDS (use reserved concurrency + RDS Proxy).",
  ],
  quiz: [
    {
      q: "User-facing Lambda API has painful cold starts; cost is acceptable.",
      choices: [
        "Turn off IAM",
        "Provisioned concurrency",
        "Use Glacier",
        "Disable logs",
      ],
      answer: 1,
      explain: "Provisioned concurrency keeps execution environments ready.",
    },
  ],
});

lesson({
  id: "rds-aurora",
  order: 29,
  domain: 3,
  minutes: 16,
  title: "RDS and Aurora",
  summary:
    "Engine choice, Multi-AZ vs replicas, storage, Proxy, and Aurora Serverless / Global.",
  tags: ["rds", "aurora", "read replica", "piops"],
  body: `
    <h2>When RDS/Aurora</h2>
    <p>Relational, joins, transactions, existing MySQL/Postgres/Oracle/SQL Server. Don’t force DynamoDB if the stem is clearly SQL with ad-hoc queries.</p>
    <h2>Performance levers</h2>
    <ul>
      <li>Instance class (CPU/RAM). Graviton where supported.</li>
      <li>Storage: gp3 vs io1/io2 Provisioned IOPS. Aurora: storage autoscales, IO optimized option.</li>
      <li><strong>Read replicas</strong> — scale reads, async (lag). Not HA by themselves. Aurora can have up to 15, auto-choose reader endpoint.</li>
      <li>Indexes, connection pooling (RDS Proxy), ElastiCache in front of hot keys.</li>
      <li>Parameter groups, Performance Insights, slow query log.</li>
    </ul>
    <h2>Aurora extras</h2>
    <p>Faster failover, backtrack (MySQL) as a rewind, parallel query, Global Database, Serverless v2 (ACU scale, mixed with provisioned). Use Serverless when “unpredictable, idle nights, don’t want to pick instance size.”</p>
    <h2>Migrations</h2>
    <p><strong>DMS</strong> + SCT for heterogeneous (Oracle → Aurora). Homogeneous: dump/restore, native replica, or DMS anyway for cutover. Blue/green deployments on RDS/Aurora for safer major version upgrades.</p>
    <div class="callout compare"><strong>Replica vs Multi-AZ</strong>Multi-AZ = sync standby, same Region, automatic failover, same endpoint. Replica = extra readable copy, possibly other Region, promote manually (except Aurora automatic on failover among instances). Exam will try to swap these words.</div>
  `,
  traps: [
    "Read replica as the Multi-AZ answer.",
    "DynamoDB for a normalized ERP with hundreds of join-heavy reports.",
    "Oracle on EC2 when RDS Oracle or Aurora would meet the stem and ‘managed’ is requested — unless custom features block it.",
  ],
  quiz: [
    {
      q: "MySQL app is read-heavy; writes fit on one instance; must stay MySQL wire protocol.",
      choices: [
        "Add Aurora/RDS read replicas and send reads to the reader endpoint",
        "Move all data to S3",
        "Single t3.micro",
        "Redshift as the OLTP store",
      ],
      answer: 0,
      explain:
        "Read replicas (especially Aurora) scale reads. Redshift is analytics, not OLTP.",
    },
    {
      q: "Unpredictable traffic, PostgreSQL-compatible, want to scale to zero-ish at night with least instance babysitting.",
      choices: [
        "Aurora Serverless v2",
        "SQL Server on a huge EC2 left on",
        "DynamoDB with SQL joins",
        "Snowball Edge",
      ],
      answer: 0,
      explain: "Serverless v2 ACUs. DynamoDB is not Postgres-compatible SQL.",
    },
  ],
});

lesson({
  id: "dynamodb-nosql",
  order: 30,
  domain: 3,
  minutes: 14,
  title: "DynamoDB and purpose-built databases",
  summary:
    "Keys, capacity, GSIs, streams, DAX, and when to leave Dynamo for Neptune or DocumentDB.",
  tags: ["dynamodb", "gsi", "dax", "neptune", "documentdb"],
  body: `
    <h2>Data model</h2>
    <p>Partition key (+ optional sort key) must match access patterns. If you cannot query by PK/SK or GSI, DynamoDB will feel wrong — and the exam will pick RDS instead.</p>
    <ul>
      <li><strong>On-demand</strong> vs <strong>provisioned</strong> + autoscaling. On-demand for spiky/unknown. Provisioned + reserved capacity for steady (cost lesson).</li>
      <li><strong>GSI / LSI</strong> — other query shapes. GSI has its own RCU/WCU.</li>
      <li><strong>DAX</strong> — microsecond cache for Dynamo, write-through. Stem: “hot key, microsecond, Dynamo.”</li>
      <li><strong>Streams</strong> → Lambda for async (search index, aggregates).</li>
      <li><strong>Global Tables</strong> — multi-Region active-active.</li>
      <li><strong>TTL, transactions, PartiQL</strong> exist; transactions are not a reason to pick Dynamo over RDS if the workload is relational.</li>
      <li><strong>DynamoDB Accelerator vs ElastiCache</strong> — DAX is Dynamo-specific. ElastiCache sits in front of anything (RDS, API).</li>
    </ul>
    <h2>Purpose-built map</h2>
    <div class="table-wrap"><table>
      <tr><th>If the stem says…</th><th>Think</th></tr>
      <tr><td>Graph, social, fraud rings, Neptune in the answers</td><td>Amazon Neptune</td></tr>
      <tr><td>MongoDB API</td><td>DocumentDB</td></tr>
      <tr><td>Cassandra CQL</td><td>Keyspaces</td></tr>
      <tr><td>Time series (can also be Timestream; sometimes Dynamo/RDS)</td><td>Match the named product</td></tr>
      <tr><td>Warehouse, BI, columnar, petabyte SQL</td><td>Redshift</td></tr>
      <tr><td>In-memory Redis protocol</td><td>ElastiCache Redis or MemoryDB (durability)</td></tr>
    </table></div>
  `,
  traps: [
    "Scan instead of design a key — performance and cost disaster.",
    "DAX for RDS (wrong product).",
    "Neptune for a simple key-value session store.",
  ],
  quiz: [
    {
      q: "Gaming leaderboard, key = gameId, sort = score, millions of items, single-digit ms, serverless.",
      choices: ["RDS SQL Server Multi-AZ", "DynamoDB", "Redshift", "EFS"],
      answer: 1,
      explain: "Key-value access pattern + serverless scale = DynamoDB.",
    },
    {
      q: "Queries are ‘friends of friends’ on a social graph.",
      choices: ["Amazon Neptune", "S3 Select", "CloudTrail", "EBS"],
      answer: 0,
      explain: "Graph database. S3 Select is not a graph engine.",
    },
  ],
});

lesson({
  id: "caching",
  order: 31,
  domain: 3,
  minutes: 10,
  title: "Caching paths",
  summary:
    "CloudFront, API Gateway cache, ElastiCache, DAX, and RDS read replicas are different layers.",
  tags: ["elasticache", "cloudfront", "dax"],
  body: `
    <p>Cache as close to the user as the data allows:</p>
    <ol>
      <li><strong>CloudFront</strong> — HTTP at the edge. Static, and dynamic with cache policies / signed URLs. Origin Shield to protect origins.</li>
      <li><strong>API Gateway caching</strong> — GET APIs, TTL, per-key.</li>
      <li><strong>ElastiCache</strong> (Redis/Memcached) — application cache, sessions, pub/sub (Redis), ranking. In-VPC. Multi-AZ Redis with failover.</li>
      <li><strong>DAX</strong> — DynamoDB.</li>
      <li><strong>RDS read replicas / Aurora readers</strong> — not a cache, but offload reads.</li>
    </ol>
    <p>Invalidation: CloudFront invalidations cost after a free allotment; versioned object names are better. Redis eviction vs TTL. Don’t cache personalized/sensitive content at CloudFront without cache keys that include auth, or use origin on every request.</p>
    <div class="callout tip"><strong>Redis vs Memcached</strong>Redis: structures, replication, persistence options, pub/sub, Multi-AZ failover, Global Datastore for cross-Region. Memcached: simple, multithreaded, no replica failover story like Redis. Default exam cache = Redis unless they emphasize simple/multithreaded Memcached.</div>
  `,
  traps: [
    "ElastiCache as a durable system of record (use MemoryDB or Dynamo/RDS).",
    "CloudFront for non-HTTP database protocol.",
  ],
  quiz: [
    {
      q: "RDS is CPU-bound on identical repeated queries from the app tier.",
      choices: [
        "Put CloudFront in front of RDS port 3306",
        "ElastiCache Redis in front of the query results",
        "Disable Multi-AZ",
        "S3 Transfer Acceleration",
      ],
      answer: 1,
      explain: "App-level cache. CloudFront is HTTP, not MySQL protocol.",
    },
    {
      q: "Need microsecond reads on a hot DynamoDB key. The table stays the system of record.",
      choices: [
        "DAX",
        "CloudFront in front of the DynamoDB API as if it were a website",
        "Glacier Instant Retrieval",
        "AWS Artifact",
      ],
      answer: 0,
      explain:
        "DAX is the DynamoDB-specific cache. CloudFront is HTTP to an origin you control, not a Dynamo protocol accelerator.",
    },
  ],
});

lesson({
  id: "network-performance",
  order: 32,
  domain: 3,
  minutes: 14,
  title: "High-performing networks and edge",
  summary:
    "CloudFront vs Global Accelerator, Direct Connect, PrivateLink, and subnet design for scale.",
  tags: ["cloudfront", "global accelerator", "direct connect", "privatelink"],
  body: `
    <div class="table-wrap"><table>
      <tr><th></th><th>CloudFront</th><th>Global Accelerator</th></tr>
      <tr><td>Works at</td><td>HTTP cache + L7</td><td>Anycast TCP/UDP, no cache</td></tr>
      <tr><td>Pick</td><td>Web/static/API cache, signed URLs, WAF at edge</td><td>Gaming, VoIP, non-HTTP, static anycast IPs, regional failover over AWS backbone</td></tr>
      <tr><td>Edge compute</td><td>CloudFront Functions (viewer, microseconds, URL rewrites) vs Lambda@Edge (origin/viewer, heavier, headers/auth). Origin Shield = extra caching layer in front of the origin.</td><td>—</td></tr>
    </table></div>
    <h2>Getting into AWS fast</h2>
    <ul>
      <li><strong>Direct Connect</strong> — private virtual interfaces to VPC (or public VIF to S3/public APIs). Use LAG for more bandwidth. DX Gateway to many VPCs/Regions.</li>
      <li><strong>VPN</strong> — quicker, encrypted, variable internet. Transit Gateway + ECMP multiple tunnels for more throughput.</li>
      <li><strong>PrivateLink</strong> — consume services without public IPs or peering. Scales with ENIs in each AZ.</li>
    </ul>
    <h2>Inside the VPC</h2>
    <p>Don’t undersize CIDR — you cannot easily grow a VPC’s primary CIDR (you can add secondary CIDRs). One public/private pair per AZ. Jumbo MTU on DX. Placement groups for east-west HPC. IPv6 if the stem is IPv6.</p>
    <h2>DNS</h2>
    <p>Route 53 latency/geolocation policies. Alias records. Private hosted zones for VPC. Resolver inbound/outbound endpoints for hybrid DNS.</p>
  `,
  traps: [
    "CloudFront when the protocol is UDP gaming (Global Accelerator).",
    "Global Accelerator to cache images (CloudFront).",
    "Tiny /28 VPC for a growing EKS cluster.",
  ],
  quiz: [
    {
      q: "Multiplayer game uses UDP; needs static anycast IPs and AWS backbone to the nearest Region.",
      choices: [
        "CloudFront only",
        "AWS Global Accelerator",
        "S3 static website",
        "EFS",
      ],
      answer: 1,
      explain: "GA is the non-HTTP global anycast product.",
    },
    {
      q: "On-prem must send 8 Gbps steadily to S3 with consistent latency.",
      choices: [
        "Consumer broadband + IGW only",
        "Direct Connect public VIF (or DX + gateway) sized for the load",
        "Client VPN on a laptop",
        "SMTP",
      ],
      answer: 1,
      explain:
        "DX is the consistent-bandwidth hybrid pipe. Public VIF can target S3.",
    },
  ],
});

lesson({
  id: "data-pipelines",
  order: 33,
  domain: 3,
  minutes: 14,
  title: "Ingestion, lakes, and transform",
  summary:
    "Kinesis vs Firehose vs MSK vs SQS, Glue, Athena, EMR, and lake patterns.",
  tags: ["kinesis", "firehose", "glue", "athena", "msk", "emr"],
  body: `
    <div class="table-wrap"><table>
      <tr><th>Service</th><th>Job</th></tr>
      <tr><td>Kinesis Data Streams</td><td>Real-time, multiple consumers, shards, order per partition key, custom processing</td></tr>
      <tr><td>Data Firehose</td><td>Managed delivery to S3/OpenSearch/Redshift/Splunk, batching, GZIP, no custom shard math</td></tr>
      <tr><td>MSK</td><td>Apache Kafka compatible, existing Kafka apps</td></tr>
      <tr><td>SQS</td><td>Command/queue, not a replayable log of the last 24h (Kinesis retains)</td></tr>
      <tr><td>Glue</td><td>ETL, Data Catalog, crawlers, jobs (Spark), Iceberg tables</td></tr>
      <tr><td>Athena</td><td>SQL on S3 (pay per TB scanned) — columnar Parquet/ORC + partition = performance/cost</td></tr>
      <tr><td>EMR</td><td>Managed Hadoop/Spark cluster, more control than Glue, long-running or custom</td></tr>
      <tr><td>Redshift</td><td>Warehouse, Spectrum to query S3, COPY from S3</td></tr>
      <tr><td>Lake Formation</td><td>Permissions on the lake</td></tr>
      <tr><td>DataSync / Transfer Family / Snow</td><td>Move data in: NFS jobs, SFTP, petabytes offline</td></tr>
    </table></div>
    <p>Streaming architecture: producers → Streams → (Lambda | Firehose | Flink) → S3 data lake → Glue catalog → Athena/Redshift. Secure the stream (KMS, IAM, VPC interface). Transform CSV→Parquet in Glue or Firehose data format conversion.</p>
    <div class="callout tip"><strong>Scan cost</strong>Athena performance <em>is</em> cost: partition by date, convert to Parquet, don’t <code>SELECT *</code>. The exam treats this as both Domain 3 and 4.</div>
  `,
  traps: [
    "SQS when they need 24-hour replay and multiple independent consumers of the same stream (Kinesis).",
    "Firehose when they need custom per-record fan-out with several raw consumers (Streams).",
    "RDS as a petabyte data lake.",
  ],
  quiz: [
    {
      q: "Clickstream, 100k events/s, custom real-time fraud Lambda plus later dump to S3.",
      choices: [
        "Kinesis Data Streams (+ Firehose or Lambda to S3)",
        "S3 PUT per click from the browser as the only buffer",
        "EBS snapshots",
        "ACM",
      ],
      answer: 0,
      explain:
        "Streams handle fan-out and rate. Per-click S3 PUT is the wrong ingest.",
    },
    {
      q: "Analysts want SQL on gzipped JSON in S3 with least new servers.",
      choices: [
        "Athena + Glue Data Catalog",
        "A fleet of unmanaged Hadoop on EC2 you SSH into",
        "DynamoDB Scan from Excel",
        "CloudFront invalidations",
      ],
      answer: 0,
      explain: "Athena is serverless SQL on S3. Glue catalogs tables.",
    },
    {
      q: "Existing Kafka producers must not change; need a managed cluster on AWS.",
      choices: ["Amazon MSK", "SQS FIFO only", "EFS", "WAF"],
      answer: 0,
      explain: "MSK is Kafka. SQS is not a Kafka protocol broker.",
    },
  ],
});
