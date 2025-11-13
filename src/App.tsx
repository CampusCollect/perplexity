import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { AgentDetailPage } from '@/features/agents/AgentDetailPage';
import { AgentLandingRedirect } from '@/features/agents/AgentLandingRedirect';
import { ConnectorsPage } from '@/features/connectors/ConnectorsPage';
import { FlowDetailPage } from '@/features/flows/FlowDetailPage';
import { GovernancePage } from '@/features/governance/GovernancePage';
import { HomePage } from '@/features/home/HomePage';
import { LoginPage } from '@/features/auth/LoginPage';
import { OnboardingPage } from '@/features/onboarding/OnboardingPage';
import { RunDetailPage } from '@/features/runs/RunDetailPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { TemplatesPage } from '@/features/templates/TemplatesPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="connectors" element={<ConnectorsPage />} />
          <Route path="agents">
            <Route index element={<AgentLandingRedirect />} />
            <Route path=":id" element={<AgentDetailPage />} />
          </Route>
          <Route path="flows/:id" element={<FlowDetailPage />} />
          <Route path="runs/:id" element={<RunDetailPage />} />
          <Route path="governance" element={<GovernancePage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
