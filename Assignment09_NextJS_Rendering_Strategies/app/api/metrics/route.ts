import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(){
 const startedAt = Date.now();
 return NextResponse.json({strategy:"SSR dashboard / SSG index / ISR post pages",serverTimestamp:new Date().toISOString(),responsePreparationMs:Date.now()-startedAt});
}