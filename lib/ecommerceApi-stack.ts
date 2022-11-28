import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs" //
import * as cdk from "aws-cdk-lib"  //
import { Construct } from "constructs"  //
import * as apigateway from "aws-cdk-lib/aws-apigateway" //

import * as cwlogs from "aws-cdk-lib/aws-logs"

interface EcommerceApiStackProps extends cdk.StackProps {
  productHandler: lambdaNodejs.NodejsFunction
}

export class EcommerceApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props);

    //Criando Logs
    const logGroup = new cwlogs.LogGroup(this, "EcommerceApiLogs")

    const api = new apigateway.RestApi(this, "EcommerceApi", {
      restApiName: "EcommerceApi",
      deployOptions: {
        //Mostrando ao get onde deve criar os logs
        accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true, // Tempo quando foi feito a requisição
          resourcePath: true, // verificar usuarios fazendo a requisição no endereço errado
          responseLength: true, // Tamanho da resposta
          status: true, // Estado de resposta
          caller: true, // Identifica quem invocou o apigateway
          user: true // Identifica o utilizador
        })
      }
    })
    //Será redirecionado nessa função
    const productFetchIntegration = new apigateway.LambdaIntegration(props.productHandler)


    // Valida e criar a /Products
    const productResource = api.root.addResource("products")
    //Para onde será redirecionado
    productResource.addMethod("GET", productFetchIntegration)
  }
}