import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda"

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod;

  const lambdaRequestId = context.awsRequestId
  const envenRequestId = event.requestContext.requestId


  console.log("event ID", envenRequestId)
  console.log("Lambda Id", lambdaRequestId)

  if (event.resource === "/products" && method === "GET") {
    console.log("GET")
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Funcionando"
      })
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Funcionando"
    })
  }
}