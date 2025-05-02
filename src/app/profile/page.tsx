'use client'

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // if you're using shadcn/ui

export default function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div className="text-white">Loading...</div>;
  if (!isSignedIn) return <div className="text-white">You are not signed in</div>;

  return (
    <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.imageUrl}
            alt="User profile"
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold mb-1">{user.fullName}</h2>
          <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">User ID:</span>
            <span className="text-gray-800 font-mono truncate">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Username:</span>
            <span className="text-gray-800">{user.username || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created at:</span>
            <span className="text-gray-800">{new Date(user.createdAt? user.createdAt: "none").toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
