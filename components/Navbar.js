import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-800">
      <h1 className="text-lg font-semibold">Finance Tracker</h1>
      <div className="space-x-4 flex gap-10">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/add" className="hover:underline">
          Add Transaction
        </Link>
      </div>
    </nav>
  );
}
