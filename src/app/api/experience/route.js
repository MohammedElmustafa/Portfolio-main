import ExperienceModel from "@/models/experienceModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { connectToDB } from "@/database/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connectToDB();
  try {
    const allExperience = await ExperienceModel.find();
    if (allExperience.length === 0) {
      return new NextResponse(JSON.stringify({ error: "No projects found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(allExperience), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const POST = async (req, res) => {
  await connectToDB();
  const session = await getServerSession(authOptions);
  try {
    if (!session.user.isAdmin) {
      return new NextResponse(JSON.stringify({ error: "You're not authorized to this action" }), { status: 403 });
    }
    const data = await req.json();
    const addExperience = await ExperienceModel.create(data);
    return new NextResponse(JSON.stringify(addExperience), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
