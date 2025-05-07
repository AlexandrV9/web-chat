import { queryStringify } from '@/shared/utils';
import { XMLHttpTransport } from '.';

const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  onload: jest.fn(),
  onerror: jest.fn(),
  onabort: jest.fn(),
  ontimeout: jest.fn(),
  status: 200,
  readyState: 4,
  response: {},
  withCredentials: false,
};

const originalXMLHttpRequest = global.XMLHttpRequest;

beforeEach(() => {
  global.XMLHttpRequest = jest.fn(() => mockXHR) as unknown as jest.MockedClass<typeof XMLHttpRequest>;
  jest.clearAllMocks();
});

afterAll(() => {
  global.XMLHttpRequest = originalXMLHttpRequest;
});

describe('XMLHttpTransport', () => {
  const transport = new XMLHttpTransport();

  it('check GET request with query params', async () => {
    setTimeout(() => mockXHR.onload(), 0);
    const params = { user_id: '10' };

    await transport.get('/test', { params });

    const expectedQuery = queryStringify(params);
    expect(mockXHR.open).toHaveBeenCalledWith('GET', `/test?${expectedQuery}`);
    expect(mockXHR.send).toHaveBeenCalled();
  });

  it('check GET request with headers', async () => {
    setTimeout(() => mockXHR.onload(), 0);
    const headers = { 'X-Custom-Header': 'value' };

    await transport.get('/test', { headers });

    expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('X-Custom-Header', 'value');
    expect(mockXHR.open).toHaveBeenCalledWith('GET', '/test?');
    expect(mockXHR.send).toHaveBeenCalled();
  });

  it('check correct reponse GET request', async () => {
    setTimeout(() => mockXHR.onload(), 0);

    await transport.get('/test');

    expect(mockXHR.open).toHaveBeenCalledWith('GET', '/test?');
    expect(mockXHR.send).toHaveBeenCalled();
  });

  it('check POST request', async () => {
    const reqData = { login: 'logtest', password: '12345' };
    const resData = { success: true, token: 'fallback_token_123' };

    mockXHR.response = JSON.stringify(resData);
    setTimeout(() => mockXHR.onload(), 0);

    await transport.post('/test', JSON.stringify(reqData));

    expect(mockXHR.open).toHaveBeenCalledWith('POST', '/test?');
    expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(reqData));
    expect(mockXHR.response).toEqual(JSON.stringify(resData));
  });

  it('check PATCH request', async () => {
    const reqData = { test: '123' };

    setTimeout(() => mockXHR.onload(), 0);

    await transport.patch('/test', JSON.stringify(reqData));

    expect(mockXHR.open).toHaveBeenCalledWith('PATCH', '/test?');
    expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(reqData));
  });

  it('check PUT request', async () => {
    const reqData = { test: '123' };

    setTimeout(() => mockXHR.onload(), 0);

    await transport.put('/test', JSON.stringify(reqData));

    expect(mockXHR.open).toHaveBeenCalledWith('PUT', '/test?');
    expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(reqData));
  });

  it('check DELETE request', async () => {
    const reqData = { test: '123' };

    setTimeout(() => mockXHR.onload(), 0);

    await transport.delete('/test', JSON.stringify(reqData));

    expect(mockXHR.open).toHaveBeenCalledWith('DELETE', '/test?');
    expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(reqData));
  });
});
