import { NextResponse } from "next/server";
import { getGithubData } from "@/services/github";

export const GET = async () => {
  try {
    const result = await getGithubData();
    
    if (result.status > 400 || !result.data) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: result.status || 500 }
      );
    }

    // Return the data in the format expected by the frontends
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
};
