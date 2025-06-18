import EditExperience from "@/components/Editexperience";
import React from "react";

const Page = ({ params }) => {
  const experienceId = params.id;
  return (
    <div className="w-full h-full overflow-y-scroll">
      <h1 className="text-[#755BB4] text-[24px] font-[600] mb-3">
        Edit Experience
      </h1>
      <EditExperience experienceId={experienceId} />
    </div>
  );
};

export default Page;
