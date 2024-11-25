"use client";

import React from "react";
import Header from "./dashboard/_components/Header";
import Card from './_components/Card'
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  LogIn,
  PackageIcon,
  RedoDotIcon,
  Youtube,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  const handleSign = () => {
    console.log(isSignedIn);
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col justify-center items-center gap-5 pt-16 md:pt-32 px-4">
        <div>
          <h1 className="text-3xl md:text-6xl font-bold text-center">
            Practice Your Interview{" "}
            <span className="text-primary">With AI</span>
          </h1>
        </div>
        <div>
          <h3 className="text-gray-400 font-bold text-base md:text-lg mb-4 text-center">
            Prepare, Practice, and Succeed with Our AI-Driven Mock Interview
            Platform!
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Button onClick={handleStarted}>
            Get Started <ArrowRight />
          </Button>
          {!isSignedIn && (
            <Button onClick={handleSign} variant="outline">
              Login/Register <LogIn />
            </Button>
          )}
        </div>

        <div className="text-base md:text-lg text-gray-400 font-semibold mb-6 text-center">
          <h3>FEATURED IN</h3>
        </div>

        <div className="flex flex-wrap justify-center text-gray-500 font-bold text-lg md:text-2xl items-center gap-10 md:gap-20">
          <h1 className="flex items-center gap-1">
            <span>
              <Youtube size={"30px"} />
            </span>
            YouTube
          </h1>
          <h1 className="flex items-center gap-1">
            <PackageIcon size={"30px"} /> Product Hunt
          </h1>
          <h1 className="flex items-center gap-1">
            <RedoDotIcon size={"30px"} /> reddit
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-4">

      <div className="mt-16 md:mt-20 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold">How it Works?</h1>
        </div>

        <div>
          <p className="text-gray-400 font-bold text-sm md:text-md text-center">
          Practice Your Interview in Just 3 Simple Steps
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6 mb-10">
          <Card
            title="Define Your Role"
            desc="Begin your journey by selecting the job position you're aiming for, providing a brief description, and specifying your years of experience. This step helps us tailor the interview questions to match your career goals and expertise, ensuring a realistic and relevant mock interview experience."
            iconName="briefcase"
          />
          <Card
            title="Practice with AI"
            desc="Answer expertly curated interview questions designed specifically for your chosen role. Record your responses in real-time and simulate the pressure of an actual interview, all with the guidance of AI to help you put your best foot forward."
            iconName="mic"
          />
          <Card
            title="Get Insightful Feedback"
            desc="Receive detailed, AI-driven feedback on your responses, including strengths, areas for improvement, and tips to enhance your performance. Gain actionable insights to boost your confidence and refine your interview skills for success."
            iconName="chart"
          />
        </div>


      </div>
    </div>
  );
};

export default Home;
