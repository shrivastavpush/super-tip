'use client'

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { DATA, FEATURES, TABS } from '@/data/Features';
import TabButton from '@/components/Features/TabButton';
import FeatureCard from '@/components/Features/FeatureCard';

const BarGraph = dynamic(() => import('@/components/Features/BarGraph'));


const Features = () => {
  const [tab, setTab] = useState('why');

  // Memoize mapped elements to avoid unnecessary re-renders
  const tabButtons = React.useMemo(
    () => TABS.map((t) => (
      <TabButton key={t.key} t={t} active={tab === t.key} onClick={() => setTab(t.key)} />
    )),
    [tab]
  );

  const featureCards = React.useMemo(
    () => FEATURES.map((f) => <FeatureCard key={f.title} f={f} />),
    []
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-white">Why Choose SuperTip?</h2>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {tabButtons}
      </div>
      {tab === 'why' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureCards}
        </div>
      )}
      {tab === 'compare' && (
        <div>
          <h3 className="text-xl text-gray-200 font-semibold mb-4 text-center">Earnings from ₹100 Donation</h3>
          <div className="flex flex-col gap-8">
            <BarGraph platform={DATA.other.name} value={DATA.other.received} cut={DATA.other.cut} breakdown={DATA.other.breakdown} />

            <BarGraph platform={DATA.supertip.name} value={DATA.supertip.received} cut={DATA.supertip.cut} breakdown={DATA.supertip.breakdown} />
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <span className="font-semibold text-gray-100">SuperTip</span> lets creators keep <span className="font-bold text-green-600">₹85</span> out of every ₹100 donated, compared to only <span className="font-bold text-red-500">₹56</span> on Other!
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Features);