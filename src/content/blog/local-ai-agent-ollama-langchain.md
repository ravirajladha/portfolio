---
title: Your first local AI agent: Ollama + LangChain in 60 lines
date: 2026-10-21
tag: AI / ML
minutes: 8
summary: An agent is just a loop: the model picks a tool, your code runs it, the result goes back in. Here is a working one that runs entirely on your laptop.
---

"AI agent" sounds intimidating, but once you strip the marketing away it's a small, understandable loop. If you can write a REST API, you can build one. In this post we'll build a working agent that runs entirely on your own machine: no API key, no cost, and no data leaving your laptop.

## What an agent actually is

A normal LLM call is one step: text in, text out. An **agent** adds tools and a loop:

1. You give the model a question and a list of tools it may use (plain functions with descriptions).
2. The model replies either with an answer, or with a **tool call**: "call `get_order_status` with `order_id=1042`".
3. Your code runs the function and sends the result back to the model.
4. Repeat until the model answers.

The model never executes anything itself. It only *asks*. Your code stays in control, which is what makes agents safe enough to connect to real systems.

## Setup

Install [Ollama](https://ollama.com), pull a model that supports tool calling, and install the LangChain integration:

```bash
ollama pull llama3.1:8b
pip install langchain-ollama langchain-core
```

An 8B model runs comfortably on a laptop with 16 GB of RAM. It's slower than a hosted model, but fine for learning and for private data.

## Define tools

A tool is a normal Python function. The `@tool` decorator turns its name, type hints and docstring into a schema the model reads, so **the docstring is a prompt**. Write it carefully.

```python
from langchain_core.tools import tool

ORDERS = {1042: "shipped", 1043: "pending payment", 1044: "delivered"}

@tool
def get_order_status(order_id: int) -> str:
    """Look up the current status of a customer order by its numeric ID."""
    return ORDERS.get(order_id, "no such order")

@tool
def shipping_days(pincode: str) -> int:
    """Estimated delivery days for an Indian 6-digit PIN code."""
    return 2 if pincode.startswith("56") else 5   # Bangalore-ish vs elsewhere

tools = [get_order_status, shipping_days]
by_name = {t.name: t for t in tools}
```

## The loop

```python
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage, ToolMessage

llm = ChatOllama(model="llama3.1:8b", temperature=0).bind_tools(tools)

messages = [
    SystemMessage("You are a store support assistant. Use tools for facts; never guess."),
    HumanMessage("Where is order 1042, and how long would delivery to 560001 take?"),
]

for _ in range(5):                      # hard cap: agents must not loop forever
    reply = llm.invoke(messages)
    messages.append(reply)
    if not reply.tool_calls:
        print(reply.content)
        break
    for call in reply.tool_calls:
        result = by_name[call["name"]].invoke(call["args"])
        messages.append(ToolMessage(str(result), tool_call_id=call["id"]))
```

Run it, and you'll typically see the model request both tools, get `"shipped"` and `2` back, and write a one-line answer from those facts. That's a complete agent. Frameworks add conveniences on top, but this loop is the core.

## Making it production-worthy

The demo is the easy part. These are the habits that matter once you connect real data. They're the same ones I apply to customer-facing LLM features:

- **Cap the loop** and set timeouts. A confused model can call tools forever.
- **Validate tool arguments** as you would any API input. The model can and will pass nonsense.
- **Least privilege:** give tools read-only access unless writes are essential, and confirm destructive actions with a human.
- **Ground the answers:** tell the model to answer only from tool results or retrieved documents, and say "I don't know" otherwise.
- **Rate-limit and log every step** (messages, tool calls, results) so you can control cost, debug and evaluate later.
- **Evaluate with a fixed test set** of questions and expected outcomes before changing prompts or models. Otherwise you're only judging by feel.

## Where to go next

Swap the dictionary for a real database query, add a retrieval tool over your product docs (that's RAG), or point the same code at a hosted model when you need more capability. The loop stays the same. Once you've seen it work you'll see this pattern in most agent frameworks, and that makes it much easier to judge whether you need one.

## Takeaways

1. An agent is a loop: the model requests a tool, your code runs it, the result goes back.
2. Tool docstrings are prompts, so write them precisely.
3. Ollama lets you learn and prototype privately, for free.
4. Guardrails, validation, logging and evals are what make it production-ready.
