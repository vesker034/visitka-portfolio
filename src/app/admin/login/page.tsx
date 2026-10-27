import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fff8f5] text-sm text-rose-600">
          Loading...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
