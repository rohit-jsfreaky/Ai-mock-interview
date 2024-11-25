import { Button } from "@/components/ui/button";
import { LucideWebcam, Mic, Pause } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnsSection = ({mockInterviewQuestion,activeQuestionIndex,interviewData,loading,setLoading}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const {user}= useUser();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const saveUserAnswer =async ()=>{

    
    if(listening){
      setLoading(true)
      SpeechRecognition.stopListening();
      if(transcript?.length<10){
        setLoading(false)
        toast("Error while saving your answer please record again");
        return ;
      }
 
      const feedbackPrompt = `Question : ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer : ${transcript} , Depends on Question and user answer for given interview question please give me us rating for answer and feedback as area of improvement if any is just 3 to 5 lines to improve it in JSON format with rating feild and feeback feild like {{rating:"",feedback:""}}`

      const result = await chatSession.sendMessage(feedbackPrompt)

      const mockJsonResponse = result.response.text();

      console.log(mockJsonResponse)

      const JsonFeedbackResponse = JSON.parse(mockJsonResponse)


      const resp = await db.insert(UserAnswer).values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAnswer:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAnswer:transcript,
        feebback:JsonFeedbackResponse.feedback,
        rating:JsonFeedbackResponse.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format("DD-MM-yyyy")
      })

      if(resp){
        
        toast("User Answer Recorded Successfully");
      }

      setLoading(false)
    }else{
      SpeechRecognition.startListening({continuous:true});
    }
  }
  

  return (
    <div className="flex items-center justify-center flex-col ">
      
      
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <LucideWebcam width={200} height={200} className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10" 
      disabled={loading}
      onClick={saveUserAnswer}
      >
        {
          listening ? <h2 className="text-red-500 flex items-center justify-center gap-2">
            <Pause/> Stop Recording
          </h2> : <h2 className="text-blue-500 flex gap-2 items-center justify-center">
            <Mic/>Record Answer
          </h2>
        }
      </Button>

    

    </div>
  );
};

export default RecordAnsSection;
