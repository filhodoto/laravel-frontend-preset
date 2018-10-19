import Store from '../store';

/**
 * Mixin helper to map label to translation.
 *
 * @param label
 * @param defaultValue
 * @return {*}
 */
export const i18n = (label, defaultValue) => {
    const labelValue = Store.getters.getTranslations[label];

    if (labelValue) {
        return labelValue;
    }

    if (defaultValue) {
        return defaultValue;
    }

    return `{${label}}`;
};