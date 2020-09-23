import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import route from "./routes/route.ts";
import config from "./config/config.ts";

const app = new Application();

app.use(oakCors());
app.use(route.routes());
app.use(route.allowedMethods());

console.log(`Server at ${config.PORT}`);
await app.listen({ port: config.PORT });