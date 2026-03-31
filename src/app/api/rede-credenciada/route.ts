import { NextRequest, NextResponse } from "next/server";
import { createGuiaMedicoClient } from "@/lib/supabase/guia-medico";

export const revalidate = 300; // cache 5 min

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tipo = searchParams.get("tipo"); // "hospitais" | "medicos" | "especialidades"
  const especialidade = searchParams.get("especialidade");
  const busca = searchParams.get("busca");

  try {
    const supabase = createGuiaMedicoClient();

    // Return specialties list for filters
    if (tipo === "especialidades") {
      const { data, error } = await supabase
        .from("specialties")
        .select("id, name, slug")
        .eq("active", true)
        .order("name");
      if (error) throw error;
      return NextResponse.json({ data: data ?? [] });
    }

    if (tipo === "medicos") {
      let query = supabase
        .from("doctors")
        .select("id, name, crm, city, state, phone, whatsapp")
        .eq("active", true)
        .order("name");

      if (busca) {
        query = query.ilike("name", `%${busca}%`);
      }

      const { data: doctors, error } = await query;
      if (error) throw error;

      let filteredDoctors = doctors ?? [];

      if (especialidade && filteredDoctors.length > 0) {
        const { data: specLinks } = await supabase
          .from("doctor_specialties")
          .select("doctor_id")
          .eq("specialty_id", especialidade);

        const allowedIds = new Set((specLinks ?? []).map((s: { doctor_id: string }) => s.doctor_id));
        filteredDoctors = filteredDoctors.filter((d) => allowedIds.has(d.id));
      }

      if (filteredDoctors.length > 0) {
        const doctorIds = filteredDoctors.map((d) => d.id);
        const { data: allSpecLinks } = await supabase
          .from("doctor_specialties")
          .select("doctor_id, specialties(name)")
          .in("doctor_id", doctorIds);

        const specMap = new Map<string, string[]>();
        for (const link of allSpecLinks ?? []) {
          const arr = specMap.get(link.doctor_id) ?? [];
          if ((link as any).specialties?.name) {
            arr.push((link as any).specialties.name);
          }
          specMap.set(link.doctor_id, arr);
        }

        filteredDoctors = filteredDoctors.map((d) => ({
          ...d,
          specialties: specMap.get(d.id) ?? [],
        }));
      }

      return NextResponse.json({ data: filteredDoctors });
    }

    // Default: hospitais
    let query = supabase
      .from("hospitals")
      .select("id, name, city, state, neighborhood, address, phone, has_emergency, lat, lng")
      .eq("active", true)
      .order("name");

    if (busca) {
      query = query.ilike("name", `%${busca}%`);
    }

    const { data: hospitals, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data: hospitals ?? [] });
  } catch (err) {
    console.error("rede-credenciada API error:", err);
    return NextResponse.json(
      { error: "Erro ao buscar dados da rede credenciada." },
      { status: 500 }
    );
  }
}
