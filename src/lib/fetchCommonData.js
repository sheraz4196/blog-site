import { getPagesData } from "@/lib/api";

export const fetchCommonData = async () => {
  const commonData = await getPagesData("common");
  return commonData?.items[0]?.fields || null;
};
