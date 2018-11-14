import openfec from 'openfec';

import { corsSuccessResponse, runWarm } from './utils';

const searchFec = async (event, context, callback) => {
  openfec.init('n3sM8xCKteNEfGSoChAQKHZzTp6SJ069BT0ZJ8uy');
  const {
    queryStringParameters: { q },
  } = event;

  const candidateMatches = await openfec.candidate.searchByName({ q });
  const committeeMatches = await openfec.committee.searchByName({ q });

  const response = corsSuccessResponse({
    candidateMatches,
    committeeMatches,
  });

  callback(null, response);
};

export default runWarm(searchFec);
