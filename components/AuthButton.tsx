import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center flex-wrap justify-center gap-4 w-full lg:justify-between px-6 py-6">
      <Image src="/icons/logo-brock-blue.svg" alt=" " width={80} height={80} />

      <div className="flex items-center gap-2">
        <h3>Olá, {user.email}!</h3>
        <form action={signOut}>
          <button className="py-2 px-4 flex-0 flex-shrink-0 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover btn btn-secondary max-w-[250px] w-full">
            Sair
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
