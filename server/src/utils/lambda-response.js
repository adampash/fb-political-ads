function lambdaResponse({ json, statusCode, allowCORS = false }) {
  const response = {
    statusCode,
    body: JSON.stringify(json),
  };

  if (allowCORS) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
    };
  }

  return response;
}

export function errorResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 500,
  });
}

export function corsErrorResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 500,
    allowCORS: true,
  });
}

export function successResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 200,
  });
}

export function corsSuccessResponse(json) {
  return lambdaResponse({
    json,
    statusCode: 200,
    allowCORS: true,
  });
}

export function xmlSuccessResponse(xml) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Access-Control-Allow-Origin': '*',
    },
    body: xml,
  };
}
