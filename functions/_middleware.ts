// Protects the entire Cloudflare Pages deployment with HTTP Basic Authentication
export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const { request } = context;
  const authHeader = request.headers.get("Authorization");

  // Base64 encoding for "admin:cosmos"
  const expectedAuth = "Basic YWRtaW46Y29zbW9z";

  if (!authHeader || authHeader !== expectedAuth) {
    return new Response("Unauthorized. This portfolio is private.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Portfolio"',
      },
    });
  }

  return await context.next();
};
