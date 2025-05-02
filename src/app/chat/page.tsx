// app/chat/page.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import UniversalChat from '@/components/UniversalChat'

export default function ChatPage() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) return <div className="p-4 text-center">Loading...</div>

  if (!isSignedIn) {
    return (
      <div className="max-w-sm mx-auto p-4 space-y-4 mt-20">
        <h1 className="text-2xl font-bold text-center">Join the Global Chat</h1>
        <SignInButton mode="modal">
          <Button className="w-full">Sign in to Chat</Button>
        </SignInButton>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">Global Chat Room</h1>
        <p className="text-muted-foreground text-center">
          Everyone sees the same messages in real-time
        </p>
      </div>
      <UniversalChat />
    </div>
  )
}