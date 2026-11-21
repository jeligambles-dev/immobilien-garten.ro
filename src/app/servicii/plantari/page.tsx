import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("plantari");

export default function Page() {
  return <ServicePage slug="plantari" />;
}
