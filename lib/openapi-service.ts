import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";


export class OpenApiService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const api = new apigateway.SpecRestApi(this, "open-api", {
      apiDefinition: apigateway.ApiDefinition.fromAsset("./helloworld.yaml"),
    });

  }
}
