import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("pavaje");

export default function Page() {
  return <ServicePage slug="pavaje" />;
}
