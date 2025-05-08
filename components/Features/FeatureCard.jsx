import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const FeatureCard = React.memo(({ f }) => (
  <Card className="border-2 border-green-300 shadow-sm">
    <CardHeader className="flex flex-row items-center gap-4 p-6 pb-2">
      <span className="text-2xl text-white mb-0 border rounded-full p-2 bg-green-200/10 shadow-sm hover:bg-green-200 transition-colors duration-200">{f.icon}</span>
      <CardTitle className="text-green-500 mb-0">{f.title}</CardTitle>
    </CardHeader>
    <CardContent className="text-gray-800 pt-2">{f.desc}</CardContent>
  </Card>
));

export default FeatureCard;
