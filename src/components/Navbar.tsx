"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { Book, Users, BookOpen, Menu, X, Library, LogIn, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {supabase} from "@/lib/db"

interface NavLinkProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

const NavLink = ({ href, icon, children, onClick }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
        isActive ? "bg-blue-600/20 text-blue-400" : "hover:bg-[#1e293b] text-gray-300 hover:text-white",
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export const Navbar = () => {
    const { isSignedIn, user, isLoaded } = useUser();



    useEffect(() => {
        if (!isLoaded || !user) return;
    
        // Call backend API to sync user
        const syncUser = async () => {
          try {
            const res = await fetch("/api/auth", {
              method: "POST",
            });
    
            if (!res.ok) {
              console.error("Failed to sync user with Supabase");
            } else {
              const data = await res.json();
              console.log("User sync response:", data);
            }
          } catch (err) {
            console.error("API error:", err);
          }
        };
    
        syncUser();
    
        // Uncomment below if you want to insert directly using Supabase client in frontend
        /*
        import { supabase } from "@/lib/db";
    
        const insertUserDirectly = async () => {
          const { data, error } = await supabase.from("clerk-test").insert({
            clerkID: user.id,
            emailAddress: user.primaryEmailAddress?.emailAddress,
            fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            imageUrl: user.imageUrl,
          });
    
          if (error) {
            console.error("Error inserting user directly:", error.message);
          } else {
            console.log("User inserted directly:", data);
          }
        };
    
        insertUserDirectly();
        */
    
      }, [isLoaded, user]);
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f172a] border-b border-[#1e293b] shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Library className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl text-white hidden sm:inline">LibrarySystem</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/books" icon={<Book className="h-4 w-4" />}>
            Books
          </NavLink>
          <NavLink href="/book-requests" icon={<BookOpen className="h-4 w-4" />}>
            Requests
          </NavLink>
          <NavLink href="/users" icon={<Users className="h-4 w-4" />}>
            Users
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <div className="hidden sm:flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-[#1e293b]">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
            <div className="sm:hidden">
              <SignInButton mode="modal">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#1e293b]">
                  <LogIn className="h-5 w-5" />
                </Button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 rounded-full border-2 border-blue-500",
                  userButtonPopoverCard: "bg-[#1e293b] border border-[#334155] text-white shadow-xl",
                  userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-[#334155]",
                  userButtonPopoverActionButtonText: "text-current",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </SignedIn>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white hover:bg-[#1e293b]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-[#0f172a] border-l border-[#1e293b] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Library className="h-5 w-5 text-blue-500" />
                    <span className="font-bold text-white">LibrarySystem</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1e293b]">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-1 p-4">
                  <NavLink href="/books" icon={<Book className="h-4 w-4" />} onClick={closeSheet}>
                    Books
                  </NavLink>
                  <NavLink href="/book-requests" icon={<BookOpen className="h-4 w-4" />} onClick={closeSheet}>
                    Requests
                  </NavLink>
                  <NavLink href="/users" icon={<Users className="h-4 w-4" />} onClick={closeSheet}>
                    Users
                  </NavLink>
                </nav>

                <div className="mt-auto p-4 border-t border-[#1e293b]">
                  <SignedOut>
                    <div className="flex flex-col gap-2">
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-[#334155] text-gray-300 hover:text-white hover:bg-[#1e293b]"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="w-full justify-start bg-blue-600 hover:bg-blue-500 text-white">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
