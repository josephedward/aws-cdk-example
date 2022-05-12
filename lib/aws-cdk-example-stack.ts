import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as widget_service from './widget-service';
import * as openapi_service from './openapi-service';

export class AwsCdkExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // new widget_service.WidgetService(this, 'Widgets');
    new openapi_service.OpenApiService(this, 'OpenApi');
  }
}

