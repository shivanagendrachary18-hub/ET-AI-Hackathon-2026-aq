"use client"

import { useRef, useState } from "react"
import {
  BrainCircuit,
  FileText,
  Lightbulb,
  Plus,
  SendHorizonal,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { chatHistory, chatSuggestions } from "@/lib/mock-data"

type Citation = { source: string; page: string }
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  confidence?: number
  citations?: Citation[]
  recommendations?: string[]
}

const cannedAnswer = (prompt: string): Message => ({
  id: crypto.randomUUID(),
  role: "assistant",
  content:
    `Based on the indexed maintenance records and sensor telemetry, ${prompt.replace(/\?$/, "")} indicates an elevated risk profile. ` +
    "Vibration spectra for Turbine A-7 show early inner-race bearing fault frequencies (BPFI) trending upward over the last 3 weeks, correlated with a 4°C rise in bearing housing temperature. The recommended action is a borescope inspection within 14 days to avoid unplanned downtime.",
  confidence: 89,
  citations: [
    { source: "Turbine-A7-Inspection.pdf", page: "p. 12" },
    { source: "Gearbox-Vibration-Report.pdf", page: "p. 4" },
    { source: "Compressor-SOP-v3.docx", page: "§3.2" },
  ],
  recommendations: [
    "Schedule borescope inspection of GT-A7 bearings within 14 days",
    "Increase vibration sampling frequency to hourly",
    "Stage replacement bearing kit (P/N BRG-A7-118)",
  ],
})

const greeting: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hello Ava. I'm your Industrial Brain assistant. Ask me anything about your assets, inspection reports, failure history or compliance status — I'll cite the exact documents I use.",
  confidence: 100,
}

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || thinking) return
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setThinking(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, cannedAnswer(trimmed)])
      setThinking(false)
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
      })
    }, 900)
  }

  return (
    <div className="grid h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[260px_1fr]">
      {/* History */}
      <aside className="hidden flex-col gap-3 lg:flex">
        <Button className="justify-start" variant="outline" onClick={() => setMessages([greeting])}>
          <Plus data-icon="inline-start" />
          New conversation
        </Button>
        <div className="glass flex-1 overflow-hidden rounded-xl border border-border p-2">
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Recent</p>
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1 pb-8">
              {chatHistory.map((h) => (
                <button
                  key={h.id}
                  className="flex flex-col items-start gap-0.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-secondary/60"
                >
                  <span className="line-clamp-1 text-sm">{h.title}</span>
                  <span className="text-xs text-muted-foreground">{h.when}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Chat */}
      <div className="glass flex min-h-0 flex-col overflow-hidden rounded-xl border border-border">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto flex max-w-2xl flex-col gap-5">
            {messages.map((m) => (
              <MessageRow key={m.id} message={m} />
            ))}

            {thinking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BrainCircuit className="size-4 animate-pulse text-accent" />
                Analyzing documents and telemetry…
              </div>
            )}

            {messages.length <= 1 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {chatSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="flex items-start gap-2 rounded-lg border border-border bg-secondary/30 p-3 text-left text-sm transition-colors hover:border-primary/50 hover:bg-secondary/60"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border p-3">
          <div className="mx-auto flex max-w-2xl items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Ask about assets, reports, failures or compliance…"
              className="max-h-32 min-h-11 resize-none bg-background/50"
              rows={1}
            />
            <Button size="icon" className="size-11 shrink-0" onClick={() => send(input)} disabled={thinking || !input.trim()} aria-label="Send">
              <SendHorizonal className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageRow({ message }: { message: Message }) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {isUser ? "AE" : <BrainCircuit className="size-4" />}
      </div>
      <div className={cn("min-w-0 max-w-[85%] space-y-3", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm leading-relaxed",
            isUser ? "bg-primary text-primary-foreground" : "border border-border bg-secondary/40",
          )}
        >
          {message.content}
        </div>

        {!isUser && message.citations && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-chart-3/15 px-2 py-0.5 font-medium text-chart-3">
                {message.confidence}% confidence
              </span>
              <span>Sources</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {message.citations.map((c) => (
                <span
                  key={c.source}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-1 text-xs"
                >
                  <FileText className="size-3 text-primary" />
                  {c.source} <span className="text-muted-foreground">{c.page}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {!isUser && message.recommendations && (
          <div className="rounded-lg border border-accent/30 bg-accent/10 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
              <Lightbulb className="size-3.5" />
              AI Recommendations
            </p>
            <ul className="space-y-1.5">
              {message.recommendations.map((r) => (
                <li key={r} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
