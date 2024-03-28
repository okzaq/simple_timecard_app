'use client';

import styles from "./page.module.css";
import { Key, useEffect, useState } from "react";

const STORAGE_KEY = 'timecard';

type Timecard = {
  goToWork: string[],
  leaveWork: string[],
};

type Timecards = {
  [Key: string]: Timecard,
}

export default function Home() {
  const [timecard, setTimecard] = useState<Timecards>({});
  useEffect(() => {
    setTimecard(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'));
  }, []);
  useEffect(() => {
    if (Object.keys(timecard).length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timecard));
    }
  }, [timecard]);

  const goToWork = () => {
    const tmpTimecard = { ...timecard };
    const today = new Date();
    const todayKey = `${today.getFullYear()}/${('0' + (today.getMonth() + 1)).slice(-2)}/${('0' + today.getDate()).slice(-2)}`;
    const timeStr = `${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`;

    tmpTimecard[todayKey] = tmpTimecard[todayKey] ?? {};
    tmpTimecard[todayKey]['goToWork'] = tmpTimecard[todayKey]['goToWork'] ?? [];
    tmpTimecard[todayKey]['goToWork'].push(timeStr);

    setTimecard(tmpTimecard);
  };

  const leaveWork = () => {
    const tmpTimecard = { ...timecard };
    const today = new Date();
    const todayKey = `${today.getFullYear()}/${('0' + (today.getMonth() + 1)).slice(-2)}/${('0' + today.getDate()).slice(-2)}`;
    const timeStr = `${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`;

    tmpTimecard[todayKey] = tmpTimecard[todayKey] ?? {};
    tmpTimecard[todayKey]['leaveWork'] = tmpTimecard[todayKey]['leaveWork'] ?? [];
    tmpTimecard[todayKey]['leaveWork'].push(timeStr);

    setTimecard(tmpTimecard);
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        シンプルタイムカード
      </div>
      <div className={styles.description}>
        <ul>
          <li>ブラウザ上に保存するタイプのオフラインのタイムカードです。</li>
          <li>タイムカードの情報はどこにも送信されないため安心してお使いください。</li>
          <li>保存した時刻を消す機能は今後開発予定です。</li>
        </ul>
      </div>
      <div>
        <button className={styles.button} onClick={goToWork}>
          出勤
        </button>

        <button className={styles.button} onClick={leaveWork}>
          退勤
        </button>
      </div>
      <table className={styles.timecard_table}>
        <thead>
          <tr>
            <td>日付</td>
            <td>出勤時間</td>
            <td>退勤時間</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(timecard).length ? Object.keys(timecard).map(d => {
            return <tr key={d}>
              <td key={'date_' + d}>{d}</td>
              <td key={'goToWork_' + d}>{(timecard[d]['goToWork'] ?? []).join('\n')}</td>
              <td key={'leaveWork_' + d}>{(timecard[d]['leaveWork'] ?? []).join('\n')}</td>
            </tr>
          }) : <tr><td colSpan={3}>勤怠情報なし</td></tr>}
        </tbody>
      </table>
    </main>
  );
}
