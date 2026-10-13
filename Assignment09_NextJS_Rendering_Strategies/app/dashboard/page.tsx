import Nav from "../components/Nav";
import { getDashboardData } from "../../lib/posts";
export const dynamic = "force-dynamic";
export default async function DashboardPage(){
 const data=await getDashboardData();
 return <main className="shell"><Nav/><section className="hero"><p className="eyebrow">PERSONAL OVERVIEW</p><h1>User <span>Dashboard</span></h1><p className="lead">This page is rendered on every request to demonstrate Server-Side Rendering (SSR).</p><span className="tag">SSR · FORCE DYNAMIC</span></section><div className="stats"><div className="stat"><span>AVAILABLE ARTICLES</span><strong>{data.totalPosts}</strong></div><div className="stat"><span>ESTIMATED READING MINUTES</span><strong>{data.readingMinutes}</strong></div><div className="stat"><span>RENDERED AT</span><strong style={{fontSize:16}}>{new Date(data.generatedAt).toLocaleTimeString()}</strong></div></div><div className="note">The timestamp is generated on the server for this request. Refresh this page to observe a new render time.</div><footer className="footer">RenderLab · Server-rendered dashboard</footer></main>
}