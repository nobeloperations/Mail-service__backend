import NodeCache from 'node-cache';
import prismaClient from '../../database/prisma-client';

const placeholderServiceCache = new NodeCache({ stdTTL: 900 });

const getMapCollectionOfContactPlaceholders = async (): Promise<Map<string, string>> => {
    if (placeholderServiceCache.get('mapCollectionOfContactPlaceholders')) {
        return placeholderServiceCache.get('mapCollectionOfContactPlaceholders');
    }

    const mapCollection = new Map<string, string>();
    const placeholdersData = await prismaClient.contactDataPlacehodelr.findMany();
    
    for (const data of placeholdersData) {
        const { placeholderTag, contactFieldName } = data;

        mapCollection.set(placeholderTag, contactFieldName);
    }

    placeholderServiceCache.set('mapCollectionOfContactPlaceholders', mapCollection);

    return mapCollection;
};

export default {
    getMapCollectionOfContactPlaceholders
};