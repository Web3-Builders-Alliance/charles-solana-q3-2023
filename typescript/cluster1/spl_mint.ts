import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getAccount,
} from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("EAKTet5KqRJrL1gpmusS5tvmCgh4eV7xhHMNBcStpz5N");

(async () => {
  try {
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    let accountInfo = await getAccount(connection, ata.address);

    console.log("Account Info start ==> ", accountInfo);

    await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      100000000
    );

    accountInfo = await getAccount(connection, ata.address);
    console.log("Account Info end ==> ", accountInfo);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
