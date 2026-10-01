import { PosetRelation, HasseNode, HasseEdge } from "../types/discrete";

export const generateHasseDiagram = (poset: PosetRelation): { nodes: HasseNode[], edges: HasseEdge[] } => {
    const { elements, pairs } = poset;
    
    // 1. Refleksifleri (a,a) çıkar
    let reducedPairs = pairs.filter(([a, b]) => a !== b);
    
    // 2. Transitif indirgeme (Transitive Reduction)
    // Eğer a->b ve b->c varsa, a->c'yi sil.
    const hasPath = (start: string, end: string, edgeList: [string, string][]): boolean => {
        const visited = new Set<string>();
        const queue = [start];
        while (queue.length > 0) {
            const curr = queue.shift()!;
            if (curr === end) return true;
            if (!visited.has(curr)) {
                visited.add(curr);
                for (const [u, v] of edgeList) {
                    if (u === curr) queue.push(v);
                }
            }
        }
        return false;
    };

    const finalEdges: [string, string][] = [];
    
    for (const [a, c] of reducedPairs) {
        // (a, c) kenarını çıkarıp, a'dan c'ye GİDEN alternatif bir yol var mı bakıyoruz.
        const otherEdges = reducedPairs.filter(p => !(p[0] === a && p[1] === c));
        if (!hasPath(a, c, otherEdges)) {
            finalEdges.push([a, c]);
        }
    }

    // 3. Topolojik Seviyelendirme (Yükseklik atama)
    // Minimal elemanların seviyesi 0
    const levels: Record<string, number> = {};
    elements.forEach(e => levels[e] = 0);

    let changed = true;
    while (changed) {
        changed = false;
        for (const [u, v] of finalEdges) {
            if (levels[v] <= levels[u]) {
                levels[v] = levels[u] + 1;
                changed = true;
            }
        }
    }

    const nodes: HasseNode[] = elements.map(e => ({
        id: e,
        label: e,
        level: levels[e]
    }));

    const edges: HasseEdge[] = finalEdges.map(([u, v]) => ({
        source: u,
        target: v
    }));

    return { nodes, edges };
};

// Preset Oluşturucular
export const generateDivisorsPoset = (n: number): PosetRelation => {
    const elements: number[] = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) elements.push(i);
    }
    
    const pairs: [string, string][] = [];
    for (const a of elements) {
        for (const b of elements) {
            if (b % a === 0) pairs.push([a.toString(), b.toString()]);
        }
    }
    
    return {
        elements: elements.map(String),
        pairs
    };
};
