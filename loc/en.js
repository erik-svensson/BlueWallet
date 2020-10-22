module.exports = {
  _: {
    languageCode: 'en',
    storage_is_encrypted: 'Your storage is encrypted. Password is required to decrypt it',
    enter_password: 'Enter password',
    bad_password: 'Bad password, try again',
    never: 'never',
    continue: 'Continue',
    ok: 'OK',
    click: 'Click',
    here: 'here',
    save: 'Save',
    confirm: 'Confirm',
    copy: 'Copy',
    copied: 'Copied!',
    or: 'or',
    delete: 'Delete',
    created: 'Created on',
    invalid: 'Invalid',
    satoshi: 'Sat',
    next: 'Next',
  },
  tabNavigator: {
    wallets: 'Wallets',
    settings: 'Settings',
    addressBook: 'Address book',
    authenticators: 'Authenticators',
  },
  message: {
    allDone: 'All done!',
    hooray: 'Hooray!',
    cancelTxSuccess: 'You have successfully canceled your transaction.\nYour coins are on the way.',
    wrongMnemonic: 'Wrong mnemonic',
    wrongMnemonicDesc:
      'Your mnemonic does not match any supported wallet. You are trying to import an invalid mnemonic or wallet that has never been used',
    somethingWentWrong: 'Something went wrong',
    somethingWentWrongWhileCreatingWallet:
      'Something went wrong while we were creating your wallet. Please return to Dashboard and try again.',
    success: 'Success',
    successfullWalletImport: `You have successfully imported your wallet. It's now ready to use.`,
    successfullWalletDelete: 'Your wallet has been successfully deleted. You can now return to Dashboard.',
    returnToDashboard: 'Return to Dashboard',
    returnToWalletChoose: 'Return to the wallet type selection',
    returnToWalletImport: 'Return to wallet import',
    generateAddressesError: 'Couldn`t generate addresses',
    noTransactions: 'No transactions found on the wallet',
    noTransactionsDesc: 'You are probably trying to import a wallet that has never been used',
    returnToAuthenticators: 'Return to Authenticators',
    creatingWallet: 'Creating your wallet',
    creatingWalletDescription: 'Please be patient while we create your wallet.\nIt may take a while.',
    creatingAuthenticator: 'Creating your authenticator',
    creatingAuthenticatorDescription: 'Please be patient while we create your authenticator.\nIt may take a while.',
    importingAuthenticator: 'Importing your authenticator',
    importingAuthenticatorDescription: 'Please be patient while we import your authenticator.\nIt may take a while.',
  },
  onboarding: {
    onboarding: 'Onboarding',
    pin: 'PIN',
    createPin: 'Create PIN',
    createNewPin: 'New PIN',
    createPassword: 'Create transaction password',
    createPinDescription:
      'Your PIN will be used to log in to the application. You can change it later in the Settings section.',
    confirmPin: 'Confirm PIN',
    confirmNewPin: 'Confirm new PIN',
    confirmPassword: 'Confirm transaction password',
    passwordDoesNotMatch: 'Password does not match. Please enter a valid password.',
    createPasswordDescription:
      'Your Transaction Password will be used to verify all of the transactions. You cannot change it later. Transaction Password must contain at least 8 alphanumerical characters.',
    changePin: 'Change PIN',
    currentPin: 'Current PIN',
    failedTimes: 'Failed times',
    failedTimesErrorInfo: 'After three unsuccessful attempts, entering will be blocked for',
    goBack: 'Go back',
    minutes: 'minutes.',
    numberOfAttemptsExceeded: 'The number of attempts exceeded',
    pinDoesNotMatch: 'PIN does not match. Please enter a valid PIN.',
    seconds: 'seconds',
    tryAgain: 'Try again after',
    successDescription: 'Hooray! \n You have successfully created your PIN.',
    successDescriptionChangedPin: 'Hooray! \n You have successfully changed your PIN.',
    successButton: 'Go to Dashboard',
    successButtonChangedPin: 'Go back to Settings',
  },
  unlock: {
    title: 'Unlock',
    touchID: 'Touch ID for "Gold Wallet"',
    confirmButton: 'Confirm fingerprint to continue.',
    enter: 'Enter PIN',
  },
  unlockTransaction: {
    headerText: 'Confirm transaction',
    title: 'Confirm Transaction',
    description: 'Enter your Transaction Password to proceed.',
  },
  authenticators: {
    sign: {
      error: `None of the authenticators were able to sign the transaction`,
    },
    options: {
      title: 'Authenticator options',
      export: 'Export authenticator',
      pair: 'Pair authenticator',
      sectionTitle: 'General',
      delete: 'Delete authenticator',
    },
    pair: {
      title: 'Pair authenticator',
      pin: 'PIN',
      publicKey: 'Public Key',
      descPin: 'Use this PIN to confirm authenticator pairing on your desktop application.',
      descPublicKey:
        'You can use this Public Key to import your authenticator in the desktop application during the wallet creation process with the GoldWallet option.',
    },
    import: {
      title: 'Import authenticator',
      success: 'You have successfully imported your authenticator. It is now ready to use.',
      subtitle: 'Import your authenticator',
      desc1: 'Write down the seed phrase or scan the QR code of the authenticator you want to import.',
      desc2: 'scan QR code by clicking on “or scan QR code” below',
      textAreaPlaceholder: 'Seed phrase',
    },
    export: {
      title: 'Export authenticator',
    },
    delete: {
      title: 'Delete authenticator',
      subtitle: 'Delete your authenticator',
      success: 'Your authenticator has been successfully deleted. You can always create a new one.',
    },
    list: {
      noAuthenticatorsDesc1: 'Tap',
      noAuthenticatorsDesc2: 'to add your first authenticator.',
      noAuthenticators: 'No Authenticators yet',
      scan: 'Scan',
      title: 'Bitcoin Vault authenticators',
    },
    add: {
      successTitle: 'Your authenticator is ready!',
      title: 'Add new authenticator',
      subtitle: 'Pair authenticator',
      successDescription: `Write down this seed phrase somewhere safe. It's your backup in case you need to restore your authenticator. Remember that the authenticator is necessary to confirm Fast and Cancel transactions.`,
      description:
        'Open your Electrum Vault desktop application and create a new wallet. Follow the steps on the screen until you see a QR code. Use this app to scan it to proceed.',
      subdescription: 'You can also import your authenticator by choosing the option below.',
    },
    enterPIN: {
      subtitle: 'Enter PIN',
      description: 'Enter this PIN into the Electrum Vault desktop application to finish the pairing process.',
    },
  },
  wallets: {
    dashboard: {
      availableBalance: 'Available balance',
      title: 'Wallets',
      wallet: 'wallet',
      allWallets: 'All wallets',
      noWallets: 'No wallets',
      noWalletsDesc1: 'No wallets to show.',
      noWalletsDesc2: 'to add your first wallet.',
      send: 'Send',
      receive: 'Receive',
      recover: 'Cancel',
      noTransactions: 'No transactions to show.',
    },
    walletModal: {
      btcv: 'BTCV',
      wallets: 'Wallets',
    },
    importWallet: {
      title: 'Import your wallet',
      header: 'Import wallet',
      subtitle:
        "Write here your mnemonic, private key, WIF or anything you've got. GoldWallet will do its best to guess the correct format and import you wallet.",
      placeholder: 'Seed phrase, private key, WIF',
      import: 'Import',
      scanQrCode: 'or scan QR code',
      walletInUseValidationError: 'Wallet is already in use. Please enter a valid wallet.',
      chooseTypeDescription: 'Choose the type of the wallet you want to import.',
      importARDescription1: 'Enter the seed phrase',
      importARDescription2: 'scan the QR code of the wallet you want to import',
      scanWalletAddress: 'Scan wallet address',
      scanWalletAddressDescription: 'Scan the Public Address QR code to start the integration with GoldWallet.',
      scanFastPubKey: 'Scan the Fast Key QR code',
      scanCancelPubKey: 'Scan the Cancel Key QR code',
      scanPublicKeyDescription:
        'Open the first PDF document you generated when you created the wallet you want to import and use this app to scan the Public Key QR code.',
      unsupportedElectrumVaultMnemonic:
        'This seed is from Electrum Vault and is currently not supported. Will be supported in the near future.',
    },
    exportWallet: {
      title: 'Seed phrase',
      header: 'Export wallet',
    },
    exportWalletXpub: {
      header: 'Wallet XPUB',
    },
    deleteWallet: {
      title: 'Delete your wallet',
      header: 'Delete wallet',
      description1: 'Are you sure you want to delete',
      description2: "? You can't undone it.",
      no: 'No',
      yes: 'Yes',
    },
    wallet: {
      none: 'None',
      latest: 'Latest transaction',
      pendingBalance: 'Blocked balance',
    },
    add: {
      failed: 'Failed to create wallet',
      title: 'Add new wallet',
      subtitle: 'Name your wallet',
      description: 'Choose the name and type of your wallet.',
      inputLabel: 'Name',
      addWalletButton: 'Add new wallet',
      importWalletButton: 'Import wallet',
      walletType: 'Wallet type',
      advancedOptions: 'Advanced options',
      multipleAddresses: 'It contains a tree of P2SH addresses generated from a single 12-word seed',
      singleAddress: 'It contains a single P2SH address',
      segwidAddress: 'It contains a tree of native segwit addresses, generated from a single 12-word seed',
      ar: 'Makes Secure and Cancel transactions.',
      air: 'Makes Secure, Cancel, and Secure Fast transactions.',
      legacyTitle: 'Standard',
      legacyHDP2SHTitle: 'Standard HD P2SH',
      legacyP2SHTitle: 'Standard P2SH',
      legacyHDSegWitTitle: 'Standard HD SegWit',
      legacy: 'Makes default types of transactions.',
      legacyHDP2SH: 'It contains a tree of P2SH addresses generated from a single 12-word seed',
      LegacyP2SH: 'It contains a single P2SH address',
      LegacyHDSegWit: 'It contains a tree of native segwit addresses, generated from a single 12-word seed',
      publicKeyError: 'Provided public key is invalid',
    },
    publicKey: {
      recoverySubtitle: 'Add Cancel Key',
      webKeyGenerator: 'Web Key Generator:',
      recoveryDescription:
        'Go to the web Key Generator on a separate device and use this app to scan the Public Key QR code. Remember to export your keys as a PDF!',
      instantSubtitle: 'Add Fast Key',
      instantDescription:
        'Go to the web Key Generator on a separate device again, refresh the page and use this app to scan the new Public Key QR code. Remember to export your keys as a PDF!',
      scan: 'Scan',
    },
    addSuccess: {
      title: 'Add new wallet',
      subtitle: 'Your wallet is ready!\nYou created your wallet!',
      description: `Write down this seed phrase somewhere safe. It's your backup in case you need to restore your wallet.`,
      okButton: 'OK, I wrote this down',
    },
    details: {
      edit: 'Edit',
      details: 'Details',
      latestTransaction: 'Latest transaction',
      typeLabel: 'Type',
      nameLabel: 'Name',
      exportWallet: 'Export wallet',
      showWalletXPUB: 'Show wallet XPUB',
      deleteWallet: 'Delete wallet',
      nameEdit: 'Edit name',
    },
    export: {
      title: 'wallet export',
    },
    import: {
      title: 'import',
      explanation:
        "Write here your mnemonic, private key, WIF, or anything you've got. GoldWallet will do its best to guess the correct format and import your wallet",
      imported: 'Imported',
      error: 'Failed to import. Please, make sure that the provided data is valid.',
      success: 'Success',
      do_import: 'Import',
      scan_qr: 'or scan QR code instead?',
    },
    scanQrWif: {
      go_back: 'Go Back',
      cancel: 'Cancel',
      decoding: 'Decoding',
      input_password: 'Input password',
      password_explain: 'This is BIP38 encrypted private key',
      bad_password: 'Bad password',
      wallet_already_exists: 'Such wallet already exists',
      bad_wif: 'Bad WIF',
      imported_wif: 'Imported WIF',
      with_address: 'with address',
      imported_segwit: 'Imported SegWit',
      imported_legacy: 'Imported Legacy',
      imported_watchonly: 'Imported Watch-only',
    },
    errors: {
      invalidMnemonicWordsNumber: 'Provided {receivedWordsNumber} words expected {expectedWordsNumber}',
      noIndexForWord: `Couldn't find index for word: {word}`,
      invalidPrivateKey: 'Invalid private key',
      invalidPublicKey: 'Invalid public key',
      invalidMnemonic: 'Invalid mnemonic',
      invalidQrCode: 'Invalid QR code',
      invalidSign: `Couldn't sign transaction`,
      duplicatedPublicKey: 'The public key has already been added',
    },
  },
  transactions: {
    errors: {
      notEnoughBalance: 'Not enough balance. Please, try sending a smaller amount.',
    },
    label: {
      pending: 'pending',
      unblocked: 'unblocked',
      done: 'done',
      canceled: 'canceled',
      canceledDone: 'canceled - done',
    },
    transactionTypeLabel: {
      secure: 'Secure',
      secureFast: 'Secure Fast',
      standard: 'Standard',
      canceled: 'Canceled',
    },
    list: {
      conf: 'Confirmations',
    },
    details: {
      title: 'Transaction',
      detailTitle: 'Transaction details',
      transactionHex: 'Transaction hex',
      transactionHexDescription: 'This is transaction hex, signed and ready to be broadcast to the network',
      copyAndBoriadcast: 'Copy and broadcast later',
      transactionType: 'Transaction type',
      verify: 'Verify on coinb.in',
      amount: 'Amount',
      fee: 'Fee',
      returnedFee: 'Returned fee:',
      transactioFee: 'Transaction fee',
      txSize: 'TX size',
      satoshiPerByte: 'Satoshi per byte',
      from: 'From',
      to: 'To',
      bytes: 'bytes',
      copy: 'Copy',
      walletType: 'Wallet type',
      noLabel: 'No label',
      details: 'Details',
      transactionId: 'Transaction ID',
      confirmations: 'confirmations',
      transactionDetails: 'Transaction details',
      viewInBlockRxplorer: 'View in block explorer',
      addNote: 'Add note',
      note: 'Note',
      inputs: 'Inputs',
      ouputs: 'Outputs',
      sendCoins: 'Send coins',
      addToAddressBook: 'Add to Address book',
      timePending: 'Time pending',
      numberOfCancelTransactions: 'Number of Cancel transactions',
      toExternalWallet: 'To the external wallet',
      toInternalWallet: 'To the internal wallet',
      fee: 'Fee:',
      totalReturnedFee: 'Total returned fee:',
      unblocked: 'Unblocked',
      blocked: 'Blocked',
    },
  },
  timeCounter: {
    title: 'Application blocked',
    description:
      'Your application has been blocked due to the unsuccessful login attempts. Please wait required time in order to try again.',
    tryAgain: 'Try again',
    closeTheApp: 'Close the application',
  },
  send: {
    header: 'Send coins',
    recovery: {
      recover: 'Cancel',
      useWalletAddress: 'Use address of this wallet',
      confirmSeed: 'Confirm with Cancel Seed Phrase',
      confirmSeedDesc:
        'Open the PDF document you generated when you created your wallet and write down the Private Key seed phrase in the same order.',
      confirmFirstSeed: 'Confirm with Cancel Seed Phrase',
      confirmFirstSeedDesc:
        'Open the first PDF document you generated when you created your wallet and write down the Private Key seed phrase in the same order.',
      confirmSecondSeed: 'Confirm with Fast Seed Phrase',
      confirmSecondSeedDesc:
        'Open the second PDF document you generated when you created your wallet and write down the Private Key seed phrase in the same order.',
    },
    warning: 'Warning: ',
    warningGeneral:
      'Warning: Please be aware that in the process of using the Secure Transaction feature, a part of the funds left in your wallet might be blocked. This is a normal procedure linked to UTXO and the blockchain parameters of the Bitcoin Vault wallet. Your funds will be unblocked once the transaction is verified (after approximately 24 hrs) or canceled (within 24 hrs).',
    transaction: {
      instant: 'Secure Fast',
      instantDesc: 'This transaction will be confirmed immediately. Use with extreme caution.',
      fastSuccess: 'You have successfully made your fast transaction.',
      alert: 'Secure',
      alertDesc:
        'This transaction needs 144 blocks or about 24 hours to be confirmed. You can cancel it within this time.',
      type: 'Transaction type',
      scanInstantKeyTitle: 'Scan the Fast Key',
      scanInstantKeyDesc:
        'Open the PDF document you generated when you created your wallet and scan the Private Key QR code to send the transaction.',
      lightningError:
        'This address appears to be for a Lightning invoice. Please, go to your Lightning wallet in order to make a payment for this invoice.',
      watchOnlyError: 'Watch only wallets cannot send transactions',
    },
    success: {
      title: 'Success',
      description: 'You have successfully sent your coins.',
      done: 'Done',
      return: 'Return to Dashboard',
    },
    error: {
      title: 'Error',
      description: 'Before creating a transaction, you must first add a Bitcoin Vault wallet.',
    },
    details: {
      title: 'create transaction',
      amount_field_is_not_valid: 'Amount field is not valid',
      fee_field_is_not_valid: 'Fee field is not valid',
      address_field_is_not_valid: 'Address field is not valid',
      create_tx_error: 'There was an error creating the transaction. Please, make sure the address is valid.',
      address: 'address',
      amount_placeholder: 'amount to send (in BTCV)',
      fee_placeholder: 'plus transaction fee (in BTCV)',
      note_placeholder: 'note to self',
      cancel: 'Cancel',
      scan: 'Scan',
      send: 'Send',
      next: 'Next',
      note: 'Note (optional)',
      to: 'to',
      feeUnit: 'Sat/B',
      fee: 'Fee:',
      create: 'Create Invoice',
      remaining_balance: 'Remaining balance',
      total_exceeds_balance: 'The sending amount exceeds the available balance.',
    },
    confirm: {
      sendNow: 'Send now',
      cancelNow: 'Cancel now',
      availableBalance: 'Available balance after transaction',
      pendingBalance: 'Blocked balance after transaction',
    },
    create: {
      amount: 'Amount',
      fee: 'Fee',
      setTransactionFee: 'Set a transaction fee',
      headerText:
        'When there is a large number of pending transaction on the network (>1500), the higher fee will result in your transaction being processed faster. The typical values are 1-500 sat/b',
    },
  },
  receive: {
    header: 'Receive coins',
    details: {
      amount: 'Amount',
      share: 'Share',
      shareWalletAddress: 'Share wallet address',
      receiveWithAmount: 'Receive with amount',
    },
  },
  settings: {
    language: 'Language',
    general: 'General',
    security: 'Security',
    about: 'About',
    electrumServer: 'Electrum server',
    advancedOptions: 'Advanced options',
    changePin: 'Change PIN',
    fingerprintLogin: 'Fingerprint login',
    aboutUs: 'About us',
    header: 'Settings',
    notSupportedFingerPrint: 'Your device does not support fingerprint',
    TouchID: 'Allow fingerprint',
    FaceID: 'Allow FaceID',
    Biometrics: 'Allow biometrics',
  },
  aboutUs: {
    header: 'About us',
    releaseNotes: 'Release notes',
    runSelfTest: 'Run self test',
    buildWithAwesome: 'Build with awesome:',
    rateGoldWallet: 'Rate GoldWallet',
    goToOurGithub: 'Go to our Github',
    alwaysBackupYourKeys: 'Always backup your keys',
    title: 'Gold wallet is a free and open source Bitcoin Vault wallet. Licensed MIT.',
  },
  electrumServer: {
    header: 'Electrum server',
    title: 'Change electrum server',
    description:
      'You can change the address of the server your application will connect to. Default address is recommended.',
    save: 'Save',
    useDefault: 'Use default',
    host: 'host',
    port: 'port',
    successfullSave: 'Your changes have been saved successfully. Restart may be required for changes to take effect.',
    connectionError: "Can't connect to provided Electrum server",
  },
  advancedOptions: {
    title: 'Configure advanced options',
    description:
      'Enabling Advanced options will allow you to choose from wallet types listed below: \nP2SH, HD P2SH, HD segwit.',
  },
  selectLanguage: {
    header: 'Language',
    restartInfo: 'When selecting a new language, restarting GoldWallet may be required for the change to take effect',
    confirmation: 'Confirmation',
    confirm: 'Confirm',
    alertDescription: 'Select language and restart the application?',
    cancel: 'Cancel',
  },
  contactList: {
    cancel: 'Cancel',
    search: 'Search',
    screenTitle: 'Address book',
    noContacts: 'No contacts',
    noContactsDesc1: 'No contacts to show. \n Click',
    noContactsDesc2: 'to add your first contact.',
    noResults: 'No results for',
  },
  contactCreate: {
    screenTitle: 'Add new contact',
    subtitle: 'New contact',
    description: 'Please enter name and address\nfor your new contact.',
    nameLabel: 'Name',
    addressLabel: 'Address',
    buttonLabel: 'Add new contact',
    successTitle: 'Success',
    successDescription: 'Hooray! You have successfully\nadded your contact.',
    successButton: 'Return to Address book',
    nameMissingAlphanumericCharacterError: 'Name is missing alphanumeric character.',
    nameCannotContainSpecialCharactersError: 'Name cannot contain special characters.',
  },
  contactDetails: {
    nameLabel: 'Name',
    addressLabel: 'Address',
    editName: 'Edit name',
    editAddress: 'Edit address',
    sendCoinsButton: 'Send coins',
    showQRCodeButton: 'Show QR code',
    deleteButton: 'Delete contact',
    share: 'Share',
  },
  contactDelete: {
    title: 'Delete your contact',
    header: 'Delete contact',
    description1: 'Are you sure you want to delete',
    description2: "?\nYou can't undone it.",
    no: 'No',
    yes: 'Yes',
    success: 'Success',
    successDescription: 'Your contact has been successfully deleted.\nYou can now return to Address book.',
    successButton: 'Return to Address book',
  },
  scanQrCode: {
    permissionTitle: 'Permission to use camera',
    permissionMessage: 'We need your permission to use your camera',
    ok: 'Ok',
    cancel: 'Cancel',
  },
  filterTransactions: {
    received: 'Received',
    sent: 'Sent',
    header: 'Filter transactions',
    receive: 'Receive',
    send: 'Send',
    filter: 'Filter',
    to: 'To',
    toAmount: 'To amount',
    toDate: 'To date',
    from: 'From',
    fromAmount: 'From amount',
    fromDate: 'From date',
    clearFilters: 'Clear filters',
    transactionType: 'Transaction type',
    transactionStatus: 'Transaction status',
    status: {
      pending: 'Pending',
      unblocked: 'Unblocked',
      done: 'Done',
      canceled: 'Canceled',
    },
  },
  security: {
    jailBrokenPhone:
      'Your device appears to be jailbroken. This may occurs security issues, crashes, or other problems. We do not recommend using GoldWallet with jailbroken device.',
    rootedPhone:
      'Your device appears to be rooted. This may occurs security issues, crashes, or other problems. We do not recommend using GoldWallet with rooted device.',
    noPinOrFingerprintSet:
      'Your device appears to not have a PIN or fingerprint set. We do not recommend using GoldWallet with a not secured device.',
    title: 'Security issue',
  },
  betaVersion: {
    title: 'This is a beta version\nof the GoldWallet',
    description:
      'It is still undergoing final testing before its official release. The mobile app and all content found on it are provided on an “as is” and “as available” basis. The use of the software is done at the user’s own risk.',
    button: 'I accept the risk',
  },
};
