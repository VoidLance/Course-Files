- Agility is often confused with scalability. Scalability = ability to grow, agility = how fast you can adapt
- cost savings is the #1 driver for most AWS customers for moving to the cloud
- for AWS security is their top priority
- Software or technical support is not free
- Agility - usually refers to being able to experiment, innovate and respond faster to business needs

- Expect to see scenario-based questions that test your ability to match situations to the right pillar:
	- Protecting customer data, that's Security
	- Recovering quickly from a failure, that's Reliability
- Performance efficiency means using the right resources for the workload.

Key practices:
- Serverless architectures (lambda, DynamoDB)
- Multi-region deployments to reduce latency for global users

- Expect questions matching CAF perspectives to scenarios:
	- Training staff - People
	- Encrypting data - Security
	- Day-to-day monitoring - Operations
- Exam answers test whether you recognise CAF as a strategic/organisational framework, not a technical service

- Snowball = Physical data transfer
- DMS = database migration
- MGN = automated lift-and-shift
- for 60PB or more, use Snowmobile (an actual truck). Snowball handles smaller petabyte-scale transfers
- Expect scenario-based questions that match the right tool to the right migration strategy
- S3 Transfer Acceleration is for speeding up uploads over the internet, not bulk migration

Expect:
- fixed vs variable costs
- identify strategies like rightsizing, managed services and Reserved Instances as ways to save
- Factor in hidden costs of on-premises like power, cooling and labour. The exam may list irrelevant costs like "software architecture" to confuse you

- AWS secures the infrastructure and datacenters
- customers secure data, apps, OS and config
- Think of AUP as AWS "House Rules"
- No spam, malware or illegal activity allowed
- Both share duty for:
	- patch & config management
	- awareness & training
- OpsWorks = chef/puppet automation
- CloudFormation = IaC (Infrastructure as Code)
- AWS: Hardware + Hypervisor
- Customer: patch OS, secure data, manage firewalls
- Expect questions about who has responsibility for security - AWS or you
- security of the cloud vs security in the cloud
- security is always AWS's top priority - before cost, agility or elasticity

- If a question says "download compliance or audit reports", the answer is always Artifact
- AMS KMS handles key creation, rotation and integration across AWS services
- SSE-S3 (Server-side Encryption) encrypts data at rest in S3 automatically, no manual key management required
- If you see the word £has responsibility for security - AWS or "key", think KMS
- if you see "audit reports" think Artifact

- CloudTrail vs Config is a favourite - CloudTrail tracks "who did what and when"; Config tracks "what changed in my resources over time"
- CloudWatch = used for monitoring metrics, logs and alarms
- common exam trap - don't confuse CloudWatch (monitoring) with CloudTrail (logging)

- Inspector = scans for vulnerablilities or misconfigs
- config - tracks compliance and config changes
- Trusted Advisor = Gives recommendations for security, performance, cost and fault tolerance
- AWS Security Bulletins - official updates about security or privacy events
- always check bulletins for alerts or vulnerabilities, or updates affecting your environment
- Control Tower - easiest and quickest way to set up a secure, multi-account AWS enviro
	- Includes guardrails for governance and compliance
	- if the question says "easiest" or "automated setup for multiple accounts" the correct answer is Control Tower

- Only root user can do account-level tasks (like closing an account)
	- Use IAM users or roles for daily work
	- Think of the root as your "break glass in case of emergency" key
- Never hardcode access keys in apps
- EC2 should use IAM roles for temporary credentials
- Roles = short-term permissions, safer & automatic rotation
- New IAM users have no permissions by default
- you must attach policies to grant access
- "Why can't I create a bucket" - because IAM is secure by default!
- Use IAM Roles for short-term access
- Never create long-term IAM users for temporary needs
	- Common "gotcha" question
- Always enable MFA for all IAM users
- Avoid shared accounts or reused passwords
- Know MFA types: virtual apps, hardware key fobs, U2F keys
- Set up MFA from IAM Console or CL2
- Use apps like Google Authenticator or Authy
- Quick to enable, critical for security

- Security Groups = Stateful (return traffic auto-allowed)
- NACL = Stateless (rules required both ways)
- Watch out for distractors: CloudTrail = logs, CloudWatch = monitoring
- for HTTPS on AWS, use AWS Certificate Manager (ACM) to provision, manage and deploy SSL/TLS certifications at no cost. IAM can also store server certificates, but ACM is the go-to for most exam scenarios
- GuardDuty constantly scans your network environment for issues and threats and enables you to easily drill down to find the root cause and fix it.
- Security Hub compiles data from various sources, like GuardDuty, Inspector and Macie, so that you don't have to check multiple services

- CloudWatch = performance monitoring (metrics, alarms)
- CloudTrail = API activity logs (who did what)
- Config = compliance & config tracking
Students often mix up CloudWatch vs CloudTrail - Remember: Watch for performance, Trail for actions

- Console = Easy, visual, good for beginners and one-time tasks
- CLI/SDK = Automation & scripting
- CloudFormation = IaC, repeatable blueprints
- AWS OpsWorks uses Chef and Puppet to automate configuration of EC2 instances and on-premises servers
^ This is exam-tested when comparing deployment tools

- Run Command = Send commands to multiple instances without logging in
- Parameter Store
	- Securely store and retrieve passwords, tokens and config data
	- encrypted with AWS KMS for safety
- Session Manager
	- Securely access EC2 instances without SSH keys or open ports
	- reduces attack surface and improves security
- Systems Manager (Automation & patching)
	- Automated patching across EC2 and DB - the most efficient method for updates
	- if the exam mentions "best or easiest way to patch" - Pick systems manager!
- We can use the metadata tags to send commands - making it a very good idea to add relevant and consistent tags to everything we can

- AWS Management Console
	- Point-and-click interface - fast, visual and beginner friendly
	- great for manual tasks, demos, and exploration
	- think simple, interactive, one-off changes
- CLI/SDK
	- Used for scripts, automation and programming
	- Perfect for DevOps, bulk changes and repeatable items
	- Think efficiency, consistency and zero clicks
- Infrastructure as Code (CloudFormation/CDK)
	- Define your environment with templates or code
	- Enables repeatable blueprints - build, destroy and rebuild anytime
	- Think automation meets architecture
- VPN - Encrypted Tunnel
	- Creates a secure tunnel over the public internet
	- quick to set up; ideal for remote users or hybrid setups
	- Think driving on public roads inside an armoured van
- Direct Connect - Private Line
	- Establishes a dedicated private connection to AWS
	- More reliable, faster and lower latency than VPN
	- Think your own private train track straight to AWS

- Regions = Cities
	- Fully independent geographic areas
	- choose based on compliance, latency or user location
	- each region is isolated from others for fault tolerance
- Availability Zones (AZs) = Neighbourhoods
	- Physically separate data centres within a region
	- connected with low-latency fiber links
	- provide fault isolation and high availability
	- always at least two per region
- Edge Locations = Corner Shops
	- Deliver cached content (CloudFront) and DNS lookups (Route 53)
	- Placed globally for fast, local access
	- Handle read-only operations - no compute or storage
- Local Zones = Branch Offices
	- Bring compute power and storage closer to users in suburban areas
	- Great for low-latency use cases like gaming or media production
- Wavelength Zones = 5G Hubs
	- Embed AWS services inside telecom networks
	- Power 5G apps - AR/VR, autonomous vehicles, real-time analytics
	- designed for ultra-low (single digit ms) latency workloads
Common exam trap
Local Zones = compute + storage | Edge locations = cached content only (CloudFront, Route 53)

- EC2 = Virtual servers in the cloud
- Scaling = vertical - bigger instance, horizontal - more instances
- Auto Scaling = adds/removes instances automatically
- ELB = distributes traffic across instances
- Lambda = serverless functions, pay-per-use
- Beanstalk = easiest way to deploy apps
- Quick Starts = prebuilt templates to deploy common workloads (like RDS, Active Directory)
- CloudFormation = IaC you build yourself
For programming new RDS quickly, both CloudFormation and Quick Starts may appear as correct options

- If the question describes a long-running, customisable environment, the answer is usually EC2
- If it's event-driven, short-lived tasks, or cost-sensitive, the answer is usually lambda
- Linux-based on-demand EC2 instances are billed per second, with a 1-minute minimum. Windows and other EC2 instances are billed by the hour. WATCH OUT FOR THIS DETAIL IN THE EXAM
- Server-based services require you to manage or patch the underlying servers; serverless means AWS handles all server management and scaling
- Amazon EMR is for big data processing. It easily runs Hadoop, Spark, and other frameworks to analyse massive datasets. Not for simple storage or containers
- EMR stands for Elastic Map Reduce
- Compute is the backbone of AWS:
	- EC2 = raw compute power
	- Auto Scaling = Adapts to demand
	- ELB = traffic management
	- Containers & Lambda = modern, flexible workloads
	- Beanstalk & Lightsail = beginner friendly options
- With AWS compute, you can power everything from a simple blog to a global-scale AI app

- CloudWatch = performance monitoring (metrics, alarms)
- CloudTrail = API activity logs (who did what)
- Config = Compliance & config tracking
students often mix up CloudWatch vs CloudTrail, remember: Watch for performance, Trail for actions

- Anything to do with DNS is Route 53 on the exam

- S3 Glacier = for active archives - data you might need occasionally
- S3 Glacier Deep Archive = for long-term retention (compliance, legal or audit data)
- Analogy: Glacier = cold storage room | Deep archive = frozen vault
- Need data back within 5 hours? Choose Glacier Flexible Retrieval
- Retrieval from Deep Archive takes 2-48 hours - best for "store it and forget it"
- S3 gives volume discounts - the more data you store, the cheaper per GB
- Other services (EC2, RDS) use Reserved Instances or Savings Plans instead
- Tip:: Don't mix up cost models between services - this is a common exam trap

- S3 durability = 11 nines - data permanence promise
- Know the difference between storage classes (standard, IA, Glacier, Deep Archive)
- Security Groups = Stateful, NACLs = Stateless (easy distractor)
- EBS = per-instance storage, S3 = object storage, EFS = shared filesystem

- Athena = SQL queries on S3 (serverless)
- Redshift = large-scale data warehouse
- Kinesis = streaming data in real time
- QuickSight = BI dashboards
- Glue = ETL data prep
- SageMaker = build/train/deploy ML models
- Rekognition = image/video analysis
- Polly = text-to-speech
- Transcribe = speech-to-text
- Textract = extract data from documents

- Marketplace for buying and deploying third-party software on AWS
- Amazon SES is for sending emails
- Amazon Connect offers a pay-as-you-go contact centre solution
- Amazon SQS is the main tool for decoupling apps
- If you see a question about reducing dependency between components, SQS is usually the answer

- App integration
	- SQS - message queue for decoupling apps
	- SNS - pub/sub notifications service
	- EventBridge - Events bus for routing events between apps
- Business Apps
	- Connect - Cloud contact centre; scalable, pay-as-you-go
	- End-user computing
	- WorkSpaces - virtual desktops accessible anywhere
	- frontend & mobile
	- Amplify - Build & deploy web & mobile apps quickly
	- AI&ML services
	- Personalise - Recommendations and personalisation
	- Comprehend - NLP for text analytics and sentiment insights

- Most exam questions are scenario-based
- Don't memorise single services - think in combinations that solve real problems

Example: "A company needs global low-latency content delivery."
Answer: S3+CloudFront+Route 53
- S3 = Stores content
- CloudFront = global content delivery
- Route 53 = diverts users to nearest location

Common Service patterns:
- Compute & Scaling = EC2 + Auto Scaling + CloudWatch
- Static Website = S3 + CloudFront + Route 53
- Serverless app = API Gateway + lambda + DynamoDB
- Governance & Compliance = IAM + CloudTrail + AWS Config

Quick Tip:
- Ask: What's the goal? -> Which AWS services work together to achieve it?
- Think in service bundles, not individual tools

When in doubt, ask yourself which bundle solves the problem best

- Expect to see questions to test your understanding of differences between on-demand, Reserved and Spot. Be ready to match them to scenarios
- If you need hardware isolation, choose Dedicated Instances. If you also need BYOL, use Dedicated Hosts

- Free Tier is great for learning, but exceeding limits creates charges
- Service Control Policies (SCPs) allow you to centrally control what services and actions can be used in individual AWS accounts within an organisation. ONLY APPLY at the account or OU level, and ONLY set max permissions, not actual permissions

- Pricing Calculator = forecast
- Budgets = cost control
- Cost Explorer = analyse spending
- Service Quotas = technical limits
- Free Tier = limited free samples
- Optimisation = rightsizing, reservations, automation

- Business & Above = 24/7 phone, chat, email
- Enterprise On-Ramp & Enterprise = TAM included
- Basic = documentation and forums only
- The AWS Support Concierge Service is included in Enterprise Support only. It gives billing and account guidance, separate from technical troubleshooting
- The AWS Support API lets you create, manage and close support cases programmatically - very different from Trusted Advisor or the Health Dashboard, which only provide insights
- "Production System Down" cases under Business or Enterprise Support, AWS  guarantees a 15-minute response time. Learn the support plan SLA times - They come up often on exams.
- The chat support feature is only available for Business Support plans or higher. It is not included in Basic or Developer plans.

- Trusted Advisor = automated checks for cost optimisation, security, performance, fault tolerance and limits.
	- Basic Support = only core checks
	- Business/Enterprise = full checks
^ Examiners love to check this
- Health Dashboard = two views
	- Service Health -> global AWS service status
	- Personal Health -> issues specific to your AWS resources