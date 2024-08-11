import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CardWithStats = ({ title, value }) => {
  return (
    <Card className="w-[350px] mx-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const [stats, setStats] = React.useState({
    products: 150,
    sales: 320,
    revenue: '$12,500',
  });

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex space-x-4 mb-6">
        <CardWithStats title="Products in Inventory" value={stats.products} />
        <CardWithStats title="Number of Sales" value={stats.sales} />
        <CardWithStats title="Total Revenue" value={stats.revenue} />
      </div>

    </div>
  );
};

export default HomePage;
