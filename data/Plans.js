export const plans = [
    {
        title: 'Free',
        price: '$0/mo',
        priceValue: 0,
        features: [
            'Basic features',
            'Community support',
            'Single user',
        ],
        button: 'Get Started',
        cardClass: 'shadow-xl border border-border',
        highlight: false,
    },
    {
        title: 'Pro',
        price: '$19/mo',
        priceValue: 19,
        features: [
            'Everything in Free',
            'Advanced analytics',
            'Email support',
            'Up to 5 users',
        ],
        button: 'Start Pro',
        cardClass: 'shadow-2xl border-2 border-primary scale-105',
        highlight: true,
    },
    {
        title: 'Enterprise',
        price: 'Custom',
        priceValue: null,
        features: [
            'All Pro features',
            'Dedicated manager',
            'Custom integrations',
            'Unlimited users',
        ],
        button: 'Contact Sales',
        cardClass: 'shadow-xl border border-border',
        highlight: false,
    },
];