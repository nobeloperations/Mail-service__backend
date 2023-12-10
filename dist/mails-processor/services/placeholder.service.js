"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const prisma_client_1 = __importDefault(require("../../database/prisma-client"));
const placeholderServiceCache = new node_cache_1.default({ stdTTL: 900 });
const getMapCollectionOfContactPlaceholders = async () => {
    if (placeholderServiceCache.get('mapCollectionOfContactPlaceholders')) {
        return placeholderServiceCache.get('mapCollectionOfContactPlaceholders');
    }
    const mapCollection = new Map();
    const placeholdersData = await prisma_client_1.default.contactDataPlacehodelr.findMany();
    for (const data of placeholdersData) {
        const { placeholderTag, contactFieldName } = data;
        mapCollection.set(placeholderTag, contactFieldName);
    }
    placeholderServiceCache.set('mapCollectionOfContactPlaceholders', mapCollection);
    return mapCollection;
};
exports.default = {
    getMapCollectionOfContactPlaceholders
};
//# sourceMappingURL=placeholder.service.js.map