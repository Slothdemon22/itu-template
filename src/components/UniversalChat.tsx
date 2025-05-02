'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/db'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUser } from '@clerk/nextjs'
import { SendHorizonal, Loader2 } from 'lucide-react'

interface Message {
  clerkID: string
  message: string
  created_at: string
}

export default function UniversalChat() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('real-time')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setMessages(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()

    const channel = supabase
      .channel('universal-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'real-time'
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return

    const { error } = await supabase.from('real-time').insert({
      clerkID: user.id,
      message: newMessage
    })

    if (!error) setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto rounded-xl shadow-xl overflow-hidden bg-background border border-muted">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-muted">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <h2 className="font-semibold text-lg text-center">Global Chat Room</h2>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          Connected as {user?.fullName || 'anonymous'}
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-background to-muted/5">
        <div className="space-y-6">
          {messages.map((msg) => {
            const isOwn = msg.clerkID === user?.id
            return (
              <div
                key={`${msg.clerkID}-${msg.created_at}`}
                className={`flex items-start gap-3 ${isOwn ? 'justify-end' : ''}`}
              >
                {!isOwn && (
                  <Avatar className="h-9 w-9 border border-muted">
                    <AvatarFallback className="bg-muted text-sm font-medium">
                      {msg.clerkID.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex flex-col max-w-[min(80%,400px)]">
                  {!isOwn && (
                    <span className="text-xs font-medium text-muted-foreground mb-1">
                      User {msg.clerkID.slice(-4)}
                    </span>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      isOwn
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                  </div>
                  <span
                    className={`text-xs text-muted-foreground mt-1 ${
                      isOwn ? 'text-right' : 'text-left'
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-muted bg-background/80 backdrop-blur-sm">
        <div className="flex gap-2 items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 rounded-full px-5 py-3 border-muted focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !user}
            className="rounded-full h-11 w-11 p-0 flex items-center justify-center"
            size="icon"
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}