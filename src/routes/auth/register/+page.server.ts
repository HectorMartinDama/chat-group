import { prisma } from "$lib/prisma.server";
import { fail, redirect } from "@sveltejs/kit";
import type { Action } from "svelte/action";
import bcrypt from 'bcrypt';


const register: Action= async ({ request }) =>{
    try {
        const data= await request.formData();
        const name= data.get('name');
        const email= data.get('email');
        const password= data.get('password');

        if(!name || !email || !password) return fail(400, { invalid: true });
        
        const hashedPassword= await bcrypt.hash(password as string, 12);

        const user= await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(user) return fail(400, { user: true });

        await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        throw redirect(303, '/auth');
    } catch (error) {
        return fail(500, { invalid: true });    
    }
}


export const actions= { register };