import { NextResponse } from "next/server";
import { getMonkeytypeData } from "@/services/monkeytype";

export const GET = async () => {
  try {
    const result = await getMonkeytypeData();
    
    if (result.status > 400) {
      return NextResponse.json(
        { error: "Failed to fetch Monkeytype data" },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching Monkeytype data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Monkeytype data" },
      { status: 500 }
    );
  }
};
