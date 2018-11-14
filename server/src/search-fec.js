import openfec from 'openfec'

import { corsSuccessResponse, runWarm } from './utils';

const searchFec = async (event, context, callback) => {
  openfec.init('i6kWH1gZoMQRruQajrQS9YeyPLUfZXh3ip1nL0PO')
  const {
    queryStringParameters: { q },
  } = event;

  const candidateMatches = await openfec.candidate.searchByName({ q })
  const committeeMatches = await openfec.committee.searchByName({ q })




  const response = corsSuccessResponse({
    candidateMatches,
    committeeMatches
  });

  callback(null, response);
};

export default runWarm(searchFec);

