import * as z from "zod"
/**
 * This Schema decribe about enviroment variable
 */
export const configSchema = z.object({
    AUTH_SECRET: z.string().optional(),
    NEXT_PUBLIC_BASE_URL: z.string(),
})


