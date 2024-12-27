import {AutodiscoverService} from '@/services/autodiscoverService';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

const loginAsync = async (
  email: string,
  password: string,
  username: string,
  domain?: string,
) => {
  const externalEwsUrl = await AutodiscoverService.getExternalEwsUrl(
    email,
    password,
    username,
    domain,
  );

  console.log(externalEwsUrl);
};

export default loginAsync;
