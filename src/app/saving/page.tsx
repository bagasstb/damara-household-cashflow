import { redirect } from "next/navigation";
import { getAvailableYears } from "@/lib/saving-services";

export default async function SavingIndexPage() {
  const years = await getAvailableYears();
  const currentYear = years.length > 0 ? years[0] : new Date().getFullYear();
  redirect(`/saving/${currentYear}`);
}
