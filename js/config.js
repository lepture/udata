/*
 * Parse the page html headers to extract some informations
 */


/**
 * Simple helper to fetch attribute on given css selector
 */
function _attr(selector, name) {
    const el = document.querySelector(selector);
    return el ? el.getAttribute(name) : undefined;
}

/**
 * Simple helper to <meta/> tag content given its name
 */
function _meta(name) {
    return _attr(`meta[name=${name}]`, 'content');
}

/**
 * A simple helper to parse JSON from a <meta/> tag
 * @return {[type]} [description]
 */
function _jsonMeta(name) {
    const data = _meta(name);
    return data ? JSON.parse(decodeURIComponent(data)) : false;
}

/**
 * The current user extracted from the header
 */
export let user;
const userEl = document.querySelector('meta[name=current-user]');

if (userEl) {
    user = {
        id: userEl.getAttribute('content'),
        slug: userEl.dataset.slug,
        first_name: userEl.dataset.first_name,
        last_name: userEl.dataset.last_name,
        avatar: userEl.dataset.avatar,
        roles: userEl.dataset.roles.split(','),
    };
}

/**
 * Map debug features on Webpack DEBUG flag
 */
export const debug = DEBUG;

/**
 * The current language is guessed from the html lang attribute
 */
export const lang = _attr('html', 'lang') || 'en';

/**
 * Reuse server side site title
 */
export const title = _meta('site-title');

/**
 * Store the CSRF token for legacy forms and AJAX requests
 */
export const csrf_token = _meta('csrf-token');

/**
 * Is the check url feature enabled ?
 */
export const check_urls = _jsonMeta('check-urls');

/**
 * The API root/base URL
 */
export const api_root = _meta('api-root');

/**
 * The API Swagger specifications URL
 */
export const api_specs = _meta('api-specs');

/**
 * The theme static root URL
 */
export const theme_static = _meta('theme-static-root');

/**
 * The base static root URL
 */
export const static_root = _meta('static-root');

/**
 * The administration root URL
 */
export const admin_root = _meta('admin-root');

/**
 * The authentification URL for logins
 */
export const auth_url = _meta('auth-url');

/**
 * Sentry configuration (as json) if available
 */
const sentryEl = document.querySelector('link[rel=sentry]');
export const sentry = {};

if (sentryEl) {
    sentry.dsn = sentryEl.getAttribute('href');
    sentry.release = sentryEl.dataset.release || undefined;
    sentry.tags = JSON.parse(decodeURIComponent(sentryEl.dataset.tags || '{}'));
}

/**
 * Whether territories are enabled or not.
 */
export const is_territory_enabled = _jsonMeta('territory-enabled');

/**
 * Whether the 'delete me' feature is enabled or not.
 */
export const is_delete_me_enabled = _jsonMeta('delete-me-enabled');

/**
 * Detect HiDPI screens
 */
export const hidpi = (window.devicePixelRatio > 1 || (
    window.matchMedia
    && window.matchMedia('(-webkit-min-device-pixel-ratio: 1.25),(min-resolution: 120dpi)').matches)
);

/**
 * Attributions for map tiles
 */
export const tiles_attributions = '&copy;' + [
    '<a href="http://openstreetmap.org/copyright">OpenStreetMap</a>',
    '<a href="https://cartodb.com/attributions">CartoDB</a>'
].join('/');

/**
 * Map tiles URL
 */
export const tiles_url = `https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}${hidpi ? '@2x' : ''}.png`;

/**
 * Leaflet base config
 */
export const tiles_config = {subdomains: 'abcd', attribution: tiles_attributions};

/**
 * Tags constraints
 * Should be kept synced with udata/tags.py in case of modification
 */
export const tags = {MIN_LENGTH: 3, MAX_LENGTH: 32};

/**
 * Max number of resources to display uncollapsed in dataset view
 */
export const dataset_max_resources_uncollapsed = _jsonMeta('dataset-max-resources-uncollapsed');

/**
 * Markdown configuration.
 */
export const markdown = _jsonMeta('markdown-config');


export default {
    user,
    debug,
    lang,
    title,
    csrf_token,
    api_root,
    api_specs,
    theme_static,
    static_root,
    admin_root,
    auth_url,
    sentry,
    check_urls,
    is_territory_enabled,
    is_delete_me_enabled,
    hidpi,
    tags,
    tiles_attributions,
    tiles_url,
    tiles_config,
    dataset_max_resources_uncollapsed,
    markdown,
};
