# SAA-C03 Study Platform

Local course for **AWS Certified Solutions Architect – Associate (SAA-C03)** and for actually using AWS, starting from “AWS does cloud stuff.”

Two modes in the header:

- **Learn** — pictures first, optional throwaway account, then four exam domains in plain language. Labs and a Using AWS checklist prove you can click. Quizzes explain immediately.
- **Exam** — compressed “if the question says X, pick Y,” traps, timed exams, domain trainer. Same facts, exam wording.

Two finish lines: **use AWS** (labs + checklist) and **sit the written exam** (65 questions, no console). Official numbers come from the AWS exam guide. Miss patterns are labeled community — AWS does not publish item miss rates or a pass rate.

Original scenarios. Not dumps. Not affiliated with Amazon.

## Run it

```bash
cd ~/Documents/CS/saa-c03
python3 -m http.server 8080 --bind 127.0.0.1
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080). Progress stays in this browser.

Live site (GitHub Pages): [https://murtaza7863.github.io/saa-c03/](https://murtaza7863.github.io/saa-c03/)

## How to use it

**Learn mode (order is the course)**

1. **Pictures** — what AWS is, where stuff lives, the console, optional account.
2. **Two finish lines** — how you will prove both outcomes; how the written test thinks.
3. **Lock the door / stay up / the right box / the bill** — the four exam domains, with “after this you can…” on every lesson. Lookup lessons are a phone book.
4. After a lesson, do the linked **lab** in a throwaway account (billing alarm first). Tick **Using AWS** only for what you actually did.
5. **Architecture studio** and **Break/fix** when you want extra practice.

Suggested weeks live on the “Two finish lines” lesson and on **Learn path**. They are a method, not an AWS timetable.

**Exam mode (how it is asked)**

1. Exam notes per lesson (keyword tables).
2. **Question trainer** — mixed 20, per-domain 20, or full mix 65 / 130 min.
3. Timed exams A and B.
4. Flashcards, service-vs-service, cheat sheet.

Real exam pass is scaled **720** (official). AWS does not publish a practice-test cutoff. Do not reuse the same bank until the letters stick. Domain 1 (who can do what) is 30% of scored content.

Do not memorize letter order. If you miss an item and cannot explain why, switch back to Learn.

## Coverage

Official SAA-C03 domains (secure 30%, resilient 26%, performance 24%, cost 20%) plus in-scope services people actually get asked. Lookup lessons (AD, Flow Logs, dashboards, named ML APIs) are skim-on-purpose.

## What this is not

A replacement for time in a real AWS account. Video. An official AWS course.
