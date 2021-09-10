import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataBase implements InMemoryDbService{

    createDb(){
        const categories = [
            {id:1, name:"Moradia", description:"Pagamento de conta da casa"},
            {id:2, name:"Saúde", description:"Plano de saúde e remédios"},
            {id:3, name:"Lazer", description:"Cinema, parque, praia, etc."},
            {id:4, name:"Salário", description:"Recebimento de salário"},
            {id:5, name:"Freelas", description:"Trabalho com freelancer"}
        ];
        return {categories};
    }
}