import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("irigatii");

export default function Page() {
  return <ServicePage slug="irigatii" />;
}
