"use client";
import AdminExperienceCard from "@/components/AdminExperienceCard";
import { useGlobalContext } from "@/context/Index";
import React from "react";

const Page = () => {
  const { experienceAllData, setExperienceAllData } = useGlobalContext();
  return (
    <div className="w-full h-full overflow-y-scroll">
      <h1 className="text-[#755BB4] text-[24px] font-[600] mb-3">
        All Experiences
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-4 max-[480px]:grid-cols-1 max-[890px]:grid-cols-2">
        {Array.isArray(experienceAllData) &&
          experienceAllData.map((experience) => (
            <AdminExperienceCard
              experience={experience}
              key={experience._id}
              data={experienceAllData}
              setData={setExperienceAllData}
            />
          ))}
      </div>
    </div>
  );
};
export default Page;