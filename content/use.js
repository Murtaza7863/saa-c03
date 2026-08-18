lesson({
  id: "use-aws",
  order: 2.5,
  domain: 0,
  minutes: 10,
  title: "How you actually use AWS",
  summary:
    "The console, a terminal, and the bill — still a picture. Next lesson is an optional throwaway account.",
  tags: ["console", "cli", "cloudshell", "billing", "hands-on"],
  youCan: [
    "Find Search, the Region dropdown, and Account on a picture of the console.",
    "Say why an empty list is often the wrong Region, not a deleted resource.",
    "Prefer a role on a computer over a password file pasted on the disk.",
  ],
  body: `
    <p>You can read this as a picture of the website Amazon gives you. You do not have to click anything until a later lab.</p>
    <div class="arch">
      <div class="arch-label">The console — AWS’s website, not a special app</div>
      <div class="arch-chrome">
        <div class="arch-chrome-bar">
          <span>Search (type “storage”, “computer”…)</span>
          <span class="on">Region: Singapore ▾ <small>most things you create live here</small></span>
          <span>Account ▾</span>
        </div>
        <div class="arch-chrome-body">The big canvas is the service you opened. If a list looks empty, the Region dropdown is usually wrong — you are looking at a different geography than the one you created things in.</div>
      </div>
    </div>
    <p>The orange-ish bar at the top of the real console has a <strong>terminal icon</strong> called CloudShell. That is a command window already signed in as you. The same commands work on your laptop if you install the AWS Command Line Interface (CLI) — a program that talks to AWS by typing instead of clicking.</p>

    <h2>Three ways to talk to AWS</h2>
    <div class="table-wrap"><table>
      <tr><th>How</th><th>What it is</th><th>When</th></tr>
      <tr><td>Console</td><td>The website. Buttons and wizards.</td><td>The first time you learn a product.</td></tr>
      <tr><td>CloudShell / Command Line Interface (CLI)</td><td>A text window. Same actions, as commands.</td><td>Repeating a step, copying from a doc.</td></tr>
      <tr><td>A template file (later)</td><td>CloudFormation or Terraform — the same actions written down so you can redo them.</td><td>Anything you want to keep. Not this week.</td></tr>
    </table></div>
    <p>Every click is a request to Amazon’s programming interface underneath. A later lesson (CloudTrail) is the audit log of those requests. You can forget the name for now.</p>

    <h2>Two habits that save pain</h2>
    <ul>
      <li><strong>Who you are.</strong> You sign in as a person. The all-powerful “root” login is for a handful of account tasks, not daily work. A website on a rented computer should use a <em>role</em> (temporary permission Amazon hands the computer), not a password file you pasted onto the disk.</li>
      <li><strong>The bill.</strong> Some products charge by the hour while they exist (load balancers, managed databases, Network Address Translation gateways that give private computers a way out to the internet). Labs that need those will tell you to delete them the same day. “Free Tier” is a discount, not a promise of $0.</li>
    </ul>
    <p>When you <em>want</em> a real account: next lesson. Lab 1 is the first safe sandbox (lock root, set a billing alarm). Empty checklists are fine.</p>
  `,
  traps: [
    "Studying only questions and never opening an account when you are ready for a lab.",
    "Using the all-powerful root login for daily work.",
    "Leaving a load balancer or database running overnight ‘to finish tomorrow.’",
  ],
  quiz: [
    {
      q: "You opened Simple Storage Service (S3) in the console and the list is empty, but you are sure you created a bucket yesterday. First thing to check?",
      choices: [
        "The Region dropdown — you may be looking at a different geography",
        "Delete your account and start over",
        "Turn off the internet",
        "Create root access keys",
      ],
      answer: 0,
      explain:
        "Most resources live in one Region. The console only shows that Region.",
    },
    {
      q: "A website running on a rented computer needs to read one file bucket. How should it get permission?",
      choices: [
        "A role attached to the computer, limited to that bucket",
        "Paste a long-lived access key into a file on the computer",
        "Make the bucket public to the whole internet",
        "Sign in as root from the computer",
      ],
      answer: 0,
      explain:
        "Roles are temporary permissions Amazon hands the computer. Keys on disk get leaked.",
    },
    {
      q: "What is the Command Line Interface (CLI) in this lesson?",
      choices: [
        "A text window that does the same actions as the website, by typing",
        "A second exam you must pass",
        "The only way to use AWS",
        "A kind of database",
      ],
      answer: 0,
      explain:
        "Console = clicking. CLI / CloudShell = typing. Same account, same actions.",
    },
  ],
});

lesson({
  id: "open-account",
  order: 2.7,
  domain: 0,
  minutes: 12,
  title: "Your first hour in a real account (optional)",
  summary:
    "Create a throwaway AWS account, pick one Region, lock the root login, then Lab 1. Skip if you only want pictures today.",
  tags: ["account", "root", "mfa", "billing", "sandbox"],
  youCan: [
    "Create (or refuse) a personal sandbox account without using a company login.",
    "Leave the Region dropdown on one geography and know why empty lists happen.",
    "Turn on multi-factor authentication on root, then stop using root for daily work.",
  ],
  body: `
    <p>Everything before this lesson works without an account. Keep reading pictures if you want. When you are ready to click, use a <strong>throwaway personal account</strong> — not your employer’s, not a production website.</p>
    <div class="arch">
      <div class="arch-label">First hour, in order</div>
      <div class="arch-flow">
        <div class="arch-box solid"><strong>1. Sign up</strong><small>email + a card Amazon can bill</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>2. One Region</strong><small>pick it and leave it</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>3. Lock root</strong><small>multi-factor on the signup email</small></div>
        <span class="arch-arrow" aria-hidden="true">→</span>
        <div class="arch-box"><strong>4. Lab 1</strong><small>billing alarm, not-root login</small></div>
      </div>
    </div>

    <h2>1. Sign up</h2>
    <p>Go to the official AWS sign-up page (search “Create an AWS account” on amazon.com / aws.amazon.com). You will give an email, a name, and a payment card. Amazon uses the card if you leave things running — <strong>Free Tier is a discount, not a promise of $0</strong>.</p>
    <ul>
      <li>Use an email you control. The signup identity is <strong>root</strong>: it can do anything, including close the account.</li>
      <li>Do not create this inside a company AWS Organization unless they asked you to. A leaked lab account is a bad day at work.</li>
      <li>You can stop after pictures forever. The exam is still written questions. The account is how you learn to <em>use</em> AWS.</li>
    </ul>

    <h2>2. Pick one Region and stick to it</h2>
    <p>After you land in the console, the top bar has a Region dropdown (for example Singapore, or Northern Virginia). Almost everything you create lives in that geography. If a list looks empty tomorrow, you are usually looking at a different Region — not at a deleted bucket.</p>
    <p>Identity and Access Management (IAM) is one of the few things that is global: users and roles are not “in Singapore.” Certificates for CloudFront (the content-delivery network) are a special case you will meet in a later lab (they live in Northern Virginia, <code>us-east-1</code>).</p>

    <h2>3. Lock root, then stop using it</h2>
    <p>Root is the email you signed up with. Turn on multi-factor authentication (MFA) on that login before you do anything fun. Do not create access keys for root. Daily work is a person or a role with MFA — Lab 1 walks that.</p>

    <h2>4. Then Lab 1 — before you launch a computer</h2>
    <p>A billing alarm emails you if spend moves. That is the difference between “learning” and a nasty card charge from a load balancer you forgot. <a href="#/labs/lab-account">Open Lab 1</a> when this page makes sense. Delete lab resources the same day a lab says so.</p>
    <div class="callout trap"><strong>Still skippable</strong>Next picture lessons (who patches what, your private network) do not require an account. Come back here the morning you want to click.</div>
  `,
  traps: [
    "Using a company account ‘just for an hour.’",
    "Daily work as root after you turned MFA on.",
    "Skipping the billing alarm because Free Tier ‘should be free.’",
  ],
  quiz: [
    {
      q: "Do you need this account to finish the next picture lessons?",
      choices: [
        "No. Who-patches-what and the private-network picture still work without it.",
        "Yes. The site blocks you.",
        "Yes, or you cannot sit the exam in six months.",
        "Only if you already passed the exam.",
      ],
      answer: 0,
      explain: "The account is for labs. Pictures continue either way.",
    },
    {
      q: "You signed up. What is ‘root’?",
      choices: [
        "The email login that owns the account and can do anything",
        "A kind of database",
        "The Region dropdown",
        "A load balancer",
      ],
      answer: 0,
      explain: "Root is the signup identity. MFA on, then stop using it daily.",
    },
    {
      q: "First thing to do before you launch a rented computer for fun?",
      choices: [
        "Lab 1: MFA on root, a not-root login, a billing alarm",
        "Turn on every AWS product to ‘learn faster’",
        "Create root access keys and paste them in a chat",
        "Pick three Regions and create the same thing in all of them",
      ],
      answer: 0,
      explain:
        "Alarm first. Forgotten load balancers are how learners get billed.",
    },
  ],
});

window.SAA.extras = window.SAA.extras || {};
window.SAA.extras["use-aws"] = {
  cues: [
    {
      if: "who called the API",
      then: "CloudTrail (every console click is an API)",
    },
    { if: "app on EC2 needs S3", then: "Instance role, not keys on disk" },
    { if: "empty console / missing resource", then: "Wrong Region" },
  ],
  exam: `<p>The exam will not ask you to click. It will assume you know that roles, Regions, and bills exist. If a question says ‘least operational overhead,’ that is also how you should work: Amazon runs more of it, no pet rented computer.</p>`,
  job: `<p>No account required after this lesson. Next: open a throwaway account if you want to click, then Lab 1.</p>`,
};

window.SAA.extras["open-account"] = {
  cues: [
    {
      if: "first hour in a new account",
      then: "MFA on root, then stop using root",
    },
    { if: "empty list in the console", then: "Wrong Region" },
    {
      if: "Free Tier",
      then: "Discount, not a $0 promise — billing alarm anyway",
    },
  ],
  exam: `<p>The exam will not walk you through sign-up. It assumes you know root is dangerous, IAM is global, and resources live in a Region.</p>`,
  job: `<p>Sandbox ≠ company account. Billing alarm before any load balancer. Delete the same day.</p>`,
  labId: "lab-account",
};

window.SAA.skills = [
  {
    id: "sk-alarm",
    title: "Billing alarm + no daily root",
    proof:
      "You log in as a non-root identity with MFA. An email fires if spend moves.",
    lab: "lab-account",
  },
  {
    id: "sk-who",
    title: "Know which account you are in",
    proof:
      "CloudShell or CLI: aws sts get-caller-identity. You can read Account and Arn.",
    lab: "lab-account",
  },
  {
    id: "sk-region",
    title: "Drive the Region picker",
    proof:
      "You can find a resource you created by switching Region. You know IAM is global and CloudFront certs for the CDN live in us-east-1.",
    lab: "lab-account",
  },
  {
    id: "sk-vpc",
    title: "A VPC you can explain",
    proof:
      "Two AZs, public vs private, you can say what 0.0.0.0/0 points at in each route table.",
    lab: "lab-vpc",
  },
  {
    id: "sk-role",
    title: "Compute uses a role, not keys",
    proof:
      "EC2 (or Lambda) reads S3 via an instance/execution role. No access key file on the box.",
    lab: "lab-iam",
  },
  {
    id: "sk-s3",
    title: "Private object, public HTTPS",
    proof:
      "Bucket stays blocked-public. Users hit CloudFront (or you use a presigned URL). Direct S3 URL fails.",
    lab: "lab-s3cf",
  },
  {
    id: "sk-url",
    title: "A URL that survives killing one box",
    proof:
      "ALB + two AZs. Terminate one instance; still 200. You watched the ASG replace it.",
    lab: "lab-web",
  },
  {
    id: "sk-data",
    title: "A private database",
    proof:
      "RDS not publicly accessible. App SG can connect; a random instance cannot.",
    lab: "lab-rds",
  },
  {
    id: "sk-queue",
    title: "Decouple a spike",
    proof:
      "Messages land in SQS, Lambda drains them, a poison message hits a DLQ.",
    lab: "lab-sqs",
  },
  {
    id: "sk-page",
    title: "An alarm that paged you",
    proof: "You broke something on purpose and got the email.",
    lab: "lab-watch",
  },
  {
    id: "sk-restore",
    title: "A backup you restored",
    proof:
      "Not only a snapshot job — you opened the restored copy and saw your canary data.",
    lab: "lab-backup",
  },
  {
    id: "sk-bill",
    title: "You can read the bill",
    proof:
      "Top three services this week. A budget alert exists. You deleted or stopped leftover NAT/ALB/RDS.",
    lab: "lab-cost",
  },
];

window.SAA.cliRecipes = [
  {
    t: "Who am I?",
    c: "aws sts get-caller-identity",
  },
  {
    t: "Set Region for this shell",
    c: "export AWS_REGION=us-east-1   # or aws configure set region us-east-1 --profile NAME",
  },
  {
    t: "List buckets / copy an object",
    c: "aws s3 ls\naws s3 cp s3://BUCKET/app/hello.txt -",
  },
  {
    t: "EC2 in this Region",
    c: "aws ec2 describe-instances --query 'Reservations[].Instances[].{id:InstanceId,az:Placement.AvailabilityZone,st:State.Name}' --output table",
  },
  {
    t: "Send a queue message",
    c: "aws sqs send-message --queue-url URL --message-body 'hello'",
  },
  {
    t: "Tail a log group (needs CLI v2)",
    c: "aws logs tail /aws/lambda/FUNCTION --follow",
  },
];
