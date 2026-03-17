//blog post quantum forquantum overview\
export const quantum = `# The Wrong Question
 
In my last semester of college, I took Theory of Computation, where Dr. Jacques teaches the most horrific conjecture I've encountered in computer science: P vs. NP. Consider:

> If a solution to a problem can be verified quickly, does that mean it can also be found quickly?

If the answer is yes, then P = NP. This conjecture is so significant that it is considered one of the [Millennium Prize Problems](https://www.claymath.org/millennium-problems/p-vs-np-problem). This means that there is a $1,000,000 dollar prize for anyone who can solve P Versus NP. If P=NP, Modern cryptography collapses. Entire classes of optimization problems that currently require exponential time become tractable. Mathematical proofs could be found automatically. The whole architecture of computational difficulty falls apart.

I have been studying computer science since I was 14, and the reason I loved it so much was that everything is debuggable. I spent ages 14 to 20 explaining to anyone who would listen that my fondness for computer science was rooted in the lack of mystery — that every problem has an answer, and that answer is findable with enough patience and the right lines of code.

So when I learned about P versus NP, I learned that my entire intuition about computation might be wrong. Not wrong in a fixable way. Wrong in a way that might be unfixable by design. I spent an entire semester of college absolutely blindsided by it, filling notebooks trying to find a solution that classical computers probably just cannot produce.

Some of the problems I was fixating on already had a different story being written about them, not in theory of computation classrooms, but in physics labs. I didn't find that out in school. I took Theory of Computation in my last semester of college, and after graduating, I transitioned into a full-time role with TD SYNNEX on our IBM team. For those unfamiliar, IBM is a leader in quantum computing, so when I got real exposure to the IBM Quantum platform, that's when it became clear: the problems I'd spent so much mental energy on were open questions in classical complexity theory, and they were also being approached through a completely different computational model that I had never seriously engaged with.

Quantum computing doesn't resolve P versus NP. But it does have a realistic shot within our lifetime and [current roadmaps](https://www.ibm.com/quantum/hardware#roadmap) at solving specific problems that sit at the intersection of classically intractable and quantum approachable. Problems I'd been circling for years without knowing there was another angle entirely.

To clarify, I am not discussing whether quantum will prove or disprove P=NP (it won't). What I am going to talk about is which problems quantum can actually solve, and why. To understand that, you have to start with physics.

---
 
## Quantum Computing Starts With Physics

In the 1980s, [physicist Richard Feynman noticed something inconvenient](https://postquantum.com/quantum-computing/feynman-quantum-history/). If you try to simulate  molecules, particles, materials on a classical computer, the required memory grows exponentially with system size. A modest molecule might require more classical bits than exist in the observable universe. The universe itself, meanwhile, runs quantum systems constantly and without apparent effort.
 
Maybe, the way to simulate a natural phenomena is to build a computer that obeys quantum mechanics. That idea launched an entire field. Three physical phenomena make it work.
 >  “Nature isn’t classical, dammit, and if you want to make a simulation of nature, you’d better make it quantum mechanical”, Richard Feynman, 1981.
---
 
## The Three Quantum Effects That Matter
 
### Superposition
 
A classical bit is either 0 or 1. A qubit can exist in a superposition of both simultaneously:
 
>|ψ⟩ = α|0⟩ + β|1⟩
 
where α and β are complex probability amplitudes. The qubit isn't secretly 0 or 1 while you're not looking — it is genuinely in both states at once, until measurement forces it to collapse into one. This is not a metaphor. It is experimentally verified, reproducible physics.
 
A register of n qubits can represent 2ⁿ states simultaneously, which means the number of states grows exponentially with every qubit you add. Sixteen qubits holds 65,536 states at once. Three hundred qubits holds more states than there are atoms in the observable universe. This is the part that gets oversimplified in every quantum explainer you have ever read: people hear "all states at once" and conclude that a quantum computer just tries every possible answer simultaneously and picks the right one. That would be extraordinary. It would also mean measurement is trivial, and it isn't.

When you measure a qubit, the superposition collapses. You get one result. The universe picks for you, probabilistically, and everything else disappears. So the raw fact of superposition doesn't buy you anything on its own.. if you could just look at all the states, you would, and the problem would be solved. The reason quantum computers are interesting is more subtle and more strange than parallelism: it is about what you can do to the state before you measure it. That is where interference comes in, and interference is the actual engine of every quantum algorithm worth knowing about.
### Entanglement
 
Two qubits can become entangled: their states are correlated in a way that has no classical equivalent. Measure one and the other's state is instantly determined, regardless of physical distance. Einstein famously called this "spooky action at a distance" and found it deeply objectionable. The experimental record has not been kind to his objection. Entanglement is real, and it allows quantum computers to encode relationships between variables in ways classical systems cannot replicate.
 
### Interference
 
This is the actual engine of quantum algorithms, and it receives less attention than it deserves. Quantum states behave like waves, so their amplitudes can actually reinforce or cancel each other out. A well-designed quantum algorithm amplifies the amplitude of correct answers and suppresses incorrect ones through carefully constructed interference patterns. Quantum computation is less about parallelism and more about wave engineering. The distinction matters.
 
::widget:interference-simulator::
 
---
 
## The Complexity Classes That Actually Matter
 
Computer scientists organize problems into complexity classes based on how resource requirements scale with input size. Four classes are worth knowing here.
 
**P** — problems solvable in polynomial time on a classical computer. Sorting, shortest path, multiplication. Efficient by definition.
 
**NP** — problems where a proposed solution can be verified quickly, but finding that solution may require exponential time. Factoring large integers, the traveling salesman problem, graph coloring. The class I spent an embarrassing amount of time trying to crack. There is, incidentally, a $1 million Millennium Prize for anyone who can prove or disprove P = NP — it remains unclaimed.
 
**NP-complete** — the hardest problems in NP. Solve any one in polynomial time and you solve them all. The field's consensus is that P ≠ NP and that this hardness is structural. No clever trick circumvents it. I was resistant to accepting that for longer than I should have been.
 
**BQP** — Bounded-Error Quantum Polynomial time. Problems a quantum computer can solve efficiently with a small probability of error. That error bound is less alarming than it sounds — it can be reduced to any desired threshold by running the algorithm repeatedly and taking a majority vote. BQP sits inside a known hierarchy: P ⊆ BPP ⊆ BQP ⊆ PSPACE. The critical point to highlight  is that BQP is almost certainly not a superset of NP. Quantum computers do not crack NP-complete problems. The hardness there appears to be a deeper fact about computation than quantum mechanics can bypass. But BQP is still genuinely larger than P, and that is where the real story begins.
 
![Venn diagram displaying the relationships of the above complexity classes. Source: https://www.researchgate.net/figure/NP-Complete-problems-are-outside-the-BQP-class-meaning-that-quantum-computers-can-not_fig1_371318355](/blog/quantum/complexity.png)
 
---
 
## Problems Quantum Computers Can Actually Solve
 
Quantum advantage shows up in specific kinds of structure: periodicity, algebraic symmetry, and simulation requirements. The canonical examples follow.
 
### Factoring Large Numbers
 
Shor's algorithm, published in 1994, is the reason every government-funded quantum computing program exists. It factors an n-bit integer in polynomial time (O(n³) quantum) against the classical best of roughly O(e^(n^1/3)), which is effectively exponential for large inputs. RSA encryption derives its security from precisely that classical difficulty.
 
The core insight is that factoring reduces to order-finding: given N and a random integer a, find the smallest r such that aʳ ≡ 1 (mod N). Once you have r, the prime factors of N follow from gcd(aʳ/² ± 1, N) with high probability. Finding r classically requires searching exponentially many values. Shor's algorithm uses the Quantum Fourier Transform, a circuit that exploits interference to find the periodicity of f(x) = aˣ mod N in O(n²) gates, to do it efficiently. The QFT is the engine underneath every quantum speedup involving periodicity or algebraic structure. If large fault-tolerant quantum computers exist, most current public-key cryptography becomes vulnerable.
 
::widget:shor-complexity::
 
### Harvest Now, Decrypt Later
 
That vulnerability is not purely a future concern. There is a strategy nation-state actors are believed to be running right now called harvest now, decrypt later. The approach is straightforward: intercept encrypted data today (e.g. classified communications, medical records, financial transactions, diplomatic cables) and store it. The data is unreadable at time of collection. The bet is that a cryptographically relevant quantum computer will exist within a decade or two, at which point the archive becomes readable retroactively. The breach precedes its own discovery by years.
 
Jeff Crume, IBM Distinguished Engineer and a serious voice in enterprise cybersecurity, has been making this argument consistently for years. His consistent position is that data being exfiltrated today may still carry sensitivity in ten or twenty years, and that the cryptographic migrations required to address this take years to execute. You cannot wait for a cryptographically relevant quantum computer to exist before starting to move. Watch his video on this topic [here](https://www.youtube.com/watch?v=TU9CRyAOekQ).
 
This is why NIST finalized post-quantum cryptography standards in August 2024. Not because quantum computers can break RSA today — they cannot, not at any scale that matters. Because the window in which migration needs to happen is already open, and the data being collected right now is the data at risk.
 
 
### Searching Unstructured Data
 
Grover's algorithm, 1996, provides a quadratic speedup for unstructured search: find a marked element among N items in O(√N) quantum queries versus O(N) classically. It works by iteratively applying an oracle that flips the phase of the correct answer, followed by a diffusion operator that amplifies the marked state. Each iteration rotates the quantum state vector slightly toward the target; after O(√N) rotations, you arrive with near-certainty. The geometry of the rotation also proves the bound is optimal, so no quantum algorithm can search unstructured space faster.
 
A quadratic speedup does not break NP-hardness. But it carries real practical consequences: it effectively halves the security strength of symmetric encryption, which is why AES-128 needs to become AES-256 in a post-quantum context.
 
::widget:grover-race::
 
### Simulating Quantum Systems
 
This was Feynman's original motivation, and it may ultimately be the first genuinely transformative industrial application. Classical computers require exponentially growing resources to simulate quantum systems; quantum computers do it natively. The applications span drug discovery, materials science, battery chemistry, and quantum chemistry. Quantum can handle calculations that are classically intractable for large molecules are natural problems for quantum hardware.
 
Quantum Phase Estimation is the core algorithm here. I do not have a deep enough understanding to describe it effectively, so you can read more [here](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-phase-estimation). What I can say this that QPE It is the primitive underlying quantum chemistry, quantum linear systems, and large portions of quantum machine learning.

This milestone is getting closer! in March 2026, IBM published a [reference architecture for quantum-centric supercomputing](https://www.ibm.com/quantum/blog/qcsc-reference-architecture) showing that QPE-based workflows can now be embedded directly into existing HPC infrastructure, with researchers from IBM, RIKEN, and the University of Chicago demonstrating quantum simulation converging to ground-state energies that leading classical methods could not produce, though on synthetic Hamiltonians rather than real-world molecular systems.
 
### A Unifying Structure
 
Most quantum speedups can be understood as instances of the Hidden Subgroup Problem: given a group and a function constant on cosets of some hidden subgroup, find that subgroup. The Quantum Fourier Transform solves abelian instances efficiently. Factoring, discrete logarithm, and many other BQP algorithms are all instances of this structure. When a quantum speedup exists, there is usually periodicity or algebraic symmetry underneath it.
 
---
 
## Where the Hardware Actually Is

The numbers you see in quantum computing headlines are almost always the wrong number.

When IBM announces a 1,000-qubit processor, or Google announces a 70-qubit chip, they are describing physical qubits, which are the actual hardware units. Superconducting circuits, trapped ions, photons. These are noisy by nature. They decohere. They make errors. Two-qubit gate error rates on today's best machines run between 0.1 and 1 percent, which sounds small until you consider that a useful computation might require millions of gates.

The number that actually matters is logical qubits, which are error-corrected qubits built from many physical qubits working together to catch and fix each other's mistakes. The overhead is severe: a single reliable logical qubit requires somewhere between hundreds and thousands of physical qubits depending on the target error rate.

Which means IBM's 1,000-qubit Condor processor is, in error-corrected terms, approximately a one-logical-qubit machine for anything serious.

::widget:qubit-overhead::

Every headline number needs that conversion applied before it means anything.

This is also why Google's 2019 quantum supremacy claim deserves a closer look. A 54-qubit processor completed a specific sampling task in roughly 200 seconds, and Google estimated the same calculation would take a classical supercomputer 10,000 years. The headline wrote itself.

IBM ran the numbers differently. Classical algorithms, properly optimized, could replicate the result in approximately 2.5 days. Both things are true: the demonstration was a genuine engineering achievement, and the 10,000-year figure was not a meaningful measure of anything.

What that exchange exposed is that supremacy was never the right threshold to begin with. The more honest standard is [quantum utility](https://www.ibm.com/quantum/blog/what-is-quantum-utlity): the point where a quantum computer solves a problem that actually matters, faster and more cost-effectively than any classical alternative. Not a contrived sampling task. A real problem, better solved.

That bar has not yet been cleared. The field is building toward it, not past it.

---
 
## What It Looks Like When We Get There
 
Quantum computers will not displace classical computers. No quantum laptops. The realistic near-term picture is quantum processors functioning as specialized co-processors inside hybrid systems which are invoked for the specific sub-problems where quantum algorithms provide genuine advantage, while everything else continues to run on conventional hardware. Access will come through cloud APIs. The transition will look less like a revolution and more like a new category of accelerator becoming available to the problems that can use it.
 
The downstream effects, once meaningful quantum advantage exists, will be significant in specific domains. Cryptography is the most pressing, since RSA and elliptic curve cryptography become vulnerable to Shor's algorithm, post-quantum standards are finalized, and migration is already underway in critical infrastructure. Drug discovery and materials science stand to be substantially affected by quantum simulation of molecular interactions. Optimization problems in logistics and finance may benefit from quantum annealing and variational algorithms, though practical advantage at scale remains undemonstrated. Quantum machine learning carries theoretical speedups for linear algebra and sampling problems, but dequantization results have shown that several of these can be replicated classically with sufficiently clever data structures, so the picture there is genuinely unsettled.
 
The transition will require more than new hardware. Cryptographic infrastructure needs systematic migration. Scientists will need to learn to frame problems as quantum circuits. The entire software stack, from qubit control systems to high-level programming frameworks,is still being built.
 
---
 
## What I Know Now That I Didn't Then
 
If I could go back to the version of myself filling notebooks trying to crack P = NP, I would show her a complexity diagram and point to BQP, since these problems are ones that actually may be solved in my lifetime.
 
P = NP remains one of the deepest open questions in mathematics. Quantum computing does not resolve it. The hardness of NP-complete problems appears to be a more fundamental fact about computation than quantum mechanics can circumvent.
 
But BQP is genuinely larger than P. Integer factorization lives there. Grover's algorithm remains one of the most elegant results I have encountered: pure interference applied to search, provably optimal, requiring almost no assumptions about problem structure. Scroll back up and play with that Grover demo if you haven't already.
 
The thing that took me too long to learn is that the right question was never whether quantum solves the hardest classical problems. The right question is what structure quantum computers exploit that classical computers cannot. The answer is interference, periodicity, and entanglement. The class of problems with that structure is BQP.
 
Everything else follows from there.
`;


export const widgets = {
 
  // ----------------------------------------------------------
  // Interference simulator
  // Place after: "...wave engineering. The distinction matters."
  // ----------------------------------------------------------
  'interference-simulator': `
<div class="widget" style="padding:1.5rem 0;">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
    <div>
      <label style="font-size:13px;color:#888;display:block;margin-bottom:4px;">Wave A amplitude</label>
      <div style="display:flex;align-items:center;gap:8px;">
        <input type="range" id="ampA" min="0" max="100" value="80" style="flex:1;">
        <span id="ampA-out" style="font-size:13px;min-width:30px;text-align:right;color:#888;">80</span>
      </div>
    </div>
    <div>
      <label style="font-size:13px;color:#888;display:block;margin-bottom:4px;">Wave B amplitude</label>
      <div style="display:flex;align-items:center;gap:8px;">
        <input type="range" id="ampB" min="0" max="100" value="80" style="flex:1;">
        <span id="ampB-out" style="font-size:13px;min-width:30px;text-align:right;color:#888;">80</span>
      </div>
    </div>
  </div>
  <div style="margin-bottom:16px;">
    <label style="font-size:13px;color:#888;display:block;margin-bottom:4px;">Phase offset — 0° = constructive &nbsp;|&nbsp; 180° = destructive</label>
    <div style="display:flex;align-items:center;gap:8px;">
      <input type="range" id="intf-phase" min="0" max="360" value="0" style="flex:1;">
      <span id="phase-out" style="font-size:13px;min-width:38px;text-align:right;color:#888;">0°</span>
    </div>
  </div>
  <canvas id="waveCanvas" height="220" style="width:100%;display:block;border-radius:8px;border:1px solid #e5e5e5;"></canvas>
  <div id="interference-label" style="margin-top:10px;font-size:14px;font-weight:500;text-align:center;min-height:22px;"></div>
  <p style="font-size:12px;color:#888;margin-top:6px;text-align:center;">This is how quantum algorithms work: engineer the phase so correct answers interfere constructively and wrong answers cancel out.</p>
</div>
<script>
(function() {
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');
 
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 220 * dpr;
    ctx.scale(dpr, dpr);
    draw();
  }
 
  function getVals() {
    return {
      aA: +document.getElementById('ampA').value / 100,
      aB: +document.getElementById('ampB').value / 100,
      ph: +document.getElementById('intf-phase').value * Math.PI / 180
    };
  }
 
  function draw() {
    const W = canvas.offsetWidth, H = 220;
    ctx.clearRect(0, 0, W, H);
    const { aA, aB, ph } = getVals();
    const mid = H / 2;
    const amp = 65;
    const freq = 2 * Math.PI / W * 3;
 
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, mid); ctx.lineTo(W, mid);
    ctx.stroke();
 
    // Wave A
    ctx.beginPath();
    ctx.strokeStyle = '#1DA075';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.45;
    for (let x = 0; x <= W; x++) {
      const y = mid - aA * amp * Math.sin(freq * x);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
 
    // Wave B
    ctx.beginPath();
    ctx.strokeStyle = '#7F77DD';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.45;
    for (let x = 0; x <= W; x++) {
      const y = mid - aB * amp * Math.sin(freq * x + ph);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
 
    // Result
    const phDeg = +document.getElementById('intf-phase').value;
    const isC = phDeg < 30 || phDeg > 330;
    const isD = phDeg > 150 && phDeg < 210;
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = isC ? '#BA7517' : isD ? '#A32D2D' : '#185FA5';
    ctx.lineWidth = 2.5;
    for (let x = 0; x <= W; x++) {
      const y = mid - (aA * amp * Math.sin(freq * x) + aB * amp * Math.sin(freq * x + ph));
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
 
    // Key
    ctx.globalAlpha = 0.7;
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#1DA075'; ctx.fillText('Wave A', 8, 18);
    ctx.fillStyle = '#7F77DD'; ctx.fillText('Wave B', 8, 32);
    ctx.fillStyle = isC ? '#BA7517' : isD ? '#A32D2D' : '#185FA5';
    ctx.fillText('Result', 8, 46);
    ctx.globalAlpha = 1;
 
    const label = document.getElementById('interference-label');
    if (isC) {
      label.style.color = '#BA7517';
      label.textContent = 'Constructive interference — amplitudes add. Correct answers amplified.';
    } else if (isD) {
      label.style.color = '#A32D2D';
      label.textContent = 'Destructive interference — amplitudes cancel. Wrong answers suppressed.';
    } else {
      label.style.color = '#888';
      label.textContent = 'Partial interference — somewhere between.';
    }
  }
 
  ['ampA','ampB','intf-phase'].forEach(id => {
    const el = document.getElementById(id);
    const outId = id === 'intf-phase' ? 'phase-out' : id + '-out';
    el.addEventListener('input', () => {
      document.getElementById(outId).textContent = id === 'intf-phase' ? el.value + '°' : el.value;
      draw();
    });
  });
 
  new ResizeObserver(resize).observe(canvas);
  resize();
})();
</script>`,
 
 
  // ----------------------------------------------------------
  // Complexity hierarchy diagram
  // Place after: "...that is where the real story begins."
  // ----------------------------------------------------------
  'complexity-hierarchy': `
<div class="widget" style="padding:1.5rem 0;">
  <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;">
    <defs>
      <marker id="ch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
    </defs>
    <!-- PSPACE -->
    <rect x="30" y="20" width="480" height="370" rx="16" fill="#F1EFE8" stroke="#888780" stroke-width="0.5"/>
    <text x="54" y="48" font-size="14" font-weight="500" fill="#2C2C2A">PSPACE</text>
    <text x="54" y="64" font-size="12" fill="#5F5E5A">All problems solvable with polynomial memory</text>
    <!-- BQP -->
    <rect x="60" y="80" width="390" height="280" rx="14" fill="#EEEDFE" stroke="#7F77DD" stroke-width="0.5"/>
    <text x="84" y="108" font-size="14" font-weight="500" fill="#26215C">BQP</text>
    <text x="84" y="124" font-size="12" fill="#534AB7">Quantum polynomial time</text>
    <!-- BPP -->
    <rect x="90" y="140" width="300" height="190" rx="12" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
    <text x="114" y="167" font-size="14" font-weight="500" fill="#04342C">BPP</text>
    <text x="114" y="183" font-size="12" fill="#0F6E56">Classical probabilistic polynomial time</text>
    <!-- P -->
    <rect x="118" y="200" width="210" height="100" rx="10" fill="#E6F1FB" stroke="#378ADD" stroke-width="0.5"/>
    <text x="223" y="244" font-size="14" font-weight="500" fill="#042C53" text-anchor="middle">P</text>
    <text x="223" y="262" font-size="12" fill="#185FA5" text-anchor="middle">Deterministic polynomial time</text>
    <text x="223" y="278" font-size="12" fill="#185FA5" text-anchor="middle">Sorting, shortest path, multiply</text>
    <!-- NP -->
    <rect x="380" y="80" width="250" height="280" rx="14" fill="#FAECE7" stroke="#D85A30" stroke-width="0.5" opacity="0.9"/>
    <text x="404" y="108" font-size="14" font-weight="500" fill="#4A1B0C">NP</text>
    <text x="404" y="124" font-size="12" fill="#993C1D">Verify quickly, find slowly</text>
    <text x="404" y="144" font-size="12" fill="#993C1D">Factoring, TSP, 3-SAT</text>
    <!-- NP-complete box -->
    <rect x="398" y="200" width="210" height="60" rx="8" fill="none" stroke="#D85A30" stroke-width="0.5"/>
    <text x="503" y="226" font-size="12" fill="#993C1D" text-anchor="middle">NP-complete</text>
    <text x="503" y="244" font-size="12" fill="#993C1D" text-anchor="middle">Hardest problems in NP</text>
    <!-- Factoring badge (BQP ∩ NP) -->
    <rect x="370" y="155" width="120" height="36" rx="8" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
    <text x="430" y="177" font-size="13" font-weight="500" fill="#633806" text-anchor="middle">Factoring</text>
    <!-- Open question -->
    <line x1="490" y1="220" x2="544" y2="220" stroke="#888" stroke-width="0.5" stroke-dasharray="4 3" marker-end="url(#ch-arrow)"/>
    <text x="548" y="213" font-size="12" fill="#5F5E5A">?</text>
    <text x="548" y="227" font-size="12" fill="#5F5E5A">BQP ⊆ NP?</text>
    <text x="548" y="241" font-size="12" fill="#5F5E5A">Unknown</text>
    <!-- Hierarchy label -->
    <text x="340" y="398" font-size="12" fill="#888" text-anchor="middle">P ⊆ BPP ⊆ BQP ⊆ PSPACE</text>
  </svg>
</div>`,
 
 
  // ----------------------------------------------------------
  // Shor's algorithm complexity curves
  // Place after: "...most current public-key cryptography becomes vulnerable."
  // ----------------------------------------------------------
  'shor-complexity': `
<div class="widget" style="padding:1.5rem 0;">
  <div style="margin-bottom:16px;">
    <label style="font-size:13px;color:#888;display:block;margin-bottom:4px;">Key size n (bits) — drag to see how the gap grows</label>
    <div style="display:flex;align-items:center;gap:8px;">
      <input type="range" id="shor-n" min="8" max="2048" step="8" value="128" style="flex:1;">
      <span id="shor-n-out" style="font-size:13px;min-width:60px;text-align:right;color:#888;">128 bits</span>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
    <div style="background:#f7f7f5;border-radius:8px;padding:12px;">
      <div style="font-size:12px;color:#888;margin-bottom:4px;">Classical ops (GNFS)</div>
      <div id="shor-classical-out" style="font-size:20px;font-weight:500;color:#222;">—</div>
    </div>
    <div style="background:#f7f7f5;border-radius:8px;padding:12px;">
      <div style="font-size:12px;color:#888;margin-bottom:4px;">Shor's algorithm ops</div>
      <div id="shor-quantum-out" style="font-size:20px;font-weight:500;color:#1DA075;">—</div>
    </div>
  </div>
  <svg id="shorChart" width="100%" height="280" style="border:1px solid #e5e5e5;border-radius:8px;background:#fff;"></svg>
  <div id="shor-label" style="margin-top:10px;font-size:13px;color:#888;text-align:center;min-height:18px;"></div>
  <div style="display:flex;gap:20px;margin-top:8px;justify-content:center;font-size:12px;color:#888;">
    <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:18px;height:3px;background:#E24B4A;border-radius:2px;"></span>Classical (GNFS)</span>
    <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:18px;height:3px;background:#1DA075;border-radius:2px;"></span>Shor's algorithm O(n³)</span>
  </div>
</div>
<script>
(function() {
  function gnfs(n) { return Math.exp(1.9 * Math.pow(n, 1/3) * Math.pow(Math.log(n), 2/3)); }
  function shor(n) { return Math.pow(n, 3); }
  function fmtOps(v) {
    if (!isFinite(v) || v > 1e80) return '> 10\u2078\u2070';
    const e = Math.round(Math.log10(v));
    if (v >= 1e15) return '~10' + String(e).split('').map(c => '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'[+c]).join('');
    if (v >= 1e9) return (v/1e9).toFixed(1) + ' billion';
    if (v >= 1e6) return (v/1e6).toFixed(1) + ' million';
    return Math.round(v).toLocaleString();
  }
  
  const svg = document.getElementById('shorChart');
  const padding = { top: 30, right: 40, bottom: 40, left: 60 };
  
  function drawChart() {
    const rect = svg.getBoundingClientRect();
    const width = rect.width;
    const height = 280;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    
    // Grid and axes
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', 'translate(' + padding.left + ',' + padding.top + ')');
    
    // Y-axis grid lines and labels
    for (let i = 0; i <= 9; i++) {
      const y = chartHeight - (i / 9) * chartHeight;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', chartWidth);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'rgba(0,0,0,0.06)');
      line.setAttribute('stroke-width', '1');
      g.appendChild(line);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '-8');
      text.setAttribute('y', y + 4);
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('font-size', '11');
      text.setAttribute('fill', '#888');
      text.textContent = '10' + (i * 10).toString().split('').map(c => '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'[+c] || c).join('');
      g.appendChild(text);
    }
    
    // X-axis labels
    for (let i = 0; i <= 8; i++) {
      const x = (i / 8) * chartWidth;
      const n = Math.round((i / 8) * 2048);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', chartHeight + 20);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '11');
      text.setAttribute('fill', '#888');
      text.textContent = n;
      g.appendChild(text);
    }
    
    // Axis labels
    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', chartWidth / 2);
    xLabel.setAttribute('y', chartHeight + 35);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('font-size', '11');
    xLabel.setAttribute('fill', '#888');
    xLabel.textContent = 'Key size (bits)';
    g.appendChild(xLabel);
    
    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('transform', 'translate(-45, ' + (chartHeight/2) + ') rotate(-90)');
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('font-size', '11');
    yLabel.setAttribute('fill', '#888');
    yLabel.textContent = 'log₁₀(operations)';
    g.appendChild(yLabel);
    
    // Plot curves
    const nPts = [];
    for (let n = 8; n <= 2048; n += 16) nPts.push(n);
    
    function plotCurve(data, color) {
      let path = '';
      data.forEach((point, i) => {
        const x = (nPts[i] / 2048) * chartWidth;
        const y = chartHeight - (Math.min(point, 90) / 90) * chartHeight;
        path += (i === 0 ? 'M' : 'L') + x + ',' + y;
      });
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', path);
      pathEl.setAttribute('fill', 'none');
      pathEl.setAttribute('stroke', color);
      pathEl.setAttribute('stroke-width', '2');
      g.appendChild(pathEl);
    }
    
    const classicalData = nPts.map(n => Math.log10(Math.max(1, gnfs(n))));
    const shorData = nPts.map(n => Math.log10(Math.max(1, shor(n))));
    
    plotCurve(classicalData, '#E24B4A');
    plotCurve(shorData, '#1DA075');
    
    // Current position line
    const n = +document.getElementById('shor-n').value;
    const x = (n / 2048) * chartWidth;
    const vline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    vline.setAttribute('x1', x);
    vline.setAttribute('y1', '0');
    vline.setAttribute('x2', x);
    vline.setAttribute('y2', chartHeight);
    vline.setAttribute('stroke', 'rgba(0,0,0,0.2)');
    vline.setAttribute('stroke-width', '1');
    vline.setAttribute('stroke-dasharray', '4,3');
    g.appendChild(vline);
    
    svg.appendChild(g);
  }
  
  function update() {
    const n = +document.getElementById('shor-n').value;
    document.getElementById('shor-n-out').textContent = n + ' bits';
    document.getElementById('shor-classical-out').textContent = fmtOps(gnfs(n));
    document.getElementById('shor-quantum-out').textContent = fmtOps(shor(n));
    const lbl = document.getElementById('shor-label');
    if (n <= 64) lbl.textContent = 'At small key sizes, the difference is modest.';
    else if (n <= 512) lbl.textContent = 'Classical requires ' + fmtOps(gnfs(n)/shor(n)) + '\xD7 more operations than Shor\u2019s at ' + n + ' bits.';
    else lbl.textContent = 'At ' + n + ' bits (real-world RSA), classical factoring is computationally impossible. Shor\u2019s remains polynomial.';
    drawChart();
  }
  
  document.getElementById('shor-n').addEventListener('input', update);
  window.addEventListener('resize', drawChart);
  update();
})();
</script>`,
 
 
  // ----------------------------------------------------------
  // HNDL timeline
  // Place after: "...the data being collected right now is the data at risk."
  // ----------------------------------------------------------
  'hndl-timeline': `
<div class="widget" style="padding:1.5rem 0;">
  <svg width="100%" viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;">
    <defs>
      <marker id="tl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
    </defs>
    <!-- Spine -->
    <line x1="60" y1="112" x2="630" y2="112" stroke="#ccc" stroke-width="1" marker-end="url(#tl-arrow)"/>
    <!-- Harvest zone -->
    <rect x="60" y="92" width="280" height="40" rx="4" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.5"/>
    <text x="200" y="108" font-size="12" fill="#A32D2D" text-anchor="middle">Data harvested now</text>
    <text x="200" y="124" font-size="12" fill="#A32D2D" text-anchor="middle">Unreadable at collection</text>
    <!-- CRQC window -->
    <rect x="360" y="92" width="180" height="40" rx="4" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
    <text x="450" y="108" font-size="12" fill="#633806" text-anchor="middle">CRQC arrives</text>
    <text x="450" y="124" font-size="12" fill="#633806" text-anchor="middle">~10–20 years</text>
    <!-- Retroactive decrypt arc -->
    <path d="M450 92 Q450 50 200 50" fill="none" stroke="#E24B4A" stroke-width="1" stroke-dasharray="5 3" marker-end="url(#tl-arrow)"/>
    <text x="340" y="44" font-size="12" fill="#A32D2D" text-anchor="middle">Retroactive decryption</text>
    <!-- Year ticks -->
    <line x1="60"  y1="106" x2="60"  y2="118" stroke="#aaa" stroke-width="1"/>
    <text x="60"  y="134" font-size="11" fill="#888" text-anchor="middle">2025</text>
    <line x1="200" y1="106" x2="200" y2="118" stroke="#aaa" stroke-width="1"/>
    <text x="200" y="134" font-size="11" fill="#888" text-anchor="middle">2030</text>
    <line x1="340" y1="106" x2="340" y2="118" stroke="#aaa" stroke-width="1"/>
    <text x="340" y="134" font-size="11" fill="#888" text-anchor="middle">2035</text>
    <line x1="480" y1="106" x2="480" y2="118" stroke="#aaa" stroke-width="1"/>
    <text x="480" y="134" font-size="11" fill="#888" text-anchor="middle">2040</text>
    <!-- NIST callout -->
    <circle cx="100" cy="112" r="3" fill="#1DA075"/>
    <line x1="100" y1="115" x2="100" y2="160" stroke="#aaa" stroke-width="0.5" stroke-dasharray="3 2"/>
    <rect x="30" y="160" width="200" height="40" rx="6" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
    <text x="130" y="176" font-size="12" font-weight="500" fill="#04342C" text-anchor="middle">NIST PQC standards</text>
    <text x="130" y="192" font-size="11" fill="#0F6E56" text-anchor="middle">Finalized Aug 2024 — migrate now</text>
    <!-- Sensitive data callout -->
    <circle cx="200" cy="112" r="3" fill="#E24B4A"/>
    <line x1="200" y1="115" x2="290" y2="160" stroke="#aaa" stroke-width="0.5" stroke-dasharray="3 2"/>
    <rect x="252" y="160" width="220" height="40" rx="6" fill="#FCEBEB" stroke="#E24B4A" stroke-width="0.5"/>
    <text x="362" y="176" font-size="12" font-weight="500" fill="#501313" text-anchor="middle">Data stolen today</text>
    <text x="362" y="192" font-size="11" fill="#A32D2D" text-anchor="middle">May still be sensitive when decrypted</text>
  </svg>
</div>`,
 
 
  // ----------------------------------------------------------
  // Grover's search race
  // Place after: "...AES-128 needs to become AES-256 in a post-quantum context."
  // ----------------------------------------------------------
  'grover-race': `
<div class="widget" style="padding:1.5rem 0;">
  <div style="margin-bottom:16px;">
    <label style="font-size:13px;color:#888;display:block;margin-bottom:4px;">Database size N</label>
    <div style="display:flex;align-items:center;gap:8px;">
      <input type="range" id="gr-n" min="4" max="10000" step="4" value="100" style="flex:1;">
      <span id="gr-n-out" style="font-size:13px;min-width:72px;text-align:right;color:#888;">100 items</span>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
    <div style="background:#f7f7f5;border-radius:8px;padding:12px;">
      <div style="font-size:12px;color:#888;margin-bottom:4px;">Classical — O(N)</div>
      <div id="gr-c-steps" style="font-size:22px;font-weight:500;color:#222;">100 steps</div>
    </div>
    <div style="background:#f7f7f5;border-radius:8px;padding:12px;">
      <div style="font-size:12px;color:#888;margin-bottom:4px;">Grover's — O(√N)</div>
      <div id="gr-q-steps" style="font-size:22px;font-weight:500;color:#1DA075;">10 steps</div>
    </div>
  </div>
  <div style="margin-bottom:8px;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <span style="font-size:12px;color:#888;width:90px;flex-shrink:0;">Classical</span>
      <div style="flex:1;background:#f0f0ee;border-radius:4px;height:28px;overflow:hidden;">
        <div id="gr-c-bar" style="height:100%;background:#E24B4A;width:0%;border-radius:4px;transition:width 0.03s;"></div>
      </div>
      <span id="gr-c-pct" style="font-size:12px;color:#888;width:36px;text-align:right;">0%</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:12px;color:#888;width:90px;flex-shrink:0;">Grover's</span>
      <div style="flex:1;background:#f0f0ee;border-radius:4px;height:28px;overflow:hidden;">
        <div id="gr-q-bar" style="height:100%;background:#1DA075;width:0%;border-radius:4px;transition:width 0.03s;"></div>
      </div>
      <span id="gr-q-pct" style="font-size:12px;color:#888;width:36px;text-align:right;">0%</span>
    </div>
  </div>
  <div style="display:flex;gap:8px;margin-top:12px;">
    <button id="gr-run" onclick="groverRun()" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">Run race</button>
    <button id="gr-reset" onclick="groverReset()" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;">Reset</button>
  </div>
  <div id="gr-result" style="margin-top:10px;font-size:14px;font-weight:500;text-align:center;min-height:22px;color:#222;"></div>
</div>
<script>
var grRunning = false, grRaf = null, grElapsed = 0, grLast = null, grCdone = false, grQdone = false;
var GR_STEP_MS = 16;
 
function grGetN() { return +document.getElementById('gr-n').value; }
function grGetSqN() { return Math.ceil(Math.sqrt(grGetN())); }
 
function grUpdateLabels() {
  var N = grGetN(), sqN = grGetSqN();
  document.getElementById('gr-n-out').textContent = N.toLocaleString() + ' items';
  document.getElementById('gr-c-steps').textContent = N.toLocaleString() + ' steps';
  document.getElementById('gr-q-steps').textContent = sqN.toLocaleString() + ' steps';
}
 
document.getElementById('gr-n').addEventListener('input', function() { groverReset(); grUpdateLabels(); });
 
function grFrame(ts) {
  if (!grLast) grLast = ts;
  grElapsed += ts - grLast;
  grLast = ts;
  var N = grGetN(), sqN = grGetSqN();
  var steps = Math.floor(grElapsed / GR_STEP_MS);
  if (!grQdone) {
    var qp = Math.min(Math.round(steps / sqN * 100), 100);
    document.getElementById('gr-q-bar').style.width = qp + '%';
    document.getElementById('gr-q-pct').textContent = qp + '%';
    if (steps >= sqN) {
      grQdone = true;
      var cpct = Math.min(Math.round(steps / N * 100), 100);
      document.getElementById('gr-result').textContent = "Grover's finished. Classical is " + cpct + "% done.";
    }
  }
  if (!grCdone) {
    var cp = Math.min(Math.round(steps / N * 100), 100);
    document.getElementById('gr-c-bar').style.width = cp + '%';
    document.getElementById('gr-c-pct').textContent = cp + '%';
    if (steps >= N) grCdone = true;
  }
  if (grCdone && grQdone) {
    document.getElementById('gr-result').textContent = 'Both done. Grover\u2019s needed ' + sqN.toLocaleString() + ' steps vs ' + N.toLocaleString() + ' classical \u2014 ' + Math.round(N/sqN) + '\xD7 faster.';
    grRunning = false; return;
  }
  grRaf = requestAnimationFrame(grFrame);
}
 
function groverRun() {
  if (grRunning) return;
  groverReset();
  grRunning = true; grElapsed = 0; grLast = null; grCdone = false; grQdone = false;
  document.getElementById('gr-result').textContent = '';
  grRaf = requestAnimationFrame(grFrame);
}
 
function groverReset() {
  if (grRaf) cancelAnimationFrame(grRaf);
  grRunning = false; grCdone = false; grQdone = false; grElapsed = 0; grLast = null;
  ['gr-c-bar','gr-q-bar'].forEach(function(id){ document.getElementById(id).style.width='0%'; });
  ['gr-c-pct','gr-q-pct'].forEach(function(id){ document.getElementById(id).textContent='0%'; });
  document.getElementById('gr-result').textContent = '';
}
 
grUpdateLabels();
</script>`,
 
 
  // ----------------------------------------------------------
  // Physical vs logical qubit overhead
  // Place after: "...does not translate to useful computation in any direct way."
  // ----------------------------------------------------------
  'qubit-overhead': `
<div class="widget" style="padding:1.5rem 0;">
  <svg width="100%" viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="font-family:sans-serif;">
    <defs>
      <marker id="qo-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
    </defs>
    <!-- Left label -->
    <text x="130" y="22" font-size="13" font-weight="500" fill="#222" text-anchor="middle">IBM Condor: 1,000+ physical qubits</text>
    <!-- Physical qubit dots grid 25×8 = 200 representative dots -->
    <g fill="#B4B2A9" opacity="0.75">
      <!-- 8 rows × 25 cols, each dot 7×7, gap 3, start x=18 y=32 -->
      <!-- Row 1 --><rect x="18" y="32" width="7" height="7" rx="1"/><rect x="28" y="32" width="7" height="7" rx="1"/><rect x="38" y="32" width="7" height="7" rx="1"/><rect x="48" y="32" width="7" height="7" rx="1"/><rect x="58" y="32" width="7" height="7" rx="1"/><rect x="68" y="32" width="7" height="7" rx="1"/><rect x="78" y="32" width="7" height="7" rx="1"/><rect x="88" y="32" width="7" height="7" rx="1"/><rect x="98" y="32" width="7" height="7" rx="1"/><rect x="108" y="32" width="7" height="7" rx="1"/><rect x="118" y="32" width="7" height="7" rx="1"/><rect x="128" y="32" width="7" height="7" rx="1"/><rect x="138" y="32" width="7" height="7" rx="1"/><rect x="148" y="32" width="7" height="7" rx="1"/><rect x="158" y="32" width="7" height="7" rx="1"/><rect x="168" y="32" width="7" height="7" rx="1"/><rect x="178" y="32" width="7" height="7" rx="1"/><rect x="188" y="32" width="7" height="7" rx="1"/><rect x="198" y="32" width="7" height="7" rx="1"/><rect x="208" y="32" width="7" height="7" rx="1"/><rect x="218" y="32" width="7" height="7" rx="1"/><rect x="228" y="32" width="7" height="7" rx="1"/><rect x="238" y="32" width="7" height="7" rx="1"/><rect x="248" y="32" width="7" height="7" rx="1"/><rect x="258" y="32" width="7" height="7" rx="1"/>
      <!-- Row 2 --><rect x="18" y="42" width="7" height="7" rx="1"/><rect x="28" y="42" width="7" height="7" rx="1"/><rect x="38" y="42" width="7" height="7" rx="1"/><rect x="48" y="42" width="7" height="7" rx="1"/><rect x="58" y="42" width="7" height="7" rx="1"/><rect x="68" y="42" width="7" height="7" rx="1"/><rect x="78" y="42" width="7" height="7" rx="1"/><rect x="88" y="42" width="7" height="7" rx="1"/><rect x="98" y="42" width="7" height="7" rx="1"/><rect x="108" y="42" width="7" height="7" rx="1"/><rect x="118" y="42" width="7" height="7" rx="1"/><rect x="128" y="42" width="7" height="7" rx="1"/><rect x="138" y="42" width="7" height="7" rx="1"/><rect x="148" y="42" width="7" height="7" rx="1"/><rect x="158" y="42" width="7" height="7" rx="1"/><rect x="168" y="42" width="7" height="7" rx="1"/><rect x="178" y="42" width="7" height="7" rx="1"/><rect x="188" y="42" width="7" height="7" rx="1"/><rect x="198" y="42" width="7" height="7" rx="1"/><rect x="208" y="42" width="7" height="7" rx="1"/><rect x="218" y="42" width="7" height="7" rx="1"/><rect x="228" y="42" width="7" height="7" rx="1"/><rect x="238" y="42" width="7" height="7" rx="1"/><rect x="248" y="42" width="7" height="7" rx="1"/><rect x="258" y="42" width="7" height="7" rx="1"/>
      <!-- Row 3 --><rect x="18" y="52" width="7" height="7" rx="1"/><rect x="28" y="52" width="7" height="7" rx="1"/><rect x="38" y="52" width="7" height="7" rx="1"/><rect x="48" y="52" width="7" height="7" rx="1"/><rect x="58" y="52" width="7" height="7" rx="1"/><rect x="68" y="52" width="7" height="7" rx="1"/><rect x="78" y="52" width="7" height="7" rx="1"/><rect x="88" y="52" width="7" height="7" rx="1"/><rect x="98" y="52" width="7" height="7" rx="1"/><rect x="108" y="52" width="7" height="7" rx="1"/><rect x="118" y="52" width="7" height="7" rx="1"/><rect x="128" y="52" width="7" height="7" rx="1"/><rect x="138" y="52" width="7" height="7" rx="1"/><rect x="148" y="52" width="7" height="7" rx="1"/><rect x="158" y="52" width="7" height="7" rx="1"/><rect x="168" y="52" width="7" height="7" rx="1"/><rect x="178" y="52" width="7" height="7" rx="1"/><rect x="188" y="52" width="7" height="7" rx="1"/><rect x="198" y="52" width="7" height="7" rx="1"/><rect x="208" y="52" width="7" height="7" rx="1"/><rect x="218" y="52" width="7" height="7" rx="1"/><rect x="228" y="52" width="7" height="7" rx="1"/><rect x="238" y="52" width="7" height="7" rx="1"/><rect x="248" y="52" width="7" height="7" rx="1"/><rect x="258" y="52" width="7" height="7" rx="1"/>
      <!-- Row 4 --><rect x="18" y="62" width="7" height="7" rx="1"/><rect x="28" y="62" width="7" height="7" rx="1"/><rect x="38" y="62" width="7" height="7" rx="1"/><rect x="48" y="62" width="7" height="7" rx="1"/><rect x="58" y="62" width="7" height="7" rx="1"/><rect x="68" y="62" width="7" height="7" rx="1"/><rect x="78" y="62" width="7" height="7" rx="1"/><rect x="88" y="62" width="7" height="7" rx="1"/><rect x="98" y="62" width="7" height="7" rx="1"/><rect x="108" y="62" width="7" height="7" rx="1"/><rect x="118" y="62" width="7" height="7" rx="1"/><rect x="128" y="62" width="7" height="7" rx="1"/><rect x="138" y="62" width="7" height="7" rx="1"/><rect x="148" y="62" width="7" height="7" rx="1"/><rect x="158" y="62" width="7" height="7" rx="1"/><rect x="168" y="62" width="7" height="7" rx="1"/><rect x="178" y="62" width="7" height="7" rx="1"/><rect x="188" y="62" width="7" height="7" rx="1"/><rect x="198" y="62" width="7" height="7" rx="1"/><rect x="208" y="62" width="7" height="7" rx="1"/><rect x="218" y="62" width="7" height="7" rx="1"/><rect x="228" y="62" width="7" height="7" rx="1"/><rect x="238" y="62" width="7" height="7" rx="1"/><rect x="248" y="62" width="7" height="7" rx="1"/><rect x="258" y="62" width="7" height="7" rx="1"/>
      <!-- Row 5 --><rect x="18" y="72" width="7" height="7" rx="1"/><rect x="28" y="72" width="7" height="7" rx="1"/><rect x="38" y="72" width="7" height="7" rx="1"/><rect x="48" y="72" width="7" height="7" rx="1"/><rect x="58" y="72" width="7" height="7" rx="1"/><rect x="68" y="72" width="7" height="7" rx="1"/><rect x="78" y="72" width="7" height="7" rx="1"/><rect x="88" y="72" width="7" height="7" rx="1"/><rect x="98" y="72" width="7" height="7" rx="1"/><rect x="108" y="72" width="7" height="7" rx="1"/><rect x="118" y="72" width="7" height="7" rx="1"/><rect x="128" y="72" width="7" height="7" rx="1"/><rect x="138" y="72" width="7" height="7" rx="1"/><rect x="148" y="72" width="7" height="7" rx="1"/><rect x="158" y="72" width="7" height="7" rx="1"/><rect x="168" y="72" width="7" height="7" rx="1"/><rect x="178" y="72" width="7" height="7" rx="1"/><rect x="188" y="72" width="7" height="7" rx="1"/><rect x="198" y="72" width="7" height="7" rx="1"/><rect x="208" y="72" width="7" height="7" rx="1"/><rect x="218" y="72" width="7" height="7" rx="1"/><rect x="228" y="72" width="7" height="7" rx="1"/><rect x="238" y="72" width="7" height="7" rx="1"/><rect x="248" y="72" width="7" height="7" rx="1"/><rect x="258" y="72" width="7" height="7" rx="1"/>
      <!-- Row 6 --><rect x="18" y="82" width="7" height="7" rx="1"/><rect x="28" y="82" width="7" height="7" rx="1"/><rect x="38" y="82" width="7" height="7" rx="1"/><rect x="48" y="82" width="7" height="7" rx="1"/><rect x="58" y="82" width="7" height="7" rx="1"/><rect x="68" y="82" width="7" height="7" rx="1"/><rect x="78" y="82" width="7" height="7" rx="1"/><rect x="88" y="82" width="7" height="7" rx="1"/><rect x="98" y="82" width="7" height="7" rx="1"/><rect x="108" y="82" width="7" height="7" rx="1"/><rect x="118" y="82" width="7" height="7" rx="1"/><rect x="128" y="82" width="7" height="7" rx="1"/><rect x="138" y="82" width="7" height="7" rx="1"/><rect x="148" y="82" width="7" height="7" rx="1"/><rect x="158" y="82" width="7" height="7" rx="1"/><rect x="168" y="82" width="7" height="7" rx="1"/><rect x="178" y="82" width="7" height="7" rx="1"/><rect x="188" y="82" width="7" height="7" rx="1"/><rect x="198" y="82" width="7" height="7" rx="1"/><rect x="208" y="82" width="7" height="7" rx="1"/><rect x="218" y="82" width="7" height="7" rx="1"/><rect x="228" y="82" width="7" height="7" rx="1"/><rect x="238" y="82" width="7" height="7" rx="1"/><rect x="248" y="82" width="7" height="7" rx="1"/><rect x="258" y="82" width="7" height="7" rx="1"/>
      <!-- Row 7 --><rect x="18" y="92" width="7" height="7" rx="1"/><rect x="28" y="92" width="7" height="7" rx="1"/><rect x="38" y="92" width="7" height="7" rx="1"/><rect x="48" y="92" width="7" height="7" rx="1"/><rect x="58" y="92" width="7" height="7" rx="1"/><rect x="68" y="92" width="7" height="7" rx="1"/><rect x="78" y="92" width="7" height="7" rx="1"/><rect x="88" y="92" width="7" height="7" rx="1"/><rect x="98" y="92" width="7" height="7" rx="1"/><rect x="108" y="92" width="7" height="7" rx="1"/><rect x="118" y="92" width="7" height="7" rx="1"/><rect x="128" y="92" width="7" height="7" rx="1"/><rect x="138" y="92" width="7" height="7" rx="1"/><rect x="148" y="92" width="7" height="7" rx="1"/><rect x="158" y="92" width="7" height="7" rx="1"/><rect x="168" y="92" width="7" height="7" rx="1"/><rect x="178" y="92" width="7" height="7" rx="1"/><rect x="188" y="92" width="7" height="7" rx="1"/><rect x="198" y="92" width="7" height="7" rx="1"/><rect x="208" y="92" width="7" height="7" rx="1"/><rect x="218" y="92" width="7" height="7" rx="1"/><rect x="228" y="92" width="7" height="7" rx="1"/><rect x="238" y="92" width="7" height="7" rx="1"/><rect x="248" y="92" width="7" height="7" rx="1"/><rect x="258" y="92" width="7" height="7" rx="1"/>
      <!-- Row 8 --><rect x="18" y="102" width="7" height="7" rx="1"/><rect x="28" y="102" width="7" height="7" rx="1"/><rect x="38" y="102" width="7" height="7" rx="1"/><rect x="48" y="102" width="7" height="7" rx="1"/><rect x="58" y="102" width="7" height="7" rx="1"/><rect x="68" y="102" width="7" height="7" rx="1"/><rect x="78" y="102" width="7" height="7" rx="1"/><rect x="88" y="102" width="7" height="7" rx="1"/><rect x="98" y="102" width="7" height="7" rx="1"/><rect x="108" y="102" width="7" height="7" rx="1"/><rect x="118" y="102" width="7" height="7" rx="1"/><rect x="128" y="102" width="7" height="7" rx="1"/><rect x="138" y="102" width="7" height="7" rx="1"/><rect x="148" y="102" width="7" height="7" rx="1"/><rect x="158" y="102" width="7" height="7" rx="1"/><rect x="168" y="102" width="7" height="7" rx="1"/><rect x="178" y="102" width="7" height="7" rx="1"/><rect x="188" y="102" width="7" height="7" rx="1"/><rect x="198" y="102" width="7" height="7" rx="1"/><rect x="208" y="102" width="7" height="7" rx="1"/><rect x="218" y="102" width="7" height="7" rx="1"/><rect x="228" y="102" width="7" height="7" rx="1"/><rect x="238" y="102" width="7" height="7" rx="1"/><rect x="248" y="102" width="7" height="7" rx="1"/><rect x="258" y="102" width="7" height="7" rx="1"/>
    </g>
    <!-- Error qubits -->
    <g fill="#E24B4A" opacity="0.9">
      <rect x="48"  y="42"  width="7" height="7" rx="1"/>
      <rect x="118" y="62"  width="7" height="7" rx="1"/>
      <rect x="78"  y="82"  width="7" height="7" rx="1"/>
      <rect x="168" y="52"  width="7" height="7" rx="1"/>
      <rect x="208" y="92"  width="7" height="7" rx="1"/>
      <rect x="138" y="72"  width="7" height="7" rx="1"/>
      <rect x="38"  y="102" width="7" height="7" rx="1"/>
    </g>
    <text x="130" y="122" font-size="11" fill="#A32D2D" text-anchor="middle">Red = decoherence error</text>
    <!-- Arrow -->
    <line x1="272" y1="72" x2="316" y2="72" stroke="#888" stroke-width="1" marker-end="url(#qo-arrow)"/>
    <text x="294" y="64" font-size="11" fill="#888" text-anchor="middle">Error</text>
    <text x="294" y="82" font-size="11" fill="#888" text-anchor="middle">correction</text>
    <!-- Right label -->
    <text x="510" y="22" font-size="13" font-weight="500" fill="#222" text-anchor="middle">1 logical qubit</text>
    <text x="510" y="38" font-size="11" fill="#888" text-anchor="middle">~1,000 physical qubits (surface code)</text>
    <!-- Surface code grid 19×5 teal dots -->
    <g fill="#1DA075" opacity="0.8">
      <!-- 5 rows × 19 cols, dot 9×9, gap 3, start x=328 y=46 -->
      <rect x="328" y="46" width="9" height="9" rx="2"/><rect x="340" y="46" width="9" height="9" rx="2"/><rect x="352" y="46" width="9" height="9" rx="2"/><rect x="364" y="46" width="9" height="9" rx="2"/><rect x="376" y="46" width="9" height="9" rx="2"/><rect x="388" y="46" width="9" height="9" rx="2"/><rect x="400" y="46" width="9" height="9" rx="2"/><rect x="412" y="46" width="9" height="9" rx="2"/><rect x="424" y="46" width="9" height="9" rx="2"/><rect x="436" y="46" width="9" height="9" rx="2"/><rect x="448" y="46" width="9" height="9" rx="2"/><rect x="460" y="46" width="9" height="9" rx="2"/><rect x="472" y="46" width="9" height="9" rx="2"/><rect x="484" y="46" width="9" height="9" rx="2"/><rect x="496" y="46" width="9" height="9" rx="2"/><rect x="508" y="46" width="9" height="9" rx="2"/><rect x="520" y="46" width="9" height="9" rx="2"/><rect x="532" y="46" width="9" height="9" rx="2"/><rect x="544" y="46" width="9" height="9" rx="2"/>
      <rect x="328" y="58" width="9" height="9" rx="2"/><rect x="340" y="58" width="9" height="9" rx="2"/><rect x="352" y="58" width="9" height="9" rx="2"/><rect x="364" y="58" width="9" height="9" rx="2"/><rect x="376" y="58" width="9" height="9" rx="2"/><rect x="388" y="58" width="9" height="9" rx="2"/><rect x="400" y="58" width="9" height="9" rx="2"/><rect x="412" y="58" width="9" height="9" rx="2"/><rect x="424" y="58" width="9" height="9" rx="2"/><rect x="436" y="58" width="9" height="9" rx="2"/><rect x="448" y="58" width="9" height="9" rx="2"/><rect x="460" y="58" width="9" height="9" rx="2"/><rect x="472" y="58" width="9" height="9" rx="2"/><rect x="484" y="58" width="9" height="9" rx="2"/><rect x="496" y="58" width="9" height="9" rx="2"/><rect x="508" y="58" width="9" height="9" rx="2"/><rect x="520" y="58" width="9" height="9" rx="2"/><rect x="532" y="58" width="9" height="9" rx="2"/><rect x="544" y="58" width="9" height="9" rx="2"/>
      <rect x="328" y="70" width="9" height="9" rx="2"/><rect x="340" y="70" width="9" height="9" rx="2"/><rect x="352" y="70" width="9" height="9" rx="2"/><rect x="364" y="70" width="9" height="9" rx="2"/><rect x="376" y="70" width="9" height="9" rx="2"/><rect x="388" y="70" width="9" height="9" rx="2"/><rect x="400" y="70" width="9" height="9" rx="2"/><rect x="412" y="70" width="9" height="9" rx="2"/><rect x="424" y="70" width="9" height="9" rx="2"/><rect x="436" y="70" width="9" height="9" rx="2"/><rect x="448" y="70" width="9" height="9" rx="2"/><rect x="460" y="70" width="9" height="9" rx="2"/><rect x="472" y="70" width="9" height="9" rx="2"/><rect x="484" y="70" width="9" height="9" rx="2"/><rect x="496" y="70" width="9" height="9" rx="2"/><rect x="508" y="70" width="9" height="9" rx="2"/><rect x="520" y="70" width="9" height="9" rx="2"/><rect x="532" y="70" width="9" height="9" rx="2"/><rect x="544" y="70" width="9" height="9" rx="2"/>
      <rect x="328" y="82" width="9" height="9" rx="2"/><rect x="340" y="82" width="9" height="9" rx="2"/><rect x="352" y="82" width="9" height="9" rx="2"/><rect x="364" y="82" width="9" height="9" rx="2"/><rect x="376" y="82" width="9" height="9" rx="2"/><rect x="388" y="82" width="9" height="9" rx="2"/><rect x="400" y="82" width="9" height="9" rx="2"/><rect x="412" y="82" width="9" height="9" rx="2"/><rect x="424" y="82" width="9" height="9" rx="2"/><rect x="436" y="82" width="9" height="9" rx="2"/><rect x="448" y="82" width="9" height="9" rx="2"/><rect x="460" y="82" width="9" height="9" rx="2"/><rect x="472" y="82" width="9" height="9" rx="2"/><rect x="484" y="82" width="9" height="9" rx="2"/><rect x="496" y="82" width="9" height="9" rx="2"/><rect x="508" y="82" width="9" height="9" rx="2"/><rect x="520" y="82" width="9" height="9" rx="2"/><rect x="532" y="82" width="9" height="9" rx="2"/><rect x="544" y="82" width="9" height="9" rx="2"/>
      <rect x="328" y="94" width="9" height="9" rx="2"/><rect x="340" y="94" width="9" height="9" rx="2"/><rect x="352" y="94" width="9" height="9" rx="2"/><rect x="364" y="94" width="9" height="9" rx="2"/><rect x="376" y="94" width="9" height="9" rx="2"/><rect x="388" y="94" width="9" height="9" rx="2"/><rect x="400" y="94" width="9" height="9" rx="2"/><rect x="412" y="94" width="9" height="9" rx="2"/><rect x="424" y="94" width="9" height="9" rx="2"/><rect x="436" y="94" width="9" height="9" rx="2"/><rect x="448" y="94" width="9" height="9" rx="2"/><rect x="460" y="94" width="9" height="9" rx="2"/><rect x="472" y="94" width="9" height="9" rx="2"/><rect x="484" y="94" width="9" height="9" rx="2"/><rect x="496" y="94" width="9" height="9" rx="2"/><rect x="508" y="94" width="9" height="9" rx="2"/><rect x="520" y="94" width="9" height="9" rx="2"/><rect x="532" y="94" width="9" height="9" rx="2"/><rect x="544" y="94" width="9" height="9" rx="2"/>
    </g>
    <!-- Logical qubit border -->
    <rect x="324" y="42" width="234" height="66" rx="6" fill="none" stroke="#1DA075" stroke-width="1.5" stroke-dasharray="5 3"/>
    <text x="441" y="124" font-size="11" fill="#0F6E56" text-anchor="middle">All working together as one reliable qubit</text>
    <!-- Callout banner -->
    <rect x="60" y="148" width="560" height="52" rx="8" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
    <text x="340" y="170" font-size="13" font-weight="500" fill="#4A1B0C" text-anchor="middle">IBM Condor: 1,000+ physical qubits</text>
    <text x="340" y="188" font-size="12" fill="#633806" text-anchor="middle">With surface code error correction, that is roughly 1 reliable logical qubit for serious computation</text>
    <text x="340" y="222" font-size="12" fill="#888" text-anchor="middle">Every "X-qubit machine" headline needs this context.</text>
  </svg>
</div>`,
 
};

// Blog post content from Bob migration project
export const orchjiragmail = `# Connecting Gmail and Jira to watsonx Orchestrate: A Complete OAuth2 Setup Guide

Orchestrate has hundreds (literally, hundreds) of pre-built agents which completely streamline users' time to production. The only barrier between users and these pre-built agents is actually providing the credentials to connect to them. This step is easy, in theory, but Orchestrate's documentation on how to get the required credentials for its pre-built tools leaves something to be desired.

And because of that, I have put together this blog post which shows you how you can quickly connect several of Orchestrate's Jira and Google agents to your applications. Or, at least, how I was able to get these agents to work.

## Understanding OAuth2 in Orchestrate

Before we dive in, here's the good news: when you use Orchestrate's pre-built connections, you don't need to become an OAuth expert. Orchestrate handles all the annoying parts for you:

- **Token storage** - Your access tokens are automatically stored securely
- **Refresh tokens** - When your token expires, Orchestrate automatically refreshes it without you having to re-authenticate
- **Token management** - All the encryption and secure storage happens in the background

Basically, you authenticate once, and Orchestrate takes care of everything else. No worrying about token expiration, no building refresh logic, no dealing with secure storage. It just works!

## Part 1: Connecting to Gmail

### Step 1: Create a Google Cloud Project

First, head to the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard) and create a new project. Once you are in the dashboard for your new project (pictured below), navigate to "APIs & Services," the first option in the Quick Access section of your dashboard.

![Google Cloud Console dashboard showing the APIs & Services quick access option](/blog/orchjiragmail/image-1.png)

### Step 2: Create and Configure Your Project

Click on **Credentials** in the left sidebar to begin setting up OAuth:

![Credentials page with option to create OAuth client ID](/blog/orchjiragmail/image-4.png)

You'll need to configure the OAuth consent screen first. Select your app's audience - I chose "External":

![Project configuration - choosing an audience for your app (External selected)](/blog/orchjiragmail/image-5.png)


Next, fill in your app information and contact details:

![Next step of project config - contact information with personal email](/blog/orchjiragmail/image-6.png)

Review and agree to Google's user data policy:

![Fourth and final step of making the project - agreeing to Google user data policy, then hit Create](/blog/orchjiragmail/image-7.png)

After completing the project setup, you'll be brought to a summary screen. Click the **"Create OAuth client"** button in the box under Metrics:

![Project summary screen with "Create OAuth client" button highlighted in the Metrics section](/blog/orchjiragmail/image-8.png)

### Step 3: Create OAuth Client ID

**Important:** When using the OAuth2 Authorization Code flow, you must configure the callback URL in your Google Cloud application. The callback URL follows this format:

\`\`\`
<env_url>/mfe_connectors/api/v1/agentic/oauth/_callback
\`\`\`

For example, if your watsonx Orchestrate environment URL is 'https://dl.watson-orchestrate.ibm.com/', your callback URL would be:

\`\`\`
https://dl.watson-orchestrate.ibm.com/mfe_connectors/api/v1/agentic/oauth/_callback
\`\`\`

Now fill out the OAuth client ID creation form:

![OAuth client ID creation form showing application type (Web application), name (Orchestrate), JavaScript origins, and authorized redirect URIs](/blog/orchjiragmail/image-9.png)

- **Application type:** Web application
- **Name:** Orchestrate (or whatever you prefer)
- **Authorized JavaScript origins:** \`https://dl.watson-orchestrate.ibm.com\` (optional, but I added it)
- **Authorized redirect URIs:** Your callback URL from above - **this is critical to get right!**

Click **Create**, and you'll see a success modal displaying your Client ID and Client Secret.

**Save these credentials!** You'll need both the Client ID and Client Secret for the watsonx Orchestrate connection configuration.

### Step 4: Enable Required APIs

Before configuring Orchestrate, you need to enable the necessary Google APIs. Navigate to the [Google Cloud API Library](https://console.cloud.google.com/apis/library) and enable:

![Gmail API in the Google Cloud API Library](/blog/orchjiragmail/image-15.png)

![Google Calendar API in the Google Cloud API Library](/blog/orchjiragmail/image-16.png)

### Step 5: Configure API Scopes in Google Cloud

Return to your OAuth2 client configuration in Google Cloud Console and add the necessary scopes under **Data Access**:

![OAuth consent screen Data Access configuration page](/blog/orchjiragmail/image-14.png)

Click **Add or Remove Scopes** and select the scopes you need:

![Scope selection interface showing available Google API scopes](/blog/orchjiragmail/image-18.png)

For Gmail and Calendar access, add these scopes:
- \`https://mail.google.com\`
- \`https://www.googleapis.com/auth/calendar\`


### Step 6: Configure watsonx Orchestrate Connection

Now that Google Cloud is fully configured, switch to your watsonx Orchestrate environment. Navigate to **Connections** from the hamburger menu:

![Watsonx Orchestrate hamburger menu with Connections option highlighted](/blog/orchjiragmail/image-12.png)

Find the connection named \`google_oauth2_auth_code_ibm_184bdbd3\` (or similar):

![Connections page showing the Google OAuth2 connection entry](/blog/orchjiragmail/image-11.png)

Click on the connection to open the configuration form. You'll need to fill in several fields:

![Google OAuth2 connection configuration form with fields for Client ID, Client Secret, Auth URL, Token URL, and Scopes](/blog/orchjiragmail/image-13.png)
![Visual showing how to input Google API Scopes (Separate with space)](/blog/orchjiragmail/image-19.png)

Enter your credentials and configuration:
- **Client ID:** From the Google Cloud Console
- **Client Secret:** From the Google Cloud Console
- **Auth URL:** \`https://accounts.google.com/o/oauth2/v2/auth\`
- **Token URL:** \`https://oauth2.googleapis.com/token\`
- **Scopes:** \`https://mail.google.com https://www.googleapis.com/auth/calendar\`
- **Base URL:** \`https://www.googleapis.com\`

**A couple important things:**

When entering scopes, separate them with spaces (not commas). I know, it's weird, but that's how Orchestrate wants them.

Also, you might be wondering why we're just using base URLs for the Auth URL and Token URL instead of the full endpoints with all the parameters. Here's the thing: Orchestrate actually constructs the complete OAuth endpoints for you on the backend. It takes these base URLs and automatically appends your Client ID, redirect URI, and all the other necessary parameters.

So as a general rule when setting up OAuth connections in Orchestrate: just use the base endpoint URLs. Don't try to build the full URLs yourself with query parameters and everything. Let Orchestrate handle that part - it'll save you from making mistakes and ensures everything works correctly.

### Step 7: My Mistakes

**Issue #1: Initial Connection Failure**

When I first tried to test the connection, I encountered an error:

![Error message showing OAuth connection failure](/blog/orchjiragmail/image-20.png)

After researching the error, I realized it was because my app was still in "Testing" mode. Since I was the only user anyway, I decided to push the app to production in Google Cloud Console:

![Publishing app to production in Google Cloud Console](/blog/orchjiragmail/image-21.png)

**Issue #2: Google's Security Warning**

When testing the connection again, Google showed a security warning because the app wasn't verified:

![Google security warning screen for unverified app](/blog/orchjiragmail/image-22.png)

Since I'm the developer and this is for personal use, I clicked **"Continue"** to proceed with the authorization.

![Google OAuth permission screen requesting access to Gmail and Calendar](/blog/orchjiragmail/image-23.png)

I granted all requested scopes, and finally—success!

![Successful OAuth connection confirmation in watsonx Orchestrate](/blog/orchjiragmail/image-24.png)

### Step 8: Testing with an Agent

Now let's test the integration! Navigate to the Agent Catalog (hamburger menu > Catalog) and search for "gmail":

![Agent Catalog search results showing Gmail-related agents](/blog/orchjiragmail/image-25.png)

**Issue #3: Missing Base URL**

When I first tried to use the Email and Inbox Management agent, I encountered another error:

![Error message showing KeyError for missing base_url credential](/blog/orchjiragmail/image-26.png)

The error traceback revealed:

\`\`\`python
KeyError: <CredentialKeys.BASE_URL: 'base_url'>
\`\`\`

The solution was to add the Google API base URL to the connection configuration. Go back to your connection settings and add:

![Connection configuration form with base URL field highlighted, showing https://www.googleapis.com](/blog/orchjiragmail/image-27.png)

**Base URL:** \`https://www.googleapis.com\`

After adding the base URL, the agent worked perfectly:

![Successful email retrieval showing inbox messages in the agent response.. Clearly this is my junk email address](/blog/orchjiragmail/image-28.png)

### Step 9: Team vs. Member Credentials

**Important Security Consideration:** I initially configured team credentials, which would give everyone in my organization access to my personal emails. That's definitely not ideal!

![Connection settings showing the option to switch between Team and Member credentials](/blog/orchjiragmail/image-29.png)

I switched to **member credentials**, which requires each user to connect their own Gmail account individually. This ensures proper data privacy and security.

![Testing the Gmail agent with member credentials, showing the personal authentication flow](/blog/orchjiragmail/image-30.png)

With member credentials, each user in your tenant must independently authenticate with their own Gmail account, ensuring that no one has access to anyone else's personal data.

---

## Part 2: Setting Up Jira Integration

### Step 1: Create a Jira OAuth2 App

Head to the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/):

![Atlassian Developer Console homepage showing existing apps and Create button](/blog/orchjiragmail/image-31.png)

Click the **Create** button and select **OAuth 2.0 integration**:

![App creation dialog with OAuth 2.0 integration option highlighted](/blog/orchjiragmail/image-32.png)

### Step 2: Configure Authorization

After creating your app, go to the **Authorization** tab and add your watsonx Orchestrate callback URL. This uses the same format as the Gmail setup:

\`\`\`
https://dl.watson-orchestrate.ibm.com/mfe_connectors/api/v1/agentic/oauth/_callback
\`\`\`

![Authorization tab showing callback URL configuration field](/blog/orchjiragmail/image-33.png)

### Step 3: Add API Scopes

Navigate to the **Permissions** tab and click **Add** to add the Jira API:

![Permissions tab with Add API button to configure Jira scopes](/blog/orchjiragmail/image-34.png)

Click **Configure** next to the Jira API and add the necessary scopes. I used:

- \`write:jira-work\`
- \`read:jira-work\`
- \`read:jira-user\`
- \`manage:jira-project\`
- \`manage:jira-configuration\`

![Jira API scope configuration showing selected permissions](/blog/orchjiragmail/image-35.png)

### Step 4: Get Your Credentials

Go to the **Settings** tab to retrieve your OAuth credentials:

![Settings tab displaying Client ID and Client Secret for the OAuth app](/blog/orchjiragmail/image-36.png)

Copy your **Client ID** and **Client Secret** - you'll need these for the watsonx Orchestrate connection.

### Step 5: Configure watsonx Orchestrate Connection

Return to watsonx Orchestrate's Connections page and find \`jira_oauth2_auth_code_ibm_184bdbd3\` (or similar).

Enter your credentials and configuration:

![Jira OAuth2 connection configuration form in watsonx Orchestrate](/blog/orchjiragmail/image-37.png)

- **Client ID:** From Atlassian Developer Console
- **Client Secret:** From Atlassian Developer Console
- **Auth URL:** \`https://auth.atlassian.com/authorize\`
- **Token URL:** \`https://auth.atlassian.com/oauth/token\`
- **Scopes:** \`write:jira-work read:jira-work read:jira-user manage:jira-project manage:jira-configuration\`

I set this to **member credentials** to ensure each user connects with their own Jira account.

### Step 6: Test the Integration

Navigate to **Discover** from the hamburger menu, search for "jira" and filter by agents. Select the **Issue and Bug Manager** agent.

When you ask the agent a question (like "What projects do I have?"), you'll be prompted to connect:

![Agent response prompting user to connect their Jira account](/blog/orchjiragmail/image-38.png)

Click the connection prompt, and you'll be taken to the Jira authorization screen:

![Atlassian authorization screen requesting permission to access Jira](/blog/orchjiragmail/image-39.png)

After authorizing, the integration works perfectly:

![Successful Jira integration showing project list retrieved by the agent](/blog/orchjiragmail/image-40.png)

---

## Key Takeaways

### For Gmail Integration:
1. **Enable the right APIs** - Don't forget to enable Gmail and Calendar APIs in Google Cloud Console
2. **Add the base URL** - Include \`https://www.googleapis.com\` in your connection configuration
3. **Use member credentials** - Protect user privacy by requiring individual authentication
4. **Push to production** - If you encounter OAuth errors, you may need to publish your app

### For Jira Integration:
1. **Configure scopes carefully** - Make sure you add all necessary Jira scopes
2. **Use the correct callback URL** - Follow the watsonx Orchestrate callback URL format exactly
3. **Test with an agent** - Use the Issue and Bug Manager agent to verify your setup

### General OAuth2 Tips:
- Always use member credentials for personal data access (email, calendar, etc.)
- Double-check your callback URLs - they must match exactly
- Keep your Client ID and Client Secret secure
- Test your integration thoroughly before rolling out to your team

Both integrations are now working smoothly, allowing watsonx Orchestrate agents to interact with Gmail and Jira on behalf of authenticated users. The key is patience, attention to detail, and understanding the OAuth2 flow.

---
`;
export const blogContent = `# Rebuilding My Game in React: A 4-Hour Migration with IBM Bob

I had a working escape room game built as a single 257-line HTML file. It worked, but it was unmaintainable. The original code itself could not have scaled to where it is at today. I needed to migrate it to React + TypeScript.

Using Bob (IBM's AI coding assistant), I completed the migration, added several new features, and improved the user interface in ~4 hours. The game evolved from a single-level experience with less than 30 seconds of gameplay to a multi-level, incremental progression system with an introductory tutorial. Without Bob? This would've taken weeks.

This isn't a tutorial on React migration—it's a guide to **using Bob effectively**. Here's what I learned about Bob's features, what mistakes I made, and how you can avoid them.

![Before: Single HTML file](/blog/bob-migration/structure-before.png)
![After: Organized React structure](/blog/bob-migration/structure-after.png)

## Step 1: Configure Bob Before You Start (The Secret Weapon)

**This is the most important step.** Most people skip configuration and wonder why Bob generates inconsistent code. Don't be that person.

Before writing any code, I created a .bob/rules directory with three markdown files. Bob reads these files and follows them throughout your project.

### How .bob/rules Works

\`\`\`
myProject/
├── .bob/
│   ├── rules/              # Workspace-wide rules (all modes)
│   │   ├── 01-general.md   # Bob's role & priorities
│   │   ├── 02-ask.md       # What to do in ask mode
│   │   └── 03-code.md      # Code standards
│   └── rules-code/         # Code mode-specific rules (optional)
└── ... (other project files)
\`\`\`
**Key points:**
- Files load alphabetically (use 01-, 02- prefixes)
- Mode-specific rules override workspace rules
- Version-controllable (your whole team gets the same Bob behavior)

![Screenshot showing structure of markdown files in .bob/rules](/blog/bob-migration/bobRules.png)

### My Configuration

**01-general.md** - Defined Bob as a senior frontend engineer focused on:
- Clean, maintainable code
- Accessibility (WCAG 2.1 AA)
- Reusable components

**02-ask.md** - Told Bob to ask before implementing:
- Clarify vague requirements
- Propose scalable architecture
- Surface accessibility issues early

**03-code.md** - Set code standards. Example snippet from 03-code.md:
\`\`\`markdown
### 1. Reusable Components Are Mandatory

- Always abstract reusable UI patterns into their own files.
- Any UI element that could reasonably be reused must live in a dedicated /components directory.
- Do NOT inline large UI blocks directly inside pages or feature files.
- Prefer small, composable components over monolithic files.

Examples of reusable components:
- Buttons
- Cards
- Modals
- Form fields
- Layout wrappers
- Sections
- Navigation elements
- Reusable content blocks
\`\`\`

**Result:** Bob generated consistent, production-ready code from day one. No refactoring needed.

**Important Note:** In my setup, I put all three files in .bob/rules/, which means they apply to ALL modes. For more precise control, you can use mode-specific folders:
- .bob/rules-ask/ for Ask mode only
- .bob/rules-code/ for Code mode only
- .bob/rules-plan/ for Plan mode only

Mode-specific rules override general rules, giving you fine-grained control over Bob's behavior in different contexts.

**Pro Tip:** You can also create global rules at ~/.bob/rules/ that apply to all your projects.

## Step 2: Use Plan Mode First (Architecture Before Code)

**Bob has different modes.** Most people jump straight to Code mode. That's a mistake.

I started in **Plan Mode**, which is designed for architecture work. It gives Bob read access and markdown editing but prevents code changes. This forces you to think through the architecture before writing a single line.

![Screenshot of Bob in Plan Mode](/blog/bob-migration/bob-modes.png)

I asked: "Create a migration plan for this HTML file to React + TypeScript."

Bob generated an 8-phase plan with Mermaid diagrams showing component hierarchy and state flow. The plan prevented scope creep and gave me a clear roadmap.
![Example of Bob's diagram](/blog/bob-migration/bob-diagram.png)
**Key insight:** No major architectural decisions needed revision during implementation because we planned first.

**Bob's Modes:**
- **Plan Mode:** Architecture and strategy (use this first!)
- **Ask Mode:** Clarification and questions
- **Code Mode:** Implementation
- **Advanced Mode:** Complex features with MCP tools

## Step 3: Bob's Hidden Features (That I Wish I'd Known)

### Enhance Prompt (Star Icon)

I made a vague request: "Modernize the UI."

Bob gave me generic results. My fault—vague input = vague output.

**Then I discovered the Enhance Prompt feature** (Star icon). It transforms vague requests into specific ones:

![Input before using the Enhance Prompt Feature](/blog/bob-migration/enhance.png)

**Input:** 
\`\`\`bash
"Modernize the UI"
\`\`\`

**Enhanced Output:**
\`\`\`bash
Create a modern, visually appealing UI design for a blog post page displaying technical content about migrating HTML to React using Bob AI. The design should include:

1. A clean, contemporary layout with proper typography hierarchy for markdown content including headings (h1-h3), paragraphs, code blocks, and lists
2. Syntax-highlighted code blocks with a dark theme and proper formatting for file paths, directory structures, and code snippets
3. Visual distinction for special elements like "Pro Tips", "Important Notes", and "Results" sections using cards or callout boxes
4. Responsive design that works seamlessly on desktop, tablet, and mobile devices
5. Modern color scheme with good contrast ratios for accessibility
6. Smooth scrolling and subtle animations for interactive elements
7. Professional spacing and padding throughout to improve readability
8. Support for inline code formatting that stands out from regular text
9. Clear visual separation between different sections of the blog post
10. Modern font choices optimized for technical content readability (consider using a sans-serif for body text and a monospace font for code)
11. Hover states and interactive feedback for any clickable elements
12. A cohesive design system with consistent colors, spacing, and component styles throughout

The UI should feel modern and professional while maintaining excellent readability for technical documentation and code examples.
\`\`\`

**Lesson:** Use the Star icon when you're not sure how to phrase something. It saves time and produces better results.

### Context Mentions (@ Feature)

**My biggest mistake:** Bob generated SASS code using wrong variable names ($primary instead of $color-primary). Build failed. I spent an hour fixing it manually.

**What I could have done:** Context mentions.

![Screenshot demonstrating the @ context mention feature](/blog/bob-migration/context.png)

If I had typed @/src/styles/_variables.scss in my prompt, Bob would have read the file and used the correct variable names.

**What you can mention with @:**

1. **Files** - @/path/to/file.ts
   - Bob reads the file and uses exact naming conventions
   - Perfect for referencing config files, types, or existing components

2. **Folders** - @/path/to/folder
   - Bob gets context about the entire directory structure
   - Useful for understanding project organization

3. **Problems** - @problems
   - Bob sees all current errors and warnings in your workspace
   - Helps Bob fix issues without you copying error messages

4. **Terminal Output** - @terminal
   - Bob reads your terminal history
   - Great for debugging build errors or test failures

5. **Git Commits** - @a1b2c3d (commit hash)
   - Bob analyzes specific commits
   - Useful for understanding what changed and why

6. **Git Changes** - @git-changes
   - Bob sees your unstaged/staged changes
   - Perfect for code reviews or commit message generation

7. **URLs** - @https://example.com
   - Bob fetches and reads web content
   - Useful for referencing documentation or API specs

**Pro tip:** You can combine multiple mentions in one prompt:

@/src/components/Button.tsx @/src/styles/_variables.scss
Update the Button component to use our design system colors


**Lesson:** Always use @ to give Bob context. It's the difference between generic code and code that fits perfectly into your existing codebase.

### Checkpoints (Undo Button)

When I saw TypeScript errors after Bob created files, I panicked and started giving Bob "fix" instructions.

**Wrong move.** The errors were just missing dependencies (npm install fixed them). My "fixes" would have broken working code.

**What I should have done:** Use Bob's automatic checkpoints.

![Screenshot showing the checkpoint feature](/blog/bob-migration/checkpoint.png)

Bob creates checkpoints during tasks. Click "Restore Files and Task" to undo changes. It's like Git, but for AI conversations.

**Lesson:** When you see errors, pause. Check if it's an environmental issue before asking Bob to "fix" it.

## Step 4: Features I Didn't Use (But You Should)

After finishing, I read Bob's documentation and facepalmed. Here are powerful features I missed:

### 1. Code Reviews (/review)
Type /review before committing. Bob analyzes your changes and catches issues.

![Screenshot showing /review command](/blog/bob-migration/review.png)

### 2. Commit Message Generation
Click the ✨ icon in Source Control. Bob writes your commit message from staged changes.

![Screenshot of commit message generation](/blog/bob-migration/commit-message.png)

### 3. Bob Tips
Bob proactively suggests refactorings as you work. 
![Screenshot showing "Bob Tips"](/blog/bob-migration/bob-tip.png)
### 4. Literate Coding
Write natural language instructions in your code (they appear blue). Press Cmd+Enter and Bob converts them to implementation.

![To enable literate coding with Bob, click the icon I have indicated with the green square. In natural language, write a description of the new feature you'd like to add to your codebase. When you are ready, click the "generate" button at the bottom of your code editor](/blog/bob-migration/literate.png)
![Bob will convert your description into code. Review the changes and click "Accept All" to confirm.](/blog/bob-migration/literate2.png)

**This feature is great for building features where describing what you need is faster than coding it from scratch.**

## The Results

**Before:** 257 lines in one HTML file  
**After:** Professionally structured codebase with 40+ modular components  
**Time:** ~4 hours (would've been weeks without Bob)

The app now has:
- Clean React + TypeScript architecture
- WCAG 2.1 AA accessibility
- Multi-level progression system
- Interactive graph visualization
- Tutorial system
- Production-ready code

![Screenshot of final application](/blog/bob-migration/after.png)

[You can view the original repository as well as Bob's updated version here](https://github.com/shrncr/NP-Complete-Escape-Room)
![the main branch contains the original HTML/CSS/JS based repository. Bob-Version branch contains Bob's updated code. Feel free to explore!](/blog/bob-migration/github.jpeg)
## Key Takeaways

### Do This:
1. **Configure .bob/rules first** - Define Bob's behavior before writing code
2. **Start with Plan Mode** - Architecture before implementation
3. **Use @ for context** - Reference existing files in your prompts
4. **Be specific** - Use Enhance Prompt (✨) if you're not sure how to phrase something
5. **Use checkpoints** - Don't panic-fix errors; restore and reassess

### Don't Do This:
1. Skip configuration (you'll get inconsistent code)
2. Jump straight to Code mode (you'll make architectural mistakes)
3. Make vague requests (you'll get generic results)
4. Ignore environmental errors (npm install before asking Bob to "fix" things)
5. Forget to review generated code (Bob is good, not perfect)

## Your Turn

Want to try Bob on your next project? Here's your starter checklist:

**Before coding:**
- [ ] Create .bob/rules/ directory
- [ ] Write 01-general.md (Bob's role and priorities)
- [ ] Write 02-ask.md (when to ask questions)
- [ ] Write 03-code.md (code standards)

**During development:**
- [ ] Start in Plan Mode for architecture
- [ ] Use @ to reference existing files
- [ ] Use ✨ Enhance Prompt for vague ideas
- [ ] Check checkpoints before "fixing" errors
- [ ] Run /review before commits

**After coding:**
- [ ] Let Bob generate commit messages
- [ ] Review all generated code
- [ ] Test thoroughly

Bob isn't magic—it's a tool. But configured properly and used effectively, it's an incredibly powerful partner for building production-quality software.

**Time saved on this project:** Several weeks
**Time invested learning Bob:** Worth every minute

Try it on your next migration. You'll be surprised how much faster you move.

---
`;