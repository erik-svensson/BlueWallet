const vi = {
  _: {
    bad_password: 'Mật khẩu kém, hãy thử lại',
    click: 'Nhấn',
    confirm: 'Xác nhận',
    continue: 'Tiếp tục',
    copied: 'Đã sao chép!',
    copy: 'Sao chép',
    created: 'Đã tạo vào',
    delete: 'Xóa',
    enter_password: 'Nhập mật khẩu',
    here: 'tại đây',
    invalid: 'Không hợp lệ',
    languageCode: 'vi',
    never: 'không bao giờ',
    next: 'Tiếp theo',
    ok: 'OK',
    or: 'hoặc',
    satoshi: 'Satoshi',
    save: 'Lưu',
    storage_is_encrypted: 'Ví lưu trữ của quý khách đã được mã hóa. Cần có mật khẩu để giải mã',
    cancel: 'TRANSLATION NEEDED | ENG: Cancel',
    scan: 'TRANSLATION NEEDED | ENG: Scan',
  },
  aboutUs: {
    alwaysBackupYourKeys: 'Hãy luôn sao lưu mã khóa của quý khách',
    buildWithAwesome: 'Xây dựng với:',
    goToOurGithub: 'Chuyển đến Github của chúng tôi',
    header: 'Giới thiệu',
    rateGoldWallet: 'Đánh giá GoldWallet',
    releaseNotes: 'Thông tin về phiên bản',
    runSelfTest: 'Chạy tự kiểm tra',
    title: 'GoldWallet là ví Bitcoin Vault miễn phí và mã nguồn mở. MIT được cấp phép.',
  },
  advancedOptions: {
    description:
      'Bật tùy chọn nâng cao sẽ cho phép quý khách chọn từ các loại ví được liệt kê bên dưới: P2SH, HD P2SH, HD segwit.',
    title: 'Cấu hình tùy chọn nâng cao',
  },
  authenticators: {
    add: {
      description:
        'Mở ứng dụng Electrum Vault cho máy tính để bàn của bạn và tạo một ví mới. Làm theo các bước trên màn hình cho đến khi bạn thấy mã QR. Sử dụng ứng dụng này quét mã QR để tiếp tục.',
      subdescription: 'Bạn cũng có thể nhập trình xác thực của mình bằng cách chọn tùy chọn bên dưới.',
      subtitle: 'Ghép nối trình xác thực',
      successDescription:
        'Ghi lại cụm từ khóa hạt giống này ở một nơi an toàn. Đó là bản sao lưu của bạn trong trường hợp bạn cần khôi phục trình xác thực của mình. Hãy nhớ rằng cần có trình xác thực để xác nhận các giao dịch Nhanh và Hủy.',
      successTitle: 'Trình xác thực của bạn đã sẵn sàng!',
      title: 'Thêm trình xác thực mới',
    },
    delete: {
      subtitle: 'Xóa trình xác thực của bạn',
      success: 'Trình xác thực của bạn đã được xóa thành công. Bạn luôn có thể tạo một trình xác thực mới.',
      title: 'Xóa trình xác thực',
    },
    enterPIN: {
      description: 'Nhập mã PIN này vào ứng dụng Electrum Vault cho máy tính để bàn để kết thúc quá trình ghép nối.',
      subtitle: 'Nhập mã PIN',
    },
    export: {
      title: 'Xuất trình xác thực',
    },
    import: {
      desc1: 'Ghi lại cụm từ khóa hạt giống hoặc quét mã QR của trình xác thực bạn muốn nhập.',
      desc2: 'quét mã QR bằng cách nhấp vào “hoặc quét mã QR” bên dưới',
      subtitle: 'Nhập trình xác thực của bạn',
      success: 'Bạn đã nhập thành công trình xác thực của mình. Bây giờ nó đã sẵn sàng để sử dụng.',
      textAreaPlaceholder: 'Cụm từ khóa hạt giống',
      title: 'Nhập trình xác thực',
      inUseValidationError:
        'TRANSLATION NEEDED | ENG: Authenticator is already in use. Please enter a valid authenticator',
      scanNext: 'TRANSLATION NEEDED | ENG: Scan next',
      multipleQrCodesTitle: 'TRANSLATION NEEDED | ENG: Scan another QR code',
      multipleQrCodesDescription:
        'TRANSLATION NEEDED | ENG: Some transactions generate multiple QR codes. Make sure to scan all of them from the Electrum Vault application.',
      code: 'TRANSLATION NEEDED | ENG: Code: ',
    },
    list: {
      noAuthenticators: 'Chưa có Trình xác thực',
      noAuthenticatorsDesc1: 'Nhấn vào',
      noAuthenticatorsDesc2: 'để thêm trình xác thực đầu tiên của bạn.',
      scan: 'Quét',
      title: 'Trình xác thực Bitcoin Vault',
    },
    options: {
      delete: 'Xóa trình xác thực',
      export: 'Xuất trình xác thực',
      pair: 'Ghép nối trình xác thực',
      sectionTitle: 'Thông tin chung',
      title: 'Các tùy chọn trình xác thực',
    },
    pair: {
      descPin: 'Sử dụng mã PIN này để xác nhận ghép nối trình xác thực trên ứng dụng cho máy tính để bàn của bạn.',
      descPublicKey:
        'Bạn có thể sử dụng Khóa Công khai này để nhập trình xác thực của mình vào ứng dụng cho máy tính để bàn trong quá trình tạo ví với tùy chọn GoldWallet .',
      pin: 'Mã PIN',
      publicKey: 'Khóa Công khai',
      title: 'Ghép nối trình xác thực',
    },
    sign: {
      error: 'Không trình xác thực nào có thể ký giao dịch',
    },
    publicKey: {
      okButton: 'TRANSLATION NEEDED | ENG: OK, I understand',
      title: 'TRANSLATION NEEDED | ENG: Public Key',
      subtitle:
        'TRANSLATION NEEDED | ENG: You can use this Public Key to import your authenticator to the Electrum Vault desktop application during the creation of the 2FA wallet.',
    },
    errors: {
      noEmpty: 'TRANSLATION NEEDED | ENG: Field can not empty',
    },
  },
  betaVersion: {
    button: 'Tôi chấp nhận rủi ro',
    description:
      'Nó vẫn đang trong quá trình thử nghiệm cuối cùng trước khi phát hành chính thức. Ứng dụng dành cho thiết bị di động và tất cả nội dung được tìm thấy được cung cấp trên cơ sở "nguyên trạng" và "sẵn có". Người dùng tự chịu rủi ro khi sử dụng phần mềm.',
    title: 'Đây là phiên bản beta\ncủa GoldWallet',
  },
  contactCreate: {
    addressLabel: 'Địa chỉ',
    buttonLabel: 'Thêm thông tin liên lạc mới',
    description: 'Vui lòng nhập tên và địa chỉ\n cho thông tin liên lạc mới của quý khách.',
    nameLabel: 'Tên',
    screenTitle: 'Thêm thông tin liên lạc mới',
    subtitle: 'Thông tin liên lạc mới',
    successButton: 'Quay lại Sổ địa chỉ',
    successDescription: 'Xin chúc mừng! Quý khách đã thêm thông tin\n liên lạc thành công.',
    successTitle: 'Thành công',
    nameMissingAlphanumericCharacterError: 'TRANSLATION NEEDED | ENG: Name is missing alphanumeric character.',
    nameCannotContainSpecialCharactersError: 'TRANSLATION NEEDED | ENG: Name cannot contain special characters.',
  },
  contactDelete: {
    description1: 'Quý khách có chắc chắn muốn xóa không',
    description2: '?\n Quý khách không thể hoàn tác hành động này.',
    header: 'Xóa thông tin liên lạc',
    no: 'Không',
    success: 'Thành công',
    successButton: 'Quay lại Sổ địa chỉ',
    successDescription:
      'Thông tin liên lạc của quý khách đã được xóa thành công.\n Bây giờ quý khách có thể quay lại Sổ địa chỉ.',
    title: 'Xóa thông tin liên lạc của quý khách',
    yes: 'Có',
  },
  contactDetails: {
    addressLabel: 'Địa chỉ',
    deleteButton: 'Xóa thông tin liên lạc',
    editAddress: 'Sửa địa chỉ',
    editName: 'Chỉnh sửa tên',
    nameLabel: 'Tên',
    sendCoinsButton: 'Gửi coin',
    share: 'Chia sẻ',
    showQRCodeButton: 'Hiển thị mã QR',
  },
  contactList: {
    cancel: 'Hủy',
    noContacts: 'Không có thông tin liên lạc',
    noContactsDesc1: 'Không có thông tin liên lạc nào. \n Nhấp vào',
    noContactsDesc2: 'để thêm thông tin liên lạc đầu tiên của quý khách.',
    noResults: 'Không có kết quả cho',
    screenTitle: 'Sổ địa chỉ',
    search: 'Tìm kiếm',
  },
  electrumServer: {
    connectionError: 'Không thể kết nối với máy chủ Electrum được cung cấp',
    description:
      'Quý khách có thể thay đổi địa chỉ của máy chủ mà ứng dụng của quý khách kết nối. Địa chỉ mặc định được khuyên dùng.',
    header: 'Máy chủ Electrum',
    host: 'host',
    port: 'cổng',
    save: 'Lưu',
    successfullSave:
      'Những thay đổi của quý khách đã được lưu thành công. Có thể cần khởi động lại để thay đổi có hiệu lực.',
    title: 'Thay đổi máy chủ electrum',
    useDefault: 'Sử dụng mặc định',
  },
  filterTransactions: {
    clearFilters: 'xóa lọc',
    filter: 'lọc',
    from: 'từ',
    fromAmount: 'từ số tiền',
    fromDate: 'từ ngày',
    header: 'lọc giao dịch',
    receive: 'nhận',
    received: 'Đã nhận',
    send: 'gửi',
    sent: 'Gửi',
    status: {
      annulled: 'Đã bãi bỏ',
      canceled: 'Đã hủy',
      done: 'Xong',
      pending: 'đang chờ xử lý',
      unblocked: 'Đã mở khóa',
    },
    to: 'đến',
    toAmount: 'đến số tiền',
    toDate: 'đến ngày',
    transactionStatus: 'Trạng thái giao dịch',
    transactionType: 'Loại giao dịch',
  },
  message: {
    allDone: 'Tất cả đã hoàn thành!',
    cancelTxSuccess: 'Bạn đã hủy thành công giao dịch của mình.\n Tiền của bạn đang được chuyển đến.',
    creatingAuthenticator: 'Tạo trình xác thực của bạn',
    creatingAuthenticatorDescription:
      'Vui lòng đợi trong khi chúng tôi tạo trình xác thực của bạn.\n Quá trình này có thể mất một thời gian.',
    creatingWallet: 'Tạo ví của quý khách',
    creatingWalletDescription:
      'Vui lòng đợi trong khi chúng tôi tạo ví cho quý khách. Quá trình này có thể mất một thời gian.',
    generateAddressesError: 'Không thể tạo địa chỉ',
    hooray: 'Xin chúc mừng!',
    importingAuthenticator: 'Nhập trình xác thực của bạn',
    importingAuthenticatorDescription:
      'Vui lòng đợi trong khi chúng tôi nhập trình xác thực của bạn.\n Quá trình này có thể mất một thời gian.',
    noTransactions: 'Không tìm thấy giao dịch nào trên ví',
    noTransactionsDesc: 'Có thể bạn đang nhập một ví chưa từng được sử dụng',
    returnToAuthenticators: 'Quay lại Trình xác thực',
    returnToDashboard: 'Quay lại Bảng điều khiển',
    returnToWalletChoose: 'Quay lại lựa chọn loại ví',
    returnToWalletImport: 'Quay lại nhập ví',
    somethingWentWrong: 'Đã xảy ra lỗi',
    somethingWentWrongWhileCreatingWallet:
      'Đã xảy ra lỗi khi chúng tôi tạo ví cho quý khách. Vui lòng quay lại Bảng điều khiển và thử lại.',
    success: 'Thành công',
    successfullWalletDelete:
      'Ví của quý khách đã được xóa thành công. Bây giờ quý khách có thể quay lại Bảng điều khiển.',
    successfullWalletImport:
      'Ví của quý khách đã được nhập thành công. Bây giờ quý khách có thể quay lại Bảng điều khiển.',
    wrongMnemonic: 'Cụm từ ghi nhớ sai',
    wrongMnemonicDesc:
      'Cụm từ ghi nhớ của bạn không khớp với bất kỳ ví nào được hỗ trợ. Bạn đang nhập một cụm từ ghi nhớ không hợp lệ hoặc ví chưa từng được sử dụng',
  },
  onboarding: {
    changePin: 'Thay đổi PIN',
    confirmNewPin: 'Xác nhận PIN mới',
    confirmPassword: 'Xác nhận mật khẩu cho giao dịch',
    confirmPin: 'Xác nhận PIN',
    createNewPin: 'PIN mới',
    createPassword: 'Tạo mật khẩu cho giao dịch',
    createPasswordDescription:
      'Mật khẩu cho giao dịch của quý khách sẽ được sử dụng để xác nhận tất cả các giao dịch. Quý khách không thể thay đổi nó. Mật khẩu giao dịch phải chứa ít nhất 8 ký tự chữ và số.',
    createPin: 'Tạo PIN',
    createPinDescription:
      'Mã PIN của quý khách sẽ được sử dụng để đăng nhập vào ứng dụng. Quý khách có thể thay đổi nó trong phần Cài đặt.',
    currentPin: 'PIN hiện tại',
    failedTimes: 'Số lần thất bại',
    failedTimesErrorInfo: 'Sau ba lần thử không thành công, thao tác nhập sẽ bị chặn đối với',
    goBack: 'Quay lại',
    minutes: 'phút.',
    numberOfAttemptsExceeded: 'Số lần thử đã vượt quá giới hạn',
    onboarding: 'Cài đặt',
    passwordDoesNotMatch: 'Mật khẩu không khớp. Xin vui lòng nhập mật khẩu có hiệu lực.',
    pin: 'PIN',
    pinDoesNotMatch: 'PIN không khớp. Xin vui lòng nhập PIN có hiệu lực.',
    seconds: 'giây',
    successButton: 'Đi đến Bảng điều khiển',
    successButtonChangedPin: 'Quay về Cài đặt',
    successDescription: 'Hooray! \n Quý khách đã tạo thành công PIN của mình.',
    successDescriptionChangedPin: 'Hooray!\n Quý khách đã thay đổi thành công PIN của mình.',
    tryAgain: 'Hãy thử lại sau',
  },
  receive: {
    details: {
      amount: 'Số tiền',
      receiveWithAmount: 'Nhận với số tiền',
      share: 'Chia sẻ',
      shareWalletAddress: 'TRANSLATION NEEDED | ENG: Share wallet address',
      receiveWithAmountSubtitle:
        'TRANSLATION NEEDED | ENG: Enter the amount which you would like to receive. The QR code will update accordingly to include the amount.',
    },
    header: 'Nhận coin',
    label: 'TRANSLATION NEEDED | ENG: Wallet address',
  },
  scanQrCode: {
    cancel: 'Hủy',
    ok: 'Ok',
    permissionMessage: 'Chúng tôi cần quý khách cho phép để sử dụng máy ảnh của quý khách',
    permissionTitle: 'Quyền sử dụng máy ảnh',
  },
  security: {
    jailBrokenPhone:
      'Thiết bị của bạn có vẻ đã bị bẻ khóa. Điều này có thể dẫn đến các vấn đề bảo mật, sự cố hoặc các vấn đề khác. Chúng tôi khuyên bạn không nên sử dụng GoldWallet với thiết vị đã bị bẻ khóa.',
    noPinOrFingerprintSet:
      'Thiết bị của bạn dường như chưa được thiết lập mã pin hoặc vân tay. Chúng tôi không khuyến khích bạn sử dụng GoldWallet với thiết bị không được bảo mật.',
    rootedPhone:
      'Thiết bị của bạn có vẻ đã bị giành quyền truy nhập gốc. Điều này có thể dẫn đến các vấn đề bảo mật, sự cố hoặc các vấn đề khác. Chúng tôi khuyên bạn không nên sử dụng GoldWallet với thiết bị đã bị giành quyền truy nhập gốc.',
    title: 'Vấn đề bảo mật',
  },
  selectLanguage: {
    alertDescription: 'Chọn ngôn ngữ và khởi động lại ứng dụng?',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    confirmation: 'Xác nhận',
    header: 'Ngôn ngữ',
    restartInfo: 'Khi chọn ngôn ngữ mới, có thể cần khởi động lại GoldWallet để thay đổi có hiệu lực',
  },
  send: {
    confirm: {
      availableBalance: 'Số dư khả dụng sau khi giao dịch',
      cancelNow: 'Hủy ngay bây giờ',
      pendingBalance: 'Số dư đang chờ xử lý sau khi giao dịch',
      sendNow: 'Gửi ngay',
    },
    create: {
      amount: 'Số tiền',
      fee: 'Phí',
      headerText:
        'Khi đang có một lượng lớn giao dịch đang chờ xử lý trên mạng (>1500), việc đặt phí cao hơn sẽ giúp giao dịch của quý khách được xử lý nhanh hơn. Giá trị thông thường là 1-500 sat/b',
      setTransactionFee: 'Đặt phí giao dịch',
    },
    details: {
      address: 'địa chỉ',
      address_field_is_not_valid: 'Địa chỉ không hợp lệ',
      amount_field_is_not_valid: 'Số tiền không hợp lệ',
      amount_placeholder: 'số tiền cần gửi (tính bằng BTCV)',
      cancel: 'Hủy',
      create: 'Tạo hóa đơn',
      create_tx_error: 'Đã xảy ra lỗi khi tạo giao dịch. Vui lòng đảm bảo địa chỉ là hợp lệ.',
      fee: 'Phí:',
      fee_field_is_not_valid: 'Phí không hợp lệ',
      fee_placeholder: 'cộng với phí giao dịch (tính bằng BTCV)',
      feeUnit: 'Sat/B',
      next: 'Tiếp theo',
      note: 'Lưu ý (tùy chọn)',
      note_placeholder: 'ghi chú cho bản thân',
      remaining_balance: 'Số dư còn lại',
      scan: 'Quét',
      send: 'Gửi',
      title: 'tạo giao dịch',
      to: 'đến',
      total_exceeds_balance: 'Số tiền gửi vượt quá số dư khả dụng.',
    },
    error: {
      description: 'Trước khi tạo giao dịch, bạn phải thêm ví Bitcoin Vault.',
      title: 'Lỗi',
    },
    header: 'Gửi coin',
    recovery: {
      confirmFirstSeed: 'Xác nhận bằng Cụm từ khóa Hạt giống Hủy',
      confirmFirstSeedDesc:
        'Mở tài liệu PDF đầu tiên mà bạn đã tạo khi tạo ví của mình và ghi lại cụm từ khóa hạt giống Khóa Riêng tư theo đúng thứ tự.',
      confirmSecondSeed: 'Xác nhận bằng Cụm từ khóa Hạt giống Nhanh',
      confirmSecondSeedDesc:
        'Mở tài liệu PDF thứ hai mà bạn đã tạo khi tạo ví của mình và ghi lại cụm từ khóa hạt giống Khóa Riêng tư theo đúng thứ tự.',
      confirmSeed: 'Xác nhận bằng Cụm từ khóa Hạt giống Hủy',
      confirmSeedDesc:
        'Mở tài liệu PDF bạn đã tạo khi tạo ví của mình và ghi lại cụm từ khóa hạt giống Khóa Riêng tư theo đúng thứ tự.',
      recover: 'Hủy',
      useWalletAddress: 'Sử dụng địa chỉ của ví này',
    },
    success: {
      description: 'Xin chúc mừng! Quý khách đã hoàn tất giao dịch thành công.',
      done: 'Xong',
      return: 'Quay lại Bảng điều khiển',
      title: 'Thành công',
    },
    transaction: {
      alert: 'Tiêu chuẩn',
      alertDesc:
        'Giao dịch này cần 144 khối hoặc khoảng 24 giờ để được xác nhận. Bạn có thể hủy giao dịch trong khoảng thời gian này.',
      fastSuccess: 'Bạn đã thực hiện thành công giao dịch nhanh của mình.',
      instant: 'Nhanh',
      instantDesc: 'Giao dịch này sẽ được xác nhận ngay lập tức. Hãy sử dụng hết sức thận trọng.',
      lightningError:
        'Địa chỉ này có vẻ như là dành cho hóa đơn Lightning. Vui lòng chuyển đến ví Lightning của bạn để thực hiện thanh toán cho hóa đơn này.',
      scanInstantKeyDesc: 'Mở tài liệu PDF bạn đã tạo khi tạo ví và quét mã QR Khóa Riêng tư để gửi giao dịch.',
      scanInstantKeyTitle: 'Quét Khóa Nhanh',
      type: 'Loại giao dịch',
      watchOnlyError: 'Ví chỉ xem không thể gửi giao dịch',
    },
    warning: 'Cảnh báo:',
    warningGeneral:
      'Cảnh báo: Xin lưu ý rằng trong quá trình sử dụng tính năng Giao dịch an toàn, một phần số tiền còn lại trong ví của bạn có thể bị chặn. Đây là một quy trình bình thường được liên kết với UTXO và các thông số blockchain của ví Bitcoin Vault. Tiền của bạn sẽ được bỏ chặn sau khi giao dịch được xác minh (sau khoảng 24 giờ) hoặc bị hủy (trong vòng 24 giờ).',
  },
  settings: {
    about: 'Khoảng',
    aboutUs: 'Giới thiệu',
    advancedOptions: 'Tùy chọn nâng cao',
    Biometrics: 'Cho phép sinh trắc học',
    changePin: 'Thay đổi mã PIN',
    electrumServer: 'Máy chủ Electrum',
    FaceID: 'Cho phép nhận dạng ID khuôn mặt',
    fingerprintLogin: 'Đăng nhập bằng dấu vân tay',
    general: 'Thông tin chung',
    header: 'Cài đặt',
    language: 'Ngôn ngữ',
    notSupportedFingerPrint: 'Thiết bị của quý khách không hỗ trợ vân tay',
    security: 'Bảo mật',
    TouchID: 'Cho phép nhận dạng vân tay',
  },
  tabNavigator: {
    addressBook: 'Sổ địa chỉ',
    authenticators: 'Trình xác thực',
    dashboard: 'Bảng điều khiển',
    settings: 'Cài đặt',
    wallets: 'Ví',
  },
  timeCounter: {
    closeTheApp: 'Đóng ứng dụng',
    description:
      'Ứng dụng của bạn đã bị chặn do nhiều lần đăng nhập không thành công. Vui lòng đợi hết thời gian quy định và thử lại.',
    title: 'Ứng dụng bị chặn',
    tryAgain: 'Thử lại',
  },
  transactions: {
    details: {
      addNote: 'Thêm ghi chú',
      addToAddressBook: 'Thêm vào sổ Địa chỉ',
      amount: 'Số tiền',
      bytes: 'byte',
      confirmations: 'xác nhận',
      copy: 'Sao chép',
      copyAndBoriadcast: 'Sao chép và phát sau',
      details: 'Chi tiết',
      detailTitle: 'Chi tiết giao dịch',
      fee: 'Phí',
      from: 'Từ',
      inputs: 'Đầu vào',
      noLabel: 'Không có nhãn',
      note: 'Ghi chú',
      ouputs: 'Đầu ra',
      satoshiPerByte: 'Satoshi mỗi byte',
      sendCoins: 'Gửi coin',
      timePending: 'Thời gian chờ xử lý',
      title: 'Giao dịch',
      to: 'Đến',
      transactioFee: 'Phí giao dịch',
      transactionDetails: 'Chi tiết giao dịch',
      transactionHex: 'Hex giao dịch',
      transactionHexDescription: 'Đây là mã hex giao dịch, đã ký và sẵn sàng để phát lên mạng',
      transactionId: 'ID giao dịch',
      transactionType: 'Loại giao dịch',
      txSize: 'Kích thước TX',
      verify: 'Xác minh trên coinb.in',
      viewInBlockRxplorer: 'Xem trong block explorer (công cụ phân tích khối)',
      walletType: 'Loại ví',
      returnedFee: 'TRANSLATION NEEDED | ENG: Returned fee:',
      numberOfCancelTransactions: 'TRANSLATION NEEDED | ENG: Number of Cancel transactions',
      toExternalWallet: 'TRANSLATION NEEDED | ENG: To the external wallet',
      toInternalWallet: 'TRANSLATION NEEDED | ENG: To the internal wallet',
      totalReturnedFee: 'TRANSLATION NEEDED | ENG: Total returned fee:',
      unblocked: 'TRANSLATION NEEDED | ENG: Unblocked',
      blocked: 'TRANSLATION NEEDED | ENG: Blocked',
    },
    errors: {
      notEnoughBalance: 'Không đủ số dư. Vui lòng, thử gửi một số tiền nhỏ hơn.',
    },
    label: {
      annulled: 'đã bãi bỏ',
      canceled: 'Đã hủy',
      done: 'xong',
      pending: 'đang chờ xử lý',
      unblocked: 'bỏ chặn',
      canceledDone: 'TRANSLATION NEEDED | ENG: canceled - done',
    },
    list: {
      conf: 'Xác nhận',
    },
    transactionTypeLabel: {
      canceled: 'Đã hủy',
      fast: 'Nhanh',
      secure: 'Bảo mật',
      secureFast: 'Bảo mật nhanh chóng',
      standard: 'Tiêu chuẩn',
    },
  },
  unlock: {
    confirmButton: 'Xác nhận dấu vân tay để tiếp tục.',
    enter: 'Nhập PIN',
    title: 'Mở khóa',
    touchID: 'Chạm ID cho “Gold Wallet”',
  },
  unlockTransaction: {
    description: 'Xác nhận mật khẩu giao dịch để xử lý giao dịch.',
    headerText: 'Xác nhận giao dịch',
    title: 'Xác nhận mật khẩu cho giao dịch',
  },
  wallets: {
    add: {
      addWalletButton: 'Thêm ví mới',
      advancedOptions: 'Tùy chọn nâng cao',
      air: 'Thực hiện các giao dịch Tiêu chuẩn, giao dịch Hủy và giao dịch Nhanh.',
      ar: 'Thực hiện các giao dịch Tiêu chuẩn và Hủy.',
      description: 'Vui lòng nhập tên cho ví mới của quý khách.',
      failed: 'Không tạo được ví',
      importWalletButton: 'Nhập ví',
      inputLabel: 'Tên',
      legacy: 'Thực hiện các loại giao dịch mặc định.',
      legacyHDP2SH: 'Nó chứa một cây địa chỉ P2SH được tạo ra từ một từ khóa hạt giống gồm 12 từ riêng lẻ',
      legacyHDP2SHTitle: 'Legacy HD P2SH',
      LegacyHDSegWit: 'Nó chứa một cây địa chỉ segwit gốc, được tạo ra từ một từ khóa hạt giống gồm 12 từ riêng lẻ',
      legacyHDSegWitTitle: 'Legacy HD SegWit',
      LegacyP2SH: 'Nó chứa một địa chỉ P2SH duy nhất',
      legacyP2SHTitle: 'Legacy P2SH',
      legacyTitle: 'Legacy',
      multipleAddresses: 'Nhiều địa chỉ',
      publicKeyError: 'Khóa công khai được cung cấp không hợp lệ',
      segwidAddress: 'Nó chứa một cây bao gồm các địa chỉ ví segwit, được tạo từ một hạt giống 12 từ duy nhất',
      singleAddress: 'Một địa chỉ',
      subtitle: 'Đặt tên cho ví của quý khách',
      title: 'Thêm ví mới',
      walletType: 'Loại ví',
    },
    addSuccess: {
      description:
        'Ví của quý khách đã được tạo. Vui lòng dành thời gian để viết cụm từ ghi nhớ này ra một tờ giấy. Đó là tờ sao lưu của quý khách. Quý khách có thể sử dụng nó để khôi phục ví trên các thiết bị khác.',
      okButton: 'OK, tôi đã viết nó ra!',
      subtitle: 'Thành công',
      title: 'Thêm ví mới',
    },
    dashboard: {
      allWallets: 'Tất cả ví',
      availableBalance: 'Số dư khả dụng',
      noTransactions: 'Không có giao dịch nào.',
      noWallets: 'Không có ví',
      noWalletsDesc1: 'Không có ví nào.',
      noWalletsDesc2: 'thêm ví đầu tiên của quý khách.',
      receive: 'Nhận coin',
      recover: 'Hủy',
      send: 'Gửi coin',
      title: 'Ví',
      wallet: 'ví',
    },
    deleteWallet: {
      description1: 'Quý khách có chắc chắn muốn xóa không',
      description2: '? Quý khách không thể hoàn tác hành động này.',
      header: 'Xóa ví',
      no: 'Không',
      title: 'Xóa ví của quý khách',
      yes: 'Có',
    },
    details: {
      deleteWallet: 'Xóa ví',
      edit: 'Chỉnh sửa',
      exportWallet: 'Xuất ví',
      latestTransaction: 'Giao dịch mới nhất',
      nameEdit: 'Chỉnh sửa tên',
      nameLabel: 'Tên',
      showWalletXPUB: 'Hiển thị ví XPUB',
      typeLabel: 'Loại',
      details: 'TRANSLATION NEEDED | ENG: Details',
    },
    errors: {
      duplicatedPublicKey: 'Khóa công khai đã được thêm vào',
      invalidMnemonic: 'Cụm từ ghi nhớ không hợp lệ',
      invalidMnemonicWordsNumber: 'Đã cung cấp {receivedWordsNumber} từ được mong đợi {expectedWordsNumber}',
      invalidPrivateKey: 'Khóa riêng tư không hợp lệ',
      invalidPublicKey: 'Khóa công khai không hợp lệ',
      invalidQrCode: 'Mã QR không hợp lệ',
      invalidSign: 'Không thể ký giao dịch',
      noIndexForWord: 'Không tìm thấy chỉ mục cho từ: {word}',
    },
    export: {
      title: 'xuất ví',
    },
    exportWallet: {
      header: 'Xuất ví',
      title: 'Cụm từ ghi nhớ',
    },
    exportWalletXpub: {
      header: 'Ví XPUB',
    },
    import: {
      do_import: 'Nhập',
      error: 'Không nhập được. Vui lòng đảm bảo rằng dữ liệu được cung cấp là hợp lệ.',
      explanation:
        'Viết ra đây thông tin ghi nhớ, khóa riêng tư, WIF hoặc bất cứ thông tin gì quý khách có được. GoldWallet tìm mọi cách để đoán đúng định dạng và nhập ví của quý khách.',
      imported: 'Đã nhập',
      scan_qr: 'hoặc quét mã QR?',
      success: 'Thành công',
      title: 'nhập',
    },
    importWallet: {
      chooseTypeDescription: 'Chọn loại ví bạn muốn nhập.',
      header: 'Nhập ví',
      import: 'Nhập',
      importARDescription1: 'Nhập cụm từ khóa hạt giống',
      importARDescription2: 'quét mã QR của ví bạn muốn nhập',
      placeholder: 'Thông tin ghi nhớ, khóa riêng tư, WIF',
      scanCancelPubKey: 'Quét mã QR Khóa Hủy',
      scanFastPubKey: 'Quét mã QR Khóa Nhanh',
      scanPublicKeyDescription:
        'Mở tài liệu PDF đầu tiên bạn đã tạo khi tạo ví bạn muốn nhập và sử dụng ứng dụng này để quét mã QR Khóa Công khai.',
      scanQrCode: 'hoặc quét mã QR',
      scanWalletAddress: 'Quét địa chỉ ví',
      scanWalletAddressDescription: 'Quét mã QR Địa chỉ Công khai để bắt đầu tích hợp với GoldWallet.',
      subtitle:
        'Viết ra đây những thông tin cần ghi nhớ, khóa riêng tư, WIF hoặc bất cứ thông tin gì quý khách có được. GoldWallet tìm mọi cách để đoán đúng định dạng và nhập ví của quý khách.',
      title: 'Nhập ví của quý khách',
      unsupportedElectrumVaultMnemonic:
        'Từ khóa hạt giống này là từ Electrum Vault và hiện không được hỗ trợ. Sẽ được hỗ trợ trong thời gian sắp tới.',
      walletInUseValidationError: 'Ví đã được sử dụng. Vui lòng nhập ví hợp lệ.',
    },
    publicKey: {
      instantDescription:
        'Truy cập Trình tạo Khóa web trên một thiết bị riêng biệt và sử dụng ứng dụng này để quét mã QR Khóa Công khai. Hãy nhớ xuất các khóa của bạn dưới dạng PDF!',
      instantSubtitle: 'Thêm Khóa Nhanh',
      recoveryDescription:
        'Truy cập Trình tạo Khóa web trên một thiết bị riêng biệt và sử dụng ứng dụng này để quét mã QR Khóa Công khai. Hãy nhớ xuất các khóa của bạn dưới dạng PDF!',
      recoverySubtitle: 'Thêm Khóa Hủy',
      scan: 'Quét',
      webKeyGenerator: 'Trình tạo Khóa Web:',
    },
    scanQrWif: {
      bad_password: 'Mật khẩu kém',
      bad_wif: 'WIF kém',
      cancel: 'Hủy',
      decoding: 'Giải mã',
      go_back: 'Quay lại',
      imported_legacy: 'Legacy đã nhập',
      imported_segwit: 'SegWit đã nhập',
      imported_watchonly: 'Watch-only đã nhập',
      imported_wif: 'WIF đã nhập',
      input_password: 'Nhập mật khẩu',
      password_explain: 'Đây là khóa mật được mã hóa BIP38',
      wallet_already_exists: 'Ví này đã tồn tại',
      with_address: 'có địa chỉ',
    },
    wallet: {
      latest: 'Giao dịch mới nhất',
      none: 'Không có',
      pendingBalance: 'Số dư đang chờ xử lý',
    },
    walletModal: {
      btcv: 'BTCV',
      wallets: 'Ví',
    },
  },
};
