import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const metadata = serviceMetadata("gazon-artificial");

export default function Page() {
  return <ServicePage slug="gazon-artificial" />;
}
