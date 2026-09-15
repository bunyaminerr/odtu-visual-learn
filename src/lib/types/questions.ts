export type CourseCode = "CNG213" | "MATH260" | "CNG232" | "CNG223";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Exam Standard";
export type ExamType = "Quiz" | "Midterm 1" | "Midterm 2" | "Final";

export interface QuestionHint {
    step: number;
    text: string;
    latexMath?: string;
}

export interface Question {
    id: string;
    title?: string;
    courseCode: CourseCode;
    topic: string;
    difficulty: Difficulty;
    examType: ExamType;
    sourceExam?: string;
    questionText: string;
    subQuestions?: string[];
    latexMath?: string;
    initialState: any; // Type depends on the visualizer (e.g. matrix array, minterm array)
    canVisualize?: boolean;
    visualizerType: string; // E.g., 'matrix', 'kmap', 'linkedlist', 'hasse', 'recurrence'
    visualizerUrl: string; // The URL to route to
    stepByStepSolution?: string[];
    hints: QuestionHint[] | string[];
}
