import { LoginForm } from "@/components/forms/login-form";
import { Logo } from "@/components/logo";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md">
              <Logo />
            </div>
            Country French Interiors
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden h-screen w-full lg:block">
        <Image
          src="https://cl0avqtjow.ufs.sh/f/Pb8WreYSaAY1umVlLx8RKsge9QTowFkavmGPzqDMZIptxYHN"
          alt="Image"
          fill
          unoptimized
        />
      </div>
    </div>
  );
}
