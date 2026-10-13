import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import { getPost, posts } from "../../../lib/posts";
export const revalidate = 60;
export function generateStaticParams(){return posts.map(post=>({id:post.id}));}
export default async function PostPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const post=getPost(id); if(!post) notFound();
 return <main className="shell"><Nav/><section className="hero"><span className="tag">ISR · REVALIDATE 60s</span><p className="eyebrow">{post.category.toUpperCase()}</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p><p className="meta">{post.date} · {post.readTime}</p></section><article className="post-body">{post.content.map((paragraph,i)=><p key={i}>{paragraph}</p>)}<h2>Why this matters</h2><p>This route demonstrates an individual post page with static params and a revalidation interval. In production, Next.js can regenerate the page after the interval when it is requested.</p></article><div className="note">Rendering strategy: ISR. Revalidation is configured to 60 seconds; use a production build to test production caching behavior.</div><footer className="footer">RenderLab · Individual post route</footer></main>
}