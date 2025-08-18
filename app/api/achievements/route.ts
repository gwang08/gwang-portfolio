import { type NextRequest, NextResponse } from "next/server";

// Mock data for achievements
const mockAchievements = [
  {
    id: 6,
    name: "CertNexus Certified Ethical Emerging Technologist",

    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/QWRLRP2GHXK8",
    issue_date: "2024-07-16",
    image: "/images/achievements/certificates/acc.jpeg",
    is_show: true,
  },
  {
    id: 7,
    name: "Computer Communications",

    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/QCKXPVQTL9PX",
    issue_date: "2023-09-15",
    image: "/images/achievements/certificates/cc.jpeg",
    is_show: true,
  },
  {
    id: 8,
    name: "Java Database Connectivity",

    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/FVGYA74N4B3N",
    issue_date: "2024-07-09",
    image: "/images/achievements/certificates/java.jpeg",
    is_show: true,
  },
  {
    id: 9,
    name: "Project Management Principles and Practices",
    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/18QPENNSYKH1",
    issue_date: "2025-05-19",
    image: "/images/achievements/certificates/pmg.jpeg",
    is_show: true,
  },
  {
    id: 10,
    name: "Academic Skills for University Success",
    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/E2QQ7K4HPSUC",
    issue_date: "2023-05-22",
    image: "/images/achievements/certificates/ssl.jpeg",
    is_show: true,
  },
  {
    id: 11,
    name: "Software Development Lifecycle",

    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/K5TWQR666NKP",
    issue_date: "2024-05-17",
    image: "/images/achievements/certificates/swe.jpeg",
    is_show: true,
  },
  {
    id: 12,
    name: "Academic English: Writing",

    category: "Certificate",
    url_credential:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/1X1B6XVAFKLH",
    issue_date: "2024-09-04",
    image: "/images/achievements/certificates/writing_reseach.jpeg",
    is_show: true,
  },
];

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const queryCategory = searchParams.get("category");
    const querySearch = searchParams.get("search");

    let filteredData = [...mockAchievements];

    // Filter by category
    if (queryCategory && queryCategory.trim()) {
      filteredData = filteredData.filter(
        (achievement) =>
          achievement.category.toLowerCase() === queryCategory.toLowerCase(),
      );
    }

    // Filter by search
    if (querySearch && querySearch.trim()) {
      filteredData = filteredData.filter((achievement) =>
        achievement.name.toLowerCase().includes(querySearch.toLowerCase()),
      );
    }

    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
