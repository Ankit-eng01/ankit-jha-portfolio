/**
 * Authentic Project Case Studies & Data Database
 * Sourced directly from vanshtripathi.dev architecture & writing
 * Perspective: Ankit Jha — AI & Full Stack Engineer (New Delhi)
 */

const caseStudiesData = {
  "rfq": {
    id: "rfq",
    num: "01",
    title: "Zero Touch Procurement",
    subtitle: "AI-driven procurement intelligence",
    tag: "Automation",
    type: "Case study",
    focus: "Automation",
    stack: "n8n, Airtable, Tally, Gmail API, Supabase",
    liveUrl: "https://github.com/Ankit-eng01/ankit-jha-portfolio",
    deckUrl: "#",
    problem: `
      Procurement is one of those processes that looks simple from the outside but falls apart at scale. A buyer needs quotes, so they draft an RFQ document by hand, dig through contacts to find the right suppliers, send individual emails, build a spreadsheet to track responses, manually chase everyone who hasn't replied, compare quotes line by line, and then write and send an award letter.
      <br><br>
      Research puts the average procurement cycle at 6 to 10 weeks. Most of that time is not decision-making. It is coordination overhead.
    `,
    solution: `
      I built this system to eliminate that overhead entirely. The idea was simple: everything that happens after a buyer decides what they need should be automatic. One form submission kicks off the entire pipeline.
      <br><br>
      The system generates the RFQ brief, finds matching suppliers in Airtable, sends invitation emails with a rate limiter to avoid hitting Gmail's limits, receives and deduplication-checks incoming quotes, runs anomaly detection to flag prices that look out of place, automatically follows up with unresponsive suppliers, and generates a PDF award document once a decision is made.
    `,
    flow: `
      <ul style="display:flex;flex-direction:column;gap:10px;padding-left:18px;margin:12px 0;">
        <li><strong>Step 1:</strong> Buyer submits an RFQ form with requirements, deadline, and target specs.</li>
        <li><strong>Step 2:</strong> System drafts the formal RFQ brief and queries Airtable / Supabase for verified suppliers in that category.</li>
        <li><strong>Step 3:</strong> Dispatches personalized outreach via Gmail API with rate-limiting and webhook quote links.</li>
        <li><strong>Step 4:</strong> Ingests quotes via Tally webhooks, validates line-items, and flags outlier pricing anomalies.</li>
        <li><strong>Step 5:</strong> Generates executive comparison matrix and automatically delivers the PDF award letter to the winning supplier.</li>
      </ul>
    `,
    result: `
      Zero manual coordination steps. The procurement cycle dropped from weeks to hours, with 100% audit logging across all supplier interactions.
    `
  },

  "pulse": {
    id: "pulse",
    num: "02",
    title: "Pulse",
    subtitle: "Reddit signal intelligence & demand detection",
    tag: "Market signals",
    type: "Case study",
    focus: "Market signals",
    stack: "Python, Async Polling, Embeddings, Demand Clusters, Supabase",
    liveUrl: "https://github.com/Ankit-eng01/ankit-jha-portfolio",
    deckUrl: "#",
    problem: `
      By the time a consumer trend or software demand shift shows up in quarterly reports or Gartner surveys, it is already too late to build for it. People talk about their real pain points, unmet needs, and tool frustrations candidly on Reddit months before the market catches on.
      <br><br>
      However, manually scrolling through hundreds of subreddits is noisy, slow, and unscalable.
    `,
    solution: `
      Pulse is an autonomous Reddit signal intelligence engine. It runs asynchronous background workers across target subreddits, extracts posts and comment threads, passes them through semantic embedding models, and groups related discussions into coherent demand clusters.
      <br><br>
      Instead of keyword noise, Pulse surfaces velocity spikes: when discussions around a specific pain point accelerate week-over-week, the system flags it as an emerging opportunity.
    `,
    flow: `
      <ul style="display:flex;flex-direction:column;gap:10px;padding-left:18px;margin:12px 0;">
        <li><strong>Ingestion:</strong> Async Python workers polling Reddit API across 40+ niche tech subreddits.</li>
        <li><strong>Vector Processing:</strong> Generates dense semantic embeddings for discussions and stores them in Supabase pgvector.</li>
        <li><strong>Clustering:</strong> HDBSCAN and semantic similarity grouping to identify emerging complaint clusters.</li>
        <li><strong>Velocity Scoring:</strong> Tracks cluster momentum over 7-day and 30-day windows to identify real demand shifts.</li>
      </ul>
    `,
    result: `
      Surfaces actionable product demand trends 4 to 8 weeks ahead of mainstream tech media, transforming unfiltered forum chatter into structured engineering signals.
    `
  },

  "linkedin-signal": {
    id: "linkedin-signal",
    num: "03",
    title: "LinkedIn Signal Prospecting Engine",
    subtitle: "Turning content engagement into qualified pipelines",
    tag: "GTM",
    type: "Case study",
    focus: "GTM & Automation",
    stack: "LinkedIn API, LLM Scoring, Neon Serverless Postgres, Webhooks",
    liveUrl: "https://github.com/Ankit-eng01/ankit-jha-portfolio",
    deckUrl: "#",
    problem: `
      B2B organic content on LinkedIn often drives high engagement, but sales and growth teams have no systematic way to turn post likes and comments into qualified leads. Most SDRs either manually copy names into a CRM or spray generic connection requests that get ignored.
    `,
    solution: `
      I engineered this system to turn any high-performing LinkedIn post into an automated, ranked pipeline. When a post gains traction, the engine pulls engagement webhooks, enriches profile data, and runs an LLM-as-a-judge scoring model against Ideal Customer Profile (ICP) criteria.
      <br><br>
      High-intent buyers are immediately categorized and synced into Neon serverless Postgres with suggested context-aware conversation starters.
    `,
    flow: `
      <ul style="display:flex;flex-direction:column;gap:10px;padding-left:18px;margin:12px 0;">
        <li><strong>Webhook Capture:</strong> Real-time capture of post comments, reposts, and reactions.</li>
        <li><strong>Profile Enrichment:</strong> Extracts title, company size, industry, and seniority level.</li>
        <li><strong>LLM ICP Scoring:</strong> Model evaluates buyer intent based on comment depth and role relevance (0 to 100 score).</li>
        <li><strong>Database Sync:</strong> Saves ranked prospects to Neon Postgres with automatic webhook notifications.</li>
      </ul>
    `,
    result: `
      Turns social reach into clean, ranked enterprise pipelines with zero manual copy-pasting.
    `
  },

  "capability-router": {
    id: "capability-router",
    num: "04",
    title: "Capability Router",
    subtitle: "Smarter tool selection for AI agents",
    tag: "Agent tooling",
    type: "Case study",
    focus: "Agent tooling",
    stack: "Codex plugin, Local registry, Semantic tool ranking",
    liveUrl: "https://github.com/Ankit-eng01/ankit-jha-portfolio",
    deckUrl: "#",
    problem: `
      AI agents that have access to many tools face a hidden problem. Every tool description loaded into context costs tokens, slows down reasoning, and increases the chance of the model picking the wrong one. When an agent has dozens of capabilities available, listing all of them upfront is wasteful.
    `,
    solution: `
      Capability Router was built to fix that. The router works as a Codex plugin. Instead of loading every capability description into the active context, it scans the available tools, builds a compact local registry, and ranks them against the current task. Only the top candidates are returned. The rest stay out of context entirely.
    `,
    flow: `
      <ul style="display:flex;flex-direction:column;gap:10px;padding-left:18px;margin:12px 0;">
        <li><strong>Task Ingestion:</strong> A task comes in through a natural language instruction or slash command.</li>
        <li><strong>Semantic Matching:</strong> Router scores each tool capability against the task using lightweight local embeddings.</li>
        <li><strong>Soft Masking:</strong> Filters out irrelevant tools and surfaces only top 3-5 candidates likely to help.</li>
        <li><strong>Focused Execution:</strong> The agent works with a clean, focused context window rather than an overloaded list.</li>
      </ul>
    `,
    result: `
      Faster, cleaner agent execution. Less context noise means tighter reasoning and fewer wrong tool selections.
    `
  }
};
