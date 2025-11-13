import { ErrorState } from '@/components/status/ErrorState';
import { LoadingState } from '@/components/status/LoadingState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useConnectors } from '@/lib/api';

export function ConnectorsPage() {
  const { data, isLoading, isError, refetch } = useConnectors();

  if (isLoading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <LoadingState message="Syncing connector catalog" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <ErrorState
          title="Connectors are unavailable"
          description="We could not retrieve integration metadata. Please retry or check the observability dashboard."
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connectors</CardTitle>
        <CardDescription>Manage data, communication, and automation bridges feeding your agents.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last sync</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((connector) => (
              <TableRow key={connector.id}>
                <TableCell className="text-text-primary">{connector.name}</TableCell>
                <TableCell className="capitalize">{connector.type}</TableCell>
                <TableCell className="capitalize">{connector.status}</TableCell>
                <TableCell>{connector.owner}</TableCell>
                <TableCell>{connector.lastSync}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
