import { MagicCard } from '@/components/magicui/magic-card'
import { Button } from '@/components/ui/button'
import { plans } from '@/data/Plans'

const Pricing = () => {
    return (
        <>
            <h2 className="text-4xl font-bold mb-8 text-foreground">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {plans.map((plan) => (
                    <MagicCard
                        key={plan.title}
                        className={`p-8 rounded-2xl flex flex-col items-center bg-card ${plan.cardClass}`}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-card-foreground">{plan.title}</h3>
                        <p className="text-4xl font-bold mb-4 text-primary">
                            {plan.priceValue !== null ? (
                                <>
                                    ${plan.priceValue}
                                    <span className="text-base font-normal">/mo</span>
                                </>
                            ) : (
                                plan.price
                            )}
                        </p>
                        <ul className="mb-6 text-muted-foreground space-y-2 text-center">
                            {plan.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                        <Button
                            className={`w-full font-medium ${plan.highlight ? 'ring-2 ring-primary/70' : ''}`}
                            size="lg"
                        >
                            {plan.button}
                        </Button>
                    </MagicCard>
                ))}
            </div>
        </>
    );
};

export default Pricing