import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { queryClient } from '@/lib/queryClient.js';
import AuthContext from '@/contexts/AuthContext.jsx';
import { VoiceLiveSessionProvider } from '@/contexts/VoiceLiveSession.jsx';
import AgentSidebar from '@/components/AgentSidebar.jsx';
import ChatPanel from '@/components/ChatPanel.jsx';
import KanbanBoard from '@/components/KanbanBoard.jsx';
import { previewAuthValue } from '@app/design/chat/fixtures.js';

export default function LandingApp() {
  const auth = previewAuthValue();
  auth.user.photoURL = 'https://avatars.githubusercontent.com/u/25829699?v=4';
  auth.userDoc.photoURL = auth.user.photoURL;
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider delayDuration={250} skipDelayDuration={120}>
          <AuthContext.Provider value={auth}>
            <VoiceLiveSessionProvider>
              <div className="trooper-landing-preview flex h-dvh min-h-0 min-w-0 overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
                <AgentSidebar
                  isOpen={false}
                  onClose={() => {}}
                  activePage="home"
                  setActivePage={() => {}}
                  onSelectChannel={() => {}}
                  onNewChat={() => {}}
                  onCommandPaletteOpen={() => {}}
                  onFocusClick={() => {}}
                  onActivityClick={() => {}}
                  onRefresh={() => {}}
                />
                <main className="flex min-h-0 min-w-0 flex-1 overflow-hidden bg-[var(--color-bg)]">
                  <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden" style={{ width: '42%' }}>
                    <ChatPanel channelId="general" sideShellOpen onOpenActivityDrawer={() => {}} onOpenArtifact={() => {}} />
                  </section>
                  <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-l border-[var(--color-border)] bg-[var(--color-bg)]">
                    <KanbanBoard />
                  </section>
                </main>
              </div>
            </VoiceLiveSessionProvider>
          </AuthContext.Provider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
