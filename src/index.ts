import { Polymesh } from '@polymathnetwork/polymesh-sdk';
import { KnownTokenType } from '@polymathnetwork/polymesh-sdk/types';
import BigNumber from 'bignumber.js';

/**
 * Polymesh SDK connection
 */
async function run(): Promise<void> {
  const middleware =
    process.env.MIDDLEWARE_URL && process.env.MIDDLEWARE_KEY
      ? {
          link: process.env.MIDDLEWARE_URL,
          key: process.env.MIDDLEWARE_KEY,
        }
      : undefined;

  console.log('Connecting to the node...\n\n');
  const api = await Polymesh.connect({
    nodeUrl: 'wss://pme.polymath.network',
    accountUri: '//Alice',
    middleware,
  });

  const ticker = 'DEMO_TOKEN';
  const reservationQueue = await api.reserveTicker({ ticker }); // transaction queue, contains a list of transactions to be run
  const tickerReservation = await reservationQueue.run(); // will ask for signature on each transaction in the queue

  console.log('Ticker reserved!\n\n');

  const reservationDetails = await tickerReservation.details();

  console.log('RESERVATION INFO:\n');
  console.log('Expiry:', reservationDetails.expiryDate);
  console.log('Owner DID:', reservationDetails.owner?.did);
  console.log('Status:', reservationDetails.status);

  const creationQueue = await tickerReservation.createToken({
    name: 'My Demo Token',
    isDivisible: true,
    totalSupply: new BigNumber(3000000),
    tokenType: KnownTokenType.EquityCommon,
  });
  const securityToken = await creationQueue.run();

  console.log('Token created!');

  /*
    Other areas to explore:

    - securityToken.documents
    - securityToken.transfers
    - securityToken.tokenHolders
    - securityToken.issuance
    - securityToken.compliance
    - securityToken.compliance.rules
    - securityToken.compliance.trustedClaimIssuers

    Each of these is a namespace containing subsets of the token's functionality. For example, 
    to issue tokens to your holders, you would call securityToken.issuance.issue
  */
}
run().catch(err => console.log(err));
