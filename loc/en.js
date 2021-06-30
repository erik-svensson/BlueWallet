module.exports = {
  _: {
    bad_password: 'Bad password, try again',
    cancel: 'Cancel',
    click: 'Click',
    confirm: 'Confirm',
    continue: 'Continue',
    copied: 'Copied!',
    copy: 'Copy',
    created: 'Created on',
    delete: 'Delete',
    details: 'Details',
    enter_password: 'Enter password',
    here: 'here',
    invalid: 'Invalid',
    languageCode: 'en',
    never: 'never',
    next: 'Next',
    ok: 'OK',
    or: 'or',
    satoshi: 'Sat',
    save: 'Save',
    scan: 'Scan',
    storage_is_encrypted: 'Your storage is encrypted. Password is required to decrypt it',
    skip: 'Skip this step',
    add: 'Add',
    undo: 'Undo',
    yes: 'Yes',
    no: 'No',
  },
  order: {
    first: 'first',
    second: 'second',
    third: 'third',
    fourth: 'fourth',
    fifth: 'fifth',
    sixth: 'sixth',
  },
  time: {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
  },
  airdrop: {
    title: 'Airdrop',
    dateOfAirdrop: 'Date of Airdrop:',
    community: {
      header: 'Airdrop rewards',
      name: 'Community',
      description: 'Check the rewards and community progress',
      carouselItemHeader: 'Community progress',
      user: 'user',
      users: 'users',
      airdropParticipants: 'Airdrop participants',
      goal: 'The {order} goal:',
      unlockToIncrease: 'Unlock to increase Airdrop to {reward}$',
      thresholdUsers: '{threshold} users',
    },
    circularWalletBalance: {
      yourBalance: 'Your balance',
    },
    createWallet: {
      doYouWantToTakePart: 'Do you want to take part in the Airdrop?',
    },
    dashboard: {
      createNewWallet: 'Create new wallet',
      desc1: 'Add your wallets before time runs out.',
      desc1WithWallets: 'Monitor your progress and register more wallets.',
      desc2: 'Create or add a wallet to take part in the Airdrop.',
      cantConnectToServerLine1: 'Couldn’t connect to the server.',
      cantConnectToServerLine2: 'Please try again in a few minutes.',
      loading1: 'Waiting for the server.',
      loading2: 'It may take a few seconds.',
      availableWallets: 'Available wallets',
      registeredWallets: 'Registered wallets',
    },
    itIsAlive: {
      subtitle: 'Airdrop is live!',
      description: 'Our first BTCV airdrop is here.\nCheck it out to get rewards!',
      notNow: 'Not now',
      learnMore: 'Learn more',
    },
    requirements: {
      soundsGreat: 'Sounds great!',
      subtitle: 'Thank you for being a part of Bitcoin Vault',
      description: 'We want to share ${airdropTotalDollarsToShare} in BTCV to reward you for being with us!',
      listHeader: 'Requirements for the Airdrop:',
      points: {
        0: '3-Key Vault Wallet',
        1: 'At least {airdropMinimumBTCVRequired} BTCV stored on the wallet*',
      },
      rewardExplanation: '*Your reward depends on how many coins you have in the general pool.',
      soundsGreat: 'Sounds great!',
      termsAndConditions: {
        read: 'Read',
        termsAndConditions: 'Terms and Conditions',
      },
    },
    walletsCarousel: {
      shrimp: 'Shrimp',
      crab: 'Crab',
      shark: 'Shark',
      whale: 'Whale',
      yourNextGoal: 'Your {order} goal:',
      avatarTeaser: 'Become a {goalName}: {goalThreshold} {unit}',
      youReachedGoal: 'You reached goal: ',
    },
    finished: {
      subtitle: 'Airdrop is over!',
      stayTuned: 'Stay tuned for more in {period}',
      shareIt: 'Share it with others',
      checkOutData: 'Want to know more about it?',
      readFullReport: 'Read our full report on',
      medium: 'Medium',
      registeredWallets: 'Registered wallets',
    },
    createWalletSuccess: {
      success: 'Hooray! \n  You have successfully registered to Airdrop!',
      successWithNotifications:
        'Hooray! \n  You have successfully subscribed to notifications and registered for Airdrop!',
      shareIt: 'Share it with others and get {rewardValue} BTCV reward!*',
      maxReward: '*Maximum reward for one wallet is {rewardValue} BTCV.',
      successCompletedButton: 'Go to {routeName}',
    },
  },
  termsConditions: {
    header: 'Terms & Conditions',
    title: 'Agreement to Terms',
    text: '',
    readTermsConditions: 'I’ve read Terms & Conditions',
    readPrivacyPolicy: 'I’ve read Privacy Policy',
    buttons: { agree: 'I agree', disagree: 'I disagree' },
    modal: {
      header: 'Are you sure?',
      text:
        'Note that if you disagree to our Terms & Conditions you won’t be able to use the Gold Wallet application.\nAre you sure you want to disagree?',
      noButton: 'No, I changed my mind',
      yesButton: 'Yes, I disagree',
    },
  },
  aboutUs: {
    alwaysBackupYourKeys: 'Always backup your keys',
    buildWithAwesome: 'Build with awesome:',
    goToOurGithub: 'Go to our Github',
    header: 'About us',
    rateGoldWallet: 'Rate GoldWallet',
    releaseNotes: 'Release notes',
    runSelfTest: 'Run self test',
    title: 'Gold wallet is a free and open source Bitcoin Vault wallet. Licensed MIT.',
  },
  advancedOptions: {
    description:
      'Enabling Advanced options will allow you to choose from wallet types listed below: \n P2SH, HD P2SH, HD segwit.',
    title: 'Configure advanced options',
  },
  authenticators: {
    add: {
      description:
        'You will need it to pair Gold Wallet with desktop application Electrum Vault. It will serve as two-factor authentication.',
      subdescription: 'You can also import your authenticator by choosing the option below.',
      subtitle: 'Create new authenticator',
      successDescription:
        "Write down this seed phrase somewhere safe. It's your backup in case you need to restore your authenticator. Remember that the authenticator is necessary to confirm Fast and Cancel transactions.",
      successTitle: 'Your authenticator is ready!',
      title: 'Add new authenticator',
    },
    delete: {
      subtitle: 'Delete your authenticator',
      success: 'Your authenticator has been successfully deleted. You can always create a new one.',
      title: 'Delete authenticator',
    },
    enterPIN: {
      description: 'Enter this PIN into the Electrum Vault desktop application to finish the pairing process.',
      subtitle: 'Enter PIN',
    },
    errors: { noEmpty: 'Field can not empty' },
    export: { title: 'Export authenticator' },
    import: {
      code: 'Code:',
      desc1: 'Write down the seed phrase or scan the QR code of the authenticator you want to import.',
      desc2: 'scan QR code by clicking on “or scan QR code” below',
      inUseValidationError: 'Name must be unique. Please enter a valid name.',
      mnemonicLength: 'Mnemonic should have 12 words',
      multipleQrCodesDescription:
        'Some transactions generate multiple QR codes. Make sure to scan all of them from the Electrum Vault application.',
      multipleQrCodesTitle: 'Scan another QR code',
      scanNext: 'Scan next',
      subtitle: 'Import your authenticator',
      success: 'You have successfully imported your authenticator. It is now ready to use.',
      textAreaPlaceholder: 'Seed phrase',
      title: 'Import authenticator',
    },
    list: {
      noAuthenticators: 'No Authenticators yet',
      noAuthenticatorsDesc1: 'Tap',
      noAuthenticatorsDesc2: 'to add your first authenticator.',
      scan: 'Scan',
      title: 'Bitcoin Vault authenticators',
    },
    options: {
      delete: 'Delete authenticator',
      export: 'Export authenticator',
      pair: 'Pair authenticator',
      sectionTitle: 'General',
      title: 'Authenticator options',
    },
    pair: {
      descPin: 'Use this PIN to confirm authenticator pairing on your desktop application.',
      descPublicKey:
        'You can use this Public Key to import your authenticator in the desktop application during the wallet creation process with the GoldWallet option.',
      pin: 'PIN',
      publicKey: 'Public Key',
      title: 'Pair authenticator',
    },
    publicKey: {
      okButton: 'OK, I understand',
      subtitle:
        'You can use this Public Key to import your authenticator to the Electrum Vault desktop application during the creation of the 2FA wallet.',
      title: 'Public Key',
    },
    sign: {
      error: 'None of the authenticators were able to sign the transaction',
    },
  },
  betaVersion: {
    button: 'I accept the risk',
    description:
      'It is still undergoing final testing before its official release. The mobile app and all content found on it are provided on an “as is” and “as available” basis. The use of the software is done at the user’s own risk.',
    title: 'This is a beta version\n of the GoldWallet',
  },
  contactCreate: {
    addressLabel: 'Address',
    buttonLabel: 'Add new contact',
    description: 'Please enter name and address\n for your new contact.',
    nameCannotContainSpecialCharactersError: 'Name cannot contain special characters.',
    nameCannotEmpty: 'Name cannot be empty field',
    nameLabel: 'Name',
    nameMissingAlphanumericCharacterError: 'Name is missing alphanumeric character.',
    screenTitle: 'Add new contact',
    subtitle: 'New contact',
    successButton: 'Return to Address book',
    successDescription: 'Hooray! You have successfully\n added your contact.',
    successTitle: 'Success',
  },
  contactDelete: {
    description1: 'Are you sure you want to delete',
    description2: "?\n You can't undone it.",
    header: 'Delete contact',
    no: 'No',
    success: 'Success',
    successButton: 'Return to Address book',
    successDescription: 'Your contact has been successfully deleted.\n You can now return to Address book.',
    title: 'Delete your contact',
    yes: 'Yes',
  },
  contactDetails: {
    addressLabel: 'Address',
    deleteButton: 'Delete contact',
    editAddress: 'Edit address',
    editName: 'Edit name',
    nameLabel: 'Name',
    sendCoinsButton: 'Send coins',
    share: 'Share',
    showQRCodeButton: 'Show QR code',
  },
  contactList: {
    cancel: 'Cancel',
    noContacts: 'No contacts',
    noContactsDesc1: 'No contacts to show. \n  Click',
    noContactsDesc2: 'to add your first contact.',
    noResults: 'No results for',
    screenTitle: 'Address book',
    search: 'Search',
  },
  electrumServer: {
    connectionError: "Can't connect to provided Electrum server",
    description:
      'You can change the address of the server your application will connect to. Default address is recommended.',
    header: 'Electrum server',
    host: 'host',
    port: 'port',
    save: 'Save',
    successfullSave: 'Your changes have been saved successfully. Restart may be required for changes to take effect.',
    title: 'Change electrum server',
    useDefault: 'Use default',
  },
  filterTransactions: {
    clearAll: 'Clear all',
    clearFilters: 'Clear filters',
    filter: 'Filter',
    from: 'From',
    fromAmount: 'From amount',
    fromDate: 'From date',
    header: 'Filter transactions',
    receive: 'Receive',
    received: 'Received',
    send: 'Send',
    sent: 'Sent',
    status: {
      canceled: 'Canceled',
      canceledDone: 'Canceled-done',
      done: 'Done',
      pending: 'Pending',
    },
    to: 'To',
    toAmount: 'To amount',
    toDate: 'To date',
    transactionStatus: 'Transaction status',
    transactionType: 'Transaction type',
  },
  message: {
    allDone: 'All done!',
    bePatient: 'Please be patient, it may take a while.',
    cancelTxSuccess: 'You have successfully canceled your transaction.\n Your coins are on the way.',
    creatingAuthenticator: 'Creating your authenticator',
    creatingAuthenticatorDescription: 'Please be patient while we create your authenticator.\n It may take a while.',
    creatingWallet: 'Creating your wallet',
    creatingWalletDescription: 'Please be patient while we create your wallet.\n It may take a while.',
    generateAddressesError: 'Couldn`t generate addresses',
    hooray: 'Hooray!',
    importingAuthenticator: 'Importing your authenticator',
    importingAuthenticatorDescription: 'Please be patient while we import your authenticator.\n It may take a while.',
    noTransactions: 'No transactions found on the wallet',
    noTransactionsDesc: 'You are probably trying to import a wallet that has never been used',
    processing: 'Processing',
    returnToAuthenticators: 'Return to Authenticators',
    returnToDashboard: 'Return to Dashboard',
    returnToWalletChoose: 'Return to the wallet type selection',
    returnToWalletImport: 'Return to wallet import',
    somethingWentWrong: 'Something went wrong',
    somethingWentWrongWhileCreatingWallet:
      'Something went wrong while we were creating your wallet. Please return to Dashboard and try again.',
    success: 'Success',
    successfullWalletDelete: 'Your wallet has been successfully deleted. You can now return to Dashboard.',
    successfullWalletImport: "You have successfully imported your wallet. It's now ready to use.",
    wrongMnemonic: 'Wrong mnemonic',
    wrongMnemonicDesc:
      'Your mnemonic does not match any supported wallet. You are trying to import an invalid mnemonic or wallet that has never been used',
    goToWalletDetails: 'Go to Wallet Details',
    successSubscription: 'Hooray!\n You have successfully subscribed to notifications.',
  },
  notifications: {
    addYourAddress: 'Add your email address',
    addYourEmailFor: 'Add your email for notifications',
    addEmail: 'Add email',
    addYourAddressDescription: 'It is used to send you transaction notifications from chosen wallets.',
    addYourEmailForDescription:
      'You can add your email address. It is used to send you transaction notifications from chosen wallets.',
    change: 'Change your email',
    title: 'Configure your notifications',
    yourEmail: 'Your email',
    description:
      'You can change your email address. It is used to send you transaction notifications from chosen wallets.',
    delete: 'Delete email',
    invalidAddressError: 'Enter a valid email address',
    yourSubscriptions: 'Your subscriptions',
    confirmEmail: 'Confirm your email address',
    pleaseEnter: 'Please enter the code we sent to: ',
    resend: 'Resend code',
    getNotification: 'Get notifications',
    chooseWalletsDescription: 'Choose wallets from which you’d like to receive transaction notifications',
    chooseWalletsToUnsubscribeDescription:
      'You can choose the wallets from which you want to unsubscribe from notifications.',
    emailAddedSuccessMessage: 'Hooray!\n You have successfully added your email address.',
    goToNotifications: 'Go to Notifications',
    changeEmailTitle: 'Change your email',
    changeEmailDescription:
      'You can change your email address. It is used to send you transaction notifications from chosen wallets.',
    yourCurrentEmail: 'Your current email',
    theSameAddressError: "You can't enter your current email address",
    newEmail: 'New email',
    invalidName: 'Invalid wallet name',
    confirmCurrentTitle: 'Confirm your current email address',
    confirmNewTitle: 'Confirm your new email address',
    confirmNewDescription: 'Now confirm your new email address. Please enter the code we sent to ',
    emailChangedSuccessMessage: 'Hooray!\n You have successfully updated your email address.',
    updateNotificationPreferences: 'Hooray!\n You have successfully updated your notification preferences.',
    verifyAction: 'Verify this action',
    verifyActionDescription: 'To confirm the request, please enter the code we sent to ',
    deleteEmail: 'Delete email address',
    deleteYourEmail: 'Delete your email',
    deleteYourEmailDescription: 'your email address',
    deleteEmailSuccessMessage: 'Hooray!\n You have successfully deleted your email address.',
    codeError: 'Please enter a valid code.\n You have {attemptsLeft} more attempts.',
    codeFinalError: 'You have entered an invalid code 3 times.\n We have sent a new code to your email address.',
    walletSubscribedSuccessMessage:
      'Hooray!\n You have successfully added your email address and subscribed to the notifications.',
    no: 'No',
    yes: 'Yes',
    notifications: 'Notifications',
    receiveTransactionDescription:
      'Would you like to receive transaction notifications from this wallet to your email address ',
    noteFirst: 'Note: ',
    noteSecond: 'If you want to change your email address you can do it later in Settings.',
    noSubscriptionDescription: 'You are not subscribed to any notifications.',
    genericError: "Something went wrong. We're sorry.",
    pushnotificationsSettings: {
      title: 'Allow app notifications',
      label: 'Settings',
    },
  },
  onboarding: {
    changePin: 'Change PIN',
    confirmNewPin: 'Confirm new PIN',
    confirmPassword: 'Confirm transaction password',
    confirmPin: 'Confirm PIN',
    createNewPin: 'New PIN',
    createPassword: 'Create transaction password',
    addNotificationEmailDescription:
      'If you want to receive email notifications, please enter your email address. We will send you information about your transaction statuses. You can always change it later in Settings.',
    createPasswordDescription:
      'Your Transaction Password will be used to verify all of the transactions. You cannot change it later. Transaction Password must contain at least 8 alphanumerical characters.',
    createPin: 'Create PIN',
    createPinDescription:
      'Your PIN will be used to log in to the application. You can change it later in the Settings section.',
    currentPin: 'Current PIN',
    failedTimes: 'Failed times',
    failedTimesErrorInfo: 'After three unsuccessful attempts, entering will be blocked for',
    goBack: 'Go back',
    minutes: 'minutes.',
    numberOfAttemptsExceeded: 'The number of attempts exceeded',
    onboarding: 'Onboarding',
    passwordDoesNotMatch: 'Password does not match. Please enter a valid password.',
    pin: 'PIN',
    pinDoesNotMatch: 'PIN does not match. Please enter a valid PIN.',
    seconds: 'seconds',
    successButton: 'Go to Dashboard',
    successButtonChangedPin: 'Go back to Settings',
    successDescription: 'Hooray! \n  You have successfully created your PIN.',
    successDescriptionChangedPin: 'Hooray! \n  You have successfully changed your PIN.',
    tryAgain: 'Try again after',
    resendCodeError: 'You have entered an invalid code 3 times. \n We have sent a new code to your email address.',
    successCompletedDescription: 'Hooray! \n You have successfully finished your onboarding proccess.',
    successCompletedButton: 'Go To Wallets',
  },
  receive: {
    details: {
      amount: 'Amount',
      receiveWithAmount: 'Receive with amount',
      receiveWithAmountSubtitle:
        'Enter the amount which you would like to receive. The QR code will update accordingly to include the amount.',
      share: 'Share',
      shareWalletAddress: 'Share wallet address',
    },
    header: 'Receive coins',
    label: 'Wallet address',
  },
  scanQrCode: {
    cancel: 'Cancel',
    ok: 'Ok',
    permissionMessage: 'We need your permission to use your camera',
    permissionTitle: 'Permission to use camera',
  },
  security: {
    jailBrokenPhone:
      'Your device appears to be jailbroken. This may occurs security issues, crashes, or other problems. We do not recommend using GoldWallet with jailbroken device.',
    noPinOrFingerprintSet:
      'Your device appears to not have a PIN or fingerprint set. We do not recommend using GoldWallet with a not secured device.',
    rootedPhone:
      'Your device appears to be rooted. This may occurs security issues, crashes, or other problems. We do not recommend using GoldWallet with rooted device.',
    title: 'Security issue',
  },
  selectLanguage: {
    alertDescription: 'Select language and restart the application?',
    cancel: 'Cancel',
    confirm: 'Confirm',
    confirmation: 'Confirmation',
    header: 'Language',
    restartInfo: 'When selecting a new language, restarting GoldWallet may be required for the change to take effect',
  },
  send: {
    confirm: {
      availableBalance: 'Available balance after transaction',
      cancelNow: 'Cancel now',
      pendingBalance: 'Blocked balance after transaction',
      sendNow: 'Send now',
    },
    create: {
      amount: 'Amount',
      fee: 'Fee',
      headerText:
        'When there is a large number of pending transaction on the network (>1500), the higher fee will result in your transaction being processed faster. The typical values are 1-500 sat/b',
      setTransactionFee: 'Set a transaction fee',
    },
    details: {
      address: 'address',
      address_field_is_not_valid: 'Address field is not valid',
      amount_field_is_not_valid: 'Amount field is not valid',
      amount_is_too_high: "There is a maximum of {maxCoinsInput} BTCV that will ever exist, so don't try to send more!",
      amount_is_negative: 'Amount can not be negative',
      amount_field_is_less_than_minSatoshi: 'The minimum amount you can send is 1 Satoshi',
      amount_placeholder: 'amount to send (in BTCV)',
      cancel: 'Cancel',
      create: 'Create Invoice',
      create_tx_error: 'There was an error creating the transaction. Please, make sure the address is valid.',
      fee: 'Fee:',
      fee_field_is_not_valid: 'Fee field is not valid',
      fee_placeholder: 'plus transaction fee (in BTCV)',
      feeUnit: 'Sat/B',
      next: 'Next',
      note: 'Note (optional)',
      note_placeholder: 'note to self',
      remaining_balance: 'Remaining balance',
      scan: 'Scan',
      send: 'Send',
      title: 'create transaction',
      to: 'to',
      total_exceeds_balance: 'The sending amount exceeds the available balance.',
    },
    error: {
      doubleSpentFunds: 'You are trying to spend funds that have been already spent.',
      notExistingFunds: `You are trying to spend funds that don't exists.`,
      dust: 'You are trying to send for a small amount',
      description: 'Before creating a transaction, you must first add a Bitcoin Vault wallet.',
      title: 'Error',
    },
    header: 'Send coins',
    recovery: {
      confirmFirstSeed: 'Confirm with Cancel Seed Phrase',
      confirmFirstSeedDesc:
        'Open the first PDF document you generated when you created your wallet and write down the Private Key seed phrase in the same order.',
      confirmSecondSeed: 'Confirm with Fast Seed Phrase',
      confirmSecondSeedDesc:
        'Open the second PDF document you generated when you created your wallet and write down the Private Key seed phrase in the same order.',
      confirmSeed: 'Confirm with Cancel Seed Phrase',
      confirmSeedDesc:
        'Open the PDF document you generated when you created your wallet and write down the Private Key seed phrase in the same order.',
      recover: 'Cancel',
      useWalletAddress: 'Use address of this wallet',
    },
    success: {
      description: 'You have successfully sent your coins.',
      done: 'Done',
      return: 'Return to Dashboard',
      title: 'Success',
    },
    transaction: {
      alert: 'Secure',
      alertDesc:
        'This transaction needs 144 blocks or about 24 hours to be confirmed. You can cancel it within this time.',
      fastSuccess: 'You have successfully made your fast transaction.',
      instant: 'Secure Fast',
      instantDesc: 'This transaction will be confirmed immediately. Use with extreme caution.',
      lightningError:
        'This address appears to be for a Lightning invoice. Please, go to your Lightning wallet in order to make a payment for this invoice.',
      scanInstantKeyDesc:
        'Open the PDF document you generated when you created your wallet and scan the Private Key QR code to send the transaction.',
      scanInstantKeyTitle: 'Scan the Fast Key',
      type: 'Transaction type',
      watchOnlyError: 'Watch only wallets cannot send transactions',
    },
    warning: 'Warning: ',
    warningGeneral:
      'Please be aware that in the process of using the Secure Transaction feature, a part of the funds left in your wallet might be blocked. This is a normal procedure linked to UTXO and the blockchain parameters of the Bitcoin Vault wallet. Your funds will be unblocked once the transaction is verified (after approximately 24 hrs) or canceled (within 24 hrs).',
  },
  settings: {
    about: 'About',
    terms: 'Terms & Privacy',
    aboutUs: 'About us',
    advancedOptions: 'Advanced options',
    Biometrics: 'Allow biometrics',
    changePin: 'Change PIN',
    electrumServer: 'Electrum server',
    FaceID: 'Allow FaceID',
    fingerprintLogin: 'Fingerprint login',
    general: 'General',
    header: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    notSupportedFingerPrint: 'Your device does not support fingerprint',
    security: 'Security',
    TouchID: 'Allow fingerprint',
  },
  tabNavigator: {
    addressBook: 'Address book',
    authenticators: 'Authenticators',
    settings: 'Settings',
    wallets: 'Wallets',
  },
  timeCounter: {
    closeTheApp: 'Close the application',
    description:
      'Your application has been blocked due to the unsuccessful login attempts. Please wait required time in order to try again.',
    title: 'Application blocked',
    tryAgain: 'Try again',
  },
  transactions: {
    details: {
      addNote: 'Add note',
      addToAddressBook: 'Add to Address book',
      amount: 'Amount',
      blocked: 'Blocked',
      bytes: 'bytes',
      confirmations: 'confirmations',
      copy: 'Copy',
      copyAndBoriadcast: 'Copy and broadcast later',
      details: 'Details',
      detailTitle: 'Transaction details',
      fee: 'Fee:',
      from: 'From',
      inputs: 'Inputs',
      noLabel: 'No label',
      note: 'Note',
      numberOfCancelTransactions: 'Number of Cancel transactions',
      ouputs: 'Outputs',
      returnedFee: 'Returned fee:',
      satoshiPerByte: 'Satoshi per byte',
      sendCoins: 'Send coins',
      timePending: 'Time pending',
      title: 'Transaction',
      to: 'To',
      toExternalWallet: 'To the external wallet',
      toInternalWallet: 'To the internal wallet',
      totalReturnedFee: 'Total returned fee:',
      transactioFee: 'Transaction fee',
      transactionDetails: 'Transaction details',
      transactionHex: 'Transaction hex',
      transactionHexDescription: 'This is transaction hex, signed and ready to be broadcast to the network',
      transactionId: 'Transaction ID',
      transactionType: 'Transaction type',
      txSize: 'TX size',
      unblocked: 'Unblocked',
      verify: 'Verify on coinb.in',
      viewInBlockRxplorer: 'View in block explorer',
      walletType: 'Wallet type',
    },
    errors: {
      notEnoughBalance: 'Not enough balance. Please, try sending a smaller amount.',
    },
    label: {
      blocked: 'blocked',
      canceled: 'canceled',
      canceledDone: 'canceled - done',
      done: 'done',
      pending: 'pending',
      unblocked: 'unblocked',
    },
    list: { conf: 'Confirmations' },
    transactionTypeLabel: {
      canceled: 'Canceled',
      secure: 'Secure',
      secureFast: 'Secure Fast',
      standard: 'Standard',
    },
  },
  unlock: {
    confirmButton: 'Confirm fingerprint to continue.',
    enter: 'Enter PIN',
    title: 'Unlock',
    touchID: 'Touch ID for "Gold Wallet"',
  },
  unlockTransaction: {
    description: 'Enter your Transaction Password to proceed.',
    headerText: 'Confirm transaction',
    title: 'Confirm Transaction',
  },
  wallets: {
    add: {
      createWalletButton: 'Create new wallet',
      addWalletButton: 'Add new wallet',
      advancedOptions: 'Advanced options',
      air: 'Makes Secure, Cancel, and Secure Fast transactions.',
      ar: 'Makes Secure and Cancel transactions.',
      description: 'Choose the name and type of your wallet.',
      failed: 'Failed to create wallet',
      importWalletButton: 'Import wallet',
      inputLabel: 'Name',
      legacy: 'Makes default types of transactions.',
      legacyHDP2SH: 'Contains a tree of P2SH addresses generated from a single 12-word seed',
      legacyHDP2SHTitle: 'Standard HD P2SH',
      LegacyHDSegWit: 'Contains a tree of native segwit addresses, generated from a single 12-word seed',
      legacyHDSegWitTitle: 'Standard HD SegWit',
      LegacyP2SH: 'Contains a single P2SH address',
      legacyP2SHTitle: 'Standard P2SH',
      legacyTitle: 'Standard',
      multipleAddresses: 'It contains a tree of P2SH addresses generated from a single 12-word seed',
      publicKeyError: 'Provided public key is invalid',
      segwidAddress: 'It contains a tree of native segwit addresses, generated from a single 12-word seed',
      singleAddress: 'It contains a single P2SH address',
      subtitle: 'Name your wallet',
      title: 'Add new wallet',
      walletType: 'Wallet type',
    },
    addSuccess: {
      description:
        "Write down this seed phrase somewhere safe. It's your backup in case you need to restore your wallet.",
      okButton: 'OK, I wrote this down',
      subtitle: 'Your wallet is ready!\n You created your wallet!',
      title: 'Add new wallet',
    },
    dashboard: {
      allWallets: 'All wallets',
      availableBalance: 'Available balance',
      noTransactions: 'No transactions to show.',
      noWallets: 'No wallets',
      noWalletsDesc1: 'Nothing to show. \nAdd your first wallet.',
      noWalletsDesc2: 'to add your first wallet.',
      receive: 'Receive',
      recover: 'Cancel',
      send: 'Send',
      title: 'Wallets',
      wallet: 'wallet',
    },
    deleteWallet: {
      description1: 'Are you sure you want to delete',
      description2: "? You can't undone it.",
      header: 'Delete wallet',
      no: 'No',
      title: 'Delete your wallet',
      yes: 'Yes',
    },
    details: {
      deleteWallet: 'Delete wallet',
      details: 'Details',
      edit: 'Edit',
      exportWallet: 'Export wallet',
      latestTransaction: 'Latest transaction',
      nameEdit: 'Edit name',
      nameLabel: 'Name',
      showWalletXPUB: 'Show wallet XPUB',
      typeLabel: 'Type',
      subscribeWallet: 'Subscribe to email notifications',
      unsubscribeWallet: 'Unsubscribe from email notifications',
    },
    errors: {
      duplicatedPublicKey: 'The public key has already been added',
      invalidMnemonic: 'Invalid mnemonic',
      invalidMnemonicWordsNumber: 'Provided {receivedWordsNumber} words expected {expectedWordsNumber}',
      invalidPrivateKey: 'Invalid private key',
      invalidPublicKey: 'Invalid public key',
      invalidQrCode: 'Invalid QR code',
      invalidSign: "Couldn't sign transaction",
      noIndexForWord: "Couldn't find index for word: {word}",
      wrongNetwork: `You have wallet on the network {walletNetworkName} while the app network is {appNetworkName}. Please contact our support on the Telegram.`,
    },
    export: { title: 'wallet export' },
    exportWallet: { header: 'Export wallet', title: 'Seed phrase' },
    exportWalletXpub: { header: 'Wallet XPUB' },
    import: {
      do_import: 'Import',
      error: 'Failed to import. Please, make sure that the provided data is valid.',
      explanation:
        "Write here your mnemonic, private key, WIF, or anything you've got. GoldWallet will do its best to guess the correct format and import your wallet",
      imported: 'Imported',
      scan_qr: 'or scan QR code instead?',
      success: 'Success',
      title: 'import',
    },
    importWallet: {
      chooseTypeDescription: 'Choose the type of the wallet you want to import.',
      customWords: 'Custom words',
      extendWithCustomWords: 'Extend this seed with custom words',
      header: 'Import wallet',
      import: 'Import',
      importARDescription1: 'Enter the seed phrase',
      importARDescription2: 'scan the QR code of the wallet you want to import',
      placeholder: 'Seed phrase',
      scanCancelPubKey: 'Scan the Cancel Key QR code',
      scanFastPubKey: 'Scan the Fast Key QR code',
      scanPublicKeyDescription:
        'Open the first PDF document you generated when you created the wallet you want to import and use this app to scan the Public Key QR code.',
      scanQrCode: 'or scan QR code',
      scanWalletAddress: 'Scan wallet address',
      scanWalletAddressDescription: 'Scan the Public Address QR code to start the integration with GoldWallet.',
      subtitle:
        "Write here your mnemonic, private key, WIF or anything you've got. GoldWallet will do its best to guess the correct format and import you wallet.",
      title: 'Import your wallet',
      unsupportedElectrumVaultMnemonic:
        'This seed is from Electrum Vault and is currently not supported. Will be supported in the near future.',
      walletInUseValidationError: 'Wallet is already in use. Please enter a valid wallet.',
      allWalletsValidationError: 'You cannot enter the name "All wallets"',
    },
    publicKey: {
      instantDescription:
        'Go to the web Key Generator on a separate device again, refresh the page and use this app to scan the new Public Key QR code. Remember to export your keys as a PDF!',
      instantSubtitle: 'Add Fast Key',
      recoveryDescription:
        'Go to the web Key Generator on a separate device and use this app to scan the Public Key QR code. Remember to export your keys as a PDF!',
      recoverySubtitle: 'Add Cancel Key',
      scan: 'Scan',
      webKeyGenerator: 'Web Key Generator:',
    },
    scanQrWif: {
      bad_password: 'Bad password',
      bad_wif: 'Bad WIF',
      cancel: 'Cancel',
      decoding: 'Decoding',
      go_back: 'Go Back',
      imported_legacy: 'Imported Legacy',
      imported_segwit: 'Imported SegWit',
      imported_watchonly: 'Imported Watch-only',
      imported_wif: 'Imported WIF',
      input_password: 'Input password',
      password_explain: 'This is BIP38 encrypted private key',
      wallet_already_exists: 'Such wallet already exists',
      with_address: 'with address',
    },
    wallet: {
      latest: 'Latest transaction',
      none: 'None',
      pendingBalance: 'Blocked balance',
    },
    walletModal: { btcv: 'BTCV', wallets: 'Wallets' },
  },
  connectionIssue: {
    noInternetTitle: 'No internet connection',
    noInternetDescription: 'Ensure that WI-FI or mobile data are turned on, then try again.',
    offlineMessageTitle: "You're offline",
    offlineMessageDescription: 'Connect to the internet to restore full functionality.',
    offlineMessageDescription2: 'Connect to the internet to continue using these functions.',
    noNetworkTitle: 'No network',
    noNetworkDescription:
      'Your internet works, but you are not connected to the network. Please wait a moment and try again.',
    electrumXNotConnected: 'Electrum client is not connected',
    couldntConnectToServer: 'Couldn’t connect to the server.',
  },
};
