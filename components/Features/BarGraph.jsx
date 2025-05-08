const BarGraph = ({ platform, value, breakdown }) => {
    const creatorPercent = value;
    const segments = [
        {
            label: 'Creator Receives',
            percent: creatorPercent,
            color: 'bg-green-500',
            textColor: 'text-white',
        },
        ...breakdown.map((b) => ({
            label: b.label,
            percent: b.percent,
            color: b.color,
            textColor: 'text-white',
        })),
    ];

    return (
        <div className="mb-6">
            <div className="flex justify-between mb-2">
                <span className="font-semibold text-base text-white">{platform}</span>
                <span className="text-sm text-muted-foreground">Creator Receives: ₹{value} / ₹100</span>
            </div>
            <div className="flex h-8 rounded overflow-hidden border border-border bg-card w-full">
                {segments.map((seg, i) => (
                    <div
                        key={seg.label}
                        className={`flex items-center justify-center text-xs font-bold ${seg.textColor} ${seg.color}`}
                        style={{ width: `${seg.percent}%`, position: 'relative' }}
                        title={seg.label + ': ' + seg.percent + '%'}
                    >
                        {seg.percent > 10 ? `${seg.percent}%` : ''}

                        {seg.percent <= 10 && seg.percent > 0 ? (
                            <span className="w-1 h-1 rounded-full bg-white block" style={{ minWidth: 4, minHeight: 4 }}></span>
                        ) : null}
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-1 text-xs flex-wrap">
                {segments.map((seg) => (
                    <span key={seg.label} className={`${seg.color.replace('bg-', 'text-')} font-semibold`}>
                        {seg.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BarGraph;