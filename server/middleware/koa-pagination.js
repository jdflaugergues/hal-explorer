'use strict';

function parseRange(ctx, range) {
  ctx.assert(
    range.match(/^\w+=\d+-(?:\*|\d+)$/) !== null,
    412,
    `The range syntax is wrong, it must respected "<unit>=<range-start>-<range-end>". (Range sent: "${range})"`,
    { statusMessage: 'MALFORMED_RANGE' }
  );
  const rangeSet = range.replace(range.match(/^\w+=/g), '').split('-');
  const first = parseInt(rangeSet[0], 10);
  const last = isFinite(rangeSet[1]) ? parseInt(rangeSet[1], 10) : rangeSet[1];
  const unit = range.replace(range.match(/\=.+$/), '');

  ctx.assert(
    first < last || last === '*',
    416,
    '"range-start" position must not be greater than "range-end" position'
  );
  ctx.assert(
    Number.isSafeInteger(first) && (last === '*' || (last !== '*' && Number.isSafeInteger(last))),
    416,
    'Range position is not safe number.'
  );

  return { first, last, unit };
}

function formatContentRange(obj) {
  obj.length = isNaN(obj.length) ? '*' : obj.length;
  if (isNaN(obj.first)) {
    return `${obj.unit} */${obj.length}`;
  }
  return `${obj.unit} ${obj.first}-${obj.last}/${obj.length}`;
}

module.exports = ({ allowAll = false, maximum = 50, unit = 'items' } = {}) => {
  return async function(ctx, next) {
    let first = 0;
    let last = maximum;
    let limit = '*';

    if (ctx.get('Range') || ctx.query.range) {
      const rangeToParse = ctx.get('Range') || `${unit}=${ctx.query.range}`;
      const range = parseRange(ctx, rangeToParse);

      first = range.first;
      last = range.last;

      ctx.assert(
        unit === range.unit,
        412,
        `The range unit expected is ${unit} not ${range.unit}.`,
        { statusMessage: 'MALFORMED_RANGE' }
      );
      ctx.assert(allowAll || last !== '*', 416, `You're not allowed to get all resources.`);
    }

    if (last !== '*') {
      if (last - first + 1 > maximum) {
        last = first + maximum - 1;
      }

      limit = last - first + 1;
    }

    ctx.state.pagination = {
      limit,
      offset: first,
      unit
    };

    await next();

    const length = ctx.state.pagination.length;

    ctx.assert(
      !length || (length && first < length),
      416,
      `The "range-start" position (${first}) must be lower than number of resources (${length})`
    );

    if (last === '*') {
      last = length;
    }

    if (last + 1 > length && length !== 0) {
      last = length - 1;
    }

    if (length === 0) {
      first = undefined;
      last = undefined;
    }

    ctx.set('Accept-Ranges', unit);
    ctx.set('Content-Range', formatContentRange({ first, last, length, unit }));

    if (ctx.status < 200 || ctx.status > 300) {
      return;
    }

    ctx.status = length === 0 || (last + 1 === length && first === 0) ? 200 : 206;
  };
};
