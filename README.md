# Principles of Programming Languages (PPL 242) – Assignment 2

Second assignment for **Principles of Programming Languages (PPL 242)**.  
Focus: extending the L3 language (Scheme subset) with an object-like **`class`** special form, plus theoretical questions on functional languages, special forms, `let` vs `let*`, and evaluation strategies.:contentReference[oaicite:0]{index=0}

---

## Overview
- **Part 1 – Theory (30 pts):** pure FP expression bodies, why **special forms** are needed (vs. primitives), short-circuiting (`or`), `let` vs `let*`, `valueToLitExp`, and applicative vs normal order trade-offs.:contentReference[oaicite:1]{index=1}
- **Part 2 – Add `class` to L3 (70 pts):**
  - Add **parser support** for `(class (fields…) ((name expr) …))`.:contentReference[oaicite:2]{index=2}
  - Add **semantics** in both **substitution** and **environment** model evaluators:
    - Value of a `ClassExp` is a **Class**; applying it constructs an **Object**; applying an object to a symbol calls the method (e.g., `(p 'first)`).:contentReference[oaicite:3]{index=3}
  - Implement **syntactic transformation**:
    - `class2proc` converts a `ClassExp` to an equivalent **procedure**-based encoding; `lexTransform` removes `class` forms program-wide.:contentReference[oaicite:4]{index=4}
  - Provided tests: `q2a.tests.ts`, `q2b.sub.tests.ts`, `q2b.env.tests.ts`, `q2c.tests.ts`.:contentReference[oaicite:5]{index=5}

---

## Tech Stack
TypeScript (strict) · L3 (Scheme subset) · Parser/AST · Substitution & Environment interpreters · Jest:contentReference[oaicite:6]{index=6}

---

## Skills Gained
Language design & implementation · Parsing & AST extensions ·  
Evaluation models (substitution vs environment) ·  
Object-like features in FP languages · Syntactic transformations · Unit testing:contentReference[oaicite:7]{index=7}

---

## ▶️ Run
```bash
npm install
npm test
