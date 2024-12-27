import crypto from 'crypto';

interface Credentials {
  username: string;
  password: string;
  domain: string;
  workstation: string;
}

const createNTLMHash = (password: string): Buffer => {
  const md4 = crypto.createHash('md4');
  md4.update(Buffer.from(password, 'utf16le'));
  return md4.digest();
};

const createNTLMv2Hash = (
  ntHash: Buffer,
  username: string,
  domain: string,
): Buffer => {
  const hmac = crypto.createHmac('md5', ntHash);
  hmac.update(Buffer.from(username.toUpperCase() + domain, 'utf16le'));
  return hmac.digest();
};

const createNTLMv2Response = (
  ntlmv2Hash: Buffer,
  challenge: Buffer,
  clientNonce: Buffer,
): Buffer => {
  const timestamp = Buffer.alloc(8);
  const time = BigInt(Date.now() + 11644473600000) * BigInt(10000);
  timestamp.writeBigUInt64LE(time);

  const tempBuffer = Buffer.concat([
    Buffer.alloc(4), // Reserved
    timestamp,
    clientNonce,
    Buffer.alloc(4), // Reserved
  ]);

  const hmac = crypto.createHmac('md5', ntlmv2Hash);
  hmac.update(Buffer.concat([challenge, tempBuffer]));

  return Buffer.concat([hmac.digest(), tempBuffer]);
};

export const createType1Message = ({
  domain,
  workstation,
}: Credentials): string => {
  const NTLM_SIGNATURE = 'NTLMSSP\0';
  const FLAGS = 0x8201;

  const domainBuffer = Buffer.from(domain.toUpperCase(), 'utf16le');
  const workstationBuffer = Buffer.from(workstation.toUpperCase(), 'utf16le');

  const buffer = Buffer.alloc(
    40 + domainBuffer.length + workstationBuffer.length,
  );

  buffer.write(NTLM_SIGNATURE, 0, 8, 'ascii');
  buffer.writeUInt32LE(1, 8); // Message Type
  buffer.writeUInt32LE(FLAGS, 12); // Flags

  buffer.writeUInt16LE(domainBuffer.length, 16);
  buffer.writeUInt16LE(domainBuffer.length, 18);
  buffer.writeUInt32LE(40, 20);

  buffer.writeUInt16LE(workstationBuffer.length, 24);
  buffer.writeUInt16LE(workstationBuffer.length, 26);
  buffer.writeUInt32LE(40 + domainBuffer.length, 28);

  domainBuffer.copy(buffer, 40);
  workstationBuffer.copy(buffer, 40 + domainBuffer.length);

  return `NTLM ${buffer.toString('base64')}`;
};

export const createType3Message = (
  credentials: Credentials,
  challenge: string,
): string => {
  const clientNonce = crypto.randomBytes(8);
  const ntHash = createNTLMHash(credentials.password);
  const ntlmv2Hash = createNTLMv2Hash(
    ntHash,
    credentials.username,
    credentials.domain,
  );
  const ntlmv2Response = createNTLMv2Response(
    ntlmv2Hash,
    Buffer.from(challenge, 'base64'),
    clientNonce,
  );

  const usernameBuffer = Buffer.from(credentials.username, 'utf16le');
  const domainBuffer = Buffer.from(credentials.domain.toUpperCase(), 'utf16le');
  const workstationBuffer = Buffer.from(
    credentials.workstation.toUpperCase(),
    'utf16le',
  );

  const buffer = Buffer.alloc(
    72 +
      domainBuffer.length +
      usernameBuffer.length +
      workstationBuffer.length +
      ntlmv2Response.length,
  );

  buffer.write('NTLMSSP\0', 0, 8, 'ascii');
  buffer.writeUInt32LE(3, 8); // Message Type

  buffer.writeUInt16LE(ntlmv2Response.length, 12);
  buffer.writeUInt16LE(ntlmv2Response.length, 14);
  buffer.writeUInt32LE(72, 16);

  buffer.writeUInt16LE(domainBuffer.length, 28);
  buffer.writeUInt16LE(domainBuffer.length, 30);
  buffer.writeUInt32LE(72 + ntlmv2Response.length, 32);

  buffer.writeUInt16LE(usernameBuffer.length, 36);
  buffer.writeUInt16LE(usernameBuffer.length, 38);
  buffer.writeUInt32LE(72 + ntlmv2Response.length + domainBuffer.length, 40);

  buffer.writeUInt16LE(workstationBuffer.length, 44);
  buffer.writeUInt16LE(workstationBuffer.length, 46);
  buffer.writeUInt32LE(
    72 + ntlmv2Response.length + domainBuffer.length + usernameBuffer.length,
    48,
  );

  ntlmv2Response.copy(buffer, 72);
  domainBuffer.copy(buffer, 72 + ntlmv2Response.length);
  usernameBuffer.copy(buffer, 72 + ntlmv2Response.length + domainBuffer.length);
  workstationBuffer.copy(
    buffer,
    72 + ntlmv2Response.length + domainBuffer.length + usernameBuffer.length,
  );

  return `NTLM ${buffer.toString('base64')}`;
};
