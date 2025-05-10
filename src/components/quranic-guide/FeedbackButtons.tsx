"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackButtonsProps {
  // onFeedback: (feedback: 'like' | 'dislike') => void; // Placeholder for actual feedback submission logic
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = () => {
  const [feedbackGiven, setFeedbackGiven] = React.useState<'like' | 'dislike' | null>(null);
  const { toast } = useToast();

  const handleFeedback = (feedback: 'like' | 'dislike') => {
    setFeedbackGiven(feedback);
    // onFeedback(feedback); // Call this if actual submission is needed
    toast({
      title: "Feedback Received",
      description: `Thank you for your ${feedback === 'like' ? 'positive' : 'constructive'} feedback!`,
      duration: 3000,
    });
  };

  return (
    <div className="flex space-x-2 mt-4">
      <Button
        variant={feedbackGiven === 'like' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleFeedback('like')}
        disabled={feedbackGiven !== null}
        aria-label="Like this answer"
      >
        <ThumbsUp className="mr-2 h-4 w-4" /> Helpful
      </Button>
      <Button
        variant={feedbackGiven === 'dislike' ? 'destructive' : 'outline'}
        size="sm"
        onClick={() => handleFeedback('dislike')}
        disabled={feedbackGiven !== null}
        aria-label="Dislike this answer"
      >
        <ThumbsDown className="mr-2 h-4 w-4" /> Not Helpful
      </Button>
    </div>
  );
};

export default FeedbackButtons;
