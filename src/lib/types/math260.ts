export type Math260TopicSlug = 
    | "parametric-systems" 
    | "inverses-elementary" 
    | "homogeneous-systems" 
    | "linear-independence" 
    | "matrix-equations";

export type Math260TopicName = 
    | "Parametric Linear Systems & RREF"
    | "Matrix Inverses & Elementary Matrices"
    | "Homogeneous Systems & Free Variables"
    | "Linear Independence & Span"
    | "Matrix Equations & Invertibility Theorems";

export interface Math260StepByStepSolution {
    stepNumber: number;
    operation: string;
    explanation: string;
    resultingMatrix?: string;
}

export interface Math260Question {
    id: string;
    sourceExam: string;
    topic: Math260TopicName;
    topicSlug: Math260TopicSlug;
    questionText: string;
    latexFormula?: string;
    subParts?: string[];
    initialMatrix: number[][];
    canVisualize: boolean;
    stepByStepSolution: Math260StepByStepSolution[];
}
