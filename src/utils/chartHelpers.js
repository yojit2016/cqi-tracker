export const getDesignTokens = () => {
  const styles = getComputedStyle(document.documentElement);
  return {
    primary: styles.getPropertyValue('--color-primary').trim() || '#A01E25',
    secondary: styles.getPropertyValue('--color-secondary').trim() || '#D97706',
    success: styles.getPropertyValue('--color-success').trim() || '#059669',
    error: styles.getPropertyValue('--color-error').trim() || '#DC2626',
    info: styles.getPropertyValue('--color-info').trim() || '#2563EB',
    border: styles.getPropertyValue('--color-border').trim() || '#E2E8F0',
    textPrimary: styles.getPropertyValue('--color-text-primary').trim() || '#0F172A',
    textSecondary: styles.getPropertyValue('--color-text-secondary').trim() || '#475569',
    fontFamily: styles.getPropertyValue('--font-body').trim() || 'Inter',
  };
};

export const applyChartThemeDefaults = (Chart) => {
  const tokens = getDesignTokens();
  
  if (Chart && Chart.defaults) {
    Chart.defaults.font.family = tokens.fontFamily;
    Chart.defaults.font.size = 11;
    Chart.defaults.color = tokens.textSecondary;
    
    if (Chart.defaults.scale && Chart.defaults.scale.grid) {
      Chart.defaults.scale.grid.color = tokens.border;
      Chart.defaults.scale.grid.borderColor = tokens.border;
    }
  }
};
