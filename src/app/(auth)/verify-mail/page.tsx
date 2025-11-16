import Authcard from "@/components/auth/authcard";
import VerifyMailForm from "@/components/auth/verifyMail-form";
import { Suspense } from "react";

function VerifyMail() {
  return (
    <Authcard header='Verifying mail..'>
      <Suspense
        fallback={
          <p className='text-center text-sm text-muted-foreground'>
            Checking token…
          </p>
        }>
        <VerifyMailForm />
      </Suspense>
    </Authcard>
  );
}

export default VerifyMail;
