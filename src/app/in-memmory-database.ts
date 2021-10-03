import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model'
import {Entry} from './pages/entries/shared/entry.model'
export class InMemoryDataBase implements InMemoryDbService {

    createDb() {
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "Pagamento de conta da casa" },
            { id: 2, name: "Saúde", description: "Plano de saúde e remédios" },
            { id: 3, name: "Lazer", description: "Cinema, parque, praia, etc." },
            { id: 4, name: "Salário", description: "Recebimento de salário" },
            { id: 5, name: "Freelas", description: "Trabalho com freelancer" }
        ];

        const entries: Entry[] = [
            { id: 1, name: "Casa", categoryId: categories[0].id, category: categories[0], paid: true, date: "13/09/2021", amount: "70.60", type: "expense", description: "Gás da cozinha" } as Entry,
            { id: 2, name: "Plano de saúde", categoryId: categories[1].id, category: categories[1], paid: false, date: "13/09/2021", amount: "70.60", type: "revenue", description: "Gás da cozinha" } as Entry,
            { id: 3, name: "Lazer", categoryId: categories[2].id, category: categories[2], paid: true, date: "13/09/2021", amount: "70.60", type: "expense", description: "Gás da cozinha" } as Entry,
            { id: 4, name: "Salário", categoryId: categories[3].id, category: categories[3], paid: false, date: "13/09/2021", amount: "70.60", type: "revenue", description: "Gás da cozinha" } as Entry,
            { id: 5, name: "Freelas", categoryId: categories[4].id, category: categories[4], paid: true, date: "13/09/2021", amount: "70.60", type: "expense", description: "Gás da cozinha" } as Entry
        ]

        return { categories, entries };
    }
}