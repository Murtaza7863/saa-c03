/* Study-guide pages + high-miss chapter.
   Official facts: AWS exam guide HTML (docs.aws.amazon.com) + certification product page.
   Miss patterns: community write-ups, labeled as such. AWS does not publish item miss rates. */

window.SAA.guide = `
  <div class="source-note">
    <strong>What this page is allowed to claim.</strong>
    Numbers and rules below that say “official” come from the
    <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html" rel="noopener" target="_blank">SAA-C03 exam guide</a>
    and the
    <a href="https://aws.amazon.com/certification/certified-solutions-architect-associate/" rel="noopener" target="_blank">AWS certification page</a>.
    AWS does <em>not</em> publish pass rates, which questions people miss, or a practice-test score that means you will pass.
    Study method that is not in those documents is labeled <em>method</em> or <em>community</em>.
  </div>

  <h2>Official exam facts (do not “round” these)</h2>
  <div class="table-wrap"><table>
    <tr><th>Fact</th><th>Source wording, shortened</th></tr>
    <tr><td>Who it is for</td><td>People in a solutions architect role. Validates design using the AWS Well-Architected Framework. Target candidate: at least 1 year of hands-on experience designing cloud solutions that use AWS services.</td></tr>
    <tr><td>Length</td><td>130 minutes. 65 questions. Multiple choice or multiple response. $150 USD. Pearson VUE center or online proctor. Languages listed on the product page (English plus several others).</td></tr>
    <tr><td>Scored vs unscored</td><td>50 questions affect your score. 15 unscored questions do not; they are not identified. Unanswered = incorrect. No penalty for guessing.</td></tr>
    <tr><td>Question types</td><td>Multiple choice: one correct, three distractors. Multiple response: two or more correct out of five or more options. Distractors are written to look plausible.</td></tr>
    <tr><td>Score</td><td>Scaled 100–1,000. Minimum passing score 720. Score is for the exam as a whole. Scaled scoring equates forms that differ slightly in difficulty.</td></tr>
    <tr><td>Compensatory model</td><td>You do not need a passing score in each section. You need to pass the overall exam. Section table on the score report is feedback; treat it cautiously.</td></tr>
    <tr><td>Domain weights (scored content)</td><td>Design Secure Architectures 30%. Design Resilient Architectures 26%. Design High-Performing Architectures 24%. Design Cost-Optimized Architectures 20%.</td></tr>
    <tr><td>What the guide is not</td><td>The exam guide “does not provide a comprehensive list of the content on the exam.” Use task statements as a checklist, not as a promise that anything unlisted is absent.</td></tr>
    <tr><td>Validity</td><td>Certification is valid 3 years (product page). Recertify by passing the current Associate exam or by earning Solutions Architect – Professional, which recertifies this Associate cert.</td></tr>
  </table></div>

  <h2>Does passing SAA-C03 mean you know how to use AWS?</h2>
  <p>Official: the exam is multiple choice / multiple response. There is no console, no CLI, no “create a VPC” simulation. Official: the target candidate has at least 1 year of hands-on experience <em>designing</em> solutions that use AWS services.</p>
  <p>So the test measures architectural judgment (which service, which constraint). It does not prove you can log in, not get a surprise bill, or debug a 502. Use the <a href="#/use">Using AWS</a> checklist and labs for that. If you only do questions, you can still pass — and still be lost on day one of a job. This site is built so you do not have to choose.</p>

  <h2>What the exam is actually testing</h2>
  <p>From the exam guide introduction, you must be able to:</p>
  <ul>
    <li>Design solutions that use AWS services for current needs and projected future needs.</li>
    <li>Design architectures that are secure, resilient, high-performing, and cost-optimized.</li>
    <li>Review existing solutions and determine improvements.</li>
  </ul>
  <p>That is why stems look like short stories. You are picking a design that hits every stated constraint, not naming a favorite service.</p>

  <h2>Official domain checklist (task statements)</h2>
  <p>Use this as the spine of the course. Open the matching lessons. Do not skip Domain 1 because it is 30% of scored content.</p>
  <div class="table-wrap"><table>
    <tr><th>Domain</th><th>Tasks in the exam guide</th><th>Start here</th></tr>
    <tr>
      <td>1 Secure — 30%</td>
      <td>1.1 Secure access to AWS resources (IAM, federation/Identity Center, multi-account, least privilege, shared responsibility, global infra as it affects access).<br>1.2 Secure workloads and applications (credentials, service endpoints, ports/protocols, Cognito/GuardDuty/Macie-class services, DDoS/SQLi-class threats).<br>1.3 Data security controls (access/governance, recovery, retention/classification, encryption and key management).</td>
      <td><a href="#/path">Secure Architectures lessons</a></td>
    </tr>
    <tr>
      <td>2 Resilient — 26%</td>
      <td>2.1 Scalable and loosely coupled architectures.<br>2.2 Highly available and/or fault-tolerant architectures.</td>
      <td><a href="#/path">Resilient Architectures lessons</a></td>
    </tr>
    <tr>
      <td>3 High-performing — 24%</td>
      <td>3.1 Storage. 3.2 Compute. 3.3 Databases. 3.4 Networks. 3.5 Data ingestion and transformation.</td>
      <td><a href="#/path">High-Performing lessons</a></td>
    </tr>
    <tr>
      <td>4 Cost-optimized — 20%</td>
      <td>4.1 Storage cost. 4.2 Compute cost. 4.3 Database cost. 4.4 Network cost.</td>
      <td><a href="#/path">Cost-Optimized lessons</a></td>
    </tr>
  </table></div>
  <p>Full task knowledge/skills lists: <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html" rel="noopener" target="_blank">Domain 1</a>,
  <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html" rel="noopener" target="_blank">2</a>,
  <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html" rel="noopener" target="_blank">3</a>,
  <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html" rel="noopener" target="_blank">4</a>.
  Also read the exam guide’s in-scope / out-of-scope service lists so you do not study Braket-level topics for this exam.</p>

  <h2>How to study this site (method)</h2>
  <p>Two finish lines: <strong>use AWS</strong> (labs + Using AWS checklist) and <strong>sit the written exam</strong> (Exam mode → trainer → timed 65). This sequence is a study-guide procedure, not an AWS-published timetable. Hours-to-ready is not official; the only official experience cue is “at least 1 year hands-on design” — that describes who the questions are written for, not a lock on lesson 1.</p>
  <ol>
    <li><strong>Pictures first (Learn mode, path order)</strong> — AWS is renting computers → where stuff lives → how the console looks. No account required. Each lesson: picture, short why, “you should be able to,” tiny quiz. The path is grouped by weeks (method, not official).</li>
    <li><strong>Optional throwaway account</strong> — the “first hour” lesson, then Lab 1 (lock root, billing alarm). Skip until you want to click. Never use a company account for labs.</li>
    <li><strong>Finish Foundations</strong> — who patches what, your private network, computers/files/databases. Then the fork: two finish lines. Then how the written questions are built. Then the in-scope phone book (search, don’t memorize).</li>
    <li><strong>Build while you read Domain 1+</strong> — Security is 30% of scored content, so it comes first among exam domains. When a lesson has a Lab button, do that lab the same week. The exam has no console simulation (product page: multiple choice / multiple response only). Clicking still makes the picture real. Tick <a href="#/use">Using AWS</a> only for things you have actually done.</li>
    <li><strong>Service vs service until they are one-liners</strong> — open <a href="#/compare">comparisons</a>. Most items are a disguised pair. If you cannot say “this not that because &lt;constraint&gt;,” you are still on definitions.</li>
    <li><strong>High-miss pairs</strong> — <a href="#/misses">What people miss</a> then the <a href="#/lesson/high-miss">capstone lesson</a>. Those pairs are community-reported traps plus AWS-documented behavior. They are not an official “most missed” ranking.</li>
    <li><strong>In-scope phone book</strong> — <a href="#/scope">filterable map</a> of the exam guide’s in-scope services. Use it when a practice item names a product you skipped.</li>
    <li><strong>Exam mode (finish line B)</strong> — compressed notes and keyword tables. Then the question trainer. Then a <em>timed</em> 65 / 130 mix. AWS’s own guide: unanswered is wrong, so finish the set.</li>
    <li><strong>Fresh sets only for readiness</strong> — replaying the same bank until the letters stick is not a score. Use exam A, then B, then mixed trainer. Official AWS also sells a practice question set and a practice exam on Skill Builder; those are the only sets AWS authored.</li>
  </ol>

  <h2>How to read one question (method that matches how AWS writes items)</h2>
  <p>The exam guide says distractors are plausible answers a candidate with incomplete skill might choose. Community write-ups converge on the same reading order. Use it:</p>
  <ol>
    <li>Read the <strong>last sentence</strong> (the ask: least operational overhead, most cost-effective, highly available, choose TWO).</li>
    <li>List constraints: existing app, cannot change code, customer-managed keys, RPO/RTO, hybrid, Windows/SMB, NFS, interruptible or not, one Region vs two.</li>
    <li>Kill any option that violates one constraint. “Cheapest” that drops Multi-AZ when they asked for HA is not cheapest — it is wrong.</li>
    <li>If two remain, the qualifier decides. Extra services that were not requested are usually wrong.</li>
  </ol>
  <p>Pacing: 65 items / 130 minutes is about two minutes each. That arithmetic is official counts, not a coaching slogan. Flag and move; never leave blank (official: unanswered = incorrect).</p>
  <p>Bookmark the <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html" rel="noopener" target="_blank">official exam guide</a> after a few picture lessons — not before lesson 1. This site maps to those domains; the guide still wins if they disagree.</p>

  <h2>What not to treat as fact</h2>
  <ul>
    <li>Any “first-time pass rate” percentage. AWS does not publish one.</li>
    <li>Any “this topic is 40% of the exam” besides the four domain weights.</li>
    <li>A raw percent of questions equal to 720. Official: scaled score, forms equated for difficulty. 720 is not “72% of items.”</li>
    <li>Exam dumps. This site’s questions are original scenarios for practice. Memorizing leaked stems is cheating and trains the wrong skill.</li>
  </ul>

  <p><a class="btn primary" href="#/misses">Next: what people miss</a> <a class="btn" href="#/lesson/start-here">Start lesson 1</a></p>
`;

window.SAA.misses = `
  <div class="source-note">
    <strong>AWS does not publish which items candidates miss.</strong>
    The patterns below are the ones that show up again and again in candidate and trainer write-ups (exam-style blogs, not AWS).
    Architecture rows are checked against AWS documentation. Do not treat the list as an official ranking or as “these will be on your form.”
    Community sources used while building this page:
    <a href="https://www.examcert.app/blog/why-you-fail-aws-saa-c03/" rel="noopener" target="_blank">ExamCert: why people fail</a>,
    <a href="https://certcompanion.com/blog/aws-certified-solutions-architect-associate-saa-c03-exam-guide" rel="noopener" target="_blank">CertCompanion pass guide</a>,
    <a href="https://sailor.sh/blog/aws-solutions-architect-common-mistakes/" rel="noopener" target="_blank">Sailor: common mistakes</a>,
    plus first-person mock-exam write-ups that name the same pairs.
  </div>

  <h2>Failure patterns (how people study wrong)</h2>
  <p>Write-ups agree on the method failures more than on any topic percentage:</p>
  <div class="table-wrap"><table>
    <tr><th>Pattern reported</th><th>What to do on this site</th></tr>
    <tr><td>Treating Associate as a vocabulary test. Two answers are often technically valid; the qualifier picks the winner.</td><td>Every stem: last sentence first. Exam-mode keyword tables.</td></tr>
    <tr><td>Skimming; missing <em>existing</em>, <em>cannot change the application</em>, <em>NOT</em>, <em>minimum</em>, <em>least operational overhead</em>.</td><td>Practice underlining those words. Quiz explanations call them out.</td></tr>
    <tr><td>Passive video / notes, no retrieval.</td><td>Lesson quiz before you feel ready. Flashcards. Studio briefs.</td></tr>
    <tr><td>Never sitting a full 65 / 130 timed set.</td><td>Question trainer → full mix. Timed exams A and B.</td></tr>
    <tr><td>Replaying one bank until 100% (memory of letters).</td><td>Use a set you have not seen. If you miss it, open the lesson, do not restudy the letter.</td></tr>
    <tr><td>Under-studying security because compute is more fun. Domain 1 is 30% of scored content (official weight).</td><td>Do IAM, KMS, VPC security before polishing Spot percentages.</td></tr>
    <tr><td>No console time, then freezing on “what would you click.” Exam itself has no labs — but the target candidate is defined as hands-on.</td><td>Labs: account harden, VPC, 3-tier, watch, backup, bill.</td></tr>
    <tr><td>Booking on a calendar, not on fresh timed scores.</td><td>AWS has no official cutoff. Community often waits for repeatable high scores on <em>unseen</em> full sets. That is a heuristic, not a guarantee.</td></tr>
  </table></div>

  <h2>Qualifier words (community: this is the actual exam skill)</h2>
  <p>Official exam guide: pick the response that <em>best</em> completes the statement. Community: the last clause is usually the optimization goal.</p>
  <div class="table-wrap"><table>
    <tr><th>If the stem says</th><th>Among options that already meet the other constraints</th></tr>
    <tr><td>Least operational overhead / most operationally efficient</td><td>Managed or serverless. Not “install it on EC2 and cron it.”</td></tr>
    <tr><td>Most cost-effective / minimize cost</td><td>Still must meet HA, encryption, RPO. Then Spot, S3 class, gateway endpoint, right-size, Savings Plans — not the broken cheap option.</td></tr>
    <tr><td>Highly available (no second Region named)</td><td>Multi-AZ in one Region. Not a read replica. Not a single NAT for three AZs.</td></tr>
    <tr><td>Disaster recovery / survive Region failure / data residency in two geos</td><td>Multi-Region. Multi-AZ is not DR.</td></tr>
    <tr><td>Cannot change the application / existing app / without re-architecting</td><td>Queue, proxy, migration tool, storage gateway — not a rewrite to Lambda.</td></tr>
    <tr><td>Cannot tolerate interruption / stateful / must complete</td><td>Not Spot (unless mixed with On-Demand in a way the stem allows).</td></tr>
    <tr><td>Choose TWO (or THREE)</td><td>Exactly that many. Partial credit is not described in the exam guide; treat it as all-or-nothing.</td></tr>
  </table></div>

  <h2>Pairs people mix up (behavior from AWS docs, mix-up from community)</h2>
  <p>Trainers and candidates keep naming the same look-alikes. Drill the one-line rule. Open the comparison tables for the long form.</p>
  <div class="table-wrap"><table>
    <tr><th>Pair</th><th>Rule that actually holds</th><th>Typical wrong pick</th></tr>
    <tr><td>Security group vs NACL</td><td>SG: stateful, ENI, allow only. NACL: stateless, subnet, allow and deny, numbered order. Blocking a specific IP is a NACL deny (SG cannot deny).</td><td>Trying to “deny” with a security group.</td></tr>
    <tr><td>Gateway endpoint vs NAT vs interface endpoint</td><td>Gateway endpoints: S3 and DynamoDB, route-table prefix list, no extra charge, <em>not</em> usable from on-prem / TGW / peering (AWS: connections cannot be extended out of the VPC). Interface (PrivateLink): ENI + SG, most other services, billed, can be used from on-prem via DX/VPN. NAT: private subnet outbound to the <em>internet</em>, HA = NAT per AZ used.</td><td>NAT for same-Region S3 (pays GB for no reason). Interface for S3 when the stem is cost inside one VPC. Gateway for on-prem S3.</td></tr>
    <tr><td>RDS Multi-AZ vs read replica vs Multi-Region</td><td>Multi-AZ: synchronous standby, automatic failover, HA in one Region — not extra read capacity. Replica: asynchronous, read scale, promotion is a DR-ish manual step. Two Regions: Aurora Global / replica in another Region / backup restore — only if the stem asked for Region failure.</td><td>Replica as “HA.” Multi-AZ as “scale reads.”</td></tr>
    <tr><td>ALB vs NLB vs GWLB</td><td>ALB: HTTP/S, path/host, WAF. NLB: TCP/UDP/TLS, static IP, PrivateLink. GWLB: appliance sandwich.</td><td>ALB because “load balancer” when they asked for a static IP or non-HTTP.</td></tr>
    <tr><td>SQS vs SNS vs EventBridge vs Kinesis</td><td>SQS: buffer, competing consumers. SNS: fan-out (often SNS→SQS). EventBridge: rules, SaaS, archive, many producers. Kinesis Data Streams: ordered shards, replay, multiple consumers on the same log.</td><td>SQS when they need replay/analytics on the stream. SNS when they needed a durable work queue only.</td></tr>
    <tr><td>S3 vs EBS vs EFS vs FSx</td><td>Object HTTP → S3. Disk for one instance → EBS. Linux NFS multi-AZ → EFS. Windows/SMB/AD → FSx Windows. HPC + S3 → Lustre.</td><td>EFS for Windows. S3 as a POSIX disk. EBS shared by a web farm without Multi-Attach cluster semantics.</td></tr>
    <tr><td>Cross-account access</td><td>Caller needs identity Allow. Resource owner needs resource Allow (bucket / queue / KMS key policy). Role + trust policy + optional external ID for a vendor. SCP never grants.</td><td>Only an identity policy in account A, or only a bucket policy, or using the resource account’s IAM user keys in the app.</td></tr>
    <tr><td>KMS</td><td>SSE-KMS object + cross-account: identity <code>kms:Decrypt</code> <em>and</em> key policy in the owner account. AWS-owned keys are not a customer-managed key.</td><td>Bucket policy only, forgetting the CMK.</td></tr>
    <tr><td>CloudFront vs Global Accelerator vs S3 Transfer Acceleration</td><td>Cacheable HTTP → CloudFront. TCP/UDP anycast IP, no cache → GA. Uploads into one bucket from far offices → Transfer Acceleration.</td><td>GA for a static website. CloudFront for a UDP game.</td></tr>
    <tr><td>Cognito user pool vs identity pool</td><td>User pool: sign-up / sign-in / tokens for <em>your app’s users</em>. Identity pool: temporary AWS credentials (often after a user pool, or for guests).</td><td>Identity pool as the login UI. User pool as “give this mobile app an S3 PutObject role” by itself.</td></tr>
    <tr><td>Secrets Manager vs Parameter Store</td><td>Secrets Manager: secrets + built-in rotation for supported engines, higher price. Parameter Store: config and secrets (esp. Standard); rotation is not the same built-in RDS integration.</td><td>Parameter Store when the stem asked for managed rotation of an RDS password with least ops.</td></tr>
    <tr><td>DynamoDB Query vs Scan</td><td>Query: partition key required (optional sort-key condition). Scan: reads the table (or index); filters still consume read capacity on what was scanned.</td><td>Scan as the default “get items” answer when a key is known.</td></tr>
    <tr><td>S3 sharing: ACL / public / presigned / CloudFront signed / OAC</td><td>Private bucket + CloudFront OAC for a site. Presigned URL for time-boxed object access from the app. Public is rarely the least-privilege answer.</td><td>Make the bucket public “because CloudFront is hard.”</td></tr>
    <tr><td>S3 classes / Glacier</td><td>Unknown pattern → Intelligent-Tiering. Frequent → Standard. Rare + immediate → Instant Retrieval (min storage duration applies). Flexible / Deep Archive: retrieval delay and longer minimums. Lifecycle too early costs you the minimum-duration penalty.</td><td>Deep Archive for “users download all day.” Instant Retrieval without reading the access pattern.</td></tr>
    <tr><td>Spot vs On-Demand / Savings Plans</td><td>Spot: interruptible, 2-minute notice class of workloads. Savings Plans / RI: steady, not interruptible. On-Demand: unknown or cannot die.</td><td>Spot for a stateful database because “cost-effective.”</td></tr>
    <tr><td>Peering vs Transit Gateway vs PrivateLink</td><td>Peering: two VPCs, not transitive, no overlapping CIDR. TGW: many VPCs + hybrid hub. PrivateLink: consume a service, overlapping CIDR OK.</td><td>Peering mesh for 20 VPCs. Peering when CIDRs overlap.</td></tr>
  </table></div>

  <p><a class="btn primary" href="#/lesson/high-miss">Lesson: drill these pairs</a> <a class="btn" href="#/compare">Service vs service</a> <a class="btn" href="#/drill">Question trainer</a></p>
`;

lesson({
  id: "high-miss",
  order: 44,
  domain: 5,
  minutes: 18,
  title: "High-miss pairs (sourced)",
  summary:
    "The look-alikes community write-ups keep naming — with AWS-documented behavior, not invented miss rates.",
  tags: [
    "traps",
    "IAM",
    "VPC endpoints",
    "Multi-AZ",
    "qualifier",
    "study guide",
  ],
  body: `
    <div class="source-note">AWS does not publish item-level miss rates. This lesson exists because candidate and trainer write-ups keep repeating the same mix-ups. Each rule below is service behavior from AWS docs. The claim “people miss this” is community, not official.</div>

    <h2>1. Read the ask before the architecture</h2>
    <p>Official: distractors are plausible. Community: the last sentence is usually the qualifier. Two options can both “work.” Only one hits <em>least overhead</em> or <em>most cost-effective while still HA</em>.</p>
    <p>Underline: least cost · least operational overhead · cannot change the application · existing · customer-managed key · multi-AZ · multi-Region · RPO/RTO · Windows/SMB · NFS · cannot tolerate interruption · NOT · minimum · choose TWO.</p>

    <h2>2. Gateway endpoint vs NAT vs interface</h2>
    <p>AWS: gateway endpoints for S3 (and DynamoDB) add a route-table target, have no additional charge, and <strong>cannot be used from on-premises, peered VPCs in other Regions, or through a transit gateway</strong>. For those paths you need an interface endpoint (extra cost). NAT is for internet egress from private subnets, not for “talk to S3 in this Region cheaply.”</p>
    <div class="callout trap"><strong>Exam-shaped trap</strong>Private EC2 pulling TBs from S3 → gateway endpoint, not “add NAT.” On-prem servers to S3 without the public internet → interface endpoint (or a different hybrid pattern), not a gateway endpoint.</div>

    <h2>3. Multi-AZ is not a read replica</h2>
    <p>RDS Multi-AZ: standby for failover, same endpoint, synchronous (for the classic Multi-AZ instance pattern). It does not give you extra read capacity. Read replicas: asynchronous, scale reads, failover is not the same automatic HA story. Aurora’s storage is already replicated across AZs; still do not call a replica “Multi-AZ HA” if the stem asked for automatic failover of writes.</p>

    <h2>4. Security groups do not deny</h2>
    <p>Need to block one CIDR at the subnet edge → NACL deny. Need instance-level allow from the ALB SG → security group referencing the other SG. NACLs are stateless: ephemeral return ports matter. SGs are stateful: they do not.</p>

    <h2>5. Cross-account is two policies, sometimes three</h2>
    <p>Account A’s role calls S3 in B with a CMK in B:</p>
    <ul>
      <li>Identity policy on the role in A: <code>s3:GetObject</code> and <code>kms:Decrypt</code>.</li>
      <li>Bucket policy in B allowing that role.</li>
      <li>KMS key policy in B allowing that role.</li>
    </ul>
    <p>AssumeRole across accounts: trust policy on the role in the resource account + identity Allow <code>sts:AssumeRole</code> in the caller. Third-party: external ID. SCPs only cap member accounts; they never grant.</p>

    <h2>6. Cost-effective still has to be correct</h2>
    <p>Spot is not cost-effective for “job must finish / cannot interrupt.” One NAT for three AZs is cheaper and fails the HA stem. Glacier Deep Archive is cheaper and fails “users need the object in milliseconds.” Gateway endpoint is cheaper than NAT for S3 and is the right cost answer when the destination is S3/DynamoDB in-Region from that VPC.</p>

    <h2>7. Identity products are not interchangeable</h2>
    <p>Workforce SSO → IAM Identity Center. App users sign-in → Cognito user pool. Temporary AWS keys for mobile/guest → Cognito identity pool. IAM users with long-lived keys are almost never the least-privilege modern answer.</p>

    <p>Long tables: <a href="#/misses">What people miss</a> and <a href="#/compare">service vs service</a>. Then a timed set — stamina is part of 65 / 130.</p>
  `,
  traps: [
    "Using a community ‘most missed topic %’ as if AWS published it.",
    "Gateway VPC endpoint for on-prem S3.",
    "Read replica when the stem asked for automatic failover.",
    "Spot when the workload cannot be interrupted.",
  ],
  quiz: [
    {
      q: "Private subnets in one VPC copy TBs/day from S3 in the same Region. The company wants the lowest cost and no public internet path. First design change?",
      choices: [
        "Gateway VPC endpoint for S3 associated with the private route tables",
        "A NAT gateway in each AZ so S3 goes out and back in",
        "An interface endpoint for S3, because gateway endpoints cannot be used for S3",
        "Enable Transfer Acceleration on the bucket as the authorization mechanism",
      ],
      answer: 0,
      explain:
        "AWS: S3 gateway endpoints are free of additional charge and keep traffic on the AWS network from that VPC. NAT is the expensive internet path. Interface exists for S3 but is the on-prem / extra-cost pattern, not the default in-VPC cost answer. TA is speed for distant public paths, not IAM.",
    },
    {
      q: "On-premises servers must reach S3 over Direct Connect without traversing the public internet. Why is a gateway endpoint not enough?",
      choices: [
        "Gateway endpoint connections cannot be extended out of the VPC (VPN, peering, TGW, Direct Connect clients cannot use it)",
        "S3 does not support VPC endpoints of any kind",
        "Direct Connect forbids all S3 access",
        "You must use a NAT gateway in the on-premises data center",
      ],
      answer: 0,
      explain:
        "Quoted from AWS gateway endpoint considerations: the endpoint cannot be used from the other side of DX/VPN/TGW/peering. Interface endpoint (PrivateLink) is the usual exam-shaped answer for that path.",
    },
    {
      q: "Production RDS must survive an AZ failure with automatic failover. Reporting needs extra read capacity. Which pairing?",
      choices: [
        "Multi-AZ for HA, plus read replica(s) for reporting",
        "A single read replica and call it Multi-AZ",
        "One RDS in one AZ and hope",
        "DynamoDB global tables as the only RDS HA mechanism",
      ],
      answer: 0,
      explain:
        "Community miss: replica ≠ Multi-AZ. Replica scales reads; Multi-AZ (or Aurora’s HA storage + failover) is the AZ failure story.",
    },
    {
      q: "Must deny one malicious CIDR at the subnet boundary. Security groups already allow only the ALB. What adds the deny?",
      choices: [
        "A NACL deny rule for that CIDR (stateless; allow return traffic explicitly)",
        "A security group deny rule",
        "Disable the internet gateway and keep the app public",
        "Amazon Macie",
      ],
      answer: 0,
      explain:
        "SGs are allow-only. NACL can deny. Macie is S3 PII, not a packet filter.",
    },
    {
      q: "A Lambda in account A must read SSE-KMS objects in a bucket in account B (CMK also in B).",
      choices: [
        "Identity policy on the Lambda role in A, plus bucket policy and KMS key policy in B that allow that role",
        "Identity policy in A only — B’s default bucket and key policies are enough",
        "Make the bucket public and use an AWS-owned key",
        "S3 Transfer Acceleration as the authorization mechanism",
      ],
      answer: 0,
      explain:
        "Cross-account S3 + customer-managed KMS: caller identity Allow and owner resource Allow on both the bucket and the key. Identity-only in A is the incomplete setup people ship.",
    },
    {
      q: "Batch workers can die and retry. The control plane database cannot be interrupted. Minimize cost.",
      choices: [
        "Spot (or Spot in the ASG) for workers; On-Demand or a Savings Plan for the database, never Spot for the DB",
        "Spot for the database because it is ‘cost-optimized’",
        "Dedicated Hosts for the workers and Spot for RDS",
        "Turn off Multi-AZ on the database to save money even though HA was required",
      ],
      answer: 0,
      explain:
        "Qualifier is minimize cost *given* interruptibility. Spot is for the fleet that can die. HA on the DB still applies if the stem required it.",
    },
  ],
});

window.SAA.extras = window.SAA.extras || {};
window.SAA.extras["high-miss"] = {
  cues: [
    {
      if: "private VPC → S3/DynamoDB, cut NAT cost",
      then: "Gateway endpoint (not from on-prem)",
    },
    { if: "on-prem → S3 private", then: "Interface endpoint / PrivateLink" },
    { if: "automatic failover in one Region", then: "Multi-AZ, not replica" },
    { if: "deny a CIDR", then: "NACL (SG cannot deny)" },
    {
      if: "cross-account S3 + SSE-KMS",
      then: "Identity in caller + bucket + key policy in owner",
    },
    { if: "cannot interrupt", then: "Not Spot" },
  ],
  exam: `<p>Last sentence first. Then kill options that break one constraint. The pairs in this lesson are the usual remaining two.</p>`,
  job: `<p>Same pairs show up in design review: people NAT to S3, call a replica HA, and put the database on Spot. The exam is those reviews with a timer.</p>`,
  labId: "lab-vpc",
};

window.SAA.compares.push(
  {
    id: "endpoints",
    title: "NAT vs gateway endpoint vs interface endpoint",
    intro:
      "AWS-documented: gateway = S3/DynamoDB, route table, no extra charge, not extendable out of the VPC. Interface = PrivateLink ENI. NAT = internet egress.",
    table: `<table><tr><th></th><th>NAT gateway</th><th>Gateway endpoint</th><th>Interface endpoint</th></tr>
      <tr><td>For</td><td>Private subnet → public internet</td><td>S3, DynamoDB from this VPC</td><td>Most AWS APIs (and S3 when gateway cannot reach the client)</td></tr>
      <tr><td>How</td><td>In a public subnet; route 0.0.0.0/0</td><td>Route to prefix list</td><td>ENI in a subnet; SG on the ENI</td></tr>
      <tr><td>Money</td><td>Hourly + per GB</td><td>No additional charge</td><td>Hourly + per GB</td></tr>
      <tr><td>On-prem / TGW</td><td>Not the S3 private pattern</td><td>Cannot be used from outside the VPC</td><td>Yes, typical hybrid private API path</td></tr></table>`,
    rule: "Same-Region S3 from private EC2 → gateway. Internet patches/yum → NAT (per AZ if HA). On-prem to AWS APIs private → interface.",
  },
  {
    id: "glacier",
    title: "S3 classes people mix with ‘Glacier’",
    intro:
      "Minimum storage duration and retrieval delay are in the S3 User Guide. Putting 30-day logs in Deep Archive is a cost own-goal.",
    table: `<table><tr><th>Class</th><th>When</th><th>Watch</th></tr>
      <tr><td>Standard</td><td>Frequent</td><td>Default hot</td></tr>
      <tr><td>Intelligent-Tiering</td><td>Unknown / changing</td><td>Monitoring fee; no retrieval fee inside tiers that auto-move</td></tr>
      <tr><td>Standard-IA / One Zone-IA</td><td>Infrequent, still milliseconds</td><td>30-day minimum; One Zone is not Multi-AZ</td></tr>
      <tr><td>Glacier Instant Retrieval</td><td>Rare, need ms</td><td>90-day minimum storage duration</td></tr>
      <tr><td>Glacier Flexible Retrieval</td><td>Archive, minutes–hours OK</td><td>90-day minimum; not interactive UI</td></tr>
      <tr><td>Glacier Deep Archive</td><td>Long-term, hours OK</td><td>180-day minimum</td></tr></table>`,
    rule: "Users clicking all day → not Deep Archive. Unknown → Intelligent-Tiering. One Zone-IA is not ‘HA archive.’",
  },
  {
    id: "cognito",
    title: "Cognito user pool vs identity pool vs Identity Center",
    intro: "Three different principals. The exam will swap the names.",
    table: `<table><tr><th></th><th>Solves</th></tr>
      <tr><td>IAM Identity Center</td><td>Workforce / employees into AWS accounts (SSO)</td></tr>
      <tr><td>Cognito user pool</td><td>Your app’s users: sign-up, sign-in, JWTs</td></tr>
      <tr><td>Cognito identity pool</td><td>Temporary AWS credentials (authenticated or guest)</td></tr>
      <tr><td>IAM user access keys</td><td>Almost never the mobile/app answer</td></tr></table>`,
    rule: "Login screen for customers → user pool. PutObject to S3 from the phone → identity pool (often after user pool). Employees in the console → Identity Center.",
  },
  {
    id: "ddb-access",
    title: "DynamoDB Query vs Scan vs GSI",
    intro:
      "If you know the partition key, Query. Scan is the expensive full-table read.",
    table: `<table><tr><th></th><th>Needs</th><th>Cost shape</th></tr>
      <tr><td>GetItem</td><td>Full primary key</td><td>Cheapest single item</td></tr>
      <tr><td>Query</td><td>Partition key; optional sort-key condition</td><td>Reads that item collection / index slice</td></tr>
      <tr><td>Scan</td><td>Nothing — walks the table or index</td><td>You pay to read what you scanned even if FilterExpression drops rows</td></tr>
      <tr><td>GSI / LSI</td><td>A different access pattern than the base key</td><td>Model the key; don’t Scan because the key was wrong</td></tr></table>`,
    rule: "Stem gives a known userId/orderId → Query or GetItem. ‘We don’t know the key, find all’ is the rare Scan, and they often still want a GSI instead.",
  },
  {
    id: "s3-share",
    title: "Presigned URL vs CloudFront signed vs OAC vs public",
    intro:
      "Who is the client, for how long, and should the bucket stay private?",
    table: `<table><tr><th>Need</th><th>Pick</th></tr>
      <tr><td>App grants 15-minute GET/PUT to one object</td><td>Presigned URL (SDK)</td></tr>
      <tr><td>Global website/API cache, bucket private</td><td>CloudFront + OAC + bucket policy</td></tr>
      <tr><td>Paid/expiring distribution URLs</td><td>CloudFront signed URL/cookie</td></tr>
      <tr><td>Public website with no secrets</td><td>Still prefer CloudFront; public bucket is the trap</td></tr></table>`,
    rule: "Private origin + CloudFront is the default web pattern. Presigned is object-level, time-boxed, from an identity that is already allowed.",
  },
);

window.SAA.cheatsheet += `
  <h2>Qualifier words (read the last sentence)</h2>
  <p>least cost · least operational overhead · most operationally efficient · highly available · multi-Region / DR · cannot change the application · existing · customer-managed key · cannot tolerate interruption · without re-architecting · NOT · minimum · choose TWO</p>
  <h2>High-miss one-liners</h2>
  <div class="table-wrap"><table>
    <tr><td>Private VPC → S3/DynamoDB cheap</td><td>Gateway endpoint (not NAT; not from on-prem)</td></tr>
    <tr><td>On-prem → S3 private</td><td>Interface endpoint</td></tr>
    <tr><td>AZ failure, same RDS endpoint</td><td>Multi-AZ (not replica)</td></tr>
    <tr><td>Scale RDS reads</td><td>Read replica (async)</td></tr>
    <tr><td>Deny one IP</td><td>NACL</td></tr>
    <tr><td>Cross-account + SSE-KMS</td><td>Identity + bucket + key policy</td></tr>
    <tr><td>App users login</td><td>Cognito user pool</td></tr>
    <tr><td>Mobile temp AWS creds</td><td>Cognito identity pool</td></tr>
    <tr><td>Known DynamoDB key</td><td>Query / GetItem, not Scan</td></tr>
    <tr><td>Must not die</td><td>Not Spot</td></tr>
  </table></div>
`;

[
  {
    id: "c-hm1",
    front: "Gateway endpoint vs NAT for S3 in the same Region",
    back: "Gateway endpoint: route table, no extra charge, VPC-only. NAT is internet egress and you pay per GB.",
    cue: "Private EC2 → S3 cost",
  },
  {
    id: "c-hm2",
    front: "Can on-prem use an S3 gateway endpoint through DX?",
    back: "No. AWS: gateway endpoint cannot be extended out of the VPC. Use an interface endpoint.",
    cue: "Hybrid S3 private",
  },
  {
    id: "c-hm3",
    front: "RDS Multi-AZ vs read replica",
    back: "Multi-AZ = synchronous HA/failover. Replica = async reads, not the automatic AZ-failover answer.",
    cue: "HA vs scale reads",
  },
  {
    id: "c-hm4",
    front: "Security group deny?",
    back: "SGs are allow-only. Deny a CIDR with a NACL.",
    cue: "Block an IP",
  },
  {
    id: "c-hm5",
    front: "Cognito user pool vs identity pool",
    back: "User pool = sign-in for app users. Identity pool = temporary AWS credentials.",
    cue: "Login vs AWS keys",
  },
].forEach((c) => window.SAA.cards.push(c));

window.SAA.glossary.push(
  {
    t: "Qualifier",
    d: "The optimization ask in the stem (least cost, least ops, HA). Not an official AWS glossary word — the skill the exam still tests.",
  },
  {
    t: "Gateway endpoint",
    d: "VPC endpoint type for S3 and DynamoDB via route tables. No additional charge. Not usable from on-prem/TGW/peering.",
  },
  {
    t: "Interface endpoint",
    d: "PrivateLink ENI in a subnet. Most AWS APIs. Billed. Hybrid-friendly.",
  },
  {
    t: "Compensatory scoring",
    d: "Official: pass the exam overall; no per-domain passing score required.",
  },
);

bank({
  domain: 1,
  q: "A partner company needs to write into your S3 bucket. You do not want long-lived keys in their app. Minimize standing privilege in your account.",
  choices: [
    "IAM role in your account with a trust policy for their account (external ID) that they AssumeRole into; bucket policy allows that role",
    "Create an IAM user in your account and email the access keys",
    "Disable Block Public Access and use a guessable prefix",
    "Share the root user",
  ],
  answer: 0,
  explain:
    "Cross-account role + trust + optional external ID is the vendor pattern. Keys in email and public buckets are the traps.",
});
bank({
  domain: 4,
  q: "Private fleet in three AZs downloads objects from S3 all day through a single NAT in AZ A. Bill is dominated by NAT processing. HA to the internet is still required for OS patches. Best cost+HA mix?",
  choices: [
    "S3 gateway endpoint for the S3 traffic; NAT gateway in each AZ for remaining internet egress",
    "Delete all NATs and hope yum works",
    "Interface endpoint for S3 only, keep one NAT, call it HA",
    "Move the instances to a public subnet with 0.0.0.0/0 SSH",
  ],
  answer: 0,
  explain:
    "Gateway endpoint removes S3 from the NAT bill. Remaining internet still needs per-AZ NAT if the stem required HA egress.",
});
bank({
  domain: 2,
  q: "Production RDS PostgreSQL must survive an AZ outage with automatic failover in one Region. Reporting reads are not in scope yet.",
  choices: [
    "Enable RDS Multi-AZ (or use Aurora with failover)",
    "Create a read replica and treat promotion as automatic HA",
    "Nightly snapshots only, 8-hour restore, when they asked for automatic failover",
    "A single-AZ instance because it is cheaper",
  ],
  answer: 0,
  explain:
    "Multi-AZ (or Aurora HA) is automatic failover in-Region. A replica is async read scale, not that HA answer.",
});
bank({
  domain: 3,
  q: "Mobile app: customers sign in with email, then upload photos to a private S3 bucket. Least standing AWS credentials on the device.",
  choices: [
    "Cognito user pool for sign-in, identity pool for temporary AWS creds, bucket not public",
    "Cognito identity pool only, with no authentication story, and a public bucket",
    "Embed an IAM user access key in the APK",
    "IAM Identity Center for consumer sign-up",
  ],
  answer: 0,
  explain:
    "User pool = app users. Identity pool = AWS creds. Identity Center is workforce. Embedded keys and public buckets fail least privilege.",
});
bank({
  domain: 3,
  q: "DynamoDB table primary key is pk=userId, sk=orderId. Need all orders for one user. Cheapest correct API?",
  choices: [
    "Query with that userId as the partition key",
    "Scan the table and FilterExpression userId",
    "GetItem without the sort key for every possible orderId",
    "Athena on the table",
  ],
  answer: 0,
  explain:
    "Known partition key → Query. Scan still reads the table. GetItem needs the full key. Athena is not the OLTP path.",
});
bank({
  domain: 3,
  q: "Global users, static website, bucket must stay private, HTTP cache at the edge.",
  choices: [
    "CloudFront with origin access control and a bucket policy that allows only the distribution",
    "Global Accelerator in front of the S3 website endpoint",
    "Make the bucket public and add a NAT",
    "S3 Transfer Acceleration as the CDN",
  ],
  answer: 0,
  explain:
    "Cacheable HTTP + private bucket → CloudFront + OAC. GA is not a cache. TA is upload acceleration.",
});
bank({
  domain: 4,
  q: "Objects are downloaded by staff several times per day. Legal wants a cheaper class. Which class fails the access pattern?",
  choices: [
    "S3 Glacier Flexible Retrieval or Deep Archive as the only copy staff use interactively",
    "S3 Standard or Intelligent-Tiering",
    "S3 Standard-IA if access is truly infrequent and Multi-AZ is required",
    "Lifecycle to IA after 30 days if access actually drops",
  ],
  answer: 0,
  explain:
    "Flexible/Deep Archive retrieval delay is the trap for daily interactive access. The question asks which option is wrong.",
});
bank({
  domain: 2,
  q: "Cannot change a three-tier app on EC2. Traffic spikes melt the workers. Least operational overhead buffer?",
  choices: [
    "SQS between the existing web tier and workers; ASG on queue depth — no rewrite to Lambda required",
    "Rewrite the app to Lambda this sprint because serverless is always least ops",
    "One huge instance and hope",
    "CloudFront as a work queue",
  ],
  answer: 0,
  explain:
    "‘Cannot change the application’ blocks a rewrite. SQS in front of existing workers is the classic buffer. CloudFront is not a job queue.",
});
