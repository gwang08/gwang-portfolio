import { NextResponse } from "next/server";
import { getAllTimeSinceToday, getReadStats } from "@/services/wakatime";

export const GET = async () => {
  try {
    const [allTime, stats] = await Promise.all([
      getAllTimeSinceToday(),
      getReadStats()
    ]);

    const data = {
      allTime: allTime.data,
      stats: stats.data
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching WakaTime data:", error);
    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 }
    );
  }
};
