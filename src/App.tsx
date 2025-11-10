import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { AgentDetailPage } from '@/features/agents/AgentDetailPage';
import { ConnectorsPage } from '@/features/connectors/ConnectorsPage';
import { FlowDetailPage } from '@/features/flows/FlowDetailPage';
import { GovernancePage } from '@/features/governance/GovernancePage';
import { HomePage } from '@/features/home/HomePage';
import { OnboardingPage } from '@/features/onboarding/OnboardingPage';
import { RunDetailPage } from '@/features/runs/RunDetailPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { TemplatesPage } from '@/features/templates/TemplatesPage';
import { AGENT_DEFAULT_ID } from '@/lib/mock/agents';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="connectors" element={<ConnectorsPage />} />
        <Route path="agents">
          <Route index element={<Navigate to={`/agents/${AGENT_DEFAULT_ID}`} replace />} />
          <Route path=":id" element={<AgentDetailPage />} />
        </Route>
        <Route path="flows/:id" element={<FlowDetailPage />} />
        <Route path="runs/:id" element={<RunDetailPage />} />
        <Route path="governance" element={<GovernancePage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
