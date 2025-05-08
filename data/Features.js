export const TABS = [
    { label: 'Why SuperTip', key: 'why' },
    { label: 'Earnings Comparison', key: 'compare' },
];

export const FEATURES = [
    {
        title: 'More Money to Creators',
        desc: 'SuperTip charges only a 15% platform fee. This means creators keep more of every donation.',
        icon: '💸',
    },
    {
        title: 'Transparent & Simple',
        desc: 'No hidden charges. One flat fee. What you see is what you get.',
        icon: '🔍',
    },
    {
        title: 'Instant Payouts',
        desc: 'Faster withdrawal and payout process for creators.',
        icon: '⚡',
    },
    {
        title: 'Creator-First Approach',
        desc: 'We prioritize creators’ earnings and experience over everything else.',
        icon: '🌟',
    },
];

export const DATA = {
    other: {
        name: 'Other',
        received: 56,
        cut: 44,
        breakdown: [
            { label: 'Platform Cut', percent: 30, color: 'bg-red-500' },
            { label: 'Govt/Tax', percent: 14, color: 'bg-yellow-500' },
        ],
    },
    supertip: {
        name: 'SuperTip',
        received: 85,
        cut: 15,
        breakdown: [
            { label: 'SuperTip Platform Fee', percent: 15, color: 'bg-red-500' },
        ],
    },
};