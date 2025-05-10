"use client";

import * as React from 'react';
import Header from '@/components/quranic-guide/Header';
import QuestionForm from '@/components/quranic-guide/QuestionForm';
import AnswerCard from '@/components/quranic-guide/AnswerCard';
import { answerQuestion, type AnswerQuestionOutput } from '@/ai/flows/answer-questions';
import { useToast } from "@/hooks/use-toast";

export default function QuranicGuidePage() {
  const [currentQuestion, setCurrentQuestion] = React.useState<string | null>(null);
  const [aiResponse, setAiResponse] = React.useState<AnswerQuestionOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setError(null);
    setAiResponse(null); 
    setCurrentQuestion(question);

    try {
      const response = await answerQuestion({ question });
      setAiResponse(response);
    } catch (e) {
      console.error("Error fetching AI response:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(`Failed to get an answer. ${errorMessage}`);
      toast({
        title: "Error",
        description: `Could not retrieve an answer: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-8">
          <QuestionForm onSubmit={handleQuestionSubmit} isLoading={isLoading} />
          <AnswerCard
            question={currentQuestion}
            answer={aiResponse?.answer ?? null}
            disclaimer={aiResponse?.disclaimer ?? null}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t border-border">
        <p>&copy; {new Date().getFullYear()} Quranic Guide. All interpretations are for educational purposes.</p>
        <p>Consult with qualified scholars for definitive religious rulings.</p>
      </footer>
    </div>
  );
}
