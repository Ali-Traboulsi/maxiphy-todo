import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

/**
 * Decorator to apply common Swagger documentation to endpoints.
 * @param summary Endpoint summary.
 * @param responses Optional custom responses.
 * @param bodyType Optional DTO class for request body.
 */
export function SwaggerEndpoint(
  summary: string,
  responses?: { status: number; description: string }[],
  bodyType?: Function,
) {
  const decorators = [
    ApiOperation({ summary }),
    ApiBearerAuth(),
    ApiResponse({ status: 200, description: 'Success' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
  ];

  if (bodyType) {
    decorators.push(ApiBody({ type: bodyType }));
  }

  if (responses) {
    responses.forEach((r) => {
      decorators.push(
        ApiResponse({ status: r.status, description: r.description }),
      );
    });
  }

  return applyDecorators(...decorators);
}
