"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/Schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExprience, setJobExperience] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const inputPrompt = `Job Position : ${jobPosition} , Job Description : ${jobDesc} , Years of experience : ${jobExprience} . Depends on this information please give me
    ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview question with answers in JSON format . JSON format should be like {{question : "", answer: ""},{question : "", answer: ""}}`;

    const result = await chatSession.sendMessage(inputPrompt);

    console.log(JSON.parse(result.response.text()));
    setJsonResponse(result.response.text());
   
    
    if (result.response.text()) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResponse: result.response.text(),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExprience,
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });
        console.log("Inserted Id: ", response);

        if(response){
          setOpenDialog(false)
          router.push("/dashboard/interview/"+response[0]?.mockId)
        }
    }else{
      console.log("error")
    }

   
    setIsLoading(false);
  };

  return (
    <div>
      <div
        onClick={() => {
          setOpenDialog(true);
        }}
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role , Job Description
                    and the year of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label htmlFor="">Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full stack developer"
                      required
                      onChange={(e) => {
                        setJobPosition(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label htmlFor="">
                      Job Description/Tech Stack(in short)
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular , Nodejs, Express etc."
                      required
                      onChange={(e) => {
                        setJobDesc(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-7 my-3">
                    <label htmlFor="">Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      onChange={(e) => {
                        setJobExperience(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setOpenDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from ai
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
