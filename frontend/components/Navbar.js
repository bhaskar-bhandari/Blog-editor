import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">My Blog</Link>
        <Link href="/editor" className="text-blue-600 hover:underline">New Blog</Link>
      </div>
    </nav>
  );
}
