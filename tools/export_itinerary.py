#!/usr/bin/env python3
"""依 content.json 匯出 ITINERARY-行程表.txt（UTF-8 BOM、CRLF）。用法：python3 tools/export_itinerary.py"""
import json, datetime, urllib.parse as u, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
d = json.load(open(root / 'content.json', encoding='utf-8'))
O = []; A = O.append; L = '=' * 40; l = '-' * 40
mapurl = lambda q: 'https://www.google.com/maps/search/?api=1&query=' + u.quote(q)
lines = lambda t: [s for s in (t or '').split('\n') if s.strip()]
A('2026 東北雪國 7 日遊　行程表'); A('12/01（二）– 12/07（一）　仙台・松島・銀山溫泉・山形・藏王・白石')
A('整理日期：' + datetime.date.today().strftime('%Y/%m/%d') + '（依網頁最新內容）'); A('')
A(L); A('航班'); A(L)
A('去程 12/01（二）　星宇 JX862　11:50 桃園 T1 → 16:00 仙台機場（約 3 小時 10 分）')
A('回程 12/07（一）　星宇 JX863　17:25 仙台機場 → 20:35 桃園 T1（約 4 小時 10 分）')
A('※ 時間皆為當地時間，日本比台灣快 1 小時。'); A('')
A(L); A('行程總覽'); A(L)
for x in d['days']: A(f"Day {x['n']}　{x['date']}（{x['dow']}）　{x['title']}　｜　住：{x.get('stay') or '—'}")
A('')
for x in d['days']:
    A(L); A(f"Day {x['n']}　{x['date']}（{x['dow']}）　{x['title']}"); A(L)
    if x.get('lede'): A(x['lede'])
    A('')
    for s in x['s']:
        cat = f"［{s['cat']}］" if s.get('cat') else ''
        A(f"{s['t']}　{s['title']}　{cat}".rstrip())
        if s.get('sub'): A(f"　　{s['sub']}")
        for t in lines(s.get('detail')): A(f"　　・{t}")
        w = lines(s.get('warn'))
        if w:
            A('　　【注意】')
            for t in w: A(f"　　　- {t}")
        if s.get('q'): A('　　地圖：' + mapurl(s['q']))
        A('')
    if x.get('t'):
        A('■ 今日提醒')
        for t in x['t']: A(f'　・{t}')
        A('')
    A(f"■ 今晚住宿：{x.get('stay') or '—'}"); A('')
A(L); A('住宿資訊'); A(L)
for h in d['hotels']:
    A(l); A(f"{h.get('when','')}　{h['name']}"); A(l)
    for k, lab in (('ja','日文名稱'),('addr','地址'),('tel','電話'),('cin','Check-in'),('cout','Check-out'),('rtype','房型'),('access','交通'),('park','停車'),('bath','泡湯'),('food','餐飲')):
        v = h.get(k)
        if not v: continue
        vs = lines(v) if isinstance(v, str) else v
        if len(vs) == 1: A(f'{lab}：{vs[0]}')
        else:
            A(f'{lab}：')
            for t in vs: A(f'　・{t}')
    for k, lab in (('facil','設施'),('notes','注意')):
        if h.get(k):
            A(f'{lab}：')
            for t in h[k]: A(f'　・{t}')
    if h.get('q'): A('地圖：' + mapurl(h['q']))
    A('')
A(L); A('旅途實用提醒'); A(L)
for n in d['notes']: A(f"・{n['title']}：{n['text']}")
A(''); A('網頁版（含即時天氣、地圖）：https://s900116-arch.github.io/tohoku-trip-2026/')
(root / 'ITINERARY-行程表.txt').write_text('\r\n'.join(O) + '\r\n', encoding='utf-8-sig', newline='')
print('ok', len(O))
