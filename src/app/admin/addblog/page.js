import React from "react";
import dynamic from "next/dynamic";

const DynamicAddBlog = dynamic(async () => import("@/components/AddBlog"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Page = () => {
  return (
    <div className='w-full h-full overflow-y-scroll'>
      <h1 className='text-[#755BB4] text-[24px] font-[600] mb-3'>
        Add Blog
      </h1>
      <DynamicAddBlog />
    </div>
  );
};
export default Page;