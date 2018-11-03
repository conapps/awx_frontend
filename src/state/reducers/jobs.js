import get from 'lodash/get.js';

export function getActiveJob(state) {
  const jobId = get(state, 'ui.jobs.editing');

  if (jobId === undefined) return undefined;

  const job = get(state, `entities.jobs.${jobId}`);

  return job;
}
