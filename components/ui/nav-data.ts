import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Brain,
  Briefcase,
  CheckCircle,
  Cloud,
  Code,
  DollarSign,
  FlaskConical,
  Github,
  Globe,
  Headphones,
  Inbox,
  Mail,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Network,
  Palette,
  Puzzle,
  Radio,
  Repeat,
  Rocket,
  Scale,
  Server,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  TestTube,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

export type NavItem = {
  href: string
  title: string
  description?: string
  meta?: string
  iconSrc?: string
  brandMark?: 'notion' | 'linear'
  icon: LucideIcon
  iconColor: string
  bgColor: string
}

export type HeaderDropdownGroup = {
  key: string
  label: string
  variant: 'catalog' | 'features' | 'resources'
  items: NavItem[]
  sections?: { label: string; items: NavItem[] }[]
  footerText: string
  footerLabel: string
  footerHref: string
}

export const featureNavItems: NavItem[] = [
  { href: '/buddy-personal-assistant', title: 'Buddy', description: 'Personal iMessage agent with a computer', icon: MessageCircle, iconColor: 'text-fern-700', bgColor: 'bg-emerald-50' },
  { href: '/characters', title: 'Characters', description: 'Pick how your virtual team looks', icon: Palette, iconColor: 'text-pink-500', bgColor: 'bg-rose-50' },
  { href: '/features/ai-workforce', title: 'AI Workforce', description: 'Multiple AI employees working together', icon: Users, iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { href: '/features/github-integration', title: 'GitHub Integration', description: 'Autonomous commits, PRs, and code reviews', icon: Github, iconColor: 'text-slate-700', bgColor: 'bg-slate-50' },
  { href: '/features/task-execution', title: 'Task Execution', description: 'End-to-end task completion, not just answers', icon: CheckCircle, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/persistent-memory', title: 'Persistent Memory', description: 'Remembers context across all tasks', icon: Brain, iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { href: '/features/browser-control', title: 'Browser Control', description: 'Navigate web, fill forms, extract data', icon: Globe, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/system-access', title: 'Full System Access', description: 'Execute scripts, manage files, run commands', icon: Terminal, iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { href: '/features/email-automation', title: 'Email & Communication', description: 'Gmail, Slack, Discord integration', icon: Mail, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/features/inbox', title: 'Powerful Inbox', description: 'CRM + every channel in one place', icon: Inbox, iconColor: 'text-sky-500', bgColor: 'bg-sky-50' },
  { href: '/features/skills-plugins', title: 'Skills & Plugins', description: 'Extend with community or custom skills', icon: Puzzle, iconColor: 'text-violet-500', bgColor: 'bg-violet-50' },
  { href: '/primitives', title: 'Agent Primitives', description: 'Composable real-world capabilities for agents', icon: Puzzle, iconColor: 'text-lime-600', bgColor: 'bg-lime-50' },
  { href: '/loops', title: 'Agent Loops', description: 'Prompt-only loops for CI, review, and testing', icon: Repeat, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { href: '/features/multi-agent-collaboration', title: 'Multi-Agent Teams', description: 'AI employees collaborate on complex tasks', icon: Network, iconColor: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { href: '/features/openclaw-powered', title: 'OpenClaw Runtime', description: 'Built on the proven OpenClaw framework', icon: Sparkles, iconColor: 'text-pink-500', bgColor: 'bg-pink-50' },
  { href: '/self-host', title: 'Self-host', description: 'Open source on your laptop or VM', icon: Server, iconColor: 'text-stone-600', bgColor: 'bg-stone-50' },
  { href: '/benchmarks', title: 'Benchmarks', description: 'Harness and model Elo, cost, and time', icon: BarChart3, iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
  { href: '/plugin', title: 'Plugins', description: 'HubSpot, GitHub, Slack & 1,000+ plugins', icon: Zap, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/integration', title: 'OpenClaw Skills', description: '3,000+ community skills catalog', icon: Puzzle, iconColor: 'text-violet-500', bgColor: 'bg-violet-50' },
  { href: '/features/chat-interfaces', title: 'Chat Anywhere', description: 'WhatsApp, Telegram, Discord, Slack, Signal', icon: MessageCircle, iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { href: '/channels', title: 'Messaging Channels', description: 'Connect Slack, WhatsApp, Telegram & more', icon: MessagesSquare, iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
]

export const channelNavItems: NavItem[] = [
  { href: '/channels/slack', title: 'Slack', description: 'Command from channels and DMs', icon: MessageCircle, iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { href: '/channels/whatsapp', title: 'WhatsApp', description: 'Mobile field command via Business API', icon: MessageCircle, iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { href: '/channels/telegram', title: 'Telegram', description: 'Bot-based messaging', icon: MessageCircle, iconColor: 'text-sky-500', bgColor: 'bg-sky-50' },
  { href: '/channels/discord', title: 'Discord', description: 'Server and DM integration', icon: MessageCircle, iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { href: '/channels/signal', title: 'Signal', description: 'Encrypted messaging', icon: MessageCircle, iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { href: '/channels/imessage', title: 'iMessage', description: 'Mac relay bridge', icon: MessageCircle, iconColor: 'text-slate-500', bgColor: 'bg-slate-50' },
  { href: '/channels/email', title: 'Email', description: 'IMAP/SMTP inbox command', icon: Mail, iconColor: 'text-red-500', bgColor: 'bg-red-50' },
]

export const teamNavItems: NavItem[] = [
  { href: '/teams/coding', title: 'Coding', description: 'Code, PRs & task board', icon: Terminal, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/teams/marketing', title: 'Marketing', description: 'Campaigns & content', icon: Megaphone, iconColor: 'text-pink-500', bgColor: 'bg-pink-50' },
  { href: '/teams/sales', title: 'Sales', description: 'Leads & deal pipeline', icon: TrendingUp, iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { href: '/teams/lawyers', title: 'Legal', description: 'Contracts & compliance', icon: Scale, iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { href: '/teams/engineering', title: 'Engineering', description: 'Builds, tests & reviews', icon: Code, iconColor: 'text-slate-600', bgColor: 'bg-slate-50' },
  { href: '/teams/design', title: 'Design', description: 'Designs & brand assets', icon: Palette, iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { href: '/teams/customer-support', title: 'Customer Support', description: 'Support & customer care', icon: Headphones, iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { href: '/teams/operations', title: 'Operations', description: 'Processes & automation', icon: Settings, iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { href: '/teams/finance', title: 'Finance', description: 'Planning & analysis', icon: DollarSign, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/teams/business-development', title: 'Business Development', description: 'Partnerships & growth', icon: Briefcase, iconColor: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { href: '/teams/research', title: 'Research', description: 'Markets & data', icon: FlaskConical, iconColor: 'text-violet-500', bgColor: 'bg-violet-50' },
  { href: '/teams/security', title: 'Security', description: 'Audits & threat checks', icon: Shield, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { href: '/teams/pr', title: 'PR', description: 'Media & communications', icon: Radio, iconColor: 'text-fuchsia-500', bgColor: 'bg-fuchsia-50' },
  { href: '/teams/growth', title: 'Growth', description: 'Acquisition & retention', icon: Rocket, iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
  { href: '/industries', title: 'Industries', description: 'Playbooks by vertical', icon: Briefcase, iconColor: 'text-stone-500', bgColor: 'bg-stone-50' },
]

const pluginNavItems: NavItem[] = [
  { href: '/plugin/ai_agent_for_github', title: 'GitHub', description: 'PRs, issues and code', icon: Github, iconColor: 'text-white', bgColor: 'bg-gradient-to-br from-slate-600 to-slate-950' },
  { href: '/plugin/ai_agent_for_gmail', title: 'Gmail', description: 'Read and manage email', icon: Mail, iconColor: 'text-white', bgColor: 'bg-gradient-to-br from-red-400 to-rose-700' },
  { href: '/plugin/ai_agent_for_slack', title: 'Slack', description: 'Messages and channels', icon: MessagesSquare, iconColor: 'text-white', bgColor: 'bg-gradient-to-br from-fuchsia-500 to-violet-800' },
  { href: '/plugin/ai_agent_for_notion', title: 'Notion', description: 'Docs and knowledge base', icon: Inbox, iconColor: 'text-[#171717]', bgColor: 'bg-white', brandMark: 'notion' },
  { href: '/plugin/ai_agent_for_linear', title: 'Linear', description: 'Issues and project triage', icon: CheckCircle, iconColor: 'text-white', bgColor: 'bg-gradient-to-br from-violet-500 to-pink-700', brandMark: 'linear' },
  { href: '/plugin/ai_agent_for_figma', title: 'Figma', description: 'Designs and prototypes', icon: Palette, iconColor: 'text-white', bgColor: 'bg-white', iconSrc: '/images/desktop/dock/figma.svg' },
]

const skillCategories: NavItem[] = [
  { href: `/integration?category=${encodeURIComponent('AI & LLMs')}`, title: 'AI & LLMs', description: '287 AI and model skills', icon: Brain, iconColor: 'text-violet-700', bgColor: 'bg-violet-100' },
  { href: `/integration?category=${encodeURIComponent('Coding Agents & IDEs')}`, title: 'Coding agents', description: '132 coding skills', icon: Code, iconColor: 'text-sky-700', bgColor: 'bg-sky-100' },
  { href: `/integration?category=${encodeURIComponent('DevOps & Cloud')}`, title: 'DevOps & cloud', description: '212 cloud and DevOps skills', icon: Cloud, iconColor: 'text-blue-700', bgColor: 'bg-blue-100' },
  { href: `/integration?category=${encodeURIComponent('Search & Research')}`, title: 'Search & research', description: '252 research skills', icon: FlaskConical, iconColor: 'text-amber-700', bgColor: 'bg-amber-100' },
  { href: `/integration?category=${encodeURIComponent('Web & Frontend Development')}`, title: 'Web development', description: '201 web development skills', icon: Globe, iconColor: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  { href: `/integration?category=${encodeURIComponent('Marketing & Sales')}`, title: 'Marketing & sales', description: '143 growth skills', icon: TrendingUp, iconColor: 'text-rose-700', bgColor: 'bg-rose-100' },
]

const loopCategories: NavItem[] = [
  { href: `/loops?category=${encodeURIComponent('Operations')}`, title: 'Operations', description: '17 operations workflows', icon: Settings, iconColor: 'text-orange-700', bgColor: 'bg-orange-100' },
  { href: `/loops?category=${encodeURIComponent('Finance')}`, title: 'Finance', description: '18 finance workflows', icon: DollarSign, iconColor: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  { href: `/loops?category=${encodeURIComponent('Integrations')}`, title: 'Integrations', description: '14 connected-tool workflows', icon: Puzzle, iconColor: 'text-violet-700', bgColor: 'bg-violet-100' },
  { href: `/loops?category=${encodeURIComponent('Design')}`, title: 'Design', description: '12 design workflows', icon: Palette, iconColor: 'text-pink-700', bgColor: 'bg-pink-100' },
  { href: `/loops?category=${encodeURIComponent('Security')}`, title: 'Security', description: '12 security workflows', icon: Shield, iconColor: 'text-blue-700', bgColor: 'bg-blue-100' },
  { href: `/loops?category=${encodeURIComponent('Testing')}`, title: 'Testing', description: '5 testing workflows', icon: TestTube, iconColor: 'text-cyan-700', bgColor: 'bg-cyan-100' },
]

const resourceSections = [
  {
    label: 'Guides',
    items: [
      { href: '/features/ai-workforce', title: 'Meet your AI workforce', description: 'A practical introduction to Trooper', icon: Users, iconColor: 'text-violet-700', bgColor: 'bg-violet-100' },
      { href: '/features/task-execution', title: 'How agents get work done', description: 'From a request to a finished task', icon: CheckCircle, iconColor: 'text-emerald-700', bgColor: 'bg-emerald-100' },
      { href: '/self-host', title: 'Self-host Trooper', description: 'Run your own private instance', icon: Server, iconColor: 'text-blue-700', bgColor: 'bg-blue-100' },
    ],
  },
  {
    label: 'Compare',
    items: [
      { href: '/alternatives', title: 'AI agent alternatives', description: 'Compare agent apps and runtimes', icon: Scale, iconColor: 'text-indigo-700', bgColor: 'bg-indigo-100' },
      { href: '/ai-coding-ide', title: 'AI coding tools', description: 'Compare coding agents and IDEs', icon: Code, iconColor: 'text-sky-700', bgColor: 'bg-sky-100' },
      { href: '/benchmarks', title: 'Model benchmarks', description: 'Compare quality, speed and cost', icon: BarChart3, iconColor: 'text-amber-700', bgColor: 'bg-amber-100' },
    ],
  },
] satisfies { label: string; items: NavItem[] }[]

export const headerDropdownGroups = [
  {
    key: 'features', label: 'Features', variant: 'features', items: featureNavItems,
    footerText: `Explore all ${featureNavItems.length} platform capabilities.`, footerLabel: 'Start here', footerHref: '/features/ai-workforce',
  },
  {
    key: 'plugins', label: 'Plugins', variant: 'catalog', items: pluginNavItems,
    footerText: 'Apps your agents can use.', footerLabel: 'Browse plugins', footerHref: '/plugin',
  },
  {
    key: 'guides', label: 'Guides', variant: 'resources', sections: resourceSections,
    items: resourceSections.flatMap((section) => section.items),
    footerText: 'Guides to get started and comparisons to choose well.', footerLabel: 'All comparisons', footerHref: '/alternatives',
  },
  {
    key: 'skills', label: 'Skills', variant: 'catalog', items: skillCategories,
    footerText: 'Browse thousands of community-built skills.', footerLabel: 'All skills', footerHref: '/integration',
  },
  {
    key: 'loops', label: 'Loops', variant: 'catalog', items: loopCategories,
    footerText: 'Reusable loops, with clear checks and finish lines.', footerLabel: 'All loops', footerHref: '/loops',
  },
  {
    key: 'teams', label: 'For Teams', variant: 'catalog', items: teamNavItems,
    footerText: 'Explore Trooper teams by role and industry.', footerLabel: 'All teams', footerHref: '/industries',
  },
] satisfies readonly HeaderDropdownGroup[]

export const headerDirectLinks = [
  { href: '/resellers', label: 'Resellers' },
  { href: '/pricing', label: 'Pricing' },
] as const
