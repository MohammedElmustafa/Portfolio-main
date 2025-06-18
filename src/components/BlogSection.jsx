"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { useGlobalContext } from "@/context/Index";

const BlogSection = () => {
  const { blogAllData } = useGlobalContext()
  return (
    <div className='w-full px-40 max-[890px]:px-[50px] max-[480px]:px-[20px] '>
      <div className=' text-center py-16 max-[480px]:py-0'>
        <h1 className='text-[44px] font-[600] max-[480px]:text-[32px]'>
          {`Today's`} <span className='text-[#755BB4]'>Blog</span>
        </h1>
        <br/>
        <div className='w-full mt-10 grid grid-cols-3 gap-4 max-[480px]:grid-cols-1'>
          {Array.isArray(blogAllData) && blogAllData.slice(0, 3).map(item => {
            return <BlogCard key={item._id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
