import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            { name: 'Black Unisex Printed Tee', price: 999, image: '/1.jpg' },
            { name: 'Space Print Tee', price: 699, image: '/2.jpg' },
            { name: 'Palm Angels Black', price: 999, image: '/3.jpg' },
            { name: 'AQUAS White Unisex', price: 699, image: '/4.jpg' },
            { name: 'Back Print Black Tee', price: 999, image: '/5.jpg' },
            { name: 'Pacman Tee', price: 499, image: '/6.jpg' },
            { name: 'I am so busy today tee Womens', price: 599, image: '/7.jpg' },
            { name: 'White Nike Logo', price: 999, image: '/8.jpg' },
            { name: 'White Back Print Tee', price: 999, image: '/9.jpg' },
            { name: 'Purple Drop SHoulder', price: 899, image: '/10.jpg' },
            { name: 'Blue Mesh Tee', price: 1299, image: '/11.jpg' },
            { name: 'Womens Black Tee', price: 499, image: '/12.jpg' },
        ],
    });

    console.log('Data seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        if (prisma) {
            await prisma.$disconnect();
        }
    });