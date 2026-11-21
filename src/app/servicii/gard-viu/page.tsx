import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const dynamic = "force-dynamic"; // admin edits show immediately

export function generateMetadata() {
  return serviceMetadata("gard-viu");
}

export default function Page() {
  return <ServicePage slug="gard-viu" />;
}
