'use client'

import { useEffect, useRef } from 'react'
import {
  ArrowDownToLine,
  ArrowUpRight,
  ChevronDown,
  Circle,
  Code2,
  Container,
  Database,
  ExternalLink,
  Mail,
  Network,
  ShieldCheck,
  Terminal,
  Zap,
  Activity,
  Braces,
  Cpu,
  Globe2,
  MousePointer2,
  Radio,
  Sparkles,
} from 'lucide-react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const failedCode = `def find_pair(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return None`

const goldCode = `def find_pair(nums: list[int], target: int) -> list[int] | None:
    """Return indices of two values that sum to target."""
    if not nums:
        return None

    seen: dict[int, int] = {}
    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index
    return None`

const skills = {
  'AI & model training': ['RLHF', 'SFT', 'Model auditing', 'Rationale writing', 'Prompt engineering', 'Edge-case verification', 'Red-teaming'],
  'Programming languages': ['Python', 'C++', 'JavaScript', 'TypeScript', 'Node.js', 'SQL'],
  'Infrastructure & tools': ['Docker', 'Git', 'REST APIs', 'Pandas', 'NumPy', 'MongoDB', 'Linux'],
}

function CursorSignal() {
  const signalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const signal = signalRef.current
    if (!signal) return
    let frame = 0
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        signal?.style.setProperty('--cursor-x', `${event.clientX}px`)
        signal?.style.setProperty('--cursor-y', `${event.clientY}px`)
        signal?.classList.add('cursor-signal-active')
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return <div ref={signalRef} className="cursor-signal" aria-hidden="true"><span className="cursor-signal-core" /><span className="cursor-signal-ring" /><span className="cursor-signal-crosshair" /></div>
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-red-400">
      <span className="text-slate-600">{number}</span>
      <span>{children}</span>
      <span className="h-px w-10 bg-red-500/40" />
    </div>
  )
}

function EvaluatorPulse() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-red-500/20 bg-[#110d16] p-5 shadow-[0_0_60px_rgba(127,29,29,0.12)] sm:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(185,28,28,0.18),transparent_34%)]" />
      <div className="scanline absolute inset-x-0 top-0 h-px bg-red-400/70" />
      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-sm">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-red-300"><span className="size-1.5 animate-pulse rounded-full bg-red-400" /> live evaluator telemetry</div>
          <h3 className="text-xl font-semibold text-white">Watching the model think in public.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">Every response passes through a pressure test: syntax, runtime, complexity, and adversarial edge cases.</p>
        </div>
        <div className="relative flex size-48 shrink-0 items-center justify-center self-center sm:size-56">
          <div className="absolute size-32 rounded-full border border-red-400/25 pulse-ring sm:size-40" />
          <div className="absolute size-20 rounded-full border border-red-300/35 pulse-ring pulse-ring-delay sm:size-24" />
          <div className="absolute size-3 rounded-full bg-red-300 shadow-[0_0_24px_8px_rgba(248,113,113,0.65)] evaluator-core" />
          <div className="absolute inset-5 rounded-full border border-dashed border-red-500/30 evaluator-orbit" />
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-80" aria-hidden="true">
            {[16, 30, 44, 24, 54, 34, 20, 42, 28].map((height, index) => <span key={index} className="evaluator-bar w-1 rounded-full bg-red-300/80" style={{ height: `${height}px`, animationDelay: `${index * -0.12}s` }} />)}
          </div>
          {['syntax', 'runtime', 'complexity', 'edge cases'].map((label, index) => <span key={label} className={`absolute font-mono text-[9px] uppercase tracking-wider text-red-200/75 ${['-top-1 left-1/2 -translate-x-1/2', 'right-0 top-1/2 -translate-y-1/2', 'bottom-0 left-1/2 -translate-x-1/2', 'left-0 top-1/2 -translate-y-1/2'][index]}`}>{label}</span>)}
        </div>
      </div>
    </div>
  )
}

function TeachingGraph() {
  const nodes = [
    ['prompt', 'PROMPT INTAKE', 'left-[8%] top-[20%]'],
    ['human', 'HUMAN TUTOR', 'left-[21%] top-[65%]'],
    ['memory', 'LESSON MEMORY', 'left-[47%] top-[13%]'],
    ['model', 'CODE MODEL', 'right-[15%] top-[31%]'],
    ['judge', 'EVALUATOR', 'right-[10%] bottom-[16%]'],
  ]

  return (
    <div aria-label="Animated diagram showing a human teaching an AI model" role="img" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#090d16]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(248,113,113,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,113,113,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute left-1/2 top-1/2 size-[min(60vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-950/30 blur-3xl" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="wire" x1="0" x2="1"><stop stopColor="#fb7185" stopOpacity=".15" /><stop offset=".5" stopColor="#fca5a5" /><stop offset="1" stopColor="#fb7185" stopOpacity=".15" /></linearGradient></defs>
        <path className="teaching-wire" d="M130 160 C260 90, 390 140, 500 110 S700 160, 850 230" stroke="url(#wire)" />
        <path className="teaching-wire teaching-wire-delay" d="M220 480 C320 390, 390 300, 500 350 S700 500, 870 510" stroke="url(#wire)" />
        <path className="teaching-wire teaching-wire-delay-2" d="M220 480 C390 570, 600 570, 870 510" stroke="url(#wire)" />
      </svg>
      <div className="absolute left-1/2 top-1/2 flex size-[min(26vw,300px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-300/35 bg-red-950/25 shadow-[0_0_100px_rgba(248,113,113,0.22)]">
        <div className="absolute inset-5 rounded-full border border-dashed border-red-300/30 animate-[spin_22s_linear_infinite]" />
        <div className="absolute inset-12 rounded-full border border-red-400/20 animate-[spin_14s_linear_infinite_reverse]" />
        <div className="absolute size-2 -translate-y-[clamp(90px,9vw,128px)] rounded-full bg-white shadow-[0_0_16px_5px_rgba(254,202,202,.9)] animate-[orbit_7s_linear_infinite]" />
        <div className="text-center font-mono"><div className="text-[clamp(24px,4vw,48px)] font-bold text-red-200">AI</div><div className="mt-1 text-[8px] uppercase tracking-[.28em] text-red-300/70">learning loop</div></div>
      </div>
      {nodes.map(([key, label, position], index) => <div key={key} className={`absolute ${position} rounded-lg border border-red-300/25 bg-[#11101a]/90 px-3 py-2 shadow-[0_0_25px_rgba(248,113,113,0.1)] backdrop-blur-sm animate-[float_5s_ease-in-out_infinite]`} style={{ animationDelay: `${index * -0.8}s` }}><div className="flex items-center gap-2 font-mono text-[9px] tracking-[.16em] text-red-200"><span className="size-1.5 rounded-full bg-red-400 shadow-[0_0_10px_2px_rgba(248,113,113,.7)]" />{label}</div><div className="mt-1 font-mono text-[8px] text-slate-500">{key}_signal :: active</div></div>)}
      <div className="absolute right-[8%] top-[62%] hidden w-44 rounded-lg border border-red-300/20 bg-[#090d16]/85 p-3 font-mono text-[9px] text-red-200/75 shadow-[0_0_30px_rgba(248,113,113,.1)] backdrop-blur sm:block animate-[float_6s_ease-in-out_infinite_reverse]"><div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[.18em] text-slate-500"><span>live feedback</span><span className="text-red-300">● 98.4%</span></div><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[84%] rounded-full bg-gradient-to-r from-red-500 to-red-200 animate-[signal_2.8s_ease-in-out_infinite]" /></div><div className="mt-2 text-slate-500">reward ↑  confidence ↑</div></div>
      <div className="absolute bottom-[14%] left-[7%] hidden w-64 overflow-hidden rounded-xl border border-red-300/20 bg-[#080d16]/90 font-mono text-[8px] leading-4 text-slate-500 shadow-[0_0_35px_rgba(248,113,113,.12)] backdrop-blur-md lg:block animate-[float_7s_ease-in-out_infinite]"><div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[8px] uppercase tracking-[.16em]"><span className="text-red-200">model_output_a.py</span><span className="text-red-400">FAIL</span></div><div className="px-3 py-3"><div><span className="text-slate-700">01</span> def find_pair(nums, target):</div><div className="text-red-300/80"><span className="text-slate-700">02</span> &nbsp;for i in range(len(nums)):</div><div className="text-red-300/80"><span className="text-slate-700">03</span> &nbsp;&nbsp;for j in range(i + 1, len(nums)):</div><div className="mt-2 text-red-400">! Logic bug · O(N²)</div></div><div className="code-scan absolute inset-x-0 top-0 h-px bg-red-300" /></div>
      <div className="absolute bottom-[13%] right-[6%] hidden w-72 overflow-hidden rounded-xl border border-red-200/30 bg-[#0b111c]/95 font-mono text-[8px] leading-4 text-slate-400 shadow-[0_0_50px_rgba(248,113,113,.2)] backdrop-blur-md lg:block animate-[float_7s_ease-in-out_infinite_reverse]"><div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[8px] uppercase tracking-[.16em]"><span className="text-red-100">gold_standard.py</span><span className="text-red-300">PASS</span></div><div className="px-3 py-3"><div><span className="text-slate-700">01</span> def find_pair(nums: list[int], target: int):</div><div className="text-red-100"><span className="text-slate-700">02</span> &nbsp;seen: dict[int, int] = {'{}'}</div><div className="text-red-100"><span className="text-slate-700">03</span> &nbsp;for index, value in enumerate(nums):</div><div className="mt-2 text-red-300">✓ O(N) · edge cases handled</div></div><div className="code-scan code-scan-delay absolute inset-x-0 top-0 h-px bg-red-100" /></div>
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full border border-red-400/20 bg-[#090d16]/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[.2em] text-red-200/70 backdrop-blur">observe → teach → test → refine</div>
    </div>
  )
}

function AboutSignal() {
  return (
    <div aria-label="Animated profile telemetry showing how Nibru turns ambiguity into reliable AI systems" role="img" className="relative min-h-[25rem] overflow-hidden rounded-2xl border border-red-300/20 bg-[#080d16] p-5 shadow-[0_0_70px_rgba(248,113,113,.08)]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(248,113,113,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(248,113,113,.06)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(248,113,113,.17),transparent_35%)]" />
      <div className="relative flex items-center justify-between font-mono text-[9px] uppercase tracking-[.18em] text-red-200/60"><span>identity_node / NKT-01</span><span className="flex items-center gap-2 text-red-300"><span className="size-1.5 animate-pulse rounded-full bg-red-300" /> online</span></div>
      <div className="relative mx-auto mt-8 flex aspect-square max-w-[19rem] items-center justify-center rounded-full border border-red-300/20">
        <div className="absolute inset-5 rounded-full border border-dashed border-red-300/25 animate-[spin_18s_linear_infinite]" />
        <div className="absolute inset-14 rounded-full border border-red-400/20 animate-[spin_11s_linear_infinite_reverse]" />
        <div className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-red-100 shadow-[0_0_18px_6px_rgba(254,202,202,.8)] animate-[orbit_6s_linear_infinite]" />
        <div className="relative flex size-28 flex-col items-center justify-center rounded-full border border-red-200/35 bg-red-950/50 text-center shadow-[0_0_50px_rgba(248,113,113,.18)] animate-[pulse-ring_4s_ease-out_infinite]"><div className="font-mono text-3xl font-bold text-red-100">N</div><div className="mt-1 font-mono text-[8px] uppercase tracking-[.24em] text-red-300/70">human signal</div></div>
        {[['curiosity', 'left-0 top-[24%]'], ['clarity', 'right-0 top-[34%]'], ['craft', 'bottom-[14%] left-[12%]'], ['care', 'bottom-[10%] right-[12%]']].map(([label, position], index) => <div key={label} className={`absolute ${position} rounded border border-red-300/20 bg-[#0b111c]/90 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-red-200/80 backdrop-blur animate-[float_5s_ease-in-out_infinite]`} style={{ animationDelay: `${index * -.9}s` }}>{label} <span className="text-red-400">// active</span></div>)}
      </div>
      <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-wider text-slate-600"><span>signal: human judgment</span><span className="text-red-200/70">translating complexity → trust</span></div>
    </div>
  )
}

function TrackRecordSignal() {
  return <div aria-hidden="true" className="relative h-32 overflow-hidden rounded-xl border border-red-300/15 bg-[#0a101b] p-4">
    <div className="absolute inset-x-4 top-1/2 h-px bg-red-300/10" /><div className="absolute inset-y-4 left-1/2 w-px bg-red-300/10" />
    <div className="absolute left-[14%] top-1/2 size-2 rounded-full bg-red-300 shadow-[0_0_18px_5px_rgba(248,113,113,.65)] signal-node" /><div className="absolute left-[47%] top-[30%] size-1.5 rounded-full bg-white shadow-[0_0_14px_4px_rgba(255,255,255,.55)] signal-node signal-node-delay" /><div className="absolute right-[14%] bottom-[24%] size-2 rounded-full bg-red-400 shadow-[0_0_18px_5px_rgba(248,113,113,.55)] signal-node" />
    <svg className="absolute inset-0 size-full" viewBox="0 0 400 128" preserveAspectRatio="none"><path className="signal-path" d="M35 64 C105 10 130 100 200 42 S300 95 365 70" /><path className="signal-path signal-path-delay" d="M35 64 C105 118 130 22 200 82 S300 25 365 70" /></svg>
    <div className="relative flex items-center justify-between font-mono text-[9px] uppercase tracking-[.18em] text-red-200/60"><span>career_signal</span><span className="text-red-300">live / 03 nodes</span></div>
  </div>
}

function SystemTelemetry() {
  return <div aria-hidden="true" className="relative h-32 overflow-hidden rounded-xl border border-red-300/15 bg-[#0a101b] p-4 font-mono text-[9px] text-slate-500">
    <div className="absolute inset-x-4 bottom-5 flex h-16 items-end gap-1">{Array.from({ length: 34 }, (_, i) => <span key={i} className="telemetry-bar flex-1 rounded-t-sm bg-gradient-to-t from-red-500/20 to-red-300" style={{ height: `${24 + ((i * 17) % 62)}%`, animationDelay: `${i * -0.08}s` }} />)}</div>
    <div className="relative flex justify-between uppercase tracking-[.18em]"><span>runtime / pulse</span><span className="text-red-300">99.2% stable</span></div>
    <div className="absolute bottom-2 left-4 right-4 flex justify-between border-t border-white/10 pt-1"><span>latency 14ms</span><span>memory 42mb</span><span>tests passing</span></div>
  </div>
}

function ContactBeacon() {
  return <div aria-label="Animated secure communication channel" role="img" className="relative hidden min-h-72 overflow-hidden rounded-xl border border-red-300/15 bg-[#080d16] p-5 lg:block">
    <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(248,113,113,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(248,113,113,0.07)_1px,transparent_1px)] [background-size:34px_34px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(248,113,113,.2),transparent_32%)]" />
    <div className="absolute inset-x-5 top-5 flex justify-between font-mono text-[9px] uppercase tracking-[.16em] text-red-200/60"><span>secure_comms // 07</span><span className="flex items-center gap-2 text-red-300"><span className="size-1.5 animate-pulse rounded-full bg-red-300" /> channel open</span></div>
    <div className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-300/25 beacon-ring"><div className="absolute inset-3 rounded-full border border-dashed border-red-300/25 animate-[spin_16s_linear_infinite]" /><div className="absolute size-16 rounded-full border border-red-300/30 beacon-ring beacon-ring-delay" /><div className="absolute size-2 rounded-full bg-red-100 shadow-[0_0_28px_10px_rgba(248,113,113,.75)]" /><Radio className="absolute -top-7 size-4 text-red-200 animate-pulse" /></div>
    <div className="absolute left-[12%] top-[35%] font-mono text-[8px] uppercase tracking-wider text-red-200/70 animate-[float_4s_ease-in-out_infinite]">signal // received</div><div className="absolute right-[10%] bottom-[31%] font-mono text-[8px] uppercase tracking-wider text-red-200/70 animate-[float_5s_ease-in-out_infinite_reverse]">latency // 14ms</div>
    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] text-slate-600"><span>mail://nibru</span><span className="text-red-200/70">encrypted / ready</span></div>
  </div>
}

function HumanModelStudio() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-300/20 bg-[#0a101b] shadow-[0_0_70px_rgba(248,113,113,.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,113,113,.14),transparent_42%)]" />
      <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-slate-500"><span>human ↔ model / co-pilot loop</span><span className="flex items-center gap-2 text-red-300"><span className="size-1.5 animate-pulse rounded-full bg-red-300" /> recording</span></div>
      <div className="relative grid md:grid-cols-[1fr_auto_1fr]">
        <div className="p-5 sm:p-6"><div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-red-200"><span>human_mentor.ts</span><span className="text-slate-600">typing...</span></div><div className="space-y-2 font-mono text-xs leading-6 text-slate-400"><p><span className="text-slate-600">01</span> <span className="text-red-300">const</span> lesson = <span className="text-white">teach</span>(model, {'{'}</p><p className="pl-5 text-red-100">constraint: <span className="text-slate-300">&quot;prove O(N)&quot;</span>,</p><p className="pl-5 text-red-100">edgeCases: <span className="text-slate-300">true</span>,</p><p className="pl-5 text-red-100">tone: <span className="text-slate-300">&quot;explain, don&apos;t guess&quot;</span></p><p>{'}'})</p><p className="mt-3 text-red-300/70">// make the reasoning visible</p></div></div>
        <div className="relative flex items-center justify-center border-y border-white/10 px-4 py-5 md:border-x md:border-y-0"><div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-red-300/50 to-transparent" /><div className="relative flex size-14 items-center justify-center rounded-full border border-red-300/40 bg-red-950/60 text-red-200 shadow-[0_0_30px_rgba(248,113,113,.25)] animate-[pulse-ring_3s_ease-out_infinite]"><Sparkles className="size-5" /></div><div className="absolute -top-2 size-1 rounded-full bg-red-200 shadow-[0_0_12px_3px_rgba(254,202,202,.8)] animate-[orbit_4s_linear_infinite]" /></div>
        <div className="p-5 sm:p-6"><div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-red-200"><span>model_response.py</span><span className="text-red-300">learning</span></div><div className="space-y-2 font-mono text-xs leading-6 text-slate-400"><p><span className="text-slate-600">01</span> <span className="text-red-300">def</span> <span className="text-white">find_pair</span>(nums, target):</p><p><span className="text-slate-600">02</span> <span className="pl-4 text-red-100">seen = {'{}'}</span></p><p><span className="text-slate-600">03</span> <span className="pl-4 text-red-100">for i, value in enumerate(nums):</span></p><p><span className="text-slate-600">04</span> <span className="pl-4 text-red-100">if target - value in seen:</span></p><p className="text-red-300/70">// rationale attached ✓</p></div></div>
      </div>
      <div className="relative flex flex-wrap items-center gap-3 border-t border-white/10 px-4 py-3 font-mono text-[9px] uppercase tracking-wider text-slate-600"><span className="text-red-300">live transfer</span><span>prompt → critique → rewrite → verify</span><span className="ml-auto flex items-center gap-1 text-red-200"><Activity className="size-3" /> 42 tokens/s</span></div>
    </div>
  )
}

function GlobalContactMap() {
  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
  const locations = [[-1.286, 36.817], [40.7128, -74.006], [51.5072, -0.1276], [35.6762, 139.6503]]
  return <div aria-label="Animated world map showing remote collaboration locations" role="img" className="relative min-h-80 overflow-hidden rounded-xl border border-red-300/15 bg-[#080d16]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,113,113,.12),transparent_58%)]" /><div className="absolute inset-x-[8%] inset-y-10 overflow-hidden rounded-[50%] globe-rotation" aria-hidden="true"><ComposableMap projectionConfig={{ scale: 145 }} className="absolute inset-0 size-full"><Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#182235" stroke="#334155" strokeWidth={0.35} style={{ default: { outline: 'none' }, hover: { fill: '#3f1d2a', outline: 'none' }, pressed: { outline: 'none' } }} />)}</Geographies>{locations.map(([lat, lon], index) => <Marker key={`${lat}-${lon}`} coordinates={[lon, lat]}><circle r={3.5} fill="#fda4af" className="map-ping" style={{ animationDelay: `${index * -0.7}s` }} /><circle r={10} fill="none" stroke="#fb7185" strokeOpacity={0.45} className="map-ping" style={{ animationDelay: `${index * -0.7}s` }} /></Marker>)}</ComposableMap></div><svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><path className="flight-path" d="M250 220 Q390 80 485 175 T640 165" /><path className="flight-path flight-path-delay" d="M250 220 Q430 300 640 165" /><circle className="flight-dot" cx="250" cy="220" r="3" /><circle className="flight-dot flight-dot-delay" cx="250" cy="220" r="3" /></svg><div className="absolute inset-x-4 top-4 flex justify-between font-mono text-[9px] uppercase tracking-[.18em] text-red-200/70"><span>remote_mesh / global</span><span className="text-red-300">4 nodes online</span></div><div className="absolute left-5 top-14 rounded border border-red-300/20 bg-[#090d16]/75 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-red-200 backdrop-blur">Nairobi / HQ</div><div className="absolute right-5 top-20 rounded border border-white/10 bg-[#090d16]/75 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-slate-400 backdrop-blur">global clients</div><div className="absolute inset-x-4 bottom-4 flex justify-between font-mono text-[9px] text-slate-600"><span>Nairobi ↔ everywhere</span><span className="text-red-300/70">signal latency 142ms</span></div></div>
}

function CodePanel({ title, status, statusClass, code, tags }: { title: string; status: string; statusClass: string; code: string; tags: string[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b111c]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <Circle className="size-2.5 fill-current text-slate-600" />
          <span>{title}</span>
        </div>
        <span className={`rounded-full px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>{status}</span>
      </div>
      <pre className="min-h-[284px] overflow-x-auto p-5 font-mono text-[12px] leading-6 text-slate-300"><code>{code}</code></pre>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
        {tags.map((tag) => <span key={tag} className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-slate-400">{tag}</span>)}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090d16] text-slate-100 selection:bg-red-400/30 selection:text-red-100">
      <CursorSignal />
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="site-constellation" aria-hidden="true"><span className="constellation-node constellation-node-a" /><span className="constellation-node constellation-node-b" /><span className="constellation-node constellation-node-c" /><span className="constellation-line constellation-line-a" /><span className="constellation-line constellation-line-b" /></div>
<nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
  <div className="command-dock relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.12] bg-[#0b111c]/80 px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl lg:px-4">
  <a href="#overview" className="group flex items-center gap-3 rounded-xl px-2 py-1.5 font-mono text-sm font-bold tracking-tight text-white transition hover:bg-white/[0.06]" aria-label="Nibru Eval home"><span className="flex size-7 items-center justify-center rounded-lg border border-red-300/30 bg-red-400/10 text-[10px] text-red-300 transition group-hover:rotate-12"><span className="size-1.5 rounded-full bg-red-300 shadow-[0_0_12px_3px_rgba(248,113,113,.6)]" /></span><span><span className="text-red-400">NIBRU</span><span className="text-slate-500">/</span><span className="text-slate-300">EVAL</span></span></a>
  <div className="hidden items-center gap-1 rounded-xl border border-white/[0.08] bg-black/10 p-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 lg:flex">
  <a href="#overview" className="rounded-lg bg-white/[0.08] px-3 py-2 text-slate-200 transition hover:bg-red-400/10 hover:text-red-300">01 / Intro</a><a href="#about" className="rounded-lg px-3 py-2 transition hover:bg-red-400/10 hover:text-red-300">02 / About</a><a href="#evaluation" className="rounded-lg px-3 py-2 transition hover:bg-red-400/10 hover:text-red-300">03 / Eval</a><a href="#experience" className="rounded-lg px-3 py-2 transition hover:bg-red-400/10 hover:text-red-300">04 / Proof</a><a href="#contact" className="rounded-lg px-3 py-2 transition hover:bg-red-400/10 hover:text-red-300">05 / Contact</a>
  </div>
  <a href="#evaluation" className="flex items-center gap-2 rounded-xl border border-red-300/30 bg-red-400/10 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-200 transition hover:border-red-200/60 hover:bg-red-400/20 sm:px-4"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-red-300 opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-red-300" /></span><span className="hidden sm:inline">Live harness</span><Terminal className="size-3.5 sm:hidden" /><ArrowUpRight className="size-3.5" /></a>
  </div>
</nav>

      <section id="overview" className="relative z-10 flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 lg:px-12 lg:pb-20 lg:pt-40">
        <TeachingGraph />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090d16] via-[#090d16]/85 to-transparent lg:w-[72%]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-400/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-red-300"><span className="size-1.5 animate-pulse rounded-full bg-red-400" /> Open to AI training & evaluation</div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-7xl">Software Engineer <span className="text-red-400">& AI Code Evaluator</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">I make AI code <span className="text-slate-200">correct, clear, and production-ready.</span></p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#evaluation" className="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-red-400 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-[#07110f] transition hover:bg-red-300">See the evaluator <ArrowUpRight className="size-4" /></a><a href="mailto:nibruad16@gmail.com?subject=AI%20Evaluation%20Contract" className="pointer-events-auto inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-slate-300 transition hover:border-red-400/50 hover:text-white"><ArrowDownToLine className="size-4" /> Download AI resume</a></div>
          </div>
          <div className="mt-16 grid max-w-4xl grid-cols-1 border-y border-white/10 sm:grid-cols-3">
          {[['500+', 'Problems solved', 'LeetCode / Codeforces'], ['95%+', 'Task acceptance', 'AI evaluation'], ['Docker + Python', 'Sandboxed code', 'Production ready']].map(([value, label, sub], i) => <div key={value} className={`py-6 sm:px-6 ${i > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}><div className="font-mono text-2xl font-bold text-white">{value}</div><div className="mt-2 text-sm text-slate-300">{label}</div><div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-600">{sub}</div></div>)}
        </div>
        </div>
      </section>

      <section id="about" className="story-section relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-8">
        <SectionLabel number="02">Human layer</SectionLabel>
        <div className="grid items-center gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <AboutSignal />
          <div className="lg:pl-8">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.18em] text-red-300"><span className="size-1.5 rounded-full bg-red-300 shadow-[0_0_12px_3px_rgba(248,113,113,.6)]" /> about / the operator behind the signal</div>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">I teach systems to think with discipline.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">I work where software engineering meets model behavior: turning vague outputs into evidence, useful feedback, and code that can survive production.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">{[['01', 'Observe', 'Find the hidden failure'], ['02', 'Explain', 'Make the why visible'], ['03', 'Improve', 'Ship the stronger loop']].map(([number, title, body]) => <div key={number} className="border-l border-red-400/40 pl-4"><div className="font-mono text-[10px] text-red-300">{number}</div><div className="mt-2 text-sm font-medium text-white">{title}</div><div className="mt-1 text-xs leading-5 text-slate-500">{body}</div></div>)}</div>
            <div className="mt-9 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500"><span className="rounded-full border border-white/10 px-3 py-1.5">Nairobi → anywhere</span><span className="rounded-full border border-white/10 px-3 py-1.5">remote-native</span><span className="rounded-full border border-red-300/20 bg-red-400/5 px-3 py-1.5 text-red-200">judgment / online</span></div>
          </div>
        </div>
      </section>

      <section id="evaluation" className="story-section story-section-split relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-8">
        <SectionLabel number="01">Evaluation harness</SectionLabel>
        <div className="mb-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Interactive RLHF / SFT code evaluation</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Experience how I audit model outputs, detect subtle runtime bugs, and write gold-standard rationales.</p></div><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500"><span className="size-2 rounded-full bg-red-400" /> verifier online <span className="ml-2 text-slate-700">// v1.4.2</span></div></div>
        <EvaluatorPulse />
        <div className="rounded-2xl border border-white/10 bg-[#0e1522]/80 p-3 shadow-2xl shadow-black/20 sm:p-5"><div className="mb-5 flex flex-col gap-2 border-b border-white/10 px-2 pb-4 font-mono text-xs sm:flex-row sm:items-center sm:justify-between"><span className="text-slate-300">Problem: <span className="text-slate-500">Optimize O(N²) nested array search to O(N) with edge case handling</span></span><span className="text-slate-600">benchmark_042.py</span></div><div className="grid gap-4 lg:grid-cols-2"><CodePanel title="model_output_a.py" status="FAIL" statusClass="bg-red-400/10 text-red-300" code={failedCode} tags={['Logic bug', 'O(N²) complexity', 'No validation']} /><CodePanel title="gold_standard.py" status="PASS / PRODUCTION READY" statusClass="bg-red-400/10 text-red-300" code={goldCode} tags={['O(N) time', 'Type-safe', 'Input validated']} /></div><details className="group mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b111c]"><summary className="flex cursor-pointer list-none items-center justify-between p-4 font-mono text-xs text-slate-300"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-red-400" /> Evaluator rationale & Big-O breakdown</span><ChevronDown className="size-4 text-slate-500 transition group-open:rotate-180" /></summary><div className="grid gap-4 border-t border-white/10 p-4 text-sm leading-6 text-slate-400 lg:grid-cols-3"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-red-400">01 / Correctness</p>Response A returns the right answer on simple cases, but silently returns null for empty input and never validates the contract. The nested loop also fails the required performance bound.</div><div><p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-red-400">02 / Complexity</p>Response B stores prior values in a hash map. This reduces time from <span className="font-mono text-slate-200">O(N²)</span> to <span className="font-mono text-slate-200">O(N)</span> with <span className="font-mono text-slate-200">O(N)</span> auxiliary space.</div><div><p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-red-400">03 / Safety</p>Type hints, a docstring, explicit empty-input handling, and a single-pass invariant make the gold response production-ready and easier to audit.</div></div></details></div>
      </section>

      <section id="experience" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-8"><SectionLabel number="02">Track record</SectionLabel><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">A career built around better signals.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">From backend systems to model judgment, every role sharpened the same instinct: make complexity trustworthy.</p></div><div className="w-full max-w-md"><TrackRecordSignal /></div></div><div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{[['AfterQuery & Revelo', 'AI Technical Evaluator & Code Specialist', 'Auditing Python, JavaScript, and C++ code. Writing multi-turn rationales and curating datasets with Pandas / NumPy.', Code2], ['Africa to Silicon Valley', 'Competitive Programming Specialist', '500+ problems solved. 7th place in EtCPC City Cup. Mentoring across DP, graphs, trees, and optimization.', Network], ['Intertechub', 'Backend Engineer', 'Building Node.js / Express APIs, optimizing databases, and shipping containerized test suites with Docker.', Database]].map(([name, role, body, Icon]) => <article key={name as string} className="bg-[#0e1522] p-6 transition hover:bg-[#111b2b]"><Icon className="mb-12 size-5 text-red-400" /><h3 className="text-lg font-semibold text-white">{name as string}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-indigo-300">{role as string}</p><p className="mt-5 text-sm leading-6 text-slate-400">{body as string}</p></article>)}</div><div className="mt-8 grid gap-3 border-y border-white/10 py-5 lg:grid-cols-3"><div className="font-mono text-[10px] uppercase tracking-[.16em] text-red-300">career transmission</div><div className="lg:col-span-2 grid gap-4 sm:grid-cols-3"><div className="border-l border-red-400/40 pl-3"><div className="font-mono text-[10px] text-slate-500">2024 → now</div><div className="mt-1 text-sm font-medium text-white">AI evaluation</div><div className="mt-1 text-xs text-slate-500">Rationales, rubrics, reliability</div></div><div className="border-l border-white/10 pl-3"><div className="font-mono text-[10px] text-slate-500">2022 → 24</div><div className="mt-1 text-sm font-medium text-white">Backend systems</div><div className="mt-1 text-xs text-slate-500">APIs, data, containers</div></div><div className="border-l border-white/10 pl-3"><div className="font-mono text-[10px] text-slate-500">always on</div><div className="mt-1 text-sm font-medium text-white">Competitive craft</div><div className="mt-1 text-xs text-slate-500">500+ problems solved</div></div></div></div><div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><GlobalContactMap /><div className="rounded-xl border border-red-300/15 bg-[#0a101b] p-5"><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em] text-slate-500"><span>remote operating system</span><Globe2 className="size-4 text-red-300" /></div><h3 className="mt-10 text-2xl font-semibold tracking-tight text-white">One desk. Every timezone.</h3><p className="mt-3 text-sm leading-6 text-slate-400">I work asynchronously across continents, turning code review, model feedback, and difficult edge cases into a shared live signal.</p><div className="mt-8 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-wider"><div className="rounded-lg border border-white/10 bg-white/[0.03] p-3"><span className="block text-slate-600">base</span><span className="mt-1 block text-red-200">Nairobi, KE</span></div><div className="rounded-lg border border-white/10 bg-white/[0.03] p-3"><span className="block text-slate-600">coverage</span><span className="mt-1 block text-red-200">UTC−08 → UTC+09</span></div></div><div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-red-300"><span className="size-1.5 animate-pulse rounded-full bg-red-300" /> accepting remote missions</div></div></div></section>

      <section id="projects" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-8"><SectionLabel number="03">Verified systems</SectionLabel><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Live verification & project showcase</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Systems designed to keep model outputs observable, testable, and ready for the real world.</p></div><span className="font-mono text-xs text-slate-600">03 systems / shipped</span></div><div className="mt-8"><SystemTelemetry /></div><div className="mt-6 grid gap-4 md:grid-cols-3">{[['LLM code evaluation harness', 'A Python & Docker sandbox framework that runs model-generated code against unit tests, memory caps, and adversarial edge cases.', ['Python', 'Docker', 'AST parsing', 'JSON benchmarks'], Container], ['Data validation & preprocessing engine', 'Automated pipelines for cleaning and curating ground-truth datasets for reliable model fine-tuning.', ['Pandas', 'NumPy', 'SciPy', 'Data curation'], Zap], ['Competitive programming repository', 'An organized collection of 500+ optimized solutions across graph theory, dynamic programming, and trees.', ['C++', 'Python', 'Big-O optimization'], Code2]].map(([title, body, tags, Icon]) => <article key={title as string} className="group rounded-xl border border-white/10 bg-[#0e1522] p-6"><div className="flex items-start justify-between"><Icon className="size-5 text-indigo-300" /><ExternalLink className="size-4 text-slate-600 transition group-hover:text-red-400" /></div><h3 className="mt-12 text-lg font-semibold text-white">{title as string}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">{body as string}</p><div className="mt-6 flex flex-wrap gap-2">{(tags as string[]).map(tag => <span key={tag} className="rounded bg-white/[0.05] px-2 py-1 font-mono text-[10px] text-slate-400">{tag}</span>)}</div></article>)}</div></section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8"><SectionLabel number="04">Technical arsenal</SectionLabel><div className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_.8fr]"><HumanModelStudio /><div className="hidden rounded-2xl border border-white/10 bg-[#0e1522] p-5 lg:block"><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em] text-slate-500"><span>training_console</span><Cpu className="size-4 text-red-300" /></div><div className="mt-8 space-y-5">{[['attention', '98.7%', 'red'], ['alignment', '94.2%', 'red'], ['hallucination risk', '02.1%', 'slate']].map(([label, value, color]) => <div key={label}><div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-wider"><span className="text-slate-500">{label}</span><span className={color === 'red' ? 'text-red-300' : 'text-slate-400'}>{value}</span></div><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full bg-red-300 ${label === 'hallucination risk' ? 'w-[18%]' : label === 'attention' ? 'w-[88%]' : 'w-[76%]'} animate-[signal_3s_ease-in-out_infinite]`} /></div></div>)}</div><div className="mt-8 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-red-200/70"><Radio className="size-3" /> feedback loop stable</div></div></div><div className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">{Object.entries(skills).map(([category, items]) => <div key={category}><h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">{category}</h3><div className="mt-4 flex flex-wrap gap-2">{items.map(skill => <span key={skill} className="group rounded-md border border-white/10 bg-[#0e1522] px-3 py-2 font-mono text-xs text-slate-300 transition hover:-translate-y-1 hover:border-red-400/50 hover:bg-red-950/30 hover:text-red-300">{skill}<MousePointer2 className="ml-1 inline size-3 opacity-0 transition group-hover:opacity-60" /></span>)}</div></div>)}</div></section>

      <section id="contact" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 pt-20 lg:px-8"><div className="grid overflow-hidden rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-400/[0.12] via-[#0e1522] to-indigo-500/[0.08] p-5 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:p-10"><div className="max-w-2xl p-3 sm:p-4"><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">// open to collaboration</p><h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Ready to elevate your model&apos;s code generation quality?</h2><p className="mt-5 text-sm leading-6 text-slate-400">Available for remote tasking on rustBench, Micro1, Turing, Scale AI, or direct specialized AI contracts.</p><div className="mt-8 flex flex-wrap gap-3"><a href="mailto:nibruad16@gmail.com" className="inline-flex items-center gap-2 rounded-md bg-red-400 px-4 py-3 font-mono text-xs font-bold text-[#07110f] hover:bg-red-300"><Mail className="size-4" /> nibruad16@gmail.com</a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-md border border-white/15 p-3 text-slate-300 hover:border-white/35 hover:text-white"><Code2 className="size-4" /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md border border-white/15 p-3 text-slate-300 hover:border-white/35 hover:text-white"><Network className="size-4" /></a></div></div><ContactBeacon /></div><footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-7 font-mono text-[10px] uppercase tracking-wider text-slate-600 sm:flex-row"><span>© 2026 Nibru Kefyalew Tessema</span><span>Built for AI model evaluation</span></footer></section>
    </main>
  )
}
