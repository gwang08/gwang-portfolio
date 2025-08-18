import { NextResponse } from "next/server";
import { getProjects } from "@/services/projects";

export const GET = async () => {
  try {
    const projects = await getProjects();
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects data" },
      { status: 500 }
    );
  }
};
