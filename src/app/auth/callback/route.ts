import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("whatsapp")
        .eq("id", data.user.id)
        .single();

      if (!profile?.whatsapp) {
        return NextResponse.redirect(`${origin}/completar-perfil`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
