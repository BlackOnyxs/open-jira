
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status:  string;
    createdAt:  number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'pending: Elit veniam enim mollit adipisicing officia anim fugiat non commodo officia ullamco est ipsum esse.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'pending: Elit veniam enim mollit adipisicing officia anim fugiat non commodo officia ullamco est ipsum esse.',
            status: 'pending',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'pending: Elit veniam enim mollit adipisicing officia anim fugiat non commodo officia ullamco est ipsum esse.',
            status: 'pending',
            createdAt: Date.now() - 1000000,
        },
    ]
}