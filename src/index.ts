export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    switch (url.pathname) {
      case '/':
        return new Response('Welcome to Freeflow Worker!', { status: 200 });

      case '/message':
        return new Response('Hello, World!');

      case '/random':
        return new Response(crypto.randomUUID());

      case '/users':
        try {
          const { results } = await env.DB.prepare("SELECT * FROM users").all();
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response("Database error: " + err.message, { status: 500 });
        }

      default:
        return new Response('Not Found', { status: 404 });
    }
  },
} satisfies ExportedHandler<Env>;
