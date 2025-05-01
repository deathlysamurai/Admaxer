export interface Template {
    id: string;
    category: string;
    title: string;
    message: string;
    icon: string;
}

export interface Question {
    id: string;
    question: string;
    answer: string;
    options: string[];
}