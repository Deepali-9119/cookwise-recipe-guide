# 🍳 CookWise — AI Recipe Assistant for Beginner Cooks

**An AI-powered recipe assistant that takes a dish name or ingredients and returns a clear, step-by-step recipe — designed specifically for people who are learning to cook.**

*AI Product Prototype · UX Design · AI Workflow Integration · Lovable*

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square)](https://cookwise-recipe-guide.lovable.app)

---

## 📌 Problem Statement

Beginner cooks can feel overwhelmed by the complexity of most recipe platforms. Ingredient lists can be intimidating, instructions are often hard to follow, and timing guidance is frequently missing.

Existing recipe experiences can assume cooking knowledge that new cooks don't have.

**Target User**: First-time and beginner cooks who need simple, clear, step-by-step guidance.

---

## 💡 Solution

CookWise is a **single-flow AI recipe assistant**: tell it what you want to cook or what ingredients you have, and it returns a beginner-friendly recipe with clear quantities, timed steps, and practical tips.

The prototype follows a simple flow:

**Frontend → Webhook → n8n workflow → LLM processing → Structured response → Rendered output**

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| Flexible Input | Enter a dish name or a list of ingredients you have on hand |
| Time-Aware | Set available cooking time: Under 15, 15–30, 30–60, or 60+ minutes |
| Serving Adjustment | Adjust servings with automatic quantity calculation |
| Interactive Checklist | Checkbox-style ingredient list to track preparation |
| Timed Step Cards | Numbered instruction cards with per-step time information |
| Beginner Tips | Additional cooking guidance when available |
| Engaging Loading | Contextual messages displayed while the recipe is generated |

---

## 🎨 Product Design Decisions

### Brand & Visual Identity

| Element | Choice | Rationale |
|---------|--------|-----------|
| Color palette | Warm terracotta + forest green | Creates a food-focused and approachable visual identity |
| Typography | Serif headings + clean sans-serif body text | Balances warmth with readability |
| Background | Warm off-white | Creates an inviting cooking-focused experience |
| Shape language | Rounded cards, pill badges, soft shadows | Supports a modern and approachable interface |

### UX Principles Applied

- **Minimal clicks**: Single-flow experience from input to output
- **No decoration without purpose**: UI elements are designed to serve a function
- **Progressive disclosure**: Additional tips are revealed only when needed
- **Graceful errors**: Errors are communicated without technical jargon
- **Mobile-first**: Designed with touch-friendly interactions and without hover-dependent behaviours

### What I Intentionally Avoided

| Avoided | Rationale |
|---------|-----------|
| Glassmorphism/neon | Distracts from content and doesn't fit the cooking context |
| Chat bubble UI | The experience is a structured request-and-response flow rather than a conversation |
| Multiple CTAs | A focused flow keeps the primary action clear |
| Hardcoded content | Recipe content is generated dynamically from the backend response |

---

## 🏗️ Architecture

> **User Input → JSON Payload → n8n Webhook → LLM Processing → Structured JSON Response → Dynamic Rendering**

### Response Schema

```json
{
  "dishName": "string",
  "servings": "number",
  "totalTimeMinutes": "number",
  "ingredients": [
    {
      "item": "string",
      "quantity": "number",
      "unit": "string"
    }
  ],
  "steps": [
    {
      "stepNumber": "number",
      "instruction": "string",
      "timeMinutes": "number"
    }
  ],
  "tips": ["string"]
}
```
## 🧪 Prototype & Implementation

CookWise was developed as an AI-assisted product prototype using **Lovable**, with **n8n** used for workflow orchestration and LLM-based recipe generation.

The project explores how structured AI responses can be integrated into a focused user experience.

## 💡 What I Learned

- **Design intentionality:** Every interaction should serve a clear user need.
- **Scope discipline:** A focused experience can be more effective than an overloaded feature set.
- **Structured AI outputs:** Defining clear response schemas makes generated content easier to integrate into a predictable product experience.
- **AI workflow integration:** Connecting an AI workflow to a user-facing product requires thinking beyond the model output.
- **Accessibility as a design consideration:** Clear hierarchy, readable content, and touch-friendly interactions improve usability.

## 👩‍💻 Built By

**Deepali Shah**

Aspiring Product Manager focused on **AI Products, Product Analytics, and practical AI-powered product experiences**.


