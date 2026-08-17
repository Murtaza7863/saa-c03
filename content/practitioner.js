window.SAA.labs = [
  {
    id: "lab-account",
    title: "Harden a sandbox account",
    summary:
      "Root MFA, no root keys, billing alarm, IAM Identity Center or an admin role, activate cost tags.",
    minutes: 35,
    cost: "≈ $0",
    goal: "You can log in without root, you will get an email if spend moves, and you know which account you are in from the CLI.",
    why: `<p>Every real environment starts here. Skipping it is how people leak keys and get surprise bills while “just learning.”</p>`,
    steps: [
      {
        title: "Lock root",
        html: `<p>Sign in as root only for this step. Enable MFA on root. Do not create root access keys. Add an alternate account contact for billing/ops/security.</p>`,
        console:
          "IAM → Dashboard → Security recommendations → Activate MFA on your root user. Account → Alternate contacts.",
        cli: "# Root MFA is a console task. After you leave root:\naws sts get-caller-identity   # Arn must not be ...:root",
      },
      {
        title: "Billing alarm",
        html: `<p>Enable billing alerts in Billing preferences (us-east-1). Create a CloudWatch alarm on <code>EstimatedCharges</code> (USD) at a low threshold (e.g. $5 or $10) → SNS email. Confirm the subscription mail.</p>`,
        console:
          "Billing → Billing preferences → Receive billing alerts. Then us-east-1 → CloudWatch → Alarms → Create alarm → Billing → EstimatedCharges.",
        cli: "aws sns create-topic --name sandbox-billing --region us-east-1\n# subscribe your email, confirm the mail, then:\naws cloudwatch put-metric-alarm --region us-east-1 --alarm-name sandbox-spend --metric-name EstimatedCharges --namespace AWS/Billing --statistic Maximum --period 21600 --threshold 10 --comparison-operator GreaterThanThreshold --dimensions Name=Currency,Value=USD --evaluation-periods 1 --alarm-actions SNS_ARN",
      },
      {
        title: "Human access",
        html: `<p>Prefer IAM Identity Center in the account (or an IAM user/role with MFA <em>only</em> for a tiny sandbox). Grant yourself AdministratorAccess for learning, not for a future prod. Never put those keys in git.</p>`,
        console:
          "IAM Identity Center → Enable (if not already) → Users → your email → permission set AdministratorAccess. Or IAM → Users → Create user → console access + MFA.",
        cli: "aws sts get-caller-identity   # after you leave root, this must not be the root ARN",
      },
      {
        title: "CLI identity",
        html: `<p>Open CloudShell from the console (terminal icon) or install AWS CLI locally. Configure SSO or a profile. Run <code>aws sts get-caller-identity</code>. Save the account ID. You will use this before every destructive command.</p>`,
        console:
          "Top bar → CloudShell. Or IAM → your user → Security credentials → create an access key only if you must (prefer SSO).",
        cli: "aws sts get-caller-identity\naws configure list",
      },
      {
        title: "Tags",
        html: `<p>Create a tag policy in your head: <code>env=sandbox</code>, <code>team=you</code>, <code>service=lab</code>. Activate those keys as cost allocation tags (can take a day to show in Explorer).</p>`,
        console:
          "Billing → Cost allocation tags → activate env, team, service.",
        cli: "aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-08-18 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE",
      },
    ],
    verify: `<p>You can open the console without root. You received a test SNS. CLI shows your role/user, not an anonymous error.</p>`,
    teardown: `<p>Keep the alarm. Delete unused IAM users/keys. No compute to delete yet.</p>`,
  },
  {
    id: "lab-vpc",
    title: "Build a two-AZ VPC",
    summary:
      "Public/private subnets, IGW, NAT (or skip NAT and use endpoints), S3 gateway endpoint, flow logs.",
    minutes: 50,
    cost: "NAT ≈ $/hour if you create one — delete same day",
    goal: "A VPC you could drop an ALB and an app into. You can explain every route table line.",
    why: `<p>If you only memorize “private subnet,” you will still fail when a packet has nowhere to go. Build it once with your hands.</p>`,
    steps: [
      {
        title: "CIDR and subnets",
        html: `<p>VPC <code>10.20.0.0/16</code> in one Region. Four subnets: public A <code>10.20.0.0/24</code>, public B <code>10.20.1.0/24</code>, private A <code>10.20.10.0/24</code>, private B <code>10.20.11.0/24</code> in two AZs. Enable DNS hostnames.</p>`,
        console:
          "VPC → Your VPCs → Create VPC → VPC and more. 2 AZs, 2 public + 2 private, no NAT yet if you want cheap.",
        cli: "aws ec2 create-vpc --cidr-block 10.20.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=lab},{Key=env,Value=sandbox}]'\naws ec2 modify-vpc-attribute --vpc-id VPC_ID --enable-dns-hostnames",
      },
      {
        title: "Internet path",
        html: `<p>Attach an IGW. Public route tables: <code>0.0.0.0/0 → IGW</code>. For learning HA NAT: one NAT GW in each public subnet (expensive). For a cheap lab: one NAT in AZ A only, and know that is a SPOF — or skip NAT and use endpoints only.</p>`,
        console:
          "VPC → Internet gateways → Attach. Route tables → public → 0.0.0.0/0 → IGW. NAT gateways only if you need outbound from private (delete same day).",
        cli: "aws ec2 create-internet-gateway\naws ec2 attach-internet-gateway --vpc-id VPC_ID --internet-gateway-id IGW_ID\naws ec2 create-route --route-table-id RTB_PUBLIC --destination-cidr-block 0.0.0.0/0 --gateway-id IGW_ID",
      },
      {
        title: "Endpoints",
        html: `<p>Create a gateway endpoint for S3 associated to private route tables. Optionally interface endpoints for SSM if you will use Session Manager without NAT.</p>`,
        console:
          "VPC → Endpoints → Create → Gateway → com.amazonaws.REGION.s3 → private route tables.",
        cli: "aws ec2 create-vpc-endpoint --vpc-id VPC_ID --service-name com.amazonaws.REGION.s3 --route-table-ids RTB_PRIVATE_A RTB_PRIVATE_B",
      },
      {
        title: "Flow Logs",
        html: `<p>Flow log on the VPC → CloudWatch Logs. You will use this in the break/fix playbooks.</p>`,
        console:
          "VPC → Your VPCs → Flow logs → Create flow log → Filter All → Destination CloudWatch Logs.",
        cli: "aws ec2 create-flow-logs --resource-type VPC --resource-ids VPC_ID --traffic-type ALL --log-destination-type cloud-watch-logs --log-group-name /vpc/lab --deliver-logs-permission-arn ROLE_ARN",
      },
    ],
    verify: `<p>From a temporary private instance (next labs) you can <code>aws s3 ls</code> without a NAT if the gateway endpoint works. Public subnet instance can get a public IP and ping 8.8.8.8.</p>`,
    teardown: `<p>NAT gateways and EIPs first (they bill). Then endpoints, subnets, VPC — or keep the VPC for later labs and only delete NAT.</p>`,
  },
  {
    id: "lab-iam",
    title: "EC2 talks to S3 with a role",
    summary:
      "Instance profile, least-privilege bucket policy, no access keys on the box.",
    minutes: 30,
    cost: "t3.micro / t4g.micro time",
    goal: "An instance that can list one bucket and cannot list the rest of the account.",
    why: `<p>This is the credential model everything else (ECS, Lambda, CodeBuild) copies. If you still create IAM user keys for an app, stop.</p>`,
    steps: [
      {
        title: "Bucket and prefix",
        html: `<p>Create <code>lab-app-YOURNAME</code> with Block Public Access on. Put one object at <code>app/hello.txt</code>.</p>`,
        console:
          "S3 → Create bucket → Block all public access ON → Upload app/hello.txt.",
        cli: "aws s3 mb s3://lab-app-YOURNAME\naws s3api put-public-access-block --bucket lab-app-YOURNAME --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true\necho hello | aws s3 cp - s3://lab-app-YOURNAME/app/hello.txt",
      },
      {
        title: "Role",
        html: `<p>IAM role, trusted entity EC2. Policy: <code>s3:GetObject</code> and <code>s3:ListBucket</code> only on that bucket/prefix. Attach as instance profile. Add SSM core policy if you use Session Manager.</p>`,
        console:
          "IAM → Roles → Create role → AWS service → EC2. Attach a tight S3 policy + AmazonSSMManagedInstanceCore.",
        cli: "aws iam create-role --role-name lab-ec2-s3 --assume-role-policy-document file://ec2-trust.json\naws iam attach-role-policy --role-name lab-ec2-s3 --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore\naws iam create-instance-profile --instance-profile-name lab-ec2-s3\naws iam add-role-to-instance-profile --instance-profile-name lab-ec2-s3 --role-name lab-ec2-s3",
      },
      {
        title: "Launch",
        html: `<p>Launch Amazon Linux in a private subnet (or public for speed in sandbox). No key pair if using SSM. Connect. Run <code>aws s3 cp s3://bucket/app/hello.txt -</code>. Confirm <code>aws s3 ls</code> on a bucket you should not see fails.</p>`,
        console:
          "EC2 → Launch instance → Amazon Linux → IAM instance profile lab-ec2-s3 → Connect → Session Manager.",
        cli: "aws s3 cp s3://lab-app-YOURNAME/app/hello.txt -\naws s3 ls   # other buckets should AccessDenied if the role is tight",
      },
    ],
    verify: `<p><code>curl 169.254.169.254</code> (IMDSv2 token flow) shows a role, not keys you pasted. CloudTrail shows <code>AssumeRole</code> / S3 calls from the instance role.</p>`,
    teardown: `<p>Terminate the instance. You can keep the bucket for the CloudFront lab.</p>`,
  },
  {
    id: "lab-s3cf",
    title: "Private S3 + CloudFront OAC",
    summary:
      "Static site that the internet reaches only through CloudFront, not by guessing the bucket URL.",
    minutes: 40,
    cost: "CloudFront pennies if you delete soon; S3 storage pennies",
    goal: "HTTPS to a default CloudFront domain serves index.html. Direct S3 website URL is denied.",
    why: `<p>Public buckets are how leaks happen. This is the default public-content design in 2026.</p>`,
    steps: [
      {
        title: "Objects",
        html: `<p>Upload <code>index.html</code>. Keep Block Public Access on. Default encryption SSE-S3 is fine.</p>`,
        console:
          "S3 → bucket → Upload index.html. Properties: default encryption SSE-S3. Permissions: Block public access still ON.",
        cli: "echo '<h1>lab</h1>' | aws s3 cp - s3://lab-app-YOURNAME/index.html --content-type text/html",
      },
      {
        title: "Distribution",
        html: `<p>CloudFront, origin = S3 REST endpoint, Origin Access Control, redirect HTTP→HTTPS. Wait for deploy.</p>`,
        console:
          "CloudFront → Distributions → Create → Origin = S3 bucket (REST, not website) → Origin access → Origin access control settings (recommended).",
        cli: "aws cloudfront create-distribution --origin-domain-name lab-app-YOURNAME.s3.REGION.amazonaws.com\n# Prefer the console wizard the first time so OAC + bucket policy are generated together.",
      },
      {
        title: "Bucket policy",
        html: `<p>Allow <code>s3:GetObject</code> only from the CloudFront service principal with the distribution ARN condition (console can generate this).</p>`,
        console:
          "CloudFront origin settings → Copy policy → S3 → Permissions → Bucket policy → Save. Or let the console ‘update bucket policy’ checkbox do it.",
        cli: "aws s3api get-bucket-policy --bucket lab-app-YOURNAME\n# Confirm Principal is cloudfront.amazonaws.com and AWS:SourceArn is your distribution.",
      },
    ],
    verify: `<p>CloudFront URL works. S3 object URL from a private window fails. Optional: add WAF rate limit on the distribution.</p>`,
    teardown: `<p>Disable/delete the distribution (takes minutes), then the bucket if unused.</p>`,
  },
  {
    id: "lab-web",
    title: "ALB + Auto Scaling hello world",
    summary:
      "Two AZs, target group health, scale policy. Feel a 502 when health checks fail.",
    minutes: 55,
    cost: "ALB hourly + 2× small EC2 — delete same day",
    goal: "A URL that stays up if you terminate one instance. You have watched the ASG replace it.",
    why: `<p>Until you have killed an instance and watched traffic move, Multi-AZ is just a slide.</p>`,
    steps: [
      {
        title: "User data",
        html: `<p>Amazon Linux, install nginx or a tiny Python http server, respond 200 on <code>/</code>. Launch template in the VPC from lab 2, public or private + ALB in public.</p>`,
        console:
          "EC2 → Launch templates → Create. User data: install httpd/nginx, echo OK to index, start service.",
        cli: "aws ec2 create-launch-template --launch-template-name lab-web --launch-template-data file://lt.json",
      },
      {
        title: "ALB",
        html: `<p>Internet-facing ALB, listener 80, target group HTTP health check <code>/</code>, two AZs. Security groups: ALB 80 from world; instances 80 from ALB SG only.</p>`,
        console:
          "EC2 → Load Balancers → Create → Application Load Balancer. Target groups → HTTP / → two public subnets.",
        cli: "aws elbv2 create-load-balancer --name lab-alb --subnets SUBNET_A SUBNET_B --security-groups SG_ALB --scheme internet-facing --type application",
      },
      {
        title: "ASG",
        html: `<p>Min 2, desired 2, max 4, subnets in two AZs, attach the target group, ELB health checks. Optional target tracking CPU 50%.</p>`,
        console:
          "EC2 → Auto Scaling groups → Create → launch template → two AZs → attach target group → ELB health checks.",
        cli: "aws autoscaling create-auto-scaling-group --auto-scaling-group-name lab-asg --launch-template LaunchTemplateName=lab-web --min-size 2 --max-size 4 --desired-capacity 2 --vpc-zone-identifier 'SUBNET_A,SUBNET_B' --target-group-arns TG_ARN --health-check-type ELB",
      },
      {
        title: "Break it",
        html: `<p>Terminate one instance. Refresh the ALB DNS. Watch ASG launch a replacement. Then break user data so health checks fail — see 502. That pain is the lesson.</p>`,
        console:
          "EC2 → Instances → Terminate one. Target groups → Targets: one draining, one healthy. Refresh the ALB DNS in a browser.",
        cli: "aws elbv2 describe-target-health --target-group-arn TG_ARN\naws ec2 terminate-instances --instance-ids i-XXXX\ncurl -I http://ALB_DNS/",
      },
    ],
    verify: `<p>Two healthy targets. Kill one; still 200. Bad AMI → unhealthy → ASG churn. You can explain why.</p>`,
    teardown: `<p>ASG desired 0, delete ASG, ALB, target group, launch template, instances, ENIs. ALB left idle is a classic surprise bill.</p>`,
  },
  {
    id: "lab-rds",
    title: "Private RDS and SG-to-SG",
    summary:
      "MySQL or Postgres in private subnets, only the app SG can connect. Snapshot then delete.",
    minutes: 40,
    cost: "db.t3.micro / t4g.micro — stop/delete within hours",
    goal: "You connect from the app instance and you fail from a random other instance.",
    why: `<p>Public RDS + 0.0.0.0/0 is the most common sandbox malpractice and an instant exam fail.</p>`,
    steps: [
      {
        title: "Subnet group",
        html: `<p>DB subnet group covering two private subnets. No public accessibility. Encryption on. Strong password in Secrets Manager if you want extra credit.</p>`,
        console:
          "RDS → Subnet groups → Create (two private subnets). Databases → Create → Standard create → Public access No → Encryption Enable.",
        cli: "aws rds create-db-subnet-group --db-subnet-group-name lab-db --subnet-ids SUBNET_PRIV_A SUBNET_PRIV_B --db-subnet-group-description lab\naws rds create-db-instance --db-instance-identifier lab-db --engine postgres --db-instance-class db.t4g.micro --allocated-storage 20 --master-username app --master-user-password 'CHANGE_ME' --db-subnet-group-name lab-db --no-publicly-accessible --storage-encrypted --vpc-security-group-ids SG_RDS",
      },
      {
        title: "Security groups",
        html: `<p>RDS SG: 3306/5432 from app SG only. Not from a wide CIDR.</p>`,
        console:
          "VPC → Security groups → RDS SG inbound: PostgreSQL/MySQL, source = app SG (not 0.0.0.0/0).",
        cli: "aws ec2 authorize-security-group-ingress --group-id SG_RDS --protocol tcp --port 5432 --source-group SG_APP",
      },
      {
        title: "Connect",
        html: `<p>From the app instance (or SSM port forward) use the engine client. Create a table. Then try from an instance without that SG — timeout is success.</p>`,
        console:
          "EC2 → Connect → Session Manager on the app instance, then use psql/mysql against the RDS endpoint.",
        cli: "aws rds describe-db-instances --db-instance-identifier lab-db --query 'DBInstances[0].{ep:Endpoint.Address,pub:PubliclyAccessible}'",
      },
    ],
    verify: `<p>RDS is not in a public subnet. Console “publicly accessible” is No. Snapshot exists.</p>`,
    teardown: `<p>Take a final snapshot if you want, then delete the instance (don’t skip the final snapshot prompt unless you mean it). Delete SG rules. RDS idle is expensive relative to S3.</p>`,
  },
  {
    id: "lab-sqs",
    title: "API → SQS → Lambda",
    summary:
      "Decouple so a burst of messages does not require a burst of synchronous compute at the door.",
    minutes: 35,
    cost: "Pennies",
    goal: "Send 100 messages; all get processed; a poison message lands on a DLQ.",
    why: `<p>This is the production pattern for webhooks, uploads, and anything that can spike.</p>`,
    steps: [
      {
        title: "Queues",
        html: `<p>Standard queue + DLQ with <code>maxReceiveCount</code> 3. Lambda event source mapping on the main queue.</p>`,
        console:
          "SQS → Create queue (DLQ first) → Create main queue → Dead-letter queue redrive: max receives 3. Lambda → Add trigger → SQS.",
        cli: 'aws sqs create-queue --queue-name lab-dlq\naws sqs create-queue --queue-name lab-main --attributes \'{"RedrivePolicy":"{\\"deadLetterTargetArn\\":\\"DLQ_ARN\\",\\"maxReceiveCount\\":\\"3\\"}"}\'',
      },
      {
        title: "Function",
        html: `<p>Lambda logs the body. Optionally fail if body equals <code>POISON</code> so you can see the DLQ.</p>`,
        console:
          "Lambda → Create function → Node/Python. If event body is POISON, throw. Role needs SQS consume + CloudWatch Logs.",
        cli: "aws lambda create-function --function-name lab-sqs --runtime python3.12 --role ROLE_ARN --handler index.handler --zip-file fileb://fn.zip",
      },
      {
        title: "Drive it",
        html: `<p>CLI <code>send-message</code> in a loop. Watch CloudWatch logs. Send POISON three times effectively via receives.</p>`,
        console:
          "SQS → lab-main → Send and receive messages. CloudWatch → Log groups → /aws/lambda/lab-sqs.",
        cli: "aws sqs send-message --queue-url URL --message-body hello\naws sqs send-message --queue-url URL --message-body POISON\naws logs tail /aws/lambda/lab-sqs --follow",
      },
    ],
    verify: `<p>Main queue depth returns to 0. DLQ has the poison. Lambda concurrency did the scaling, not you.</p>`,
    teardown: `<p>Delete event source, function, queues.</p>`,
  },
  {
    id: "lab-watch",
    title: "Alarm a real metric",
    summary:
      "SNS email on ALB 5xx or on a custom metric. Dashboard with one number you care about.",
    minutes: 25,
    cost: "≈ $0 extra if ALB still up; otherwise alarm on a Lambda error",
    goal: "You receive an email because you broke something on purpose.",
    why: `<p>Architects who never get paged design silent failures. Make one alarm that is allowed to annoy you.</p>`,
    steps: [
      {
        title: "SNS",
        html: `<p>Topic + your email. Confirm subscription.</p>`,
        console:
          "SNS → Topics → Create → Email subscription → confirm the mail.",
        cli: "aws sns create-topic --name lab-alarms\naws sns subscribe --topic-arn ARN --protocol email --notification-endpoint you@example.com",
      },
      {
        title: "Alarm",
        html: `<p>If lab-web is live: ALB <code>HTTPCode_Target_5XX_Count</code> &gt; 0. Else: Lambda Errors &gt; 0. Action = SNS.</p>`,
        console:
          "CloudWatch → Alarms → Create → metric ALB 5xx or Lambda Errors → action SNS.",
        cli: "aws cloudwatch put-metric-alarm --alarm-name lab-5xx --namespace AWS/ApplicationELB --metric-name HTTPCode_Target_5XX_Count --statistic Sum --period 60 --threshold 1 --comparison-operator GreaterThanOrEqualToThreshold --evaluation-periods 1 --alarm-actions SNS_ARN --dimensions Name=LoadBalancer,Value=app/lab-alb/XXXX",
      },
      {
        title: "Fire it",
        html: `<p>Break the app health or invoke a failing Lambda. Wait for INSUFFICIENT_DATA → ALARM. Read the email.</p>`,
        console:
          "CloudWatch → Alarms → lab-5xx → history. Or Lambda → Test with a payload that throws.",
        cli: "aws lambda invoke --function-name lab-sqs --payload '\"POISON\"' out.json\naws cloudwatch describe-alarms --alarm-names lab-5xx",
      },
    ],
    verify: `<p>Alarm history shows a transition. You know which metric, statistic, and period you chose.</p>`,
    teardown: `<p>Delete the alarm so it doesn’t spam. Keep SNS if you want for later.</p>`,
  },
  {
    id: "lab-backup",
    title: "AWS Backup and a restore test",
    summary:
      "A backup plan on a tagged EBS or RDS, then restore and prove the data is there.",
    minutes: 35,
    cost: "Snapshot storage until you delete it",
    goal: "You have restored, not only snapshotted.",
    why: `<p>Untested backups are production folklore. The exam and ransomware both ask “can you get it back?”</p>`,
    steps: [
      {
        title: "Plan",
        html: `<p>Backup vault. Plan: daily (for lab, run on-demand). Resource assignment by tag <code>backup=yes</code> on a volume or RDS from earlier labs.</p>`,
        console:
          "AWS Backup → Vaults → Create. Backup plans → Create → assign resources by tag backup=yes.",
        cli: "aws backup create-backup-vault --backup-vault-name lab\naws ec2 create-tags --resources VOL_OR_DB --tags Key=backup,Value=yes",
      },
      {
        title: "On-demand job",
        html: `<p>Run now. Wait for completed.</p>`,
        console:
          "AWS Backup → Protected resources → Create on-demand backup → wait until Completed.",
        cli: "aws backup start-backup-job --backup-vault-name lab --resource-arn RESOURCE_ARN --iam-role-arn BACKUP_ROLE_ARN",
      },
      {
        title: "Restore",
        html: `<p>Restore to a new volume/instance in the same Region. Attach/mount or point a client at the new RDS. Confirm the file/row you wrote before backup.</p>`,
        console:
          "AWS Backup → Backup vaults → recovery point → Restore. Then EC2 attach volume / RDS connect and look for your canary row.",
        cli: "aws backup start-restore-job --recovery-point-arn RP_ARN --iam-role-arn BACKUP_ROLE_ARN --metadata file://restore.json",
      },
    ],
    verify: `<p>The restored copy has your canary data. You documented RPO as “since last job,” not “zero, vibes.”</p>`,
    teardown: `<p>Delete restored resources and recovery points you don’t need. Vaults with lots of snapshots linger on the bill.</p>`,
  },
  {
    id: "lab-cost",
    title: "Read the bill like an architect",
    summary: "Cost Explorer, a Budget, and one NAT or idle ALB hunt.",
    minutes: 25,
    cost: "$0",
    goal: "You can name your top three services by spend and have a forecast alert.",
    why: `<p>Domain 4 is this activity with a multiple-choice skin. Practitioners do it every Monday.</p>`,
    steps: [
      {
        title: "Explorer",
        html: `<p>Last 7 days, group by service, then by tag if tags already flow. Screenshot (for yourself) the top line items.</p>`,
        console:
          "Billing → Cost Explorer → Last 7 days → Group by Service. Then Group by Tag env if activated.",
        cli: "aws ce get-cost-and-usage --time-period Start=START,End=END --granularity DAILY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE",
      },
      {
        title: "Budget",
        html: `<p>Monthly cost budget with actual and forecasted alerts to SNS/email.</p>`,
        console:
          "Billing → Budgets → Create budget → Cost → actual + forecasted alerts to your email/SNS.",
        cli: "aws budgets create-budget --account-id ACCOUNT --budget file://budget.json --notifications-with-subscribers file://notify.json",
      },
      {
        title: "Hunt waste",
        html: `<p>Trusted Advisor cost checks (if support level allows) or manual: unattached EBS, idle ALB, unused EIP, NAT with S3 traffic that should be an endpoint.</p>`,
        console:
          "EC2 → Elastic IPs / Load Balancers / Volumes. VPC → NAT gateways. Trusted Advisor → Cost optimization (Business+).",
        cli: "aws ec2 describe-addresses --query 'Addresses[?AssociationId==null]'\naws elbv2 describe-load-balancers --query 'LoadBalancers[].LoadBalancerName'\naws ec2 describe-nat-gateways --filter Name=state,Values=available",
      },
    ],
    verify: `<p>You can say out loud: “If this were prod, I would delete X, add endpoint Y, and right-size Z.”</p>`,
    teardown: `<p>Keep the budget. Delete leftover lab resources from the hunt.</p>`,
  },
];

window.SAA.studio = [
  {
    id: "studio-media",
    title: "Global media site",
    hook: "Images and video for users on five continents, origin in one Region.",
    brief: `<p>A media company stores originals in one Region. Readers worldwide need low latency for images and HLS video. Editors in HQ upload large files. The bucket must not be public. Budget cares about repeat downloads.</p>`,
    options: [
      { id: "s3", label: "S3 for originals (private)" },
      { id: "cf", label: "CloudFront with OAC" },
      { id: "ta", label: "S3 Transfer Acceleration for editor uploads" },
      { id: "public", label: "Make the bucket public-read for simplicity" },
      { id: "efs", label: "EFS as the origin for all global users" },
      { id: "ga-cache", label: "Global Accelerator as the image cache" },
    ],
    need: ["s3", "cf", "ta"],
    answer: `<p>Private S3 + CloudFront OAC is the download path (cache cuts egress). Transfer Acceleration (or CloudFront uploads) helps far editors PUT into that Region. Public buckets and EFS-as-CDN are wrong. Global Accelerator does not cache HTTP objects.</p>`,
  },
  {
    id: "studio-fintech",
    title: "Encrypted payments API",
    hook: "Least privilege, CMKs, private subnets, WAF.",
    brief: `<p>A payments API on containers. PCI-ish: customer-managed keys, no public database, HTTP exploits blocked, workforce uses SSO into the account. RTO for AZ failure is automatic. App cannot move off SQL this year.</p>`,
    options: [
      { id: "ecs", label: "ECS/Fargate in private subnets behind ALB" },
      { id: "aurora", label: "Aurora/RDS Multi-AZ, private, SG from app only" },
      { id: "cmk", label: "KMS CMK for RDS/S3/EBS" },
      { id: "waf", label: "WAF on ALB or CloudFront" },
      { id: "idc", label: "IAM Identity Center for employees" },
      { id: "public-db", label: "Public RDS so developers can GUI from home" },
    ],
    need: ["ecs", "aurora", "cmk", "waf", "idc"],
    answer: `<p>Private compute + Multi-AZ SQL + CMK + WAF + Identity Center. Public RDS is the trap that fails security even if it “helps developers.” Use SSM/VPN/bastion instead.</p>`,
  },
  {
    id: "studio-hybrid",
    title: "Hybrid analytics",
    hook: "On-prem NFS lake, 80 TB, nightly increment, SQL for analysts, dashboards.",
    brief: `<p>Factory file servers speak NFS. 80 TB already, growing 1 TB/week. Nightly sync over an existing 1 Gbps DX is OK. Analysts want SQL without managing Hadoop. Execs want dashboards. Fine-grained table permissions later.</p>`,
    options: [
      { id: "datasync", label: "DataSync over Direct Connect into S3" },
      { id: "glue", label: "Glue catalog + Athena" },
      { id: "qs", label: "QuickSight on Athena" },
      { id: "snow-nightly", label: "Ship a Snowball every night forever" },
      { id: "rds-80tb", label: "Load 80 TB into a single RDS as the lake" },
      { id: "lf", label: "Lake Formation when the permission model shows up" },
    ],
    need: ["datasync", "glue", "qs", "lf"],
    answer: `<p>DataSync is the recurring NFS→S3 job; Snow is for one-shot WAN failure, not nightly forever. Athena+Glue is serverless SQL. QuickSight visualizes. Lake Formation when you need column security. RDS is not a lake.</p>`,
  },
  {
    id: "studio-serverless",
    title: "Startup API, spiky, tiny ops team",
    hook: "Idle nights, huge launches, no servers to patch.",
    brief: `<p>Five engineers. Traffic is near zero then 50× on launch days. JSON API, auth for mobile users, need a queue for image fan-out. Millisecond key-value for sessions. SQL reporting can wait until tomorrow on files in S3.</p>`,
    options: [
      { id: "apigw", label: "API Gateway + Lambda" },
      { id: "cognito", label: "Cognito for app users" },
      { id: "ddb", label: "DynamoDB for sessions/hot data" },
      {
        id: "sqs",
        label: "SQS between API and image workers (Lambda/Fargate)",
      },
      { id: "athena", label: "S3 + Athena for tomorrow’s reports" },
      { id: "eks", label: "EKS on day one because Kubernetes is impressive" },
    ],
    need: ["apigw", "cognito", "ddb", "sqs", "athena"],
    answer: `<p>Serverless fits idle→spike and a tiny team. EKS is extra ops you did not ask for. Athena covers delayed SQL so you don’t buy RDS “just in case.”</p>`,
  },
  {
    id: "studio-windows",
    title: "Lift Windows file + web",
    hook: "IIS, SMB shares, AD, cannot rewrite this quarter.",
    brief: `<p>Legacy Windows web + a shared SMB drive. Must join corporate AD. Multi-AZ. They will re-arch in a year; this quarter is lift-and-shift with managed file storage.</p>`,
    options: [
      { id: "ec2w", label: "Windows EC2 in an ASG across 2 AZs behind ALB" },
      {
        id: "fsx",
        label:
          "FSx for Windows File Server + Managed AD (or AD reachable in VPC)",
      },
      { id: "efs", label: "EFS for the Windows SMB share" },
      { id: "mgn", label: "MGN to move the VMs if they are currently on-prem" },
      {
        id: "lambda-iis",
        label: "Rewrite IIS to Lambda this sprint as the only option",
      },
    ],
    need: ["ec2w", "fsx", "mgn"],
    answer: `<p>EFS is NFS/Linux. FSx Windows is SMB+AD. ASG+ALB for the web tier. MGN if they are coming from VMware/on-prem. A full rewrite violates “this quarter.”</p>`,
  },
  {
    id: "studio-ingest",
    title: "Clickstream and fraud",
    hook: "100k events/s, custom real-time plus a lake.",
    brief: `<p>Clickstream must feed a fraud model in seconds and also land cheaply for tomorrow’s Athena. Multiple consumers. Order per user is useful. Existing Kafka teams are not in this company.</p>`,
    options: [
      { id: "kds", label: "Kinesis Data Streams" },
      { id: "lambda", label: "Lambda (or Flink) on the stream for fraud" },
      { id: "firehose", label: "Firehose to S3 Parquet" },
      {
        id: "sqs-only",
        label:
          "SQS as the only buffer (no replay, no multiple independent cursors)",
      },
      { id: "msk-forced", label: "MSK because Kafka is always required" },
    ],
    need: ["kds", "lambda", "firehose"],
    answer: `<p>Streams: fan-out + replay + partition key = user. Lambda/Flink for real-time. Firehose for the lake. SQS is a competing-consumer queue, not a log. MSK if they already spoke Kafka — they don’t.</p>`,
  },
  {
    id: "studio-org",
    title: "Multi-account landing zone",
    hook: "New company on AWS, prod/sandbox/security split, GuardDuty everywhere.",
    brief: `<p>Security must own logs. Devs get AdministratorAccess in sandbox but must not disable logging or create IAM users in prod. Need a repeatable account vending process.</p>`,
    options: [
      { id: "ct", label: "Control Tower / Organizations + Account Factory" },
      {
        id: "scp",
        label: "SCPs on prod OU (deny StopLogging, CreateUser, leave-org)",
      },
      {
        id: "log",
        label: "Log-archive account, org CloudTrail, restricted bucket",
      },
      { id: "gd", label: "GuardDuty delegated admin" },
      { id: "oneacct", label: "One account for everything to keep it simple" },
    ],
    need: ["ct", "scp", "log", "gd"],
    answer: `<p>Multi-account is the blast-radius design. SCPs cap prod admins. Trail leaves the workload accounts. GuardDuty org-wide. One shared account is how you fail both the exam and an audit.</p>`,
  },
  {
    id: "studio-dr",
    title: "SQL DR numbers",
    hook: "RPO 1 second, RTO minutes, two Regions, MySQL compatible.",
    brief: `<p>Regulated app, MySQL-compatible SQL, users can tolerate a few minutes down, cannot lose more than about a second of data, second Region required. Cost is not “ignore money” but correctness first.</p>`,
    options: [
      { id: "aurorag", label: "Aurora Global Database" },
      { id: "nightly", label: "Nightly mysqldump to S3 Cross-Region" },
      { id: "r53", label: "Route 53 failover when you promote" },
      {
        id: "pilot-only",
        label: "Pilot light with async replica lag of hours as the whole plan",
      },
      {
        id: "ddb",
        label: "DynamoDB Global Tables (would require rewriting off SQL)",
      },
    ],
    need: ["aurorag", "r53"],
    answer: `<p>Aurora Global matches the RPO/RTO and engine. DNS (or Global Accelerator) after promote. Nightly dump misses RPO. Dynamo would violate “stay SQL.” Hours of replica lag misses RPO.</p>`,
  },
];

window.SAA.playbooks = [
  {
    id: "fix-502",
    title: "ALB 502/503",
    body: `<p><strong>Symptom:</strong> Browser or API client gets 502/503 from the load balancer.</p>
    <ol>
      <li>Target group: unhealthy targets? Health check path/code/port mismatch is #1.</li>
      <li>Security groups: instance SG must allow the ALB SG on the target port. NACL ephemeral ports if you used custom NACLs.</li>
      <li>App crashed: SSM in, <code>journalctl</code> / container logs / CloudWatch Logs.</li>
      <li>Idle timeout: app slower than ALB idle timeout → 502. Raise timeout or fix the app/queue it.</li>
      <li>All targets in one dead AZ; ASG didn’t span two AZs.</li>
      <li>Lambda target: permissions, timeout, reserved concurrency 0.</li>
    </ol>
    <p>Exam parallel: health checks on ASG+ELB, multi-AZ, SG-to-SG.</p>`,
  },
  {
    id: "fix-rds",
    title: "Can’t connect to RDS",
    body: `<p><strong>Symptom:</strong> timeout (not “bad password”). Timeouts are network. Auth errors are users/SSL.</p>
    <ol>
      <li>Publicly accessible + no IGW/public subnet = still dead. Prefer private + SSM/port forward.</li>
      <li>SG: RDS inbound from the <em>client’s SG or prefix</em>, not 0.0.0.0/0 “to test.”</li>
      <li>Route tables: client subnet can actually reach the RDS subnet (peering/TGW/NACL).</li>
      <li>Lambda in VPC: ENI subnets need routes; use RDS Proxy; reserved concurrency.</li>
      <li><code>require_ssl</code> / cert bundle if the error is TLS, not timeout.</li>
    </ol>`,
  },
  {
    id: "fix-iam",
    title: "AccessDenied",
    body: `<p>Read the error’s action and resource. Then walk evaluation:</p>
    <ol>
      <li>Identity policy Allow?</li>
      <li>Resource policy (S3/KMS/SQS) Allow if cross-account?</li>
      <li>SCP Deny? Boundary Deny? Session policy?</li>
      <li>KMS: key policy and grants, not only IAM.</li>
      <li>Wrong account/role: <code>sts get-caller-identity</code>.</li>
      <li>S3 Block Public Access and SCP region denies look like random failures.</li>
    </ol>`,
  },
  {
    id: "fix-nat-bill",
    title: "NAT bill exploded",
    body: `<ol>
      <li>Cost Explorer → EC2-Other / NAT Gateway processing.</li>
      <li>What is talking to S3/ECR/Logs/SSM through NAT? Add gateway/interface endpoints.</li>
      <li>Cross-AZ: one NAT in AZ A, traffic from AZ B pays extra and dies if AZ A dies.</li>
      <li>Interface endpoints have hourly cost — don’t create 40 unused ones.</li>
    </ol>`,
  },
  {
    id: "fix-lambda-vpc",
    title: "Lambda in VPC is slow or hangs",
    body: `<ol>
      <li>Cold start + ENI attach (improved over the years, still real with tiny concurrency).</li>
      <li>No route to the thing it calls (RDS, internet). Need NAT or endpoints.</li>
      <li>SG of Lambda vs SG of RDS.</li>
      <li>Connection storms: RDS Proxy, don’t open a new TCP conn per invoke without pooling.</li>
      <li>If it doesn’t need VPC resources, don’t put Lambda in a VPC.</li>
    </ol>`,
  },
  {
    id: "fix-s3-403",
    title: "S3 403",
    body: `<ol>
      <li>Block Public Access is on (good) but you expected a public object.</li>
      <li>OAC/bucket policy mismatch after creating CloudFront.</li>
      <li>KMS: caller lacks <code>kms:Decrypt</code> on SSE-KMS objects.</li>
      <li>Cross-account: missing bucket policy or wrong principal ARN (including <code>/*</code> on the role).</li>
      <li>Object owner / ACL leftovers — prefer bucket owner enforced.</li>
    </ol>`,
  },
  {
    id: "fix-throttles",
    title: "Throttling / quotas in DR",
    body: `<p>Failover works in a slide deck, then <code>RunInstances</code> returns 400. Request quota increases in the DR Region in peacetime. Same for Lambda concurrent, NAT per AZ, EIPs. Game-day is how you discover this.</p>`,
  },
];

window.SAA.compares.push(
  {
    id: "telemetry",
    title: "CloudWatch vs CloudTrail vs Config vs X-Ray",
    intro: "Four different questions. The exam will swap their names.",
    table: `<table><tr><th></th><th>Answers</th></tr>
      <tr><td>CloudWatch</td><td>Is it healthy/hot/erroring right now? Metrics, logs, alarms.</td></tr>
      <tr><td>CloudTrail</td><td>Who called which API?</td></tr>
      <tr><td>Config</td><td>What does the resource look like, and is it compliant?</td></tr>
      <tr><td>X-Ray</td><td>Where did this request spend its time across services?</td></tr></table>`,
    rule: "CPU alarm → CloudWatch. ‘Who deleted the SG?’ → CloudTrail. ‘Are all buckets encrypted?’ → Config. ‘Which microservice is slow?’ → X-Ray.",
  },
  {
    id: "move-data",
    title: "DataSync vs Storage Gateway vs Transfer vs Snow vs MGN vs DMS",
    intro: "Migration questions are ‘what is still true about the source?’",
    table: `<table><tr><th>Still true</th><th>Tool</th></tr>
      <tr><td>One-time or scheduled file copy, NFS/SMB</td><td>DataSync</td></tr>
      <tr><td>App must keep talking NFS/SMB/iSCSI/tape</td><td>Storage Gateway</td></tr>
      <tr><td>Partner SFTP</td><td>Transfer Family</td></tr>
      <tr><td>WAN cannot move the terabytes in time</td><td>Snow</td></tr>
      <tr><td>Whole VMs lift-and-shift</td><td>MGN</td></tr>
      <tr><td>Database engines, CDC</td><td>DMS (+ SCT if hetero)</td></tr></table>`,
    rule: "Protocol stays → Gateway. Job copy → DataSync. DB → DMS. VMs → MGN. Fat pipe missing → Snow.",
  },
  {
    id: "detect",
    title: "GuardDuty vs Inspector vs Macie vs Security Hub vs Detective",
    intro: "Detection stack. None of these replace IAM or SGs.",
    table: `<table><tr><th>Service</th><th>Question it answers</th></tr>
      <tr><td>GuardDuty</td><td>Is this behavior shady (C2, crypto, unusual API)?</td></tr>
      <tr><td>Inspector</td><td>Is this package/AMI/Lambda CVE’d?</td></tr>
      <tr><td>Macie</td><td>Is there PII in S3?</td></tr>
      <tr><td>Security Hub</td><td>What’s the org scoreboard / CIS?</td></tr>
      <tr><td>Detective</td><td>Help me investigate after a finding.</td></tr>
      <tr><td>Firewall Manager</td><td>Push WAF/SG/Shield policy to all accounts.</td></tr></table>`,
    rule: "Pick the question, then the product. GuardDuty does not block packets.",
  },
  {
    id: "front-door",
    title: "ALB vs API Gateway vs AppSync vs CloudFront",
    intro: "What is the client actually speaking?",
    table: `<table><tr><th></th><th>Use</th></tr>
      <tr><td>CloudFront</td><td>Global HTTP cache, OAC, WAF at edge</td></tr>
      <tr><td>ALB</td><td>VPC web apps, path routing, ECS/EC2/Lambda targets</td></tr>
      <tr><td>API Gateway</td><td>Managed API product: keys, usage plans, Cognito, AWS integrations</td></tr>
      <tr><td>AppSync</td><td>GraphQL and subscriptions</td></tr></table>`,
    rule: "GraphQL → AppSync. Mobile API product → API GW. Website/containers in VPC → ALB (± CloudFront).",
  },
);

[
  {
    id: "c76",
    front: "CloudWatch vs CloudTrail",
    back: "Metrics/alarms vs API audit log.",
    cue: "CPU vs who-called-what",
  },
  {
    id: "c77",
    front: "AWS Config",
    back: "Resource inventory, compliance rules, drift.",
    cue: "Are all disks encrypted?",
  },
  {
    id: "c78",
    front: "X-Ray",
    back: "Distributed tracing, service map, latency.",
    cue: "Which microservice is slow?",
  },
  {
    id: "c79",
    front: "CloudFormation StackSets",
    back: "Deploy a stack across accounts/Regions in the org.",
    cue: "Baseline in every account",
  },
  {
    id: "c80",
    front: "SSM Patch Manager",
    back: "OS patch baselines for EC2 and hybrid nodes.",
    cue: "Patch 200 instances",
  },
  {
    id: "c81",
    front: "Route 53 alias",
    back: "Apex to ALB/CloudFront/S3 website. Not a CNAME at the zone root.",
    cue: "example.com → ALB",
  },
  {
    id: "c82",
    front: "Route 53 failover vs latency",
    back: "Failover = active-passive + health. Latency = active-active nearest Region.",
    cue: "DR DNS vs global users",
  },
  {
    id: "c83",
    front: "MGN",
    back: "Lift-and-shift VMs, block replication, cutover.",
    cue: "VMware to EC2",
  },
  {
    id: "c84",
    front: "DMS + SCT",
    back: "Data replication + schema conversion for heterogeneous DBs.",
    cue: "Oracle to Aurora",
  },
  {
    id: "c85",
    front: "DataSync vs File Gateway",
    back: "Copy job vs keep NFS/SMB protocol forever.",
    cue: "Migrate vs front",
  },
  {
    id: "c86",
    front: "Transfer Family",
    back: "Managed SFTP/FTPS/FTP into S3 or EFS.",
    cue: "Partner SFTP",
  },
  {
    id: "c87",
    front: "AppSync",
    back: "Managed GraphQL and subscriptions.",
    cue: "Realtime GraphQL",
  },
  {
    id: "c88",
    front: "Lake Formation",
    back: "Fine-grained permissions on the S3/Glue lake.",
    cue: "Column security for analysts",
  },
  {
    id: "c89",
    front: "OpenSearch Service",
    back: "Managed full-text search / log analytics.",
    cue: "Search like ELK",
  },
  {
    id: "c90",
    front: "QuickSight",
    back: "BI dashboards, often on Athena/Redshift.",
    cue: "Least-ops dashboards",
  },
  {
    id: "c91",
    front: "AD Connector vs Managed AD",
    back: "Proxy to on-prem vs real HA AD in AWS.",
    cue: "Don’t store hashes vs need AWS AD",
  },
  {
    id: "c92",
    front: "AWS Batch",
    back: "Managed job queue, Spot-friendly, long jobs.",
    cue: "50k overnight jobs",
  },
  {
    id: "c93",
    front: "Rekognition / Textract / Polly",
    back: "Purpose-built vision / OCR / speech. Don’t build a GPU farm.",
    cue: "Faces, invoices, TTS",
  },
  {
    id: "c94",
    front: "VPC Flow Logs",
    back: "ACCEPT/REJECT metadata, not payloads.",
    cue: "Who scanned us?",
  },
  {
    id: "c95",
    front: "Egress-only IGW",
    back: "IPv6 outbound from private subnets. NAT GW is IPv4.",
    cue: "IPv6 egress",
  },
  {
    id: "c96",
    front: "Billing alarm",
    back: "CloudWatch on EstimatedCharges in us-east-1 + SNS. Classic practitioner + exam item.",
    cue: "Don’t get surprised",
  },
].forEach((c) => window.SAA.cards.push(c));

window.SAA.glossary.push(
  {
    t: "OAC",
    d: "Origin Access Control — CloudFront reads a private S3 bucket.",
  },
  {
    t: "StackSet",
    d: "CloudFormation deploy of the same stack across accounts/Regions.",
  },
  { t: "MGN", d: "Application Migration Service — lift-and-shift VMs." },
  {
    t: "SCT",
    d: "Schema Conversion Tool — used with DMS for heterogeneous DB moves.",
  },
  { t: "CDC", d: "Change data capture — ongoing DB replication (DMS)." },
  { t: "SPICE", d: "QuickSight in-memory acceleration engine." },
);
