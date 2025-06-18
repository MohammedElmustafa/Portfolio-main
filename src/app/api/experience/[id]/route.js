import ExperienceModel from "@/models/experienceModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";
import { connectToDB } from "@/database/db";

export const GET = async (request, { params }) => {
  try {
    const experience = await ExperienceModel.findById(params.id);
    if (!experience) {
      return new NextResponse("Experience Not found", { status: 400 });
    }
    return new NextResponse(JSON.stringify(experience), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  await connectToDB();
  const session = await getServerSession(authOptions);
  try {
    if (!session.user.isAdmin) {
      return new NextResponse(
        JSON.stringify({ error: "You're not Authorized to this action" }),
        { status: 500 }
      );
    }
    const deleteExperience = await ExperienceModel.findByIdAndDelete({
      _id: params.id,
    });
    if (!deleteExperience) {
      return new NextResponse(
        JSON.stringify({ error: "Experience not found" }),
        { status: 404 }
      );
    }
    return new NextResponse("Deleted Successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  await connectToDB();
  const session = await getServerSession(authOptions);
  try {
    if (!session.user.isAdmin) {
      return new NextResponse(
        JSON.stringify({ error: "You're not Authorized to this action" }),
        { status: 500 }
      );
    }
    const body = await request.json();
    const editExperience = await ExperienceModel.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!editExperience) {
      return new NextResponse(
        JSON.stringify({ error: "Experience not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(editExperience), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};