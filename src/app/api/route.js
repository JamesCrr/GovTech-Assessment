export async function POST(request) {
  const respBody = await request.formData();
  const operation = respBody.get("operation");
  const num1 = Number(respBody.get("num1"));
  const num2 = Number(respBody.get("num2"));

  return Response.json({ result: operation == "add" ? num1 + num2 : num1 - num2 });
}
