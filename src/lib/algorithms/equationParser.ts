export function parseSystemOfEquations(input: string): { matrix: string[][], variables: string[], error?: string } {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return { matrix: [], variables: [], error: "Sistem boş olamaz." };

    try {
        const varSet = new Set<string>();
        const parsedLines = lines.map(line => {
            const parts = line.split('=');
            if (parts.length !== 2) throw new Error(`Denklemde tam olarak bir tane '=' olmalıdır: ${line}`);
            
            let lhs = parts[0].replace(/\s+/g, '');
            let rhs = parts[1].replace(/\s+/g, '');
            
            if (lhs.length > 0 && lhs[0] !== '+' && lhs[0] !== '-') lhs = '+' + lhs;
            
            const terms: Record<string, number> = {};
            let constant = parseFloat(rhs);
            if (isNaN(constant)) throw new Error(`Eşitliğin sağ tarafı geçerli bir sayı olmalıdır: ${rhs}`);

            // Regex to find terms like +2x, -y, +3.5z, -0.5x1
            const termRegex = /([+-])(\d*\.?\d*)([a-zA-Z]\w*)?/g;
            let match;
            
            while ((match = termRegex.exec(lhs)) !== null) {
                const sign = match[1] === '-' ? -1 : 1;
                let coeffStr = match[2];
                let variable = match[3] ? match[3].toLowerCase() : undefined;
                
                if (variable) {
                    let coeff = coeffStr === '' ? 1 : parseFloat(coeffStr);
                    coeff *= sign;
                    varSet.add(variable);
                    terms[variable] = (terms[variable] || 0) + coeff;
                } else {
                    let coeff = coeffStr === '' ? 0 : parseFloat(coeffStr);
                    constant -= (coeff * sign); // Move constant to RHS
                }
            }
            return { terms, constant };
        });

        // ODTÜ typically expects x, y, z or x1, x2, x3. We sort them alphabetically.
        const variables = Array.from(varSet).sort();
        const matrix: string[][] = [];

        for (const eq of parsedLines) {
            const row: string[] = [];
            for (const v of variables) {
                row.push((eq.terms[v] || 0).toString());
            }
            row.push(eq.constant.toString()); // Augmented column
            matrix.push(row);
        }

        return { matrix, variables };
    } catch (e: any) {
        return { matrix: [], variables: [], error: e.message };
    }
}
