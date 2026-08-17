lesson({
  id: "use-aws",
  order: 2.5,
  domain: 0,
  minutes: 10,
  title: "How you actually use AWS",
  summary:
    "The console, a terminal, and the bill — optional until a lab asks. Still no exam rules.",
  tags: ["console", "cli", "cloudshell", "billing", "hands-on"],
  body: `
    <p>You can read this as a picture. You do not have to click anything until a later lab.</p>
    <div class="arch">
      <div class="arch-label">The AWS console (the website)</div>
      <div class="arch-row">
        <div class="arch-box">Search bar — type S3, VPC, EC2…</div>
        <div class="arch-box solid">Region dropdown — top right. Most things live here.</div>
        <div class="arch-box">Account menu — who you are</div>
      </div>
      <p style="margin:.65rem 0 0">CloudShell is a terminal icon in that same bar. Same account, already signed in.</p>
    </div>

    <h2>Three ways to talk to AWS</h2>
    <div class="table-wrap"><table>
      <tr><th>Surface</th><th>What it is</th><th>When you use it</th></tr>
      <tr><td>Console</td><td>The website. Wizards and pictures.</td><td>Learning a service the first time.</td></tr>
      <tr><td>CloudShell / CLI</td><td>A terminal. Same buttons, as commands.</td><td>Repeating a step, copying from docs.</td></tr>
      <tr><td>Templates (later)</td><td>CloudFormation / Terraform — the same APIs in a file.</td><td>Anything you want to keep. Not required this week.</td></tr>
    </table></div>
    <p>Every click is an API call underneath. That is why “who deleted this?” later points at CloudTrail. You can forget the name until that lesson.</p>

    <h2>Two gotchas that save pain (still no lab required)</h2>
    <ul>
      <li><strong>Identity.</strong> You don’t “log into S3.” You sign in as a person (not root, for daily work). Apps on EC2 use a <em>role</em>, not a password file.</li>
      <li><strong>The bill.</strong> NAT gateways, load balancers, and RDS charge while they exist. When a lab needs them, it tells you to delete them the same day. Free Tier is a discount, not a promise of $0.</li>
    </ul>
    <p>When you <em>want</em> to click: <a href="#/labs/lab-account">Lab 1</a> (lock root, billing alarm). The <a href="#/use">Using AWS</a> list is a later checklist — empty boxes are fine.</p>
  `,
  traps: [
    "Studying only questions and never opening an account.",
    "Root access keys for daily work.",
    "Leaving a NAT or ALB on overnight ‘to finish tomorrow.’",
  ],
  quiz: [
    {
      q: "You are about to delete a VPC from the CLI. First command?",
      choices: [
        "aws sts get-caller-identity",
        "aws s3 rb --force on a random bucket",
        "Disable CloudTrail",
        "Create root access keys so it is easier",
      ],
      answer: 0,
      explain: "Know the account and role. Profile mix-ups destroy prod.",
    },
    {
      q: "An app on EC2 must read one S3 bucket. Least-privilege, no long-lived keys on disk.",
      choices: [
        "IAM role as instance profile, policy limited to that bucket",
        "Paste an IAM user access key into a file on the instance",
        "Make the bucket public",
        "Use the root user from the instance",
      ],
      answer: 0,
      explain:
        "Roles for compute. Same pattern for Lambda/ECS. This is how you use AWS, and how the exam expects credentials to work.",
    },
    {
      q: "Official SAA-C03 exam format includes which hands-on task?",
      choices: [
        "None — multiple choice / multiple response only",
        "Build a VPC in a simulated console",
        "SSH into a provided EC2",
        "Write a CloudFormation template from scratch in the test engine",
      ],
      answer: 0,
      explain:
        "AWS product page: 65 questions, MC or MR. Hands-on is assumed experience, not an exam lab.",
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
  exam: `<p>The exam will not ask you to click. It will assume you know that roles, Regions, and bills exist. If a stem says ‘least operational overhead,’ that is also how you should work: managed services, no pet EC2.</p>`,
  job: `<p>No account required after this lesson. When you want to click, Lab 1 is the first safe sandbox step.</p>`,
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
