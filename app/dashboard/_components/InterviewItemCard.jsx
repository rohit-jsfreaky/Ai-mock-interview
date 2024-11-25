import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";


const InterviewItemCard = ({ interview }) => {

    const router = useRouter();

    const onStart = ()=>{

        console.log("going to start")
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }

    const onFeedback = ()=>{
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">
        {interview?.jobPosition.charAt(0).toUpperCase() +
          interview?.jobPosition.slice(1)}
      </h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years Of Experience
      </h2>

      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>

      <div className="flex justify-between my-2 mt-2 gap-5">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
