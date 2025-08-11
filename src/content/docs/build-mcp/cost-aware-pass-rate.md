---
title: Cost-Aware Pass Rate
description: How researchers at Bloomberg cut AI cost by 70% with better tool descriptions
sidebar:
  order: 5
---

# Cost-Aware Pass Rate: How researchers at Bloomberg cut AI cost by 70% with better tool descriptions

Researchers at Bloomberg recently published a study that challenges the conventional wisdom that scaling language models' inference and reasoning capabilities is the key to better tool usage.

Presented at the [Annual Meeting of the Association for Computational Linguistics (2025)](https://2025.aclweb.org/), the paper, [A Joint Optimization Framework for Enhancing Efficiency of Tool Utilization in LLM Agents](https://aclanthology.org/2025.findings-acl.1149/), introduces a new measure for how well language models use tools: Cost-Aware Pass Rate (CAPR). Instead of asking "did the model use the tool?" the study goes on to add "and at what cost?".

By adding cost as a factor in their new optimization framework, the researchers found that they could reduce API calls on StableToolBench[^1] by 70%, and reduce redundant operations on RestBench[^2] by 47%. In other words: When we use the wrong measures of success, our language models may appear to be performing well, but they could be doing so at a much higher cost than necessary.

[^1]: **StableToolBench** is an improved version of ToolBench, a large-scale benchmark for evaluating LLMs' ability to use tools. It addresses the instability issues of the original ToolBench by implementing a virtual API server with caching and API simulators, testing models across 16,464 real-world APIs from 49 categories. The benchmark filters out unsolvable tasks and uses GPT-4 as an automatic evaluator to ensure stable, reproducible results.

[^2]: **RestBench** is a human-annotated benchmark introduced by Song et al. (2023) for evaluating LLMs' ability to use RESTful APIs. It consists of two real-world scenarios, TMDB movie database and Spotify music player, with diverse user instructions requiring multiple API calls to complete tasks, making it particularly suitable for testing multi-step tool orchestration.

## The research: context vs inference scaling

Wu et al. tested their joint optimization framework across 16,464 APIs in StableToolBench, and against real-world scenarios in RestBench. They compared two fundamental approaches: context optimization (improving instructions and tool descriptions) versus inference scaling (adding more reasoning steps like Chain-of-Thought[^3] or tree search[^4]).

[^3]: **Chain-of-Thought (CoT)** is a prompting technique introduced by Wei et al. (2022) that improves LLM reasoning by encouraging models to generate intermediate reasoning steps before arriving at a final answer. Rather than jumping directly to conclusions, CoT prompts guide models to "think out loud" through problems step-by-step, significantly improving performance on complex arithmetic, commonsense, and symbolic reasoning tasks.

[^4]: **Tree search methods** like Depth-First Search (DFS) extend linear reasoning approaches by exploring multiple solution paths simultaneously. When applied to LLM tool use, these methods maintain a backup mechanism to quickly restart from the last successful state when a tool call fails, theoretically improving both effectiveness and efficiency compared to simple retry strategies.

They found that incomplete context has an outsized impact on computation costs, and improving context quality leads to significant reductions in API calls and overall resource consumption, even when compared to increased reasoning efforts.

When agents only have access to vague tool descriptions, they often resort to trial-and-error approaches, stubbornly repeating slightly varied queries until they stumble upon a successful one.

Sophisticated reasoning algorithms can't compensate for poor documentation.

The research introduces a new evaluation metric, Cost-Aware Pass Rate (CAPR)[^5], which reveals what traditional accuracy metrics hide. While Pass Rate[^6] only measures if an agent eventually succeeds, CAPR integrates both success and computational cost. This exposes a critical blind spot: many "high-performing" agents achieve accuracy through massive computational waste.

[^5]: **Cost-Aware Pass Rate (CAPR)** is a new evaluation metric that combines task success with computational efficiency. Unlike traditional Pass Rate, CAPR penalizes excessive tool calls by integrating over a cost-aware function that returns zero if the number of tool calls exceeds a threshold. This provides a more holistic view of agent performance by considering both effectiveness and resource consumption.

[^6]: **Pass Rate** is the traditional metric for evaluating LLM agents, measuring only whether the agent eventually produces a correct response, regardless of how many tool calls or computational resources were required. This metric has been the standard in benchmarks but fails to capture efficiency considerations crucial for production deployments.

The research goes on to show that joint optimization, simultaneously improving both agent instructions _and_ tool descriptions, leads to better outcomes than when prompts or tool descriptions are optimized in isolation.

Perhaps the most surprising finding is that tool descriptions improved alone yield bigger gains than instruction tuning alone, contradicting years of prompt engineering focus.

## Why context quality matters more than we thought

LLMs select tools and make tool calls based entirely on the available context. The research shows that tools with incomplete or vague descriptions cause agents to iterate through multiple attempts at finding the right tool and then using it effectively.

This is compounded by incomplete instructions or guidance on how to use the tools, leading to further inefficiencies and increased computational costs.

What's more concerning is that when multiple interdependent tools are involved, the lack of clarity can cause a cascading effect, where the agent's inability to effectively use one tool impacts its interactions with others. This interconnectedness means that improving documentation and context for all tools is essential for optimizing overall performance.

It would be logical to assume that giving the agent more reasoning capabilities, like the ability to perform Chain-of-Thought reasoning about which tools to pick, and how to use them, may reduce the impact of these issues. However, inference scaling can't infer missing information. Chain-of-Thought reasoning with incomplete context generates longer chains of incorrect attempts. Tree search with vague descriptions explores exponentially larger search spaces of wrong options.

The research data shows that context optimization provides 10-30% cost reduction at fixed accuracy, while inference scaling increases costs by 200-500% for marginal accuracy gains.

## The joint optimization framework

What makes this paper particularly impactful is the strong evidence that simultaneous optimization of tool descriptions and agent instructions leads to the greatest improvements in efficiency. Traditional approaches optimize each separately, creating suboptimal local maxima. Bloomberg's joint optimization captures the synergistic effects.

The framework has a three-staged pipeline:

1. **Feedback generator:** Given the logs of an agent's interactions with tools, the first stage analyzes whether tool calls worked (effectiveness) and how many tool calls were made (efficiency). This is captured as the Cost-Aware Pass Rate (CAPR), which integrates both success and computational cost.

2. **Suggestion coordinator:** At this stage, they generate improvements for instructions _and_ tool descriptions. Here's an important point to note: suggestions for instructions are task-agnostic, meaning they can apply to any task the agent is working on, not just the one it was trained on, while suggestions for tool descriptions are more context-specific and tailored to the particular tools being used.

3. **Batch context refiner:** In this final stage, the framework aggregates suggestions to prevent conflicting individual suggestions, then applies the updates.

The technical implementation of this framework uses verbalized optimization, which comes down to the LLM improving its own context through natural language reasoning.

By applying this framework in experimental settings, the researchers found:

- Tool description optimization led to the greatest improvements in tool usage effectiveness and efficiency.
- Joint optimization of tools and instructions avoided overfitting - where tool descriptions become too tailored to specific tasks and lose generalizability.
- Batch processing prevented conflicting suggestions and updates.
- The improvements apply to unseen tasks using the same optimized tools and instructions - in other words, it generalizes well.

## Practical implementation: The joint optimization framework

Here's how to implement the Bloomberg research team's joint optimization approach for your own APIs and agents. The process works with any tool-calling system, whether it's MCP servers, function calling, or custom APIs.

### The challenge: Generic tool descriptions

Most API documentation follows patterns like these:

- `listItems`: "List all items"
- `createItem`: "Create a new item"
- `updateItem`: "Update an item"
- `deleteItem`: "Delete an item"

While technically accurate, these descriptions don't help LLMs choose between similar operations, understand required parameters, or handle edge cases effectively.

### Step 1: Establish baseline measurement

First, connect your agent to your existing API and collect interaction data. The key is measuring both success and efficiency:

```python
# Connect your agent to your API (adapt to your setup)
agent = YourAgent(
    system_prompt="Your current system prompt",
    tools=your_existing_tools
)

# Test with realistic user queries
test_queries = [
    "Create a new task called 'Review quarterly reports'",
    "Show me all my current tasks",
    "Update the first task to mark it as high priority", 
    "Delete any completed tasks"
]

# Collect performance data
for query in test_queries:
    interaction = await agent.process_query(query)
    # Log: query, tools called, success rate, response time
```

**What to measure:**

- **Success rate:** Did the agent complete the task correctly?
- **Tool call efficiency:** How many API calls were needed?
- **Response time:** How long did each interaction take?
- **Error patterns:** Which operations consistently fail?

### Step 2: Calculate Cost-Aware Pass Rate (CAPR)

Unlike traditional success metrics, CAPR penalizes inefficient tool usage:

```python
def calculate_capr(interactions, efficiency_threshold=5):
    scores = []
    for interaction in interactions:
        success = interaction.success
        tool_calls = len(interaction.tool_calls)
        
        if tool_calls > efficiency_threshold:
            scores.append(0)  # Too inefficient
        else:
            efficiency = 1 - (tool_calls / efficiency_threshold)
            scores.append(success * efficiency)
    
    return sum(scores) / len(scores)
```

### Step 3: Apply joint optimization

The Bloomberg framework optimizes both system prompts and tool descriptions together:

```python
# Analyze current performance patterns
analysis = analyze_interactions(interactions)

# Generate coordinated improvements
optimized_prompt, optimized_tools = joint_optimization(
    interactions=interactions,
    current_prompt=your_system_prompt,
    current_tools=your_tool_descriptions
)
```

### Step 4: Update your tool documentation

Apply the optimized descriptions to your tool documentation, depending on how your tools are defined.

For example, if your tools are part of a Gram-hosted MCP server, this will involve updating your tool descriptions using Gram's admin interface, or updating your OpenAPI documents directly.

### Step 5: Validate improvements

Test your optimized agent with the same queries to measure improvements.

## Example: TODO MCP server hosted by Gram

As an example, we tested the joint optimization framework on a TODO MCP server hosted by Gram. Here's the complete step-by-step process we followed, including the actual results we obtained.

### Step 1: Initial server setup

We started with a basic TODO API hosted on Gram with these generic tool descriptions:

- `listTodos`: "List all todos"
- `createTodo`: "Create a new todo"
- `updateTodo`: "Update a todo"
- `deleteTodo`: "Delete a todo"

The OpenAPI specification contained minimal descriptions that provided no parameter guidance or usage examples.

### Step 2: Connect the optimization agent

We created a simple Python agent that connects to the Gram MCP server:

```python
from pydantic_ai import Agent
from pydantic_ai.mcp import MCPServerStreamableHTTP

agent = Agent(
    model='gpt-4o-mini',
    system_prompt="You help users manage their todo lists efficiently.",
    toolsets=[
        MCPServerStreamableHTTP(
            url="https://app.getgram.ai/mcp/todo-example"
        )
    ]
)
```

### Step 3: Collect baseline performance data

We tested the agent with realistic user queries:

```python
test_queries = [
    "Add 'Buy groceries' to my todo list",
    "Show me all my todos",
    "Add 'Call dentist' to my todos", 
    "Mark the first todo as completed",
    "Show me my todos again",
    "Delete the completed todo"
]
```

**Baseline results:**

- **Success rate: 83.3%** (5 out of 6 queries succeeded)
- **Average response time: 8.36 seconds**
- **CAPR score: 0.833**
- **Key failure: The delete operation failed** because the agent couldn't determine which todo to delete without specific ID guidance

### Step 4: Run the optimization analysis

Using the Bloomberg team's joint optimization framework, we analyzed the interaction data:

```python
# Convert our interaction logs to the optimization format
optimization_interactions = convert_to_optimization_format(interactions)

# Extract current tool descriptions from the OpenAPI spec
current_descriptions = extract_tool_descriptions_from_openapi(openapi_spec)

# Run the joint optimization
optimized_prompt, optimized_tools = joint_optimization(
    optimization_interactions,
    current_system_prompt,
    current_descriptions
)
```

**Optimization results:**

The framework identified specific improvements for both the system prompt and tool descriptions:

**System prompt enhancement:**

- **Before:** "You help users manage their todo lists efficiently."
- **After:** "You help users manage their todo lists efficiently. Use specific commands like 'Add', 'Show', 'Update', 'Replace', or 'Delete' followed by the task details. For example, you can say 'Add task X' to create a new todo or 'Show my todos' to list all todos."

**Tool description improvements:**

| Tool | Original Description | Optimized Description |
|------|---------------------|----------------------|
| `deleteTodo` | "Delete a todo" | "Delete a todo by ID. Example usage: deleteTodo(18) to remove the todo with ID 18." |
| `updateTodo` | "Update a todo" | "Update a todo by ID. Example usage: updateTodo(1, 'New details') to change the details of the todo with ID 1." |
| `createTodo` | "Create a new todo" | "Create a new todo. Example usage: createTodo('New task description') to add a new task." |
| `listTodos` | "List all todos" | "List all todos. Example usage: listTodos() to retrieve all current todos." |

### Step 5: Generate the optimized OpenAPI specification

The framework automatically generated an updated OpenAPI specification with Gram's `x-gram` extensions:

```yaml
paths:
  /todos/{id}:
    delete:
      operationId: deleteTodo
      summary: Delete a todo
      x-gram:
        name: deletetodo
        description: 'Delete a todo by ID. Example usage: deleteTodo(18) to remove the todo with ID 18.'
    put:
      operationId: updateTodo
      summary: Update a todo
      x-gram:
        name: updatetodo
        description: 'Update a todo by ID. Example usage: updateTodo(1, "New details") to change the details of the todo with ID 1.'
```

### Step 6: Update the Gram server

With the optimized OpenAPI specification ready, the next step is updating the Gram server configuration:

1. Log in to the Gram dashboard.
2. Navigate to **Toolsets**.
3. Click on the API Source you're updating, then on **Update** in the dropdown menu.
4. Upload the optimized OpenAPI specification.

![Screenshot of the Gram UI showing the API Source update process](/img/guides/capr/gram-api-source.png)

The new descriptions will apply to any MCP servers using tools from the updated API Source.

### Step 7: Test the optimized server

After deploying the updated server, we ran the same test queries to measure improvements. Our example query for deleting a todo item now succeeds with clear parameter guidance, resulting in a higher success rate and faster response times.

## Implementing CAPR and joint optimization for your tools

The [Bloomberg research repository](https://github.com/Bingo-W/ToolOptimization) contains the complete code for Bloomberg's CAPR and joint optimization framework, including benchmarks. To implement similar optimizations for your own tools, follow these steps:

1. **Analyze your interaction data:** Collect and analyze user interactions with your tools to identify common failure points and areas for improvement.
2. **Define clear tool descriptions:** Ensure that each tool has a clear and specific description, including example usage patterns.
3. **Incorporate usage examples:** Add usage examples to your tool descriptions to clarify expected input formats and behaviors.
4. **Test and iterate:** Continuously test your tools with real user queries, gather feedback, and iterate on your descriptions and prompts to improve performance.

## Risks when implementing CAPR and joint optimization

The research revealed an unexpected finding: verbalized optimization can overfit just like traditional machine learning. After two to three optimization iterations, tool call counts started increasing again despite maintaining accuracy.

There isn't a clear solution to this problem yet, but we recommend tracking efficiency metrics closely to identify potential overfitting early.

## Practical next steps

If you're building agents and tools for your organization, consider updating your AI tool usage metrics to take cost into account. This is an essential part of optimizing for efficiency and effectiveness.

If you maintain MCP servers, we recommend implementing similar optimization strategies to optimize your servers' tool descriptions. You could also make it easier for users to customize your tools' descriptions to better fit their specific needs.

At Gram, we're following this research closely and building the infrastructure to enable our users to curate, measure, and optimize their MCP servers effectively.