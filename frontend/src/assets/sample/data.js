export function getData() {
    var countries = 'アメリカ,ドイツ,イギリス,日本'.split(',');
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    return data;
}