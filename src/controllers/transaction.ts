import { PrismaClient } from "@prisma/client";

import { ITransaction } from '../interface'
import { create, findMany, findUnique } from "../services/transaction";

const prisma = new PrismaClient();

export const createCrontroller = async ( data: ITransaction ) => {
    let requestIsOk = false;
    try {
        await create( data )
        .then(() => {
            requestIsOk = true;
        });
    }
    catch( err ) {    
        throw err;
    }
    finally{
        prisma.$disconnect;
        if ( requestIsOk ) {
            return 'Nouvelle transaction crée';
        }
        return 'Une erreur est survenue';
    };
};


export const findManyController = async () => {
    try {
        return await findMany();
    }
    catch(err) {
        throw err;    
    }
    finally{
        prisma.$disconnect;
    };
};

export const findUniqueController = async ( id:number ) => {
    try {
        return await findUnique( id );
    }
    catch(err) {
        throw err;    
    }
    finally{
        prisma.$disconnect;
    };
};
