import '@app/design/chat/process-shim.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { applyColorTheme, applyTeamAccent } from '@/lib/lookAndFeel.js';
import { writeCachedComposerCatalog } from '@/lib/orgRuntimeCache.js';
import { PREVIEW_ORG_ID } from '@app/design/chat/fixtures.js';
import { installPreviewNet } from '@app/design/chat/install-preview-net.js';
import { useStore } from '@/stores/useStore.js';
import { applyLandingFixture } from './landingFixture.js';
import LandingApp from './LandingApp.jsx';

writeCachedComposerCatalog(PREVIEW_ORG_ID, {
  models: [{ id: 'openrouter/z-ai/glm-5.3-flash', name: 'Trooper Auto', provider: 'openrouter' }],
  currentModelId: 'openrouter/z-ai/glm-5.3-flash',
  presentationMode: 'auto',
  thinkingLevel: 'auto',
  selectionConfirmed: true,
});
applyColorTheme('ink');
applyTeamAccent('pastel');
installPreviewNet();
try {
  localStorage.setItem('trooper:messenger-connect-banner-dismissed', '1');
  localStorage.setItem('trooper:composer-permissions-nudge-dismissed-v1', '1');
} catch {}

const paintPreview = () => applyLandingFixture();
paintPreview();
useStore.persist?.onFinishHydration?.(paintPreview);
if (useStore.persist?.hasHydrated?.()) paintPreview();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingApp />
  </StrictMode>,
);
