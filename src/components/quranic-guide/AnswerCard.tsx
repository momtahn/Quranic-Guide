"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FeedbackButtons from "./FeedbackButtons";
import { Info, Loader2 } from "lucide-react";

interface AnswerCardProps {
  question: string | null;
  answer: string | null;
  disclaimer: string | null;
  isLoading: boolean;
  error: string | null;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ question, answer, disclaimer, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg mt-8 animate-pulse">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
            Seeking Wisdom...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!answer && !question) {
    return null; // Don't render anything if there's no interaction yet
  }
  
  if (!answer && question && !isLoading && !error) {
     // This case should ideally be handled by the loading state,
     // but as a fallback if the AI returns empty without error.
    return (
      <Card className="w-full shadow-lg mt-8">
        <CardHeader>
           <CardTitle className="text-2xl">Response to: "{question}"</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No answer was provided for this question.</p>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="w-full shadow-lg mt-8">
      <CardHeader>
        {question && <p className="text-sm text-muted-foreground mb-2">Regarding your question: "{question}"</p>}
        <CardTitle className="text-2xl text-primary">Guidance from the Teachings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-base leading-relaxed whitespace-pre-wrap">
          {answer}
        </div>
        {disclaimer && (
          <Alert className="bg-accent/20 border-accent/50">
            <Info className="h-5 w-5 text-accent" />
            <AlertTitle className="text-accent-foreground font-semibold">Important Disclaimer</AlertTitle>
            <AlertDescription className="text-accent-foreground/90">
              {disclaimer}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-muted-foreground mb-2">Was this answer helpful?</p>
        <FeedbackButtons />
      </CardFooter>
    </Card>
  );
};

export default AnswerCard;
