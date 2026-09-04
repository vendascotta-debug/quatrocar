import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aplicarUpgradePendente } from "@/lib/webhook-helpers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error_description") || searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(oauthError)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("exchangeCodeForSession failed:", error.message);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    }

    if (data.user) {
      if (data.user.email) {
        await aplicarUpgradePendente(data.user.email, data.user.id);
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("whatsapp")
        .eq("id", data.user.id)
        .single();

      if (!profile?.whatsapp) {
        return NextResponse.redirect(`${origin}/completar-perfil`);
      }
    }

    return NextResponse.redirect(`${origin}/dashboard`);
  }

  return NextResponse.redirect(`${origin}/login?error=missing_code`);
}
