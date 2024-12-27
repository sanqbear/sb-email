import axios, {AxiosError} from 'axios';
import {XMLParser} from 'fast-xml-parser';
import {createType1Message, createType3Message} from './ntlmHelper';

export class AutodiscoverService {
  private static readonly AUTODISCOVER_ENDPOINT =
    '/autodiscover/autodiscover.xml';

  public static async getExternalEwsUrl(
    email: string,
    password: string,
    username: string,
    domain?: string,
  ): Promise<string> {
    try {
      const autodiscoverDomain = email.split('@')[1];
      const autodiscoverUrl = `https://autodiscover.${autodiscoverDomain}${this.AUTODISCOVER_ENDPOINT}`;

      const type1Message = createType1Message({
        domain: domain || '',
        username: username,
        password: password,
        workstation: '',
      });

      const response1 = await axios.post<string>(
        autodiscoverUrl,
        this.createAutodiscoverPayload(email),
        {
          headers: {
            'Content-Type': 'text/xml',
            Authorization: type1Message,
          },
        },
      );

      const ntlmChallenge = response1.headers['www-authenticate'];
      if (!ntlmChallenge) {
        throw new Error('NTLM challenge not found');
      }

      const type3Message = createType3Message(
        {
          username: username,
          password: password,
          domain: domain || '',
          workstation: '',
        },
        ntlmChallenge,
      );

      const response = await axios.post<string>(
        autodiscoverUrl,
        this.createAutodiscoverPayload(email),
        {
          headers: {
            'Content-Type': 'text/xml',
            Authorization: type3Message,
          },
        },
      );

      const parser = new XMLParser({
        ignoreAttributes: false,
        parseAttributeValue: true,
        parseTagValue: true,
        trimValues: true,
      });
      const result = parser.parse(response.data);

      const protocols = result.Autodiscover?.Response?.Account?.Protocol;
      if (protocols) {
        const rpcProtocol = protocols.find(
          (p: {Type: string}) => p.Type === 'EXCH',
        );
        if (rpcProtocol) {
          return rpcProtocol.EwsUrl;
        }
      }

      throw new Error('ExternalEwsUrl not found in autodiscover response');
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Autodiscover failed: ${axiosError.message}`);
    }
  }

  private static createAutodiscoverPayload(email: string): string {
    return `<?xml version="1.0" encoding="utf-8"?>
      <Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/outlook/requestschema/2006">
        <Request>
          <EMailAddress>${email}</EMailAddress>
          <AcceptableResponseSchema>http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a</AcceptableResponseSchema>
        </Request>
      </Autodiscover>`;
  }
}
