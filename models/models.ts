/*
export interface Product{
    
    name : string,
    image :string,
    description: string,
}


export interface Products{
    rawMetadata: Product[],
}

*/

export interface Attributes{
    value: string,
    trait_type: string,
}


export interface Media{
    gateway: string,
}

export interface RawMetadata{    
    name: string,
    image: string,
    description: string,
    attributes: any[],
}

export interface Product{
    tokenId: number,
    title: string,
    media: Media[],
    description: string,
    rawMetadata: RawMetadata,
}

export interface NFTs{
    nfts: any[],
}

