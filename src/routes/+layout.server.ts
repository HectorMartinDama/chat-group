import type { Action, LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    return { session: await event.locals.getSession() }
}