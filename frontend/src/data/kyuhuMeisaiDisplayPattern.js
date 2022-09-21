export 

const kyuhumeisaiPtn = []
kyuhumeisaiPtn.push(
  [
    {
      // A 介護給付費、訓練等給付費等明細書
      // Gridの表示Flag
      riyousyaHutanGridFlag: true,                     // 利用者負担Grid表示Flag
      serviceGridFlag:       true,                     // サービス種別Grid表示Flag
      seikyugakuTabFlag:     true,                     // タブ表示フラグ
      nittyuGridFlag:        false,                   // 特定障害者Grid表示Flag
      tokuteiSyogaiGridFlag: true,                     // 特定障害者Grid表示Flag
      // 受給者Grid
      ketteiName:            '支給決定障害者等氏名',     //支給決定障害者等氏名 or 給付決定保護者氏名 or 通所給付決定保護者氏名
      syougaijiFlag:         true,                     // 支給決定障害者等氏名表示Flag
      shogaijiName:          '支給決定に係る障害児氏名', // 通所給付決定に係る障害児氏名
      // 事業所Grid
      tourokuJigyosyoFlag:   false,                    // 指定事業所番号 or 登録事業所番号
      // 市町村Grid
      todofukenFlag:         false,                    // 市町村番号 or 都道府県等番号
      jyoseijichitaiFlag:    true,                     // 助成自治体番号表示Flag
      // 区分Grid
      genmensotiFlag:        true,                     // 就労継続支援A型事業者負担減免措置実施表示Flag
      // 利用者負担Grid
      genmenTaisyosyaFlag:   true,                     // 就労継続支援A型減免対象者Flag
      syogaiShienFlag:       false,                    // 障害支援区分Flag
      // 給付費明細請求額Grid
      seikyugakuType:        1,                        // 請求額Gridの表示タイプ
      // 特定障害Grid
      tokuteiNissuFlag:      true,                    // 算定日数、日数の表示Flag
    },
    {
      // A-2 特例介護給付費、特例訓練等給付費等明細書
      riyousyaHutanGridFlag: true,
      serviceGridFlag:       true,
      seikyugakuTabFlag:     true,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '支給決定障害者等氏名',
      syougaijiFlag:         true,
      shogaijiName:          '支給決定に係る障害児氏名',
      tourokuJigyosyoFlag:   true,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    true,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        2,
      tokuteiNissuFlag:      false
    },
    {
      // B 特例訓練等給付費等明細書
      riyousyaHutanGridFlag: true,
      serviceGridFlag:       true,
      seikyugakuTabFlag:     true,
      nittyuGridFlag:        true,
      tokuteiSyogaiGridFlag: true,
      ketteiName:            '支給決定障害者等氏名',
      syougaijiFlag:         true,
      shogaijiName:          '支給決定に係る障害児氏名',
      tourokuJigyosyoFlag:   false,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    true,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   true,
      syogaiShienFlag:       true,
      seikyugakuType:        3,
      tokuteiNissuFlag:      false
    },
    {
      // C 計画相談支援給付費明細書
      riyousyaHutanGridFlag: false,
      serviceGridFlag:       false,
      seikyugakuTabFlag:     false,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '支給決定障害者等氏名',
      syougaijiFlag:         false,
      shogaijiName:          '',
      tourokuJigyosyoFlag:   false,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    false,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        0,
      tokuteiNissuFlag:      false
    },
    {
      // C-2 特例計画相談支援給付費明細書
      riyousyaHutanGridFlag: false,
      serviceGridFlag:       false,
      seikyugakuTabFlag:     false,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '支給決定障害者等氏名',
      syougaijiFlag:         false,
      shogaijiName:          '',
      tourokuJigyosyoFlag:   true,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    false,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        0,
      tokuteiNissuFlag:      false
    },
    {
      // D 地域相談支援給付費明細書
      riyousyaHutanGridFlag: false,
      serviceGridFlag:       true,
      seikyugakuTabFlag:     true,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '支給決定障害者等氏名',
      syougaijiFlag:         false,
      shogaijiName:          '',
      tourokuJigyosyoFlag:   false,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    false,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        4,
      tokuteiNissuFlag:      false
    },
    {
      // E 障害児通所給付費・入所給付費等明細書
      riyousyaHutanGridFlag: true,
      serviceGridFlag:       true,
      seikyugakuTabFlag:     true,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: true,
      ketteiName:            '給付決定保護者氏名',
      syougaijiFlag:         true,
      shogaijiName:          '給付決定に係る障害児氏名',
      tourokuJigyosyoFlag:   false,
      todofukenFlag:         true,
      jyoseijichitaiFlag:    true,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        3,
      tokuteiNissuFlag:      true
    },
    {
      // E-2 障害児通所給付費等明細書
      riyousyaHutanGridFlag: true,
      serviceGridFlag:       true,
      seikyugakuTabFlag:     true,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '通所給付決定保護者氏名',
      syougaijiFlag:         true,
      shogaijiName:          '通所給付決定に係る障害児氏名',
      tourokuJigyosyoFlag:   true,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    true,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        5,
      tokuteiNissuFlag:      false
    },
    {
      // F 障害児相談支援給付費明細書
      riyousyaHutanGridFlag: false,
      serviceGridFlag:       false,
      seikyugakuTabFlag:     false,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '給付決定保護者氏名',
      syougaijiFlag:         false,
      shogaijiName:          '',
      tourokuJigyosyoFlag:   false,
      todofukenFlag:         true,
      jyoseijichitaiFlag:    false,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        0,
      tokuteiNissuFlag:      false
    },
    {
      // F-2 特例障害児相談支援給付費明細書
      riyousyaHutanGridFlag: false,
      serviceGridFlag:       false,
      seikyugakuTabFlag:     false,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: false,
      ketteiName:            '給付決定保護者氏名',
      syougaijiFlag:         false,
      shogaijiName:          '',
      tourokuJigyosyoFlag:   true,
      todofukenFlag:         true,
      jyoseijichitaiFlag:    false,
      genmensotiFlag:        false,
      genmenTaisyosyaFlag:   false,
      syogaiShienFlag:       false,
      seikyugakuType:        0,
      tokuteiNissuFlag:      false
    },
    {
      // else 用Data
      riyousyaHutanGridFlag: true,
      serviceGridFlag:       true,
      seikyugakuTabFlag:     true,
      nittyuGridFlag:        false,
      tokuteiSyogaiGridFlag: true,
      ketteiName:            '支給決定障害者等氏名',
      syougaijiFlag:         true,
      shogaijiName:          '支給決定に係る障害児氏名',
      tourokuJigyosyoFlag:   false,
      todofukenFlag:         false,
      jyoseijichitaiFlag:    true,
      genmensotiFlag:        true,
      genmenTaisyosyaFlag:   true,
      syogaiShienFlag:       false,
      seikyugakuType:        1,
      tokuteiNissuFlag:      true
    }
  ]
);
export default {
  kyuhumeisaiPtn
}