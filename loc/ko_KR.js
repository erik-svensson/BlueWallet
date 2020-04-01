module.exports = {
  _: {
    storage_is_encrypted:
      "고객님의 저장소가 암호화 되었습니다. 암호화 해제시 비밀번호 입력이 요구됩니다.",
    enter_password: "비밀번호를 입력해 주세요.",
    bad_password: "잘못된 비밀번호입니다. 다시 입력해 주세요.",
    never: "사용 불가한 상태입니다.",
    continue: "계속하기",
    ok: "확인"
  },
  wallets: {
    select_wallet: "지갑 선택",
    options: "옵션",
    createBitcoinWallet:
      "현재 비트코인 지갑을 보유하고 있지 않습니다. 라이트닝 지갑에 이체하기 위해선 비트코인 지갑의 생성 또는 들여오기가 필요합니다. 계속해서 진행하시겠습니까?",
    list: {
      app_name: "GoldWallet",
      title: "지갑",
      header:
        "지갑은 한 쌍의 암호키 (개인 키)와 코인 수령을 위해 공유될 수 있는 지갑 주소를 제공합니다. ",
      add: "지갑 추가",
      create_a_wallet: "지갑 생성",
      create_a_wallet1: "무료로 생성할 수 있습니다.",
      create_a_wallet2: "고객님께서 선호하는 만큼",
      latest_transaction: "최신 거래",
      empty_txs1: "거래가 이 곳에 나타날 것입니다. ",
      empty_txs2: "현재 아무 표시 없음",
      empty_txs1_lightning:
        "라이트닝 지갑은 일상적인 거래에 사용됩니다. 수수료가 비교적 저렴하며, 속도가 상당히 빠릅니다.",
      empty_txs2_lightning:
        '"자금 관리"를 눌러 사용하시고 고객님의 잔고를 충전하세요.',
      tap_here_to_buy: "비트코인 구매를 위해 이곳을 눌러주세요."
    },
    reorder: {
      title: "지갑 재정렬하기"
    },
    add: {
      title: "지갑 추가하기",
      description:
        "백업 종이 지갑 스캔 ( WIF - Wallet Import Format) 또는 새로운 지갑을 생성할 수 있습니다. Segwit 지갑은 기본값으로 지원됩니다.",
      scan: "스캔하기",
      create: "생성하기",
      label_new_segwit: "새로운 SegWit 생성하기",
      label_new_lightning: "새로운 라이트닝 생성하기",
      wallet_name: "명칭",
      wallet_type: "종류",
      or: "또는",
      import_wallet: "지갑 들여오기",
      imported: "들여오기 완료",
      coming_soon: "Coming Soon",
      lightning: "라이트닝",
      bitcoin: "Bitcoin Vault"
    },
    details: {
      title: "지갑",
      address: "주소",
      type: "종류",
      label: "라벨",
      destination: "수령인",
      description: "상세 내역",
      are_you_sure: "정말 삭제하시겠습니까?",
      yes_delete: "네, 삭제하겠습니다.",
      no_cancel: "아니오, 취소해 주세요.",
      delete: "삭제하기",
      save: "저장하기",
      delete_this_wallet: "지갑 삭제하기",
      export_backup: "내보내기/ 백업",
      buy_bitcoin: "비트코인 구매하기",
      show_xpub: "지갑 XPUB 표시하기"
    },
    export: {
      title: "지갑 내보내기"
    },
    xpub: {
      title: "지갑 XPUB",
      copiedToClipboard: "클립보드에 복사되었습니다."
    },
    import: {
      title: "들여오기",
      explanation:
        "연상 기호문, 개인 키, WIF 등의 모든 것을 이곳에 입력해 주세요. 블루웰럿이 최적의 포맷과 지갑 들여오기를 도와드립니다.",
      imported: "들여오기 완료",
      error: "들여오기 실패. 입력된 정보의 유효함을 확인해 주세요.",
      success: "완료",
      do_import: "들여오기",
      scan_qr: "QR 코드 스캔으로 대신하겠습니까?"
    },
    scanQrWif: {
      go_back: "뒤로 가기",
      cancel: "취소하기",
      decoding: "디코딩",
      input_password: "비밀번호 입력하기",
      password_explain: "개인 키를 암호화한 BIP38 입니다.",
      bad_password: "잘못된 비밀번호",
      wallet_already_exists: "해당 지갑이 이미 존재합니다.",
      bad_wif: "잘못된 WIF",
      imported_wif: "WIF 들여오기 완료",
      with_address: "주소와 함께",
      imported_segwit: "SegWit 들여오기 완료",
      imported_legacy: "레거시 들여오기 완료",
      imported_watchonly: "읽기 전용 들여오기 완료"
    }
  },
  transactions: {
    list: {
      tabBarLabel: "거래 목록",
      title: "거래 목록",
      description: "고객님 지갑의 입송금 거래 내역",
      conf: "conf"
    },
    details: {
      title: "거래",
      from: "로 부터",
      to: "에게",
      copy: "복사하기",
      transaction_details: "거래 세부 내역",
      show_in_block_explorer: "블록 탐색자에서 보기"
    }
  },
  send: {
    header: "전송하기;",
    success: {
      done: "완료"
    },
    details: {
      title: "거래 생성하기",
      amount_field_is_not_valid: "금액 입력란이 유효하지 않습니다.",
      fee_field_is_not_valid: "수수료 입력란이 유효하지 않습니다.",
      address_field_is_not_valid: "주소 입력란이 유효하지 않습니다.",
      create_tx_error:
        "거래 생성 오류가 발생했습니다. 유효한 주소를 입력해 주세요.",
      address: "주소",
      amount_placeholder: "송금 금액 (BTCV)",
      fee_placeholder: "추가 거래 수수료 (BTCV)",
      note_placeholder: "나의 메모",
      cancel: "취소하기",
      scan: "스캔하기",
      send: "전송하기",
      create: "인보이스 생성하기",
      remaining_balance: "보유 잔액",
      total_exceeds_balance: "송금 금액이 이용 가능한 잔액보다 큽니다."
    },
    confirm: {
      header: "승인하기",
      sendNow: "지금 전송하기"
    },
    create: {
      details: "상세 내역",
      title: "거래 생성하기",
      error: "거래 생성 에러 발생. 유효하지 않은 주소 또는 송금 금액?",
      go_back: "뒤로 가기",
      this_is_hex:
        "해당 거래는 서명되었으며, 네트워크로 송출될 hex 거래입니다.",
      to: "에게",
      amount: "금액",
      fee: "수수료",
      tx_size: "거래 사이즈",
      satoshi_per_byte: "바이트 당 사토시",
      memo: "메모",
      broadcast: "송출하기",
      not_enough_fee: "수수료가 충분하지 않습니다. 수수료를 늘려주세요."
    }
  },
  receive: {
    header: "수령하기",
    details: {
      title: "지급자와 해당 주소 공유하기",
      share: "공유하기",
      copiedToClipboard: "클립보드에 복사되었습니다.",
      label: "상세 내역",
      create: "생성하기",
      setAmount: "금액 수령하기"
    },
    scan_lnurl: "수령을 위해 스캔하기"
  },
  buyBitcoin: {
    header: "비트코인 구매하기",
    tap_your_address: "클립보드에 복사하기 위해 고객님의 주소를 눌러주세요.",
    copied: "클립보드에 복사되었습니다!"
  },
  settings: {
    header: "세팅",
    plausible_deniability: "입력 생략",
    storage_not_encrypted: "비암호화된 저장소",
    storage_encrypted: "암호화된 저장소",
    password: "비밀번호",
    password_explain: "저장소 암호화 해제에 사용될 비밀번호를 생성해 주세요.",
    retype_password: "비밀번호를 재 입력해 주세요.",
    passwords_do_not_match: "비밀번호가 일치하지 않습니다.",
    encrypt_storage: "저장소 암호화 하기",
    lightning_settings: "라이트닝 설정",
    electrum_settings: "Electrum 설정",
    electrum_settings_explain: "기본값 사용 설정",
    save: "저장하기",
    about: "설명",
    language: "언어",
    currency: "통화",
    advanced_options: "고급 옵션",
    enable_advanced_mode: "고급 모드 사용하기"
  },
  plausibledeniability: {
    title: "입력 생략",
    help:
      "특정한 상황에 고객님께서 비밀번호를 공개에 대한 요구를 받을 수도 있습니다. 고객님의 코인을 안전히 보관하기 위하여, 블루웰렛은 다른 비밀번호에 연동된 또 다른 암호화 저장소를 생성할 수 있습니다. 제 3자에 해당 비밀번호가 노출될 수 있으며, 블루웰렛에 비밀번호 입력시 새로운 모조 저장소가 잠금 해제됩니다. 이것이 제 3자에겐 고객님의 저장소에 접근한 것처럼 보입니다. 그러나 고객님의 코인이 보관된 메인 저장소는 비밀리에 안전하게 보존됩니다.",
    help2:
      "새로운 저장소가 정상적으로 작동될 것입니다. 최소한의 금액을 보관하여 더욱 믿을 수 있는 저장소임을 확인하세요. ",
    create_fake_storage: "암호화된 모조 저장소 생성하기",
    go_back: "뒤로 가기",
    create_password: "비밀번호 생성하기",
    create_password_explanation:
      "모조 저장소의 비밀번호가 고객님의 메인 저장소의 비밀번호와 일치하지 않습니다.",
    password_should_not_match:
      "모조 저장소의 비밀번호가 고객님의 메인 저장소의 비밀번호와 일치하지 않습니다.",
    retype_password: "비밀번호를 다시 입력해 주시기 바랍니다.",
    passwords_do_not_match:
      "비밀번호가 일치하지 않습니다. 다시 입력해 주시기 바랍니다.",
    success: "완료"
  },
  lnd: {
    title: "자금 관리하기",
    choose_source_wallet: "지갑 선택하기",
    refill_lnd_balance: "라이트닝 지갑 잔고 충전하기",
    refill: "충전하기",
    withdraw: "출금하기",
    placeholder: "송장",
    expired: "만료",
    sameWalletAsInvoiceError:
      "인보이스 생성에 사용된 지갑으로 해당 인보이스를 지불할 수 없습니다."
  },
  pleasebackup: {
    title: "고객님의 지갑이 생성되었습니다...",
    text:
      "연상 기호문을 받아 적어주시기 바랍니다. 해당 연상 기호문은 다른 장치에 지갑을 복구하는 백업으로 사용됩니다.",
    ok: "네, 기호문을 다른 곳에 옮겨 적었습니다."
  },
  lndViewInvoice: {
    wasnt_paid_and_expired: "해당 인보이스는 지불되지 않았으며 만료되었습니다.",
    has_been_paid: "에 대해 해당 인보이스는 이미 지급되었습니다. ",
    please_pay: "지불해 주시기 바랍니다.",
    sats: "사토시",
    for: "에 대한",
    additional_info: "추가 정보",
    open_direct_channel: "해당 노드로 다이렉트 채널 열기"
  }
};
