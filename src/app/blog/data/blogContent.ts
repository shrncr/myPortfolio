// Blog post content from Bob migration project
export const orchjiragmail = `# Connecting Gmail and Jira to watsonx Orchestrate: A Complete OAuth2 Setup Guide

Orchestrate has hundreds (literally, hundreds) of pre-built agents which completely streamline users' time to production. The only barrier between users and these pre-built agents is actually providing the credentials to connect to them. This step is easy, in theory, but Orchestrate's documentation on how to get the required credentials for its pre-built tools leaves something to be desired.

And because of that, I have put together this blog post which shows you how you can quickly connect several of Orchestrate's Jira and Google agents to your applications. Or, at least, how I was able to get these agents to work.

## Understanding OAuth2 in Orchestrate

Before we dive in, here's the good news: when you use Orchestrate's pre-built connections, you don't need to become an OAuth expert. Orchestrate handles all the annoying parts for you:

- **Token storage** - Your access tokens are automatically stored securely
- **Refresh tokens** - When your token expires, Orchestrate automatically refreshes it without you having to re-authenticate
- **Token management** - All the encryption and secure storage happens in the background

Basically, you authenticate once, and Orchestrate takes care of everything else. No worrying about token expiration, no building refresh logic, no dealing with secure storage. It just works!

## Part 1: Connecting to Gmail

### Step 1: Create a Google Cloud Project

First, head to the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard) and create a new project. Once you are in the dashboard for your new project (pictured below), navigate to "APIs & Services," the first option in the Quick Access section of your dashboard.

![Google Cloud Console dashboard showing the APIs & Services quick access option](/blog/orchjiragmail/image-1.png)

### Step 2: Create and Configure Your Project

Click on **Credentials** in the left sidebar to begin setting up OAuth:

![Credentials page with option to create OAuth client ID](/blog/orchjiragmail/image-4.png)

You'll need to configure the OAuth consent screen first. Select your app's audience - I chose "External":

![Project configuration - choosing an audience for your app (External selected)](/blog/orchjiragmail/image-5.png)


Next, fill in your app information and contact details:

![Next step of project config - contact information with personal email](/blog/orchjiragmail/image-6.png)

Review and agree to Google's user data policy:

![Fourth and final step of making the project - agreeing to Google user data policy, then hit Create](/blog/orchjiragmail/image-7.png)

After completing the project setup, you'll be brought to a summary screen. Click the **"Create OAuth client"** button in the box under Metrics:

![Project summary screen with "Create OAuth client" button highlighted in the Metrics section](/blog/orchjiragmail/image-8.png)

### Step 3: Create OAuth Client ID

**Important:** When using the OAuth2 Authorization Code flow, you must configure the callback URL in your Google Cloud application. The callback URL follows this format:

\`\`\`
<env_url>/mfe_connectors/api/v1/agentic/oauth/_callback
\`\`\`

For example, if your watsonx Orchestrate environment URL is 'https://dl.watson-orchestrate.ibm.com/', your callback URL would be:

\`\`\`
https://dl.watson-orchestrate.ibm.com/mfe_connectors/api/v1/agentic/oauth/_callback
\`\`\`

Now fill out the OAuth client ID creation form:

![OAuth client ID creation form showing application type (Web application), name (Orchestrate), JavaScript origins, and authorized redirect URIs](/blog/orchjiragmail/image-9.png)

- **Application type:** Web application
- **Name:** Orchestrate (or whatever you prefer)
- **Authorized JavaScript origins:** \`https://dl.watson-orchestrate.ibm.com\` (optional, but I added it)
- **Authorized redirect URIs:** Your callback URL from above - **this is critical to get right!**

Click **Create**, and you'll see a success modal displaying your Client ID and Client Secret.

**Save these credentials!** You'll need both the Client ID and Client Secret for the watsonx Orchestrate connection configuration.

### Step 4: Enable Required APIs

Before configuring Orchestrate, you need to enable the necessary Google APIs. Navigate to the [Google Cloud API Library](https://console.cloud.google.com/apis/library) and enable:

![Gmail API in the Google Cloud API Library](/blog/orchjiragmail/image-15.png)

![Google Calendar API in the Google Cloud API Library](/blog/orchjiragmail/image-16.png)

### Step 5: Configure API Scopes in Google Cloud

Return to your OAuth2 client configuration in Google Cloud Console and add the necessary scopes under **Data Access**:

![OAuth consent screen Data Access configuration page](/blog/orchjiragmail/image-14.png)

Click **Add or Remove Scopes** and select the scopes you need:

![Scope selection interface showing available Google API scopes](/blog/orchjiragmail/image-18.png)

For Gmail and Calendar access, add these scopes:
- \`https://mail.google.com\`
- \`https://www.googleapis.com/auth/calendar\`


### Step 6: Configure watsonx Orchestrate Connection

Now that Google Cloud is fully configured, switch to your watsonx Orchestrate environment. Navigate to **Connections** from the hamburger menu:

![Watsonx Orchestrate hamburger menu with Connections option highlighted](/blog/orchjiragmail/image-12.png)

Find the connection named \`google_oauth2_auth_code_ibm_184bdbd3\` (or similar):

![Connections page showing the Google OAuth2 connection entry](/blog/orchjiragmail/image-11.png)

Click on the connection to open the configuration form. You'll need to fill in several fields:

![Google OAuth2 connection configuration form with fields for Client ID, Client Secret, Auth URL, Token URL, and Scopes](/blog/orchjiragmail/image-13.png)
![Visual showing how to input Google API Scopes (Separate with space)](/blog/orchjiragmail/image-19.png)

Enter your credentials and configuration:
- **Client ID:** From the Google Cloud Console
- **Client Secret:** From the Google Cloud Console
- **Auth URL:** \`https://accounts.google.com/o/oauth2/v2/auth\`
- **Token URL:** \`https://oauth2.googleapis.com/token\`
- **Scopes:** \`https://mail.google.com https://www.googleapis.com/auth/calendar\`
- **Base URL:** \`https://www.googleapis.com\`

**A couple important things:**

When entering scopes, separate them with spaces (not commas). I know, it's weird, but that's how Orchestrate wants them.

Also, you might be wondering why we're just using base URLs for the Auth URL and Token URL instead of the full endpoints with all the parameters. Here's the thing: Orchestrate actually constructs the complete OAuth endpoints for you on the backend. It takes these base URLs and automatically appends your Client ID, redirect URI, and all the other necessary parameters.

So as a general rule when setting up OAuth connections in Orchestrate: just use the base endpoint URLs. Don't try to build the full URLs yourself with query parameters and everything. Let Orchestrate handle that part - it'll save you from making mistakes and ensures everything works correctly.

### Step 7: My Mistakes

**Issue #1: Initial Connection Failure**

When I first tried to test the connection, I encountered an error:

![Error message showing OAuth connection failure](/blog/orchjiragmail/image-20.png)

After researching the error, I realized it was because my app was still in "Testing" mode. Since I was the only user anyway, I decided to push the app to production in Google Cloud Console:

![Publishing app to production in Google Cloud Console](/blog/orchjiragmail/image-21.png)

**Issue #2: Google's Security Warning**

When testing the connection again, Google showed a security warning because the app wasn't verified:

![Google security warning screen for unverified app](/blog/orchjiragmail/image-22.png)

Since I'm the developer and this is for personal use, I clicked **"Continue"** to proceed with the authorization.

![Google OAuth permission screen requesting access to Gmail and Calendar](/blog/orchjiragmail/image-23.png)

I granted all requested scopes, and finally—success!

![Successful OAuth connection confirmation in watsonx Orchestrate](/blog/orchjiragmail/image-24.png)

### Step 8: Testing with an Agent

Now let's test the integration! Navigate to the Agent Catalog (hamburger menu > Catalog) and search for "gmail":

![Agent Catalog search results showing Gmail-related agents](/blog/orchjiragmail/image-25.png)

**Issue #3: Missing Base URL**

When I first tried to use the Email and Inbox Management agent, I encountered another error:

![Error message showing KeyError for missing base_url credential](/blog/orchjiragmail/image-26.png)

The error traceback revealed:

\`\`\`python
KeyError: <CredentialKeys.BASE_URL: 'base_url'>
\`\`\`

The solution was to add the Google API base URL to the connection configuration. Go back to your connection settings and add:

![Connection configuration form with base URL field highlighted, showing https://www.googleapis.com](/blog/orchjiragmail/image-27.png)

**Base URL:** \`https://www.googleapis.com\`

After adding the base URL, the agent worked perfectly:

![Successful email retrieval showing inbox messages in the agent response.. Clearly this is my junk email address](/blog/orchjiragmail/image-28.png)

### Step 9: Team vs. Member Credentials

**Important Security Consideration:** I initially configured team credentials, which would give everyone in my organization access to my personal emails. That's definitely not ideal!

![Connection settings showing the option to switch between Team and Member credentials](/blog/orchjiragmail/image-29.png)

I switched to **member credentials**, which requires each user to connect their own Gmail account individually. This ensures proper data privacy and security.

![Testing the Gmail agent with member credentials, showing the personal authentication flow](/blog/orchjiragmail/image-30.png)

With member credentials, each user in your tenant must independently authenticate with their own Gmail account, ensuring that no one has access to anyone else's personal data.

---

## Part 2: Setting Up Jira Integration

### Step 1: Create a Jira OAuth2 App

Head to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/):

![Atlassian Developer Console homepage showing existing apps and Create button](/blog/orchjiragmail/image-31.png)

Click the **Create** button and select **OAuth 2.0 integration**:

![App creation dialog with OAuth 2.0 integration option highlighted](/blog/orchjiragmail/image-32.png)

### Step 2: Configure Authorization

After creating your app, go to the **Authorization** tab and add your watsonx Orchestrate callback URL. This uses the same format as the Gmail setup:

\`\`\`
https://dl.watson-orchestrate.ibm.com/mfe_connectors/api/v1/agentic/oauth/_callback
\`\`\`

![Authorization tab showing callback URL configuration field](/blog/orchjiragmail/image-33.png)

### Step 3: Add API Scopes

Navigate to the **Permissions** tab and click **Add** to add the Jira API:

![Permissions tab with Add API button to configure Jira scopes](/blog/orchjiragmail/image-34.png)

Click **Configure** next to the Jira API and add the necessary scopes. I used:

- \`write:jira-work\`
- \`read:jira-work\`
- \`read:jira-user\`
- \`manage:jira-project\`
- \`manage:jira-configuration\`

![Jira API scope configuration showing selected permissions](/blog/orchjiragmail/image-35.png)

### Step 4: Get Your Credentials

Go to the **Settings** tab to retrieve your OAuth credentials:

![Settings tab displaying Client ID and Client Secret for the OAuth app](/blog/orchjiragmail/image-36.png)

Copy your **Client ID** and **Client Secret** - you'll need these for the watsonx Orchestrate connection.

### Step 5: Configure watsonx Orchestrate Connection

Return to watsonx Orchestrate's Connections page and find \`jira_oauth2_auth_code_ibm_184bdbd3\` (or similar).

Enter your credentials and configuration:

![Jira OAuth2 connection configuration form in watsonx Orchestrate](/blog/orchjiragmail/image-37.png)

- **Client ID:** From Atlassian Developer Console
- **Client Secret:** From Atlassian Developer Console
- **Auth URL:** \`https://auth.atlassian.com/authorize\`
- **Token URL:** \`https://auth.atlassian.com/oauth/token\`
- **Scopes:** \`write:jira-work read:jira-work read:jira-user manage:jira-project manage:jira-configuration\`

I set this to **member credentials** to ensure each user connects with their own Jira account.

### Step 6: Test the Integration

Navigate to **Discover** from the hamburger menu, search for "jira" and filter by agents. Select the **Issue and Bug Manager** agent.

When you ask the agent a question (like "What projects do I have?"), you'll be prompted to connect:

![Agent response prompting user to connect their Jira account](/blog/orchjiragmail/image-38.png)

Click the connection prompt, and you'll be taken to the Jira authorization screen:

![Atlassian authorization screen requesting permission to access Jira](/blog/orchjiragmail/image-39.png)

After authorizing, the integration works perfectly:

![Successful Jira integration showing project list retrieved by the agent](/blog/orchjiragmail/image-40.png)

---

## Key Takeaways

### For Gmail Integration:
1. **Enable the right APIs** - Don't forget to enable Gmail and Calendar APIs in Google Cloud Console
2. **Add the base URL** - Include \`https://www.googleapis.com\` in your connection configuration
3. **Use member credentials** - Protect user privacy by requiring individual authentication
4. **Push to production** - If you encounter OAuth errors, you may need to publish your app

### For Jira Integration:
1. **Configure scopes carefully** - Make sure you add all necessary Jira scopes
2. **Use the correct callback URL** - Follow the watsonx Orchestrate callback URL format exactly
3. **Test with an agent** - Use the Issue and Bug Manager agent to verify your setup

### General OAuth2 Tips:
- Always use member credentials for personal data access (email, calendar, etc.)
- Double-check your callback URLs - they must match exactly
- Keep your Client ID and Client Secret secure
- Test your integration thoroughly before rolling out to your team

Both integrations are now working smoothly, allowing watsonx Orchestrate agents to interact with Gmail and Jira on behalf of authenticated users. The key is patience, attention to detail, and understanding the OAuth2 flow.

---
`;
export const blogContent = `# Rebuilding My Game in React: A 4-Hour Migration with IBM Bob

I had a working escape room game built as a single 257-line HTML file. It worked, but it was unmaintainable. The original code itself could not have scaled to where it is at today. I needed to migrate it to React + TypeScript.

Using Bob (IBM's AI coding assistant), I completed the migration, added several new features, and improved the user interface in ~4 hours. The game evolved from a single-level experience with less than 30 seconds of gameplay to a multi-level, incremental progression system with an introductory tutorial. Without Bob? This would've taken weeks.

This isn't a tutorial on React migration—it's a guide to **using Bob effectively**. Here's what I learned about Bob's features, what mistakes I made, and how you can avoid them.

![Before: Single HTML file](/blog/bob-migration/structure-before.png)
![After: Organized React structure](/blog/bob-migration/structure-after.png)

## Step 1: Configure Bob Before You Start (The Secret Weapon)

**This is the most important step.** Most people skip configuration and wonder why Bob generates inconsistent code. Don't be that person.

Before writing any code, I created a .bob/rules directory with three markdown files. Bob reads these files and follows them throughout your project.

### How .bob/rules Works

\`\`\`
myProject/
├── .bob/
│   ├── rules/              # Workspace-wide rules (all modes)
│   │   ├── 01-general.md   # Bob's role & priorities
│   │   ├── 02-ask.md       # What to do in ask mode
│   │   └── 03-code.md      # Code standards
│   └── rules-code/         # Code mode-specific rules (optional)
└── ... (other project files)
\`\`\`
**Key points:**
- Files load alphabetically (use 01-, 02- prefixes)
- Mode-specific rules override workspace rules
- Version-controllable (your whole team gets the same Bob behavior)

![Screenshot showing structure of markdown files in .bob/rules](/blog/bob-migration/bobRules.png)

### My Configuration

**01-general.md** - Defined Bob as a senior frontend engineer focused on:
- Clean, maintainable code
- Accessibility (WCAG 2.1 AA)
- Reusable components

**02-ask.md** - Told Bob to ask before implementing:
- Clarify vague requirements
- Propose scalable architecture
- Surface accessibility issues early

**03-code.md** - Set code standards. Example snippet from 03-code.md:
\`\`\`markdown
### 1. Reusable Components Are Mandatory

- Always abstract reusable UI patterns into their own files.
- Any UI element that could reasonably be reused must live in a dedicated /components directory.
- Do NOT inline large UI blocks directly inside pages or feature files.
- Prefer small, composable components over monolithic files.

Examples of reusable components:
- Buttons
- Cards
- Modals
- Form fields
- Layout wrappers
- Sections
- Navigation elements
- Reusable content blocks
\`\`\`

**Result:** Bob generated consistent, production-ready code from day one. No refactoring needed.

**Important Note:** In my setup, I put all three files in .bob/rules/, which means they apply to ALL modes. For more precise control, you can use mode-specific folders:
- .bob/rules-ask/ for Ask mode only
- .bob/rules-code/ for Code mode only
- .bob/rules-plan/ for Plan mode only

Mode-specific rules override general rules, giving you fine-grained control over Bob's behavior in different contexts.

**Pro Tip:** You can also create global rules at ~/.bob/rules/ that apply to all your projects.

## Step 2: Use Plan Mode First (Architecture Before Code)

**Bob has different modes.** Most people jump straight to Code mode. That's a mistake.

I started in **Plan Mode**, which is designed for architecture work. It gives Bob read access and markdown editing but prevents code changes. This forces you to think through the architecture before writing a single line.

![Screenshot of Bob in Plan Mode](/blog/bob-migration/bob-modes.png)

I asked: "Create a migration plan for this HTML file to React + TypeScript."

Bob generated an 8-phase plan with Mermaid diagrams showing component hierarchy and state flow. The plan prevented scope creep and gave me a clear roadmap.
![Example of Bob's diagram](/blog/bob-migration/bob-diagram.png)
**Key insight:** No major architectural decisions needed revision during implementation because we planned first.

**Bob's Modes:**
- **Plan Mode:** Architecture and strategy (use this first!)
- **Ask Mode:** Clarification and questions
- **Code Mode:** Implementation
- **Advanced Mode:** Complex features with MCP tools

## Step 3: Bob's Hidden Features (That I Wish I'd Known)

### Enhance Prompt (Star Icon)

I made a vague request: "Modernize the UI."

Bob gave me generic results. My fault—vague input = vague output.

**Then I discovered the Enhance Prompt feature** (Star icon). It transforms vague requests into specific ones:

![Input before using the Enhance Prompt Feature](/blog/bob-migration/enhance.png)

**Input:** 
\`\`\`bash
"Modernize the UI"
\`\`\`

**Enhanced Output:**
\`\`\`bash
Create a modern, visually appealing UI design for a blog post page displaying technical content about migrating HTML to React using Bob AI. The design should include:

1. A clean, contemporary layout with proper typography hierarchy for markdown content including headings (h1-h3), paragraphs, code blocks, and lists
2. Syntax-highlighted code blocks with a dark theme and proper formatting for file paths, directory structures, and code snippets
3. Visual distinction for special elements like "Pro Tips", "Important Notes", and "Results" sections using cards or callout boxes
4. Responsive design that works seamlessly on desktop, tablet, and mobile devices
5. Modern color scheme with good contrast ratios for accessibility
6. Smooth scrolling and subtle animations for interactive elements
7. Professional spacing and padding throughout to improve readability
8. Support for inline code formatting that stands out from regular text
9. Clear visual separation between different sections of the blog post
10. Modern font choices optimized for technical content readability (consider using a sans-serif for body text and a monospace font for code)
11. Hover states and interactive feedback for any clickable elements
12. A cohesive design system with consistent colors, spacing, and component styles throughout

The UI should feel modern and professional while maintaining excellent readability for technical documentation and code examples.
\`\`\`

**Lesson:** Use the Star icon when you're not sure how to phrase something. It saves time and produces better results.

### Context Mentions (@ Feature)

**My biggest mistake:** Bob generated SASS code using wrong variable names ($primary instead of $color-primary). Build failed. I spent an hour fixing it manually.

**What I could have done:** Context mentions.

![Screenshot demonstrating the @ context mention feature](/blog/bob-migration/context.png)

If I had typed @/src/styles/_variables.scss in my prompt, Bob would have read the file and used the correct variable names.

**What you can mention with @:**

1. **Files** - @/path/to/file.ts
   - Bob reads the file and uses exact naming conventions
   - Perfect for referencing config files, types, or existing components

2. **Folders** - @/path/to/folder
   - Bob gets context about the entire directory structure
   - Useful for understanding project organization

3. **Problems** - @problems
   - Bob sees all current errors and warnings in your workspace
   - Helps Bob fix issues without you copying error messages

4. **Terminal Output** - @terminal
   - Bob reads your terminal history
   - Great for debugging build errors or test failures

5. **Git Commits** - @a1b2c3d (commit hash)
   - Bob analyzes specific commits
   - Useful for understanding what changed and why

6. **Git Changes** - @git-changes
   - Bob sees your unstaged/staged changes
   - Perfect for code reviews or commit message generation

7. **URLs** - @https://example.com
   - Bob fetches and reads web content
   - Useful for referencing documentation or API specs

**Pro tip:** You can combine multiple mentions in one prompt:

@/src/components/Button.tsx @/src/styles/_variables.scss
Update the Button component to use our design system colors


**Lesson:** Always use @ to give Bob context. It's the difference between generic code and code that fits perfectly into your existing codebase.

### Checkpoints (Undo Button)

When I saw TypeScript errors after Bob created files, I panicked and started giving Bob "fix" instructions.

**Wrong move.** The errors were just missing dependencies (npm install fixed them). My "fixes" would have broken working code.

**What I should have done:** Use Bob's automatic checkpoints.

![Screenshot showing the checkpoint feature](/blog/bob-migration/checkpoint.png)

Bob creates checkpoints during tasks. Click "Restore Files and Task" to undo changes. It's like Git, but for AI conversations.

**Lesson:** When you see errors, pause. Check if it's an environmental issue before asking Bob to "fix" it.

## Step 4: Features I Didn't Use (But You Should)

After finishing, I read Bob's documentation and facepalmed. Here are powerful features I missed:

### 1. Code Reviews (/review)
Type /review before committing. Bob analyzes your changes and catches issues.

![Screenshot showing /review command](/blog/bob-migration/review.png)

### 2. Commit Message Generation
Click the ✨ icon in Source Control. Bob writes your commit message from staged changes.

![Screenshot of commit message generation](/blog/bob-migration/commit-message.png)

### 3. Bob Tips
Bob proactively suggests refactorings as you work. 
![Screenshot showing "Bob Tips"](/blog/bob-migration/bob-tip.png)
### 4. Literate Coding
Write natural language instructions in your code (they appear blue). Press Cmd+Enter and Bob converts them to implementation.

![To enable literate coding with Bob, click the icon I have indicated with the green square. In natural language, write a description of the new feature you'd like to add to your codebase. When you are ready, click the "generate" button at the bottom of your code editor](/blog/bob-migration/literate.png)
![Bob will convert your description into code. Review the changes and click "Accept All" to confirm.](/blog/bob-migration/literate2.png)

**This feature is great for building features where describing what you need is faster than coding it from scratch.**

## The Results

**Before:** 257 lines in one HTML file  
**After:** Professionally structured codebase with 40+ modular components  
**Time:** ~4 hours (would've been weeks without Bob)

The app now has:
- Clean React + TypeScript architecture
- WCAG 2.1 AA accessibility
- Multi-level progression system
- Interactive graph visualization
- Tutorial system
- Production-ready code

![Screenshot of final application](/blog/bob-migration/after.png)

[You can view the original repository as well as Bob's updated version here](https://github.com/shrncr/NP-Complete-Escape-Room)
![the main branch contains the original HTML/CSS/JS based repository. Bob-Version branch contains Bob's updated code. Feel free to explore!](/blog/bob-migration/github.jpeg)
## Key Takeaways

### Do This:
1. **Configure .bob/rules first** - Define Bob's behavior before writing code
2. **Start with Plan Mode** - Architecture before implementation
3. **Use @ for context** - Reference existing files in your prompts
4. **Be specific** - Use Enhance Prompt (✨) if you're not sure how to phrase something
5. **Use checkpoints** - Don't panic-fix errors; restore and reassess

### Don't Do This:
1. Skip configuration (you'll get inconsistent code)
2. Jump straight to Code mode (you'll make architectural mistakes)
3. Make vague requests (you'll get generic results)
4. Ignore environmental errors (npm install before asking Bob to "fix" things)
5. Forget to review generated code (Bob is good, not perfect)

## Your Turn

Want to try Bob on your next project? Here's your starter checklist:

**Before coding:**
- [ ] Create .bob/rules/ directory
- [ ] Write 01-general.md (Bob's role and priorities)
- [ ] Write 02-ask.md (when to ask questions)
- [ ] Write 03-code.md (code standards)

**During development:**
- [ ] Start in Plan Mode for architecture
- [ ] Use @ to reference existing files
- [ ] Use ✨ Enhance Prompt for vague ideas
- [ ] Check checkpoints before "fixing" errors
- [ ] Run /review before commits

**After coding:**
- [ ] Let Bob generate commit messages
- [ ] Review all generated code
- [ ] Test thoroughly

Bob isn't magic—it's a tool. But configured properly and used effectively, it's an incredibly powerful partner for building production-quality software.

**Time saved on this project:** Several weeks
**Time invested learning Bob:** Worth every minute

Try it on your next migration. You'll be surprised how much faster you move.

---
`;