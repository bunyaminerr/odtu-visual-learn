# CNG 223 - Discrete Structures AI Guidelines

## 1. Domain Context
This rule file is specific to the `CNG 223` (Discrete Structures/Ayrık Matematik) module of the ODTU Visual Learn platform.
All tasks related to discrete mathematics must adhere to these guidelines.

## 2. Core Concepts
- Focus on abstract mathematical concepts over concrete logic circuits (which belong to CNG 232).
- Key topics include:
  - **Sets and Relations**: Venn diagrams, Set operations, Cartesian products, Properties of relations (Reflexive, Symmetric, Transitive).
  - **Recurrence Relations**: Master Theorem, linear homogeneous recurrences, characteristic equations.
  - **Graph Theory**: Vertices, edges, directed/undirected graphs, adjacency matrices, Euler/Hamilton paths, Graph coloring.
  - **Logic & Proofs**: Propositional logic, Truth tables, Proof by induction, contradiction.

## 3. Tooling & Libraries
- **mathjs**: Use for evaluating logical expressions, set math, combinations, permutations, and matrix operations (adjacency matrices).
- **d3**: Use for drawing Venn diagrams or specialized discrete structures when `@xyflow/react` is insufficient.
- **@xyflow/react**: Prioritize React Flow for drawing Graph Theory networks, state transitions, and posets (Hasse diagrams).
- **mafs**: Use for graphing mathematical functions or continuous domains.

## 4. Academic Rigor
- Ensure formulas for Recurrence Relations are displayed properly using `react-katex`.
- Emphasize corner cases in the Master Theorem (e.g., when the function falls into the gaps between cases).
- Follow the 4-Agent Orchestration rule (defined in `rules.md`): always define strict TypeScript types before building the UI, and verify against academic pitfalls.

## 5. UI/UX Style
- The layout for CNG 223 should strictly follow the Mintlify Pine & Sage Style Guide.
- Base background: `#F4F7F5`.
- Canvas background: `#F2F7F4` with a radial dot grid.
- Cards: Smooth white with subtle shadow and `border-slate-200`.
- Mathematical proofs and logical equivalences should be visually separated into steps using clear typography.
