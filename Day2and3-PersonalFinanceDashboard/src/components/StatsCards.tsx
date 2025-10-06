interface StatsCardsProps {
    today: number;
    week: number;
    month: number;
    total: number;
}

export default function StatsCards({ today, week, month, total }: StatsCardsProps) {
    const fmt = new Intl.NumberFormat(undefined, {style: 'currency', currency: 'DKK'});

    const cards = [
        { label: "Today", value: today},
        { label: "This Week", value: week},
        { label: "This Month", value: month},
        { label: "Total", value: total},
    ];
    
    return (
        <div className="grid grid-cols-4 gap-4 mt-4">
            {cards.map((card) => (
                <div key={card.label} className="bg-white shadow rounded p-4 text-center">
                    <p className="text-sm text-gray-600">{card.label}</p>
                    <p className="text-lg font-semibold">{fmt.format(card.value)}</p>
                </div>
            ))}

        </div>
    )

}