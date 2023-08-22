## CREATE A FUNGIBLE TOKEN 

- spl_init.ts
   - Create a new token mint
   - Make WBA devnet wallet the mint authority
   - Set Decimals to 6 
   - Console log mint id 

- spl_mint.ts
   - use getOrCreateAssociateTokenAccount to create a token account using your wallet and mint id you logged 
   - use mintTo to mint token yourself 