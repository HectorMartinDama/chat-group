import { SvelteKitAuth } from '@auth/sveltekit';
import Github from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from '@auth/core/adapters';
import { prisma }  from '$lib/prisma.server';
import { redirect, type Handle, error } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from "bcrypt";


const authorization= async ({event, resolve}) =>{
    if(event.url.pathname.startsWith('/conversations') || event.url.pathname.startsWith('/users')){
        const session= await event.locals.getSession();
        if(!session) throw redirect(303, '/auth')
    }
    return resolve(event);
}


export const handle: Handle= sequence(
    SvelteKitAuth({
        adapter: PrismaAdapter(prisma) as Adapter,
        providers: [
            Github({clientId: GITHUB_ID, clientSecret: GITHUB_SECRET}), 
            Google({clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET}), 
            Credentials({
                name: 'credentials',
                credentials: {
                    email: { label: 'email', type: 'text' },
                    password: { label: 'password', type: 'password' }
                },
                async authorize(credentials){
                    if(!credentials.email || !credentials.password) throw error(422, 'Invalid Credentials');

                    const user= await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if(!user || !user.hashedPassword) throw error(422, 'Invalid Credentials');


                    const passwordCorrect= await bcrypt.compare(credentials.password, user.hashedPassword);

                    if(!passwordCorrect) throw error(422, 'Invalid Credentials');

                    return user;
                }
            })
        ],
        debug: process.env.NODE_ENV === 'development',
        session: {
            strategy: 'jwt'
        },
        secret: AUTH_SECRET 
    }),
    authorization
);