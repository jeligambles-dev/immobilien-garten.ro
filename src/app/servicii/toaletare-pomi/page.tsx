import ServicePage, { serviceMetadata } from "@/components/ServicePage";

export const dynamic = "force-dynamic"; // admin edits show immediately

export function generateMetadata() {
  return serviceMetadata("toaletare-pomi");
}

export default function Page() {
  return <ServicePage slug="toaletare-pomi" />;
}
