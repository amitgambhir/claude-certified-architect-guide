# 4. Model Context Protocol (MCP)

**Domain 1 (18%) — Tool Design & MCP Integration**

??? note "MCP core concepts"

    | | |
    |---|---|
    | MCP Server | Backend service that exposes tools/resources via MCP protocol |
    | MCP Tool | A callable function exposed by the server |
    | MCP Resource | A readable data source exposed by the server (like a file or DB) |
    | `.mcp.json` | Project-level MCP config (shared, version controlled) |
    | `~/.claude.json` | Personal MCP config (not shared) |

    !!! danger
        MCP does **not** provide: automatic authentication, built-in retry logic, rate limiting, or performance optimization. Those are your responsibility.

??? note ".mcp.json structure + MCP Connector (API-level)"

    ```json
    // .mcp.json
    {
      "mcpServers": {
        "my-backend": {
          "url": "https://my-mcp-server.internal/sse",
          "env": {
            "API_KEY": "${MY_API_KEY}"
          }
        }
      }
    }
    ```

    - Both `.mcp.json` (project) and `~/.claude.json` (personal) are available **simultaneously**
    - `${VAR_NAME}` syntax keeps secrets out of config files

    **API-level MCP connector (Python):**

    ```python
    response = client.messages.create(
      model="claude-sonnet-4-20250514",
      mcp_servers=[{
        "type": "url",
        "url": "https://my-mcp-server.com/sse",
        "name": "my-server"
      }],
      extra_headers={"anthropic-beta": "mcp-client-2025-11-20"}
    )
    ```

    Connects directly from Messages API — no separate MCP client needed. Tool allowlist/denylist configurable per server.

??? note "Why MCP tools get ignored — fix it with descriptions"

    The agent uses a built-in alternative instead of the MCP tool. Almost always: **description is too vague.**

    !!! danger
        ❌ "Gets customer data." — Too vague, Claude may misselect

    !!! success
        ✅ "Retrieves customer account details. Use for profile lookups and subscription status. Do NOT use for order history — use `lookup_order` instead."

    - All tools from all configured servers available **simultaneously** — flat list, no per-turn server selection
    - Tool annotations (`readOnlyHint`) are self-reported — not a security guarantee. Trust the server, not its metadata.
    - Fix is better descriptions — not routing instructions in system prompt, not removing competing tools
