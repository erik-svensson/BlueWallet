module.exports = {
  _: {
    bad_password: '密码错误，请重试',
    cancel: '取消',
    click: '点击',
    confirm: '确认',
    continue: '继续',
    copied: '复制！',
    copy: '复制',
    created: '创建于',
    delete: '删除',
    details: '细节',
    enter_password: '输入密码',
    here: '这里',
    invalid: '无效的',
    languageCode: '英语',
    never: '绝不',
    next: '下一个',
    ok: 'OK',
    or: '或者',
    satoshi: 'Sat',
    save: '保存',
    scan: '扫描',
    storage_is_encrypted: '您的存储空间已加密。 需要密码才能解密',
    skip: '跳过这一步',
  },
  termsConditions: {
    header: '条款和条件',
    title: '同意条款',
    readTermsConditions: '我已阅读条款和条件',
    readPrivacyPolicy: '我已阅读隐私政策',
    buttons: {
      agree: '我同意',
      disagree: '我不同意',
    },
    modal: {
      header: '您确定吗？',
      text: '请注意，如果您不同意我们的条款和条件，则将无法使用Gold Wallet应用程序。您确定不同意吗？',
      noButton: '不，我改变主意了',
      yesButton: '是的，我不同意',
    },
  },
  aboutUs: {
    alwaysBackupYourKeys: '请始终备份您的密钥',
    buildWithAwesome: '很棒的构建：',
    goToOurGithub: '前往我们的Github',
    header: '关于我们',
    rateGoldWallet: '评价GoldWallet',
    releaseNotes: '发行说明',
    runSelfTest: '运行自检',
    title: 'Gold wallet是免费开源比特币Vault钱包。 具有MIT许可证。 ',
  },
  advancedOptions: {
    description: '启用高级选项将允许您从下面列出的钱包类型中进行选择：P2SH, HD P2SH, HD segwit.',
    title: '配置高级选项',
  },
  authenticators: {
    add: {
      description: '您需要它来将Gold Wallet与桌面应用程序Electrum Vault配对。 它将用作双重身份验证器。',
      subdescription: '您还可以通过选择以下选项导入身份验证器。',
      subtitle: '创建新的身份验证器',
      successDescription:
        '在安全的地方写下这个种子短语。 这是您的备份，以备您需要还原身份验证器时使用。 请记住，验证器对于确认快速和取消交易是必不可少的。 ',
      successTitle: '您的身份验证器已准备就绪！',
      title: '添加新的身份验证器',
    },
    delete: {
      subtitle: '删除您的身份验证器',
      success: '您的身份验证器已成功删除。 您可以随时创建一个新的。',
      title: '删除身份验证器',
    },
    enterPIN: {
      description: '将此PIN输入Electrum Vault桌面应用程序以完成配对过程。',
      subtitle: '输入密码',
    },
    errors: {
      noEmpty: '字段不能为空',
    },
    export: {
      title: '导出身份认证器',
    },
    import: {
      code: '代码：',
      desc1: '写下种子短语或扫描要导入的身份验证器QR码。',
      desc2: '#ADR!',
      inUseValidationError: '#ADR!',
      mnemonicLength: '#ADR!',
      multipleQrCodesDescription: '#ADR!',
      multipleQrCodesTitle: '#ADR!',
      scanNext: '#ADR!',
      subtitle: '#ADR!',
      success: '#ADR!',
      textAreaPlaceholder: '#ADR!',
      title: '#ADR!',
    },
    list: {
      noAuthenticators: '#ADR!',
      noAuthenticatorsDesc1: '#ADR!',
      noAuthenticatorsDesc2: '添加您的第一个身份验证器。',
      scan: '扫描',
      title: '比特币Vault身份验证器',
    },
    options: {
      delete: '删除身份验证器',
      export: '导出身份验证器',
      pair: '配对身份验证器',
      sectionTitle: '常规',
      title: '身份验证器选项',
    },
    pair: {
      descPin: '#ADR!',
      descPublicKey: '#ADR!',
      pin: 'PIN码',
      publicKey: '公钥',
      title: '配对验证器',
    },
    publicKey: {
      okButton: '好，我懂了',
      subtitle: '在创建2FA钱包期间，可以使用此公钥将身份验证器导入到Electrum Vault桌面应用程序。 ',
      title: '公钥',
    },
    sign: {
      error: '#ADR!',
    },
  },
  betaVersion: {
    button: '#ADR!',
    description: '#ADR!',
    title: '#ADR!',
  },
  contactCreate: {
    addressLabel: '#ADR!',
    buttonLabel: '#ADR!',
    description: '#ADR!',
    nameCannotContainSpecialCharactersError: '#ADR!',
    nameCannotEmpty: '#ADR!',
    nameLabel: '#ADR!',
    nameMissingAlphanumericCharacterError: '#ADR!',
    screenTitle: '#ADR!',
    subtitle: '#ADR!',
    successButton: '#ADR!',
    successDescription: '#ADR!',
    successTitle: '#ADR!',
  },
  contactDelete: {
    description1: '#ADR!',
    description2: '#ADR!',
    header: '#ADR!',
    no: '#ADR!',
    success: '#ADR!',
    successButton: '#ADR!',
    successDescription: '#ADR!',
    title: '删除您的联系人',
    yes: '是的',
  },
  contactDetails: {
    addressLabel: '地址',
    deleteButton: '删除联络人',
    editAddress: '修改地址',
    editName: '修改姓名',
    nameLabel: '姓名',
    sendCoinsButton: '发送币',
    share: '分享',
    showQRCodeButton: '显示二维码',
  },
  contactList: {
    cancel: '取消',
    noContacts: '没有联络人',
    noContactsDesc1: '没有联系人可以显示。',
    noContactsDesc2: '添加您的第一个联系人。',
    noResults: '没有结果',
    screenTitle: '地址簿',
    search: '搜索',
  },
  electrumServer: {
    connectionError: '无法连接到提供的Electrum服务器',
    description: '您可以更改应用程序将连接到的服务器的地址。 建议使用默认地址。',
    header: 'Electrum服务器',
    host: 'Host',
    port: '端口',
    save: '保存',
    successfullSave: '您的更改已成功保存。 使更改生效，需要重新启动。 ',
    title: '更改elecrum服务器 ',
    useDefault: '默认情况下使用',
  },
  filterTransactions: {
    clearAll: '全部清除',
    clearFilters: '清除筛选',
    filter: '筛选',
    from: '从',
    fromAmount: '最小金额',
    fromDate: '起始日',
    header: '筛选交易',
    receive: '收到',
    received: '已收到',
    send: '发送',
    sent: '已发送',
    status: {
      canceled: '已取消',
      canceledDone: '取消完成',
      done: '完成',
      pending: '待处理',
    },
    to: '到',
    toAmount: '最大金额',
    toDate: '到期日',
    transactionStatus: '交易状态',
    transactionType: '交易类型',
  },
  message: {
    allDone: '全部完成！',
    bePatient: '请耐心等待，可能需要一段时间。',
    cancelTxSuccess: '您已经成功取消了交易。您的币即将退回。',
    creatingAuthenticator: '创建您的身份验证器',
    creatingAuthenticatorDescription: '在创建您的身份验证器时，请耐心等待。可能要花一点时间。',
    creatingWallet: '创建您的钱包',
    creatingWalletDescription: '在创建您的钱包时，请耐心等待。\n可能要花一点时间。',
    generateAddressesError: '无法生成地址',
    hooray: '太棒啦！',
    importingAuthenticator: '导入身份验证器',
    importingAuthenticatorDescription: '在我们导入您的身份验证器时，请耐心等待。\n可能要花一点时间。',
    noTransactions: '在钱包种找不到交易',
    noTransactionsDesc: '您可能正在尝试导入从未使用过的钱包',
    processing: '处理中',
    returnToAuthenticators: '返回身份验证器',
    returnToDashboard: '返回仪表盘',
    returnToWalletChoose: '返回钱包类型选择',
    returnToWalletImport: '返回钱包导入',
    somethingWentWrong: '出了点问题',
    somethingWentWrongWhileCreatingWallet: '我们在创建您的钱包时出了点问题。 请返回仪表盘，然后重试。',
    success: '成功',
    successfullWalletDelete: '您的钱包已成功删除。 您现在可以返回到仪表板。',
    successfullWalletImport: '您已成功导入钱包。 现在可以使用了。',
    wrongMnemonic: '助记符错误',
    wrongMnemonicDesc: '您的助记符与任何受支持的钱包都不匹配。 您正在尝试导入无效助记符或从未使用过的钱包',
    goToWalletDetails: '转到钱包详情',
    successSubscription: '太棒啦！\n您已经成功订阅了通知。',
  },
  notifications: {
    addYourAddress: '添加您的电子邮件地址',
    addYourEmailFor: '添加您的电子邮件以进行通知',
    addEmail: '新增电子邮件',
    addYourAddressDescription: '用于向您发送来自选定钱包的交易通知。',
    addYourEmailForDescription: '您可以添加您的电子邮件地址。用于向您发送来自选定钱包的交易通知。',
    change: '更改你的电子邮件',
    title: '配置您的通知',
    yourEmail: '您的的邮件',
    description: '您可以更改您的电子邮件地址。用于向您发送来自选定钱包的交易通知。',
    delete: '删除电子邮件',
    invalidAddressError: '输入一个有效的电子邮件地址',
    yourSubscriptions: '您的订阅',
    confirmEmail: '确认您的电邮地址',
    pleaseEnter: '请输入我们发送的代码：',
    resend: '重新发送验证码',
    getNotification: '接收通知',
    chooseWalletsDescription: '选择您要接收交易通知的钱包',
    chooseWalletsToUnsubscribeDescription: '您可以选择退订通知的钱包。 ',
    emailAddedSuccessMessage: '太棒啦！\n  您已成功添加您的电子邮件地址。',
    goToNotifications: '转到通知',
    changeEmailTitle: '更改您的电子邮件',
    changeEmailDescription: '您可以更改您的电子邮件地址。 用于向您发送来自选定钱包的交易通知。 ',
    yourCurrentEmail: '你正在使用的电子邮箱',
    theSameAddressError: '您无法输入当前的电子邮件地址',
    newEmail: '新邮件',
    confirmCurrentTitle: '确认您当前的电子邮件地址',
    confirmNewTitle: '确认您的新电子邮件地址',
    confirmNewDescription: '现在确认您的新电子邮件地址。 请输入我们发送的代码',
    emailChangedSuccessMessage: '太棒啦！\n  您已成功更新您的电子邮件地址。',
    updateNotificationPreferences: '太棒啦！\n  您已经成功更新了通知首选项。',
    verifyAction: '验证此动作',
    verifyActionDescription: '为了确认请求，请输入我们发送的代码',
    deleteEmail: '删除电子邮件地址',
    deleteYourEmail: '删除您的电子邮件',
    deleteYourEmailDescription: '您的电子邮件地址',
    deleteEmailSuccessMessage: '太棒啦！\n  您已成功删除您的电子邮件地址。',
    codeError: '请输入有效的代码。\n  您还有{attemptsLeft}次尝试机会。',
    codeFinalError: '您输入了3次无效代码。\n  我们已将新代码发送到您的电子邮件地址。',
    walletSubscribedSuccessMessage: '太棒啦！\n  您已经成功添加了电子邮件地址并订阅了通知。',
    no: '不',
    yes: '是',
    notifications: '通知',
    receiveTransactionDescription: '您想接收此钱包的交易通知到您的电子邮件地址吗？',
    noteFirst: '备注：',
    noteSecond: '如果您想更改您的电子邮件地址，可以稍后在“设置”中进行更改。',
    noSubscriptionDescription: '您尚未订阅任何通知。',
    genericError: '出了些问题。 我们很抱歉。',
  },
  onboarding: {
    changePin: '更改PIN码',
    confirmNewPin: '确认新PIN码',
    confirmPassword: '确认交易密码',
    confirmPin: '确认PIN码',
    createNewPin: '新PIN码',
    createPassword: '创建交易密码',
    addNotificationEmailDescription:
      '如果您想接收电子邮件通知，请输入您的电子邮件地址。 我们将向您发送有关您的交易状态的信息。 您以后可以随时在“设置”中进行更改。',
    createPasswordDescription:
      '您的交易密码将用于验证所有交易。 您以后无法更改。 交易密码必须至少包含8个字母数字字符。',
    createPin: '创建PIN',
    createPinDescription: '您的PIN码将用于登录该应用程序。 您以后可以在“设置”部分中对其进行更改。',
    currentPin: '当前PIN码',
    failedTimes: '失败次数',
    failedTimesErrorInfo: '尝试三次失败后，将被阻止输入',
    goBack: '返回',
    minutes: '分钟。',
    numberOfAttemptsExceeded: '超过允许尝试次数',
    onboarding: '加入',
    passwordDoesNotMatch: '密码不匹配。 请输入有效密码。',
    pin: 'PIN码',
    pinDoesNotMatch: '请输入有效的PIN码。',
    seconds: '秒',
    successButton: '前往仪表盘 ',
    successButtonChangedPin: '返回设置 ',
    successDescription: '太棒啦！\n您已经成功创建了PIN码。',
    successDescriptionChangedPin: '太棒啦！您已经成功更改了PIN码。',
    tryAgain: '稍后再试',
    resendCodeError: '您输入了3次无效代码。\n  我们已将新代码发送到您的电子邮件地址。',
    successCompletedDescription: '太棒啦！您已经成功完成了加入流程。',
    successCompletedButton: '转到钱包',
  },
  receive: {
    details: {
      amount: '数量',
      receiveWithAmount: '收到金额',
      receiveWithAmountSubtitle: '输入您想要收到的金额。 QR码将相应更新，以对应金额。',
      share: '分享',
      shareWalletAddress: '分享钱包地址',
    },
    header: '接收币',
    label: '钱包地址',
  },
  scanQrCode: {
    cancel: '取消',
    ok: '好的',
    permissionMessage: '我们需要您的许可才能使用您的相机',
    permissionTitle: '允许使用相机',
  },
  security: {
    jailBrokenPhone:
      '您的设备似乎越狱了。 这可能会发生安全隐患，崩溃或其他问题。 我们不建议将GoldWallet与越狱设备一起使用。 ',
    noPinOrFingerprintSet: '您的设备似乎没有设置PIN码或指纹识别。 我们不建议在不安全的设备上使用GoldWallet。 ',
    rootedPhone:
      '您的设备似乎已Rooted。 这可能会发生安全隐患，崩溃或其他问题。 我们不建议将GoldWallet与Rooted设备一起使用。 ',
    title: '安全问题',
  },
  selectLanguage: {
    alertDescription: '选择语言并重新启动应用程序？',
    cancel: '取消',
    confirm: '确认',
    confirmation: '确认',
    header: '语言',
    restartInfo: '选择新语言时，可能需要重新启动GoldWallet才能使更改生效 ',
  },
  send: {
    confirm: {
      availableBalance: '交易后可用余额',
      cancelNow: '立即取消',
      pendingBalance: '交易后冻结余额',
      sendNow: '立即发送',
    },
    create: {
      amount: '金额',
      fee: '费用',
      headerText: '当网络上有大量待处理交易（> 1500）时，较高的费用将使您的交易处理速度更快。 典型值为1-500 sat / b ',
      setTransactionFee: '设定交易费用',
    },
    details: {
      address: '地址',
      address_field_is_not_valid: '地址字段无效',
      amount_field_is_not_valid: '金额字段无效',
      amount_is_too_high: '最多将存在{maxCoinsInput}个BTCV，因此请不要尝试发送更多！ ',
      amount_is_negative: '金额不能为负',
      amount_field_is_less_than_minSatoshi: '您可以发送的最小金额是1个中本聪',
      amount_placeholder: '发送金额（以BTCV为单位）',
      cancel: '取消',
      create: '创建发票',
      create_tx_error: '创建交易时出错。 请确保地址有效。',
      fee: '费用：',
      fee_field_is_not_valid: '费用字段无效',
      fee_placeholder: '加上交易费用（以BTCV计）',
      feeUnit: 'Sat/ B',
      next: '下一个',
      note: '备注（可选）',
      note_placeholder: '自我备注',
      remaining_balance: '可用余额',
      scan: '扫描',
      send: '发送',
      title: '创建交易',
      to: '到',
      total_exceeds_balance: '发送金额超出了可用余额。',
    },
    error: {
      doubleSpentFunds: '您正在尝试花费已经花费的资金。',
      notExistingFunds: '您正在尝试花费不存在的资金。',
      dust: '您正在尝试少量发送',
      description: '在创建交易之前，必须先添加一个Bitcoin Vault钱包。',
      title: '错误\n',
    },
    header: '发送币 ',
    recovery: {
      confirmFirstSeed: '确认取消种子短语',
      confirmFirstSeedDesc: '打开创建钱包时生成的第一个PDF文档，并以相同顺序记下“私钥”种子短语。',
      confirmSecondSeed: '使用快速种子短语进行确认',
      confirmSecondSeedDesc: '打开创建钱包时生成的第二个PDF文档，并以相同顺序记下“私钥”种子短语。',
      confirmSeed: '使用取消种子短语进行确认',
      confirmSeedDesc: '打开创建钱包时生成的PDF文档，并以相同顺序记下“私钥”种子短语。',
      recover: '取消',
      useWalletAddress: '使用该钱包地址',
    },
    success: {
      description: '您已成功发送币。',
      done: '完成',
      return: '返回仪表盘',
      title: '成功',
    },
    transaction: {
      alert: '安全',
      alertDesc: '此交易需要144个区块或大约24小时才能确认。 您可以在此时间内取消交易。',
      fastSuccess: '您已成功进行了快速交易。',
      instant: '快速安全',
      instantDesc: '此交易将被立即确认。 使用时要格外小心。',
      lightningError: '该地址似乎是用于闪电发票的。 请转到您的Lightning钱包以为此发票付款。',
      scanInstantKeyDesc: '打开创建钱包时生成的PDF文档，然后扫描私钥QR码以发送交易。',
      scanInstantKeyTitle: '扫描快速密钥',
      type: '交易类型',
      watchOnlyError: '只看钱包不能发送交易',
    },
    warning: '警告：',
    warningGeneral:
      '请注意，在使用安全交易功能的过程中，您钱包中剩余的部分资金可能会被冻结。 这是链接到UTXO和Bitcoin Vault钱包的区块链参数的常规过程。 交易通过验证（大约24小时后）或取消（24小时内）后，您的资金将被取消冻结。 ',
  },
  settings: {
    about: '关于',
    terms: '条款和隐私',
    aboutUs: '关于我们',
    advancedOptions: '高级选项',
    Biometrics: '允许生物识别',
    changePin: '更改密码',
    electrumServer: 'Electrum服务器',
    FaceID: '允许FaceID',
    fingerprintLogin: '指纹登录',
    general: '常规',
    header: '设置',
    language: '语言',
    notifications: '通知',
    notSupportedFingerPrint: '您的设备不支持指纹识别',
    security: '安全',
    TouchID: '允许指纹识别',
  },
  tabNavigator: {
    addressBook: '地址簿',
    authenticators: '验证器',
    settings: '设置',
    wallets: '钱包',
  },
  timeCounter: {
    closeTheApp: '关闭应用程式',
    description: '您的应用程序由于登录尝试失败而被阻止。 请等待一定时间后，才能重试。 ',
    title: '应用程序被阻止',
    tryAgain: '再试一次',
  },
  transactions: {
    details: {
      addNote: '加注',
      addToAddressBook: '添加到地址簿',
      amount: '金额',
      blocked: '受阻',
      bytes: '个字节',
      confirmations: '确认',
      copy: '复制',
      copyAndBoriadcast: '稍后复制并广播',
      details: '细节',
      detailTitle: '交易详情',
      fee: '费用：',
      from: '从',
      inputs: '导入项',
      noLabel: '无标签',
      note: '备注',
      numberOfCancelTransactions: '取消交易数',
      ouputs: '导出项',
      returnedFee: '返还费：',
      satoshiPerByte: '每字节中本聪',
      sendCoins: '发送币',
      timePending: '待处理时间',
      title: '交易',
      to: '到',
      toExternalWallet: '到外部钱包',
      toInternalWallet: '到内部钱包',
      totalReturnedFee: '总返还费：',
      transactioFee: '交易费',
      transactionDetails: '交易详情',
      transactionHex: '交易十六进制',
      transactionHexDescription: '这是交易十六进制，已签名并准备好广播到网络',
      transactionId: '交易编码',
      transactionType: '交易类型',
      txSize: 'TX大小',
      unblocked: '已解锁',
      verify: '在coinb.in上验证',
      viewInBlockRxplorer: '在区块浏览器中查看',
      walletType: '钱包类型',
    },
    errors: {
      notEnoughBalance: '余额不足。 请尝试发送较小的金额。',
    },
    label: {
      blocked: '锁定',
      canceled: '已取消',
      canceledDone: '已取消-完成',
      done: '完成',
      pending: '待处理',
      unblocked: '已解锁',
    },
    list: {
      conf: '确认',
    },
    transactionTypeLabel: {
      canceled: '已取消',
      secure: '安全',
      secureFast: '快速安全',
      standard: '标准',
    },
  },
  unlock: {
    confirmButton: '确认指纹以继续。',
    enter: '输入密码',
    title: '解锁',
    touchID: '“Gold Wallet”触摸ID',
  },
  unlockTransaction: {
    description: '输入您的交易密码以继续。',
    headerText: '确认交易',
    title: '确认交易',
  },
  wallets: {
    add: {
      addWalletButton: '添加新钱包',
      advancedOptions: '高级选项',
      air: '进行安全，取消和安全快速交易。',
      ar: '进行安全和取消交易。',
      description: '选择您钱包的名称和类型。',
      failed: '创建钱包失败',
      importWalletButton: '导入钱包',
      inputLabel: '名字',
      legacy: '进行默认交易类型。',
      legacyHDP2SH: '包含由单个12字种子生成的P2SH地址树',
      legacyHDP2SHTitle: '标准HD P2SH',
      LegacyHDSegWit: '包含由单个12字种子生成的本机隔离见证地址树',
      legacyHDSegWitTitle: '标准HD 隔离见证',
      LegacyP2SH: '包含一个P2SH地址',
      legacyP2SHTitle: '标准P2SH',
      legacyTitle: '标准',
      multipleAddresses: '它包含由单个12字种子生成的P2SH地址树',
      publicKeyError: '提供的公钥无效',
      segwidAddress: '它包含由单个12字种子生成的本机隔离见证地址树',
      singleAddress: '它包含一个P2SH地址',
      subtitle: '为您的钱包命名',
      title: '新增钱包',
      walletType: '钱包类型',
    },
    addSuccess: {
      description: '在安全的地方写下这个种子短语。 如果您需要恢复钱包，这是您的备份。',
      okButton: '好，我写下来了',
      subtitle: '您的钱包已经准备好了！  您创建了钱包！',
      title: '添加新钱包',
    },
    dashboard: {
      allWallets: '所有钱包',
      availableBalance: '可用余额',
      noTransactions: '没有交易可显示。',
      noWallets: '没有钱包',
      noWalletsDesc1: '没有钱包可显示。',
      noWalletsDesc2: '添加您的第一个钱包。',
      receive: '收到',
      recover: '取消',
      send: '发送',
      title: '钱包',
      wallet: '钱包',
    },
    deleteWallet: {
      description1: '你确定你要删除',
      description2: '？ 您无法撤消。',
      header: '删除钱包',
      no: '不',
      title: '删除你的钱包',
      yes: '是',
    },
    details: {
      deleteWallet: '删除钱包',
      details: '详情',
      edit: '编辑',
      exportWallet: '导出钱包',
      latestTransaction: '最新交易',
      nameEdit: '修改名字',
      nameLabel: '名字',
      showWalletXPUB: '显示钱包XPUB',
      typeLabel: '类型',
      subscribeWallet: '订阅电子邮件通知',
      unsubscribeWallet: '退订电子邮件通知',
    },
    errors: {
      duplicatedPublicKey: '公钥已被添加',
      invalidMnemonic: '无效的助记符',
      invalidMnemonicWordsNumber: '提供了{expectedWordsNumber}个词  预期为{receivedWordsNumber}个词 ',
      invalidPrivateKey: '无效的私钥',
      invalidPublicKey: '无效的公钥',
      invalidQrCode: '无效的QR码',
      invalidSign: '无法签署交易',
      noIndexForWord: '找不到单词索引：{word}',
      wrongNetwork:
        '应用网络为{appNetworkName}时，您在网络{walletNetworkName}上有钱包。 请通过电报联系我们的支持团队。 ',
    },
    export: {
      title: '钱包导出',
    },
    exportWallet: {
      header: '导出钱包',
      title: '种子短语',
    },
    exportWalletXpub: {
      header: '钱包XPUB',
    },
    import: {
      do_import: '导入',
      error: '导入失败。 请确保提供的数据有效。',
      explanation: '在此处写下您的助记符，私钥，WIF或您拥有的所有内容。 GoldWallet会尽力猜测正确的格式并导入您的钱包',
      imported: '已导入',
      scan_qr: '或扫描QR码？',
      success: '成功',
      title: '导入',
    },
    importWallet: {
      chooseTypeDescription: '选择您要导入的钱包的类型。',
      customWords: '自定义词',
      extendWithCustomWords: '用自定义单词扩展此种子',
      header: '导入钱包',
      import: '导入',
      importARDescription1: '输入种子短语',
      importARDescription2: '扫描您要导入的钱包的QR码',
      placeholder: '种子词组',
      scanCancelPubKey: '扫描取消密钥QR码',
      scanFastPubKey: '扫描快速密钥QR码',
      scanPublicKeyDescription: '打开创建要导入的钱包时生成的第一个PDF文档，然后使用此应用程序扫描公共密钥QR码。',
      scanQrCode: '或扫描QR码',
      scanWalletAddress: '扫描钱包地址',
      scanWalletAddressDescription: '扫描公共地址QR码以开始与GoldWallet集成。',
      subtitle: '在此处写下您的助记符，私钥，WIF或任何您拥有的东西。 GoldWallet会尽力猜测正确的格式并导入您的钱包。',
      title: '导入您的钱包',
      unsupportedElectrumVaultMnemonic: '该种子来自Electrum Vault，目前不受支持。 将在不久的将来得到支持。',
      walletInUseValidationError: '钱包已在使用中。 请输入一个有效的钱包。',
      allWalletsValidationError: '您不能输入名称“所有钱包”',
    },
    publicKey: {
      instantDescription:
        '再次转到另一台设备上的Web密钥生成器，刷新页面，然后使用此应用程序扫描新的公共密钥QR码。 切记将您的密钥导出为PDF！',
      instantSubtitle: '添加快速密钥',
      recoveryDescription:
        '转到单独设备上的Web密钥生成器，然后使用此应用程序扫描公共密钥QR码。 切记将您的密钥导出为PDF！',
      recoverySubtitle: '添加取消密钥',
      scan: '扫描',
      webKeyGenerator: 'Web密钥生成器：',
    },
    scanQrWif: {
      bad_password: '密码错误',
      bad_wif: '错误WIF',
      cancel: '取消',
      decoding: '解码',
      go_back: '回去',
      imported_legacy: '已导入旧版',
      imported_segwit: '已导入SegWit',
      imported_watchonly: '已导入仅可视',
      imported_wif: '已导入WIF',
      input_password: '输入密码',
      password_explain: '这是BIP38加密的私钥',
      wallet_already_exists: '这样的钱包已经存在',
      with_address: '有地址',
    },
    wallet: {
      latest: '最新交易',
      none: '没有',
      pendingBalance: '冻结余额',
    },
    walletModal: {
      btcv: 'BTCV',
      wallets: '钱包',
    },
  },
  connectionIssue: {
    noInternetTitle: '没有网络连接',
    noInternetDescription: '确保WI-FI或移动数据已打开，然后重试。',
    offlineMessageTitle: '您离线了',
    offlineMessageDescription: '连接到互联网以恢复全部功能。',
    offlineMessageDescription2: '连接到互联网以继续使用这些功能。',
    noNetworkTitle: '没有网络',
    noNetworkDescription: '您的互联网可以使用，但是您没有连接到网络。 请稍等，然后重试。',
    electrumXNotConnected: 'Electrum客户端未连接',
    couldntConnectToServer: '无法连接到服务器。',
  },
};
