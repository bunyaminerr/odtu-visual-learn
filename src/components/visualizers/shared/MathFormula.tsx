"use client";

import React, { Component, ReactNode } from "react";
import { BlockMath, InlineMath } from "react-katex";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class MathErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <span className="text-red-500">[Math Error]</span>;
        }
        return this.props.children;
    }
}

interface MathFormulaProps {
    math: string;
    block?: boolean;
    className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ math, block = false, className = "" }) => {
    return (
        <div className={`math-formula ${className}`}>
            <MathErrorBoundary>
                {block ? <BlockMath math={math} /> : <InlineMath math={math} />}
            </MathErrorBoundary>
        </div>
    );
};
