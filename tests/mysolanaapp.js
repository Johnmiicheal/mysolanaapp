const anchor = require("@project-serum/anchor");
const assert = require("assert");
const { SystemProgram } = anchor.web3;

describe("mysolanaapp", () => {
  /* Creating and setting up a provider */
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  
  it("Creates a counter", async() => {
    // Call the create function via RPC
    const baseAccount =  anchor.web3.Keypair.generate();
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    // Fetching the account and checking the value of count
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log('Count 0:' , account.count.toString())
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;

  });

  it("Increments the counter", async() => {
    const baseAccount = _baseAccount;

    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    console.log( 'Count 1: ', account.count.toString())
    assert.ok(account.count.toString() == 1);
  });


});
