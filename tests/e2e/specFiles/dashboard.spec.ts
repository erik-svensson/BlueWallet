describe('Dashboard', () => {
  it('should display an empty list if there is no wallets added yet', async () => {});

  it('should display a wallet tile if there is a single wallet added', async () => {});

  it('should display a wallets carousel if more than one wallet is added ', async () => {});

  it('should be possible to swtich between wallets using the wallets carousel', async () => {});

  it('should be possible to swtich between wallets using the wallets dropdown list', async () => {});

  it('should be displayed Send and Cancel buttons for Standard wallets', async () => {});

  it('should be displayed Send, Receive, and Cancel buttons for 2 Key Vault and 3 Key Vault wallets', async () => {});

  it('should display "No transaction to show" icon if there\'s no transactions to show', async () => {});

  it('should display transactions of all added wallets under "All wallets" tile', async () => {});

  it('should display only transactions of the wallet that is currently selected', async () => {});

  it('should display correctly details of positive transaction', async () => {});

  it('should display correctly details of negative transaction', async () => {});

  describe('Transaction details', () => {
    it('should be displayed all transaction details ', async () => {});

    it('should be possible to copy the "from" address', async () => {});

    it('should be possible to copy the "to" address', async () => {});

    it('should be possible to copy the "transaction id" address', async () => {});

    it('should be possible to view the transaction in Explorer', async () => {});
  });

  describe('Filters', () => {
    it('should be possible to filter by transaction type', async () => {});

    it('should be possible to filter by sender', async () => {});

    it('should be possible to filter by date', async () => {});

    it('should be possible to filter by amount', async () => {});

    it('should be possible to filter by status', async () => {});

    it('should be possible to filter by status', async () => {});

    it("shouldn't apply filters if a user exited the screen by back button", async () => {});

    it('should be possible to clear all applied filters from Dashboard screen', async () => {});

    it('should be possible to clear all applied filters from Filter transactions screen', async () => {});
  });
});
