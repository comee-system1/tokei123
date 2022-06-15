export function getGaihaku() {
  let gaihaku = {};
  gaihaku = {
    jyukyusyabango: '8765432100',
    date: [
      {
        byouinName: '北経国立病院',
        start_date: '2022-6-15',
        end_date: '2022-6-20',
        nyuuinbiShiseturiyo: 1,
        nyuuinbiBreakfast: false,
        nyuuinbiLunch: false,
        nyuuinbiDinner: false,
        taiinbiShiseturiyo: 1,
        taiinbiBreakfast: false,
        taiinbiLunch: false,
        taiinbiDinner: false,
      },
      {
        byouinName: 'みなみ経国立病院',
        start_date: '2022-6-22',
        end_date: '',
        nyuuinbiShiseturiyo: 1,
        nyuuinbiBreakfast: true,
        nyuuinbiLunch: false,
        nyuuinbiDinner: true,
        taiinbiShiseturiyo: 1,
        taiinbiBreakfast: true,
        taiinbiLunch: true,
        taiinbiDinner: true,
      },

    ],
  };

  return gaihaku;
}