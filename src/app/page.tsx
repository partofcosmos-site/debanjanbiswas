export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-gradient-to-b from-zinc-900 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-900/50 lg:p-4">
          Transmitting from&nbsp;
          <code className="font-bold text-cyan-400">Part of Cosmos</code>
        </p>
      </div>

      <div className="relative flex place-items-center mt-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Cosmic Developer Portfolio
        </h1>
      </div>

      <div className="mt-12 text-center text-gray-400 max-w-2xl">
        <p className="text-lg">
          The Next.js App Router foundation is successfully initialized. 
          Ready to build interactive layouts, dynamic routes, and stunning components.
        </p>
      </div>
    </main>
  );
}
