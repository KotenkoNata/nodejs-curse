import { serve } from "https://deno.land/std/http/server.ts";

const handler = (req: Request): Response => {
    return new Response("Hello World");
};

serve(handler, { port: 3000 });


