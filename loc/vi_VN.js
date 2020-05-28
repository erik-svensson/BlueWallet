module.exports = {
  _: {
    storage_is_encrypted: 'Ví lưu trữ của quý khách đã được mã hóa. Cần có mật khẩu để giải mã',
    enter_password: 'Nhập mật khẩu',
    bad_password: 'Mật khẩu kém, hãy thử lại',
    never: 'không bao giờ',
    continue: 'Tiếp tục',
    ok: 'OK',
    click: 'Nhấn',
    here: 'tại đây',
    save: 'Lưu',
    confirm: 'Xác nhận',
    copy: 'Sao chép ',
    copied: 'Đã sao chép!',
  },
  tabNavigator: {
    dashboard: 'Bảng điều khiển',
    settings: 'Cài đặt',
  },
  message: {
    somethingWentWrong: 'Đã xảy ra lỗi',
    somethingWentWrongWhileCreatingWallet:
      'Đã xảy ra lỗi khi chúng tôi tạo ví cho quý khách. Vui lòng quay lại Bảng điều khiển và thử lại.',
    success: 'Thành công',
    successfullWalletImport:
      'Ví của quý khách đã được nhập thành công. Bây giờ quý khách có thể quay lại Bảng điều khiển.',
    successfullWalletDelete:
      'Ví của quý khách đã được xóa thành công. Bây giờ quý khách có thể quay lại Bảng điều khiển.',
    returnToDashboard: 'Quay lại Bảng điều khiển',
    creatingWallet: 'Tạo ví của quý khách',
    creatingWalletDescription:
      'Vui lòng đợi trong khi chúng tôi tạo ví cho quý khách. Quá trình này có thể mất một thời gian.',
  },
  onboarding: {
    onboarding: 'Cài đặt ',
    pin: 'PIN',
    createPin: 'Tạo PIN',
    createNewPin: 'PIN mới',
    createPassword: 'Tạo mật khẩu cho giao dịch',
    createPinDescription:
      'Mã PIN của quý khách sẽ được sử dụng để đăng nhập vào ứng dụng. Quý khách có thể thay đổi nó trong phần Cài đặt.',
    confirmPin: 'Xác nhận PIN ',
    confirmNewPin: 'Xác nhận PIN mới ',
    confirmPassword: 'Xác nhận mật khẩu cho giao dịch',
    passwordDoesNotMatch: 'Mật khẩu không khớp. Xin vui lòng nhập mật khẩu có hiệu lực.',
    createPasswordDescription:
      'Mật khẩu cho giao dịch của quý khách sẽ được sử dụng để xác nhận tất cả các giao dịch. Quý khách không thể thay đổi nó. Mật khẩu giao dịch phải chứa ít nhất 8 ký tự chữ và số.',
    changePin: 'Thay đổi PIN',
    currentPin: 'PIN hiện tại',
    pinDoesNotMatch: 'PIN không khớp. Xin vui lòng nhập PIN có hiệu lực.',
    successDescription: 'Hooray! \nQuý khách đã tạo thành công PIN của mình.',
    successDescriptionChangedPin: 'Hooray!\nQuý khách đã thay đổi thành công PIN của mình.',
    successButton: 'Đi đến Bảng điều khiển ',
    successButtonChangedPin: 'Quay về Cài đặt',
  },
  unlock: {
    title: 'Mở khóa ',
    touchID: 'Chạm ID cho "Gold Wallet"',
    confirmButton: 'Xác nhận dấu vân tay để tiếp tục.',
    enter: 'Nhập PIN',
  },
  unlockTransaction: {
    headerText: 'Xác nhận giao dịch ',
    title: 'Xác nhận mật khẩu cho giao dịch',
    description: 'Xác nhận mật khẩu giao dịch để xử lý giao dịch. ',
  },
  wallets: {
    dashboard: {
      title: 'Ví',
      allWallets: 'Tất cả ví',
      noWallets: 'Không có ví',
      noWalletsDesc1: 'Không có ví nào.',
      noWalletsDesc2: ' thêm ví đầu tiên của quý khách.',
      send: 'Gửi coin',
      receive: 'Nhận coin',
      noTransactions: 'Không có giao dịch nào.',
    },
    walletModal: { btcv: 'BTCV', wallets: 'Ví' },
    importWallet: {
      title: 'Nhập ví của quý khách',
      header: 'Nhập ví',
      subtitle:
        'Viết ra đây những thông tin cần ghi nhớ, khóa riêng tư, WIF hoặc bất cứ thông tin gì quý khách có được. GoldWallet tìm mọi cách để đoán đúng định dạng và nhập ví của quý khách.',
      placeholder: 'Thông tin ghi nhớ, khóa riêng tư, WIF',
      import: 'Nhập',
      scanQrCode: 'hoặc quét mã QR',
      walletInUseValidationError: 'Ví đã được sử dụng. Vui lòng nhập ví hợp lệ.',
    },
    exportWallet: { title: 'Cụm từ ghi nhớ', header: 'Xuất ví' },
    exportWalletXpub: { header: 'Ví XPUB' },
    deleteWallet: {
      title: 'Xóa ví của quý khách',
      header: 'Xóa ví',
      description1: 'Quý khách có chắc chắn muốn xóa không',
      description2: '? Quý khách không thể hoàn tác hành động này.',
      no: 'Không',
      yes: 'Có',
    },
    wallet: { none: 'Không có', latest: 'Giao dịch mới nhất' },
    add: {
      title: 'Thêm ví mới',
      subtitle: 'Đặt tên cho ví của quý khách',
      description: 'Vui lòng nhập tên cho ví mới của quý khách.',
      inputLabel: 'Tên',
      addWalletButton: 'Thêm ví mới',
      importWalletButton: 'Nhập ví',
      advancedOptions: 'Tùy chọn nâng cao',
      multipleAddresses: 'Nhiều địa chỉ',
      singleAddress: 'Một địa chỉ',
      segwidAddress: 'Nó chứa một cây bao gồm các địa chỉ ví segwit, được tạo từ một hạt giống 24 từ duy nhất',
    },
    addSuccess: {
      title: 'Thêm ví mới',
      subtitle: 'Thành công',
      description:
        'Ví của quý khách đã được tạo. Vui lòng dành thời gian để viết cụm từ ghi nhớ này ra một tờ giấy. Đó là tờ sao lưu của quý khách. Quý khách có thể sử dụng nó để khôi phục ví trên các thiết bị khác.',
      okButton: 'OK, tôi đã viết nó ra!',
    },
    details: {
      latestTransaction: 'Giao dịch mới nhất',
      typeLabel: 'Loại',
      nameLabel: 'Tên',
      exportWallet: 'Xuất ví',
      showWalletXPUB: 'Hiển thị ví XPUB',
      deleteWallet: 'Xóa ví',
      nameEdit: 'Chỉnh sửa tên',
    },
    export: { title: 'xuất ví' },
    import: {
      title: 'nhập',
      explanation:
        'Viết ra đây thông tin ghi nhớ, khóa riêng tư, WIF hoặc bất cứ thông tin gì quý khách có được. GoldWallet tìm mọi cách để đoán đúng định dạng và nhập ví của quý khách.',
      imported: 'Đã nhập',
      error: 'Không nhập được. Vui lòng đảm bảo rằng dữ liệu được cung cấp là hợp lệ.',
      success: 'Thành công',
      do_import: 'Nhập',
      scan_qr: 'hoặc quét mã QR?',
    },
    scanQrWif: {
      go_back: 'Quay lại',
      cancel: 'Hủy',
      decoding: 'Giải mã',
      input_password: 'Nhập mật khẩu',
      password_explain: 'Đây là khóa mật được mã hóa BIP38',
      bad_password: 'Mật khẩu kém',
      wallet_already_exists: 'Ví này đã tồn tại',
      bad_wif: 'WIF kém',
      imported_wif: 'WIF đã nhập',
      with_address: 'có địa chỉ',
      imported_segwit: 'SegWit đã nhập',
      imported_legacy: 'Legacy đã nhập',
      imported_watchonly: 'Watch-only đã nhập',
    },
  },
  transactions: {
    list: { conf: 'Xác nhận' },
    details: {
      title: 'Giao dịch',
      detailTitle: 'Chi tiết giao dịch',
      transactionHex: 'Hex giao dịch',
      transactionHexDescription: 'Đây là mã hex giao dịch, đã ký và sẵn sàng để phát lên mạng',
      copyAndBoriadcast: 'Sao chép và phát sau',
      verify: 'Xác minh trên coinb.in',
      amount: 'Số tiền',
      fee: 'Phí',
      txSize: 'Kích thước TX',
      satoshiPerByte: 'Satoshi mỗi byte',
      from: 'Từ',
      to: 'Đến',
      bytes: 'byte',
      copy: 'Sao chép',
      noLabel: 'Không có nhãn',
      details: 'Chi tiết',
      transactionId: 'ID giao dịch',
      confirmations: 'xác nhận',
      transactionDetails: 'Chi tiết giao dịch',
      viewInBlockRxplorer: 'Xem trong block explorer (công cụ phân tích khối)',
      addNote: 'Thêm ghi chú',
      note: 'Ghi chú',
      inputs: 'Đầu vào',
      ouputs: 'Đầu ra',
      sendCoins: 'Gửi coin',
    },
  },
  send: {
    header: 'Gửi coin',
    success: {
      title: 'Thành công',
      description: 'Xin chúc mừng! Quý khách đã hoàn tất giao dịch thành công.',
      done: 'Xong',
      return: 'Quay lại Bảng điều khiển',
    },
    details: {
      title: 'tạo giao dịch',
      amount_field_is_not_valid: 'Số tiền không hợp lệ',
      fee_field_is_not_valid: 'Phí không hợp lệ',
      address_field_is_not_valid: 'Địa chỉ không hợp lệ',
      create_tx_error: 'Đã xảy ra lỗi khi tạo giao dịch. Vui lòng đảm bảo địa chỉ là hợp lệ.',
      address: 'địa chỉ',
      amount_placeholder: 'số tiền cần gửi (tính bằng BTCV)',
      fee_placeholder: 'cộng với phí giao dịch (tính bằng BTCV)',
      note_placeholder: 'ghi chú cho bản thân',
      cancel: 'Hủy',
      scan: 'Quét',
      send: 'Gửi',
      next: 'Tiếp theo',
      note: 'Lưu ý (tùy chọn)',
      to: 'đến',
      feeUnit: 'Sat/B',
      fee: 'Phí:',
      create: 'Tạo hóa đơn',
      remaining_balance: 'Số dư còn lại',
      total_exceeds_balance: 'Số tiền gửi vượt quá số dư khả dụng.',
    },
    confirm: { sendNow: 'Gửi ngay' },
    create: {
      amount: 'Số tiền',
      fee: 'Phí',
      setTransactionFee: 'Đặt phí giao dịch',
      headerText:
        'Khi đang có một lượng lớn giao dịch đang chờ xử lý trên mạng (>1500), việc đặt phí cao hơn sẽ giúp giao dịch của quý khách được xử lý nhanh hơn. Giá trị thông thường là 1-500 sat/b',
    },
  },
  receive: {
    header: 'Nhận coin',
    details: {
      amount: 'Số tiền',
      share: 'Chia sẻ',
      receiveWithAmount: 'Nhận với số tiền',
    },
  },
  settings: {
    language: 'Ngôn ngữ',
    general: 'Thông tin chung',
    security: 'Bảo mật',
    about: 'Khoảng',
    electrumServer: 'Máy chủ Electrum',
    advancedOptions: 'Tùy chọn nâng cao',
    changePin: 'Thay đổi mã PIN',
    fingerprintLogin: 'Đăng nhập bằng dấu vân tay',
    aboutUs: 'Giới thiệu',
    header: 'Cài đặt',
    notSupportedFingerPrint: 'Thiết bị của quý khách không hỗ trợ vân tay',
    TouchID: 'Cho phép nhận dạng vân tay',
    FaceID: 'Cho phép nhận dạng ID khuôn mặt',
    Biometrics: 'Cho phép sinh trắc học ',
  },
  aboutUs: {
    header: 'Giới thiệu',
    releaseNotes: 'Thông tin về phiên bản',
    runSelfTest: 'Chạy tự kiểm tra',
    buildWithAwesome: 'Xây dựng với:',
    rateGoldWallet: 'Đánh giá GoldWallet',
    goToOurGithub: 'Chuyển đến Github của chúng tôi',
    alwaysBackupYourKeys: 'Hãy luôn sao lưu mã khóa của quý khách',
    title: 'GoldWallet là ví Bitcoin Vault miễn phí và mã nguồn mở. MIT được cấp phép.',
  },
  electrumServer: {
    header: 'Máy chủ Electrum',
    title: 'Thay đổi máy chủ electrum',
    description:
      'Quý khách có thể thay đổi địa chỉ của máy chủ mà ứng dụng của quý khách kết nối. Địa chỉ mặc định được khuyên dùng.',
    save: 'Lưu',
    useDefault: 'Sử dụng mặc định',
    host: 'host',
    port: 'cổng',
    successfullSave:
      'Những thay đổi của quý khách đã được lưu thành công. Có thể cần khởi động lại để thay đổi có hiệu lực.',
    connectionError: 'Không thể kết nối với máy chủ Electrum được cung cấp',
  },
  advancedOptions: {
    title: 'Cấu hình tùy chọn nâng cao',
    description:
      'Bật tùy chọn nâng cao sẽ cho phép quý khách chọn từ các loại ví được liệt kê bên dưới: P2SH, HD P2SH, HD segwit.',
  },
  selectLanguage: {
    header: 'Ngôn ngữ',
    restartInfo: 'Khi chọn ngôn ngữ mới, có thể cần khởi động lại GoldWallet để thay đổi có hiệu lực',
    confirmation: 'Xác nhận',
    confirm: 'Xác nhận',
    alertDescription: 'Chọn ngôn ngữ và khởi động lại ứng dụng?',
    cancel: 'Hủy',
  },
  contactList: {
    cancel: 'Hủy',
    search: 'Tìm kiếm',
    bottomNavigationLabel: 'Sổ địa chỉ',
    screenTitle: 'Sổ địa chỉ',
    noContacts: 'Không có thông tin liên lạc',
    noContactsDesc1: 'Không có thông tin liên lạc nào. \nNhấp vào',
    noContactsDesc2: 'để thêm thông tin liên lạc đầu tiên của quý khách.',
    noResults: 'Không có kết quả cho',
  },
  contactCreate: {
    screenTitle: 'Thêm thông tin liên lạc mới',
    subtitle: 'Thông tin liên lạc mới',
    description: 'Vui lòng nhập tên và địa chỉ\ncho thông tin liên lạc mới của quý khách.',
    nameLabel: 'Tên',
    addressLabel: 'Địa chỉ',
    buttonLabel: 'Thêm thông tin liên lạc mới',
    successTitle: 'Thành công',
    successDescription: 'Xin chúc mừng! Quý khách đã thêm thông tin\nliên lạc thành công.',
    successButton: 'Quay lại Sổ địa chỉ',
  },
  contactDetails: {
    nameLabel: 'Tên',
    addressLabel: 'Địa chỉ',
    editName: 'Chỉnh sửa tên',
    editAddress: 'Sửa địa chỉ',
    sendCoinsButton: 'Gửi coin',
    showQRCodeButton: 'Hiển thị mã QR',
    deleteButton: 'Xóa thông tin liên lạc',
    share: 'Chia sẻ',
  },
  contactDelete: {
    title: 'Xóa thông tin liên lạc của quý khách',
    header: 'Xóa thông tin liên lạc',
    description1: 'Quý khách có chắc chắn muốn xóa không',
    description2: '?\nQuý khách không thể hoàn tác hành động này.',
    no: 'Không',
    yes: 'Có',
    success: 'Thành công',
    successDescription:
      'Thông tin liên lạc của quý khách đã được xóa thành công.\n' + 'Bây giờ quý khách có thể quay lại Sổ địa chỉ.',
    successButton: 'Quay lại Sổ địa chỉ',
  },
  scanQrCode: {
    permissionTitle: 'Quyền sử dụng máy ảnh',
    permissionMessage: 'Chúng tôi cần quý khách cho phép để sử dụng máy ảnh của quý khách',
    ok: 'Ok',
    cancel: 'Hủy',
  },
};
