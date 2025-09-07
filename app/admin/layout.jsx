import DashboardLayout from "@/components/shared/DashboardLayout";

export default async function AdminLayout({ children, params }) {
  // params is a Promise, but we don't need it
  // No await needed since we're not using it
  console.log("Layout params:", params); // Still logs Promise for debugging
  return <DashboardLayout role="admin">{children}</DashboardLayout>;
}
