import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'dyfgavfh',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

//lets us use the sanity images
const builder = imageUrlBuilder(client);

//fetches the urls for the image source provided
export const urlFor = (source) => builder.image(source);