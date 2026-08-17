# SAA-C03 Study Platform

Local course for **AWS Certified Solutions Architect – Associate (SAA-C03)** and for actually working as a cloud practitioner.

Two modes in the header:

- **Learn** — study guide path: official exam facts, then architecture, then how you would operate it. Labs, studio, break/fix. Quizzes explain immediately.
- **Exam** — compressed “if the stem says X, pick Y,” traps, timed exams, domain trainer. Same facts, exam wording.

Start with **How to study** and **What people miss**. Official numbers come from the AWS exam guide. Miss patterns are labeled community — AWS does not publish item miss rates or a pass rate.

Original scenarios. Not dumps. Not affiliated with Amazon.

## Run it

```bash
cd ~/Documents/CS/saa-c03
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Progress stays in this browser.

## How to use it

**Learn mode (job first)**

1. Foundations, then domains 1–4, then **On the job**.
2. After a lesson, do the linked **lab** in a throwaway AWS account (billing alarm first).
3. **Architecture studio** — briefs with constraints; pick building blocks; compare to a model answer.
4. **Break/fix** — ALB 502, RDS timeout, AccessDenied, NAT bills.

**Exam mode (how it is asked)**

1. Exam notes per lesson (keyword tables).
2. **Question trainer** — mixed 20, per-domain 20, or full mix 65 / 130 min.
3. Timed exams A and B.
4. Flashcards, service-vs-service, cheat sheet.

Real exam pass is scaled **720** (official). AWS does not publish a practice-test cutoff. Do not reuse the same bank until the letters stick. Domain 1 is 30% of scored content.

Do not memorize letter order. If you miss an item and cannot explain why, switch back to Learn.

## Coverage

Official SAA-C03 domains (secure 30%, resilient 26%, performance 24%, cost 20%) plus the in-scope services people actually get asked: IAM/Organizations, VPC/TGW/PrivateLink, WAF/Shield/GuardDuty/Macie/Inspector, KMS, ALB/NLB, SQS/SNS/EventBridge, Lambda/Fargate/ECS/EKS, RDS/Aurora/DynamoDB, S3/EBS/EFS/FSx, CloudFront/Global Accelerator/Route 53, Kinesis/Glue/Athena/Redshift, Cost Explorer/Budgets, plus gaps that show up on test day: CloudWatch/X-Ray/CloudTrail/Config, CloudFormation, SSM, MGN/DMS/DataSync/Snow/Transfer/Storage Gateway, API Gateway/AppSync, QuickSight/OpenSearch/Lake Formation, Directory Service, Batch/Beanstalk/Rekognition, Flow Logs, IPv6 egress-only IGW.

## What this is not

A replacement for time in a real AWS account. Video. An official AWS course.
