export async function POST(request) {
  const respBody = await request.formData();
  const num1 = Number(respBody.get("num1"));
  const num2 = Number(respBody.get("num2"));

  return Response.json({ result: num1 + num2 });
}
