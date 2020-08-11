import { stringify } from 'query-string';
import { isDevServer } from 'utils';

export class ResponseError extends Error {
  public response: Promise<any>;

  constructor(response: Response, body: any) {
    super(response.statusText);
    this.response = body;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const responseJson = await response.json();
  const error = new ResponseError(response, responseJson);
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit,
  params?: {
    [key: string]: any;
  },
): Promise<{} | { err: ResponseError }> {
  if (options) {
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    };
  }

  let address =
    (isDevServer()
      ? process.env.REACT_APP_BASE_URL_DEV
      : process.env.REACT_APP_BASE_URL) + url;

  if (params) {
    address += '?' + stringify(params);
  }

  const fetchResponse = await fetch(address, options);
  const response = await checkStatus(fetchResponse);
  return parseJSON(response);
}
