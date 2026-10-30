import { redirect } from "next/navigation";

export default function VenderLoginRedirect() {
  redirect("/vendor/login");
}
