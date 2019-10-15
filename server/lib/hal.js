'use strict';

function setEndRange(startRange, limit, totalCount) {
  const endRange = startRange + limit - 1;
  const endRangeFromTotal = totalCount - 1;

  return endRange > endRangeFromTotal ? endRangeFromTotal : endRange;
}

function addListLinks(resources, baseUrl, pagination, totalCount) {
  const { offset, limit } = pagination;
  const selfEndRange = setEndRange(offset, limit, totalCount);

  resources.addLink('self', `${baseUrl}?range=${offset}-${selfEndRange}`);

  if (offset > 0) {
    const prevStartRange = offset - limit >= 0 ? offset - limit : 0;
    const firstEndRange = setEndRange(0, limit, totalCount);

    resources.addLink('first', `${baseUrl}?range=0-${firstEndRange}`);

    if (prevStartRange !== 0) {
      const prevEndRange = setEndRange(prevStartRange, limit, totalCount);

      resources.addLink('prev', `${baseUrl}?range=${prevStartRange}-${prevEndRange}`);
    }
  }

  if (offset + limit - 1 < totalCount) {
    const nextStartRange = offset + limit < totalCount ? offset + limit : totalCount;
    const nextEndRange = setEndRange(nextStartRange, limit, totalCount);
    const lastStartRange = totalCount - 1 - ((totalCount - 1) % limit);

    if (nextEndRange !== totalCount - 1) {
      resources.addLink('next', `${baseUrl}?range=${nextStartRange}-${nextEndRange}`);
    }

    resources.addLink('last', `${baseUrl}?range=${lastStartRange}-${totalCount - 1}`);
  }
}

module.exports = {
  addListLinks
};
