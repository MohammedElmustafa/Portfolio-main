'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetSingleProject } from "@/hooks";

const Page = ({ params }) => {
  const { data, error, loading } = useGetSingleProject(params.id);
  if (loading) return <div className='w-full py-16 px-40'>Loading...</div>;
  if (error) return <div className='w-full py-16 px-40'>Error: {error}</div>;
  return (
    <section className='w-full py-16'>
      <div className='flex flex-col px-40 w-full max-[480px]:px-[20px] max-[480px]:flex-col max-[890px]:px-20 gap-5'>
        <div className='flex gap-5 max-[480px]:flex-col'>
          <div className='w-[40%] max-[480px]:w-full max-[480px]:h-auto rounded-[12px]'>
            <Image
              src={data.projectImage && data.projectImage}
              alt={data.title}
              width={300}
              height={300}
              className='w-full h-auto object-cover'
            />
          </div>
          <div className='w-[60%] max-[480px]:w-full'>
            <h1 className='text-[30px] font-[600] text-start text-[#755BB4]'>
              {data.title}
            </h1>
            <p className='text-[14px] dark:text-white text-black font-[500] text-justify'>
              {data.description}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {data.technologies && data.technologies.map((tech, key) => {
            return (
              <p key={key} className="dark:text-white text-black bg-[#755BB4] py-1 px-[10px] rounded-2xl capitalize">
                {tech}
              </p>
            )
          })}
        </div>
        <div className='mt-4 w-full flex gap-5 flex-col'>
          {data.keyPoints && data.keyPoints.map((item, index) => {
            return (
              <div className='mt-2' key={item._id || index}>
                <h2 className='text-[24px] font-[600] text-start text-[#755BB4]'>
                  {item.title}
                </h2>
                <ul style={{ listStyleType: "disc" }} className='ml-4'>
                  {item.points.map(point => {
                    return (
                      <li
                        key={point._id}
                        className='font-[600] text-[14px] text-start mb-1'
                      >
                        {point}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className='flex items-center gap-10 mt-10 max-[480px]:static max-[480px]:flex-col max-[890px]:flex-col max-[890px]:gap-2 max-[480px]:mt-2'>
          <Link href={data.githubLink} target='_blank' className='bg-[#755BB4] text-center text-[14px] font-[600] border-[#fff] p-3 max-w-[250px] px-6 rounded-[20px] text-white max-[890px]:w-full max-[890px]:max-w-full'>
            Soruce Code - Github
          </Link>
          <Link href={data.liveLink} target="" className='bg-[#755BB4] text-center text-[14px] font-[600] border-[#fff] p-3 max-w-[250px] px-6 rounded-[20px] text-white max-[890px]:w-full max-[890px]:max-w-full'>
            Live Link
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Page;
