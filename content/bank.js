window.SAA.bank = window.SAA.bank || [];
function bank(q) {
  window.SAA.bank.push(q);
}

bank({
  domain: 2,
  q: "Need a pager when a Lambda error rate spikes. Which pairing?",
  choices: [
    "CloudWatch alarm on Errors → SNS",
    "AWS Artifact email",
    "S3 Object Lock",
    "CloudTrail as a real-time CPU alarm",
  ],
  answer: 0,
  explain: "Lambda metrics live in CloudWatch. Alarms page humans via SNS.",
});
bank({
  domain: 2,
  q: "A request crosses API Gateway, two Lambdas, and DynamoDB. Users report slowness. Best tool to see the slow segment?",
  choices: ["AWS X-Ray", "AWS WAF", "Amazon Macie", "Direct Connect"],
  answer: 0,
  explain: "Tracing = X-Ray. WAF is HTTP rules. Macie is S3 PII.",
});
bank({
  domain: 2,
  q: "Deploy a Config + GuardDuty baseline to every current and future Organization account with least click-ops.",
  choices: [
    "CloudFormation StackSets (often with Control Tower)",
    "SSH to each account’s root",
    "Email a Word doc of screenshots",
    "Amazon Rekognition",
  ],
  answer: 0,
  explain: "StackSets/Control Tower are org-scale IaC.",
});
bank({
  domain: 1,
  q: "Private EC2, no NAT gateway, must use Session Manager.",
  choices: [
    "Interface endpoints for ssm, ssmmessages, and ec2messages plus an instance profile",
    "Open 22 to 0.0.0.0/0",
    "A public NLB on port 22",
    "Disable the SSM agent",
  ],
  answer: 0,
  explain: "Three SSM-related endpoints when there is no internet path.",
});
bank({
  domain: 3,
  q: "example.com (zone apex) must resolve to an ALB.",
  choices: [
    "Route 53 alias A record to the ALB",
    "CNAME at the apex",
    "MX record to the ALB",
    "TXT only",
  ],
  answer: 0,
  explain: "Alias at the apex. CNAME at apex is the trap.",
});
bank({
  domain: 2,
  q: "Active-passive two Regions: use the secondary only when the primary ALB fails health checks.",
  choices: [
    "Route 53 failover routing + health check",
    "Simple routing to both with no health check",
    "Geolocation to a single country only",
    "Weighted 50/50 without a secondary plan",
  ],
  answer: 0,
  explain: "Failover policy is the active-passive DNS pattern.",
});
bank({
  domain: 3,
  q: "On-prem NFS must be copied nightly over Direct Connect into S3. Apps on-prem will be retired after the copy; they do not need to keep NFS forever.",
  choices: [
    "AWS DataSync",
    "File Gateway as the only answer",
    "Snowball every night forever",
    "Neptune",
  ],
  answer: 0,
  explain:
    "Scheduled copy job = DataSync. Gateway is for keeping the protocol. Nightly Snow is theater.",
});
bank({
  domain: 3,
  q: "Partners must upload via SFTP into an S3 data lake. Least server ops.",
  choices: [
    "AWS Transfer Family",
    "A public EC2 vsftpd you patch",
    "API Gateway WebSocket only",
    "CloudHSM",
  ],
  answer: 0,
  explain: "Transfer Family is managed SFTP into S3/EFS.",
});
bank({
  domain: 3,
  q: "Mobile app needs GraphQL and live subscriptions as DynamoDB items change.",
  choices: ["AWS AppSync", "NLB", "Storage Gateway Tape", "AWS Backup"],
  answer: 0,
  explain: "GraphQL + subscriptions = AppSync.",
});
bank({
  domain: 3,
  q: "Analysts need dashboards on Athena with almost no servers.",
  choices: [
    "Amazon QuickSight",
    "A GPU farm",
    "AWS Shield as BI",
    "EBS Multi-Attach",
  ],
  answer: 0,
  explain: "QuickSight is the BI service. Often sits on Athena/Redshift.",
});
bank({
  domain: 3,
  q: "Fine-grained column permissions on Glue-cataloged S3 tables.",
  choices: [
    "AWS Lake Formation",
    "NACL on the S3 public endpoint",
    "Shield Standard",
    "Placement groups",
  ],
  answer: 0,
  explain: "Lake Formation is lake governance.",
});
bank({
  domain: 3,
  q: "Product catalog search with fuzzy matching, managed, not self-hosted Solr.",
  choices: ["Amazon OpenSearch Service", "Amazon SQS", "AWS WAF", "ACM"],
  answer: 0,
  explain: "OpenSearch is managed search/log analytics.",
});
bank({
  domain: 1,
  q: "WorkSpaces must authenticate to on-prem Active Directory. Directory hashes must not be stored in AWS.",
  choices: [
    "AD Connector",
    "Cognito identity pool",
    "Macie",
    "S3 Transfer Acceleration",
  ],
  answer: 0,
  explain: "AD Connector proxies to on-prem AD. Cognito is app users.",
});
bank({
  domain: 3,
  q: "40,000 independent 90-minute rendering jobs overnight, retries, Spot.",
  choices: [
    "AWS Batch",
    "A single Lambda (15 min max)",
    "Route 53",
    "Object Lock",
  ],
  answer: 0,
  explain: "Batch is the scheduler for long embarrassingly-parallel jobs.",
});
bank({
  domain: 3,
  q: "Detect whether an uploaded image contains a face, least ML platform work.",
  choices: [
    "Amazon Rekognition",
    "Build SageMaker training from scratch this week as the only option",
    "Amazon MQ",
    "AWS Snowball",
  ],
  answer: 0,
  explain:
    "Purpose-built vision API. SageMaker is for custom models when Rekognition is not enough.",
});
bank({
  domain: 1,
  q: "Prove a security group rejected packets from a scanner IP. You do not need payloads.",
  choices: [
    "VPC Flow Logs",
    "S3 server access logs only",
    "ACM",
    "QuickSight as a sniffer",
  ],
  answer: 0,
  explain: "Flow Logs ACCEPT/REJECT metadata.",
});
bank({
  domain: 1,
  q: "IPv6 private subnet, outbound internet allowed, inbound from internet denied.",
  choices: [
    "Egress-only internet gateway",
    "NAT gateway (IPv4 product)",
    "Customer gateway only",
    "Internet gateway with no further thought about inbound",
  ],
  answer: 0,
  explain: "Egress-only IGW is the IPv6 outbound pattern. NAT GW is IPv4.",
});
bank({
  domain: 4,
  q: "Memory is not showing in basic EC2 CloudWatch metrics. You need it to right-size.",
  choices: [
    "Install CloudWatch agent (or use Compute Optimizer with the right telemetry)",
    "Enable AWS Artifact",
    "Turn on S3 Transfer Acceleration",
    "Disable detailed monitoring forever",
  ],
  answer: 0,
  explain:
    "Guest memory is not a hypervisor default metric. Agent (or related tooling) is required.",
});
bank({
  domain: 2,
  q: "Choose TWO. A company wants immutable web fleets and repeatable dev/test/prod.",
  multi: true,
  choose: 2,
  choices: [
    "CloudFormation (or equivalent IaC) with parameters per env",
    "ASG instance refresh from a new AMI/launch template",
    "SSH and yum update on Friday in prod as the release process",
    "Store prod-only passwords in the AMI",
  ],
  answer: [0, 1],
  explain:
    "IaC + replace instances. Mutating prod over SSH and baking secrets into AMIs are anti-patterns.",
});
bank({
  domain: 1,
  q: "Org trail must be readable by security and not deletable by prod admins.",
  choices: [
    "Trail to a bucket in a log-archive account with a restrictive bucket policy and Object Lock or MFA delete",
    "Trail in each prod account with full S3 admin for developers",
    "Disable trails to save money",
    "Store trails only on an EBS volume on a laptop",
  ],
  answer: 0,
  explain:
    "Central locked bucket. Prod-owned trails get deleted during incidents.",
});
bank({
  domain: 4,
  q: "Interface VPC endpoints were created for dozens of unused AWS APIs. The bill rose.",
  choices: [
    "Interface endpoints bill hourly per AZ; keep only what you need; use gateway endpoints for S3/DynamoDB",
    "Endpoints are always $0",
    "Delete the VPC as the only fix",
    "Buy Dedicated Hosts to discount endpoints",
  ],
  answer: 0,
  explain:
    "ENI hourly charges add up. Gateway endpoints for S3/Dynamo are the cheap path.",
});
bank({
  domain: 2,
  q: "API Gateway REST must dump POSTs into SQS without a Lambda in the middle.",
  choices: [
    "API Gateway AWS service integration to SQS",
    "Public SQS URL with no auth",
    "EFS",
    "Shield as a queue",
  ],
  answer: 0,
  explain:
    "REST APIs can integrate directly to SQS/Kinesis. That’s decoupling with less moving parts.",
});
bank({
  domain: 3,
  q: "On-prem VMware estate must land on EC2 with block-level replication and a short cutover.",
  choices: [
    "AWS Application Migration Service (MGN)",
    "Athena",
    "WAF",
    "QuickSight",
  ],
  answer: 0,
  explain: "MGN is lift-and-shift VMs. Athena is SQL on S3.",
});
bank({
  domain: 4,
  q: "Need Business-class Trusted Advisor cost and security checks.",
  choices: [
    "Business or Enterprise Support",
    "Basic support has the complete set",
    "Only available with Shield Advanced",
    "Only available with Control Tower",
  ],
  answer: 0,
  explain: "Full Trusted Advisor checks require Business or Enterprise.",
});
bank({
  domain: 1,
  q: "A web ACL must be applied to every ALB in every account automatically.",
  choices: [
    "AWS Firewall Manager",
    "Manual console clicks monthly",
    "Amazon MQ",
    "Snowball",
  ],
  answer: 0,
  explain: "Firewall Manager is the org-wide WAF/SG/Shield policy pusher.",
});
bank({
  domain: 3,
  q: "Users in the EU must be sent to eu-west-1 and US users to us-east-1 for data residency, not merely latency.",
  choices: [
    "Route 53 geolocation routing",
    "Latency routing only (might send a EU user to us-east-1 if it is ‘closer’ on a bad day)",
    "Simple routing",
    "Multivalue without geography",
  ],
  answer: 0,
  explain: "Residency → geolocation. Latency is performance, not law.",
});
bank({
  domain: 2,
  q: "Health checks on an ASG currently use EC2 status only. The process is dead but the instance is ‘running,’ so it is not replaced.",
  choices: [
    "Enable ELB health checks on the Auto Scaling group",
    "Remove the second AZ",
    "Disable the ALB",
    "Use a cluster placement group across three Regions",
  ],
  answer: 0,
  explain: "ELB/app health must drive replacement, not just hypervisor checks.",
});
bank({
  domain: 4,
  q: "Athena scans 12 TB of gzip JSON daily. First cost/performance move?",
  choices: [
    "Convert to Parquet/ORC, partition, stop SELECT *",
    "Move the lake to Deep Archive and query it live every morning",
    "Put the JSON on io2 Multi-Attach",
    "Enable Transfer Acceleration on SELECT",
  ],
  answer: 0,
  explain:
    "Scan cost is format and partition. Deep Archive is the opposite of daily interactive SQL.",
});
bank({
  domain: 1,
  q: "Choose TWO. Cross-account Lambda in A reads SSE-KMS objects in B.",
  multi: true,
  choose: 2,
  choices: [
    "Identity policy on the Lambda role in A allowing s3:GetObject and kms:Decrypt",
    "Bucket policy and KMS key policy in B allowing that role",
    "Make the bucket public and the key AWS-owned only",
    "Enable S3 Transfer Acceleration as the authorization mechanism",
  ],
  answer: [0, 1],
  explain:
    "Cross-account encrypted S3 needs identity in A and resource (bucket + CMK) in B. Public is not auth. TA is speed.",
});
bank({
  domain: 2,
  q: "Step Functions vs SQS: a workflow must wait for a human approval for up to 48 hours, then start EMR.",
  choices: [
    "Step Functions (wait / callback / approval) then EMR integration",
    "A Lambda with Thread.sleep for 48 hours (15 min max anyway)",
    "CloudFront",
    "NAT gateway",
  ],
  answer: 0,
  explain:
    "Long waits and service orchestration are Step Functions. Lambda cannot sleep for days.",
});
