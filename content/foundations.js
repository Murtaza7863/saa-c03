lesson({
  id: "start-here",
  order: 1,
  domain: 0,
  minutes: 8,
  title: "What AWS is (you can start here)",
  summary:
    "Amazon Web Services rents you computers in someone else’s buildings. Two finish lines: use AWS, and sit the written exam.",
  tags: ["beginner", "overview", "pictures", "labs"],
  youCan: [
    "Say what AWS is in one sentence (rent computers, disks, and networks in Amazon’s buildings).",
    "Point at the picture: you → the internet → one Region.",
    "Know you do not need an account or an exam score today.",
  ],
  body: `
    <p>You do not need an account yet. You are not taking an exam today.</p>
    <p><strong>Amazon Web Services (AWS)</strong> is Amazon’s cloud company. Instead of buying a computer and putting it in a closet, you rent a computer (and disks, and a database) in Amazon’s buildings. You ask for it in a website. They charge you for what you leave running.</p>

    <div class="arch">
      <div class="arch-label">The whole idea</div>
      <div class="arch-flow">
        <div class="arch-box solid"><strong>You</strong><small>laptop and a web browser</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>The internet</strong><small>the public network</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-region">
          <div class="arch-label">One AWS Region — a campus of data centers in one geography</div>
          <div class="arch-box">A rented computer</div>
          <div class="arch-box">A place to keep files</div>
          <div class="arch-box">A rented database</div>
        </div>
      </div>
    </div>
    <p>Read the arrows left to right: you, then the internet, then <em>one</em> Region. A Region is not “the whole cloud.” It is one geography (for example Singapore, or Northern Virginia). Stuff you create there stays there unless you copy it.</p>

    <h2>Nicknames you will see on the next screens</h2>
    <p>AWS gives each rented piece a product name. You do not need to memorize the list. Three are enough for this picture:</p>
    <ul>
      <li><strong>Elastic Compute Cloud (EC2)</strong> — the rented computer.</li>
      <li><strong>Simple Storage Service (S3)</strong> — a bucket of files you reach over the internet, not a disk plugged into one computer.</li>
      <li><strong>Relational Database Service (RDS)</strong> — a rented MySQL or PostgreSQL database that AWS runs for you.</li>
    </ul>

    <h2>How this course teaches</h2>
    <div class="arch">
      <div class="arch-row how-learn">
        <div class="arch-col">
          <div class="arch-box solid">1. A picture</div>
          <p>Boxes and arrows, like the one above. Lesson 2 zooms into the Region box.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box">2. Plain language</div>
          <p>What the picture is for. Full name first, then the short name in brackets.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box">3. Clicking, later</div>
          <p>Optional practice in a throwaway account. The exam is still a written multiple-choice test — not a live lab.</p>
        </div>
      </div>
    </div>

    <h2>What you will not do today</h2>
    <ul>
      <li>Memorize a passing score or eighty product names.</li>
      <li>Open an AWS account. That comes when a later lesson says “lab.”</li>
      <li>Worry about an empty checklist. Empty is normal on day one.</li>
    </ul>
    <div class="callout tip"><strong>Words</strong>Later lessons underline short names. Hover a dotted word for a plain meaning, or open Glossary. You do not need to memorize the list today.</div>
    <div class="callout tip"><strong>Two finish lines</strong>
      <p><strong>Use AWS:</strong> after Foundations, do the linked labs in a throwaway account (billing alarm first). The Using AWS checklist is how you know you can actually log in, build a network, and not get a surprise bill.</p>
      <p><strong>Sit the exam:</strong> the test is still a written multiple-choice exam (Solutions Architect Associate, code SAA-C03). Switch to Exam mode after you have the pictures. You will not take it today.</p>
    </div>
    <div class="callout tip"><strong>Next</strong>Zoom into the Region: two buildings that can fail separately. Still no account.</div>
  `,
  traps: [],
  quiz: [
    {
      q: "Do you need an AWS account before the next lesson?",
      choices: [
        "No. Next is a picture of Regions. An account comes later, if you want a lab.",
        "Yes, or the site will not continue.",
        "Yes, and you should use the all-powerful root login for everything.",
        "Only if you have already passed the exam.",
      ],
      answer: 0,
      explain:
        "Early lessons are pictures and short explanations. Labs are optional and labeled.",
    },
    {
      q: "In the picture, what is a Region?",
      choices: [
        "One geography where Amazon has a campus of data centers",
        "Your laptop",
        "The entire internet",
        "A single hard drive in Oregon",
      ],
      answer: 0,
      explain:
        "A Region is a place (Singapore, Virginia, …). You pick one. Things you create do not magically appear in every Region.",
    },
    {
      q: "This course also prepares you for a written exam (Solutions Architect Associate). What is that exam?",
      choices: [
        "Multiple-choice questions about design — no live console",
        "A timed lab where you click Create Network in a fake console",
        "Amazon watching you build a real company website",
        "A phone interview with an Amazon employee",
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
  title: "How the written exam thinks",
  summary:
    "The test is a short story. You pick the design that hits every constraint — not the famous one, and not a live console.",
  tags: ["exam", "format", "well-architected"],
  youCan: [
    "Say the exam is 65 written questions, no AWS website to click.",
    "Read the last sentence first (the ask), then kill answers that miss a constraint.",
    "Default “stay up” in one country: two Availability Zones plus a load balancer — not three Regions.",
  ],
  body: `
    <p>You already have a picture of Regions, accounts, your private network (Virtual Private Cloud), and the service map. The exam is that picture turned into a short story. You pick the design that hits <strong>every</strong> constraint, not the product you heard of first.</p>
    <div class="arch">
      <div class="arch-label">A tiny example (not a real exam item)</div>
      <div class="arch-box" style="margin-bottom:.5rem">Story: a website in one country must stay up if one data center dies. Keep cost reasonable.</div>
      <div class="arch-row">
        <div class="arch-box">One rented computer + an alarm — cheap, dies with the building</div>
        <div class="arch-box solid">Two Availability Zones + a load balancer — the usual answer</div>
        <div class="arch-box">Three Regions all live at once — works, costs a lot, the story did not ask</div>
      </div>
    </div>
    <p>That is the whole game: underline the <em>ask</em>, kill answers that miss a constraint, ignore extra services nobody requested.</p>

    <h2>Format (official — for when you sit the test)</h2>
    <p>Skim this. You do not need it memorized to keep learning.</p>
    <ul>
      <li>65 questions, 130 minutes. Multiple choice or multiple response (pick one, or pick two or more). No console.</li>
      <li>50 scored, 15 unscored (unlabeled). A blank answer counts as wrong, so guess.</li>
      <li>Pass at scaled <strong>720</strong> / 1000 for the exam as a whole (a weak topic can be saved by a strong one).</li>
      <li>Weights: who-can-do-what / security 30%, stay-up 26%, pick-the-right-box 24%, cost 20%.</li>
    </ul>
    <p>AWS describes the target candidate as someone with about a year of hands-on <em>design</em>. That is who the questions are written for. It is not a gate on this course — pictures and labs are how you get there.</p>

    <h2>Four filters hiding in most items</h2>
    <ol>
      <li><strong>Secure?</strong> Who can do what, private network, encryption.</li>
      <li><strong>Resilient (stay up)?</strong> Two Availability Zones unless they asked for another Region (a whole city dying, or users far away).</li>
      <li><strong>Performs?</strong> Right storage, database, cache, copies near the user.</li>
      <li><strong>Costs?</strong> Don’t pay for a second Region if they only asked to stay up in one geography.</li>
    </ol>
    <div class="callout tip"><strong>How to read the question</strong>The last sentence is the ask. Watch for: <em>least cost, lowest latency, customer-managed keys, cannot change the application</em>. The tempting wrong answer usually gets three of four right.</div>
  `,
  traps: [
    "Picking the most AWS services. Extra services that are not required are wrong.",
    "Picking three Regions when the story only needs two buildings in one city.",
    "Ignoring ‘the application cannot be changed’ — that often forces a queue or a proxy instead of a rewrite.",
  ],
  quiz: [
    {
      q: "A question says the company needs a website in one Region to stay up if one data center dies, at the lowest cost. Default answer?",
      choices: [
        "One rented computer with an alarm",
        "At least two Availability Zones (two building-clusters) plus a load balancer",
        "The website live in three AWS Regions at once",
        "A tiny copy sitting cold in a second Region",
      ],
      answer: 1,
      explain:
        "Stay-up in one geography is two Availability Zones. A second Region is for disaster or global users, and it costs more. The story did not ask for that.",
    },
    {
      q: "Passing score and scoring model for this exam?",
      choices: [
        "700, and you must pass every domain",
        "720 scaled, for the exam as a whole (a weak domain can be saved)",
        "800, exam as a whole",
        "720, but you must pass the security domain",
      ],
      answer: 1,
      explain: "720 scaled. You pass or fail the exam as a whole.",
    },
    {
      q: "The last sentence says ‘minimize operational overhead’ (Amazon should run more of it). What does the exam usually want?",
      choices: [
        "You install and patch the software on a rented computer",
        "A managed or serverless AWS service that still meets the other constraints",
        "Always a Lambda function, even for a 24/7 Oracle database that must keep state",
        "Always Kubernetes on rented computers",
      ],
      answer: 1,
      explain:
        "Managed or serverless wins when it fits. Lambda is not a universal replacement for a stateful commercial database.",
    },
  ],
});

lesson({
  id: "global-infra",
  order: 2,
  domain: 0,
  minutes: 12,
  title: "Where your stuff lives",
  summary:
    "A Region is a geography of data centers. An Availability Zone is one building-cluster that can fail on its own.",
  tags: ["region", "az", "cloudfront", "route53", "latency"],
  youCan: [
    "Draw one Region with two Availability Zones and say what happens if one building loses power.",
    "Say why a second Region is a different city (disaster, or users far away) — not the default for ‘stay up’.",
    "Explain CloudFront as copies of files sitting closer to the user.",
  ],
  body: `
    <p>Zoom into the Region box from lesson 1. Inside one Region, Amazon runs several isolated clusters of buildings. Each cluster is an <strong>Availability Zone</strong> (AZ for short). Think: two (or more) separate buildings in the same city, with their own power and cooling, linked by a very fast private network.</p>

    <div class="arch">
      <div class="arch-label">One Region, two Availability Zones — the usual production picture</div>
      <div class="arch-region">
        <div class="arch-label">Region (one geography — “the city”)</div>
        <div class="arch-row">
          <div class="arch-az">
            <div class="arch-label">Availability Zone A — one building-cluster</div>
            <div class="arch-box">Your website’s computer</div>
            <div class="arch-box">Database (the live copy)</div>
          </div>
          <div class="arch-az">
            <div class="arch-label">Availability Zone B — a different building-cluster</div>
            <div class="arch-box">A second computer, same app</div>
            <div class="arch-box">Database (a hot standby copy)</div>
          </div>
        </div>
        <p class="arch-box" style="margin-top:.5rem;text-align:center"><strong>Load balancer</strong><small>sits in front of both buildings and sends visitors to a healthy computer</small></p>
      </div>
    </div>
    <p>If building A loses power, building B is still up. That is <strong>high availability</strong> (the site stays up through a common failure) inside <em>one</em> Region. You have not left the city.</p>
    <p>A <strong>second Region</strong> is another city. You pay for that when the story is disaster recovery (the whole city is gone) or users who live far away. Two Availability Zones ≠ two Regions.</p>
    <p>The letters in names like <code>us-east-1a</code> are shuffled per account, so your “1a” is not your coworker’s “1a.”</p>

    <h2>Files near the user (the edge)</h2>
    <p>People in another country should not wait for every image to travel from your Region. Amazon copies cacheable files (pictures, scripts) to lots of small sites around the world. That product is <strong>CloudFront</strong>, Amazon’s content delivery network (CDN).</p>
    <div class="arch">
      <div class="arch-label">A user far away</div>
      <div class="arch-flow">
        <div class="arch-box solid"><strong>User</strong><small>another country</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Nearby CloudFront cache</strong><small>a copy of the image</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Your Region</strong><small>only if the cache misses</small></div>
      </div>
    </div>
    <p><strong>Route 53</strong> is Amazon’s Domain Name System (DNS) — the internet’s phone book that turns <code>example.com</code> into an address. You will use it later for “send people to a healthy Region.”</p>

    <h2>Names you can ignore until they show up in a story</h2>
    <ul>
      <li><strong>Local Zones</strong> — extra capacity in a metro, still tied to a parent Region. For “must be a few milliseconds from this city.”</li>
      <li><strong>Outposts</strong> — Amazon’s racks in <em>your</em> building, for hybrid or data that cannot leave the premises.</li>
    </ul>
    <p>Simple Storage Service (S3) keeps copies of an object across several Availability Zones in a Region so a disk dying rarely loses the file. That is <em>durability</em> (the bits survive). It is not the same as “the website always loads this millisecond” (<em>availability</em>).</p>
  `,
  traps: [
    "Treating two Availability Zones and two Regions as the same thing.",
    "Putting the only copy of something in one Availability Zone and calling it highly available.",
    "Using CloudFront when the traffic is not web files (CloudFront caches HTTP). The other ‘make it faster worldwide’ tool is Global Accelerator, which is a fast path, not a file cache.",
  ],
  quiz: [
    {
      q: "A database must keep running if one data center building fails, and everything can stay in one AWS Region. First design?",
      choices: [
        "Copy the database to a second Region",
        "Run the database in two Availability Zones (Multi-AZ)",
        "One rented computer with a bigger disk",
        "Turn on CloudFront in front of the database",
      ],
      answer: 1,
      explain:
        "A data center dying is an Availability Zone failure. Two Availability Zones in the same Region is the usual answer. A second Region is a different city.",
    },
    {
      q: "A photo website has visitors worldwide. Where should the photos be cached?",
      choices: [
        "CloudFront (content delivery network) in front of Simple Storage Service (S3)",
        "A bigger disk on one computer",
        "Route 53 only, with no cache",
        "A second database in the same Availability Zone",
      ],
      answer: 0,
      explain:
        "S3 holds the originals. CloudFront holds copies near the user. Route 53 is DNS, not a file cache.",
    },
    {
      q: "Two Availability Zones vs two Regions — which sentence is true?",
      choices: [
        "Two Availability Zones = two buildings in the same geography. Two Regions = two geographies.",
        "They are the same thing with different names.",
        "Two Regions is cheaper than two Availability Zones.",
        "You cannot use two Availability Zones unless you also use two Regions.",
      ],
      answer: 0,
      explain:
        "Availability Zone = fail a building, stay in the city. Region = fail the city.",
    },
  ],
});

lesson({
  id: "shared-waf",
  order: 3,
  domain: 0,
  minutes: 10,
  title: "Who patches what — and the root login",
  summary:
    "Amazon secures the buildings. You secure the settings, accounts, and data you put in them.",
  tags: ["shared responsibility", "iam", "root", "organizations"],
  youCan: [
    "Say who patches a rented computer (you) vs a rented database engine (Amazon, in a window you choose).",
    "Treat root as a break-glass login: multi-factor authentication on, not for daily work.",
    "Prefer a separate account for experiments vs a public website.",
  ],
  body: `
    <h2>Shared responsibility</h2>
    <p>Amazon is responsible for the buildings, the hardware, and the software that <em>is</em> AWS. You are responsible for how you set things up: who can log in, which doors are open, whether data is encrypted, and your application code.</p>
    <div class="arch">
      <div class="arch-label">How much you patch depends on what you rented</div>
      <div class="arch-flow">
        <div class="arch-box"><strong>Rented computer (EC2)</strong><small>You patch the operating system. Amazon patches the building.</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Rented database (RDS)</strong><small>Amazon patches the database engine (in a window you choose). You still set users, encryption, and the network.</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box solid"><strong>S3 / Lambda</strong><small>No operating system for you. You still own the data and the permissions.</small></div>
      </div>
    </div>
    <p><strong>Identity and Access Management (IAM)</strong> is the product that answers “who is this, and what are they allowed to do?” <strong>Multi-factor authentication (MFA)</strong> is a second check (phone or hardware key) on top of a password.</p>
    <h2>Root user</h2>
    <p>Every AWS account has a root login — the email you signed up with. It can do anything, including close the account. Turn on MFA, do not use it for daily work, do not create long-lived access keys for it. Day-to-day you use IAM Identity Center (workforce sign-in) or IAM users/roles.</p>
    <h2>One account vs many</h2>
    <p>Do not run production experiments in the same account as a public website. <strong>AWS Organizations</strong> is a folder of accounts with one bill. A <strong>Service Control Policy (SCP)</strong> is a guardrail on an account: it can only <em>shrink</em> what IAM allows, never grant extra. Full lesson in Domain 1. For now: isolation can be “a different account,” not only “a different network.”</p>
  `,
  traps: [
    "Saying AWS is responsible for security groups or IAM policies.",
    "Using the root user for API calls.",
    "Expecting an SCP to grant permissions.",
  ],
  quiz: [
    {
      q: "Who is responsible for applying operating-system patches on a rented computer (Elastic Compute Cloud / EC2)?",
      choices: [
        "AWS only",
        "The customer",
        "Shared equally on every Tuesday",
        "AWS Support if you have Business plan",
      ],
      answer: 1,
      explain:
        "You own the operating system on Elastic Compute Cloud (EC2). Amazon Relational Database Service (RDS) and Lambda shift that work to Amazon.",
    },
    {
      q: "What can a Service Control Policy (SCP) do?",
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
  title: "Your private network (VPC)",
  summary:
    "A Virtual Private Cloud is your private network inside a Region. Public vs private is which road goes to the internet.",
  tags: ["vpc", "subnet", "igw", "nat", "nacl", "security group"],
  youCan: [
    "Draw visitors → Internet Gateway → public load balancer → private app → private database.",
    "Say public vs private as a route, not a checkbox.",
    "Use a security group (firewall on a computer) as the daily door; a network ACL is the extra building-level one.",
  ],
  body: `
    <p>A <strong>Virtual Private Cloud (VPC)</strong> is your private network in one Region. You pick an address range (for example <code>10.0.0.0/16</code> — a block of private IPv4 addresses). You slice it into <strong>subnets</strong>. Each subnet lives in <strong>exactly one Availability Zone</strong>.</p>
    <h2>Public vs private is a route, not a checkbox</h2>
    <p>A subnet is <em>public</em> if its route table sends “unknown destinations” (<code>0.0.0.0/0</code>) to an <strong>Internet Gateway</strong> (the door between your VPC and the public internet) and the machine has a public address. A subnet is <em>private</em> if that default road goes nowhere, or only to a <strong>NAT gateway</strong> (Network Address Translation — private machines can go <em>out</em> to download patches, the internet cannot come <em>in</em>).</p>
    <div class="arch">
      <div class="arch-label">A common website layout (read left to right)</div>
      <div class="arch-flow">
        <div class="arch-box solid"><strong>Internet</strong><small>visitors</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Internet Gateway</strong><small>the door</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Public subnet</strong><small>Application Load Balancer (the receptionist)</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Private subnet</strong><small>your app computers</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>Private subnet</strong><small>the database — no road to the internet</small></div>
      </div>
    </div>
    <h2>Security group vs network ACL</h2>
    <p>A <strong>security group</strong> is a firewall attached to a network interface (a computer, a load balancer, a database). It is <em>stateful</em>: if you allow a request in, the reply is allowed out automatically. Rules are allow-only.</p>
    <p>A <strong>network access control list (network ACL)</strong> is a firewall on a whole subnet. It is <em>stateless</em>: you must allow the return path yourself. You can allow and deny. Day to day you use security groups. Network ACLs are a coarse extra deny (block a bad address at the subnet) or exam trivia about extra ports.</p>
    <h2>How packets leave AWS</h2>
    <ul>
      <li><strong>Internet Gateway</strong> — in and out for public subnets.</li>
      <li><strong>NAT gateway</strong> — private IPv4 out only. Billed hourly + per gigabyte. Prefer a <strong>VPC endpoint</strong> when the destination is another AWS product (Simple Storage Service, DynamoDB) so traffic stays private and cheaper.</li>
      <li><strong>VPN or Direct Connect</strong> (via a virtual private gateway or Transit Gateway) — your office or data center.</li>
      <li><strong>VPC peering</strong> — two VPCs, one-to-one. Not transitive: A–B and B–C does not give A–C. Three VPCs that all need to talk: <strong>Transit Gateway</strong> (a hub).</li>
    </ul>
    <div class="callout tip"><strong>Default picture for the exam</strong>Load balancer in public subnets, app and database in private, database security group allows only the app’s security group (not the whole internet).</div>
  `,
  traps: [
    "Assigning a public IP and forgetting the Internet Gateway route — still not reachable.",
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
  minutes: 16,
  title: "Computers, files, and databases — the first map",
  summary:
    "Seven boxes you will see everywhere. Later lessons go deep. This stops you mixing a disk, a bucket, and a database.",
  tags: ["ec2", "lambda", "s3", "ebs", "rds", "dynamodb"],
  youCan: [
    "Point at EC2 (rented computer), Lambda (a short function), S3 (a bucket of files).",
    "Say EBS is a disk plugged into one computer; EFS is a shared Linux folder; S3 is not a disk.",
    "Pick RDS when they already speak SQL; DynamoDB when they have a key and need milliseconds.",
  ],
  body: `
    <p>Everything you rent on AWS is one of three jobs: <strong>run code</strong>, <strong>keep files</strong>, or <strong>keep structured data</strong>. Product names are nicknames for those jobs.</p>

    <h2>Run code</h2>
    <div class="arch">
      <div class="arch-label">Two common shapes</div>
      <div class="arch-row">
        <div class="arch-col">
          <div class="arch-box solid"><strong>Elastic Compute Cloud (EC2)</strong><small>a rented computer you leave on</small></div>
          <p>You pick the size. You patch the operating system. You pay while it exists. Wrap it with a load balancer and Auto Scaling if it must stay up and grow.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box"><strong>Lambda</strong><small>a short function Amazon runs for you</small></div>
          <p>Something happens (a file lands, a timer fires) → your code runs up to 15 minutes → you pay for that run. Not a 24/7 custom operating system, and not a giant program that must keep RAM forever.</p>
        </div>
      </div>
    </div>
    <p>Later you will meet <strong>containers</strong> (a packed app): Elastic Container Service (ECS) is Amazon’s, Elastic Kubernetes Service (EKS) is Kubernetes. Both can sit on EC2 or on Fargate (Amazon patches the computers). Forget the rest of the compute catalog until a lesson names it.</p>

    <h2>Keep files</h2>
    <div class="arch">
      <div class="arch-label">Three different “places for files” — they are not interchangeable</div>
      <div class="arch-row">
        <div class="arch-col">
          <div class="arch-box solid"><strong>Simple Storage Service (S3)</strong><small>a bucket, over the internet</small></div>
          <p>Photos, backups, a static website, a data lake. You talk to it with an API (like a website). It is <em>not</em> a disk you format and mount for a database.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box"><strong>Elastic Block Store (EBS)</strong><small>a disk plugged into one computer</small></div>
          <p>Lives in <em>one</em> Availability Zone. The boot disk of an EC2, or a database you installed yourself. Unplug it from one computer, plug into another in the same building-cluster.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box"><strong>Elastic File System (EFS)</strong><small>a shared Linux folder</small></div>
          <p>Many computers in two Availability Zones can see the same files, like a network drive. If the story says Windows / SMB, that is FSx, not EFS.</p>
        </div>
      </div>
    </div>

    <h2>Keep structured data</h2>
    <div class="arch">
      <div class="arch-label">Two common databases</div>
      <div class="arch-row">
        <div class="arch-col">
          <div class="arch-box solid"><strong>Relational Database Service (RDS)</strong><small>MySQL / PostgreSQL / … that Amazon runs</small></div>
          <p>Tables, joins, the SQL you already know. Turn on Multi-AZ so a second building has a standby. Aurora is the faster, MySQL/Postgres-compatible cousin.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box"><strong>DynamoDB</strong><small>a key → item store, no servers to patch</small></div>
          <p>You look up by a key. Answers in a few milliseconds. Millions of keys. Not “join these five tables like SQL.”</p>
        </div>
      </div>
    </div>
    <div class="callout tip"><strong>How you pick (and how the exam picks)</strong>
      <ul>
        <li>They already have SQL / joins / MySQL → RDS or Aurora.</li>
        <li>They have a key, huge scale, milliseconds, almost no ops → DynamoDB.</li>
        <li>They want reports over files in S3 → later tools (Athena / Redshift), not RDS.</li>
      </ul>
    </div>
    <p>A later page is a <a href="#/scope">phone book of in-scope names</a>. Search it when a practice question names something you have not used. Do not memorize it now.</p>
  `,
  traps: [
    "Treating S3 like a fast disk for a database (it is a bucket of objects).",
    "Using EFS for a Windows shared drive (that is FSx for Windows).",
    "Using DynamoDB when they need ad-hoc SQL joins.",
  ],
  quiz: [
    {
      q: "Many Linux rented computers in two Availability Zones need to see the same folder of files (like a network drive). Which service?",
      choices: [
        "A disk that plugs into one computer in one building (EBS)",
        "Elastic File System (EFS)",
        "Simple Storage Service (S3) as if it were a disk",
        "Disk inside one computer that dies with the computer",
      ],
      answer: 1,
      explain:
        "EFS is a shared Linux folder across buildings. EBS is one disk in one Availability Zone. S3 is a bucket, not a mountable disk.",
    },
    {
      q: "A session store: millions of keys, no SQL joins, answers in a few milliseconds, almost no servers to patch. Service?",
      choices: [
        "RDS MySQL",
        "Redshift (a warehouse for reports)",
        "DynamoDB",
        "Elastic File System (EFS)",
      ],
      answer: 2,
      explain:
        "Classic DynamoDB. RDS can fake it with pain; the exam wants the purpose-built box.",
    },
    {
      q: "You need a computer you can log into, install software on, and leave running all day. Service?",
      choices: [
        "Elastic Compute Cloud (EC2)",
        "Lambda only",
        "Simple Storage Service (S3)",
        "CloudFront",
      ],
      answer: 0,
      explain:
        "EC2 is the rented computer. Lambda is a short function. S3 holds files. CloudFront copies files closer to users.",
    },
  ],
});

lesson({
  id: "how-you-finish",
  order: 5.35,
  domain: 0,
  minutes: 8,
  title: "Two finish lines (use AWS, sit the exam)",
  summary:
    "Foundations end here. One track is clicking in a sandbox. The other is the written test. You can do both.",
  tags: ["beginner", "labs", "exam", "path"],
  youCan: [
    "Name the two finish lines and which pages prove each one.",
    "Treat AWS’s “about one year of design” as who the questions are written for — not a lock on the door.",
    "Know the suggested weeks: pictures, lock the door, stay up, the right box, the bill — labs beside each.",
  ],
  body: `
    <p>You now have pictures of Regions, the console, (optionally) an account, who patches what, a private network, and the seven boxes. From here the site splits on purpose.</p>
    <div class="arch">
      <div class="arch-row how-learn">
        <div class="arch-col">
          <div class="arch-box solid">Finish line A — use AWS</div>
          <p>A throwaway account, billing alarm, then labs 1–10 in order. Tick the <a href="#/use">Using AWS</a> checklist only when you have actually done the thing. That is how you know you can log in, build a network, put a website behind a load balancer, and not get a surprise bill.</p>
        </div>
        <div class="arch-col">
          <div class="arch-box">Finish line B — sit the exam</div>
          <p>The test is still 65 written questions (code SAA-C03). No console. After this lesson: how those questions are built, then a phone book of names, then four exam domains. Switch to <strong>Exam mode</strong> for compressed notes. Then the question trainer. Then a timed 65.</p>
        </div>
      </div>
    </div>
    <p>Official: AWS describes the target candidate as someone with about a year of hands-on <em>design</em>. That is a description of the questions, not a requirement before you start this site. Pictures + labs are how you grow into that description.</p>
    <div class="callout tip"><strong>Do both in parallel</strong>Next lessons are exam-shaped (who is allowed to do what). When a lesson has a <strong>Lab</strong> button, do that lab the same week. Skipping labs can still pass a multiple-choice test — and still leave you lost on day one of using AWS.</div>
    <p>You do not need to finish every lab before Domain 1. You do need Lab 1 before you leave anything running.</p>
    <h2>Suggested weeks (method, not official)</h2>
    <p>Hours-to-ready is not an AWS number. This is one way to walk the path without drowning in product names.</p>
    <div class="table-wrap"><table>
      <tr><th>When</th><th>Learn</th><th>Use AWS</th></tr>
      <tr><td>Week 1</td><td>Pictures (what AWS is → the seven boxes). Then two finish lines + how the test thinks.</td><td>Optional account. Lab 1: lock root, billing alarm.</td></tr>
      <tr><td>Weeks 2–3</td><td>Lock the door: who can do what, many accounts, network doors, encryption. Lookup: AD, Flow Logs.</td><td>Labs 2–3 (VPC, computer talks to S3 with a role). Lab 4 when you hit private files.</td></tr>
      <tr><td>Week 4</td><td>Stay up: load balancer, queues, two buildings, disaster in another city.</td><td>Labs 5–7 (website, private database, queue).</td></tr>
      <tr><td>Week 5</td><td>The right box. Skim lookup lessons (search, dashboards, named ML). Don’t memorize the phone book.</td><td>Lab 8 (alarm). Revisit CloudFront if needed.</td></tr>
      <tr><td>Week 6</td><td>The bill, then exam-day trees and look-alikes.</td><td>Labs 9–10 (restore a backup, read the bill).</td></tr>
      <tr><td>Then</td><td>Exam mode: trainer, then a timed 65. Official guide bookmarked.</td><td>Operate lessons + Using AWS checklist mostly ticked.</td></tr>
    </table></div>
    <p>The <a href="#/path">Learn path</a> is this table as clickable lessons. Operate lessons sit at the end on purpose — read them after a few labs, not only after you pass.</p>
  `,
  traps: [
    "Only doing questions and never opening the console when you already have an account.",
    "Treating “one year of design” as a reason to quit the course.",
    "Leaving labs for “after I pass” — the pictures stick when you have clicked them.",
  ],
  quiz: [
    {
      q: "What is finish line A on this site?",
      choices: [
        "The Using AWS checklist plus the sandbox labs, in a throwaway account",
        "Memorizing the passing score",
        "A live lab inside the Pearson VUE exam",
        "Skipping pictures and jumping to Domain 4",
      ],
      answer: 0,
      explain:
        "Using AWS is clicking and proving skills. The exam itself has no console.",
    },
    {
      q: "What is the SAA-C03 exam, officially?",
      choices: [
        "65 written multiple-choice / multiple-response questions, no AWS console",
        "A day in the console with a proctor watching you click",
        "An oral exam",
        "A programming contest",
      ],
      answer: 0,
      explain:
        "Product page and exam guide: multiple choice / multiple response only.",
    },
    {
      q: "AWS says the target candidate has about a year of hands-on design. For this course that means:",
      choices: [
        "You must quit until you have that job title",
        "That is who the questions are written for — keep going; labs are how you get hands-on",
        "You should skip Foundations",
        "You should only read Exam mode",
      ],
      answer: 1,
      explain: "Description, not a gate. This path starts from “AWS is cloud.”",
    },
  ],
});
