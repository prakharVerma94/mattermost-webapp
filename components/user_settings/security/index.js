// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearUserAccessTokens, createUserAccessToken, getMe, getUserAccessTokensForUser, revokeUserAccessToken, enableUserAccessToken, disableUserAccessToken} from 'mattermost-redux/actions/users';
import * as UserUtils from 'mattermost-redux/utils/user_utils';

import SecurityTab from './user_settings_security.jsx';

function mapStateToProps(state, ownProps) {
    const license = state.entities.general.license;
    const config = state.entities.general.config;

    const tokensEnabled = config.EnableUserAccessTokens === 'true';
    const userHasTokenRole = UserUtils.hasUserAccessTokenRole(ownProps.user.roles) || UserUtils.isSystemAdmin(ownProps.user.roles);

    const isLicensed = license && license.IsLicensed;
    const mfaLicensed = license && license.MFA;

    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider;
    const enableMultifactorAuthentication = config.EnableMultifactorAuthentication;
    const enforceMultifactorAuthentication = config.EnforceMultifactorAuthentication;
    const enableSignUpWithEmail = config.EnableSignUpWithEmail;
    const enableSignUpWithGitLab = config.EnableSignUpWithGitLab;
    const enableSignUpWithGoogle = config.EnableSignUpWithGoogle;
    const enableLdap = config.EnableLdap;
    const enableSaml = config.EnableSaml;
    const enableSignUpWithOffice365 = config.EnableSignUpWithOffice365;
    const experimentalEnableAuthenticationTransfer = config.ExperimentalEnableAuthenticationTransfer;

    return {
        ...ownProps,
        userAccessTokens: state.entities.users.myUserAccessTokens,
        canUseAccessTokens: tokensEnabled && userHasTokenRole,
        isLicensed,
        mfaLicensed,
        enableOAuthServiceProvider,
        enableMultifactorAuthentication,
        enforceMultifactorAuthentication,
        enableSignUpWithEmail,
        enableSignUpWithGitLab,
        enableSignUpWithGoogle,
        enableLdap,
        enableSaml,
        enableSignUpWithOffice365,
        experimentalEnableAuthenticationTransfer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getMe,
            getUserAccessTokensForUser,
            createUserAccessToken,
            revokeUserAccessToken,
            enableUserAccessToken,
            disableUserAccessToken,
            clearUserAccessTokens
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityTab);
