const pluginLogs: any[] = [];
const maxLogs = 1000;

let unsafeFeaturesEnabled = false;

export function setUnsafeLogging(enabled: boolean) {
  unsafeFeaturesEnabled = enabled;
}

export function addLog(type: string, message: string, data: any = null) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: type,
    message: message,
    data: data
  };

  pluginLogs.unshift(logEntry);
  if (pluginLogs.length > maxLogs) {
    pluginLogs.pop();
  }

  if (unsafeFeaturesEnabled) {
    console.log(`[AccountSwitcher] ${type.toUpperCase()}: ${message}`, data || '');
  }
}

export function getLogs() {
  return pluginLogs;
}

export function clearLogs() {
  pluginLogs.length = 0;
  addLog('info', 'Logs cleared');
}
