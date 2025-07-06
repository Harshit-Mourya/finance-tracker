"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-800">
      <Link href="/">
        <h1 className="text-lg font-semibold">Finance Tracker</h1>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 items-center">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/budget" className="hover:underline">
          Budget
        </Link>
        <Link href="/add" className="hover:underline">
          Add Transaction
        </Link>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div className="md:hidden">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-white border-gray-700">
              Menu{" "}
              {open ? (
                <ChevronUp size={16} className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown size={16} className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 text-white border border-gray-700">
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/budget">Budget</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/add">Add Transaction</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

// export default function Navbar() {
//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-800">
//       <Link href="/">
//         <h1 className="text-lg font-semibold">Finance Tracker</h1>{" "}
//       </Link>

//       <div className="space-x-4 flex gap-10">
//         <Link href="/dashboard" className="hover:underline">
//           Dashboard
//         </Link>
//         <Link href="/budget" className="hover:underline">
//           Budget
//         </Link>
//         <Link href="/add" className="hover:underline">
//           Add Transaction
//         </Link>
//       </div>
//     </nav>
//   );
// }
