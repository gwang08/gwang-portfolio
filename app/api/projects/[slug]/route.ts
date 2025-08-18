import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/services/projects";

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const { slug } = params;
    const project = await getProjectBySlug(slug);
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project data:", error);
    return NextResponse.json(
      { error: "Failed to fetch project data" },
      { status: 500 }
    );
  }
};
