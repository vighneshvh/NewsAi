import ResetPasswordForm from "@/components/auth/resetPassword-form";
import { Suspense } from "react";

function ResetPassword() {
  return (
    <Suspense
      fallback={
        <p className='text-center text-sm text-muted-foreground'>
          Loading reset form…
        </p>
      }>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default ResetPassword;
