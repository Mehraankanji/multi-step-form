export default async function submitClaim(payload) {
  await new Promise((r) => setTimeout(r, 500));
  return { id: Math.floor(Math.random() * 100000), status: "ok", payload };
}
