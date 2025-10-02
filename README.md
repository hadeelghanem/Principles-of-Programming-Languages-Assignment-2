# Principles of Programming Languages (PPL 242) – Assignment 2

Second assignment for **Principles of Programming Languages (PPL 242)**.  
Focus: extending the L3 language (Scheme subset) with an object-like **`class`** special form, plus theoretical questions on functional languages, special forms, `let` vs `let*`, and evaluation strategies.

---

## Overview
- **Part 1 – Theory (30 pts):** pure FP expression bodies, why **special forms** are needed (vs. primitives), short-circuiting (`or`), `let` vs `let*`, `valueToLitExp`, and applicative vs normal order trade-offs.
- **Part 2 – Add `class` to L3 (70 pts):**
  - Add **parser support** for `(class (fields…) ((name expr) …))`.
  - Add **semantics** in both **substitution** and **environment** model evaluators:
    - Value of a `ClassExp` is a **Class**; applying it constructs an **Object**; applying an object to a symbol calls the method (e.g., `(p 'first)`).
  - Implement **syntactic transformation**:
    - `class2proc` converts a `ClassExp` to an equivalent **procedure**-based encoding; `lexTransform` removes `class` forms program-wide.
  - Provided tests: `q2a.tests.ts`, `q2b.sub.tests.ts`, `q2b.env.tests.ts`, `q2c.tests.ts`.

---

## Tech Stack
TypeScript (strict) · L3 (Scheme subset) · Parser/AST · Substitution & Environment interpreters · 

---

## Skills Gained
Language design & implementation · 
Parsing & AST extensions ·  
Evaluation models (substitution vs environment) ·  
Object-like features in FP languages · 
Syntactic transformations · Unit testing .

---

## ▶️ Run
```bash
npm install
npm test
