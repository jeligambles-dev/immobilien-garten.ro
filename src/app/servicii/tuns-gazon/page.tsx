import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("tuns-gazon");

export default function Page() {
  return <ServicePage slug="tuns-gazon" />;
}
