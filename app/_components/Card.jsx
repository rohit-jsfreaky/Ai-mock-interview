import { BriefcaseIcon, ChartBar, Mic } from "lucide-react";


const Card = ({ title, desc, iconName }) => {
  return (
    <div className=" w-[90vw] md:w-[25vw] shadow-xl flex justify-center flex-col items-center py-6 px-4 rounded-xl gap-2">
      <div className="self-start">
        {iconName === "briefcase" ? (
          <BriefcaseIcon size={"30px"}/>
        ) : iconName === "mic" ? (
          <Mic size={"30px"}/>
        ) : iconName === "chart" ? (
          <ChartBar size={"30px"} />
        ) : null}
      </div>

      <div>
        <h1 className="font-bold text-lg md:text-2xl">{title}</h1>
      </div>

      <div>
        <p className="text-gray-400 text-center text-sm md:text-base font-semibold">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
