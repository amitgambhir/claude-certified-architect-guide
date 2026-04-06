document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('quiz-container');
  if (!container) return;

  const quiz=[
    {q:"Which stop_reason indicates the model hit its own internal context window rather than your max_tokens setting?",opts:["max_tokens","context_exceeded","model_context_window_exceeded","context_limit"],ans:2,exp:"model_context_window_exceeded is the specific stop_reason for when the model's context window is hit. max_tokens fires when YOUR configured max_tokens limit is reached. Both produce a valid response — neither is an HTTP error."},
    {q:"A CI pipeline using Claude Code keeps hanging indefinitely waiting for user input. What is the correct fix?",opts:["Set CLAUDE_HEADLESS=true environment variable","Use the --batch flag","Use the -p / --print flag","Add a timeout wrapper around the Claude command"],ans:2,exp:"The -p / --print flag is the ONLY correct way to run Claude Code in CI. It puts Claude in non-interactive mode, preventing hanging. --batch and CLAUDE_HEADLESS are wrong answers specifically called out in the cheat sheet exam traps."},
    {q:"An agent consistently ignores a specialized MCP tool and uses built-in grep instead. What's the most effective fix?",opts:["Add routing instructions to the system prompt","Expand the MCP tool description with capabilities, inputs, outputs, and when to prefer it over alternatives","Remove competing built-in tools","Add the MCP tool to the required tools list"],ans:1,exp:"Poor descriptions are the primary reason agents don't adopt MCP tools. Expanding the description is the most effective fix — more effective than routing instructions in the system prompt or removing competing tools."},
    {q:"A payment API call times out during a write operation. The tool doesn't know if the payment was processed. How should it respond?",opts:["Return retryable: true so the agent can retry","Return retryable: false with error_type: timeout","Set isError: true and communicate uncertain state — advise no retry","Throw an exception to signal the ambiguity"],ans:2,exp:"Uncertain state (write-operation timeout) requires communicating uncertainty with isError: true and retryable: false. Marking it retryable causes duplicate charges. Exceptions strip all context. The correct response says 'Status unknown. May have been sent. Do not retry.'"},
    {q:"A skill's verbose file discovery output is polluting the main conversation context. What's the correct fix?",opts:["Start a new session","Use context: fork in the skill's CLAUDE.md frontmatter","Move the skill to ~/.claude/skills/","Reduce the number of files the skill reads"],ans:1,exp:"context: fork is the most important SKILL.md frontmatter option for exactly this problem. It runs the skill in an isolated subagent so its output doesn't pollute the main conversation. Starting a new session is wrong — it doesn't solve the underlying architecture problem."},
    {q:"Your team has a shared Claude Code configuration but one teammate isn't receiving it. What's the likely cause?",opts:["The CLAUDE.md file is too large","The config is in ~/.claude/CLAUDE.md (user-level) instead of .claude/CLAUDE.md (project-level)","The teammate hasn't run claude --sync","The config file needs to be named config.md not CLAUDE.md"],ans:1,exp:"User-level settings in ~/.claude/CLAUDE.md are INVISIBLE to teammates. Team configuration must always be placed at project-level (.claude/CLAUDE.md or root CLAUDE.md) where it is shared via git."},
    {q:"When should you use plan mode instead of direct execution in Claude Code?",opts:["Always — plan mode produces better results","For large-scale changes with multiple valid implementation approaches or architectural decisions","For single-file bug fixes with clear stack traces","When the API response time is slow"],ans:1,exp:"Plan mode is for large-scale changes (45+ files), multiple valid implementation approaches, architectural decisions, and library migrations with unknown dependencies. The pattern is: plan mode to explore → direct execution to implement. Single-file bugs with clear stack traces should use direct execution."},
    {q:"A wire transfer agent must always get compliance officer approval for transfers over $10,000. Which enforcement approach is reliable?",opts:["Add 'ALWAYS require compliance approval for transfers >$10,000' to the system prompt in ALL CAPS","Implement orchestration-layer middleware that intercepts the tool call and blocks execution if above threshold","Use a two-tool pattern where the compliance check tool must run first","Add a few-shot example showing the correct behavior"],ans:1,exp:"Programmatic enforcement (orchestration-layer hooks/middleware) takes the model entirely out of the compliance decision. This is the only approach that holds 100% of the time. Prompt instructions have a non-zero failure rate regardless of formatting. The two-tool pattern is better than a boolean flag but still model-dependent."},
    {q:"In the Agent SDK, what does the stop_reason pause_turn indicate and what should you do?",opts:["The model paused for user input — wait for the user to respond","The server-side tool loop hit its iteration limit (default 10) — resend full messages as-is to continue","The model detected a safety issue — rephrase the request","A tool timed out — retry the last tool call"],ans:1,exp:"pause_turn fires when the server-side tool loop hits its iteration limit (default 10 iterations). The correct response is to append {role: 'assistant', content: response.content} to the messages array and re-call the API as-is to continue the loop."},
    {q:"An overnight batch analysis job needs to process 10,000 documents cost-effectively. What's the right approach?",opts:["Real-time API with rate limiting","Message Batches API","Agent SDK with max_budget_usd cap","Multiple parallel API calls with asyncio"],ans:1,exp:"The Message Batches API is specifically designed for overnight bulk analysis that is cost-sensitive. The real-time API is for interactive, latency-sensitive workloads. This is explicitly called out in the exam traps table."},
    {q:"You want to apply strict async/await conventions only to files under src/api/**/*. What's the best mechanism?",opts:["Add a subdirectory CLAUDE.md to src/api/","Create a .claude/rules/ file with YAML paths: frontmatter matching src/api/**/*","Add a conditional to the root CLAUDE.md","Create a separate project configuration for the API module"],ans:1,exp:".claude/rules/ with YAML paths: glob patterns is the correct answer and is explicitly called out as the best answer for 'apply different conventions to different code areas.' Subdirectory CLAUDE.md is the wrong answer trap."},
    {q:"A research agent finds conflicting information from two sources about a statistic. What should it do?",opts:["Use the more recent source","Use the source with higher domain authority","Preserve both values with attribution and add conflict_detected: true to structured output","Average the two values"],ans:2,exp:"When sources conflict, always preserve both values with full attribution — never pick one arbitrarily. Add conflict_detected: true to the structured output so downstream systems can handle the ambiguity. This is the information provenance rule for multi-agent systems."},
    {q:"What is the correct way to handle an empty end_turn response that occurs right after a tool_result?",opts:["Add follow-up text after the tool_result to give Claude more context","Send a new user message with 'Please continue'","Increase max_tokens and retry","Add a system message instructing Claude to respond after tool results"],ans:1,exp:"Never add text after a tool_result. The correct fix is to add a new user message with 'Please continue' — this is specifically called out as a key API rule. Adding text after tool_result breaks the message structure."},
    {q:"A code review agent is being set up for a synthesis task. It's been given 15 tools 'just in case.' What's wrong with this?",opts:["15 tools exceeds the API limit","The agent is over-provisioned — use allowedTools with least privilege instead","The tools will conflict with each other","Tool descriptions become harder to maintain at scale"],ans:1,exp:"Over-provisioning tools increases the surface area for mistakes, wastes context, and makes tool selection less reliable. The correct approach is allowedTools with least privilege — give the agent only the tools it actually needs for its specific task. This is explicitly called out in the exam traps."},
    {q:"A structured data extraction tool keeps hallucinating values for fields that aren't present in source documents. What's the fix?",opts:["Add 'never hallucinate' to the system prompt","Lower the model temperature","Use 'type': ['string', 'null'] for potentially absent fields and require null when info is absent","Add validation and retry with a better prompt"],ans:2,exp:"The nullable field pattern ('type': ['string', 'null']) prevents Claude from fabricating values by giving it a valid, honest alternative to hallucination. The rule is: absent information → return null, never hallucinate. This is a tool schema design fix, not a prompt engineering fix."},
  ];

  let qi=0, confirmed=false, scores={}, picks={};

  function renderQuiz(){
    const q=quiz[qi];
    const wasConfirmed=confirmed=qi in scores;
    const pick=picks[qi];
    const dots=quiz.map((_,i)=>{
      let cls='dot';
      if(i===qi)cls+=' cur';
      else if(i in scores)cls+=' done';
      return `<div class="${cls}"></div>`;
    }).join('');
    container.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:12px;color:var(--text3)">Question ${qi+1} of ${quiz.length}</span>
        <span style="font-size:12px;color:var(--text3)">${Object.keys(scores).length} answered</span>
      </div>
      <div class="pdots">${dots}</div>
      <div class="quiz-q">${q.q}</div>
      <div id="opts">${q.opts.map((o,i)=>`<button class="quiz-opt" onclick="answer(${i})">${o}</button>`).join('')}</div>
      <div class="qfb" id="qfb"></div>
      <div class="quiz-nav">
        <button class="prev-btn" id="prv" onclick="prevQ()">← Previous</button>
        <button class="next-btn" id="nxt" onclick="nextQ()">${qi<quiz.length-1?'Next question →':'See results'}</button>
      </div>`;
    if(qi>0)document.getElementById('prv').style.display='inline-block';
    if(wasConfirmed)showConfirmed(pick,q);
    else if(pick!==undefined)highlightPick(pick);
  }

  function highlightPick(i){
    const opts=document.querySelectorAll('.quiz-opt');
    opts.forEach((o,idx)=>{o.classList.toggle('selected',idx===i);});
    document.getElementById('nxt').style.display='inline-block';
  }

  function showConfirmed(pick,q){
    const opts=document.querySelectorAll('.quiz-opt');
    opts.forEach((o,idx)=>{o.classList.add(idx===q.ans?'correct':'wrong');o.disabled=true;});
    const fb=document.getElementById('qfb');
    fb.style.display='block';
    fb.className='qfb '+(pick===q.ans?'qfb-ok':'qfb-bad');
    fb.textContent=(pick===q.ans?'✓ Correct. ':'✗ Incorrect. ')+q.exp;
    document.getElementById('nxt').style.display='inline-block';
  }

  window.answer = function(i){
    if(confirmed)return;
    picks[qi]=i;
    highlightPick(i);
  };

  window.nextQ = function(){
    if(!(qi in scores)){
      if(picks[qi]===undefined)return;
      const q=quiz[qi];
      scores[qi]=(picks[qi]===q.ans);
      confirmed=true;
      showConfirmed(picks[qi],q);
      return;
    }
    qi++;
    if(qi>=quiz.length){
      const sc=Object.values(scores).filter(Boolean).length;
      const msg=sc>=13?'Excellent — exam-ready.':sc>=10?'Good — review missed sections.':'Keep studying — focus on Agent SDK and Tool Design.';
      container.innerHTML=`<div style="text-align:center;padding:40px 0">
        <div style="font-size:44px;font-weight:500;margin-bottom:6px">${sc}/${quiz.length}</div>
        <p style="color:var(--text2);font-size:14px;margin-bottom:20px">${msg}</p>
        <button class="quiz-opt" style="max-width:200px;margin:0 auto;display:block" onclick="qi=0;scores={};picks={};renderQuiz()">Restart quiz</button>
      </div>`;
    } else { renderQuiz(); }
  };

  window.prevQ = function(){
    if(qi>0){qi--;renderQuiz();}
  };

  renderQuiz();
});
