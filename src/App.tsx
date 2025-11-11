import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { CommandDeck } from '@/features/home/CommandDeck';
import { Placeholder } from '@/routes/Placeholder';

const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<CommandDeck />} />
        <Route path="/connectors" element={<Placeholder title="Connectors" description="Manage and monitor all enterprise integrations." />} />
        <Route path="/agents" element={<Placeholder title="Agents" description="Create, monitor, and optimize your autonomous teams." />} />
        <Route path="/flows" element={<Placeholder title="Flows" description="Design orchestrations and human-in-the-loop workflows." />} />
        <Route path="/governance" element={<Placeholder title="Governance" description="Set policy, compliance guardrails, and audit your AI fabric." />} />
        <Route path="/templates" element={<Placeholder title="Templates" description="Jumpstart automation with curated playbooks and best practices." />} />
        <Route path="*" element={<Placeholder title="404" description="We couldn't find that view. Choose another destination from the left navigation." />} />
      </Routes>
    </AppShell>
  );
};

export default App;
