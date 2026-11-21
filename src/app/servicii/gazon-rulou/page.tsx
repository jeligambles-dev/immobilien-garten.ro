import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("gazon-rulou");

export default function Page() {
  return <ServicePage slug="gazon-rulou" />;
}
