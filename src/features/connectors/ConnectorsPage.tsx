import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { connectors } from '@/lib/mock/connectors';

export function ConnectorsPage() {
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
            {connectors.map((connector) => (
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
