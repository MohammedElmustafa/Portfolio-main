"use client"
import React from "react";
import BlogCard from "@/components/BlogCard";
import { useGlobalContext } from "@/context/Index";

const Page = () => {
  const { blogAllData } = useGlobalContext()
  return (
    <>
      <section className='w-full h-full'>
        <div className='w-full px-40 max-[480px]:px-[20px] max-[890px]:px-20'>
          <div className=' text-center py-16'>
            <h1 className='text-[44px] font-[600] max-[480px]:text-[32px]'>
              {`Today's`} <span className='text-[#755BB4]'>Blog</span>
            </h1>
            <br/>
            <div className='w-full grid grid-cols-3 gap-4 max-[480px]:grid-cols-1 mt-4'>
              {Array.isArray(blogAllData) &&
                blogAllData.map((item) => {
                  return <BlogCard key={item._id} item={item} />;
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
