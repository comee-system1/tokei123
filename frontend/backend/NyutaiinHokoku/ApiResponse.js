let riyo_inf = []
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
  //  console.log("apiResponse");
  //  console.log(res);
    riyo_inf = [];
    
    for(let i = 0 ; i<10 ; i ++){
    riyo_inf.push(
      {
        'riyo_inf':{
          riid:'1000000000',
          riyocode:'1000000000',
          names:'東経太郎',
          kana:'タロウトウケイ',
          jyukyu_inf:{
            jyukyuno:'100012358',
          },
          nyutaiin_inf:{
            kbn:'1',
            nyutaikbn:'1',
            ngsymd   :'20210710',
            ngeymd   :'20210725',
            byoincode:'1000000000',
            gaihaku  :'ガイハク'
          },
          byoin_inf:{
            byoinname:'東経市市民病院',
          },
          dsp_inf:{
            nyuutaigai:'東経市市民病院',
            symddsp:'20210710',
            eymddsp:'20210725',
            ngname:'20210725',
            bikoudsp:'20210725',
          }
        },
      },
      {
        'riyo_inf':{
          riid:'1000000002',
          riyocode:'1000000002',
          names:'東経次郎',
          kana:'ジロウトウケイ',
          jyukyu_inf:{
            jyukyuno:'100012360',
            syogaikbn:'4',
            syogaikbn_old:'4',
            serreki_inf:{
              symd:'',
              eymd:'',
            },
            riyonissu_inf:{
              nissu1: 11,
              nissu2: 18,
              nissu3: 17,
              nissu4: 13,
              nissu5: 17,
              nissu6: 16,
              nissu7: 14,
              nissu8: 15,
              nissu9: 11,
              nissu10: 0,
              nissu11: 0,
              nissu12: 3,
              gokei: 135,
              tukisu: 12,
              avg: 11.25,
            }
          }
        },
      },
      {
        'riyo_inf':{
          riid:'1000000004',
          riyocode:'1000000004',
          names:'東経さおり',
          kana:'サオリトウケイ',
          jyukyu_inf:{
            jyukyuno:'100012362',
            syogaikbn:'2',
            syogaikbn_old:'2',
            serreki_inf:{
              symd:'20211020',
              eymd:'20211021',
            },
            riyonissu_inf:{
              nissu1:15,
              nissu2:13,
              nissu3:14,
              nissu4:-1,
              nissu5:-1,
              nissu6:-1,
              nissu7:-1,
              nissu8:-1,
              nissu9:-1,
              nissu10:13,
              nissu11:14,
              nissu12:15,
              gokei: 84,
              tukisu: 12,
              avg: '14.00',
            }
          }
        },
      },
      {
        'riyo_inf':{
          riid:'1000000005',
          riyocode:'1000000005',
          names:'東経 愛子',
          kana:'アイコトウケイ',
          jyukyu_inf:{
            jyukyuno:'100012364',
            syogaikbn:'5',
            syogaikbn_old:'5',
            serreki_inf:{
              symd:'',
              eymd:'',
            },
            riyonissu_inf:{
              nissu1:'',
              nissu2:'',
              nissu3:'',
              nissu4:'',
              nissu5:'',
              nissu6:'',
              nissu7:'',
              nissu8:'',
              nissu9:'',
              nissu10:'',
              nissu11:'',
              nissu12:'',
              gokei: '',
              tukisu: '',
              avg: '',
            }
          }
        },
      },
      {
        'riyo_inf':{
          riid:'1000000010',
          riyocode:'1000000010',
          names:'東経 春奈',
          kana:'ハルナトウケイ',
          jyukyu_inf:{
            jyukyuno:'100012365',
            syogaikbn:'3',
            syogaikbn_old:'3',
            serreki_inf:{
              symd:'20210521',
              eymd:'20221218',
            }
          }
        },
      }
    );
    }    
    let returns = {
      riyo_inf:riyo_inf
    };
    return returns;
  }
}