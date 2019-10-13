'use strict';

const ERRORS = {
  INVALID_ARGUMENT: 'INVALID_ARGUMENT',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  PRECONDITION_FAILED: 'PRECONDITION_FAILED',
  MALFORMED_RANGE: 'MALFORMED_RANGE',
  RANGE_NOT_SATISFIABLE: 'RANGE_NOT_SATISFIABLE',
  INTERNAL: 'INTERNAL',
  UNKNOWN: 'UNKNOWN'
};

const STATUS = [
  { code: 400, message: ERRORS.INVALID_ARGUMENT },
  { code: 401, message: ERRORS.UNAUTHENTICATED },
  { code: 403, message: ERRORS.PERMISSION_DENIED },
  { code: 404, message: ERRORS.NOT_FOUND },
  { code: 409, message: ERRORS.ALREADY_EXISTS },
  { code: 412, message: ERRORS.PRECONDITION_FAILED },
  { code: 412, message: ERRORS.MALFORMED_RANGE },
  { code: 416, message: ERRORS.RANGE_NOT_SATISFIABLE },
  { code: 500, message: ERRORS.INTERNAL }
];

function resolveStatusMessage(statusCode) {
  const status = STATUS.find((currentStatus) => currentStatus.code === statusCode);

  return (status && status.message) || ERRORS.UNKNOWN;
}

module.exports = {
  resolveStatusMessage,
  errors: ERRORS
};
