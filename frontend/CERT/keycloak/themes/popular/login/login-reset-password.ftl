<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
        ${msg("emailForgotTitle")}
    <#elseif section = "form">
        <h2>${msg("doForgotPasswordRenew")}</h2>
        <ul id="forgetNavi" >
            <li class="active">&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
        </ul>
        <ul id="forgetExplain">
            <li>${msg("forgetExplain1")}</li>
            <li>${msg("forgetExplain2")}</li>
            <li>${msg("forgetExplain3")}</li>
        </ul>
        <p>${msg("forgetExplainMessage")}</p>
        <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="username" class="${properties.kcLabelClass!}"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("emailScopeConsentText")}</#if></label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <input type="text" id="username" name="username" class="${properties.kcInputClass!}" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
                    <#if messagesPerField.existsError('username')>
                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    <#--  ${kcSanitize(messagesPerField.get('username'))?no_esc}  -->
                                    ${msg("missingEmailMessage")}
                        </span>
                    </#if>
                </div>
            </div>
            <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!} mt-middle">
                <ul id="forgetButton">
                    <li><a href="${url.loginUrl}">${kcSanitize(msg("doCancel"))?no_esc}</a></li>
                    <li>
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
                    </li>
                </ul>
            </div>
        </form>
    <#--  <#elseif section = "info" >
        <#if realm.duplicateEmailsAllowed>
            ${msg("emailInstructionUsername")}
        <#else>
            ${msg("emailInstruction")}
        </#if>  -->
    </#if>
</@layout.registrationLayout>
