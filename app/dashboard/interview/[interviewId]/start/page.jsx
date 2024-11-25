"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/Schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  const [loading,setLoading] = useState(false);

  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResponse = JSON.parse(result[0].jsonMockResponse);
    console.log(jsonMockResponse);
    setMockInterviewQuestion(jsonMockResponse);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* question */}
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
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

        {
          activeQuestionIndex>0&& <Button
          onClick={()=>{
            setActiveQuestionIndex(activeQuestionIndex-1)
          }}
          disabled={loading}
          >Previous Question</Button>
        }
       
       {
       activeQuestionIndex!=mockInterviewQuestion?.length-1&&  <Button onClick={()=>{
        setActiveQuestionIndex(activeQuestionIndex+1)
       }}
       disabled={loading}
       >Next Question</Button>
       }
        

        {
          activeQuestionIndex==mockInterviewQuestion?.length-1&&  <Link
          href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
          
          >
           <Button disabled={loading}>End Interview</Button>
          </Link>
        }
      
      </div>
    </div>
  );
};

export default StartInterview;
