/**
 * Case Study Database & Portfolio Metadata
 * Perspective: Ankit Jha — AI and Full Stack Engineer (New Delhi)
 * Reference: vanshtripathi.dev inspired authentic engineering style
 */

const caseStudiesData = {
  "placeholder-01": {
    id: "placeholder-01",
    title: "[BLUEPRINT 01] Multi-Agent Autonomous Swarm & Distributed Reasoning Canvas",
    subtitle: "Ankit Jha — AI & Full Stack Engineer (New Delhi)",
    tag: "Agentic Systems & Distributed Inference",
    badgeColor: "cyan",
    role: "AI & Full Stack Systems Engineer",
    timeline: "Production Blueprint",
    client: "[Your Project / Open Source / Enterprise]",
    liveUrl: "https://github.com",
    overview: `
      <div class="space-y-6">
        <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <strong>SYSTEM BLUEPRINT:</strong> Drop in your autonomous multi-agent framework, distributed LLM orchestration system, or real-time collaborative canvas here.
        </div>

        <div>
          <h4 class="text-white font-bold text-base mb-2">Architectural Problem &amp; Core Challenge</h4>
          <p class="text-slate-200 leading-relaxed">
            Coordinating asynchronous autonomous agents with dynamic tool-calling, reflection checkpoints, and zero-drop binary WebSocket token streaming to an ultra-responsive frontend canvas. Eliminates linear single-agent bottlenecks by orchestrating specialized micro-agent swarms.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-cyan-300 font-display">148 t/s</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Generation Throughput</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-white font-display">&lt;14ms</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Time to First Token (TTFT)</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-emerald-400 font-display">99.98%</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Tool Execution Reliability</div>
          </div>
        </div>
      </div>
    `,
    uxDesign: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Cyclic State Graph &amp; Resilient Memory</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            Details of the distributed agent workflow:
          </p>
          
          <ul class="space-y-3 text-xs text-slate-200 font-mono">
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 font-bold">&check;</span>
              <span><strong>Cyclic DAG State Machine:</strong> Dynamic tool-calling, reflection loops, and automated error-correction checkpoints.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 font-bold">&check;</span>
              <span><strong>Hierarchical Memory Bus:</strong> Semantic buffer using quantized embeddings to support 128k+ context windows without linear degradation.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 font-bold">&check;</span>
              <span><strong>Zero-Copy Stream Multiplexing:</strong> Binary WebSocket serialization pushing concurrent sub-agent outputs to React state at 60 FPS.</span>
            </li>
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-[#020306] border border-white/15 space-y-2">
          <div class="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">Orchestration Graph Flow</div>
          <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span class="px-2.5 py-1 bg-white/10 rounded text-white border border-white/10">User Goal</span>
            <span class="text-slate-500">&rarr;</span>
            <span class="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">Planner LLM</span>
            <span class="text-slate-500">&rarr;</span>
            <span class="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">Parallel Tool Workers</span>
            <span class="text-slate-500">&rarr;</span>
            <span class="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">Evaluator / Memory</span>
          </div>
        </div>
      </div>
    `,
    frontend: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Backend Worker &amp; Frontend Protocol</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            vLLM async inference engine streaming binary tokens directly into typed React hooks:
          </p>
        </div>

        <div class="code-preview-block">
<span class="text-purple-400">// Asynchronous Multi-Agent Worker with vLLM PagedAttention</span>
<span class="text-blue-400">async def</span> <span class="text-yellow-300">orchestrate_swarm_stream</span>(query: <span class="text-cyan-400">str</span>, session: <span class="text-cyan-400">SwarmContext</span>):
    async with vllm_engine.generate_stream(query, sampling_params) as stream:
        async for token in stream:
            <span class="text-purple-400"># Push zero-copy binary frame over WebSocket</span>
            await session.ws.send_bytes(token.to_binary_frame())
            if token.requires_tool:
                await session.dispatch_parallel_tool(token.tool_call)
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs font-mono">
          <div class="p-3 bg-white/[0.03] border border-white/10 rounded-lg">
            <span class="text-slate-400">Runtimes:</span> <span class="text-white font-semibold">vLLM, TensorRT-LLM, Ray</span>
          </div>
          <div class="p-3 bg-white/[0.03] border border-white/10 rounded-lg">
            <span class="text-slate-400">Frontend:</span> <span class="text-white font-semibold">Next.js 14, WebGL, Zustand</span>
          </div>
        </div>
      </div>
    `,
    metrics: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Production Benchmarks &amp; Efficiency</h4>
          <p class="text-slate-200 leading-relaxed">
            Measured against enterprise production workloads:
          </p>
        </div>

        <div class="space-y-3">
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/15 flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-white">Inference Cost Reduction</div>
              <div class="text-xs text-slate-400">Via speculative decoding &amp; dynamic FP8 quantization</div>
            </div>
            <div class="text-lg font-mono font-bold text-cyan-300">-64% GPU Compute</div>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/15 flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-white">Glass-to-Glass Response Latency</div>
              <div class="text-xs text-slate-400">User prompt input to first animated visual token</div>
            </div>
            <div class="text-lg font-mono font-bold text-emerald-300">14.2 ms</div>
          </div>
        </div>
      </div>
    `
  },

  "placeholder-02": {
    id: "placeholder-02",
    title: "[BLUEPRINT 02] Enterprise Sub-Millisecond RAG & Semantic Vector Radar",
    subtitle: "Ankit Jha — AI & Full Stack Engineer (New Delhi)",
    tag: "Vector Search & Cross-Encoder Reranking",
    badgeColor: "emerald",
    role: "AI & Full Stack Systems Engineer",
    timeline: "Production Blueprint",
    client: "[Your Enterprise / FinTech / Healthcare Client]",
    liveUrl: "https://github.com",
    overview: `
      <div class="space-y-6">
        <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs font-mono shadow-[0_0_20px_rgba(52,211,153,0.15)]">
          <strong>SYSTEM BLUEPRINT:</strong> Drop in your Enterprise RAG pipeline, hybrid dense/sparse vector search, or low-latency document intelligence system.
        </div>

        <div>
          <h4 class="text-white font-bold text-base mb-2">High-Volume Retrieval at Scale</h4>
          <p class="text-slate-200 leading-relaxed">
            Querying millions of corporate documents, financial disclosures, and codebases with strict zero-hallucination thresholds. Combines dense semantic embeddings with sparse BM25 token matching and cross-encoder reranking.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-emerald-300 font-display">12.8M+</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Indexed Vectors</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-white font-display">99.4%</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Retrieval Precision @ K=5</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-cyan-300 font-display">28ms</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Hybrid Search Latency</div>
          </div>
        </div>
      </div>
    `,
    uxDesign: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Hybrid Dense + Sparse Search Engine</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            Pipeline architecture for sub-millisecond retrieval:
          </p>

          <ul class="space-y-3 text-xs text-slate-200 font-mono">
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 font-bold">&check;</span>
              <span><strong>Reciprocal Rank Fusion (RRF):</strong> Fuses dense neural vectors and keyword frequencies to eliminate semantic blind spots.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 font-bold">&check;</span>
              <span><strong>Hierarchical Metadata Filtering:</strong> Tenant-isolated access policies enforced directly at the vector index boundary.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-400 font-bold">&check;</span>
              <span><strong>Verifiable Citation Links:</strong> Frontend highlights source paragraph coordinates with cryptographic content hashes.</span>
            </li>
          </ul>
        </div>
      </div>
    `,
    frontend: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">High-Throughput Vector Streaming Engine</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            Rust / Python hybrid retrieval engine connected to a Next.js streaming analytics client:
          </p>
        </div>

        <div class="code-preview-block">
<span class="text-purple-400">// Hybrid Dense + Sparse Search with Cross-Encoder Reranking</span>
<span class="text-blue-400">async function</span> <span class="text-yellow-300">executeHybridRAG</span>(query: <span class="text-cyan-400">string</span>) {
  <span class="text-blue-400">const</span> [denseEmb, sparseTokens] = await Promise.all([
    embedText(query, { model: <span class="text-emerald-300">'text-embedding-3-large'</span> }),
    tokenizeBM25(query)
  ]);
  
  <span class="text-blue-400">const</span> candidates = await qdrantClient.search({
    vector: denseEmb,
    sparse: sparseTokens,
    limit: 40
  });

  return await crossEncoderRerank(query, candidates, { topK: 5 });
}
        </div>
      </div>
    `,
    metrics: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Evaluation Benchmarks (RAGAS Framework)</h4>
          <p class="text-slate-200 leading-relaxed">
            Evaluated via automated LLM-as-a-judge pipelines:
          </p>
        </div>

        <div class="space-y-3">
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/15 flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-white">Groundedness &amp; Faithfulness</div>
              <div class="text-xs text-slate-400">Verified against citation source documents</div>
            </div>
            <div class="text-lg font-mono font-bold text-emerald-300">0.984 / 1.0</div>
          </div>

          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/15 flex items-center justify-between">
            <div>
              <div class="text-sm font-bold text-white">Concurrent Throughput</div>
              <div class="text-xs text-slate-400">Handled under continuous peak stress testing</div>
            </div>
            <div class="text-lg font-mono font-bold text-emerald-300">2,800 QPS</div>
          </div>
        </div>
      </div>
    `
  },

  "placeholder-03": {
    id: "placeholder-03",
    title: "[BLUEPRINT 03] Client-Side WebGPU Neural Vision & Tensor Engine",
    subtitle: "Ankit Jha — AI & Full Stack Engineer (New Delhi)",
    tag: "Vision Transformers & Edge Compute",
    badgeColor: "purple",
    role: "AI & Full Stack Systems Engineer",
    timeline: "Edge Production Blueprint",
    client: "[Your Spatial / Robotics / Edge Client]",
    liveUrl: "https://github.com",
    overview: `
      <div class="space-y-6">
        <div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-mono shadow-[0_0_20px_rgba(192,132,252,0.15)]">
          <strong>SYSTEM BLUEPRINT:</strong> Drop in your computer vision, spatial intelligence, or in-browser WebGPU/ONNX neural inference project here.
        </div>

        <div>
          <h4 class="text-white font-bold text-base mb-2">Zero-Latency Local Privacy</h4>
          <p class="text-slate-200 leading-relaxed">
            Deploying quantized Vision Transformers (ViT) and spatial segmentations directly on client GPU hardware via WebGPU compute shaders. Eliminates cloud egress and ensures 100% on-device data sovereignty.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-purple-300 font-display">60 FPS</div>
            <div class="text-xs font-mono text-slate-300 mt-1">WebGPU Continuous Inference</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-white font-display">8.2 MB</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Quantized INT4 Binary</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-emerald-400 font-display">0 ms</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Zero Cloud Latency / Local Privacy</div>
          </div>
        </div>
      </div>
    `,
    uxDesign: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Real-Time Spatial Overlays &amp; GPU Blitting</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            Interaction architecture for live video streams and bounding boxes:
          </p>
        </div>
      </div>
    `,
    frontend: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">ONNX Runtime Web &amp; Compute Pipeline</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            In-browser neural inference running on client hardware:
          </p>
        </div>

        <div class="code-preview-block">
<span class="text-purple-400">// In-Browser WebGPU Tensor Inference</span>
<span class="text-blue-400">import</span> * as ort <span class="text-blue-400">from</span> <span class="text-emerald-300">'onnxruntime-web/webgpu'</span>;

<span class="text-blue-400">const</span> session = await ort.InferenceSession.create(<span class="text-emerald-300">'/models/vision-int4.onnx'</span>, {
  executionProviders: [<span class="text-cyan-400">'webgpu'</span>],
  graphOptimizationLevel: <span class="text-cyan-400">'all'</span>
});
        </div>
      </div>
    `,
    metrics: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Edge Deployment Impact</h4>
          <p class="text-slate-200 leading-relaxed">
            Eliminates high-cost cloud GPU clusters while guaranteeing 100% compliance with strict privacy standards.
          </p>
        </div>
      </div>
    `
  },

  "placeholder-04": {
    id: "placeholder-04",
    title: "[BLUEPRINT 04] Zero-Touch Autonomous Pipeline & Signal Engine",
    subtitle: "Ankit Jha — AI & Full Stack Engineer (New Delhi)",
    tag: "Autonomous Orchestration & Serverless Pipeline",
    badgeColor: "amber",
    role: "AI & Full Stack Systems Engineer",
    timeline: "Autonomous Production Pipeline",
    client: "[Your Automation / Enterprise SaaS Client]",
    liveUrl: "https://github.com",
    overview: `
      <div class="space-y-6">
        <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <strong>SYSTEM BLUEPRINT:</strong> One-trigger, zero-manual-step execution pipeline removing operational overhead, spreadsheets, and human coordination bottlenecks.
        </div>

        <div>
          <h4 class="text-white font-bold text-base mb-2">Zero-Manual-Step Execution Pipeline</h4>
          <p class="text-slate-200 leading-relaxed">
            Triggered by a single event, this pipeline orchestrates document parsing, supplier/vendor matching, rate-limited outreach, anomaly detection on quote submissions, and automated contract award generation with Neon serverless database synchronization.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-amber-300 font-display">1-Trigger</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Autonomous Execution</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-white font-display">0 Steps</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Manual Coordination</div>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.04] border border-white/15 shadow-inner">
            <div class="text-2xl font-black text-emerald-400 font-display">99.9%</div>
            <div class="text-xs font-mono text-slate-300 mt-1">Pipeline Idempotency</div>
          </div>
        </div>
      </div>
    `,
    uxDesign: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Resilient Webhook &amp; Worker State Architecture</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            Flow-state machine with automated retry schedules and anomaly guards:
          </p>

          <ul class="space-y-3 text-xs text-slate-200 font-mono">
            <li class="flex items-start gap-2">
              <span class="text-amber-400 font-bold">&check;</span>
              <span><strong>Event Ingestion &amp; Deduplication:</strong> Cryptographic idempotency keys prevent duplicate processing across network retries.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-amber-400 font-bold">&check;</span>
              <span><strong>Intelligent Signal Scoring:</strong> LLM evaluates incoming vendor bids against historical baseline pricing and flags anomalies in real time.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-amber-400 font-bold">&check;</span>
              <span><strong>Automated Dispatch &amp; Neon DB Sync:</strong> Immediate audit logging on serverless Postgres with instant webhook notifications.</span>
            </li>
          </ul>
        </div>
      </div>
    `,
    frontend: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Pipeline Code &amp; Event Bus</h4>
          <p class="text-slate-200 leading-relaxed mb-4">
            Edge worker event handler dispatched via Vercel Functions and Neon:
          </p>
        </div>

        <div class="code-preview-block">
<span class="text-purple-400">// Autonomous Pipeline Trigger &amp; Idempotent Execution</span>
<span class="text-blue-400">export async function</span> <span class="text-yellow-300">executeAutonomousPipeline</span>(req: <span class="text-cyan-400">Request</span>) {
  <span class="text-blue-400">const</span> payload = await req.json();
  <span class="text-blue-400">const</span> isIdempotent = await neonDb.query(
    <span class="text-emerald-300">'SELECT id FROM pipeline_runs WHERE event_hash = $1'</span>, 
    [payload.hash]
  );
  <span class="text-blue-400">if</span> (isIdempotent.rows.length) return { status: <span class="text-amber-300">'already_processed'</span> };

  <span class="text-purple-400">// Run multi-step agent flow</span>
  return await dispatchAgentSwarm(payload);
}
        </div>
      </div>
    `,
    metrics: `
      <div class="space-y-6">
        <div>
          <h4 class="text-white font-bold text-base mb-2">Automation Impact</h4>
          <p class="text-slate-200 leading-relaxed">
            Replaced 18+ hours of weekly manual back-and-forth communication with fully automated, verifiable autonomous loops.
          </p>
        </div>
      </div>
    `
  }
};
