export default {
  pretty_time(seconds) {
    const hours = (seconds / 3600) >> 0;
    const mins  = ((seconds / 60) >> 0) % 60;
    const secs  = seconds % 60;
    const mm = (''+mins).padStart(2, '0');
    const ss = (''+secs).padStart(2, '0');
    if (hours)
      return `${hours}:${mm}:${ss}`;
    return `${mm}:${ss}`;
  },

  suffix_time(seconds) {
    const hours = (seconds / 3600) >> 0;
    const mins  = ((seconds / 60) >> 0) % 60;
    const secs  = seconds % 60;
    if (hours)
      return `${hours}h ${mins}min ${secs}s`;
    return `${mins}min ${secs}s`;
  },

  pretty_date(date) {
    const YY = (''+(date.getFullYear()));
    const MM = (''+(date.getMonth() + 1)).padStart(2, '0');
    const DD = (''+date.getDate()).padStart(2, '0');
    const hh = (''+date.getHours()).padStart(2, '0');
    const mm = (''+date.getMinutes()).padStart(2, '0');
    return `${YY}-${MM}-${DD} ${hh}:${mm}`;
  },
};
