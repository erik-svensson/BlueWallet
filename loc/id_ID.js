module.exports = {
  _: {
    storage_is_encrypted:
      "Penyimpanan dienkripsi. Masukkan kata sandi untuk dekripsi:",
    enter_password: "Masukkan kata sandi",
    bad_password: "kata sandi salah, coba lagi",
    never: "tidak pernah",
    continue: "Lanjutkan",
    ok: "OK"
  },
  wallets: {
    select_wallet: "Pilih dompet",
    options: "Opsi",
    createBitcoinWallet:
      "Belum ada dompet bitcoin. Untuk mendanai dompet Lightning, dompet Bitcoin harus dibuat atau diimpor. Yakin ingin melanjutkan?",
    list: {
      app_name: "BlueWallet",
      title: "Dompet",
      header:
        "Sebuah dompet mewakili sepasang kunci rahasia dan sebuah alamat" +
        "yang bisa dipilih untuk menerima koin.",
      add: "Tambah dompet",
      create_a_wallet: "Buat dompet",
      create_a_wallet1: "Gratis dan bisa buat",
      create_a_wallet2: "sebanyak yang kamu mau",
      latest_transaction: "transaksi terbaru",
      empty_txs1: "Transaksimu akan muncul di sini,",
      empty_txs2: "saat ini tidak ada transaksi",
      empty_txs1_lightning:
        "Lightning wallet should be used for your daily transactions. Fees are unfairly cheap and speed is blazing fast.",
      empty_txs2_lightning:
        '\nTo start using it tap on "manage funds" and topup your balance.',
      tap_here_to_buy: "Tap di sini untuk membeli bitcoin"
    },
    reorder: {
      title: "Susun Dompet"
    },
    add: {
      title: "tambah dompet",
      description:
        "Kamu bisa membuat dompet atau memindai paper wallet dalam WIF (Wallet Import Format). Bluewallet mendukung dompet Segwit.",
      scan: "Pindai",
      create: "Buat",
      label_new_segwit: "Dompet SegWit baru",
      label_new_lightning: "Dompet Lightning baru",
      wallet_name: "nama dompet",
      wallet_type: "tipe",
      or: "atau",
      import_wallet: "Impor dompet",
      imported: "Diimpor",
      coming_soon: "Akan datang",
      lightning: "Lightning",
      bitcoin: "Bitcoin"
    },
    details: {
      title: "Dompet",
      address: "Alamat",
      type: "Tipe",
      label: "Label",
      destination: "tujuan",
      description: "deskripsi",
      are_you_sure: "Yakin?",
      yes_delete: "Ya, hapus",
      no_cancel: "Tidak, batalkan",
      delete: "Hapus",
      save: "Simpan",
      delete_this_wallet: "Hapus dompet ini",
      export_backup: "Ekspor / backup",
      buy_bitcoin: "Beli Bitcoin",
      show_xpub: "Tampilkan XPUB dompet"
    },
    export: {
      title: "ekspor dompet"
    },
    xpub: {
      title: "XPUB dompet",
      copiedToClipboard: "Disalin ke clipboard."
    },
    import: {
      title: "impor",
      explanation:
        "Ketik kata mnemonic, private key, WIF, atau apapun yang kamu punya. BlueWallet akan mencoba mengimpor dompet kamu.",
      imported: "Diimpor",
      error: "Gagal mengimpor. Pastikan data yang diketik benar.",
      success: "Berhasil",
      do_import: "Impor",
      scan_qr: "atau mau pindai QR code?"
    },
    scanQrWif: {
      go_back: "Kembali",
      cancel: "Batal",
      decoding: "Membaca...",
      input_password: "Masukkan kata sandi",
      password_explain: "Ini adalah private key terenkripsi BIP38",
      bad_password: "kata sandi salah",
      wallet_already_exists: "Dompet sudah ada",
      bad_wif: "WIF salah",
      imported_wif: "WIF diimpor ",
      with_address: " dengan alamat ",
      imported_segwit: "Dompet SegWit diimpor",
      imported_legacy: "Dompet lawas diimpor",
      imported_watchonly: "Alamat tinjauan diimpor"
    }
  },
  transactions: {
    list: {
      tabBarLabel: "Transaksi",
      title: "transaksi",
      description: "Daftar transaksi keluar dan masuk dompet",
      conf: "konfirmasi"
    },
    details: {
      title: "Transaksi",
      from: "Input",
      to: "Output",
      copy: "Salin",
      transaction_details: "Detail transaksi",
      show_in_block_explorer: "Tampilkan di block explorer"
    }
  },
  send: {
    header: "Kirim",
    details: {
      title: "buat transaksi",
      amount_field_is_not_valid: "Jumlah tidak valid",
      fee_field_is_not_valid: "Tarif tidak valid",
      address_field_is_not_valid: "Alamat tidak valid",
      total_exceeds_balance: "Jumlah yang dikirim melebihi saldo.",
      create_tx_error:
        "Kesalahan dalam membuat transaksi. Cek kembali alamat tujuan.",
      address: "alamat",
      amount_placeholder: "jumlah (dalam BTCV)",
      fee_placeholder: "Tambahan biaya transaksi (dalam BTCV)",
      note_placeholder: "catatan pribadi",
      cancel: "Batalkan",
      scan: "Pindai",
      send: "Kirim",
      create: "Buat",
      remaining_balance: "Sisa saldo"
    },
    confirm: {
      header: "Konfirmasi",
      sendNow: "Kirim sekarang"
    },
    success: {
      done: "Selesai"
    },
    create: {
      details: "Detail",
      title: "buat transaksi",
      error: "Tidak bisa membuat transaksi. Cek alamat atau jumlah transfer.",
      go_back: "Kembali",
      this_is_hex:
        "Ini adalah hex transaksi, siap untuk disiarkan ke jaringan.",
      to: "Ke",
      amount: "Jumlah",
      fee: "Tarif",
      tx_size: "Ukuran TX",
      satoshi_per_byte: "Satoshi per byte",
      memo: "Memo",
      broadcast: "Siarkan",
      not_enough_fee: "Tarif tidak cukup. Naikkan tarif"
    }
  },
  receive: {
    header: "Terima",
    details: {
      title: "Bagikan alamat ini ke pengirim",
      share: "bagikan",
      copiedToClipboard: "Disalin ke clipboard.",
      label: "Deskripsi",
      create: "Buat",
      setAmount: "Terima sejumlah"
    },
    scan_lnurl: "Scan to receive"
  },
  buyBitcoin: {
    header: "Beli bitcoin",
    tap_your_address: "Untuk menyalin, tap alamat:",
    copied: "Disalin ke Clipboard!"
  },
  settings: {
    header: "setting",
    plausible_deniability: "Plausible deniability...",
    storage_not_encrypted: "Penyimpanan: tidak terenkripsi",
    storage_encrypted: "Penyimpanan: terenkripsi",
    password: "kata sandi",
    password_explain: "Buat kata sandi untuk dekripsi penyimpanan",
    retype_password: "Ulangi kata sandi",
    passwords_do_not_match: "Kata sandi tidak cocok",
    encrypt_storage: "Enkripsi penyimpanan",
    lightning_settings: "Pengaturan Lightning",
    lightning_settings_explain:
      "Pasang LndHub untuk menghubungkan ke node LND kamu" +
      " dan masukkan URL di sini. Biarkan kosong untuk menghubungkan ke LndHub standar (lndhub.io)",
    electrum_settings: "Electrum Settings",
    electrum_settings_explain: "Set to blank to use default",
    save: "simpan",
    about: "Tentang",
    language: "Bahasa",
    currency: "Mata Uang",
    advanced_options: "Advanced Options",
    enable_advanced_mode: "Enable advanced mode"
  },
  plausibledeniability: {
    title: "Plausible Deniability",
    help:
      "Under certain circumstances, you might be forced to disclose a " +
      "password. To keep your coins safe, BlueWallet can create another " +
      "encrypted storage, with a different password. Under pressure, " +
      "you can disclose this password to a 3rd party. If entered in " +
      "BlueWallet, it will unlock new 'fake' storage. This will seem " +
      "legit to a 3rd party, but will secretly keep your main storage " +
      "with coins safe.",
    help2:
      "New storage will be fully functional, and you can store some " +
      "minimum amounts there so it looks more believable.",
    create_fake_storage: "Create fake encrypted storage",
    go_back: "Go Back",
    create_password: "Create a password",
    create_password_explanation:
      "Password for fake storage should not match password for your main storage",
    password_should_not_match:
      "Password for fake storage should not match password for your main storage",
    retype_password: "Retype password",
    passwords_do_not_match: "Passwords do not match, try again",
    success: "Success"
  },
  lnd: {
    title: "atur dana",
    choose_source_wallet: "Pilih dompet sumber",
    refill_lnd_balance: "Isi ulang saldo Lightning",
    refill: "Isi ulang",
    withdraw: "Tarik",
    placeholder: "Invoice",
    expired: "Kadaluarsa",
    sameWalletAsInvoiceError:
      "Kamu tidak bisa membayar invoice dengan dompet yang sama yang dipakai untuk membuat invoice."
  },
  pleasebackup: {
    title: "Your wallet is created...",
    text:
      "Please take a moment to write down this mnemonic phrase on a piece of paper. It's your backup you can use to restore the wallet on other device.",
    ok: "OK, I wrote this down!"
  },
  lndViewInvoice: {
    wasnt_paid_and_expired: "This invoice was not paid for and has expired",
    has_been_paid: "This invoice has been paid for",
    please_pay: "Please pay",
    sats: "sats",
    for: "For:",
    additional_info: "Additional Information",
    open_direct_channel: "Open direct channel with this node:"
  }
};
