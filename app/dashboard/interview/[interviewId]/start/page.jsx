"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/Schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  const [loading, setLoading] = useState(false);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      GetInterviewDetails();
    }
  }, [isLoaded]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (result.length <= 0) {
      toast.error("Error while fetchin the data");
      return router.replace("/dashboard");
    }

    if (result[0].createdBy != user?.primaryEmailAddress?.emailAddress) {
      toast.error("Something went wrong");
      return router.replace("/dashboard");
    }

    console.log(result[0].createdBy);


    const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);

    setMockInterviewQuestion(jsonMockResponse);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* question */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording */}

        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex - 1);
            }}
            disabled={loading}
          >
            Previous Question
          </Button>
        )}

        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex + 1);
            }}
            disabled={loading}
          >
            Next Question
          </Button>
        )}

        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button disabled={loading}>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
