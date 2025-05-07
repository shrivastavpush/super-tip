import { MagicCard } from '@/components/magicui/magic-card'

export const metadata = {
    title: "Pricing",
    description: "Pricing page"
}

const Pricing = () => {
    return (
        <section className="container mx-auto grid grid-cols-3 gap-4 h-screen">
            <MagicCard>
                <div className="p-4">
                    grid 1
                </div>
            </MagicCard>
            <MagicCard>
                <div className="p-4">
                    grid 2
                </div>
            </MagicCard>
            <MagicCard>
                <div className="p-4">
                    grid 3
                </div>
            </MagicCard>
        </section>
    )
}

export default Pricing