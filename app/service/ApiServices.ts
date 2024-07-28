export const STAGING_SERVER = `https://staging.denmasslamet.site`;
export const PROD_SERVER = `https://denmasslamet.site`;

export const IP_SERVER = `${STAGING_SERVER}/api`;

export const AUTH_PATH = `${IP_SERVER}/auth`;
export const USER_PATH = `${IP_SERVER}/user`;
export const REPORT_PATH = `${IP_SERVER}/report`;
export const PROFILE_PATH = `${IP_SERVER}/profile`;

export const LOGIN_PATH = `${AUTH_PATH}/login`;
export const REGISTER_PATH = `${AUTH_PATH}/register`;
export const LOGOUT_PATH = `${AUTH_PATH}/logout`;

export const NUTRITIONAL_STATUS_HISTORY_PATH = `${IP_SERVER}/nutritional-status-history`;
export const PMT_MONITOR_PATH = `${IP_SERVER}/pmt-monitor`;

export const GET_USER_PROFILE_PATH = `${USER_PATH}/profile`;

export const GET_ALL_REPORT_PATH = `${REPORT_PATH}`;