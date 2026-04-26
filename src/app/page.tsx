import { ArrowRight, Code2, Cpu, Globe, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Cpu size={20} />
            </div>
            <span className="font-outfit text-xl font-bold tracking-tight">Algo<span className="text-muted-foreground">Forge</span></span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <Link href="#" className="transition-colors hover:text-primary">Algorithms</Link>
            <Link href="#" className="transition-colors hover:text-primary">Structures</Link>
            <Link href="#" className="transition-colors hover:text-primary">Docs</Link>
          </div>
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-20">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap size={14} className="fill-current" />
            <span>Next-gen Algorithm Visualization</span>
          </div>
          
          <h1 className="max-w-4xl font-outfit text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            Visualize code like <br />
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">never before.</span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A minimalist, high-performance platform for mastering complex data structures and algorithms through interactive, real-time visualizations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Start Visualizing <ArrowRight size={20} />
            </button>
            <button className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-accent active:scale-95">
              View on GitHub <Code2 size={20} />
            </button>
          </div>
        </div>

        {/* Feature Grid Preview */}
        <div className="mt-32 grid w-full max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
          {[
            {
              title: "Interactive Trees",
              desc: "Step through binary search trees and AVL trees with ease.",
              icon: <Cpu className="text-primary" />
            },
            {
              title: "Pathfinding",
              desc: "Visualize Dijkstra, A*, and BFS in real-time environments.",
              icon: <Globe className="text-primary" />
            },
            {
              title: "Sorting",
              desc: "Compare sorting algorithms with beautiful animations.",
              icon: <Zap className="text-primary" />
            }
          ].map((feature, i) => (
            <div key={i} className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-primary/20 hover:bg-white/[0.04]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="font-outfit text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full border-t border-white/5 py-12 text-center text-sm text-muted-foreground">
        <p>© 2026 AlgoForge. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
