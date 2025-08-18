import { Sora, Onest } from "next/font/google";

export const soraSans = Sora({
  variable: "--soraSans-font",
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const onestSans = Onest({
  variable: "--onestSans-font",
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  weight: ["300", "400", "500", "600", "700", "800"],
});
