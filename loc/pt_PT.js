module.exports = {
  _: {
    languageCode: 'pt',
    storage_is_encrypted: 'O seu armazenamento está encriptado. A palavra-passe é necessária para desencriptá-lo',
    enter_password: 'Introduzir palavra-passe',
    bad_password: 'Palavra-passe incorrecta, tente novamente',
    never: 'nunca',
    continue: 'Continuar',
    ok: 'OK',
    click: 'Clique',
    here: 'Aqui',
    save: 'Guardar',
    confirm: 'Confirmar',
    copy: 'Copiar',
    copied: 'Copiado!',
    or: 'ou',
    delete: 'Apagar',
    created: 'Criado em',
    invalid: 'Inválido',
    satoshi: 'Satoshi ',
    next: 'Próximo',
  },
  tabNavigator: {
    dashboard: 'Menu Principal',
    settings: 'Definições',
    addressBook: 'Lista de endereços',
    wallets: 'Carteiras',
    authenticators: 'Autenticadores',
  },
  message: {
    somethingWentWrong: 'Alguma coisa correu mal',
    somethingWentWrongWhileCreatingWallet:
      'Alguma coisa correu mal enquanto criava a sua carteira. Volte ao Painel e tente novamente.',
    success: 'Sucesso',
    successfullWalletImport: 'A importação da sua carteira foi realizada com sucesso. Pode voltar ao Painel.',
    successfullWalletDelete: 'A sua carteira foi excluída com sucesso. Pode voltar ao Painel.',
    returnToDashboard: 'Voltar ao Painel',
    creatingWallet: 'Criação da sua carteira',
    creatingWalletDescription:
      'Estamos a criar a sua carteira. Este procedimento pode demorar um pouco. Agradecemos a sua compreensão.',
    allDone: 'Tudo feito!',
    hooray: 'Viva!',
    cancelTxSuccess: 'Cancelou a sua transação com sucesso.\n As suas moedas estão a caminho',
    wrongMnemonic: 'Mnemónica errada',
    wrongMnemonicDesc:
      'A sua mnemónica não corresponde a nenhuma carteira suportada. Está a tentar importar uma mnemónica inválida ou uma carteira que nunca foi utilizada',
    returnToWalletChoose: 'Voltar à seleção do tipo de carteira',
    returnToWalletImport: 'Voltar à importação da carteira',
    generateAddressesError: 'Não foi possível gerar endereços',
    noTransactions: 'Não foram encontradas transações na carteira',
    noTransactionsDesc: 'Provavelmente, está a tentar importar uma carteira que nunca foi utilizada',
    returnToAuthenticators: 'Voltar aos Autenticadores',
    creatingAuthenticator: 'A criar o seu autenticador',
    creatingAuthenticatorDescription:
      'Por favor, seja paciente enquanto criamos o seu autenticador.\n' + ' Pode demorar um pouco.',
    importingAuthenticator: 'A importar o seu autenticador',
    importingAuthenticatorDescription:
      'Por favor, seja paciente enquanto importamos o seu autenticador.\n' + ' Pode demorar um pouco.',
  },
  onboarding: {
    onboarding: 'Definir credenciais',
    pin: 'PIN',
    createPin: 'Definir PIN',
    createNewPin: 'Novo PIN',
    createPassword: 'Criar palavra-passe de transacção',
    createPinDescription:
      'O seu PIN será utilizado para iniciar sessão na aplicação. Poderá alterá-lo posteriormente no menu Definições.',
    confirmPin: 'Confirmar PIN',
    confirmNewPin: 'Confirmar novo PIN',
    confirmPassword: 'Confirmar palavra-passe de transacção',
    passwordDoesNotMatch: 'As palavras-passe não correspondem. Por favor, introduza uma palavra-passe válida.',
    createPasswordDescription:
      'A palavra-passe de transacção será utilizada para verificar todas as suas transacções. Informamos de que esta palavra-passe não pode ser alterada. A palavra-passe de transacção deve conter pelo menos 8 caracteres alfanuméricos.',
    changePin: 'Alterar PIN',
    currentPin: 'PIN actual',
    pinDoesNotMatch: 'O PIN introduzido não corresponde. Por favor, introduza um PIN válido',
    successDescription: 'Parabéns! \n Definiu com sucesso o seu código PIN.',
    successDescriptionChangedPin: 'Parabéns! \n Alterou com sucesso o seu código PIN.',
    successButton: 'Ir ao Menu Principal',
    successButtonChangedPin: 'Voltar ao menu Definições',
    failedTimes: 'Tempos falhados',
    failedTimesErrorInfo: 'Após três tentativas sem sucesso, a entrada será bloqueada por',
    goBack: 'Ir para trás',
    minutes: 'minutos.',
    numberOfAttemptsExceeded: 'O número de tentativas excedeu',
    seconds: 'segundos',
    tryAgain: 'Tente novamente mais tarde',
  },
  unlock: {
    title: 'Desbloquear',
    touchID: 'Touch ID para "Gold Wallet"',
    confirmButton: 'Introduza a sua impressão digital para continuar.',
    enter: 'Introduza o PIN',
  },
  unlockTransaction: {
    headerText: 'Confirmar transacção',
    title: 'Confirmar palavra-passe de transacção',
    description: 'Confirme a palavra-passe de transacção para proceder com a transacção',
  },
  wallets: {
    dashboard: {
      title: 'Carteiras',
      allWallets: 'Todas as Wallets',
      noWallets: 'Sem carteiras',
      noWalletsDesc1: 'Nenhuma carteira para apresentar.',
      noWalletsDesc2: 'adicionar a sua primeira carteira.',
      send: 'Enviar moedas',
      receive: 'Receber moedas',
      noTransactions: 'Nenhuma transacção para apresentar.',
      availableBalance: 'Balanço disponível',
      wallet: 'carteira',
      recover: 'Cancelar',
    },
    walletModal: { btcv: 'BTCV', wallets: 'Carteiras' },
    importWallet: {
      title: 'Importar a sua carteira',
      header: 'Importar carteira',
      subtitle:
        'Anote aqui a sua mnemónica, chave privada, WIF ou o que tiver. GoldWallet fará o melhor para descobrir o formato correto e importar a sua carteira',
      placeholder: 'Mnemónica, chave privada, WIF',
      import: 'Importar',
      scanQrCode: 'ou analisar o código de QR',
      walletInUseValidationError: 'Essa carteira já está a ser usada. Introduza uma carteira válida.',
      chooseTypeDescription: 'Escolha o tipo de carteira que quer importar.',
      importARDescription1: 'Introduza a frase semente',
      importARDescription2: 'leia o código QR do tipo de carteira que quer importar',
      scanWalletAddress: 'Leia o endereço da carteira',
      scanWalletAddressDescription: 'Leia o código QR do Endereço Público para iniciar a integração com a GoldWallet.',
      scanFastPubKey: 'Leia o código QR da Chave Rápida',
      scanCancelPubKey: 'Leia o código QR da Chave Cancelar',
      scanPublicKeyDescription:
        'Abra o primeiro documento PDF que gerou quando criou a carteira que pretende importar e utilize esta aplicação para ler o código QR da Chave Pública.',
      unsupportedElectrumVaultMnemonic:
        'Esta semente é da Electrum Vault e não é atualmente suportada. Será suportada num futuro próximo.',
      extendWithCustomWords: 'Estenda esta semente com palavras personalizadas',
      customWords: 'Palavras personalizadas',
    },
    exportWallet: { title: 'Frase da mnemónica', header: 'Exportar carteira' },
    exportWalletXpub: { header: 'Carteira XPUB' },
    deleteWallet: {
      title: 'Excluir a sua carteira',
      header: 'Excluir carteira',
      description1: 'Tem certeza de que deseja excluir',
      description2: '? Não pode anular esta acção.',
      no: 'Não',
      yes: 'Sim',
    },
    wallet: {
      none: 'Nenhum',
      latest: 'Transacção mais recente',
      pendingBalance: 'Saldo pendente',
    },
    add: {
      title: 'Adicionar nova carteira',
      subtitle: 'Nome da sua carteira',
      description: 'Introduza um nome para a sua nova carteira.',
      inputLabel: 'Nome',
      addWalletButton: 'Adicionar nova carteira',
      importWalletButton: 'Importar carteira',
      advancedOptions: 'Opções avançadas',
      multipleAddresses: 'Múltiplos endereços',
      singleAddress: 'Um endereço',
      segwidAddress:
        'Contém uma árvore de endereços de segmento nativos, gerados a partir de uma única semente de 24 palavras',
      failed: 'Falhou ao criar carteira',
      walletType: 'Tipo de carteira',
      ar: 'Faz transações Padrão e de Cancelamento.',
      air: 'Faz transações Padrão, de Cancelamento e Rápidas.',
      legacyTitle: 'Herança',
      legacyHDP2SHTitle: 'Herança HD P2SH',
      legacyP2SHTitle: 'Herança P2SH',
      legacyHDSegWitTitle: 'Herança HD SegWit',
      legacy: 'Faz tipos padrão de transações.',
      legacyHDP2SH: 'Contém uma árvore de endereços P2SH gerados a partir de uma única semente de 24 palavras',
      LegacyP2SH: 'Contém um único endereço P2SH',
      LegacyHDSegWit:
        'Contém uma árvore de endereços segwit nativos, gerados a partir de uma única semente de 24 palavras',
      publicKeyError: 'Chave pública apresentada é inválida',
    },
    addSuccess: {
      title: 'Adicionar nova carteira',
      subtitle: 'Sucesso',
      description:
        'A sua carteira foi criada. Tire um momento para anotar esta frase da mnemónica num papel. É a sua cópia de segurança. Pode usá-la para repor a carteira noutros dispositivos.',
      okButton: 'OK, anotei-a!',
    },
    details: {
      edit: 'Editar',
      latestTransaction: 'Transacção mais recente',
      typeLabel: 'Tipo',
      nameLabel: 'Nome',
      exportWallet: 'Exportar carteira',
      showWalletXPUB: 'Apresentar carteira XPUB',
      deleteWallet: 'Excluir carteira',
      nameEdit: 'Editar nome',
    },
    export: { title: 'exportar carteira' },
    import: {
      title: 'Importar',
      explanation:
        'Anote aqui a sua mnemónica, chave privada, WIF ou o que tiver. GoldWallet fará o melhor para descobrir o formato correto e importar a sua carteira',
      imported: 'Importada',
      error: 'Falha na importação. Garanta que os dados fornecidos são válidos.',
      success: 'Sucesso',
      do_import: 'Importar',
      scan_qr: 'ou analisar o código de QR?',
    },
    scanQrWif: {
      go_back: 'Voltar',
      cancel: 'Cancelar',
      decoding: 'Descodificação',
      input_password: 'Introduzir palavra-passe',
      password_explain: 'Esta é a chave privada encriptada BIP38',
      bad_password: 'Palavra-passe incorrecta',
      wallet_already_exists: 'Essa carteira já existe',
      bad_wif: 'WIF errada',
      imported_wif: 'WIF importada',
      with_address: 'com endereço',
      imported_segwit: 'SegWit importado',
      imported_legacy: 'Legacy importado',
      imported_watchonly: 'Ver apenas importado',
    },
    publicKey: {
      recoverySubtitle: 'Adicionar Chave de Cancelamento',
      webKeyGenerator: 'Gerador de Chaves da Web:',
      recoveryDescription:
        'Vá ao Gerador de Chaves da Web num dispositivo separado e utilize esta aplicação para ler o código QR da Chave Pública. Lembre-se de exportar as suas chaves como um PDF!',
      instantSubtitle: 'Adicionar Chave Rápida',
      instantDescription:
        'Vá ao Gerador de Chaves da Web num dispositivo separado e utilize esta aplicação para ler o código QR da Chave Pública. Lembre-se de exportar as suas chaves como um PDF!',
      scan: 'Ler',
    },
    errors: {
      invalidMnemonicWordsNumber: 'Palavras {NúmeroPalavrasrecebidas} apresentadas esperadas {NúmeroPalavrasesperadas}',
      noIndexForWord: 'Não foi possível encontrar índice da palavra: {palavra}',
      invalidPrivateKey: 'Chave privada inválida',
      invalidPublicKey: 'Chave pública inválida',
      invalidMnemonic: 'Mnemónica inválida',
      invalidQrCode: 'Código QR inválido',
      invalidSign: 'Não foi possível assinar transação',
      duplicatedPublicKey: 'A chave pública já foi acrescentada',
    },
  },
  transactions: {
    list: { conf: 'Confirmações' },
    details: {
      title: 'Transacção',
      detailTitle: 'Detalhes da transacção',
      transactionHex: 'Transacção hexagonal',
      transactionHexDescription: 'Esta é uma transacção hexagonal, assinada e preparada para transmitir à rede',
      copyAndBoriadcast: 'Copiar e transmitir mais tarde',
      verify: 'Verificar em coinb.in',
      amount: 'Montante',
      fee: 'Taxa',
      txSize: 'Tamanho de TX',
      satoshiPerByte: 'Satoshi por byte',
      from: 'De',
      to: 'Para',
      bytes: 'bytes',
      copy: 'Copiar',
      noLabel: 'Sem etiqueta',
      details: 'Detalhes',
      transactionId: 'ID da Transação',
      confirmations: 'confirmações',
      transactionDetails: 'Detalhes da transação',
      viewInBlockRxplorer: 'Ver no explorador de blocos',
      addNote: 'Adicionar nota',
      note: 'Nota',
      inputs: 'Entradas',
      ouputs: 'Saídas',
      sendCoins: 'Enviar moedas',
      transactionType: 'Tipo de transação',
      transactioFee: 'Taxa de transação',
      walletType: 'Tipo de carteira',
      addToAddressBook: 'Adicionar ao livro de Endereços',
      timePending: 'Tempo pendente',
    },
    label: {
      pending: 'pendente',
      annulled: 'anulado',
      done: 'feito',
      canceled: 'cancelado',
    },
    transactionTypeLabel: { standard: 'Padrão', canceled: 'Cancelado', fast: 'Rápido' },
  },
  send: {
    header: 'Enviar moedas',
    success: {
      title: 'Sucesso',
      description: 'Parabéns! Terminou a transacção com sucesso.',
      done: 'Pronto',
      return: 'Voltar ao Painel',
    },
    details: {
      title: 'criar transacção',
      amount_field_is_not_valid: 'O campo do montante não é válido',
      fee_field_is_not_valid: 'O campo da taxa não é válido',
      address_field_is_not_valid: 'O campo do endereço não é válido',
      create_tx_error: 'Houve um erro na criação da transacção. Garanta que o endereço é válido.',
      address: 'endereço',
      amount_placeholder: 'montante a enviar (em BTCV)',
      fee_placeholder: 'mais taxa da transacção (em BTCV)',
      note_placeholder: 'nota para si mesmo',
      cancel: 'Cancelar',
      scan: 'Analisar',
      send: 'Enviar',
      next: 'Seguinte',
      note: 'Nota (opcional)',
      to: 'para',
      feeUnit: 'Sat/B',
      fee: 'Taxa:',
      create: 'Criar fatura',
      remaining_balance: 'Saldo remanescente',
      total_exceeds_balance: 'O montante a enviar excede o saldo disponível.',
    },
    confirm: {
      sendNow: 'Enviar agora',
      cancelNow: 'Cancelar agora',
      availableBalance: 'Saldo disponível após transação',
      pendingBalance: 'Saldo pendente após transação',
    },
    create: {
      amount: 'Montante',
      fee: 'Taxa',
      setTransactionFee: 'Configurar uma taxa de transacção',
      headerText:
        'Quando existe um grande número de transacções pendentes na rede (>1500), a taxa mais alta irá resultar no processamento mais rápido da sua transacção. Os valores normais são 1-500 sat/b',
    },
    recovery: {
      recover: 'Cancelar',
      useWalletAddress: 'Usar endereço desta carteira',
      confirmSeed: 'Confirmar com Frase de Semente de Cancelamento',
      confirmSeedDesc:
        'Abra o documento PDF que gerou quando criou a sua carteira e escreva a frase de Chave Privada na mesma ordem.',
      confirmFirstSeed: 'Confirmar com Frase de Semente de Cancelamento',
      confirmFirstSeedDesc:
        'Abra o primeiro documento PDF que gerou quando criou a sua carteira e escreva a frase de Chave Privada na mesma ordem.',
      confirmSecondSeed: 'Confirmar com Frase de Semente Rápida',
      confirmSecondSeedDesc:
        'Abra o segundo documento PDF que gerou quando criou a sua carteira e escreva a frase de Chave Privada na mesma ordem.',
    },
    transaction: {
      instant: 'Rápido',
      instantDesc: 'Esta transação será confirmada imediatamente. Usar com extremo cuidado.',
      fastSuccess: 'Fez a sua transação rápida com sucesso.',
      alert: 'Padrão',
      alertDesc:
        'Esta transação precisa de 144 blocos ou cerca de 24 horas para ser confirmada. Pode cancelar dentro deste tempo.',
      type: 'Tipo de transação',
      scanInstantKeyTitle: 'Ler a Chave Rápida',
      scanInstantKeyDesc:
        'Abra o documento PDF que gerou quando criou a sua carteira e leia o código QR para enviar transação.',
      lightningError:
        'Este endereço parece ser para uma fatura Relâmpago. Por favor, vá à sua carteira Relâmpago de forma a fazer o pagamento desta fatura.',
      watchOnlyError: 'Carteiras apenas de observação não podem enviar transações',
    },
    error: {
      title: 'Erro',
      description: 'Antes de efetuar uma transação, deve primeiro inserir uma carteira Bitcoin Vault.',
    },
  },
  receive: {
    header: 'Receber moedas',
    details: {
      amount: 'Montante',
      share: 'Partilhar',
      receiveWithAmount: 'Receber com o montante',
    },
  },
  settings: {
    language: 'Idioma',
    general: 'Geral',
    security: 'Segurança',
    about: 'Sobre',
    electrumServer: 'Servidor Electrum',
    advancedOptions: 'Opções avançadas',
    changePin: 'Alterar PIN',
    fingerprintLogin: 'Iniciar sessão com impressão digital',
    aboutUs: 'Sobre nós',
    header: 'Definições',
    notSupportedFingerPrint: 'O seu dispositivo não suporta impressão digital',
    TouchID: 'Permitir impressão digital',
    FaceID: 'Permitir FaceID',
    Biometrics: 'Permitir dados biométricos',
  },
  aboutUs: {
    header: 'Sobre nós',
    releaseNotes: 'Notas de lançamento',
    runSelfTest: 'Executar teste próprio',
    buildWithAwesome: 'Construir com Awesome:',
    rateGoldWallet: 'Classificar GoldWallet',
    goToOurGithub: 'Ir para Github',
    alwaysBackupYourKeys: 'Realizar sempre uma cópia de segurança nas suas chaves',
    title: 'A Gold Wallet é grátis, tratando-se de uma carteira gratuita do Bitcoin Vault. Licenciada pelo MIT.',
  },
  electrumServer: {
    header: 'Servidor Electrum',
    title: 'Alterar o Servidor Electrum',
    description:
      'Poderá alterar o endereço do servidor ao qual é efectuada a ligação. O endereço padrão é recomendado.',
    save: 'Guardar',
    useDefault: 'Usar predefinição',
    host: 'anfitrião',
    port: 'porta',
    successfullSave:
      'As suas alterações foram guardadas com sucesso. A reinicialização pode ser exigida para que as alterações tenham efeito.',
    connectionError: 'Não está a ser possível efectuar a ligação ao servidor Electrum fornecido',
  },
  advancedOptions: {
    title: 'Configurar opções avançadas',
    description:
      'A activação das Opções Avançadas permitirá escolher entre os tipos de carteira listados abaixo: \n' +
      ' P2SH, HD P2SH, HD segwit.',
  },
  selectLanguage: {
    header: 'Idioma',
    restartInfo:
      'Quando um novo idioma é seleccionado, o reinício da aplicação GoldWallet pode ser exigido para esta alteração ter efeito',
    confirmation: 'Confirmação',
    confirm: 'Confirmar',
    alertDescription: 'Seleccionar o idioma e reiniciar a aplicação?',
    cancel: 'Cancelar',
  },
  contactList: {
    cancel: 'Cancelar',
    search: 'Pesquisar',
    screenTitle: 'Lista de endereços',
    noContacts: 'Sem contactos',
    noContactsDesc1: 'Sem contactos para apresentar. \n Clicar',
    noContactsDesc2: 'para adicionar o seu primeiro contacto.',
    noResults: 'Sem resultados para',
  },
  contactCreate: {
    screenTitle: 'Adicionar novo contacto',
    subtitle: 'Novo contacto',
    description: 'Introduza um nome e um endereço\n para o seu novo contacto.',
    nameLabel: 'Nome',
    addressLabel: 'Endereço',
    buttonLabel: 'Adicionar novo contacto',
    successTitle: 'Sucesso',
    successDescription: 'Parabéns! Adicionou o seu contacto\n com sucesso.',
    successButton: 'Voltar à Lista de endereços',
  },
  contactDetails: {
    nameLabel: 'Nome',
    addressLabel: 'Endereço',
    editName: 'Editar nome',
    editAddress: 'Editar endereço',
    sendCoinsButton: 'Enviar moedas',
    showQRCodeButton: 'Apresentar Código QR',
    deleteButton: 'Eliminar contacto',
    share: 'Partilhar',
  },
  contactDelete: {
    title: 'Eliminar o seu contacto',
    header: 'Eliminar contacto',
    description1: 'Tem certeza de que deseja excluir',
    description2: '?\n Não pode anular esta ação.',
    no: 'Não',
    yes: 'Sim',
    success: 'Sucesso',
    successDescription: 'O seu contacto foi excluído com sucesso.\n' + ' Pode voltar à Lista de endereços.',
    successButton: 'Voltar à Lista de endereços',
  },
  scanQrCode: {
    permissionTitle: 'Permissão para usar a câmara',
    permissionMessage: 'Precisamos da sua permissão para usar a sua câmara',
    ok: 'OK',
    cancel: 'Cancelar',
  },
  filterTransactions: {
    header: 'Filtrar transacções',
    receive: 'receber',
    send: 'enviar',
    filter: 'filtrar',
    to: 'para',
    toAmount: 'Montante máximo',
    toDate: 'Data de Fim',
    from: 'de',
    fromAmount: 'Montante mínimo',
    fromDate: 'Data de Início',
    clearFilters: 'apagar filtros',
    received: 'Recebido',
    sent: 'Enviado',
    transactionType: 'Tipo de transação',
    transactionStatus: 'Estado da transação',
    status: {
      pending: 'Pendente',
      annulled: 'Anulado',
      done: 'Feito',
      canceled: 'Cancelado',
    },
  },
  authenticators: {
    sign: { error: 'Nenhum dos autenticadores pôde assinafr a transação' },
    options: {
      title: 'Opções do autenticador',
      export: 'Exportar autenticador',
      pair: 'Emparelhar autenticador',
      sectionTitle: 'Geral',
      delete: 'Apagar autenticador',
    },
    pair: {
      title: 'Emparelhar autenticador',
      pin: 'PIN',
      publicKey: 'Chave Pública',
      descPin:
        'Utilize este PIN para confirmar o emparelhamento do autenticador na sua aplicação de ambiente de trabalho.',
      descPublicKey:
        'Pode utilizar esta Chave Pública para importar o seu autenticador na aplicação de ambiente de trabalho durante o processo de criação da carteira com a opção GoldWallet.',
    },
    import: {
      title: 'Importar autenticador',
      success: 'Importou o seu autenticador com sucesso Está agora pronto a ser utilizado.',
      subtitle: 'Importar o seu autenticador',
      desc1: 'Escreva a frase semente ou leia o código QR do autenticador que pretende importar.',
      desc2: 'leia o código QR ao clicar em "ou ler código QR" abaixo da',
      textAreaPlaceholder: 'Frase semente',
    },
    export: { title: 'Exportar autenticador' },
    delete: {
      title: 'Apagar autenticador',
      subtitle: 'Apagar o seu autenticador',
      success: 'O seu autenticador foi apagado com sucesso. Pode sempre criar um novo.',
    },
    list: {
      noAuthenticatorsDesc1: 'Toque',
      noAuthenticatorsDesc2: 'para adicionar o seu primeiro autenticador.',
      noAuthenticators: 'Ainda sem Autenticadores',
      scan: 'Ler',
      title: 'Autenticadores da Bitcoin Vault',
    },
    add: {
      successTitle: 'O seu autenticador está pronto!',
      title: 'Adicionar novo autenticador',
      subtitle: 'Emparelhar autenticador',
      successDescription:
        'Escreva esta frase semente num lugar seguro. É a sua segurança no caso de precisar de restaurar o seu autenticador. Lembre-se de que o autenticador é necessário para confirmar transações Rápidas e de Cancelamento.',
      description:
        'Abra a sua aplicação de ambiente de trabalho Electrum Vault e crie uma nova carteira. Siga os passos no ecrã até ver um código QR. Utilize esta aplicação para a ler e prosseguir.',
      subdescription: 'Também pode importar o seu autenticador ao escolher a opção abaixo.',
    },
    enterPIN: {
      subtitle: 'Introduzir PIN',
      description:
        'Introduzir este PIN na aplicação de ambiente de trabalho Electrum Vault para terminar o processo de emparelhamento.',
    },
  },
  timeCounter: {
    title: 'Aplicação bloqueada',
    description:
      'A sua candidatura foi bloqueada devido às tentativas de login sem sucesso. Por favor, aguarde o tempo necessário para tentar novamente.',
    tryAgain: 'Tentar novamente',
    closeTheApp: 'Fechar a aplicação',
  },
  security: {
    jailBrokenPhone:
      'O seu dispositivo parece estar desbloqueado. Isso pode causar problemas de segurança,rompimentos ou outros problemas. Não recomendamos o uso do GoldWallet com dispositivo desbloqueado. Feche o aplicativo.',
    rootedPhone:
      'O seu dispositivo parece estar com acesso ao root. Isso pode causar problemas de segurança, rompimentos ou outros problemas. Não recomendamos o uso do GoldWallet com dispositivo com acesso root. Feche o aplicativo.',
    noPinOrFingerprintSet: 'Não recomendamos o uso da Gold Wallet até que o dispositivo seja protegido.',
    title: 'Problema de segurança',
  },
};
