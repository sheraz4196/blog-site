import { getPagesData } from "@/lib/api";

export async function fetchCommonData() {
  const commonData = await getPagesData("common");
  return commonData?.items[0]?.fields || null;
}
